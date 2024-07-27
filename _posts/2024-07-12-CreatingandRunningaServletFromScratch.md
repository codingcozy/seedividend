---
title: "처음부터 서블릿 만들기와 실행하는 방법"
description: ""
coverImage: "/assets/img/2024-07-12-CreatingandRunningaServletFromScratch_0.png"
date: 2024-07-12 21:29
ogImage: 
  url: /assets/img/2024-07-12-CreatingandRunningaServletFromScratch_0.png
tag: Tech
originalTitle: "Creating and Running a Servlet From Scratch"
link: "https://medium.com/codex/creating-and-running-a-servlet-from-scratch-6c9a23d74afb"
---



![Servlet](/assets/img/2024-07-12-CreatingandRunningaServletFromScratch_0.png)

자바 프로그래머로서, 우리는 IDE 및 웹 프레임워크를 사용하는 것에 익숙할 수 있습니다. IDE는 우리를 위해 컴파일 및 패키징을 처리하고, Spring과 같은 프레임워크는 Servlet 인터페이스를 구현하고 웹 컨테이너에 Servlet을 등록합니다. 이는 Servlet을 개발하는 방법, Servlet을 컴파일하는 방법 또는 웹 컨테이너에서 실행하는 방법과 같은 더 근본적인 측면을 거의 만나지 않는다는 것을 의미합니다.

오늘은 IDE를 제쳐두고 프레임워크를 사용하지 않을 것입니다. 대신에 Servlet을 수동으로 생성하고 Tomcat에서 실행할 것입니다. 이로써 Servlet에 대한 이해를 더욱 깊게 하고 Tomcat의 기본 기능에 익숙해지는 데 도움이 될 것입니다.

주요 단계는 다음과 같습니다:


<div class="content-ad"></div>

- Tomcat을 다운로드하고 설치하세요.
- HttpServlet을 확장하는 Java 클래스를 작성하세요.
- Java 클래스 파일을 .class 파일로 컴파일하세요.
- 웹 애플리케이션을 위한 디렉토리 구조를 설정하고 web.xml을 구성하세요.
- 웹 애플리케이션을 배포하세요.
- Tomcat을 시작하세요.
- 브라우저를 통해 애플리케이션에 접근하여 결과를 확인하세요.
- Tomcat 로그를 확인하세요.

각 단계를 따라하면서 프로세스를 완료할 수 있습니다. Servlet 3.0 사양은 Servlet을 배포할 때 주석을 사용하는 것을 지원하므로 web.xml을 구성할 필요가 없습니다. 저는 마지막에 주석을 사용하여 Servlet을 배포하는 방법을 보여드릴 것입니다.

## 1. Tomcat 다운로드 및 설치

Tomcat의 최신 버전은 직접 공식 웹사이트에서 다운로드할 수 있습니다. 사용 중인 운영 체제에 따라 적절한 버전을 다운로드하세요. 이 예시에서는 맥 시스템을 사용합니다. 다운로드한 후에는 간단히 아카이브를 해제하세요. 해제 후 디렉토리 구조는 다음과 같습니다:

<div class="content-ad"></div>

<img src="/assets/img/2024-07-12-CreatingandRunningaServletFromScratch_1.png" />

Tomcat 설치 디렉토리의 주요 디렉토리를 간단히 살펴보겠습니다:

- /bin: Windows 또는 Linux 플랫폼에서 Tomcat을 시작하고 중지하는 스크립트 파일이 포함되어 있습니다.
- /conf: server.xml이 가장 중요한 전역 설정 파일을 포함하고 있습니다.
- /lib: Tomcat과 모든 웹 애플리케이션에서 액세스할 수 있는 JAR 파일을 저장합니다.
- /logs: Tomcat 실행 중에 생성된 로그 파일을 보관합니다.
- /work: JSP 컴파일 출력 및 임시 파일을 포함합니다.
- /webapps: 웹 애플리케이션을 배포하는 기본 디렉토리입니다.

## 2. HttpServlet을 상속하는 Java 클래스 생성하기

<div class="content-ad"></div>

javax.servlet 패키지는 Servlet 인터페이스를 구현하는 GenericServlet 추상 클래스를 제공합니다. 이 클래스는 Servlet을 만들기 위해 확장할 수 있는 편리한 클래스입니다. 그러나 대부분의 Servlet은 HTTP 환경에서 요청을 처리하므로 Servlet 사양은 GenericServlet을 확장하고 HTTP 기능을 추가한 HttpServlet을 제공합니다. HttpServlet 클래스를 상속받아 doGet 및 doPost 두 가지 메서드만 재정의하여 우리만의 Servlet을 구현할 수 있습니다.

따라서 HttpServlet 클래스를 확장하고 doGet 및 doPost 메서드를 재정의하는 Java 클래스를 생성합니다. 먼저 MyServlet.java라는 파일을 만들고 다음 코드를 입력하세요:

```java
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MyServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        System.out.println("MyServlet Handling GET Requests...");
        PrintWriter out = response.getWriter();
        response.setContentType("text/html;charset=utf-8");
        out.println("<strong>My Servlet!</strong><br>");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        System.out.println("MyServlet Handling POST Requests...");
        PrintWriter out = response.getWriter();
        response.setContentType("text/html;charset=utf-8");
        out.println("<strong>My Servlet!</strong><br>");
    }

}
```

이 Servlet은 매우 간단한 작업을 수행합니다. doGet() 및 doPost() 메서드의 본문에 기본 HTML 스니펫을 반환합니다.

<div class="content-ad"></div>

## 3. Java 파일을 클래스 파일로 컴파일하기

이제 MyServlet.java 파일을 .class 파일로 컴파일해야 합니다. 먼저 JDK를 설치해야 합니다; 저는 여기서 JDK 10을 사용하고 있습니다. 그런 다음, Tomcat lib 디렉토리에서 servlet-api.jar를 현재 디렉토리로 복사해야 합니다. 이것은 Servlet 클래스가 구현하는 Servlet 인터페이스를 포함하고 있기 때문에 Servlet 클래스를 컴파일할 때이 JAR 파일이 필요합니다. 그런 다음 컴파일 명령을 실행할 것입니다:

```js
javac -cp ./servlet-api.jar MyServlet.java
```

성공적으로 컴파일한 후에, 현재 디렉토리에 MyServlet.class라는 파일을 찾을 수 있을 것입니다.

<div class="content-ad"></div>

## 4. 웹 애플리케이션을 위한 디렉토리 구조 설정

서블릿은 톰캣에 웹 애플리케이션의 일부로 배포되며, 웹 애플리케이션에는 특정한 디렉토리 구조가 있습니다. 따라서 우리는 MyWebApp이라는 웹 애플리케이션 폴더를 만든 다음 이 폴더 아래에 아래와 같이 서브디렉토리를 만들 것입니다:

- MyWebApp/WEB-INF/web.xml
- MyWebApp/WEB-INF/classes/MyServlet.class

그런 다음, 다음 내용으로 web.xml에 서블릿을 구성하세요:

<div class="content-ad"></div>

```js
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee
  http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
  version="4.0"
  metadata-complete="true">
 
    <description> Servlet Example. </description>
    <display-name> MyServlet Example </display-name>
    <request-character-encoding>UTF-8</request-character-encoding>
 
    <servlet>
      <servlet-name>myServlet</servlet-name>
      <servlet-class>MyServlet</servlet-class>
    </servlet>
 
    <servlet-mapping>
      <servlet-name>myServlet</servlet-name>
      <url-pattern>/myservlet</url-pattern>
    </servlet-mapping>
 
</web-app>
```

웹.xml 파일에서 Servlet의 이름, 특정 클래스 및 이 Servlet에 대한 URL 경로가 구성되어 있는 것을 볼 수 있습니다. servlet과 servlet-mapping 요소의 servlet-name이 일치해야 함을 유의하십시오.

## 5. 웹 애플리케이션 배포하기

Tomcat 애플리케이션을 배포하는 것은 매우 간단합니다. MyWebApp 디렉토리를 Tomcat 설치 디렉토리의 webapps 디렉토리로 복사하기만 하면 됩니다.

<div class="content-ad"></div>

## 6. 톰캣 시작하기

톰캣 설치 디렉토리 아래의 bin 디렉토리를 찾아서 사용 중인 운영 체제에 따라 적절한 시작 스크립트를 실행하십시오. Windows를 사용 중이라면 startup.bat을 실행하십시오. Linux를 사용 중이라면 startup.sh를 실행하십시오.

## 7. 결과 확인하기

웹 브라우저에서 다음 URL에 액세스하십시오: http://localhost:8080/MyWebApp/myservlet. 확인되어야 하는 내용은 다음과 같습니다:

<div class="content-ad"></div>

```js
내 서블릿!

URL 경로에서 중요한 점은 MyWebApp이 웹 애플리케이션의 이름이고 myservlet이 web.xml에 구성된 Servlet의 경로임을 알 수 있습니다.

Tomcat 설치 디렉토리에있는 logs 디렉토리를 열어보세요. Tomcat의 로그 정보는 다음 두 유형으로 구분됩니다:

- 런타임 로그: 이러한 로그는 주로 런타임 중에 예외 및 오류 로그를 기록합니다.
- 접속 로그: 접속 시간, IP 주소, 요청 경로 등과 같은 정보를 기록하는 이러한 로그들이 있습니다.
```

<div class="content-ad"></div>

각 로그 파일에 대한 간단한 설명은 다음과 같습니다:

- catalina.***.log 이 파일은 주로 Tomcat 시작 프로세스에 관한 정보를 기록하며, JVM 매개변수와 운영 체제 로그를 포함합니다.
- catalina.out catalina.out은 Tomcat의 표준 출력(stdout) 및 표준 오류(stderr)를 나타내며, Tomcat 시작 스크립트에서 지정됩니다. 수정되지 않았다면, stdout와 stderr는 이 파일로 리디렉션됩니다. 따라서 여기에서 MyServlet.java 프로그램이 출력하는 정보를 볼 수 있습니다: MyServlet handling GET request...
- localhost.**.log 이 파일은 웹 애플리케이션 초기화 중 발생한 처리되지 않은 예외를 기록합니다. Tomcat은 이러한 예외를 포착하여 이 로그 파일로 출력합니다.
- localhost_access_log.**.txt 이 파일은 Tomcat에 대한 요청 로그를 포함하여 IP 주소, 요청 경로, 시간, 요청 프로토콜 및 상태 코드와 같은 정보를 기록합니다.
- manager.***.log / host-manager.***.log 이 파일들은 Tomcat의 내장 Manager 및 Host Manager 웹 애플리케이션에 대한 로그 정보를 포함합니다.

## 주석을 사용하여 서블릿 배포하기

주석을 사용하여 서블릿을 배포하는 방법을 보여주기 위해, 먼저 서블릿 클래스에 @WebServlet 주석을 추가하여 Java 코드를 수정합니다. 업데이트된 코드는 다음과 같습니다:

<div class="content-ad"></div>

```java
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/myAnnotationServlet")
public class AnnotationServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        System.out.println("AnnotationServlet Handling GET Requests......");
        PrintWriter out = response.getWriter();
        response.setContentType("text/html; charset=utf-8");
        out.println("<strong>Annotation Servlet!</strong><br>");

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        System.out.println("AnnotationServlet Handling POST Requests......");
        PrintWriter out = response.getWriter();
        response.setContentType("text/html; charset=utf-8");
        out.println("<strong>Annotation Servlet!</strong><br>");

    }

} 
```

이 코드에서 가장 중요한 부분은 @WebServlet 어노테이션이며, 두 가지 주요 정보를 전달합니다:

- AnnotationServlet Java 클래스가 서블릿임을 나타냅니다.
- 이 서블릿의 URL 경로는 myAnnotationServlet입니다.

```java
@WebServlet("/myAnnotationServlet")
```

<div class="content-ad"></div>

자바 클래스를 생성한 후 일반적으로 컴파일하고 MyWebApp의 class 디렉토리에 생성된 .class 파일을 둡니다. Servlet 구성에 웹.xml이 더 이상 필요하지 않기 때문에 원래 웹.xml을 삭제해야 합니다. 그런 다음 Tomcat을 다시 시작하고 브라우저에서 다음 URL을 입력하여 새로운 AnnotationServlet이 성공적으로 배포되었는지 확인하세요: http://localhost:8080/MyWebApp/myAnnotationServlet. 결과를 확인해야 합니다:

```js
Annotation Servlet!
```

이것은 AnnotationServlet이 성공적으로 배포된 것을 나타냅니다. 어노테이션을 사용하여 Servlet 초기화 매개변수 설정 및 필터 및 리스너 구성을 포함한 웹.xml의 모든 구성 기능을 달성할 수 있습니다.

# 결론

<div class="content-ad"></div>

오늘의 학습과 실습을 통해 이제 HttpServlet을 확장하여 자체 Servlet을 만드는 방법, Servlet을 컴파일하는 방법, 그리고 web.xml을 사용하여 Servlet을 배포하는 방법을 이해하게 되셨어요. 또한 Tomcat을 시작하는 방법, 다양한 Tomcat 로그를 확인하는 방법, 그리고 어노테이션을 사용하여 Servlet을 배포하는 방법도 연습했어요. 이 실습을 통해 Servlet이 어떻게 작동하는지에 대한 이해가 깊어지리라 믿어요.

오늘의 실습 목적은 IDE와 웹 프레임워크가 우리를 대신해 무엇을 하는지 보여주는 것입니다. IDE와 프레임워크의 내부 동작을 이해하는 것은 문제 해결에 중요한데, 개발 환경에서 작은 문제라도 주요한 머리 아픔이 될 수 있기 때문이에요.

![이미지](/assets/img/2024-07-12-CreatingandRunningaServletFromScratch_2.png)