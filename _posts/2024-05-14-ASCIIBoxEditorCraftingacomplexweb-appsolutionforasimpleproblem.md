---
title: "ASCII Box Editor 간단한 문제에 대한 복잡한 웹 앱 솔루션 제작"
description: ""
coverImage: "/assets/img/2024-05-14-ASCIIBoxEditorCraftingacomplexweb-appsolutionforasimpleproblem_0.png"
date: 2024-05-14 13:22
ogImage: 
  url: /assets/img/2024-05-14-ASCIIBoxEditorCraftingacomplexweb-appsolutionforasimpleproblem_0.png
tag: Tech
originalTitle: "ASCII Box Editor: Crafting a complex web-app solution for a simple problem"
link: "https://medium.com/@TheoKVA/ascii-box-editor-crafting-a-complex-web-app-solution-for-a-simple-problem-de976eeee861"
---


# 아이디어의 시작

모든 것은 간단한 필요성에서 시작되었습니다: 내 스크립트에서 함수로 관리되는 레이어의 시각적 표현이 포함된 코멘트를 작성하고 싶었습니다. 몇 가지 특수 문자(ASCII 문자)가 존재하여 상자의 변에는 직선, 모퉁이에는 각도, 교차점에는 십자가 있는 다이어그램을 만드는 데 복사하여 붙여넣을 수 있다는 것을 알고 있었습니다.

![다이어그램](/assets/img/2024-05-14-ASCIIBoxEditorCraftingacomplexweb-appsolutionforasimpleproblem_0.png)

모든 이러한 문자들은 함께 작동하고 정렬하기 위해 설계되었습니다. 이러한 문자들은 상자 그리기 문자로 알려져 있습니다. 그러나 문자를 복사하여 붙여넣어 복잡한 다이어그램을 수동으로 만드는 것은 지루하고 실수할 여지가 많습니다.



```js
┌─┬┐  ╔═╦╗  ╓─╥╖  ╒═╤╕
│ ││  ║ ║║  ║ ║║  │ ││
├─┼┤  ╠═╬╣  ╟─╫╢  ╞═╪╡
└─┴┘  ╚═╩╝  ╙─╨╜  ╘═╧╛
┌───────────────────┐
│  ╔═══╗ 일부 텍스트  │▒
│  ╚═╦═╝ 상자 안에    │▒
╞═╤══╩══╤═══════════╡▒
│ ├──┬──┤           │▒
│ └──┴──┘           │▒
└───────────────────┘▒
 ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
```

이 작업을 간단하게 처리할 수있는 도구의 잠재력을 깨달았을 때, 기존 솔루션을 검색했지만 제 요구 사항을 충족하는 것은 없었습니다. 우리가 "프로그래머의 저주"라고 부를 수있는 것에 격려되어, 제 즉각적인 문제를 수동으로 해결하지 않고 누구나 사용할 수있는 프로세스를 자동화하는 솔루션을 생성하기로 결정했습니다.

## 비전 정의

내 비전은 분명했습니다: 누구나 ASCII 상자를 그리고 클릭하고 드래그하여 코멘트를 추가 할 수있는 직관적이고 쉽게 접근할 수있는 웹 앱을 개발하는 것 — Adobe Illustrator와 같은 도구의 간단함과 강력함을 반영하는 것입니다.



# 핵심 구축: ASCII 아트의 로제타 스톤

이 도구(ASCII Box Editor)의 기초를 다지기 위해, 나는 디지털 캔버스 상에서 서로 다른 ASCII 문자들이 어떻게 결합되는지에 대한 도전에 직면했습니다. 예를 들어, 수직 선 위에 수평 선을 그리는 것은 단순히 겹치는 것이 아니라 교차점을 형성해야 합니다.
이러한 과정에서 나는 "로제타"라는 시스템을 설계하기로 결심했습니다. 이 시스템은 서로 다른 타격과 문자가 어떻게 병합되는지를 정의하는 복잡한 배열 기반 객체입니다.
이 아이디어는 각 문자를 함수에 의해 해석될 수 있는 표현으로 변환하는 것입니다. 각 문자마다 그 카디널 포인트에 경로의 존재에 대응하는 등가 배열을 얻게 됩니다.

```js
[ ╳, ╳, ╳, ╳ ]                         
  │  │  │  │                           
  └──┼──┼──┼──▶ 상단에 경로가 있나요?  
     └──┼──┼──▶ 우측에 경로가 있나요?  
        └──┼──▶ 하단에 경로가 있나요?  
           └──▶ 좌측에 경로가 있나요?  

왼쪽 상단 모서리 문자 '┌'의 예
       ┌┄┄┄┄┄┄┄┄┄┄┄┄┐           
       ┆            ▽           
    ╔══╧══╗ '┌' = [ 0, 1, 1, 0 ]   > 0 = 없음
    ║     ║            ▲  ▲  △     > 1 = 경로가 이 위치에 있음
  ┌┄╢  ┏━╸╟────────────┘  │  ┆  
  ┆ ║  ┃  ║               │  ┆  
  ┆ ╚══╤══╝               │  ┆  
  ┆    └──────────────────┘  ┆  
  └┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┘  
```

이러한 논리를 기반으로, 각 문자에 대한 모든 등가 배열을 보관할 asciiBox_Rosetta 객체를 생성했으며, 문자('char') 표현에서 배열('code')로 변환하고 그 반대로 변환하는 두 가지 함수를 첨부했습니다.



```js
// ROSETTA: ASCII 문자를 배열 표현으로 매핑하기
class asciiBox_Rosetta {
  constructor() {
    this.rosetta = {
      '─': [0, 1, 0, 1], // 수평선
      '│': [1, 0, 1, 0], // 수직선
      '┼': [1, 1, 1, 1], // 교차점
      // 기타 등등...
    };
  }
  // 문자와 코드 사이의 변환을 위한 메소드
  getCharFromCode(code) {…}
  getCodeFromChar(char) {…}
}
```

로제타를 사용하면, 나는 이제 문자들 간 상호작용에 기반한 동적 문자 변환을 수행할 수 있는 간단한 중첩 문자 논리를 구성할 수 있었습니다. 이는 디지털 회로의 논리 연산을 모방하지만 텍스트 캔버스 상에서 이루어집니다.

```js
'─'와 '│' 사이의 조합 예제

 '─' + '│' = [0, 1, 0, 1] + [1, 0, 1, 0] = [1, 1, 1, 1] = '┼'   
└┈┈┈┈┈┈┈┈┈┘ └┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┘ └┈┈┈┈┈┈┈┈┈┈┈┈┘ └┈┈┈┘  
수평선      배열 표현          최종 배열       교차점
& 수직선                                          
```

이 간단한 논리 알고리즘은 문자 간의 중첩을 효과적으로 처리하는 데 매우 효과적이었습니다. 이 알고리즘을 통해, 나는 그림을 그리기 위해 마우스 이벤트를 캡처하고, 굵은 글꼴, 점선, 이중 선 등의 스타일 변경 및 화살표와 같은 방향 표시용 끝 캡슐을 통합하는 것만으로도 가능했습니다.



<img src="https://miro.medium.com/v2/resize:fit:1400/1*tPD4T6_yVr6wBlKDj6RKGw.gif" />

# 기능 구현: 선 그리기를 넘어서

정적 디자인으로부터 완전히 상호작용형 웹 애플리케이션으로의 여정은 다양한 사용자 도구를 관리하는 것을 포함하여 수많은 도전을 안겨주었습니다. 각 도구마다 고유한 특성과 동작이 있기 때문에 그것을 관리하는 것이 쉽지 않았습니다.

ASCII Box Editor의 핵심은 asciiBox_ToolManager인데, 이 동적 시스템은 사용자의 작업에 따라 도구를 전환할 수 있도록 설계되었습니다. 이 시스템은 부드러운 사용자 경험을 제공할 뿐만 아니라 코드베이스를 획기적으로 간소화하는 데 중요합니다.



```js
// 도구 관리자: 도구의 활성화와 사용을 관리합니다
class asciiBox_ToolManager {
    constructor(db, styleContainer) {
        this.currentTool = null;  // 현재 활성화된 도구
        this.previousTool = null;  // 빠른 전환을 위해 이전에 사용한 도구
        // 일련의 도구로 초기화
        this.tools = {
            "직선 그리기": new asciiBox_DrawLine(this),
            "상자 그리기": new asciiBox_DrawBox(this),
            "지우개": new asciiBox_Erase(this),
            // 여기서 더 많은 도구를 초기화합니다...
        };
    }
    // 사용자 선택에 따라 도구를 설정하는 함수
    setTool(toolName) {
        this.previousTool?.deactivate();  // 이전 도구 비활성화
        this.currentTool = this.tools[toolName];
        this.currentTool.activate();  // 새 도구 활성화
    }
}
```

전통적인 절차적 코드는 각 도구를 별도의 함수로 처리하거나 if-else 문의 일련의 문장으로 처리할 수 있었으며, 이는 코드가 비대하고 반복적이며 유지보수하기 어렵게 만들었습니다. 반면, 객체지향 접근 방식은 각 도구의 기능을 클래스 내부에 캡슐화합니다. 이로 인해 코드가 더 깨끗하고 디버깅하기 쉬워지면서 확장성도 향상됩니다. 새로운 도구를 추가하는 것은 새 클래스를 정의하고 도구 관리자에 추가하는 것만으로 간단해집니다.

각 도구는 일반 asciiBox_Tool 클래스에서 상속을 받으며 활성화 및 비활성화와 같은 공통 동작을 정의하고 특정 동작은 각 도구의 필요에 맞게 하위 클래스에 재정의됩니다. 이 다형성은 asciiBox_ToolManager가 도구 세부 사항에 대해 무관하게 유지되면서 다양한 기능을 활성화할 수 있도록 합니다.

```js
// 일반 도구 클래스
class asciiBox_Tool {
    constructor(name, manager) {
        this.name = name;
        this.manager = manager;
        this.isActive = false;
    }
    activate() { this.isActive = true; }
    deactivate() { this.isActive = false; }
    onMouseDown(args) { /* 기본 마우스 다운 동작 */ }
}

// 특정 도구 생성
class asciiBox_Select extends asciiBox_Tool {
    constructor(manager) {
        super('선택', manager);
        // 더 많은 초기화 변수
    }
    // 사용자 입력 이벤트 처리를 위한 함수 로직
}
```



사용자 상호작용의 세부 사항을 주의 깊게 고려하여 필요한 모든 도구를 설정했습니다. 간단한 클릭부터 복잡한 드래그 앤 드롭 제스처까지 ASCII Box Editor가 모든 단계에서 직관적으로 유지될 수 있도록했습니다.
이 유연한 아키텍처는 많은 시간을 절약했습니다. 앱이 발전함에 따라 asciiBox_ToolManager의 유연성으로 인해 새로운 도구와 스타일을 소개할 수 있었지만 이전 기능의 핵심 기능을 방해하지 않았습니다.

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*jJFHQSLocMxTWVT5nMofiA.gif)

# 여정이 계속됩니다

처음부터 비전은 간단한 필요성을 보편적인 해결책으로 변형하는 것이었습니다. ASCII Box Editor는 그 비전의 실행입니다. ASCII 코멘트를 생성하는 것을 간소화하면서도 정교한 디자인 도구의 간편함과 강력함을 유지합니다.



위 설명에서 볼 수 있듯이, 때로는 "프로그래머의 저주"가 초기 도전을 벗어나 혁신적인 해결책을 이끌어낼 수 있습니다.

어떻게 작동하는지 궁금하신가요? ASCII Box Editor를 한 번 시도해 보세요!
theokva.github.io/ascii-box-editor 👋

![출력](/assets/img/2024-05-14-ASCIIBoxEditorCraftingacomplexweb-appsolutionforasimpleproblem_1.png)

—Theo



만약 이 기사가 마음에 드셨다면 👏 클랩(clap)을 부탁드려요. 
더 많은 이야기를 보시려면 저를 팔로우해주세요.