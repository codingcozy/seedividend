---
title: "트렐로같은 드래그 앤 드롭 칸반보드 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "How To Drag , Drop Like Trello"
link: "https://medium.com/@rekdhmer/how-to-drag-drop-like-trello-b21c4e821429"
isUpdated: true
---





<img src="/assets/img/HowToDrag-DropLikeTrello_0.png" />

웹 애플리케이션에서 Trello와 유사한 드래그 앤 드롭 기능을 구현하면 직관적이고 상호작용적인 콘텐츠 관리가 가능해져 사용자 경험을 크게 향상시킬 수 있습니다. 이 튜토리얼에서는 React를 사용하여 이러한 기능을 만드는 방법을 안내하겠습니다. 특히 @hello-pangea/dnd 라이브러리와 함께 사용하여 Prisma를 통해 백엔드와 통합할 것입니다. 드래그 가능한 컨텍스트 설정, 드래그 가능한 목록과 카드 구현, 그리고 재정렬 로직 처리에 대해 다룰 것입니다.

전제 조건

- React 및 훅 (useState, useEffect)에 대한 기본 지식
- TypeScript에 익숙한 것이 좋습니다. (이 가이드에 권장되지만 선택 사항)
- 데이터 관리를 위해 Prisma가 구성된 React 프로젝트 설정
- 드래그 앤 드롭 기능을 위해 @hello-pangea/dnd 라이브러리 설치

# 단계 1: 드래그 앤 드롭 컨텍스트 설정

<div class="content-ad"></div>

우선, 끌어다 놓기 컨텍스트가 구성 요소 구조 주변에 래핑되어 있는지 확인하여 끌어다 놓을 수 있는 항목을 관리하세요.

## 단계 2: 목록 컨테이너 만들기

목록 컨테이너는 개별 목록을 보관합니다. 각 목록에는 여러 카드가 포함될 수 있습니다. 끌어다 놓을 수 있는 구성 요소를 놓을 수 있는 영역을 지정하기 위해 `Droppable` 구성 요소를 사용하세요.

## 단계 3: 끌어다 놓을 수 있는 목록 구현하기

<div class="content-ad"></div>

ListContainer 안에서 고유한 draggableId로 래핑된 ListItem 구성 요소를 렌더링하십시오.

# 단계 4: 목록에 카드 추가하기

목록과 마찬가지로 각 목록 내의 카드도 Draggable 구성 요소로 래핑되어야 합니다. 그러나 각 목록 내에서는 Droppable 컴포넌트 내에 드롭될 것입니다.

# 단계 5: 재정렬 로직 구현하기

<div class="content-ad"></div>

DragDropContext에서 onDragEnd 메소드를 사용하여 드래그 작업이 완료된 후 아이템을 다시 정렬하는 논리를 처리해야 합니다. 결과 매개변수의 소스와 대상을 사용하여 새로운 순서를 결정하세요.

## 단계 6: 백엔드 업데이트

프론트엔드 로직이 준비되면 백엔드를 해당 내용에 맞게 업데이트하세요. 새로운 순서를 데이터베이스에 유지하기 위해 제공된 `updateListOrder` 및 `updateCardOrder` 함수를 사용하세요.

## 결론

<div class="content-ad"></div>

이 단계를 따라하면 Trello 보드와 유사한 기본 드래그 앤 드롭 기능을 구현할 수 있어요. 이 튜토리얼에서는 드래그할 수 있는 컨텍스트, 목록 및 카드 설정, 그리고 순서 재정렬 논리 처리에 대해 다루었어요. 귀하의 구체적인 요구 사항과 데이터 구조에 맞게 이 논리를 수정하고 확장하세요.

- 내 github 링크
- 데모 사이트
