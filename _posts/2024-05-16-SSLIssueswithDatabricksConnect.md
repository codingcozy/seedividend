---
title: "SSL 문제와 Databricks Connect"
description: ""
coverImage: "/assets/img/2024-05-16-SSLIssueswithDatabricksConnect_0.png"
date: 2024-05-16 16:55
ogImage:
  url: /assets/img/2024-05-16-SSLIssueswithDatabricksConnect_0.png
tag: Tech
originalTitle: "SSL Issues with Databricks Connect"
link: "https://medium.com/@brain246/ssl-issues-with-databricks-connect-af79cab3c1d9"
isUpdated: true
---

# 문제

Windows 머신의 (회사) 네트워크에서 로컬로 Databricks-Connect를 실행 중이고 사용자 정의 인증서(루트 및 중간)를 사용하고 있다면, 코드를 실행할 때 다음과 유사한 오류가 발생할 수 있습니다:

데이터브릭스-커넥트가 gRPC를 사용하기 때문에(현재 구현체에는) 사용자 정의/회사 인증서에 대해 알지 못합니다. 비록 해당 인증서가 올바르게 로컬 Windows 인증서 저장소에 설치되어 있어도 그렇습니다.

이 문제는 pip/requests나 certifi를 사용할 때 발생하는 SSL 문제와 매우 유사합니다. requests/certifi/pip 주제에 대해 다양한 온라인 포스트를 찾을 수 있습니다. 예를 들어 이것이 있습니다. 해결 방법은 보통 pip-system-certs 또는 (이미 사용되지 않는) python-certifi-win32를 설치하는 것입니다. 그러나 이러한 수정 사항은 Databricks-Connect에서의 gRPC 문제를 해결하지 않습니다.

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

# 솔루션

## (1) 회사별 인증서가 포함된 .pem 파일 생성하기

로컬 Windows 인증서 저장소에 모든 관련 회사별 인증서가 설치되어 있다고 가정하고, 다음 파이썬 스크립트를 사용하여 해당 인증서를 추출할 수 있습니다:

```js
import ssl

context = ssl.create_default_context()
der_certs = context.get_ca_certs(binary_form=True)
pem_certs = [ssl.DER_cert_to_PEM_cert(der) for der in der_certs]

with open('wincacerts.pem', 'w') as outfile:
    for pem in pem_certs:
        outfile.write(pem + '\n')
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

현재 Windows 인증서 저장소에 있는 모든 인증서를 포함하는 파일(wincacerts.pem)이 생성됩니다.

이 인증서를 certifi와 함께 제공되는 표준 인증서에 추가하는 것을 제안합니다. 해당 인증서를 찾으려면 다음 명령을 사용하세요:

```python
import certifi

print(certifi.where())

>>> 'd:\repos\XXX\.venv\lib\site-packages\certifi\cacert.pem'
```

반환된 위치에서 찾은 파일을 열고 이전에 생성한 파일을 텍스트 편집기에서 열어 cacert.pem의 내용을 wincacerts.pem에 단순 복사하여 붙여넣기합니다. 이 파일 내의 인증서 순서는 중요하지 않습니다. 그 후 저장하고 wincacerts.pem을 Windows 사용자 홈 디렉터리의 임의의 위치로 이동해주세요. 예를 들어:
C:\Users\`사용자명`\certs\wincacerts.pem

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

# 환경 변수를 이용하여 사용자 정의 인증서 참조하기

이제 gRPC에게 사용자 정의 인증서 파일의 위치를 알려주기만 하면 됩니다. 가장 간단한 방법은 환경 변수 GRPC_DEFAULT_SSL_ROOTS_FILE_PATH를 사용하는 것입니다. 이 환경 변수는 VS-Code(특정 프로젝트/터미널용)에서 설정할 수도 있고, - 저는 선호하는 방법인 - 사용자의 Windows 환경 변수에 설정할 수도 있습니다:

<img src="/assets/img/2024-05-16-SSLIssueswithDatabricksConnect_0.png" />

팁: 새 환경 변수를 설정한 후 모든 열려있는 터미널/셸을 재시작하여 변경 사항을 적용해야 합니다.

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

## 그게 전부에요!

다음에 Databricks-Connect 코드를 실행할 때 SSL 핸드셰이크 오류가 사라져 있을 거예요.
