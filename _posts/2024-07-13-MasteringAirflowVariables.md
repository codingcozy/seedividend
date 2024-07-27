---
title: "Airflow 변수 완전 정복하는 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-13-MasteringAirflowVariables_0.png"
date: 2024-07-13 20:34
ogImage: 
  url: /TIL/assets/img/2024-07-13-MasteringAirflowVariables_0.png
tag: Tech
originalTitle: "Mastering Airflow Variables"
link: "https://medium.com/towards-data-science/mastering-airflow-variables-32548a53b3c5"
---


<img src="/TIL/assets/img/2024-07-13-MasteringAirflowVariables_0.png" />

만약 여러 데이터 파이프라인이 동일한 API 엔드포인트와 상호 작용해야 하는 상황이 있다면, 정말 모든 파이프라인에서 이 엔드포인트를 선언해야 할까요? 이 엔드포인트가 나중에 변경된다면, 모든 파일에서 해당 값을 업데이트해야 합니다.

Airflow 변수는 간단하면서도 가치 있는 구조로, 여러 DAG에서 중복 선언을 방지하는 데 사용됩니다. 이들은 단순히 키와 JSON 직렬화 가능한 값으로 구성된 객체로, Airflow의 메타데이터베이스에 저장됩니다.

그리고 코드가 토큰이나 기타 유형의 비밀을 사용한다면 어떻게 해야 할까요? 평문으로 하드코딩하는 것은 안전한 접근 방식으로 보이지 않습니다. 반복을 줄이는 데 beyond하는 Airflow 변수는 민감한 정보를 관리하는 데도 도움이 됩니다. Airflow에서 변수를 정의하는 여섯 가지 다양한 방법 중에서 적합한 방법을 선택하는 것은 보안과 이식성을 보장하기 위해 중요합니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

자주 간과되는 측면 중 하나는 변수 검색이 Airflow 성능에 미치는 영향입니다. 스케줄러가 DAG 파일을 파싱할 때마다 메타데이터베이스에 요청하는 것은 성능에 부담이 될 수 있습니다(기본값은 삼십 초입니다).

이 함정에 빠지기는 꽤 쉽습니다. DAG를 구문 분석하는 방법과 데이터베이스에서 변수를 검색하는 방법을 이해하지 않는 한요하는 베스트 프렉티스를 적용하는 것이 중요합니다.

# Airflow 변수 정의

DAG 파일을 파싱하는 방법과 DAGs를 최적화하기 위해 적용해야 하는 베스트 프렉티스에 대해 논의하기 전에, 기초를 제대로 이해하는 것이 중요합니다. 여기서는 어떻게 Airflow에서 변수를 선언하는지에만 초점을 맞춰 보겠습니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

이미 언급한 바와 같이, Airflow에서 변수를 선언하는 여러 가지 방법이 있습니다. 그 중 일부는 다른 것보다 더 안전하고 이식성이 뛰어난 것으로 나타나므로, 이들의 장단점을 살펴보고 이해해 봅시다.

## 1. 사용자 인터페이스에서 변수 생성

첫 번째 방법으로, 사용자 인터페이스를 통해 변수를 생성하는 방법을 살펴보겠습니다. 상위 메뉴에서 Admin → Variables → + 를 선택합니다.

키와 값을 입력한 후, 만들기를 클릭하여 생성합니다. 변수는 이제 변수 목록에서 확인할 수 있어야 합니다. 기본적으로 UI에서 생성된 변수는 자동으로 메타데이터 데이터베이스에 저장됩니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

변수 값이 평문으로 표시된다는 것을 알 수 있어요. Airflow 변수 중 민감한 정보를 저장하려면 UI 방식이 가장 적합하지 않을 수 있어요.

또한, 이 방법은 이식성이 떨어집니다. 환경을 재생성하려면 먼저 현재 환경에서 수동으로 내보내고, 마지막으로 새로 만든 환경으로 다시 가져와야 해요.

## 2. 환경 변수를 내보내어 변수 생성하기

두 번째 옵션은 AIRFLOW_VAR_`변수_이름` 표기법을 사용하여 환경 변수를 내보내는 것이에요.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

다음 명령어를 사용하여 두 변수인 foo와 bar를 생성할 수 있습니다.

```js
export AIRFLOW_VAR_FOO=my_value
export AIRFLOW_VAR_BAR='{"newsletter":"Data Pipeline"}'
```

이 방법의 장점 중 하나는 환경 변수를 통해 생성된 변수가 UI에 표시되지 않는다는 것입니다(물론 코드에서 참조할 수는 있습니다). 즉, 민감한 정보가 노출되지 않습니다.

UI를 통해 생성된 변수와는 달리, 이 방법은 메타데이터베이스에 지속적으로 저장하지 않습니다. 따라서 환경 변수를 사용하면 데이터베이스 연결을 설정할 필요가 없어 빠르게 검색할 수 있습니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

하지만 여전히 환경 변수를 관리하는 것도 어려울 수 있습니다. 환경 변수가 Airflow 배포를 담당하는 자동화 스크립트에서 사용되는 파일에 저장된 경우 값들을 어떻게 안전하게 보호할 수 있을까요?

## 3. Airflow CLI를 통한 변수 생성

Airflow CLI를 사용하여 변수를 생성할 수도 있습니다. 먼저 Airflow 스케줄러 워커에 연결해야 합니다. 예를 들어 Docker를 통해 Airflow를 실행 중이라면, 먼저 스케줄러의 컨테이너 ID를 찾은 다음 다음 명령을 실행하세요.

```js
docker exec -it <airflow-scheduler-container-id> /bin/bash
```

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

Airflow 변수를 만들려면 다음의 명령어를 사용할 수 있어요:

```js
airflow variables set \
    my_cli_var \
    my_value \
    --description '이 변수는 CLI를 통해 생성되었어요'
```

만약 특정 변수에 여러 값을 할당하려면 JSON 형식을 사용하는 것이 좋아요:

```js
airflow variables set \
    my_cli_json_var \
    '{"key": "value", "another_key": "another_value"}' \
    --description '이 변수는 CLI를 통해 생성되었어요'
```

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

JSON 변수를 직렬화하는 옵션도 있습니다. 이를 위해 -j 또는 --json 플래그를 제공하여 수행할 수 있습니다.

```js
airflow variables set \
    --json \
    my_cli_serialised_json_var \
    '{"key": "value", "another_key": "another_value"}' \
    --description 'CLI를 통해 생성된 이 변수'
```

이제 UI의 변수 목록으로 돌아가보면, 이전 단계에서 만든 세 가지 변수가 모두 표시됩니다.

CLI를 통해 생성된 변수는 UI에서 확인할 수 있어 민감한 정보도 노출되고 메타데이터베이스에 저장될 수 있습니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

내 의견으로는, 이 방법은 개발 환경에서 유용합니다. 특정 변수를 빠르게 생성하고 테스트하거나 해당 변수를 참조하는 기능을 테스트하고 싶을 때 유용합니다. 프로덕션 배포의 경우, 변수를 생성(또는 업데이트)하기 위한 자동화 스크립트를 작성해야 하며, 이 정보는 파일에 저장되어야 합니다. 그렇기 때문에 몇 가지 변수에는 민감한 정보가 포함될 수 있어 처리하기 어려울 수 있습니다.

## 4. REST API를 사용하여 변수 생성

이 네 번째 방법은 REST API를 호출하여 몇 가지 변수를 생성하는 것을 포함합니다. 이는 Airflow CLI 방식과 유사하며 동일한 장단점을 제공합니다.

```js
curl -X POST ${AIRFLOW_URL}/api/v1/variables \
        -H "Content-Type: application/json" \
        --user "${AIRFLOW_USERNAME}:${AIRFLOW_PASSWORD}" \
        -d '{"key": "json_var", "value": "{\"key1\":\"val1\"}"}'
```

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 5. 변수를 프로그래밍적으로 생성하기

프로그래밍적으로 변수를 생성하는 것도 실행 가능하고 간단합니다.

```js
def create_vars():
    from airflow.models import Variable

    Variable.set(key='my_var', value='my_val')
    Variable.set(
        key='my_json_var', 
        value={'my_key': 23, 'another_key': 'another_val'}, 
        serialize_json=True,
    )

...

PythonOperator(
    task_id='create_variables',
    python_callable=create_vars,
)
```

물론 이것은 나쁜 관행이며 프로덕션 배포에서 피해야 합니다. 변수 - 특히 민감한 정보를 포함하는 변수 - 는 DAG 파일에서 선언되어서는 안 되며 코드는 버전 관리되고 UI의 코드 탭에서도 볼 수 있기 때문입니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

## 6. 시크릿 스토어/백엔드에서 변수 만들기 ❤

환경 변수나 메타스토어 데이터베이스에서 변수를 검색하는 것 외에도 Airflow 변수를 검색하기 위해 대체 시크릿 백엔드를 활성화할 수 있습니다.

현재 Apache Airflow 커뮤니티에서 제공하는 시크릿 백엔드 구현에는 다음이 포함됩니다:

- Amazon (Secrets Manager 및 Systems Manager Parameter Store)
- Google (Cloud Secret Manager)
- Microsoft (Azure Key Vault)
- HashiCorp (Vault)

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

사실, Airflow에서 변수를 정의하는 가장 좋고 안전하며 휴대성이 뛰어난 방법입니다.

# 민감한 변수 값 숨기기

이전 섹션에서 설명한 몇 가지 방법 중 일부에서 민감한 정보가 실제로 사용자 인터페이스에 표시될 수 있다고 언급했습니다. 사실, 변수가 올바르게 이름 지어진 경우에는 민감한 값을 숨길 수 있습니다.

변수 이름에 특정 키워드가 포함되어 민감한 정보를 나타낼 수 있다고 생각되면 해당 값이 자동으로 숨겨집니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

다음은 민감한 정보를 값으로 저장하게끔 변수를 자격 부여할 키워드 목록입니다:

```js
access_token
api_key
apikey
authorization
passphrase
passwd
password
private_key
secret
token
keyfile_dict
service_account
```

만약 변수 이름에 이 키워드 중 하나가 포함되어 있다면, Airflow는 해당 값을 적절히 처리할 것입니다. 이 기능이 예상대로 작동하는지 확인하기 위해 예제를 시도해 보겠습니다.

먼저, 위에 언급된 키워드 중 하나를 추가하지 않고 새 변수를 만들어 보겠습니다. 우리는 변수의 값이 사용자 인터페이스에서 보이는 것을 확인할 수 있습니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

다음 화면에서는 새로운 변수인 my_api_key를 생성하려고 시도합니다. 이전에 토론한 대로 변수 이름에 api_key 키워드가 포함되어 있기 때문에 Airflow는 민감한 정보를 보호하는 방식으로 해당 값을 처리해야 합니다.

실제로 지금 UI의 변수 목록으로 돌아가보면 새로 생성된 변수의 값을 숨겨진 것을 볼 수 있습니다.

기존 키워드 목록에 만족스럽지 않다면, 추가적인 키워드를 지정하여 변수 값 숨김 시 고려해야 하는 키워드 목록을 확장할 수도 있습니다. 이는 airflow.cfg( [core] 섹션 내)의 sensitive_var_conn_names를 통해 구성하거나 AIRFLOW__CORE__SENSITIVE_VAR_CONN_NAMES 환경 변수를 내보내는 것으로 설정할 수 있습니다.

# 효율적인 변수 검색

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

기본 설정으로 Airflow DAG는 30초마다 구문 분석됩니다. 스케줄러는 DAG 폴더를 스캔하여 DAG 파일에 대한 변경 사항을 식별합니다. 변수를 올바르게 가져오지 않으면 DAG 구문 분석 프로세스가 곧 병목 현상이 될 수 있습니다.

변수를 선언하는 방법에 따라 Airflow는 DAG 파일에서 선언된 각 변수에 대해 메타스토어 데이터베이스에 연결을 초기화해야 할 수 있습니다.

# 요청으로 메타스토어 과부하 피하기

DAG에서 변수를 검색하기 위해 두 가지 접근 방식을 취할 수 있습니다:

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

- Variable.get() 함수 사용
- var 템플릿 변수 사용

만약 첫 번째 옵션을 선택하신 경우, Variable.get()은 지정된 변수의 값을 추론하기 위해 메타스토어 데이터베이스와의 새로운 연결을 생성할 것입니다. 이제 DAG 파일에서 이 함수를 호출하는 위치는 성능에 큰 영향을 미칠 수 있습니다.

## 잘못된 예시

만약 이 함수가 태스크 외부에서 호출되거나 DAG Context Manager 내에서 호출된다면, 메타스토어와의 -의미 없는- 새로운 연결이 DAG가 파싱될 때마다 생성될 것입니다(즉, 30초마다).

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```python
from datetime import datetime

from airflow import DAG
from airflow.models import Variable
from airflow.operators.python import PythonOperator

my_var = Variable.get('my_var')

with DAG('my_dag', start_date=datetime(2024, 1, 1)) as dag:
    print_var = PythonOperator(
        task_id='print_var',
        python_callable=lambda: print(my_var),
    )
```

만약 동일한 패턴이 많은 다른 DAG에서 사용된다면, 언젠가는 메타스토어 데이터베이스에 문제가 발생할 수 있습니다.

실제로 이 패턴을 피할 수 없는 몇 가지 예외적인 상황이 있습니다. 예를 들어 변수의 값에 따라 동적으로 작업을 생성하고 싶다고 가정해보겠습니다. 그 경우 해당 함수를 작업 외부에서 호출하거나 Context Manager 내에서 호출해야 할 수도 있습니다. 하지만 가능하면 이 접근 방식을 피하는 것이 중요합니다.

또한, 연산자의 인수에서 Variable.get() 함수를 호출하더라도 동일한 문제가 발생할 것임을 언급하는 것이 중요합니다.


<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```python
from datetime import datetime

from airflow import DAG
from airflow.models import Variable
from airflow.operators.python import PythonOperator

def _print_var(my_var):
    print(my_var)
with DAG('my_dag', start_date=datetime(2024, 1, 1)) as dag:
    print_var = PythonOperator(
        task_id='print_var',
        python_callable=_print_var,
        op_args=[Variable.get('my_var')],
    )
```

사실 템플릿 엔진을 사용하면 이런 문제를 쉽게 피할 수 있어요.

## Best Practices

기본적으로 Variable.get()를 호출하는 대신에 템플릿 참조를 사용할 수 있어요. 이 기술을 사용하면 변수의 값은 런타임에만 가져와지게 돼요.


<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

아래의 코드 스니펫은 JSON 또는 JSON이 아닌 값에 대한 변수의 템플릿 참조를 사용하는 방법을 보여줍니다.

```js
from datetime import datetime

from airflow import DAG
from airflow.models import Variable
from airflow.operators.python import PythonOperator

def _print_var(val1, val2, val3, val4):
    print(val1)
    print(val2)
    print(val3)
    print(val4)

with DAG('my_dag', start_date=datetime(2024, 1, 1)) as dag:
    print_var = PythonOperator(
        task_id='print_var',
        python_callable=_print_var,
        op_args=[
            '{ var.value.my_var }',
            '{ var.json.my_vars.key1 }',
            '{ var.json.my_vars.key2 }',
            '{ var.json.my_vars.key3 }',
        ],
    )
```

그러나 템플릿 엔진 접근 방식은 템플릿 참조를 제공할 인수에 대해 오퍼레이터가 템플릿화된 필드를 지원하는 경우에만 적용됩니다.

템플릿 참조가 작동하지 않는 경우에는 여전히 Variable.get()이 작업 내에서 호출되도록하여 매번 DAG가 구문 분석될 때 메타스토어 데이터베이스로의 연결이 초기화되지 않도록 할 수 있습니다.

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```python
from datetime import datetime

from airflow import DAG
from airflow.models import Variable
from airflow.operators.python import PythonOperator

def _print_var():
    my_var = Variable.get('my_var')
    print(my_var)

with DAG('my_dag', start_date=datetime(2024, 1, 1)) as dag:
    print_var = PythonOperator(
        task_id='print_var',
        python_callable=_print_var,
    )
```

# 단일 변수에 여러 값을 저장하기

이제 특정 DAG가 세 가지 다른 값을 검색해야 한다고 가정해 봅시다. 이전 섹션에서 소개된 최선의 방법을 따르더라도 메타스토어 데이터베이스에 대해 세 개의 개별 연결을 시작해야 합니다.

```python
from datetime import datetime

from airflow import DAG
from airflow.models import Variable
from airflow.operators.python import PythonOperator

def _print_vars():
    my_var = Variable.get('my_var')
    another_var = Variable.get('another_var')
    one_more_var = Variable.get('one_more_var')
    print(my_var)
    print(another_var)
    print(one_more_var)

with DAG('my_dag', start_date=datetime(2024, 1, 1)) as dag:
    print_var = PythonOperator(
        task_id='print_vars',
        python_callable=_print_vars,
    )
```

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

대신, 세 개의 키-값 쌍으로 구성된 단일 JSON 변수를 생성할 수 있습니다. 당연히 이 작업은 세 값을 한 변수로 압축하는 데 논리적으로 의미가 있는 한 수행해야 합니다.

이제 메타스토어 데이터베이스로의 연결을 한 번만 수행하여 변수에서 지정된 모든 키의 값을 검색할 수 있습니다.

```js
from datetime import datetime

from airflow import DAG
from airflow.models import Variable
from airflow.operators.python import PythonOperator

def _print_vars():
    my_vars = Variable.get('my_vars', deserialize_json=True)
    print(my_vars['key1'])
    print(my_vars['key2'])
    print(my_vars['key3'])

with DAG('my_dag', start_date=datetime(2024, 1, 1)) as dag:
    print_var = PythonOperator(
        task_id='print_vars',
        python_callable=_print_vars,
    )
```

# 최종 생각..

<!-- TIL 수평 -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

에어플로우 변수 선언은 간단하지만, 가장 좋은 방법을 적용하지 않으면 메타스토어 데이터베이스에서 가져오는 과정이 악몽이 될 수 있습니다.

이 튜토리얼에서는 여섯 가지 다른 방법으로 에어플로우 변수를 생성하는 방법을 보여드렸습니다. 각 접근 방식에는 장단점이 있으며, 그에 맞춰 사용해야 합니다. 프로덕션 배포에서의 최상의 관례는 보안과 이식성을 제공하는 백엔드 시크릿을 사용하는 것입니다.

더 중요한 건, 에어플로우 데이터베이스를 과부하시키지 않기 위해 피해야 할 기술들과 변수 구조 활용의 최적화 방법에 대해 논의했습니다. 이제 변수는 템플릿 참조를 통해 유추하거나 작업 함수 정의 내에서 정의되어야 한다는 점이 분명해졌기를 바랍니다.