---
title: "Pydantic Settings로 Python 설정 완벽하게 하기 위한 방법"
description: ""
coverImage: "/TIL/assets/img/2024-07-02-GetYourPythonConfigurationsRightEveryTimewithPydanticSettings_0.png"
date: 2024-07-02 21:43
ogImage:
  url: /TIL/assets/img/2024-07-02-GetYourPythonConfigurationsRightEveryTimewithPydanticSettings_0.png
tag: Tech
originalTitle: "Get Your Python Configurations Right Every Time with Pydantic Settings"
link: "https://medium.com/@vik-y/get-your-python-configurations-right-every-time-with-pydantic-settings-441d8a46c832"
---

# 소개

진지한 Python 애플리케이션을 개발할 때는 종종 애플리케이션이 실행되는 위치에 따라 변경될 수 있는 구성 매개변수가 필요합니다. 환경 변수는 애플리케이션 코드를 변경하지 않고 설정을 조정할 수 있는 훌륭한 방법입니다. 환경 변수를 조정하기만 하면 되기 때문에 다시 빌드할 필요가 없습니다.

그러나 환경 변수를 사용하는 것은 자체적인 일련의 도전 과제를 수반합니다. 이러한 변수가 유효하고 일관성 있게 유지되도록 보장해야 하며 그렇지 않으면 실행 중에 애플리케이션 실행에 실패할 위험이 있습니다. 일반적으로 이 값들을 유효성 검사하기 위해 사용자 정의 코드를 작성해야 하는데, 이는 지루하고 실수를 유발할 수 있습니다. 가끔은 개발자들이 유효성 검사를 건너뛰고 최선을 다하길 희망하기도 하는데, 이는 재앙을 불러올 수 있는 결과입니다.

Pydantic Settings를 소개합니다 — Python 애플리케이션에서 구성 관리를 간편화하는 훌륭한 도구입니다. Pydantic Settings를 사용하면 Pydantic의 데이터 유효성 확인 기능을 활용하여 환경 변수를 읽고 검증할 수 있습니다. 이를 통해 애플리케이션이 항상 올바른 구성을 얻게 되어 실행 중 오류의 위험을 줄이고 개발자로서의 생활을 훨씬 쉽게 만들어 줍니다.

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

# 문제 설명

구성 관리는 소프트웨어 개발의 중요한 측면입니다. 애플리케이션은 종종 데이터베이스 연결, API 키 및 기타 환경별 변수에 대한 설정이 필요합니다. 이러한 설정은 특히 다른 환경(개발, 테스트, 프로덕션)에 애플리케이션을 배포할 때 안전하고 효율적으로 관리되어야 합니다.

응용 프로그램 내에서 이러한 설정을 하드코딩하는 것은 안전 취약점을 유발할 수 있고 다중 환경에서 설정을 관리하기 어렵게 만들 수 있기 때문에 이상적이지 않습니다. 여기서 Pydantic Settings이 등장하여 구성을 처리할 구조화된 안전한 방법을 제공합니다.

## 예시 — .env와 함께

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

Pydantic Settings은 환경 변수 또는 .env 파일에서 구성을 로드하는 과정을 쉽게 만들어줍니다. 이 작업이 어떻게 이루어지는지 예시를 살펴보도록 하겠습니다.

먼저 Pydantic을 설치해야 합니다:

```js
pip install pydantic_settings
```

다음으로 프로젝트 디렉토리에 다음 내용을 가진 .env 파일을 만들어주세요:

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

```js
DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
API_KEY=your_api_key_here
DEBUG=True
```

이제 Pydantic을 사용하여 설정 모델을 정의하는 settings.py 파일을 생성해봅시다:

```js
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    api_key: str
    debug: bool

    class Config:
        env_file = ".env"

settings = Settings()
```

Settings 클래스를 통해 database_url, api_key, debug와 같은 예상 구성 변수를 정의합니다. Settings 내부에 중첩된 Config 클래스는 이러한 변수가 .env 파일에서 로드되어야 함을 지정합니다.

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
환경 설정에서 settings 모듈을 불러와주세요.

다음은 settings 모듈 값을 출력한 것입니다:
- 데이터베이스 URL: postgresql://user:password@localhost:5432/mydatabase
- API 키: your_api_key_here
- 디버그 모드: True

만약 .env 파일에서 디버그 값을 불리언(Boolean)이 아닌 다른 값으로 설정하면, 위 코드는 유효성 오류를 발생시킬 것입니다.

예를 들어, .env 파일에서 DEBUG 값을 xyz로 변경한 후 프로그램을 다시 실행하면 다음과 같습니다:

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

그러면 이와 같은 오류가 발생합니다:

```js
pydantic_core._pydantic_core.ValidationError: Settings에 대한 1개의 유효성 검사 오류
debug
  입력은 유효한 부울(boolean)이어야 하며, 입력값 [type=bool_parsing, input_value='xyz', input_type=str]을 해석할 수 없습니다.
    자세한 정보는 https://errors.pydantic.dev/2.7/v/bool_parsing 를 참조해주세요.
```

그리하여 데이터 유효성 검사를 무료로 받을 수 있습니다. 이를 통해 pydantic BaseModel로 수행할 수 있는 모든 검사를 수행할 수 있습니다.

중첩된 예제

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

설정을 중첩 모델로 관리할 수도 있습니다. 예를 살펴보세요. .env 파일을 정의하는 방법과 Settings 모델이 최종 구성을 생성하기 위해 다른 모델들을 사용하는 것을 주목해주세요. 멋지죠!

```js
# 당신의 .env 파일
V0=0
SUB_MODEL='{"v1": "json-1", "v2": "json-2"}'
SUB_MODEL__V2=nested-2
SUB_MODEL__V3=3
SUB_MODEL__DEEP__V4=v4
```

```js
from pydantic import BaseModel

from pydantic_settings import BaseSettings, SettingsConfigDict


class DeepSubModel(BaseModel):
    v4: str


class SubModel(BaseModel):
    v1: str
    v2: bytes
    v3: int
    deep: DeepSubModel # .env will have __DEEP__ to pass configs to DeepSubModel


class Settings(BaseSettings):
    v0: str
    sub_model: SubModel

    class Config(SettingsConfigDict):
        env_nested_delimiter = "__"


print(Settings().model_dump())
"""
{
    'v0': '0',
    'sub_model': {'v1': 'json-1', 'v2': b'nested-2', 'v3': 3, 'deep': {'v4': 'v4'},
}
"""
```

중첩 접근 방식을 사용하면 애플리케이션 구성 및 유효성 검사 논리를 보다 쉽게 분리할 수 있습니다.

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

# 결론

중첩 구성을 사용하여 Pydantic 설정을 활용하면 애플리케이션 설정을 더 효과적으로 구성할 수 있습니다. 이 구조는 애플리케이션이 성장함에 따라 설정을 관리하고 유지하는 것이 더 쉬워집니다. Pydantic의 강력함을 활용하면 타입 안전성과 기본 유효성 검사를 제공받아 구성 오류의 위험을 줄일 수 있습니다.

파이썬 애플리케이션을 간소화하고 싶나요? 저희에게 https://kubeops.consulting/에서 연락해보세요. 저희 팀은 파이썬 애플리케이션을 작성하고 확장하는 데 특화되어 있습니다.
