---
title: "플러터에서 개별 회원 가입 경로를 두면 안되는 이유"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Never have separate sign-in routes"
link: "https://medium.com/@alexey.inkin/never-have-separate-sign-in-routes-7c9a6dd4dc7c"
isUpdated: true
---

웹 앱에서 인증을 위해 화면을 보호하는 두 가지 옵션이 있습니다:

- 사용자가 인증되지 않은 경우 /sign-in 경로로 리디렉션합니다:

![Authentication Option 1](/assets/img/Neverhaveseparatesign-inroutes_0.png)

2. 사용자가 인증되지 않은 경우, 해당 페이지의 URL에 로그인 폼을 표시하고 리디렉션을 하지 않으며 별도의 경로를 사용하지 않습니다:

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

<img src="/assets/img/Neverhaveseparatesign-inroutes_1.png" />

이전 방식은 초기 웹에서 사용되었던 방식이었습니다. 당시 페이지들은 불변했고, 폼이 있는 페이지와 다른 콘텐츠를 구분하기 위해 별도의 페이지 URL을 가지는 것이 자연스럽게 느껴졌습니다.

이러한 리다이렉트를 설정하려면, 인증 확인 없이 페이지를 만들고 해당 확인을 어떤 가드(guards)에 빼내어 라우팅 단계에서 호출하면 되요. 이 가드는 사용자가 인증되었을 때만 해당 대상 페이지를 표시해야 함을 확인합니다.

# /sign-in 경로의 문제점

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

## 1. 의미가 없는 페이지

일반적으로 사람들이 즐겨찾기하고 다시 방문하며 공유하고 싶어하는 페이지는 URL이 있어야 합니다. 누가 /sign-in URL을 공유하고 싶어할까요?

## 2. 되돌아가는 필요성

사용자가 인증되고 나면, 사용자가 원하는 페이지로 다시 이동해야 합니다. 이는 즉, 해당 URL이 ?back=/profile 형식으로 로그인 페이지로 전달되어야 한다는 것입니다.

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

이렇게 하면 관리가 많아지고 잘못된 또는 누락된 백 URL이 많아질 수 있어요.

그리고 주소 표시줄에서 보기가 그저 어수선해 보여요.

## 3. 브라우저 히스토리에 기록

만약 사용자가 /profile 링크를 클릭하여 /sign-in 페이지로 리디렉션됐다가 다시 /profile 페이지로 돌아왔다면, 이는 브라우저 히스토리에 세 개의 항목으로 남겨집니다.

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

"뒤로' 버튼을 클릭하면 프로필 링크를 클릭한 페이지로 되돌아가기를 기대합니다. 그러나 인증된 상태이기 때문에 다시 /sign-in?... 로 돌아가서 다시 /profile 로 리디렉션됩니다.

2000년대 초에 사용자들은 '뒤로' 버튼을 두 번 클릭하여 악성 로그인 리디렉트를 피하기를 배웠지만, 우리가 사람들이 개발할 수 있는 유용한 습관은 아닙니다.

## 4. 여전히 익명으로 본 라우트 케이스

현대의 웹 앱에서는 메모리에 프론트엔드의 페이지 스택이 있습니다. 다음과 같은 스택이 있을 수 있습니다:"

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

프로필 페이지에서 프로필 수정 페이지로 이동 중입니다.

유저가 세션 타임아웃으로 인해 로그아웃되었다고 가정해 봅시다.

/sign-in 으로 리디렉션할 수 있지만, 이전에 방문한 /profile 페이지는 스택 안에 남아 있습니다. 해당 페이지는 비활성 상태이므로 재구성되지는 않지만, 여전히 일부 상태를 유지하고 지연 코드를 실행할 수 있으며, 전면 페이지가 팝될 때 표시될 수 있습니다. 어쨌든 위젯은 언제든지 재구성이 임의로 발생할 수 있도록 설계되어야 합니다.

인증이 필요한 모든 페이지를 팝하는 가드를 설정할 수 있지만, 이는 사용자 경험에 해를 줄 수 있습니다. 다시 로그인하면 페이지 스택이 손실될 수 있습니다.

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

그래서 인증 체크를 추출하기 위해 액세스 가드를 설정했다고 해도 페이지에서 완전히 해당 체크를 제거할 수는 없어요.

# 페이지 내 로그인 양식 설정

그래서 전용 로그인 URL을 가져선 안 돼요. 대신, 인증이 필요한 모든 URL에서 로그인 양식을 표시하세요.

설정 방법은 사용하는 프레임워크에 따라 다릅니다.

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

백엔드 앱에서는 실제 HTTP 리디렉트를 발생시키지 않고 요청을 내부적으로 다른 핸들러로 라우팅하는 경우가 일반적입니다.

플러터 앱에서는 보통 다음과 같은 작업을 수행합니다:

- 앱에서 인증 상태에 대한 진실의 원천인 블록 또는 기타 비즈니스 로직 객체를 설정합니다.
- 인증된 경우와 비인증된 경우를 위한 두 개의 빌더가 있는 AuthenticatedOrNotWidget을 만듭니다. 이 위젯은 인증 블록을 수신하고 인증 데이터가 변경되면 다시 빌드됩니다. 사용자가 로그아웃되면 스택의 각 화면의 비인증된 빌더가 대체됩니다. 사용자가 다시 로그인하면 인증된 빌더가 다시 호출됩니다. 이 위젯은 사용자 프로필에 변경 사항이 있는 경우 자동으로 다시 빌드됩니다.
- 화면이 블록이나 변경 알림으로 지원되는 경우, 그들이 인증을 인식하는 수퍼 클래스를 상속하도록 만들고 인증이 정상이면 비즈니스 메서드만 호출하도록합니다. 이 아키텍처는 앱별로 다릅니다.

저의 프로젝트 중 하나의 위젯은 다음과 같습니다:

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

그리고 여기 첫 번째 위젯 위에 더 편리한 위젯이 있는데 목표 페이지에 대한 빌더만 있습니다:
