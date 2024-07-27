---
title: "Nodejs를 사용하여 지출 추적기를 만드는 방법"
description: ""
coverImage: "/assets/img/2024-05-15-AnapproachtobuildanExpenseTrackerusingNodejs_0.png"
date: 2024-05-15 10:08
ogImage: 
  url: /assets/img/2024-05-15-AnapproachtobuildanExpenseTrackerusingNodejs_0.png
tag: Tech
originalTitle: "An approach to build an Expense Tracker using Node.js"
link: "https://medium.com/@mansimjtandel/an-approach-to-build-an-expense-tracker-using-node-js-a98a4d32d9d4"
---


<img src="/assets/img/2024-05-15-AnapproachtobuildanExpenseTrackerusingNodejs_0.png" />

- 소개:

Node.js를 배우면서 Node.js를 사용하여 지출 추적 애플리케이션을 만들었습니다. 이 포괄적인 가이드에서는 Node.js를 사용하여 처음부터 직접 지출 추적 앱을 구축하는 과정을 안내하겠습니다. 먼저 개발 환경을 설정하고 프로젝트 구조를 초기화하는 것부터 시작하여 지출 모델을 만들고 지출을 관리하기 위한 CRUD 작업을 구현하는 방법을 살펴볼 것입니다. CLI(명령줄 인터페이스)를 구축하여 사용자 상호 작용을 처리하고 파일 I/O 작업을 사용하여 데이터 지속성을 다루는 방법을 배울 수 있습니다.

2. 개발 환경 설정 및 종속성 설치:



Node.js 앱을 초기 설정할 때는 'npm init' 명령어를 사용하고 'yargs'와 'chalk' npm 패키지를 설치하세요.

3. 명령줄 인터페이스 구축:

'yargs.command()'를 사용하여 add-expense, list, search, remove, total, highest 및 average와 같은 다양한 명령어를 정의하세요. 각 명령어는 개별적인 기능을 제공합니다. 예를 들어, add-expense 명령은 제목, 카테고리 및 금액을 사용하여 비용을 추가합니다. 모든 명령어를 정의한 후에는 yargs.parse() 메서드를 호출하여 명령줄 인수를 구문 분석하고 해당 명령어 핸들러를 실행합니다. 각 명령어는 명령어가 호출될 때 실행될 핸들러 함수를 지정합니다. 이러한 핸들러 함수는 expenses.js 모듈에 정의된 해당 함수를 호출하는 역할을 합니다.

```js
yargs.command({
    command: 'add-expense',
    describe: '새 비용 추가',
    builder : {
        title: {
            describe: '비용 설명/제목',
            demandOption: true,
            type: 'string'
        },
        category: {
            describe: '비용 카테고리',
            demandOption: true,
            type: 'string'
         },
        amount: {
            describe: '비용 금액',
            demandOption: true,
            type: 'number'  
        }
    },
    handler(argv){
        expenses.addExpense(argv.title, argv.category, argv.amount)
    }
})
```



위의 코드는 add-expense 명령을 정의하는데, 이 명령은 제목, 카테고리 및 금액을 추가해야 합니다. 이 인수들은 핸들러 함수를 통해 addExpense 함수로 전달되며, add-expense 명령을 호출할 때마다 실행됩니다. 비슷하게, 나는 목록, 검색, 제거, 총합, 최고값, 평균과 같은 다양한 명령들을 생성했습니다.

4. 지출 관리 작업 (expenses.js)

지출 추적기 CLI가 견고하고 신뢰할 수 있도록 하기 위해, 파일 입출력 작업을 이용한 데이터 영속성을 구현할 것입니다. 지출 데이터를 로컬에 저장할 JSON 파일을 만들어, 사용자들이 세션 간에 지출 내역에 접근할 수 있도록 합니다.

A) add-expense: 이 함수는 CLI를 통해 제목, 카테고리 및 금액을 받아와서, 제목이 중복되지 않는 경우 JSON 파일에 추가합니다. 파일 입출력 작업을 사용합니다.



```js
const addExpense = (title, category, amount) => {
    const current_exp = loadExpenses();
    const duplicateExpense = current_exp.find((exp) => exp.title === title);
    if (!duplicateExpense) {
        current_exp.push({
            title: title,
            category: category,
            amount: amount
        });
        saveExpenses(current_exp);
        console.log(chalk.green.inverse('새 경비가 성공적으로 추가되었습니다!'));
    } else {
        console.log(chalk.red.inverse('경비 제목이 이미 추가되었습니다! 다른 지출을 시도해보세요'));
    }
}
```

B) list: listExpenses 기능은 JSON 파일에 저장된 모든 경비를 검색하고 형식에 맞게 표시합니다.

```js
const listExpenses = () => {
    const expenses = loadExpenses();
    console.log(chalk.blue.underline.bold('귀하의 지출 내역은 다음과 같습니다:'));
    expenses.forEach((exp, idx) => {
        console.log(`${idx + 1}. 제목: ${exp.title}, 카테고리: ${exp.category}, 금액: ${exp.amount}`);
    });
}
```

C) search: searchExpenses 기능은 CLI를 통해 카테고리를 입력받고 해당 카테고리에 속한 모든 지출을 나열합니다.




```js
const searchExpenses = (category) => {
    const expenses = loadExpenses();
    const curr_categoryexp = expenses.filter(exp => exp.category === category);
    if (curr_categoryexp.length>0) {
        console.log(chalk.blue.underline.bold(`Expenses by ${category} are:`));
         curr_categoryexp.forEach((exp,idx)=>{
            console.log(`${idx+1}. Under ${exp.category} category we have expense titled ${exp.title} for amount ${exp.amount}`)
    })
    } else {
        console.log(chalk.red.inverse(`No category named ${category} found`))
    }
}
```

D) remove: The removeExpenses function takes in a title via command line and removes that expense.

```js
const removeExpense = (title) => {
    const expenses = loadExpenses()
    const expensesToKeep = expenses.filter((exp) => exp.title !== title)
    if (expenses.length > expensesToKeep.length) {
        //console.log(expensesToKeep.length, expenses.length)
        console.log(chalk.greenBright.inverse('Expense Removed!'))
        saveExpenses(expensesToKeep)
    } else {
        console.log(chalk.redBright.inverse(`Expense titled ${title} not found!`))
    }
}
```

E) total: The calculateTotalExpenses function calculates the total amount spent
```js
const calculateTotalExpenses = () => {
    const expenses = loadExpenses();
    let total = 0;
    expenses.forEach(exp => {
        total += exp.amount;
    });
    console.log(chalk.yellow.bold(`Total amount spent is: ${total}`));
}
```



```js
const calculateTotalExpenses = () => {
    const expenses = loadExpenses();
    const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    console.log(chalk.cyan.bold(`총 비용: ${total}`));
}
```

F) highest: getHighestExpensePerCategory 함수는 각 카테고리별로 소비된 최고 금액을 계산하고 표시합니다.

```js
const getHighestExpensePerCategory = () => {
    const expenses = loadExpenses();
    const highest = {};
    expenses.forEach(exp => {
        if (!highest[exp.category] || exp.amount > highest[exp.category]){
            highest[exp.category] = exp.amount;
        }
    });
    console.log(chalk.yellowBright.underline('카테고리별 최고 지출:'));
    for (const [category, amount] of Object.entries(highest)){
        console.log(`${category}: ${amount.toFixed(3)}`);
    }
}
```

G) average: getAverageExpenseByCategory 함수는 각 카테고리별로 평균 비용을 계산합니다.




```js
const getAverageExpenseByCategory = () => {
    const expenses = loadExpenses();
    const categories = {} // category: {total,count}
    expenses.forEach(exp => {
        if(categories[exp.category]){
            categories[exp.category].total += exp.amount;
            categories[exp.category].count += 1;

        }   else{  // for new expense
            categories[exp.category] = {
                total: exp.amount,
                count: 1
            }
        }
    })
    console.log(chalk.yellow.underline('Average Expense by category:'))
    for (const [category, data] of Object.entries(categories)) {
        const average = data.total / data.count;
        console.log(`${category} : ${average.toFixed(3)}`)
    }
}
```

5. 파일 입출력 작동 방식:

saveExpense() 함수가 호출될 때마다, 지출 객체를 JSON 문자열로 변환하고 이를 expenselist.json 파일에 저장합니다. JSON 문자열을 JavaScript 객체로 다시 변환하려면, 파일을 동기적으로 읽고 데이터를 문자열로 변환한 뒤, 배열 객체로 변환하기 위해 파싱해야 합니다.

```js
// 지출 객체를 JSON 문자열로 변환
const saveExpenses = (expense) => {
    const dataJSON = JSON.stringify(expense)
    fs.writeFileSync('expenselist.json', dataJSON)
}
```



파일 작업에 대해 더 알아보려면 https://nodejs.org/api/fs.html을 방문해보세요.

6. addExpense() 함수의 Flow Diagram:

![Flow Diagram](/assets/img/2024-05-15-AnapproachtobuildanExpenseTrackerusingNodejs_1.png)

위 다이어그램은 addExpense() 함수의 로직이 어떻게 작동하는지 이해하는 데 도움이 됩니다. 마찬가지로, 다른 함수들에 대한 다이어그램을 만들 수도 있습니다.



7. 사용자 인터페이스, 명령 구문 분석기 및 백엔드 서버 간의 흐름

응용 프로그램을 구축할 때 클라이언트 측과 서버 측 간의 통신이 어떻게 이루어지는지 이해하는 것이 중요합니다. UI와 백엔드 서버가 어떻게 연결되는지 이해하고자 아래에 명령 처리 방식을 보여주는 다이어그램을 만들었습니다.

- 흐름 및 명령은 사용자 인터페이스에서 시작되어 사용자가 입력을 제공합니다.
- 명령 구문 분석기는 입력을 구문 분석하여 명령을 식별하고 명령 실행 구성 요소로 전달합니다.
- 명령 실행에 의해 백엔드 서버의 해당 기능이 트리거되어 요청된 작업을 수행합니다.
- 작업이 완료되면 백엔드 서버가 응답을 보내며, 해당 응답은 사용자 인터페이스를 통해 사용자에게 표시되거나 전달됩니다.

![다이어그램](/assets/img/2024-05-15-AnapproachtobuildanExpenseTrackerusingNodejs_2.png)



8. 샘플 입력-출력:

이 샘플 입력과 출력은 비용 추적기 응용 프로그램 내에서 각 명령이 작동하는 방식을 보여줍니다. 사용자들이 비용을 효과적으로 관리하고 분석할 수 있는 기능을 제공합니다. 만들어 둔 입력 및 관련 명령에 대한 통찰력을 얻기 위해 언제든지 `--help` 명령을 사용할 수 있습니다.

![이미지](https://miro.medium.com/v2/resize:fit:1322/1*kroYcWIHG79M4MO9wqJWFA.gif)

9. 결론:



Node.js와 명령줄 인터페이스의 힘을 활용하여, 저희는 재정 관리를 간편화하고 소비 습관에 대한 소중한 통찰력을 제공하는 도구를 만들었어요. JavaScipt의 힘을 빌려 견고하고 효율적인 명령줄 응용 프로그램을 만들었습니다. 이 글을 통해 명령어 구문 분석, 파일 입출력 작업을 사용한 데이터 관리, 그리고 지출에 대한 통찰력을 추출하기 위한 계산의 복잡성에 대해 살펴보았어요.

계속되는 학습과 코드의 끝없는 가능성에 건배해요!