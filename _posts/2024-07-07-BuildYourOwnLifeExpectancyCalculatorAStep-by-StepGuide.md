---
title: "쉽게 따라 하는 나만의 예상 수명 계산기 만들기 단계별 가이드"
description: ""
coverImage: "/assets/img/2024-07-07-BuildYourOwnLifeExpectancyCalculatorAStep-by-StepGuide_0.png"
date: 2024-07-07 02:15
ogImage:
  url: /assets/img/2024-07-07-BuildYourOwnLifeExpectancyCalculatorAStep-by-StepGuide_0.png
tag: Tech
originalTitle: "Build Your Own Life Expectancy Calculator: A Step-by-Step Guide!"
link: "https://medium.com/@kartavyavg/build-your-own-life-expectancy-calculator-a-step-by-step-guide-81e621ad1fe5"
isUpdated: true
---

# 소개 🏹

이 튜토리얼에서는 기본 기술을 사용하여 완전히 스타일이 적용된 반응형 수명 계산기를 만드는 방법을 배웁니다. 이 기사의 끝에서는 간단하지만 복잡한 프로젝트를 만드는 방법을 익힐 수 있을 것입니다.

## 이 프로젝트의 특징 🪶

- 이 프로젝트는 반응형 양식에서 요구된 다양한 라이프스타일 요소를 기반으로 개인의 추정 수명을 계산합니다.
- 이 프로젝트는 또한 수명을 늘리기 위한 개인 맞춤 제안을 제공합니다.

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

## 사용된 기술 ⚙️

- Tailwind CSS: 반응형 스타일링을 위해 사용됨 (PlayCDN)
- HTML 5: 프론트엔드 인프라를 위해 사용됨
- JavaScript: 기능 및 출력을 위해 사용됨

# 프로젝트 개요 📽️

이 계산기는 사용자의 나이, 성별, 흡연 습관, 운동 빈도, 식습관, 스트레스 수준, 음주량, 수면 패턴 및 정기적인 건강 검진과 같은 입력을 받습니다. 이러한 입력은 JavaScript 로직을 사용하여 산출되는 예상 수명에 영향을 줍니다. 프로젝트는 현대적이고 반응 형 디자인을 보장하기 위해 Tailwind CSS로 스타일이 적용되었습니다.

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

## 주요 구성 요소

- HTML Form: 다양한 입력 필드 및 드롭다운을 통해 사용자 데이터를 수집합니다.
- JavaScript Logic: 입력 데이터를 처리하여 예상 수명을 계산하고 개인 맞춤형 건강 향상 제안을 생성합니다.
- Tailwind CSS: 사용자 경험을 향상시키기 위해 반응 형과 매력적인 스타일링을 제공합니다.

# 코드베이스 설정하기 🧑🏻‍💻

프로젝트를 만들기 위해 코딩 환경을 설정해야 합니다. 다음과 같은 단계를 진행하시면 됩니다 —

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

- 원하는 위치에 PC에 폴더를 만들어주세요.
- index.html이라는 HTML 파일을 생성해주세요.
- life-expectency.js라는 Js 파일을 생성해주세요.

# Tailwind CSS를 연결해보세요! 🪗

이전에 TailwindCSS PlayCDN을 연결하는 방법을 보여드렸는데, 여기에서도 보여드릴게요! 아래 CSS 파일을 index.html에 추가해주세요 —

```js
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
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

# 최종 HTML 코드

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>수명 예측 계산기</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-100 text-gray-900">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-3xl font-bold text-center mb-8">수명 예측 계산기</h1>
        <div class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
            <form id="life-expectancy-form" class="space-y-6">
                <div>
                    <label for="age" class="block text-sm font-medium">나이:</label>
                    <input type="number" id="age" name="age" required class="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500">
                </div>

                <div>
                    <label for="gender" class="block text-sm font-medium">성별:</label>
                    <select id="gender" name="gender" required class="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500">
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                    </select>
                </div>

                <div>
                    <label for="smoking" class="block text-sm font-medium">담배를 피우시나요?</label>
                    <select id="smoking" name="smoking" required class="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500">
                        <option value="yes">예</option>
                        <option value="no">아니요</option>
                    </select>
                </div>

                <div>
                    <label for="exercise" class="block text-sm font-medium">정기적으로 운동을 하시나요?</label>
                    <select id="exercise" name="exercise" required class="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500">
                        <option value="yes">예</option>
                        <option value="no">아니요</option>
                    </select>
                </div>

                <div>
                    <label for="diet" class="block text-sm font-medium">균형 잡힌 식습관을 가지고 계시나요?</label>
                    <select id="diet" name="diet" required class="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500">
                        <option value="yes">예</option>
                        <option value="no">아니요</option>
                    </select>
                </div>

                <div>
                    <label for="stress" class="block text-sm font-medium">스트레스가 높게 나타나시나요?</label>
                    <select id="stress" name="stress" required class="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500">
                        <option value="yes">예</option>
                        <option value="no">아니요</option>
                    </select>
                </div>

                <div>
                    <label for="alcohol" class="block text-sm font-medium">주류를 소비하시나요?</label>
                    <select id="alcohol" name="alcohol" required class="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500">
                        <option value="yes">예</option>
                        <option value="no">아니요</option>
                    </select>
                </div>

                <div>
                    <label for="sleep" class="block text-sm font-medium">매일 7-8시간의 수면을 취하시나요?</label>
                    <select id="sleep" name="sleep" required class="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500">
                        <option value="yes">예</option>
                        <option value="no">아니요</option>
                    </select>
                </div>

                <div>
                    <label for="checkups" class="block text-sm font-medium">정기적인 건강 검진을 받으시나요?</label>
                    <select id="checkups" name="checkups" required class="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500">
                        <option value="yes">예</option>
                        <option value="no">아니요</option>
                    </select>
                </div>

                <button type="button" onclick="calculateLifeExpectancy()" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">계산하기</button>
            </form>

            <h2 id="result" class="text-xl font-semibold mt-8 text-center"></h2>
            <div id="suggestions" class="mt-4"></div>
        </div>
    </div>

    <script src="life-expectancy.js"></script>
</body>
</html>
```

# 최종 JS 코드

```js
// life-expectancy.js

function calculateLifeExpectancy() {
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const smoking = document.getElementById('smoking').value;
    const exercise = document.getElementById('exercise').value;
    const diet = document.getElementById('diet').value;
    const stress = document.getElementById('stress').value;
    const alcohol = document.getElementById('alcohol').value;
    const sleep = document.getElementById('sleep').value;
    const checkups = document.getElementById('checkups').value;

    let baseLifeExpectancy = 75; // 평균 수명

    // 성별에 따라 수명 조정
    if (gender === 'female') {
        baseLifeExpectancy += 5; // 여성은 일반적으로 더 오래 삽니다.
    }

    // 생활 습관에 따라 수명 조정
    if (smoking === 'yes') {
        baseLifeExpectancy -= 10;
    }

    if (exercise === 'yes') {
        baseLifeExpectancy += 5;
    }

    if (diet === 'no') {
        baseLifeExpectancy -= 5;
    }

    if (stress === 'yes') {
        baseLifeExpectancy -= 5;
    }

    if (alcohol === 'yes') {
        baseLifeExpectancy -= 3;
    }

    if (sleep === 'no') {
        baseLifeExpectancy -= 3;
    }

    if (checkups === 'no') {
        baseLifeExpectancy -= 2;
    }

    // 최종 수명 계산
    const lifeExpectancy = baseLifeExpectancy - age;

    // 결과 표시
    document.getElementById('result').textContent = `예상 수명은 ${lifeExpectancy}세입니다.`;

    // 수명 증가를 위한 제안 사항 제공
    const suggestions = [];

    if (smoking === 'yes') {
        suggestions.push('수명을 늘리기 위해 흡연을 그만두는 것을 고려해보세요.');
    }

    if (exercise === 'no') {
        suggestions.push('정기적인 운동은 건강을 개선하고 수명을 늘릴 수 있습니다.');
    }

    if (diet === 'no') {
        suggestions.push('균형 잡힌 식습관을 가진다면 전반적인 건강과 장수를 늘릴 수 있습니다.');
    }

    if (stress === 'yes') {
        suggestions.push('의식하거나 이완 기법을 통해 스트레스를 관리하면 건강이 좋아집니다.');
    }

    if (alcohol === 'yes') {
        suggestions.push('주량을 줄이면 건강이 좋아지고 수명이 늘어날 수 있습니다.');
    }

    if (sleep === 'no') {
        suggestions.push('매일 7-8시간의 수면을 취하는 것은 건강과 장수를 늘리는 데 도움이 됩니다.');
    }

    if (checkups === 'no') {
        suggestions.push('정기적인 건강 검진을 받으면 건강 문제를 일찍 발견할 수 있고 수명이 늘어납니다.');
    }

    if (suggestions.length >

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

# 최종 결과

![이미지](/assets/img/2024-07-07-BuildYourOwnLifeExpectancyCalculatorAStep-by-StepGuide_0.png)

# 결론 💁🏻‍♂️

이 안내를 따라가면 수명을 예상할 뿐만 아니라 더 건강한 삶을 살도록 장려하는 완전히 기능적인 수명 계산기를 갖게 될 것입니다. 이 프로젝트는 다른 사람에게 혜택을 줄 수 있는 유용한 도구를 만들면서 웹 개발 기술을 연마할 수 있는 좋은 방법입니다.
```
