---
title: "Spring Boot 3 애플리케이션에서 JWT 인증 구현 방법"
description: ""
coverImage: "/assets/img/2024-07-07-ImplementJWTauthenticationinaSpringBoot3application_0.png"
date: 2024-07-07 02:35
ogImage:
  url: /assets/img/2024-07-07-ImplementJWTauthenticationinaSpringBoot3application_0.png
tag: Tech
originalTitle: "Implement JWT authentication in a Spring Boot 3 application"
link: "https://medium.com/@tericcabrel/implement-jwt-authentication-in-a-spring-boot-3-application-5839e4fd8fac"
isUpdated: true
---

<img src="/assets/img/2024-07-07-ImplementJWTauthenticationinaSpringBoot3application_0.png" />

웹 개발 및 애플리케이션 보안의 무한한 변화 속에서 견고한 인증 메커니즘이 절대적으로 중요해졌어요. API를 공개하면서 리소스에 대한 권한 있는 액세스만 허용하는 것이 중요합니다.

현대 웹 애플리케이션에서 가장 인기 있는 효과적인 인증 방법 중 하나는 JSON Web Tokens (JWT) 입니다. 사용자의 신원을 확인하고 API 엔드포인트를 안전하게 보호하는 유연하고 상태를 유지하지 않는 방식을 제공합니다. 이를 토큰 기반 인증이라고도 합니다.

이 글에서는 Spring Boot 3 애플리케이션에서 JWT 인증을 구현하는 방법에 대해 알아볼 거에요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 만들 것

API는 인증 없이 접근 가능한 경로와 인증이 필요한 경로를 노출해야 합니다. 아래는 경로입니다:

- [POST] /auth/signup → 새 사용자 등록
- [POST] /auth/login → 사용자 인증
- [GET] /users/me → 현재 인증된 사용자 검색
- [GET] /users → 현재 인증된 사용자 검색

"/auth/signup" 및 "/auth/login" 경로에는 인증 없이 액세스할 수 있지만, "users/me" 및 "users"는 인증이 필요합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 전제 조건

이 튜토리얼을 따라가려면 컴퓨터에 다음 도구들을 설치해야 합니다.

- JDK 11 이상 — [다운로드 링크](링크를 입력하세요)
- Maven 3.8 이상 — [다운로드 링크](링크를 입력하세요)
- Docker에서 실행 중인 MySQL — [다운로드 링크](링크를 입력하세요)
- Postman, Insomnia, cURL 등의 HTTP 클라이언트

MySQL 8을 위해 Docker를 사용하여 컨테이너를 실행해야 합니다. 컴퓨터에 MySQL이 이미 설치되어 있는 경우 Docker를 건너뛸 수 있습니다. MySQL 이미지에서 Docker 컨테이너를 시작하려면 아래 명령을 실행하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

docker run -d -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=taskdb --name mysqldb -p 3307:3306 mysql:8.0

# 프로젝트 설정하기

Spring Boot 프로젝트를 설정하는 데 필요한 네 가지 종속성은 다음과 같습니다:

- Spring Web: Spring MVC를 사용하여 RESTful 응용 프로그램을 구축하기 위한 것입니다. 기본 임베디드 컨테이너로서 Apache Tomcat을 사용합니다.
- Spring Security: 인증 및 기반 액세스 제어를 구현할 수 있습니다.
- Spring Data JPA: Spring Data 및 Hibernate를 사용하여 Java Persistence API로 SQL 저장소에 데이터를 지속할 수 있습니다.
- MySQL Driver for Java: MySQL 드라이버를 사용하면 Java 애플리케이션에서 데이터베이스와 상호 작용할 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

Spring Boot 온라인 프로젝트 시작기는 이러한 종속성으로 프로젝트를 생성하는 데 도움이 되며, 새 프로젝트를 생성하려면 start.spring.io URL로 이동하세요.

![이미지](/assets/img/2024-07-07-ImplementJWTauthenticationinaSpringBoot3application_1.png)

나는 Java 17 및 Maven을 의존성 관리자로 선택했지만, 원하는 것을 사용할 수 있습니다.

"생성" 버튼을 클릭하여 프로젝트를 다운로드하고, IDE에서 열고 Maven 종속성을 설치하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 데이터베이스 연결 구성

애플리케이션을 데이터베이스에 연결하고 Hibernate를 사용하여 데이터베이스 테이블을 생성하도록 구성해보겠습니다. src/resources/application.properties 파일을 열어 아래 코드를 추가해주세요:

```js
server.port=8005

spring.datasource.url=jdbc:mysql://localhost:3307/taskdb?serverTimezone=UTC&allowPublicKeyRetrieval=true&useSSL=false
spring.datasource.username=root
spring.datasource.password=secret

## Hibernate 속성
spring.jpa.hibernate.ddl-auto=update
spring.jpa.open-in-view=false
```

명령어 `mvn spring-boot:run`으로 애플리케이션을 실행하세요. 웹 애플리케이션이 8005 포트에서 시작됩니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/assets/img/2024-07-07-ImplementJWTauthenticationinaSpringBoot3application_2.png" />

애플리케이션을 시작할 때 콘솔에 주의를 기울이면 Spring Security가 기본적으로 HTTP Basic 인증을 활성화했기 때문에 생성된 보안 비밀번호가 표시되는 메시지를 볼 수 있습니다.

# JSON 웹 토큰 종속성 설치

애플리케이션에서 JWT 토큰을 인코딩, 디코딩 및 유효성 검사하기 위한 라이브러리가 필요합니다. 우리는 JJWT를 사용할 것이므로 "pom.xml"을 열고 다음 코드를 "dependencies" XML 태그 안에 추가해주세요:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
<dependencies>
    <!---- 기존의 종속성이 여기에 있습니다....... ---->
  <dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.11.5</version>
  </dependency>
  <dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-impl</artifactId>
    <version>0.11.5</version>
  </dependency>
  <dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-jackson</artifactId>
    <version>0.11.5</version>
  </dependency>
</dependencies>
```

의존성을 설치하려면 저장한 후 mvn install을 실행하세요.

# 사용자 엔티티 생성

사용자 엔티티를 만들어 사용자가 데이터베이스에 저장되어 시스템에 액세스하는 사용자임을 확인하겠습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

시스템에서 사용자를 정의하는 첫 번째 단계는 JPA Entity를 생성하여 관련 테이블을 데이터베이스에 생성하는 것입니다. 데이터베이스 변경 내역을 추적하는 것이 좋으므로 Flyway를 사용하여 데이터베이스 마이그레이션을 처리하는 방법에 대해 포스트를 작성했습니다.

entities 패키지 내부에 User.java 파일을 생성하고 아래 코드를 추가하세요:

```java
package com.tericcabrel.authapi.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;

@Table(name = "users")
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Integer id;

    @Column(nullable = false)
    private String fullName;

    @Column(unique = true, length = 100, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    // Getters and setters
}
```

repositories 패키지 내부에 UserRepository.java 파일을 생성하여 User 엔티티에 대한 데이터 액세스 레이어를 나타내는 파일을 추가하세요. 아래 코드를 추가하세요:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```java
package com.tericcabrel.authapi.repositories;

import com.tericcabrel.authapi.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
```

나중에 사용자 인증을 구현할 때 findByEmail() 함수를 사용할 것입니다.

명령 mvn spring-boot:run으로 애플리케이션을 실행하세요. 데이터베이스에 "users" 테이블이 생성됩니다.

<img src="/assets/img/2024-07-07-ImplementJWTauthenticationinaSpringBoot3application_3.png" />

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 사용자 엔터티를 인증 세부 정보와 확장하세요

인증과 관련된 사용자 세부 정보를 관리하려면, Spring Security는 "UserDetails" 인터페이스를 제공합니다. 사용자 엔터티는 해당 구현을 재정의해야 하는 속성과 메서드를 제공합니다.

"User.java" 파일을 업데이트하여 UserDetails 인터페이스를 구현하십시오. 아래는 파일의 코드입니다:

```js
@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Integer id;

    @Column(nullable = false)
    private String fullName;

    @Column(unique = true, length = 100, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // Getter 및 Setter 메서드
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

"getAuthorities()" 메소드는 사용자의 역할 목록을 반환합니다. 권한을 관리하는 데 유용합니다. 역할 기반 액세스 제어에 대해서 다루지 않을 것이므로 빈 목록을 반환합니다.

"getUsername()" 메소드는 사용자에 대한 고유한 정보인 이메일 주소를 반환합니다.

# JWT 서비스 생성

JSON Web 토큰을 생성, 해독 또는 유효성 검사하려면 미리 설치한 라이브러리를 사용하는 관련 메소드를 노출해야 합니다. 그러기 위해 JwtService라는 서비스 클래스를 만들어 그룹화할 것입니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

패키지 services를 만든 후 JwtService.java 파일을 추가하고 아래 코드를 붙여넣으십시오:

```java
package com.tericcabrel.authapi.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
    @Value("${security.jwt.secret-key}")
    private String secretKey;

    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        return buildToken(extraClaims, userDetails, jwtExpiration);
    }

    public long getExpirationTime() {
        return jwtExpiration;
    }

    private String buildToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails,
            long expiration
    ) {
        return Jwts
                .builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
```

사용할 메서드는 generateToken(), isTokenValid(), getExpirationTime()입니다.

JWT 토큰을 생성하려면 비밀 키와 토큰 만료 시간이 필요합니다. 이 값들은 어노테이션 @Value를 사용하여 애플리케이션 구성 속성 파일에서 읽습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 값들을 정의하려면 application.properties를 업데이트해야 합니다:

```js
security.jwt.secret-key=3cfa76ef14937c1c0ea519f8fc057a80fcd04a7420f8e8bcd0a7567c272e007b
# 1시간을 밀리초로 변환
security.jwt.expiration-time=3600000
```

시크릿 키는 256비트의 HMAC 해시 문자열이어야 합니다. 그렇지 않으면 토큰 생성이 오류를 발생시킵니다. 저는 이 웹사이트를 사용하여 하나를 생성했습니다.

토큰 만료 시간은 밀리초 단위로 표시되므로 토큰이 너무 빨리 만료되지 않도록 주의하세요.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 보안 구성 재정의하기

기본적으로는 HTTP 기본 인증이 설정되어 있지만, 우리는 다음을 수행하도록 재정의하고 싶습니다:

- 데이터베이스에서 사용자를 찾아 인증 수행하기.
- 인증이 성공하면 JWT 토큰을 생성하기.

구현을 재정의하려면 configs 패키지를 생성하고 ApplicationConfiguration.java 파일을 추가하며 아래 코드를 추가해봅시다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```java
package com.tericcabrel.authapi.configs;


import com.tericcabrel.authapi.repositories.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class ApplicationConfiguration {
    private final UserRepository userRepository;

    public ApplicationConfiguration(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    UserDetailsService userDetailsService() {
        return username -> userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Bean
    BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());

        return authProvider;
    }
}
```

`userDetailsService()` 메서드는 주입된 UserRepository를 사용하여 사용자를 검색하는 방법을 정의합니다.

`passwordEncoder()` 메서드는 일반 사용자 비밀번호를 인코딩하는 데 사용되는 BCryptPasswordEncoder의 인스턴스를 생성합니다.

`authenticationProvider()` 메서드는 인증을 수행하는 새로운 전략을 설정합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이 단계에서 애플리케이션을 다시 실행하면 이전과 같이 콘솔에 생성된 암호를 볼 수 없습니다. 인증 방법을 성공적으로 무효화했습니다.

# 인증 미들웨어 생성

모든 요청마다 헤더의 JWT 토큰을 검색하고 유효성을 검사하려고 합니다:

- 토큰이 유효하지 않으면 요청을 거부하거나 그렇지 않으면 계속합니다.
- 토큰이 유효하면 사용자 이름을 추출하여 데이터베이스에서 관련 사용자를 찾고 인증 컨텍스트에 설정하여 애플리케이션 레이어에서 액세스할 수 있도록 합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

패키지 구성에서 JwtAuthenticationFilter.java 파일을 생성하고 아래 코드를 추가해주세요. 이전에 설명한 모든 것을 구현하는 코드입니다:

```java
package com.tericcabrel.authapi.configs;

import com.tericcabrel.authapi.services.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final HandlerExceptionResolver handlerExceptionResolver;

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(
        JwtService jwtService,
        UserDetailsService userDetailsService,
        HandlerExceptionResolver handlerExceptionResolver
    ) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.handlerExceptionResolver = handlerExceptionResolver;
    }

    @Override
    protected void doFilterInternal(
        @NonNull HttpServletRequest request,
        @NonNull HttpServletResponse response,
        @NonNull FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            final String jwt = authHeader.substring(7);
            final String userEmail = jwtService.extractUsername(jwt);

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

            if (userEmail != null && authentication == null) {
                UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

                if (jwtService.isTokenValid(jwt, userDetails)) {
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                    );

                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }

            filterChain.doFilter(request, response);
        } catch (Exception exception) {
            handlerExceptionResolver.resolveException(request, response, null, exception);
        }
    }
}
```

여기서 할 수 있는 좋은 점은 사용자의 이메일 주소를 통해 사용자를 찾는 캐싱을 사용하여 성능을 향상시키는 것입니다. SpringBoot 애플리케이션에서 캐싱을 구현하는 방법을 보여주는 블로그 포스트를 작성했습니다.

# 애플리케이션 요청 필터 구성하기

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

요청이 전달되기 전에 수신 요청이 일치해야 하는 기준을 정의하는 작업이 남았습니다. 필요한 기준은 다음과 같습니다:

- CSRF 토큰을 제공할 필요가 없습니다. 우리가 사용할 것입니다.
- /auth/signup 및 /auth/login에 대해 일치하는 요청 URL 경로는 인증이 필요하지 않습니다.
- 다른 요청 URL 경로는 인증이 필요합니다.
- 상태 정보가 없는 요청이어야 합니다. 즉, 모든 요청은 새로운 것으로 처리되어야 합니다. 클라이언트가 동일하더라도 이전에 수신했던 요청이어도 새로운 것으로 처리되어야 합니다.
- 사용자 정의 인증 제공자를 사용해야 하며, 인증 미들웨어보다 먼저 실행되어야 합니다.
- CORS 구성은 POST 및 GET 요청만 허용해야 합니다.

패키지 구성에서 JwtAuthenticationFilter.java 파일을 생성하고 아래의 코드를 추가해주세요:

```java
package com.tericcabrel.authapi.configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfiguration(
        JwtAuthenticationFilter jwtAuthenticationFilter,
        AuthenticationProvider authenticationProvider
    ) {
        this.authenticationProvider = authenticationProvider;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf()
                .disable()
                .authorizeHttpRequests()
                .requestMatchers("/auth/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(List.of("http://localhost:8005"));
        configuration.setAllowedMethods(List.of("GET","POST"));
        configuration.setAllowedHeaders(List.of("Authorization","Content-Type"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**",configuration);

        return source;
    }
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

우리의 인증이 완료되어 테스트 준비가 되었습니다.

# 인증 서비스 생성

이 서비스에는 새 사용자 등록 및 기존 사용자 인증을 위한 로직이 포함될 것입니다.

' dtos ' 라는 새로운 패키지를 만들어서 두 작업에 대한 DTO를 포함하도록 하겠습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

아래의 코드를 포함하는 RegisterUserDto.java 파일을 생성하세요.

```java
package com.tericcabrel.authapi.dtos;

public class RegisterUserDto {
    private String email;

    private String password;

    private String fullName;

    // 여기에 게터 및 세터 추가...
}
```

다음의 코드를 포함하는 LoginUserDto.java 파일을 생성하세요.

```java
package com.tericcabrel.authapi.dtos;

public class LoginUserDto {
    private String email;

    private String password;

    // 여기에 게터 및 세터 추가...
}
```

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

DTO에 유효성 검사를 적용하지 않았어요. 요약해서 표시하려고 그렇게 했어요. 아래 블로그 글을 통해 전체 포스트를 보고 싶다면 자세한 내용을 확인할 수 있어요:

서비스 패키지에서 AuthenticationService.java 파일을 생성하고 아래 코드를 추가하세요:

```js
package com.tericcabrel.authapi.services;

import com.tericcabrel.authapi.dtos.LoginUserDto;
import com.tericcabrel.authapi.dtos.RegisterUserDto;
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(
        UserRepository userRepository,
        AuthenticationManager authenticationManager,
        PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signup(RegisterUserDto input) {
        User user = new User()
                .setFullName(input.getFullName())
                .setEmail(input.getEmail())
                .setPassword(passwordEncoder.encode(input.getPassword()));

        return userRepository.save(user);
    }

    public User authenticate(LoginUserDto input) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return userRepository.findByEmail(input.getEmail())
                .orElseThrow();
    }
}
```

# 사용자 등록 및 인증 라우트 생성

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이제 사용자 등록 및 인증을 위해 /auth/signup 및 /auth/login 라우트를 생성할 수 있습니다.

controllers 패키지를 만들고 AuthenticationController.java 파일을 추가하고 아래 코드를 추가하세요:

```js
import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.dtos.LoginUserDto;
import com.tericcabrel.authapi.dtos.RegisterUserDto;
import com.tericcabrel.authapi.responses.LoginResponse;
import com.tericcabrel.authapi.services.AuthenticationService;
import com.tericcabrel.authapi.services.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;

    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse().setToken(jwtToken).setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
}
```

인증 요청은 LoginResponse 인스턴스를 반환하며, 아래에 해당 파일의 코드가 있습니다:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

```java
public class LoginResponse {
    private String token;

    private long expiresIn;

    public String getToken() {
        return token;
    }

    // Getters and setters...
}
```

# 구현 테스트

애플리케이션을 실행하고 HTTP 클라이언트를 열어 요청 본문에 정보를 담아 /auth/signup으로 POST 요청을 보냅니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*oJmtbddlVxEsDk_LACCDpQ.gif)

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

이제 우리가 등록한 사용자로 인증을 시도해 봅시다. 요청 본문에 정보를 넣어 /auth/login으로 POST 요청을 보내세요.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*kZZ2hiPrsb5_DTgVETcXyQ.gif)

# 사용자 정보를 검색할 수 있는 제한된 엔드포인트 만들기

JWT 토큰을 제공하면 /users/me 및 /users 엔드포인트는 각각 인증된 사용자와 모든 사용자의 목록을 반환합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

위의 코드를 사용하여 UserController.java 파일을 작성하고 아래 코드를 추가해주세요:

```java
package com.tericcabrel.authapi.controllers;

import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        return ResponseEntity.ok(currentUser);
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> allUsers() {
        List<User> users = userService.allUsers();

        return ResponseEntity.ok(users);
    }
}
```

위의 코드에서는 JwtAuthenticationFilter.java 파일의 68번째 줄에서 설정된 보안 컨텍스트에서 인증된 사용자를 검색합니다.

컨트롤러에 주입된 UserService는 데이터베이스에서 사용자 목록을 검색하고 반환하는 allUsers() 함수를 제공합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

구현을 테스트하기 전에 services 패키지에 UserService.java 파일을 만들고 아래 코드를 추가해봅시다:

```js
package com.tericcabrel.authapi.services;

import com.tericcabrel.authapi.entities.User;
import com.tericcabrel.authapi.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();

        userRepository.findAll().forEach(users::add);

        return users;
    }
}
```

# 구현 테스트하기

애플리케이션을 다시 실행하고 아래 시나리오를 따라해보세요:

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

- `/users/me` 및 `/users`에 GET 요청을 보내면 403 오류가 발생합니다.
- `/auth/login`에 POST 요청으로 인증하고 JWT 토큰을 얻습니다.
- 얻은 JWT 토큰을 요청의 authorization 헤더에 넣으면 `/users/me`와 `/users`에 대한 응답 코드 200과 함께 데이터를 얻을 수 있습니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*0eYzMclpxYWV9oBbVzzksA.gif)

# 인증 오류 메시지 사용자정의

API에서 미인증 사용자의 액세스를 방지하거나 인증 자격 증명이 유효하지 않을 때 상태 오류를 반환합니다. 그러나 API를 사용하는 개발자들에게 더 많은 세부 정보를 제공할 추가적인 메시지가 없습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

<img src="/assets/img/2024-07-07-ImplementJWTauthenticationinaSpringBoot3application_4.png" />

다양한 인증 방법이 있지만 보다 명확한 메시지를 반환하고 싶습니다. 다음과 같이 나열해 봅시다:

- 잘못된 로그인 자격 증명: BadCredentialsException 예외로 인한 경우, HTTP 상태 코드 401을 반환해야 합니다.
- 계정이 잠겨 있음: AccountStatusException 예외로 인한 경우, HTTP 상태 코드 403을 반환해야 합니다.
- 리소스에 액세스할 권한이 없음: AccessDeniedException 예외로 인한 경우, HTTP 상태 코드 403을 반환해야 합니다.
- 잘못된 JWT: SignatureException 예외로 인한 경우, HTTP 상태 코드 401을 반환해야 합니다.
- JWT가 만료됨: ExpiredJwtException 예외로 인한 경우, HTTP 상태 코드 401을 반환해야 합니다.

이러한 오류를 처리하기 위해 예외를 catch하고 클라이언트에게 보내기 위한 응답을 사용자 정의할 수 있는 Spring 글로벌 예외 처리기를 사용해야 합니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

패키지 예외를 생성한 다음 GlobalExceptionHandler.java라는 파일을 작성하고 아래 코드를 추가하세요:

```js
패키지 com.tericcabrel.authapi.exceptions;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AccountStatusException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ProblemDetail handleSecurityException(Exception exception) {
        ProblemDetail errorDetail = null;

        // TODO 이 스택 추적을 관찰성 도구로 보내기
        exception.printStackTrace();

        if (exception instanceof BadCredentialsException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(401), exception.getMessage());
            errorDetail.setProperty("description", "사용자 이름 또는 비밀번호가 올바르지 않습니다");

            return errorDetail;
        }

        if (exception instanceof AccountStatusException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), exception.getMessage());
            errorDetail.setProperty("description", "계정이 잠겨 있습니다");
        }

        if (exception instanceof AccessDeniedException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), exception.getMessage());
            errorDetail.setProperty("description", "이 리소스에 액세스할 권한이 없습니다");
        }

        if (exception instanceof SignatureException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), exception.getMessage());
            errorDetail.setProperty("description", "잘못된 JWT 서명입니다");
        }

        if (exception instanceof ExpiredJwtException) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), exception.getMessage());
            errorDetail.setProperty("description", "JWT 토큰이 만료되었습니다");
        }

        if (errorDetail == null) {
            errorDetail = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(500), exception.getMessage());
            errorDetail.setProperty("description", "알 수 없는 내부 서버 오류입니다.");
        }

        return errorDetail;
    }
}
```

애플리케이션을 다시 실행하고 잘못된 자격 증명으로 인증하려고 시도하거나 만료된 JWT 또는 잘못된 JWT로 요청을 보내보세요.

<img src="https://miro.medium.com/v2/resize:fit:1400/1*Rj0A5m958yQsrGFHR9bsOg.gif" />

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 마무리

이 게시물에서는 Spring Boot 애플리케이션에서 JSON Web Token 인증을 구현하는 방법을 살펴보았습니다. 이 프로세스의 주요 단계는 다음과 같습니다:

- JWT 인증 필터가 요청 헤더에서 토큰을 추출하고 검증합니다.
- 특정 API 경로를 화이트리스트에 등록하고 토큰이 필요한 경로를 보호합니다.
- 인증을 수행하고 JWT를 생성하고 만료 시간을 설정합니다.
- 생성된 JWT를 사용하여 보호된 경로에 액세스합니다.
- 클라이언트로 전송되는 응답을 사용자 정의하기 위해 인증 예외를 처리합니다.

이 구현을 통해 API를 보호하는 기본 기능을 갖추었으며, 사용자 역할과 권한에 따라 리소스 액세스를 제한하는 내 튜토리얼을 따라 역할 기반 액세스 제어(RBAC)를 구현하여 한 걸음 더 나아갈 수 있습니다.

<!-- seedividend - 사각형 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1898504329"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

GitHub 저장소에서 코드 소스를 찾을 수 있어요.

이 게시물은 원래 https://blog.tericcabrel.com에서 게시되었어요.

도움이 되었다면 제 팔로우를 눌러주세요. 새 게시물을 게시할 때 알림을 받으려면 뉴스레터를 구독해주세요.
