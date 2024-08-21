---
title: "Box UI Elements, React, Tailwind CSS, Vercel을 사용하여 콘텐츠 포털을 만드는 방법 - 파트 1"
description: ""
coverImage: "/assets/img/2024-06-20-BuildacontentportalusingBoxUIElementsReactTailwindCSSVercelPart1_0.png"
date: 2024-06-20 00:02
ogImage:
  url: /assets/img/2024-06-20-BuildacontentportalusingBoxUIElementsReactTailwindCSSVercelPart1_0.png
tag: Tech
originalTitle: "Build a content portal using Box UI Elements, React, Tailwind CSS , Vercel Part 1"
link: "https://medium.com/box-developer-blog/build-a-content-portal-using-box-ui-elements-react-tailwind-css-vercel-part-1-f1c509621ceb"
isUpdated: true
---

![image](/assets/img/2024-06-20-BuildacontentportalusingBoxUIElementsReactTailwindCSSVercelPart1_0.png)

Box는 그 자체로 훌륭하지만 때로는 특정 사용자 인터페이스를 가진 맞춤 환경을 외부 사용자에게 제공하고 싶은 경우가 있을 수 있습니다. 이때 컨텐츠 포털이 등장합니다!

이 포털 시리즈의 첫 번째 부분에서 Box의 샘플 코드 저장소 중 하나를 사용하여 Box UI Elements, React, Tailwind CSS 및 Vercel을 이용해 포털 개발을 시작하는 방법을 살펴볼 것입니다.

# 커스텀 포털 개요

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

만약 알지 못하는 경우, 포털은 기본적으로 Box 위에 오버레이입니다. 이를 통해 내부 직원, 공급업체 또는 외부 고객이 비즈니스 프로세스의 저장 계층으로 Box를 사용할 수 있습니다.

![이미지](/assets/img/2024-06-20-BuildacontentportalusingBoxUIElementsReactTailwindCSSVercelPart1_1.png)

만든 포털은 완전히 사용자 정의된 사용자 경험을 제공하며, Box API를 사용하여 데스크톱이나 모바일 기기에서 콘텐츠 클라우드와 상호 작용하는 것이 쉽습니다.

가장 좋은 부분은 Box의 산업 최고 수준의 보안 메커니즘이 유지되어, 콘텐츠에 접근해야 하는 사람만이 접근할 수 있도록 됩니다.

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

## 고객 사용 사례

우리는 보험 청구나 자산 관리를 위해 포털을 사용하는 많은 고객들을 보유하고 있습니다. 아래는 몇 가지 예시입니다.

모건 스탠리는 클라이언트가 컨설턴트와 협력하며 재정 및 세금 문서를 관리할 수 있도록 Box API를 사용한 디지털 보궐을 만들었습니다.

새로운 고객 대출 신청 및 대출 문서 보관을 위해 포털을 활용하는, 신규 또는 소규모 비즈니스와 대출 업체를 연결하는 Fundwell도 있습니다.

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

국가적으로는 보통 전체 보험 청구 처리과정에 Box 콘텐츠 포털을 사용합니다.

# 안내

오늘의 데모에서는 Box UI 요소를 사용하여 가상 뱅크 'Increo Financial'을 위한 간단한 금융 문서 포털을 만드는 방법을 안내하겠습니다. 이 예시 코드를 사용하여 여러분의 포털을 발전시키는 시작점으로 활용할 수 있습니다.

UI Elements는 Box 플랫폼의 사용하기 쉽고 사용자 정의 가능한 React UI 구성 요소입니다. 버전 19부터는 반응형으로 작동합니다.

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

여러 유형이 있습니다. 파일 업로드, 다운로드 및 볼 수 있는 컨텐츠 탐색기(content explorer) 또는 파일을 사용자에게 표시하는 미리 보기 요소(preview element)와 같은 것들이 있습니다. 우리 포털은 다양한 것들을 사용할 것입니다.

박스의 기능 및 범위가 내장되어 있습니다. 예를 들어, 사용자가 파일의 메타데이터를 볼 수 있게 하거나 Box AI를 사용하고 싶다면 작은 구성 변경으로 쉽게 가능합니다.

모든 최신 데스크톱 및 모바일 브라우저가 지원되며, 로고도 사용자 정의할 수 있습니다.

UI Elements v20부터 React v17.0.2 및 Node 18.18.0까지 사용할 수 있습니다.

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

## 🚨 중요 사항 🚨

이 데모는 시연을 위한 것이며 실제 운영에 적합하지 않습니다. 완전한 인증 조치가 부족하기 때문에 추가 개발 없이는 실제 환경에 적합하지 않습니다.

## 필요 사항

튜토리얼의 첫 번째 부분을 완료하려면 다음 항목이 필요합니다:

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

- GitHub 계정
- Vercel 계정 — GitHub 계정으로 로그인하는 것이 좋습니다.
- Box 개발자 계정 — Box 전체에서 고유한 이메일 주소를 사용해야 합니다.

## Box 애플리케이션 구성

- 새 애플리케이션 만들기: Box 개발자 콘솔에 가서 ‘새 앱 만들기’를 클릭하고, ‘사용자 정의 앱’을 선택하고, 앱 이름을 지정한 다음에 ‘JWT를 사용한 서버 인증(JWT)’을 선택합니다. 참고 — 실제 데모에는 필요하지 않지만, 앱 사용자 관리 및 보안 수준을 높이기 위해 실제 배포에서 JWT를 사용하는 것이 권장됩니다.
- 애플리케이션 범위 설정: 필요한 권한이 있는지 확인합니다: 앱 + 기업, 모든 파일 읽기/쓰기, 사용자/그룹/기업 속성 관리, Box AI(Enterprise+ 라이선스 이상에서만 사용 가능) 및 사용자 액세스 토큰 생성하기. 다시 한 번 강조하지만, 이러한 범위 중 일부는 데모 배포에서 사용되지 않지만, 실제 시나리오에서는 필수입니다.
- 공개/비공개 키 쌍 생성: 공개/비공개 키 쌍 생성 버튼을 클릭합니다. 이 작업은 2단계 인증이 필요합니다. 이전에 설정한 적이 없다면 설정해야 할 것입니다. 팝업이 나타나면 설정 방법을 안내합니다. 설정을 완료한 후, 키 페어 플로우를 다시 진행해야 합니다.
- JSON 구성 파일 다운로드: 이 파일은 키 페어 생성시 자동으로 다운로드됩니다. 이 파일을 가까이 보관하세요. 나중 단계에서 이 파일의 정보가 필요합니다.
- 저장: 우측 상단에 있는 버튼을 사용하여 변경 사항을 저장합니다.

## Box 애플리케이션 인증

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

항상 그렇듯이, 서버 인증 애플리케이션을 사용하려면 Box 인스턴스의 관리자에 의해 승인해야 합니다. 애플리케이션을 승인하려면 사용자 지정 앱 승인에서 안내된 단계를 따르세요. 승인 후에는 서비스 계정 이메일이 앱에 할당됩니다. 누군가 변경을 가할 때마다 앱을 다시 승인해야 합니다.

## Box 더미 콘텐츠 설정

데모가 동작하려면 몇 가지 더미 콘텐츠를 생성해야 합니다. 실제 시나리오에서는 사용자가 생성되거나 Increo Financial에 가입할 때 대부분 자동화될 수 있습니다. 그러나 간단함과 신속성을 고려하여 여기서는 수동으로 진행하겠습니다.

모든 포털 콘텐츠가 저장될 루트 폴더를 생성하세요. 폴더의 이름을 Portal Demo로 지정하세요.

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

이전에 만든 JWT 애플리케이션의 서비스 계정 이메일 주소를 포털 데모 루트 폴더에 추가해보세요. 만일 어디서 해당 이메일을 가져와야 할지 기억하지 못한다면, Box 개발자 콘솔의 일반 설정 탭에서 찾을 수 있습니다.

많은 종단 사용자가 사용할 예정인 포털을 상상해볼 때, 하나의 사용자를 위한 폴더를 만들어봅시다. 데모 루트 폴더에 새 폴더를 생성하세요. 가짜 사용자의 이름으로 이름을 지어주시면 되는데, 예를 들어 Robert Smith와 같이 해보세요.

이번 데모에서는 앱 사용자를 사용하지는 않겠지만, 컨텐츠 포털의 프로덕션 구현에서는 앱 사용자를 활용하여 적합한 보안 포지셔닝을 유지하는 것이 매우 중요합니다. 이와 관련된 자세한 정보는 여기와 여기에서 확인할 수 있어요.

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

스미스 씨의 폴더 안에 두 개의 폴더를 더 만들어주세요: Applications와 Statements.

Statements 폴더에 이 더미 명세서의 사본을 업로드해주세요.

사용자의 루트 폴더에 이 더미 약관 파일의 사본을 업로드해주세요. 실제 시나리오에서는 이 파일이 다른 곳에 존재할 수 있지만, 미리뷰 상자 UI 요소를 보여드리기 위해 실제 파일이 필요합니다.

우리가 생성한 각 요소마다 다음 단계에서 필요한 ID를 유지해야 하니 Box를 열어두세요!

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

## Vercel을 사용하여 초기 사이트 배포하기

이제 Box 애플리케이션을 만들고 더미 콘텐츠를 만들었으므로 Box의 샘플 저장소에서 기본 포털의 사본을 배포할 수 있습니다.

🚨중요🚨

이미 Vercel 계정을 생성하고 탭에서 열어 둔 상태여야 합니다. 계정이나 탭을 열지 않은 채로 Vercel에 배포하면 혼동이 발생할 수 있습니다. GitHub에서 무언가를 처음으로 배포할 때 GitHub와 Vercel을 서드 파티 통합을 통해 연결하라는 메시지가 표시될 것입니다. 이것은 정상적인 동작입니다.

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

위의 링크를 클릭하여 Vercel에 배포해보세요. 여러 옵션을 선택해야 할 것이므로 함께 진행해 봅시다.

먼저, 위의 링크를 클릭했을 때 아래 화면이 표시되지 않는다면 아마 Vercel에 로그인되지 않았을 것입니다. 오른쪽 상단에 있는 로그인을 클릭하여 로그인하고, 창을 닫은 다음 다시 링크를 클릭해주세요.

아래 화면에 도달하면, 첫 번째 상자 오른쪽 하단의 '만들기'를 클릭해주세요. 이렇게 하면 귀하의 계정에 GitHub 저장소가 생성되고 Box의 샘플 저장소에서 코드를 복제합니다.

다음 단계에서, 여러 환경 변수를 붙여넣어야 합니다. Vercel에 내장된 환경 변수를 사용하면 보안을 유지하는 훌륭한 방법입니다. 각 부분에 대한 Box 콘텐츠 ID는 해당 부분의 URL 막대에서 찾을 수 있습니다. 예를 들어, 아래 스크린샷에서 URL 슬러그 끝에 표시된 ID는 'Statements' 폴더의 폴더 ID입니다.

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

각 값 필드를 확인하고 요청된 변수를 채우세요. 완료하면 배포를 클릭해주세요.

- REACT_APP_BOX_CONTENT_UPLOADER_FOLDER_ID 변수는 파일 folder와 함께 사용됩니다.
- REACT_APP_UPLOADED_FOLDER_ID 변수는 폴더 applications와 함께 사용됩니다.
- REACT_APP_BOX_PREVIEW_FILE_ID 변수는 파일 terms and conditions와 함께 사용됩니다.
- 나머지 변수들은 자동으로 다운로드된 JSON 구성 파일에서 가져옵니다. 보안상의 이유로 이들을 표시하지는 않겠습니다. 단지 복사하여 붙여넣기하면 됩니다 — 따옴표 없이. 그 중에서 가장 긴 사설 키는 순서가 섞여 있고, 값에는 /n을 포함해야 합니다.

배포를 클릭한 후 아래와 같은 화면이 표시될 것입니다. 이 프로세스는 몇 분 정도 걸릴 수 있습니다.

다음과 같은 오류가 표시될 수 있습니다. 그럴 때는 해결 방법이 있습니다. 왼쪽 상단의 이름을 클릭하여 대시보드로 이동해주세요.

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

<img src="/assets/img/2024-06-20-BuildacontentportalusingBoxUIElementsReactTailwindCSSVercelPart1_3.png" />

포털 프로젝트를 클릭하여 선택하세요.

프로젝트의 설정 탭에서 아래로 스크롤하여 Node.js 버전 섹션을 찾으세요. 드롭다운에서 18.x를 선택하세요. 저장을 클릭하세요.

이제 포털 프로젝트의 배포 탭을 전환하세요. 실패한 배포를 볼 수 있어야 합니다. 점 세 개를 클릭하고 다시 배포를 선택하세요.

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

팝업에서 기본 설정을 그대로 두고, 다시 배포를 클릭해주세요.

<img src="/assets/img/2024-06-20-BuildacontentportalusingBoxUIElementsReactTailwindCSSVercelPart1_4.png" />

몇 분 후 성공하면, 준비 상태가 표시될 것입니다.

방문 버튼을 클릭하세요. 배포된 샘플 콘텐츠 포털의 홈페이지가 나타날 것입니다.

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

## 배포 후 설정

기본 포털을 테스트하려면 Box 애플리케이션 구성 섹션에 CORS 도메인을 추가해야 합니다. 방문 버튼 아래에서 찾을 수 있습니다. 표준 페이지와 배포 URL을 모두 추가해야 합니다. 테스트 중에 배포 URL을 방문/사용할 계획이라면 둘 다 추가해주세요. URL 끝에 슬래시를 포함하지 마시고 쉼표로 구분해 주세요.

<img src="/assets/img/2024-06-20-BuildacontentportalusingBoxUIElementsReactTailwindCSSVercelPart1_5.png" />

URL을 추가한 후, 우측 상단의 저장 버튼을 클릭하세요.

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

## 기본 포털 테스트

기본으로 배포된 포털에는 내장된 인증이 없기 때문에 이메일 필드는 비워 둘 수 있습니다. 비밀번호 필드에는 Box 애플리케이션 구성 섹션에서 얻은 개발자 토큰을 붙여 넣을 수 있습니다.

"개발자 토큰 생성"을 클릭합니다. 토큰을 복사합니다.

토큰을 비밀번호 필드에 붙여 넣고 "로그인"을 클릭하세요.

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

로그인 후 아래 화면이 표시됩니다. '내 명세서' 헤더 옵션을 클릭해주세요.

모든 것이 예상대로 작동했다면, 업로드한 더미 명세서가 있는 명세서 폴더가 표시됩니다. 이 페이지는 콘텐츠 업로더 UI 요소를 사용하기 때문에 많은 기능을 수행할 수 있습니다! 명세서를 클릭해주세요.

명세서의 미리 보기가 나타납니다. 이제 오른쪽 상단의 로그아웃을 클릭해주세요.

홈페이지로 돌아가도록 초대받을 것입니다.

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

## 다음에 올 내용

이 포털 시리즈의 후속 블로그에서는 추가 페이지 추가, 인증 개선, Box AI 사용, 색상 사용자 정의 및 기타 기능 등 여러 가지 향상 사항을 살펴볼 예정입니다!

# 마무리

1부에서 확인한 것처럼, Box UI Elements 및 Box API를 사용하면 내부 또는 외부 사용자를 위한 사용자 정의 경험을 매우 쉽게 만들 수 있습니다.

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

다음 부분에서는 기본 포털을 추가 기능으로 확장하는 데 중점을 둘 것입니다.

그때까지, 즐거운 코딩하세요!

항상, Box 개발자 관련팀에 피드백이 있으면 개발자 포럼에 연락해주세요.
