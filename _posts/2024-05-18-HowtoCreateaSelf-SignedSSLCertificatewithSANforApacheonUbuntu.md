---
title: "우분투에서 아파치용 SAN이 포함된 Self-Signed SSL 인증서 만들기 방법"
description: ""
coverImage: "/assets/img/2024-05-18-HowtoCreateaSelf-SignedSSLCertificatewithSANforApacheonUbuntu_0.png"
date: 2024-05-18 21:44
ogImage: 
  url: /assets/img/2024-05-18-HowtoCreateaSelf-SignedSSLCertificatewithSANforApacheonUbuntu_0.png
tag: Tech
originalTitle: "How to Create a Self-Signed SSL Certificate with SAN for Apache on Ubuntu"
link: "https://medium.com/@shaonmajumder/how-to-create-a-self-signed-ssl-certificate-with-san-for-apache-on-ubuntu-fad996e84ffb"
isUpdated: true
---




웹 응용 프로그램을 SSL 인증서로 안전하게 보호하는 것은 클라이언트와 서버 간에 전송되는 데이터의 기밀성과 무결성을 보장하기 위해 중요합니다. 이 튜토리얼에서는 Ubuntu 운영 체제의 Apache 웹 서버에 대한 서브젝트 대체 이름 (SAN)이 포함된 자체 서명 SSL 인증서를 생성하는 과정을 안내합니다.

# 필수 사항

시작하기 전에 다음 사항을 확인하세요:

<div class="content-ad"></div>

- Apache가 설치된 Ubuntu 서버
- openssl 도구가 설치되어 있습니다.

우선, 프론트엔드 폴더로 이동해주세요.

### 단계 1: 디렉토리 생성

인증서를 위한 디렉토리를 생성하세요.

<div class="content-ad"></div>

```js
mkdir certificates
cd certificates
```

# 단계 2: 개인 키 생성

```js
openssl genpkey -algorithm RSA -out private.key
```

- genpkey: 이 하위 명령어는 개인 키를 생성하는 데 사용됩니다.
- -algorithm RSA: 키 생성에 사용할 알고리즘을 지정합니다. 이 경우 RSA (Rivest–Shamir–Adleman) 알고리즘을 사용합니다. RSA는 널리 사용되는 비대칭 암호 알고리즘입니다.
- -out private.key: 생성된 개인 키를 저장할 출력 파일을 지정합니다. 이 예에서는 개인 키가 private.key라는 파일에 저장됩니다.

<div class="content-ad"></div>

[비권장] 만약 당신의 private.key가 암호로 보호되기를 원한다면 -

```js
openssl genpkey -algorithm RSA -aes256 -out private.key
```

-aes256:

- 이 매개변수는 개인 키에 사용할 암호화 알고리즘을 나타냅니다. 이 경우 AES (고급 암호화 표준)와 키 길이가 256비트인 AES-256를 사용합니다. 이 매개변수는 추가 보안을 위해 개인 키를 AES-256로 암호화하는 것을 보장합니다. 사용자는 키 생성 과정 중에 암호를 입력하도록 요청받으며, 이 암호는 개인 키를 암호화하는 데 사용됩니다.

<div class="content-ad"></div>

안녕하세요! 아래의 정보를 Markdown 형식으로 변환해 드릴게요.


You’ll be prompted to enter a passphrase; remember this passphrase as you’ll need it later.

## Step 3: Create a SAN Configuration File

Create a file named san.conf with the following content:

```js
[req]
distinguished_name = req_distinguished_name
req_extensions = req_ext
prompt = no

[req_distinguished_name]
CN = localhost
C = BD
ST = Dhaka
L = Motijheel
O = Robist
OU = Developers
emailAddress = smazoomder@gmail.com

[req_ext]
subjectAltName = IP:192.168.0.88
``` 


<div class="content-ad"></div>

(당신의 IP를 Ip 자리에 넣으세요)

- [req]: 이 섹션은 인증서 요청에 대한 속성을 지정합니다.
- distinguished_name = req_distinguished_name: 인증서를 요청하는 엔티티에 대한 다양한 세부 정보를 정의하는 식별 이름 섹션을 가리킵니다.
- req_extensions = req_ext: 인증서에 추가 정보를 포함할 수 있는 확장 섹션을 가리킵니다.
- prompt = no: 인증서 생성 과정 중에 인증서 세부 정보에 대한 프롬프트를 비활성화합니다.
- [req_distinguished_name]: 공통 이름 (CN), 국가 (C), 주 (ST), 지역 (L), 조직 (O), 조직 단위 (OU) 및 이메일 주소와 같은 다양한 식별 이름 속성을 정의합니다.
- CN = localhost: 일반적으로 인증서와 관련된 도메인 이름인 공통 이름(CN)을 지정합니다.
- C = BD: 국가 속성으로 방글라데시를 나타냅니다.
- ST = Dhaka: 주 속성으로 다카를 지정합니다.
- L = Motijheel: 지역 속성으로 모티제엘을 나타냅니다.
- O = Robist: 조직 속성으로 로비스트를 나타냅니다.
- OU = Developers: 조직 단위 속성으로 개발자를 나타냅니다.
- emailAddress = smazoomder@gmail.com: 인증서와 관련된 이메일 주소입니다.
- [req_ext]: 추가 확장을 인증서에 포함할 수 있는 확장 섹션입니다.
- subjectAltName = IP:192.168.0.88: 대체 식별자로 IP 주소(192.168.0.88)를 포함하는 Subject Alternative Name (SAN) 확장을 지정합니다.

## Subject Alternative Name (SAN)의 내용 :

- Subject: SSL/TLS 인증서의 맥락에서 "주체"는 일반적으로 인증서가 발행된 엔티티(웹사이트 또는 서버 등)를 가리킵니다. 일반적으로 공통 이름(CN), 조직 및 위치와 같은 정보를 포함합니다.
- Alternative Name: "대체 이름"은 SSL/TLS 인증서에 포함될 수 있는 추가 식별자를 가리킵니다. 이러한 식별자는 공통 이름(CN)을 넘어서 유효한 인증서에 대한 다른 이름을 세분화하여 지정할 수 있습니다.

<div class="content-ad"></div>

## SAN 사용 이유:

- 다중 식별자 지원: SAN을 통해 하나의 SSL/TLS 인증서가 여러 식별자에 대해 유효할 수 있습니다. 기존에는 SSL 인증서가 주된 도메인을 나타내는 공통 이름(CN) 필드를 기반으로 발급되었습니다. 그러나 유연성이 커지면서 SAN을 통해 추가 이름을 포함할 수 있게 되었습니다.
- 다중 도메인 인증서: SAN은 하나의 인증서가 여러 도메인이나 서브도메인을 커버해야 하는 상황에서 특히 유용합니다. 각 도메인마다 별도의 인증서를 얻는 대신 SAN 확장을 지원하는 다중 도메인 인증서를 사용할 수 있습니다.
- IP 주소 및 이메일 주소: SAN은 도메인 이름에만 국한되지 않습니다. IP 주소와 이메일 주소를 대체 식별자로 포함할 수도 있습니다. IP 주소를 통해 접근되는 서비스나 이메일 통신을 커버해야 하는 경우 유용합니다.
- 와일드카드 인증서: SAN은 와일드카드 인증서와 함께 일반적으로 사용됩니다. 와일드카드 인증서는 도메인과 서브도메인을 커버하며, SAN은 추가 도메인을 더 확장할 수 있습니다.
- 인증서 불일치 문제 회피: SAN을 포함하면 인증서 불일치 문제를 예방할 수 있습니다. 대체 이름을 통해 서비스에 액세스할 때, SAN의 존재로 인해 인증서가 여전히 유효하다고 간주됩니다.

요약하면, Subject Alternative Name (SAN)은 SSL/TLS 인증서에 다중 식별자를 포함할 수 있는 확장 기능으로, 안전한 통신에서 다양한 명명 시나리오에 대한 유연성과 광범위한 커버리지를 제공합니다.

# 단계 4: 인증서 서명 요청(CSR) 생성

<div class="content-ad"></div>

```js
openssl req -new -key private.key -out certificate.csr -config san.conf
```

openssl req:

- 이 명령어는 OpenSSL에서 인증서 요청을 생성하고 처리하는 데 사용됩니다.

-new:

<div class="content-ad"></div>

- 새로운 CSR (인증서 서명 요청)이 생성되고 있음을 나타냅니다.

- -key private.key:

- CSR을 생성하는 데 사용될 개인 키 파일을 지정합니다. 이전 단계에서 생성 된 개인 키 (private.key)가 여기에서 사용됩니다.

- -out certificate.csr:

<div class="content-ad"></div>

- 생성된 CSR이 저장될 출력 파일을 지정합니다. 이 예시에서는 CSR이 certificate.csr이라는 파일에 저장됩니다.

- `config san.conf`:

- 인증서에 대한 부가 설정 및 Subject Alternative Names (SANs)을 포함하는 구성 파일 (san.conf)을 지정합니다.

# 단계 5: 자체 서명 인증서 생성

<div class="content-ad"></div>

```bash
openssl x509 -req -in certificate.csr -signkey private.key -out server.cert -days 365
```

openssl x509:

- X.509 인증서 파일에 서명하고 표시하는 데 사용되는 OpenSSL 명령입니다.

-req:

<div class="content-ad"></div>

- 입력 파일(certificate.csr)이 인증 요청서(CSR)임을 나타냅니다.

- certificate.csr 파일 안에:

- 서명이 필요한 인증 요청서(CSR)가 포함된 입력 파일을 지정합니다. 이 예에서 CSR 파일은 certificate.csr입니다.

- signkey private.key:

<div class="content-ad"></div>

- CSR을 서명하고 인증서를 생성할 때 사용할 개인 키(private.key)를 지정합니다.

- server.cert에 저장됩니다:

- 서명된 X.509 인증서가 저장될 출력 파일을 지정합니다. 이 예시에서는 인증서 파일의 이름을 server.cert로 지정합니다.

- 365일 동안 유효합니다:

<div class="content-ad"></div>

- 인증서의 유효 기간을 일(day) 단위로 지정합니다.이 경우 인증서는 365일(1년) 동안 유효합니다.

## X.509 인증서 소개

X.509 인증서는 공개 키 인증서의 형식과 구조를 정의하는 X.509 표준을 따르는 디지털 인증서입니다. 이러한 인증서는 TLS/SSL을 포함한 인터넷 보안 프로토콜에서 널리 사용됩니다. 아래는 X.509 인증서의 구성 요소입니다:

<div class="content-ad"></div>

- 버전: X.509 표준의 버전을 나타냅니다. (예: 버전 1, 2 또는 3)
- 일련 번호: 인증서 발급자 (인증 기관)가 할당한 고유 식별자로, 인증서를 구분합니다.
- 서명 알고리즘: 인증 기관이 인증서에 서명하는 데 사용한 암호화 알고리즘을 지정합니다.
- 발급자: 인증서를 발급한 엔터티 (일반적으로 인증 기관)를 식별합니다.
- 유효 기간: 인증서의 유효성을 나타내는 시간 범위를 정의합니다. "발효일"과 "만료일"이 포함됩니다.
- 주체: 인증서의 공개 키와 관련된 엔터티 (예: 사람, 조직 또는 장치)를 식별합니다.
- 주체 공개 키 정보: 주체가 사용하는 공개 키와 알고리즘을 포함합니다.
- 확장: 인증서와 관련된 추가 정보 또는 속성을 포함합니다. 주체 대체 이름 (SAN), 키 사용 등이 포함될 수 있습니다.
- 인증서 서명 알고리즘: 인증 기관이 인증서에 서명하는 데 사용하는 알고리즘을 지정합니다.
- 인증서 서명 값: 인증 기관에 의해 생성된 디지털 서명을 포함하여 인증서의 무결성과 신뢰성을 보장합니다.

# X.509 인증서의 목적:

- 인증: 인증서 소지자의 신원을 확인합니다.
- 암호화: 공개 키를 사용하여 데이터를 암호화하여 안전한 통신을 지원합니다.
- 디지털 서명: 디지털 서명의 생성과 검증을 통해 데이터 무결성을 보장합니다.
- 키 교환: 안전한 통신 프로토콜에서 암호 키 교환을 지원합니다.

# SSL/TLS에서의 사용:

<div class="content-ad"></div>

- SSL/TLS 프로토콜에서 X.509 인증서는 클라이언트와 서버 간 안전한 연결을 설정하는 데 필수적입니다. 클라이언트가 안전한 웹 사이트에 연결할 때, 서버는 자체 X.509 인증서를 제출하고 클라이언트는 이를 확인하여 안전하고 신뢰할 수 있는 연결을 보장합니다.
- X.509 인증서는 내부 사용을 위해 자체 서명될 수도 있고, 공개적인 웹 사이트를 위해 신뢰할 수 있는 인증 기관에 의해 서명될 수도 있습니다.

웹 보안, 시스템 관리 또는 소프트웨어 개발에 관여하는 모든 사람에게 X.509 인증서를 이해하는 것이 중요합니다.

# 단계 6: Apache 구성 업데이트

Apache 가상 호스트 구성을 업데이트하세요 (/etc/apache2/sites-available/your-site.conf):

<div class="content-ad"></div>


# 가상 호스트 설정:

- **`VirtualHost *:443`**: 443 포트에서 HTTPS 통신을 위한 가상 호스트 블록을 정의합니다.

- **`ServerName localhost`**: 이 가상 호스트와 연결된 기본 도메인 이름을 지정합니다. 이 경우 "localhost"로 설정되어 있습니다.
 

<div class="content-ad"></div>


ServerAdmin webmaster@localhost: 서버 관리자의 이메일 주소.

DocumentRoot /var/www/html/your-project/backend/public: 이 VirtualHost의 문서 루트 디렉터리를 설정합니다. 이것은 웹 서버가 파일을 제공하는 위치입니다.

SSLEngine on: SSL 연결을 처리해야 함을 나타내는이 VirtualHost를위한 SSL 엔진을 활성화합니다.

SSLUseStapling off: SSL 스테이플링을 비활성화합니다. SSL 스테이플링은 SSL/TLS 인증서 확인을 강화하는 메커니즘입니다. 그러나이 예제에서는 비활성화되어 있습니다.


<div class="content-ad"></div>

SSLCertificateFile /var/www/html/your-project/certificates/server.cert: SSL 인증서 파일의 경로를 지정합니다. 이는 이전 단계에서 생성된 공개 키 인증서 파일입니다.

SSLCertificateKeyFile /var/www/html/your-project/certificates/private.key: SSL 인증서와 관련된 개인 키 파일의 경로를 지정합니다.

ServerAlias 192.168.0.88: 이 VirtualHost가 응답해야 하는 추가 도메인 이름 또는 IP 주소를 지정합니다. 여기서는 IP 주소 192.168.0.88이 포함됩니다.

`Directory "/var/www/html/your-project/backend/public"`: 지정된 디렉토리에 대한 구성 블록을 시작합니다.

<div class="content-ad"></div>

Options All: 이 디렉토리에 대해 사용 가능한 모든 옵션을 허용합니다.

AllowOverride All: 이 디렉토리에서 .htaccess 파일을 사용하여 구성 재정의를 허용합니다.

Require all granted: 모든 사용자에게 액세스를 부여합니다.

`/Directory`: 지정된 디렉토리에 대한 구성 블록을 종료합니다.

<div class="content-ad"></div>

`/VirtualHost` : VirtualHost 블록을 종료합니다.

# 설정 목적:

- 이 구성 블록은 Apache가 지정된 도메인 (localhost 및 192.168.0.88)에 대한 SSL 연결을 어떻게 처리해야 하는지를 보장합니다. SSL 인증서 파일을 가리키고 연관 디렉토리에 대한 액세스 설정을 정의합니다.
- "/var/www/html/your-project"와 같은 자리 표시자를 프로젝트에서 실제 사용하는 경로로 교체해야 합니다.

그런 다음 활성화하세요:

<div class="content-ad"></div>

```js
sudo a2ensite your-site.conf
```

# 단계 7: 아파치 재시작

```js
sudo systemctl restart apache2
```

SSL/TLS 키의 암호를 입력하라는 프롬프트가 표시됩니다.

<div class="content-ad"></div>

# 단계 8: Apache 오류 로그 확인

```bash
sudo tail -f /var/log/apache2/error.log
```

SSL과 관련된 오류 메시지를 확인해 보세요.

# 단계 9: 라라벨 저장소 권한 설정

<div class="content-ad"></div>

```js
cd /var/www/html/your-project/backend
sudo chmod -R 775 storage
sudo chown -R www-data:www-data storage
```

이제 https://192.168.0.88 (당신의 IP)에서 애플리케이션에 안전하게 액세스할 수 있어야 합니다.

# 단계 10: React/Laravel 애플리케이션을 실행 중이라면

프론트엔드 환경에서:


<div class="content-ad"></div>


REACT_APP_NAME = 'your-project'
REACT_APP_VERSION = v1.1.0
GENERATE_SOURCEMAP = false

REACT_APP_API_BASE_URL='https://192.168.0.88/api'
REACT_APP_ASSET_BASE_URL='https://192.168.0.88/storage'
REACT_APP_MAIN_DOMAIN='192.168.0.88:3000'
REACT_APP_API_DOMAIN='https://192.168.0.88'
REACT_APP_BACK_DOMAIN = 'https://192.168.0.88'

REACT_APP_SITE_KEY = 'your-key'


in backend env :


APP_URL=https://192.168.0.88
APP_SITE_URL="https://192.168.0.88:3000"


축하합니다! Ubuntu에서 Apache 웹 서버에 대한 Subject Alternative Name이 포함된 자체 서명 SSL 인증서를 성공적으로 생성했습니다.
  

<div class="content-ad"></div>

문제가 있으면 다음을 실행해 보세요

```js
sudo systemctl restart apache2
```

```js
cd /var/www/html/your-project/backend
sudo chmod -R 775 storage
sudo chown -R www-data:www-data storage
```

# (선택 사항) /etc/hosts 파일 업데이트

<div class="content-ad"></div>

친구야, 아래와 같이 /etc/hosts 파일에 localhost와 192.168.0.88(IP 주소)의 항목이 있는지 확인해 주세요.

# (선택 사항) Chrome에서 인증서를 가져오는 방법:

- 권한 생성 및 인증서를 CRT 형식으로 변환:

```js
openssl x509 -in server.cert -out server.crt
```

<div class="content-ad"></div>

- PKCS#12 형식으로 인증서 및 키 변환하기:

```js
openssl pkcs12 -export -out certificate.pfx -inkey private.key -in server.cert
```

개인 키의 암호를 입력하라는 프롬프트가 표시됩니다.

3. Chrome에 인증서 가져오기:

<div class="content-ad"></div>

- 크롬을 열고 설정으로 이동합니다.
- 아래로 스크롤하여 고급을 클릭합니다.
- 개인 정보 및 보안 아래에서 인증서 관리를 클릭합니다.
- 인증서 창에서 개인 탭으로 이동합니다.
- 가져오기를 클릭하고 생성한 certificate.pfx 파일을 선택합니다.
- 가져오기 마법사를 따라가고 암호를 입력하고 나오면 상점을 선택합니다.

4. 신뢰할 수 있는 인증 기관(CA)을 추가하려면 다음을 수행하십시오:

```js
sudo cp server.crt /usr/local/share/ca-certificates/server.crt
sudo update-ca-certificates
```

다음 명령을 사용하여 인증서가 신뢰 목록에 추가되었는지 확인하십시오:

<div class="content-ad"></div>

```js
awk -v cmd='openssl x509 -noout -subject' ' /BEGIN/{close(cmd)};{print | cmd}' < /etc/ssl/certs/ca-certificates.crt | grep -i localhost
```

인증서의 전체 세부 정보를 확인하려면 OpenSSL 또는 다른 도구를 사용할 수 있습니다. 예를 들어 OpenSSL을 사용하여 다음과 같이 실행할 수 있습니다.

```js
openssl x509 -in server.cert -text -noout
```

만료 날짜 확인: SSL 인증서가 만료되지 않았는지 확인하십시오. 다음 OpenSSL 명령어를 사용하여 만료 날짜를 확인할 수 있습니다.

<div class="content-ad"></div>

```js
openssl x509 -enddate -noout -in server.cert
```

인증서 내용 확인:

OpenSSL을 사용하여 인증서 및 개인 키 파일의 내용을 확인할 수 있습니다. 원하는 정보가 포함되어 있는지 확인하세요:

```js
openssl x509 -in server.cert -text -noout
openssl rsa -in private.key -text -noout
```

<div class="content-ad"></div>

만약 필요하다면, 개인 키 파일은 암호로 보호되지 않습니다. 암호로 보호되어 있다면 개인 키에서 암호구를 제거해야 할 수도 있습니다.

```js
openssl rsa -in private.key -out private.key
```

인증서를 확인하려면

```js
openssl verify server.crt
```