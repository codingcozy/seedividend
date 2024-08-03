---
title: "무케시 암바니의 돈을 써보자 단계별 가이드"
description: ""
coverImage: "/assets/no-image.jpg"
date: 2024-07-07 12:42
ogImage: 
  url: /assets/no-image.jpg
tag: Tech
originalTitle: "Spend Mukesh Ambani’s Money now! A Step-by-Step Guide"
link: "https://medium.com/@kartavyavg/spend-mukesh-ambanis-money-now-a-step-by-step-guide-34808cc2934d"
---


# 소개 🏹

이 튜토리얼에서는 "Spend Mukesh Ambani's Money"라는 재미있고 상호작용적인 웹 애플리케이션을 만들어 보겠습니다. 비슷한 프로젝트인 "Spend Bill Gates' Money"에서 영감을 받아 이 프로젝트는 사용자가 가상의 부자의 돈을 사치스러운 물품에 쓰는 시뮬레이션을 할 수 있게 해줍니다. 우리는 스타일링을 위해 Tailwind CSS를 사용하고, 물품을 구매하고 PDF 청구서를 생성하는 동적 기능을 위해 JavaScript를 활용할 것입니다.

이 튜토리얼은 Tailwind CSS와 JavaScript와 같은 현대적인 도구를 사용하여 프론트엔드 웹 개발을 탐험하려는 개발자, 학습자 및 기술 열정가를 대상으로 합니다. HTML, CSS 및 JavaScript의 기본 지식이 권장됩니다.

## 연습할 내용... 🏫

<div class="content-ad"></div>

- Tailwind CSS
- Javacript 와 HTML
- jsPDF 임베딩

# 사용된 기술

- Tailwind CSS: 커스텀 디자인을 빠르게 구축하기 위한 유틸리티 CSS 프레임워크.
- JavaScript: 동적 상호작용 및 로직 처리에 사용됩니다.
- jsPDF: 브라우저에서 PDF 문서를 생성하기 위한 JavaScript 라이브러리.

# 프로젝트 설정

<div class="content-ad"></div>

만들기 시작하려면 로컬 머신이나 선호하는 개발 플랫폼에 HTML, CSS, 그리고 JavaScript 환경을 기본적으로 이해해야 합니다. 스타일링을 위해 Tailwind CSS의 CDN을 사용하고 PDF 생성을 위해 jsPDF를 사용할 것입니다. 두 가지 모두 간편함을 위해 HTML 파일에 직접 포함되어 있습니다.

```js
<!-- Tailwind CSS CDN을 통한 포함 -->
<link href="https://cdn.tailwindcss.com" rel="stylesheet">
<!-- PDF 생성을 위한 jsPDF 라이브러리 포함 -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
```

# HTML 구조

프로젝트를 위한 기본 HTML 구조를 개요로 살펴봅시다.

<div class="content-ad"></div>

```js
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>무케쉬 암바니의 돈 써보기</title>
    <!-- Tailwind CSS 포함 -->
    <link href="https://cdn.tailwindcss.com" rel="stylesheet">
</head>
<body class="bg-gray-100 text-gray-900">
    <div class="container mx-auto p-8">
        <!-- 여기에 내용이 들어갑니다 -->
    </div>
```

```js
    <!-- 동적 기능을 위한 JavaScript -->
    <script>
        // JavaScript 코드를 여기에 추가할 예정입니다
    </script>
</body>
</html>
```

# Tailwind CSS로 스타일링하기

Tailwind CSS를 사용하면 사용자 지정 CSS를 작성하지 않고도 쉽게 애플리케이션을 스타일링할 수 있습니다. 레이아웃, 색상 및 반응성에 필요한 유틸리티 클래스를 활용할 것입니다.

<div class="content-ad"></div>

# 사용 예시:

```js
<div class="bg-white p-6 rounded-lg shadow-lg">
    <p class="text-2xl">Money Left: <span id="money-left">90,000,000,000</span> INR</p>
</div>
```

# 품목 데이터 구조

JavaScript 배열을 사용하여 이름, 가격 및 이미지 URL과 같은 속성을 가진 항목을 정의할 것입니다:

<div class="content-ad"></div>

```javascript
const items = [
    { name: '럭셔리 카', price: 10000000, image: 'https://example.com/luxury_car.jpg' },
    { name: '사설비행기', price: 1000000000, image: 'https://example.com/private_jet.jpg' },
    // 여기에 더 많은 아이템을 추가하세요
];

# 동적 항목 생성

JavaScript를 사용하여 항목 배열을 기반으로 각 항목에 대한 HTML을 동적으로 생성할 것입니다:

function loadItems() {
    const container = document.getElementById('items-container');
    items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'bg-white p-6 rounded-lg shadow-lg';

<div class="content-ad"></div>

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        img.className = 'w-full h-32 object-cover mb-4';
        const title = document.createElement('h2');
        title.className = 'text-xl font-bold mb-4';
        title.textContent = item.name;
        const price = document.createElement('p');
        price.className = 'mb-4';
        price.textContent = `가격: ${item.price.toLocaleString()} INR`;
        const button = document.createElement('button');
        button.className = 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700';
        button.textContent = '구매하기';
        button.onclick = () => buyItem(item.name, item.price);
        itemDiv.appendChild(img);
        itemDiv.appendChild(title);
        itemDiv.appendChild(price);
        itemDiv.appendChild(button);
        container.appendChild(itemDiv);
    });
}

# 구매 기능

buyItem 함수를 구현하여 품목 구매 및 UI를 동적으로 업데이트하십시오:

let moneyLeft = 90000000000;
let purchasedItems = [];

<div class="content-ad"></div>

기능 buyItem(item, price) {
    if (moneyLeft >= price) {
        moneyLeft -= price;
        document.getElementById('money-left').innerText = moneyLeft.toLocaleString() + ' INR';
        let existingItem = purchasedItems.find(i => i.name === item);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            purchasedItems.push({ name: item, price: price, quantity: 1 });
        }
        updatePurchasedCount();
    } else {
        alert('돈이 부족합니다!');
    }
}
기능 updatePurchasedCount() {
    const totalItems = purchasedItems.reduce((acc, curr) => acc + curr.quantity, 0);
    document.getElementById('items-purchased').innerText = totalItems;
}

# PDF 생성

jsPDF를 사용하여 PDF로 청구서 생성하는 방법:

javascriptCopy codeasync function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

<div class="content-ad"></div>

    doc.text("구매 물품 목록서", 10, 10);
    let yOffset = 20;
    purchasedItems.forEach(item => {
        doc.text(`${item.name} (x${item.quantity}): ${item.price * item.quantity} INR`, 10, yOffset);
        yOffset += 10;
    });
    doc.text(`총 지출 금액: ${90000000000 - moneyLeft} INR`, 10, yOffset + 10);
    doc.save('bill.pdf');
}

# 최종 HTML 파일

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spend Mukesh Ambani's Money</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
</head>
<body class="bg-gray-100 text-gray-900">
    <div class="container mx-auto p-8">
        <h1 class="text-4xl font-bold text-center mb-8">Spend <span class="font-bold text-cyan-400">Mukesh Ambani's</span> Money</h1>
        <div class="flex justify-center mb-8">
            <img src="https://img.etimg.com/thumb/width-1200,height-900,imgsize-63662,resizemode-75,msid-106707503/news/india/reliance-to-put-serious-money-in-gujarat-mukesh-ambani.jpg" alt="Mukesh Ambani" class="h-40 rounded-xl">
        </div>
        <div class="flex justify-center mb-8">
            <div class="bg-white p-6 rounded-lg shadow-lg">
                <p class="text-2xl text-cyan-400 font-bold">Mukesh Ambani의 돈: <span id="money-left">90,000,000,000</span> INR</p>
                <p class="text-xl mt-4 text-center">구매 항목: <span id="items-purchased" class="font-semibold text-cyan-500">0</span></p>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="items-container">
            <!-- Items will be dynamically generated here -->
        </div>
        <div class="flex justify-center mt-8">
            <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700" onclick="generatePDF()">영수증 다운로드</button>
        </div>
    </div>

    <script>
        let moneyLeft = 90000000000;
        let purchasedItems = [];

        const items = [
            // Item들 목록
        ];

        function loadItems() {
            // Item 로드 함수
        }

        function buyItem(item, price) {
            // 물품 구매 함수
        }

        function updatePurchasedCount() {
            // 구매한 품목 수 업데이트 함수
        }

        async function generatePDF() {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            doc.text("구매 물품 목록서", 10, 10);
            let yOffset = 20;
            purchasedItems.forEach(item => {
                doc.text(`${item.name} (x${item.quantity}): ${item.price * item.quantity} INR`, 10, yOffset);
                yOffset += 10;
            });
            doc.text(`총 지출 금액: ${90000000000 - moneyLeft} INR`, 10, yOffset + 10);

            doc.save('bill.pdf');
        }

        window.onload = loadItems;
    </script>

    <h1 class="text-2xl hover:text-3xl text-center bg-slate-200 p-3">제작자 - <span class="font-bold text-cyan-400 animate-pulse">Kartavya Vg</span></h1>
</body>
</html>

# 결론

<div class="content-ad"></div>

이 튜토리얼에서는 Tailwind CSS로 스타일을 지정하고 JavaScript로 동적 기능을 구현하여 "Spend Mukesh Ambani's Money"를 만드는 과정을 다루었습니다. 상품 구매, 빌링을 위한 PDF 생성, 그리고 동적 UI 업데이트를 구현했습니다. 이 프로젝트는 현대적인 도구를 사용한 프론트엔드 웹 개발에 대한 훌륭한 소개 역할을 합니다.

# 다음 단계

- Tailwind CSS를 사용하여 UI 요소를 사용자 정의하는 방법 실험해 보기.
- 항목과 기능을 추가하여 프로젝트 확장하기.
- 더 나은 기능을 위해 다른 JavaScript 라이브러리 탐색하기.

# 프로젝트 보기

<div class="content-ad"></div>

프로젝트를 보려면 여기를 클릭해주세요 — [https://codepen.io/Kartavya_Vg/full/rNEBXJp](https://codepen.io/Kartavya_Vg/full/rNEBXJp)

# 리소스 및 참고 자료

- Tailwind CSS 문서
- jsPDF 문서

이 초안을 원하는 대로 사용자 정의하고 확장하십시오. “무케시 아만니의 돈을 쓰는” 게임에 대한 설명적이고 매력적인 글에 필요한 추가 세부 정보와 스타일을 포함할 수 있습니다. 이 구조는 정보 전달과 독자의 흥미를 끌기 위한 훌륭한 기반을 제공해야 합니다.

<div class="content-ad"></div>

# 숙제

- 더 많은 항목 추가하기
- 다운로드 가능한 PDF 스타일링하기
- 항목 카드에 CRUD 작업 수행하기