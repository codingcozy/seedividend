---
title: "데이터베이스에 연결이 과부하될 때 암시적 연결 풀링"
description: ""
coverImage: "/assets/img/2024-06-20-ImplicitConnectionPoolingwhenconnectionsoverloadyourdatabase_0.png"
date: 2024-06-20 01:44
ogImage: 
  url: /assets/img/2024-06-20-ImplicitConnectionPoolingwhenconnectionsoverloadyourdatabase_0.png
tag: Tech
originalTitle: "Implicit Connection Pooling when connections overload your database"
link: "https://medium.com/@cjones-oracle/implicit-connection-pooling-when-connections-overload-your-database-3fe7c59acae2"
---


긴 실행 앱에서 앱 수명 동안 데이터베이스 연결을 열어 두면 연결이 자주 유휴 상태이고 SQL 문을 실행하는 데 사용되지 않을 가능성이 높습니다. 그러나 이는 연결의 서버 프로세스와 세션 메모리를 데이터베이스 호스트에서 유지하며 결국 연결할 수 있는 다른 사용자 수를 제한합니다. Oracle 애플리케이션 연결 풀을 사용하여 재아키텍처링하는 것이 불가능할 때는 간단한 연결 문자열 변경을 통해 Oracle Database 23ai의 "암시적 연결 풀링"을 사용하여 데이터베이스 호스트 리소스를 공유할 수 있습니다. 이를 통해 필요한 메모리가 줄어들고 데이터베이스가 확장 가능해집니다.

![Implicit Connection Pooling when connections overload your database](/assets/img/2024-06-20-ImplicitConnectionPoolingwhenconnectionsoverloadyourdatabase_0.png)

이전 블로그 포스트인 "Connection Pool를 사용하지 않는 앱을 돕는 DRCP"는 자주 연결 및 끊김이 발생하지만 연결 풀을 사용하지 않는 예제를 보여주었습니다. 이는 앱이 데이터베이스 주요 연결 풀링(DRCP)에서 얻을 수 있는 이점에 대해 설명합니다. 왜냐하면 이러한 자주 발생하는 애플리케이션 끊김 호출은 데이터베이스에게 다른 애플리케이션 사용자를 위해 데이터베이스 서버 프로세스를 재사용할 때 안전한 시점인지 알려줍니다.

다음 예제는 긴 실행 애플리케이션이 종료될 때만 연결 해제 호출이 발생하는 점에서 다릅니다. 순수 DRCP는 도저히 도움이 되지 않습니다. 왜냐하면 데이터베이스 서버 프로세스를 재사용할 때 "경계"인 연결 사용이 없기 때문입니다. 다행히도 Oracle Database 23ai의 "암시적 연결 풀링"이 이를 해결해 줄 수 있습니다.

<div class="content-ad"></div>

데모를 살펴보겠습니다. 다음 간단한 Python 앱인 long_run.py은 연결을 열고 루프를 실행합니다. 각 반복에서는 쿼리가 실행되며 쿼리 사이에 사용자 "생각 시간"을 모방하는 sleep이 존재합니다. 앱이 종료될 때 연결이 닫힙니다 (with context 블록 끝에서 처리됨). 이는 SQL 문을 실행하지 않을 때도 연결을 유지하는 장기 실행 앱을 모방합니다:

```js
# long_run.py

import os
import time

import oracledb
import sample_env  # 자격 증명이 포함된 python-oracledb 샘플 참조

# 스크립트 수명 내에서 실행할 쿼리 수
NUMSQLS = globals().get("NUMSQLS", 0)

# SQL 문 실행 사이에서 대기할 시간(초)
SLEEPTIME = globals().get("SLEEPTIME", 0)

# 각 스크립트 실행 중에 고유한 끝 "사용자"의 이름
APPUSERNAME = globals().get("APPUSERNAME", None)

sql = """select unique sid||'-'||serial# as sidser,
                       current_timestamp as ct
         from v$session_connect_info
         where sid = sys_context('USERENV', 'SID')"""

with oracledb.connect(
    user=sample_env.get_main_user(),
    password=sample_env.get_main_password(),
    dsn=sample_env.get_connect_string(),
) as connection:
    for i in range(NUMSQLS):
        with connection.cursor() as cursor:
            for s, d in cursor.execute(sql):
                print(f"{APPUSERNAME} sid-ser {s} at time {d}")
        time.sleep(SLEEPTIME)
```

응용 프로그램 쿼리는 현재 시간 및 세션 식별자/일련 번호를 얻습니다 -이 쌍은 사용 중인 데이터베이스 서버 프로세스 세션을 보여줍니다. 각 반복의 쿼리는 다음과 같은 줄을 출력합니다:

```js
User01 sid-ser 407-62786 at time 2024-06-11 20:29:34.632666
```

<div class="content-ad"></div>

연결 문자열은 localhost/orclpdb1과 같이 간단한 형태입니다. DRCP는 사용되지 않았습니다.

도우미 스크립트인 runner.py는 여러 사용자가 동시에 long_run.py를 실행하도록 모의하는 데 사용됩니다. 이 도우미 스크립트는 스레드를 이용하여 long_run.py를 10회 (NUMUSERS로 설정됨) 호출합니다. 각각의 long_run.py 호출에는 고유한 "사용자 이름" (예: User01, APPUSERNAME로 전달), 실행할 SQL 문의 수 (NUMSQLS), 그리고 실행 사이의 슬립 시간 (SLEEPTIME)이 전달됩니다. 슬립 시간은 애플리케이션 사용자가 비활동 상태이고 SQL 문을 실행하지 않는 것을 흉내냅니다. 도우미 스크립트는 다음과 같습니다:

```js
# runner.py

import threading
import time

import sample_env  # 자격 증명을 포함하고 있습니다. python-oracledb 샘플 참조

NUMUSERS = 10      # 동시에 long_run.py를 호출하는 회수

def start_app(tn):
    app_globals = {
        "APPUSERNAME": "User{:02d}".format(tn + 1),  # long_run.py를 실행하는 "사용자" 이름
        "NUMSQLS": 5,     # long_run.py 수명 내에서 실행할 쿼리 수
        "SLEEPTIME": 5,   # SQL 문 사이에 잠자는 시간 (초)
    }
    exec(open("long_run.py").read(), app_globals)

def start_workload():
    thread = []
    for i in range(NUMUSERS):
        t = threading.Thread(target=start_app, args=(i,))
        t.start()
        thread.append(t)

    for i in range(NUMUSERS):
        thread[i].join()

if __name__ == "__main__":

    print(f"연결 문자열 사용 중: {sample_env.get_connect_string()}")

    start = time.time()
    start_workload()
    elapsed = time.time() - start
    print("작업 완료!")
    print("소요 시간 {:04.2f} 초".format(elapsed))
```

현재 구현된 대로, 각 long_run.py 프로세스는 5개의 쿼리를 실행하고 각 쿼리 사이에 5초의 슬립 시간을 갖습니다. (실제로는 애플리케이션에서 훨씬 오랫동안 실행될 수 있습니다). 오버헤드, 연결 및 문 실행을 추가하면 총 예상 소요 시간은 25초보다 약간 더 걸릴 것으로 예상됩니다:

<div class="content-ad"></div>

```js
$ python3 runner.py
Using connection string: localhost/orclpdb1
User01 sid-ser 407-62786 at time 2024-06-11 20:29:34.632666
User03 sid-ser 26-48119 at time 2024-06-11 20:29:34.802162
User02 sid-ser 172-37948 at time 2024-06-11 20:29:34.973973
User04 sid-ser 272-26116 at time 2024-06-11 20:29:35.146129
User05 sid-ser 398-8361 at time 2024-06-11 20:29:35.315068
User07 sid-ser 33-58745 at time 2024-06-11 20:29:35.485322
User08 sid-ser 154-64891 at time 2024-06-11 20:29:35.667774
User09 sid-ser 268-40439 at time 2024-06-11 20:29:35.837789
User10 sid-ser 408-62081 at time 2024-06-11 20:29:36.013276
User06 sid-ser 10-45069 at time 2024-06-11 20:29:36.189829
User01 sid-ser 407-62786 at time 2024-06-11 20:29:39.653528
...

All done!
Time 26.85 seconds
```

중요한 점은 각각의 10개의 프로세스가 연결을 열고 long_run.py 앱이 실행되는 동안 항상 열려 있도록 유지한다는 것입니다. 이는 각 사용자 스크립트가 항상 동일한 세션 식별자/일련 번호 조합을 사용하여 쿼리를 실행함으로써 나타납니다. 예를 들어, User01은 항상 407-62786을 사용합니다. 이로 인해 항상 열려 있는 10개의 연결이 있으며, 각각에는 해당 서버 프로세스 및 세션 메모리를 사용하여 데이터베이스 호스트 리소스를 소비합니다.

# Oracle Database 23ai 암시적 연결 풀링

암시적 연결 풀링은 데이터베이스 서버 프로세스 및 세션 메모리를 공유하기 위해 데이터베이스 주거 연결 풀링을 활용하는 Oracle Database 23ai의 기능입니다. 이는 python-oracledb, node-oracledb, JDBC를 포함한 인기 있는 Oracle Database 드라이버에서 지원됩니다.


<div class="content-ad"></div>

Implicit Connection Pooling은 데이터베이스 작업을 수행하지 않을 때 연결을 보유하는 응용 프로그램에 적합합니다. 이에는 데이터베이스와의 연결을 풀의 수명 동안 열어둔 채 자체 연결 풀 솔루션을 구현하는 응용 프로그램이 포함됩니다.

Implicit Connection Pooling은 응용 프로그램이 열려 있는 연결을 사용하지 않을 때 경계를 투명하게 인식하여, 첫 번째(현재 여유 상태인) 연결의 서버 프로세스와 세션 메모리를 다른 응용 프로그램 연결이 사용하도록 허용합니다. 그리고 첫 번째 응용 프로그램이 후속 데이터베이스 요청을 시작할 때, 무료 데이터베이스 서버 프로세스가 다시 할당되어 응용 프로그램은 서버 프로세스의 일시적 "도난"에 대해 알 필요가 없이 계속 진행됩니다. 응용 프로그램 코드를 변경할 필요가 없습니다. 데이터베이스의 자원이 공유되어 더 큰 확장성이 가능합니다.

Implicit Connection Pooling은 순수 DRCP와 다릅니다. 순수 DRCP에서는 데이터베이스 서버 프로세스의 매핑 및 매핑 해제가 Oracle에 의해 암시적으로 수행됩니다. 순수 DRCP에서는 애플리케이션이 get-connection 및 close-connection 호출을 시작할 때만 매핑 및 매핑 해제가 수행됩니다.

long_run.py는 한 번의 open/close 쌍만 갖고 있으므로(Implicit Connection Pooling의 이상적인 대상입니다. 데이터베이스에서 DRCP를 시작하고, 연결 문자열을 DRCP 풀 서버 사용하도록 변경하고, 연결 문자열에 POOL_BOUNDARY 매개변수를 추가 설정하는 것만으로 구현 가능합니다. 응용 프로그램 코드를 수정할 필요가 없습니다. 데모를 다시 실행하면 결과가 출력됩니다:

<div class="content-ad"></div>

```js
$ python3 runner.py
Using connection string: localhost/orclpdb1:pooled?pool_boundary=statement
User01 sid-ser 399-25678 at time 2024-06-11 20:28:46.803668
User02 sid-ser 399-25678 at time 2024-06-11 20:28:46.830118
User05 sid-ser 399-25678 at time 2024-06-11 20:28:46.840759
User04 sid-ser 399-25678 at time 2024-06-11 20:28:46.867337
User03 sid-ser 152-55977 at time 2024-06-11 20:28:46.908656
User08 sid-ser 152-55977 at time 2024-06-11 20:28:46.978751
User09 sid-ser 152-55977 at time 2024-06-11 20:28:47.045773
User06 sid-ser 152-55977 at time 2024-06-11 20:28:47.106757
User10 sid-ser 152-55977 at time 2024-06-11 20:28:47.169244
User07 sid-ser 152-55977 at time 2024-06-11 20:28:47.229357
User01 sid-ser 152-55977 at time 2024-06-11 20:28:51.844053
User02 sid-ser 399-25678 at time 2024-06-11 20:28:51.844449
User05 sid-ser 152-55977 at time 2024-06-11 20:28:51.855879
User04 sid-ser 152-55977 at time 2024-06-11 20:28:51.883601
User03 sid-ser 152-55977 at time 2024-06-11 20:28:51.940661
User08 sid-ser 152-55977 at time 2024-06-11 20:28:51.990124
User09 sid-ser 152-55977 at time 2024-06-11 20:28:52.058879
User06 sid-ser 152-55977 at time 2024-06-11 20:28:52.120180
User10 sid-ser 152-55977 at time 2024-06-11 20:28:52.182709
User07 sid-ser 152-55977 at time 2024-06-11 20:28:52.243295
User01 sid-ser 152-55977 at time 2024-06-11 20:28:56.874489
User02 sid-ser 399-25678 at time 2024-06-11 20:28:56.874487
User04 sid-ser 399-25678 at time 2024-06-11 20:28:56.895112
User03 sid-ser 399-25678 at time 2024-06-11 20:28:56.954245
User05 sid-ser 277-27334 at time 2024-06-11 20:28:56.969050
User08 sid-ser 277-27334 at time 2024-06-11 20:28:56.997923
User09 sid-ser 277-27334 at time 2024-06-11 20:28:57.072845
User06 sid-ser 277-27334 at time 2024-06-11 20:28:57.131504
User10 sid-ser 277-27334 at time 2024-06-11 20:28:57.195656
User07 sid-ser 277-27334 at time 2024-06-11 20:28:57.257700
User01 sid-ser 399-25678 at time 2024-06-11 20:29:01.903889
User02 sid-ser 277-27334 at time 2024-06-11 20:29:01.903889
User04 sid-ser 152-55977 at time 2024-06-11 20:29:01.910282
User03 sid-ser 152-55977 at time 2024-06-11 20:29:01.968523
User05 sid-ser 152-55977 at time 2024-06-11 20:29:01.997715
User08 sid-ser 152-55977 at time 2024-06-11 20:29:02.011130
User09 sid-ser 152-55977 at time 2024-06-11 20:29:02.086866
User06 sid-ser 152-55977 at time 2024-06-11 20:29:02.139241
User10 sid-ser 152-55977 at time 2024-06-11 20:29:02.209716
User07 sid-ser 152-55977 at time 2024-06-11 20:29:02.271144
User01 sid-ser 152-55977 at time 2024-06-11 20:29:06.940760
User02 sid-ser 277-27334 at time 2024-06-11 20:29:06.940760
User04 sid-ser 399-25678 at time 2024-06-11 20:29:06.940760
User03 sid-ser 399-25678 at time 2024-06-11 20:29:06.982961
User05 sid-ser 399-25678 at time 2024-06-11 20:29:07.010853
User08 sid-ser 399-25678 at time 2024-06-11 20:29:07.023677
User09 sid-ser 399-25678 at time 2024-06-11 20:29:07.102189
User06 sid-ser 399-25678 at time 2024-06-11 20:29:07.152508
User10 sid-ser 399-25678 at time 2024-06-11 20:29:07.223001
User07 sid-ser 399-25678 at time 2024-06-11 20:29:07.284733
All done!
Time 25.96 seconds
```

This shows that server process and session memory are being reused across different users' queries. For example, the first two lines have the same session identifier/serial number:

```js
User01 sid-ser 399-25678 at time 2024-06-11 20:28:46.803668
User02 sid-ser 399-25678 at time 2024-06-11 20:28:46.830118
```

If you analyze the output, you can see that in this run, only three servers are used for all the queries being executed. The session identifier/serial number pairs are:



<div class="content-ad"></div>

```js
152-55977
277-27334
399-25678
```

이는 암시적 연결 풀링 없이 필요한 서버가 열 개보다 훨씬 적습니다. 절대 결과는 타이밍과 같은 요소에 따라 다를 수 있습니다.

두 실행 간의 총 시간 차이는 비교에 중요하지 않지만 이 작은 테스트에서는 유의미하지 않습니다. 일반적으로 암시적 연결 풀링은 리소스를 공유하고 오라클 스택에 추가 작업을 수행해야 하기 때문에 암시적 연결 풀링으로 이동할 때 총 시간이 느려질 수 있습니다. — 심지어 정확하게 측정 가능한 차이가 있는 경우에도. 이는 애플리케이션이 SQL을 실행하는 빈도에 따라 달라질 수 있습니다. 그러나 데이터베이스 계층은 서버 프로세스 수가 적기 때문에 더 적은 메모리를 사용하므로 더 효율적일 수 있습니다 — 그리고 다른 애플리케이션에서 더 많은 사용자 연결을 처리할 수 있습니다.

# 암시적 연결 풀링 구성하기


<div class="content-ad"></div>

DRCP는 암시적 연결 풀링에서 사용하는 데이터베이스 서버 프로세스의 구성 가능한 풀을 제공합니다. DRCP는 데이터베이스에서 활성화, 모니터링 및 조정되어야 하며, 기술 브리프 'Database Resident Connection Pooling으로 극한의 Oracle 데이터베이스 연결 확장성 실현'을 참조하십시오.

응용 프로그램 측에서 연결 문자열은 간단히 DRCP 풀 서버를 요청해야 합니다. 예를 들어, ":pooled"나 "(SERVER=POOLED)"와 같이. 또한 새로운 POOL_BOUNDARY 매개변수를 포함해야 합니다. 이 블로그 게시물에서 사용된 연결 문자열은 Easy Connect 문자열 localhost/orclpdb1:pooled?pool_boundary=statement이었습니다. tnsnames.ora 파일에서 동일한 연결 기술자는 "...(POOL_BOUNDARY=STATEMENT)..."를 포함하게 됩니다.

POOL_BOUNDARY 매개변수에는 STATEMENT 또는 TRANSACTION 값이 있을 수 있습니다:

- STATEMENT: 연결이 암시적으로 상태를 유지하지 않을 때, 즉 연결에 활성 커서가 없고(커서의 모든 행이 내부적으로 검색되었음), 활성 트랜잭션이 없음, 임시 테이블도 없고 임시 LOB도 없는 경우, 연결은 DRCP 연결 풀로 반환됨.
- TRANSACTION: 응용 프로그램에서 커밋이나 롤백이 시작될 때 연결이 DRCP 연결 풀로 반환됩니다. 암시적 연결 풀링을 사용할 때는 "autocommit" 설정을 활성화하지 않는 것이 좋습니다. 만약 활성화한다면, 데이터베이스로 여러 번의 왕복이 필요한 데이터를 가져올 수 없게 되며, 스트리밍 LOB 데이터와 같은 데이터를 가져올 수 없게 됩니다.

<div class="content-ad"></div>

보안을 위한 표준 DRCP 권장 사항에 따라, 연결 문자열에 POOL_CONNECTION_CLASS 매개변수를 추가하여 유사한 모든 애플리케이션에 동일한 값을 사용해야 합니다. 예를 들어:

localhost/orclpdb1:pooled?pool_boundary=statement&pool_connection_class=myappname

Implicit Connection Pooling에서 사용하는 DRCP "순도"는 기본적으로 SELF로 설정되어 있어 서버 프로세스 세션 메모리를 재사용할 수 있습니다. 연결 문자열 매개변수 POOL_PURITY=NEW를 추가하면 이를 변경하고 각 연결 사용 시 세션 메모리를 다시 생성합니다.

선택적으로 PL/SQL 패키지 ORA_CPOOL_STATE를 만들어 연결 세션 상태를 가져오고 재설정할 수 있는 프로시저를 만들 수 있습니다. 오라클 콜 인터페이스 문서를 참조하세요.

<div class="content-ad"></div>

# 암시적 연결 풀링을 사용하지 말아야 하는 경우

만약 귀하의 응용 프로그램을 Oracle이 제공하는 응용 프로그램 연결 풀을 사용하도록 다시 구성할 수 있다면, 이것이 가장 효율적인 결과가 될 수 있습니다. 응용 프로그램 연결 풀은 리소스 공유를 제공하며 Oracle 데이터베이스 고가용성 기능을 제공합니다. 응용 프로그램 연결 풀(예: python-oracledb 연결 풀이나 node-oracledb 연결 풀과 같은)을 사용하는 것이 종종 다중 사용자 응용 프로그램에 가장 적합하며, 가끔씩 연결을 사용하는 단일 사용자 응용 프로그램조차도 혜택을 제공할 수 있습니다. Desktop applications with node-oracledb and electron 블로그 포스트는 이러한 시나리오 중 하나를 보여줍니다. 응용 프로그램이 Oracle 응용 프로그램 연결 풀을 효율적으로 사용하고 자주 연결을 가져오고 반환한다면, 암시적 연결 풀링은 혜택을 제공하지 않습니다.

귀하의 응용 프로그램을 Oracle 응용 프로그램 연결 풀을 사용하도록 변경할 수 없지만, 응용 프로그램이 자주 연결을 여닫는 경우, 암시적 연결 풀링을 활성화하지 않고도 DRCP를 통해 혜택을 받을 수 있을 수도 있습니다. Connection Pool을 사용하지 않는 앱에 도움을 주는 DRCP helps apps that don’t use a Connection Pool 블로그 포스트를 참조하세요.

응용 프로그램 수준에서 암시적 연결 풀링이 맞지 않는 경우도 있습니다. 이 게시물의 예제에서 보았듯이 각각의 SQL 문에 대해 "사용자"가 본 세션 식별자와 일련 번호는 해당 사용자 스크립트의 수명 동안 변할 수 있습니다. 그래서 귀하의 앱이 값이 변경되지 않는 것을 의존한다면, 암시적 연결 풀링이 적합하지 않을 수 있습니다.

<div class="content-ad"></div>

여러 개의 커서를 동시에 사용하거나 LOB를 스트리밍할 때 TRANSACTION을 문 단위로 사용하는 것은 문제가 발생할 수 있는 적합한 예입니다. 이러한 시나리오에서는 어떤 어플리케이션 커밋이든 열린 커서를 무효화하거나 LOB 스트리밍을 방해할 수 있습니다.

Implicit Connection Pooling을 사용할 때 어플리케이션을 철저히 테스트해야 합니다. 이렇게 하면 데이터베이스 서버와 세션의 내부 재사용이 문제를 일으키지 않도록 할 수 있습니다.

# 결론

Implicit Connection Pooling을 사용하면 연결을 오랫동안 유지하는 애플리케이션이 데이터베이스 서버 프로세스와 세션 메모리를 공유할 수 있습니다. 이는 데이터베이스 호스트의 메모리 부하를 줄이고 전체 시스템을 확장 가능하게 만듭니다. Implicit Connection Pooling은 단일 연결을 열거나 Oracle이 제공하는 애플리케이션 연결 풀을 사용하는 대신 자체 연결 풀링 솔루션을 구현하는 앱에 유용할 수 있습니다. 인기 있는 Oracle 데이터베이스 드라이버에서 지원됩니다.

<div class="content-ad"></div>

이 게시물은 암시적 연결 풀링이 DRCP를 사용하는 방법에 대해 논의했습니다. 또한 귀하의 시스템이 Oracle Connection Manager를 Traffic Director 모드로 사용하는 경우 PRCP를 사용할 수도 있습니다.

암시적 연결 풀링에 대한 동영상은 동료 Sharad Chandran R의 노력 없는 연결 관리와 Oracle Database 23c의 암시적 풀링을 참조하십시오.

# 참고 자료

- 동영상: Oracle Database 23c의 암시적 풀링을 통한 노력 없는 연결 관리 (비디오).
- Python-oracledb 문서: 암시적 연결 풀링.
- Node-oracledb 문서: 암시적 연결 풀링.
- 블로그 게시물: 항상 연결 풀을 사용하십시오 - 및 방법.
- 블로그 게시물: DRCP는 연결 풀을 사용하지 않는 앱에 도움을 줍니다.
- 기술 브리프: 데이터베이스 레지던트 연결 풀링 (DRCP)을 사용한 Oracle 데이터베이스 연결 확장 가능성.
- 기술 브리프: CMAN-TDM - 확장 가능하고 고가용성 애플리케이션용 Oracle 데이터베이스 연결 프록시.