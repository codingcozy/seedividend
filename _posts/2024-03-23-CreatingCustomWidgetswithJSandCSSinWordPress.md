---
title: "워드프레스에서 JS와 CSS를 사용하여 사용자 커스텀 위젯 만들기"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Creating Custom Widgets with JS and CSS in WordPress"
link: "https://volodymyrzh.medium.com/creating-custom-widgets-with-js-and-css-in-wordpress-50aa5bf43817"
isUpdated: true
---

![Creating-Custom-Widgets-with-JS-and-CSS-in-WordPress_0.png](/assets/img/Creating-Custom-Widgets-with-JS-and-CSS-in-WordPress_0.png)

WordPress에서 위젯은 사이드바, 풋터 및 기타 위젯 사용 가능한 영역에 다양한 기능과 기능을 추가하는 데 사용되는 중요한 요소입니다. 그러나 기본 위젯 세트는 항상 웹 사이트의 고유한 요구 사항이나 비전을 충족시키지 못할 수 있습니다. 이것이 사용자 정의 위젯이 필요한 이유이며, 웹 사이트의 사용자 경험을 향상시키는 특수한 기능과 스타일을 만들 수 있게 해줍니다. 이 기사에서는 JavaScript(JS)와 Cascading Style Sheets(CSS)를 사용하여 WordPress에서 사용자 정의 위젯을 개발하는 과정을 안내합니다.

# WordPress에서 위젯 이해하기

WordPress의 위젯은 최신 게시물 표시, 검색 막대 또는 사용자 정의 메뉴와 같은 특정 기능을 수행하는 모듈식 블록입니다. 워드프레스 대시 보드를 통해 테마 코드를 수정할 필요 없이 사이트의 지정된 영역에 손쉽게 배치할 수 있도록 설계되었습니다.

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

HTML 태그에 대한 자세한 안내 https://medium.com/@volodymyrzh/html-tags-a-comprehensive-guide-9c00427861b8 을 읽어보세요.

# 단계 1: 위젯 계획하기

코드 작성에 들어가기 전에 사용자 정의 위젯의 기능과 디자인을 확인하세요. 위젯이 무엇을 할지, 어떻게 보이며, 사이트의 어디에 사용될지 결정하세요. 소셜 미디어 피드, 맞춤형 연락처 양식, 또는 상호작용 맵 등이 될 수 있지만 명확한 계획은 개발 프로세스를 간소화할 것입니다.

# 단계 2: 위젯 클래스 생성

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

워드프레스 위젯은 WP_Widget 클래스를 확장하는 PHP 클래스입니다. 테마 또는 플러그인 디렉토리에 새 PHP 파일을 만들고 WP_Widget를 확장하는 클래스를 정의하여 시작하세요.

# 위젯 클래스 예시

```js
class My_Custom_Widget extends WP_Widget {

  public function __construct() {
    parent::__construct(
      'my_custom_widget', // 기본 ID
      '내 맞춤 위젯', // 이름
      array( 'description' => __( '위젯에 대한 설명.', 'text_domain' ), ) // 인수
    );
  }

  public function widget( $args, $instance ) {
    echo $args['before_widget'];
    // 여기에 위젯 콘텐츠 삽입
    echo $args['after_widget'];
  }

  public function form( $instance ) {
    // 위젯 설정을 위한 폼 필드가 여기에 들어갑니다
  }

  public function update( $new_instance, $old_instance ) {
    // 저장될 위젯 옵션을 처리합니다
  }
}
```

# 단계 3: 위젯 등록 및 로드

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

WordPress에 새 위젯을 알리려면 widgets_init 액션 훅을 사용하여 해당 위젯을 등록해야 합니다.

# 위젯 등록

```js
function register_my_custom_widget() {
  register_widget("My_Custom_Widget");
}
add_action("widgets_init", "register_my_custom_widget");
```

# 단계 4: 사용자 정의 스타일 및 스크립트 추가

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

지금 CSS와 JS를 사용하여 위젯에 스타일과 기능을 추가하세요. 필요한 위치에 로드되도록 WordPress에 스크립트와 스타일을 올바르게 enqueue하세요.

# 스타일 및 스크립트 enqueue하기

```js
function enqueue_custom_widget_scripts() {
    wp_enqueue_style( 'my-custom-widget-style', get_template_directory_uri() . '/css/custom-widget-style.css' );
    wp_enqueue_script( 'my-custom-widget-script', get_template_directory_uri() . '/js/custom-widget-script.js', array( 'jquery' ), false, true );
}
add_action( 'wp_enqueue_scripts', 'enqueue_custom_widget_scripts' );
```

# 단계 5: JS 및 CSS 구현하기

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

귀하의 스크립트와 스타일이 큐에 들어 있으므로, 이제 위젯을 독특하게 만드는 구체적인 기능과 디자인 요소를 구현할 수 있습니다.

# 사용자 정의 위젯 스타일 (CSS)

```js
.my-custom-widget {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
```

# 사용자 정의 위젯 기능 (JS)

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
jQuery(document).ready(function ($) {
  // 위젯에 상호 작용 요소 또는 애니메이션 추가하기
});
```

# WordPress 사이트에 편리한 호스팅

WordPress 사이트를 위한 좋은 호스팅을 찾고 계신가요? Host4Biz에 주목해보세요. 유럽에 현대적인 서버와 우크라이나 팀을 갖춘 신뢰할 수 있는 호스팅입니다.

그리고 첫 결제 시 MYHOST10 프로모션 코드를 사용하시면 10% 할인 혜택을 받을 수 있습니다. 이를 위해 여기서 등록하고 결제 전에 코드를 입력해주세요.

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

워드프레스 호스팅의 또 다른 좋은 옵션은 Hostinger입니다. 링크 https://hostinger.com.ua?REFERRALCODE=1VOLODYMYR55를 통해 계정을 등록하고 내 블로그의 업데이트를 확인해보세요

# 결론

워드프레스에서 사용자 정의 위젯을 만드는 것은 사이트의 기능과 외관을 특정한 요구사항과 브랜딩에 맞게 조정할 수 있게 합니다. PHP를 활용하여 위젯 구조를, CSS를 스타일링을, 그리고 JavaScript를 추가 상호작용 기능을 위해 활용하여 사이트 사용자 경험을 향상시킬 수 있는 독특한 위젯을 개발할 수 있습니다. 사용자 정의 위젯이 최적으로 작동하고 사이트와 원활하게 통합될 수 있도록 스크립트와 스타일을 enqueuing하는 데 워드프레스 표준을 준수하는 것을 기억해주세요.

참고: 위에서 제공된 링크에 제휴 링크가 포함되어 있으며 무언가를 구매하면 별도 비용 없이 커미션을 받게 됩니다.
