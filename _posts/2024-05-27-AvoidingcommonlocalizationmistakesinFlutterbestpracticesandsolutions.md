---
title: "플러터에서 흔히 하는 로컬라이제이션 실수 방지하는 방법"
description: ""
coverImage: "/assets/img/2024-05-27-AvoidingcommonlocalizationmistakesinFlutterbestpracticesandsolutions_0.png"
date: 2024-05-27 19:19
ogImage: 
  url: /assets/img/2024-05-27-AvoidingcommonlocalizationmistakesinFlutterbestpracticesandsolutions_0.png
tag: Tech
originalTitle: "Avoiding common localization mistakes in Flutter: best practices and solutions"
link: "https://medium.com/@pomis172/avoiding-common-localization-mistakes-in-flutter-best-practices-and-solutions-eeba39fa91ac"
isUpdated: true
---



완벽한 로컬라이제이션을 달성하려면 번역만으로는 충분하지 않습니다. 언어적 뉘앙스와 지역적 선호도를 신중히 고려해야 합니다. 이 글에서는 Flutter 앱 로컬라이제이션 중에 생길 수 있는 일반적인 오류들과 그것들을 극복하기 위한 효과적인 전략을 탐구해보겠습니다.

## 1. 하나의 문장을 연결하여 다른 문자열 항목을 사용하는 것.

다음 문장을 예시로 들어보겠습니다:

강조된 부분은 다른 텍스트 스타일을 가지고 클릭할 수 있어야 합니다.

<div class="content-ad"></div>

많은 사람들이 종종 여러 항목으로 나누어서 TextSpan을 연결합니다. 이 해결책은 영어에는 작동하지만 앱의 다른 언어에도 적용될 수 있습니다. 그러나 문제는 문법 격조나 다른 단어 순서를 가진 언어와 작업할 때 발생합니다.

문제가 어디에서 발생하는지 분석해보겠습니다.

저는 +약관+과 +개인정보 처리방침+에 동의합니다.

에스토니아어로 동일한 문장을 작성하면 다음과 같이 됩니다:

<div class="content-ad"></div>

병적으로 이용약관 및 개인정보 보호 정책에 동의합니다

단어 순서는 똑같아. 괜찮잖아? 같은 이름의 화면 제목으로 이용약관 항목을 재사용하면 참 괜찮을 것 같지? 영어로 돌리면 완벽히 작동하지만, 에스토니아어로 하면 "약관과 함께"라는 의미가 나올거야. 인가로 끝나서 "약관" 대신 "약관과"라는 뜻이 날거야. 다른 문제는, 각각의 항목을 번역하면서 전체 문장의 맥락을 손실하기도 굉장히 쉬워. 그리고 띄어쓰기가 사라지는 것도 말이야.

일부 언어에서는 다른 단어 순서를 가질거야. 예를 들어, 독일어에서:

처음에 만든 솔루션이 이걸 지원하지 않아. 개인정보 보호 정책 단어 다음에 텍스트가 있는데 거기에 추가 텍스트 스팬을 더해야 돼. 머리가 아플 것 같아?

<div class="content-ad"></div>

솔루션: 태그된 로컬라이제이션 항목을 사용하세요. 예를 들어, styled_text 패키지를 사용하면 문자열에 사용자 정의 태그를 추가한 다음 코드에서 처리할 수 있습니다:

"agreeWithTerms": "나는 `a action=`OPEN_TC`` 약관 및 조건`/a`, `a action=`OPEN_PP ``개인정보 보호정책`/a`을 읽었으며 동의합니다"

이 문제 때문에 맷테오게코의 이 라이브러리 포크를 사용하는 것을 권장합니다. 더 나은 해결책을 아시는 경우 댓글로 알려주세요.

```js
dependencies: styled_text: git: ref: bd403bd6c7c7df422b8d13e14b995662818fd9a9;
url: //github.com/Maatteogekko/styled_text_package.git
https: path: styled_text;
```

<div class="content-ad"></div>

그리고 코드에 그겨되어 있을 것입니다:

```js
      StyledText(
        text: t.agreeWithTerms,
        style: Theme.of(context).textTheme.bodyMedium,
        tags: {
          'a': StyledTextActionTag(
            (String? text, Map<String?, String?> attrs) {
              final action = attrs['action'];
              switch (action) {
                case 'OPEN_TC':
                  _openTC();
                case 'OPEN_PP':
                  _openPP();
              }
            },
            style: Theme.of(context).textTheme.bodyMedium!.copyWith(
                color: Theme.of(context).primaryColor,
                decoration: TextDecoration.underline),
          )
        },
      )
```

그 결과는 다음과 같이 나옵니다:

<img src="/assets/img/2024-05-27-AvoidingcommonlocalizationmistakesinFlutterbestpracticesandsolutions_0.png" />

<div class="content-ad"></div>

## 2. 복수형 무시하거나 사용자 정의 로직을 적용하여 처리하기

예를 들어 다음과 같은 문장이 있다고 가정해 봅시다:

만약 사용자가 한 명뿐이라면, "1명의 사용자가 온라인 상태입니다."라고 표시해야 합니다. 그냥 코드에 조건을 추가하면 될 것 같지 않나요? (n==1)이면 다른 문자열을 사용하도록 하는 것이나, 더 간단하게 "N명의 사용자" 문자열을 사용하는 방법이 어떨까요? 이 방법은 영어의 경우에 완벽하게 작동할 것입니다.

하지만 러시아어를 보겠습니다:

<div class="content-ad"></div>

1명 온라인

2명 온라인

5명 온라인

21명 온라인

<div class="content-ad"></div>

아랍어는 더 복잡해요.

다행히도 복수화 표준이 있습니다. 유니코드 웹사이트에서 자세히 읽을 수 있어요. 또한 이 기사는 일부 인기 있는 언어에서 복수 범주가 어떻게 나타나는지 보여줍니다.

요약하자면, 앱에 있는 모든 언어에 대해 적절한 복수 범주를 제공해야 해요.

```js
"usersOnline": {
    "one": "$n명의 사용자가 온라인 상태입니다",
    "other": "$n명의 사용자가 온라인 상태입니다"
}
```

<div class="content-ad"></div>

```js
    "usersOnline": {
        "one": "$n 명의 사용자 온라인",
        "few": "$n 명의 사용자 온라인",
        "many": "$n 명의 사용자 온라인",
        "other": "$n 명의 사용자 온라인"
    }
```

나는 복수형을 구현하는 데 slang 패키지를 사용하고 있어:

```js
Text(t.usersOnline(n: 3)),
```

그 결과로 문법적으로 올바른 복수형을 얻게됩니다. POEditor와 같은 온라인 편집기도 이를 지원합니다.

<div class="content-ad"></div>

## 3. 날짜와 시간을 수동으로 형식 지정하고, 월의 이름과 요일의 이름을 하드코딩하기

그것은 매우 흔한 실수입니다. 서로 다른 지역에는 날짜 형식이 다릅니다. 요일을 줄이는 규칙도 다릅니다.

예를 들어 핀란드에서 시간과 분은 점으로 구분됩니다. 에스토니아에서는 요일을 1자로 표시합니다. 미국에서는 날짜에 월이 먼저 나온다는 점도 언급할 수 없겠네요. 이런 모든 것들을 고려하면서 날짜와 시간을 다룬다는 것은 상당히 어려운 일처럼 보입니다. 다행히도 모든 것이 다시 표준화되었습니다. intl 패키지를 사용해봅시다.

기본적으로 DateFormat은 앱에서 사용되는 로캘을 사용하지만 데모 목적을 위해 특정 로캘을 명시하여 출력을 확인할 수 있습니다. TimeOfDay는 컨텍스트에서 로캘을 가져옵니다.

<div class="content-ad"></div>

```js
final date = DateTime.now();
format(String locale) => "$locale: ${DateFormat.yMMMEd(locale).format(date)}";
print(format("en_US"));
print(format("en_GB"));
print(format("et_EE"));
print(format("fi_FI"));
print(format("ar_QA"));
print(TimeOfDay.now().format(context));
```

The output:

```js
flutter: en_US: Tue, May 21, 2024
flutter: en_GB: Tue, 21 May 2024
flutter: et_EE: T, 21. mai 2024
flutter: fi_FI: ti 21. toukok. 2024
flutter: ar_QA: الثلاثاء، ٢١ مايو ٢٠٢٤
flutter: 13:24
```

## 4. Concatenating currency and price strings

<div class="content-ad"></div>

어떤 국가에서는 천 단위 구분으로 콤마를 사용하는 반면, 다른 국가에서는 점을 사용합니다. 이런 작은 변화가 앱에 영향을 줄 수도 있어요.

```js
String formatCurrency(String currency, String amount) => currency + amount;
```

<div class="content-ad"></div>

지금은 intl 패키지를 사용하여 통화를 다루는 방법을 살펴보겠습니다:

```js
print(NumberFormat.simpleCurrency(locale: 'en_US', name: 'USD').format(199.99));
print(NumberFormat.simpleCurrency(locale: 'en_GB', name: 'GBP').format(199.99));
print(NumberFormat.simpleCurrency(locale: 'es_ES', name: 'EUR').format(199.99));
```

NumberFormat.simpleCurrency는 기본적으로 앱의 로캘을 사용합니다. 여기서는 데모를 위해 몇 가지 특정 로케일을 전달하고 있습니다. 결과는 다음과 같습니다:

```js
flutter: $199.99
flutter: £199.99
flutter: 199,99 €
```

<div class="content-ad"></div>

또한, 짧고 명확한 형식이 있습니다. 가장 일반적인 사용 사례는 판매 중인 상품 목록이나 쇼핑 카트에서 짧은 형식을 표시하는 것입니다. 그리고 명시적 형식은 체크아웃 중에 사용해야 합니다. 이에 대해 더 읽어 보려면 Shopify의 이 기사를 확인하세요.

이게 왜 중요할까요? 가렌다인 사용자가 앱을 열고 달러 기호가 있는 가격을 보는 상황을 상상해보세요. 사용자는 실제로 미국 달러가 아니라 캐나다 달러로 지불하고 있는지 확신하고 싶어할 것입니다. 이를 간단한 함수를 사용하여 수행할 수 있습니다:

```js
String explicitFormat(String currencyCode, String? locale, num amount) {
    final shortFormat = NumberFormat.simpleCurrency(locale: locale, name: currencyCode).format(amount);

    return "$shortFormat $currencyCode";
}
```

이 기사가 유익했기를 바랍니다.

<div class="content-ad"></div>

오른쪽에서 왼쪽으로 (RTL/LTR) 케이스와 서로 다른 측정 시스템을 다루지 않았어요. 별도의 기사를 쓸 가치가 있어요. 업데이트를 받으시려면 구독을 확인해주세요.

![이미지](/assets/img/2024-05-27-AvoidingcommonlocalizationmistakesinFlutterbestpracticesandsolutions_1.png)
