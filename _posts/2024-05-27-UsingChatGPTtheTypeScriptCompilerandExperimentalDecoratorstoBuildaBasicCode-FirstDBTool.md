---
title: "챗GPT, TypeScript를 사용하여 기본 코드 주도형 DB 도구 만들기"
description: ""
coverImage: "/assets/img/2024-05-27-UsingChatGPTtheTypeScriptCompilerandExperimentalDecoratorstoBuildaBasicCode-FirstDBTool_0.png"
date: 2024-05-27 18:54
ogImage:
  url: /assets/img/2024-05-27-UsingChatGPTtheTypeScriptCompilerandExperimentalDecoratorstoBuildaBasicCode-FirstDBTool_0.png
tag: Tech
originalTitle: "Using ChatGPT, the TypeScript Compiler, and Experimental Decorators to Build a Basic Code-First DB Tool"
link: "https://medium.com/better-programming/using-chatgpt-the-typescript-compiler-and-experimental-decorators-to-build-a-code-first-db-tool-30fbb377cc04"
isUpdated: true
---

<img src="/assets/img/2024-05-27-UsingChatGPTtheTypeScriptCompilerandExperimentalDecoratorstoBuildaBasicCode-FirstDBTool_0.png" />

안녕하세요! ChatGPT가 등장했고 엔지니어들 사이에서 큰 첫 인상을 남겼어요 — 이름에 비웃음을 보이는 사람부터 우주 탄생에 대해 이야기하는 등 다양한 의견이 있어요. 어느 쪽에 속하더라도 대부분은 이것이 산업 전체에 많은 변화를 가져올 것이라는 것을 깨달아요.

저는 프로그래머들이 만든 어떤 생산성 도구와 마찬가지로, ChatGPT를 효과적으로 활용하는 한 보상을 받을 것으로 생각해요. 효과적으로 사용하는 법을 배우기 위해서는 복잡한 시나리오를 시도하고 이를 어떻게 운영하는지 확인해야 해요. 저는 ChatGPT를 사용하여 빠르게 기본적인 코드 기반 데이터베이스 도구를 만들어보고, 그것에 추가해서 프로젝트를 실제로 몇 가지 기본 사례에 맞게 작동하도록 만들 계획이에요.

우선, 어떤 것에 대한 복잡한 프롬프트를 선택해봅시다. 코드 기반 데이터베이스 마이그레이터를 만드는 것은 흥미로운 도전이 될 수 있을 것 같아요. 우리는 코드 파일을 이해하고 필요한 추가 컨텍스트로 일부 클래스 속성을 장식하는 메타프로그래밍 작업을 해야하기 때문이죠. 이 글을 간결하게 유지하기 위해, 우리는 Primary 및 Foreign 키가 있는 테이블 생성 스크립트를 생성하고 작업 순서를 보장하는 마이그레이터의 일부분만 만들 것이에요.

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

요구 사항 목록은 다음과 같습니다:

- 데이터베이스의 테이블을 위한 인터페이스 작성 — 이는 어떤 플러그인이 적응할 수 있는 데이터의 추상 표현을 제공합니다
- 테이블 간의 관계 데이터를 어떻게 표현할지에 대한 인터페이스 조정 — 이는 우리의 이관 작업에 대비한 더 고급 개념입니다
- 플러그인이 관계 데이터를 마이그레이션 도구의 스크립트로 변환할 수 있도록 하는 인터페이스 작성 — 우리는 상하 이관 작업을 원할 것이며 이러한 작업의 추상화를 최대한 포착할 겁니다
- 내보낸 클래스의 소스 파일을 읽고 인터페이스를 활용하여 데이터를 구축할 수 있는 프로토타입 애플리케이션 작성 — 데이터베이스 코드 모델링의 기능적 측면을 테스트하기 위함입니다

이러한 요구 사항이 작성되면 이제 빠른 프롬프트를 만들어볼 수 있습니다. 몇 번의 시행착오 뒤에, 이에 대한 ChatGPT의 출력을 확인해 봅시다:

이리저리 까다로운 조건들이 많지만, ChatGPT는 기꺼이 협조할 준비가 되어 있습니다.

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

![image](/assets/img/2024-05-27-UsingChatGPTtheTypeScriptCompilerandExperimentalDecoratorstoBuildaBasicCode-FirstDBTool_1.png)

지금까지... 그리 좋지 않아요. 우리의 클래스 파일을 정규식으로 맞추고 싶지 않고, 앞으로 나올 것들이 좀 무서워요.

![image](/assets/img/2024-05-27-UsingChatGPTtheTypeScriptCompilerandExperimentalDecoratorstoBuildaBasicCode-FirstDBTool_2.png)

처음 텍스트 출력물은 놀랍네요. TypeScript를 거의 10년 동안 다루어왔지만, TypeScript 컴파일러 API에서 무언가를 가져오거나 내보내 본 적이 없었어요. 코드는 정말 흥미로워요:

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

<img src="/assets/img/2024-05-27-UsingChatGPTtheTypeScriptCompilerandExperimentalDecoratorstoBuildaBasicCode-FirstDBTool_3.png" />

이것은 멋진 시작이에요. 컴파일러 API에서 정보를 추출할 수 있는 매우 간단하고 우아한 방법에 대해 동시에 배우고 있어요. 이 방법은 코드-퍼스트 솔루션에 대한 제 아이디어의 기능 프로토 타입을 계속 구축할 수 있는 필요한 모든 정의로 연결되는 게이트웨이에요. 그리고 프로토타입 코드가 실시간으로 작성돼요. ChatGPT와 함께 작업하는 핵심 개념에 접근할 수 있는데, 그 중 가장 흥미로운 건 오직 올바른 방법으로 프롬프트하면 솔루션에 대한 많은 연구를 처리할 수 있다는 거에요.

심지어 코드 파일로 복사하여 추가 수정 없이 다중 행 주석으로 붙여넣을 수 있는 작동 방식에 대한 설명도 포함돼 있어요:

<img src="/assets/img/2024-05-27-UsingChatGPTtheTypeScriptCompilerandExperimentalDecoratorstoBuildaBasicCode-FirstDBTool_4.png" />

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

하지만 그 다음에 나오는 내용은 제가 찾던 것과는 조금 다릅니다. ChatGPT는 다음 코드 파일에서 기존 솔루션을 재정의하고 로컬 Postgres 데이터베이스가 설정되었고 Sequelize가 추가되었으며 classInfoList 출력을 통해 정의된 모델을 설정합니다.

![이미지](/assets/img/2024-05-27-UsingChatGPTtheTypeScriptCompilerandExperimentalDecoratorstoBuildaBasicCode-FirstDBTool_5.png)

우리가 찾던 것은 아닌 것 같고, 원래 프롬프트를 다시 살펴보면, 실제 마이그레이션이 발생하지 않도록 했어야 합니다. 우리가 원한 것은 단지 마이그레이션을 생성하는 다른 전략을 "연결할" 수 있는 인터페이스를 생성하는 것이었습니다.

그래서 해야 할 일 목록에서, ChatGPT가 우리를 다음과 같은 불필요한 일로부터 구해준 것을 볼 수 있습니다.

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

- 우리가 존재하는 것을 모르고 발견 못할 수도 있는 해결책에 대해 조사 중이었습니다.
- 원본 파일에서 클래스와 종속성을 추출할 수 있는 초기 프로토타입을 작성 중입니다.

처음부터 끝까지 생성된 모든 것, 처음에 정규 표현식 및 마지막에 Sequelize를 포함한 모든 것은 유용하지 않으며 사양의 일부도 아닙니다. 적어도 이 복잡한 프롬프트에 대한 어느 정도의 이해를 보여줍니다. 이 경우에는 ChatGPT가 몇몇 비관론자들이 예측한 것보다 전반적으로 조금 덜 진전을 남겼다는 것을 안타깝게 생각합니다.

우리의 Code-First 이관 도구를 위한 인터페이스를 구축하기 시작하는 것부터 유용하게 일부 코드를 적응해봅시다. 테이블 생성을 스크립팅하기 위해 필요한 TableInfo 유형 및 지원 유형을 정의하는 것부터 시작합니다:

이 유형은 약간 복잡합니다. 그러므로 최종적인 TableInfo 인터페이스로부터 분해해 보겠습니다. 클래스 이름에서 파생된 테이블 이름, 열 집합 및 테이블 간 관계를 나타내는 문자열을 유지합니다.

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

- 관계 - 관계를 나열해 놓는 이유는 대부분의 RDBMS에서 활성 관계가 없는 경우 테이블을 삭제하는 작업이 가능하지 않은 경우가 있기 때문입니다. 관계를 나열함으로써 테이블을 만들고 삭제할 순서를 결정할 수 있습니다.
- 컬럼 - 이는 테이블 정의의 본질을 담고 있습니다. 컬럼은 fieldName, datatype, nullable을 포함하며, 이는 자명한 내용입니다. "modifiers" 속성은 주/외래 키와 같은 주요 정의를 위한 대체 속성입니다.

![image1](/assets/img/2024-05-27-UsingChatGPTtheTypeScriptCompilerandExperimentalDecoratorstoBuildaBasicCode-FirstDBTool_6.png)

![image2](/assets/img/2024-05-27-UsingChatGPTtheTypeScriptCompilerandExperimentalDecoratorstoBuildaBasicCode-FirstDBTool_7.png)

우리는 Automigrate API를 위한 일반적인 인터페이스를 정의했습니다. 이로써, 특정 데이터베이스를 위한 플러그인이 구현되어 있다면, 마이그레이터는 여러 데이터베이스 언어를 지원할 수 있을 만큼 유연해질 것입니다. 이제 프로그래밍할 인터페이스를 알았으니, CodeFirst 모델 관점에서 TableInfo를 작성하는 방법을 고민해볼 수 있습니다.

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

여기에 예시 모델 몇 개를 작성해 보겠습니다. 우리는 일종의 TypeScript 클래스로 일련의 테이블을 코드 기반으로 정의할 것입니다.

이제 우리에겐 몇 개의 테이블이 있습니다: Project, Feature, Person, 그리고 Project_Persons입니다. 여기에 몇 가지 관계가 포함되어 있습니다. Feature가 Project에 속하고, Project에는 많은 사람들이 할당될 수 있지만, 사람들은 프로젝트 외부에서 관리되어야 합니다.

그러나 현재 상태에서는 관계 자체를 정의할 수 없으며, 다른 곳에서 어떻게 가정할지도 어렵습니다. 또한 기본 키나 외래 키를 나타내는 필드 또는 이러한 외래 키가 어떻게 관련되는지를 관리하는 좋은 방법이 없습니다. 또한 사용자들이 이러한 관계를 추적하기 위해 모델에 추가 속성을 정의하거나 생성자에 정보를 넣어야 한다면 사용자 경험에 좋지 않을 것입니다.

여기에는 필드에 메타데이터를 표시할 수 있게 해주는 실험적인 TypeScript 데코레이터 개념이 있습니다. '실험적인'이라는 표현에 겁먹지 마세요. 이 기능은 꽤 오랫동안 개선되어 왔습니다. 이를 활성화하기 위해 tsconfig.json 파일로 이동하여 experimentalDecorators와 emitDecoratorMetadata를 true로 표시하여 컴파일러에서 지원을 받을 수 있도록 설정해야 합니다. 이 작업을 마치면 기본 키와 외래 키에 대한 일부 데코레이터를 정의할 수 있어야 합니다:

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

이 코드는 두 개의 새로운 데코레이터, PrimaryKey 및 ForeignKey를 정의하고 reflect 라이브러리를 통해 메타데이터를 추출할 수 있는 메서드를 제공합니다. 여기서 "target"의 존재는 이러한 메서드를 클래스의 인스턴스화된 인스턴스에 호출하여 해당 메타데이터를 검색해야 한다는 것을 의미합니다. 이는 나중에 구현을 약간 복잡하게 만들 수 있지만 대부분의 경우에는 배포 스크립트를 효과적으로 작성할 수 있도록 해줄 것입니다.

이 코드는 실험적인 것이며 위의 가설을 확인하고 싶으므로, 이러한 데코레이터가 예상대로 작동하는지 확인하기 위한 테스트도 작성하겠습니다:

이러한 모든 테스트가 실행되고 통과되었으므로, 이제 코드 퍼스트 모델에서 이러한 새로운 데코레이터를 활용할 준비가 되었습니다. 우리가 조정한 CodeFirst.ts 파일을 보여주기 위해 여기서 차이를 사용하겠습니다:

이제 우리가 예제 모델을 확인하고 지원하는 참조 메타데이터를 설정하고 플러그인 인터페이스를 구축했으므로, 문제의 핵심인 TypeScript 컴파일러 API를 통해 클래스 정의의 메타데이터를 추출할 수 있습니다.

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

원래의 ChatGPT 코드 출력으로 돌아가 봅시다. 그 코드는 디렉토리에서 파일을 가져 와 TypeScript API를 통해 ClassInfo를 검색 한 다음 해당 이름과 종속성을 반환하는 코드를 생성 했습니다. 모두 함께, 우리가 작성해야 하는 유형의 코드입니다. 이 코드를 관련 책임으로 분해하여 각각에 대해 고려하고 무슨 일이 일어나고 있는지 명확하게합니다.

제가 말하고 싶은 것은 애플리케이션의 주요 부분에서 소스에서 파일을 검색하는 처리를 처리하고 싶지 않다는 것입니다. 이는 애플리케이션의 외부에서 발생해야 하므로, 소스 파일이 위치한 곳을 선택할 수 있도록 새로운 Modeler 클래스를 만들 것입니다. 이때 다른 사람이 우리 라이브러리를 사용하려는 경우 소스 파일의 위치를 지정할 수 있습니다.

TypeScript 컴파일러의 SourceFiles 유형을 사용하고 코드를 가져 오기위한 방법을 구현할 것입니다. 예제 디렉토리에서 사물을 테스트 할 수 있도록:

여기서 SourceExtractor 클래스를 만들었습니다. 이 클래스에는 두 개의 static 메서드가 있습니다 - getSourceFile 및 getFilesFrom이라는, 파일을 읽고 해당 TypeScript SourceFile을 검색하기 위해 문자열 인수를 취하는 메서드입니다. 이것은 이제 클래스 정의를 해석하고 플러그인 API 유형을 생성하는 모델러에게 전달될 수 있습니다.

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

먼저, 소스 파일 유형을 사용 가능한 데이터로 분해하는 데 도움이 되는 메서드를 분해하고 구축하는 것부터 시작합시다:

소스 파일을 구문 분석하는 데 도움이 되는 몇 가지 메서드가 있습니다.

- tryGetTargetInstance — 모델에서 클래스를 인스턴스화하여 반환합니다. 실행 중에 클래스가 등록되지 않은 경우, 실행이 실패한 이유를 명시적으로 알려주고 사용자가 어떻게 해야 하는지 설명하는 오류가 발생합니다.
- getPropertiesOf — 클래스 멤버에서 속성을 필터링하는 데 도움이 되는 구문 설탕
- getClassesFrom — 소스 파일에서 클래스를 필터링하는 데 도움이 되는 구문 설탕
- processClassFile — 이것은 단일 클래스 속성 처리를 기대하는 뼈대 메서드입니다. 우리의 이상적인 결과는 전체 ColumnDefinition 또는 속성이 어떤 이유로 표현할 수 없는 경우 false입니다.
- getColumnDefinitionsFrom — ColumnDefinitions를 생성하는 데 호출할 메서드입니다. 또한 출력에서 구문 분석 실패를 필터링합니다.

이제 추출기를 설정하여 소스 파일 구문 분석기의 도우미 메서드를 사용할 수 있습니다.

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

모델러는 여기서 단 하나의 도우미 함수인 extractForeignKeyTables만 가지고 있습니다. 이 함수는 현재 열 목록과 다른 모델 간의 종속성 목록을 생성하여 출력된 업 및 다운 마이그레이션의 순서를 정렬합니다.

이외에도 추출 메서드는 간단합니다. 소스 추출기로 추출할 파일과 등록된 유형을 사용하여 TableInfo[]를 생성하는데, 모두 정적 타입 확인으로 강제됩니다. 이는 각 파일을 반복하고 클래스를 가져와 getColumnDefinitions 메서드를 통해 인터페이스 정의를 추출하는 방식으로 동작합니다. 또한 우리의 도우미 함수를 활용하여 마이그레이션을 구축하는 데 필요한 모든 정보를 얻을 수 있습니다.

이제 라이브러리를 사용하는 최종 사용자의 관점에서 어떻게 보일지 살펴보는 것이 좋을 것 같습니다. 이전에 코드 퍼스트 예제 파일을 검토했지만, 그것을 어떻게 통합할까요? 간단히 다음과 같이 요약해 봅시다:

매우 간단합니다! 먼저 대상 파일(이 경우 CodeFirst.ts 파일)을 가져와 파일로부터 모델 추출을 실행하고 TableInfo 인터페이스를 상태 파일로 출력할 수 있습니다. 이는 로컬 환경과 새로 만든 변경 사항 간의 차이점을 나타내는 변경점에 대해서만 스크립트를 생성하기 위해 이전 마이그레이션 간의 차이를 구현할 가능성이 높은 곳입니다.

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

추가로 예제 플러그인이 생성하는 것을 모델링할 수 있습니다. AutomigrateAPI 인터페이스를 구현하는 스텁 클래스를 간단히 선언하여 해당 정보를 스크립트 파일로 출력하면 됩니다. 이러한 스크립트는 마이그레이션을 수행하는 대상 환경에서 실행하는 것입니다.

사용하기 매우 쉽고 인터페이스에 대해 매우 확신하고 있습니다. 충분한 테스트 커버리지가 있으므로 자신 있게 변경을 할 수 있고 필요에 따라 테스트를 조정할 수 있습니다. 이제 소스 파일 해석이 작동하도록 해 봅시다!

자주 마주칠 개념 중 하나는 TypeScript 컴파일러 API가 구문에 대한 자체 내부 표현을 가지고 있다는 것입니다. 이는 SyntaxKind라는 enum 안에 존재하며 컴파일러가 인식하는 코드의 각 부분에 대한 표현이 있습니다. typescript.d.ts에서 SyntaxKind 정의로 이동하는 단축키인 fn+F12를 사용하여 액세스할 수 있습니다:

![이미지](/assets/img/2024-05-27-UsingChatGPTtheTypeScriptCompilerandExperimentalDecoratorstoBuildaBasicCode-FirstDBTool_8.png)

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

그래서 필요한 것은 TypeScript 컴파일러 출력을 해석하고 작업 중인 인터페이스를 위해 이러한 유형 (DatabaseType)의 표현을 반환하는 기능 세트가 있어야 할 것 같아요.

일단 이를 작성해 봅시다:

typescriptSyntaxKindToDatabaseTypeMap은 우리 라이브러리의 "방해 방지 계층"으로 존재하여 우리가 필요에 따라 쉽게 변화할 수 있게 해줍니다. 대부분이 꽤 직접적인 변환인 점을 고려하면, SyntaxKind를 그대로 사용하고 SyntaxKind.UndefinedKeyword와 SyntaxKind.TypeReference을 만나면 단순히 정의되지 않은 값을 반환하는 것이 아닌가하는 의문이 생길 수 있습니다. 그 이유는 이 라이브러리가 항상 TypeScript 컴파일러를 사용할지 알 수 없기 때문입니다.

이 방법을 통해 API로부터 기저 구현의 세부 정보를 반환함으로써 이를 넘나드는 방법을 만들어봅시다. 우리가 지금 사용하는 것보다 우수한 새 라이브러리를 찾으면 이 라이브러리와는 아무 상관이 없는 응용 프로그램 코드의 중요 부분이 변경되어야 할 수도 있음을 발견할 수 있습니다.

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

extractKeyData 메소드는 클래스 파일을 해석하면서 클래스 객체의 인스턴스에서 데코레이터 (AKA 키 데이터)를 생성합니다. 이는 미래 마이그레이션을 위한 ColumnDefinitions을 생성하는 중요한 부분입니다.

이전에는 processClassProperty라는 메서드 스텁을 추가하여 코드를 작성할 준비를 했습니다. 이제 해당 스텁을 제거하고 TypeScript 컴파일러 API를 통해 많은 속성 정보 추출을 처리할 새 파일에 재작성하겠습니다.

원래 ChatGPT 구현의 "본질"은 TypeScript 컴파일러 API에 대해 약간 배웠던 곳에 있습니다. 이를 통해 각 속성 선언이 여러 연관 값들을 가지고 있고, 컴파일러 API가 노드를 평가하는 데 일부 단순화된 도우미를 제공한다는 것을 알게 되었습니다. 몇 가지 유효성 검사 후 정적 유형 확인이 어떻게 타입을 표현하는지도 조금 배우게 될 것입니다.

이는 상당히 큰 코드 청크이므로, 먼저 processClassProperty 메서드에서부터 다른 코드 경로를 방문하면서 분석해 보겠습니다. GitHub에 통합된 빠른 머메이드 차트를 작성해보겠습니다. 이를 README와 함께 문서화의 나머지 부분에 추가할 수 있습니다.

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
flowchart TD
 A[processClassProperty]
 A --> B{Is Union Type?}
 B --> |No| singleNode[processSingularNode]
 B --> |Yes| C[Definition is Valid]
 C --> |No| E[Error]
 C --> |Defined Type| singleNode
 singleNode --> typeRefCheck{Node Type?}
 typeRefCheck --> |TypeReference or date| pTypeRef[processFromTypeReferenceNode]
pTypeRef --> return
 typeRefCheck --> |Array| arrayCheck{Is array type?}
 arrayCheck --> retArr[Retrieve array type]
 retArr --> typeRefCheck
 typeRefCheck --> |Basic Type| basicType[typescriptSyntaxKindToDatabaseTypeMap]
 return((return ColumnDefinition))
 basicType --> return
 typeRefCheck --> |Else| error[Error]
```

![image](/assets/img/2024-05-27-UsingChatGPTtheTypeScriptCompilerandExperimentalDecoratorstoBuildaBasicCode-FirstDBTool_9.png)

첫 번째 호출이 속성이 공용 형식인지 여부에 따라 분기되는 것을 볼 수 있습니다. 이는 공용 형식을 사용하는 방식 중 하나로 "archived: boolean | undefined"와 같이 null 값을 db 모델로 나타낼 수 있는 방법입니다. 반면에 "string | number"를 허용하는 모델을 작성하려는 경우, 대부분의 데이터베이스에서 이를 표현할 수 없으므로 이를 시도하는 사람에게 명시적인 오류를 throw합니다. Else 조건의 경우 "정의되지 않은 형식" 노드를 일반적으로 처리할 것입니다.

그리하여 processSingularNode로 이어지는데, 이 처리 과정이 우리의 분류 작업의 주된 부분을 담당합니다. 현재 노드 유형을 가져오고 여러 코드 경로가 있으며 각각은 열 정의를 생성하는 방식에서 약간의 차이가 있습니다.

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

- Array - 배열은 자체 유형이며 그 아래에 더 많은 노드가 있어 배열화된 값을 정의합니다. 이에 따라 주요 배열 유형을 추출한 후 processSingularNode 호출로 다시 전달해야 합니다. 거기서 반환 값을 내부적으로 처리할 수 있습니다.
- TypeReference - TypeReference는 사용자가 정의한 클래스나 JavaScript 자체의 데이터 유형인 이 속성을 의미합니다. 두 경우 모두 다룰 것이지만, 현재 우리는 다른 비-기본 유형에 대해서는 아무것도 하지 않습니다.
- 기본 유형 - 여기서 TypeScript 유형을 API 호출용 데이터범에 매핑하고 값을 반환합니다.

이를 넘어서, 이제 ColumnDefinition을 메인 응용 프로그램으로 반환하고 있습니다! 이제 응용 프로그램을 테스트하고 프로토타입을 구현할 수 있습니다. 인기 있는 데이터베이스인 Postgres 플러그인을 만들어보겠습니다.

플러그인을 구현하는 사람을 위해 drop table 문의 정렬기가 유용하다는 것을 알고 있습니다. 플러그인을 활용하는 누구나 테이블 삭제를 순서대로 처리하는 정렬기를 사용할 수 있도록 하겠습니다. 우리가 각 구현에서 수행해야 할 것임을 알고 있기 때문에 모든 사람들의 시간을 절약하기 위해 도움말 파일을 추가하겠습니다:

그리고 자신의 테이블이 효과적으로 정렬되는지 확인하기 위해 몇 가지 테스트를 작성해보겠습니다:

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

상단의 테스트에서 우리가 기대한 정렬 순서가 유지되었음을 확인했으므로 테이블을 올바르게 삭제할 것입니다. 이것은 특히 복잡한 시나리오를 처리하지는 않지만, 미래 유지보수자나 이관 도구를 사용하고 싶어하는 사람들에게 일부 테스트된 리소스를 제공하는 방법을 보여주기 위한 단순한 구현입니다.

이제 빠르게 Postgres 플러그인을 만들어 봅시다:

이 플러그인은 조금 무겁지만, 빠르게 살펴보겠습니다:

- postgresMap은 데이터베이스 유형 추상화에서 Postgres의 데이터 유형으로의 관계를 제공합니다. 이는 열 정의를 구성할 때 사용됩니다.
- columnMap은 열을 생성하는 방법입니다. 가능한 옵션의 배열을 만들고, junk를 제거하기 위해 boolean에 맞게 필터링한 다음, 이를 하나의 공백으로 결합합니다. 여기에는 열의 기본/외래 키 지정도 포함되어 있습니다.
- relationshipMap은 외래 키 관계를 매핑하는 작은 도우미입니다.
- tableCreateMapper는 매우 직관적으로 단일 완전한 테이블 생성 스크립트를 생성합니다.
- tableDropMapper는 유사하지만 테이블 삭제용입니다.
- PostgresPlugin은 AutomigrateAPI를 실제로 구현하는 클래스입니다. 다른 함수들을 한 곳에 모아 AutoMigrateOutput을 생성하여 데이터베이스에 적용할 수 있는 up-and-down 이관을 만듭니다.

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

좋아요, 이제 모든 코드를 미리 작성했고 모델도 작성했으니, 테스트를 한 번 해보겠습니다! 먼저, 방금 작성한 Postgres 플러그인을 사용하도록 예제 인덱스 파일을 변경하겠습니다:

위의 차이점을 보면 예제 플러그인을 PostgresPlugin으로 교체하는 것을 보여줍니다. 이런 식으로 인터페이스를 활용하는 것의 장점은 이 코드 조각을 쉽게 교체할 수 있으며, 테스트의 다른 부분에는 변경이 필요하지 않다는 것입니다. 모든 것이 여전히 동일하게 작동합니다. 실행하면 두 가지 예상 출력이 생성됩니다: 현재 실행 상태를 포함하는 state/state.json 파일과 API 인터페이스에서 정의한 마이그레이션을 포함하는 scripts/scripts.json 파일(문자열 배열로 된 up 및 down).

우리의 출력 상태에는 테이블 정보 배열이 포함되어 있습니다. 이 배열은 테이블 이름, 열, 다른 테이블과의 관계에 대한 문자열 배열을 포함합니다. 열 정의에는 필드 이름, 열 유형, Null 여부 및 수정자(즉, 키)가 포함됩니다. 이 모든 것이 플러그인에게 유효한 마이그레이션을 생성하는 데 필요했던 내용입니다. 이것은 기본 사례를 다루지만, 프로덕션 환경에서 플러그인을 올바르게 관리하기 위해 상태 파일의 다른 반복을 저장하고 비교해야 할 것입니다.

생산된 마이그레이션이 무엇인지 살펴보겠습니다:

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

저희가 보았을 때, 출력물이 API 정의와 일치하는 것을 확인할 수 있습니다. up 및 down 문자열 배열을 포함하는 JSON 객체는 마이그레이션 프로세스의 단계를 나타냅니다. 테이블 생성문이 작동하고, 데이터를 제대로 비우기 위해 테이블 삭제문이 순서대로 나열되어 있어 우리의 다운 마이그레이션 작업이 문제없이 진행될 수 있음을 알 수 있습니다. 우리의 기본 케이스가 잘 이행된 것이죠!

# 다음 단계

마이그레이션 도구를 프로덕션 환경에 사용할 수 있도록 만드는 것은 범위를 벗어나지만, 이 곳에서 생성된 로직의 대부분이 이미 완성되었으므로 우리에게는 꽤 간단한 길이 있다는 것을 알고 있습니다. 프로덕션 환경에 맞게 만들기 위해 statefile 작업에 관한 몇 가지를 변경해야 합니다:

- 내부적으로 statefile을 관리하기 위해 라이브러리의 실행 프로세스를 수정하거나 새로운 메소드 집합을 개발합니다.
- statefile에 해시 코드 또는 날짜 후위사항을 추가하여 어떤 순서로 statefile을 고려해야 하는지 추적할 수 있도록 합니다.
- statefile 간의 차이를 활용하여 플러그인 아키텍처에서 호출할 메소드를 결정하는 책임을 지는 클래스를 만듭니다.

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

이렇게 하면 라이브러리 코드 실행 사이에 마이그레이션 차이점만 적용할 수 있습니다.

플러그인 자체에 대해 말하자면, 지금은 완전히 구현된 테이블만 생성할 수 있습니다. 단일 책임 원칙을 위반하지 않고 플러그인 아키텍처를 명확하고 간결하게 유지하는 가장 좋은 방법은 차이점을 처리하고 이를 플러그인 API 호출로 변환하는 레이어를 삽입하는 것입니다. 우리를 제품 사용 가능한 상태로 이끌 수 있는 몇 가지 API 변경과 수정이 있습니다:

- 테이블 제거
- 열 추가/삭제/변경
- 관계 변경
- 수동 스크립트 (데이터 마이그레이션 등)

ChatGPT가 우리에게 가르칠 수 있는 것들을 살펴보고 TypeScript 컴파일러 API에 대해 좀 더 배우는 것을 즐겼으면 좋겠습니다. 이것은 메타 프로그래밍 작업에 강력한 도구이며 개발자의 관점에서 매우 흥미로운 기능입니다.

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

최종 작동 코드를 확인하고 싶다면, 디버깅으로 실행하고 npm 설치를 위한 로컬 라이브러리 빌드 구성이 포함된 최종 운영 코드를 확인하실 수 있습니다. GitHub 링크는 여기 있어요:

읽어주셔서 감사합니다!
