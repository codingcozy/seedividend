---
title: "React Fiber에 대한 설명 더 부드러운 UI를 위한 점진적 렌더링"
description: ""
coverImage: "/assets/img/2024-06-19-ReactFiberExplainedIncrementalRenderingforSmootherUIs_0.png"
date: 2024-06-19 23:46
ogImage: 
  url: /assets/img/2024-06-19-ReactFiberExplainedIncrementalRenderingforSmootherUIs_0.png
tag: Tech
originalTitle: "React Fiber Explained: Incremental Rendering for Smoother UIs"
link: "https://medium.com/@sharmfernando33/react-fiber-explained-incremental-rendering-for-smoother-uis-c8f5973aa1fb"
---


<img src="/assets/img/2024-06-19-ReactFiberExplainedIncrementalRenderingforSmootherUIs_0.png" />

# React Fiber이 무엇인가요?

React Fiber는 React 라이브러리의 완전히 새로운 핵심 조정 알고리즘입니다. 조정은 React가 UI를 응용 프로그램 데이터 상태에 맞게 최신 상태로 가져오는 방법입니다. 이는 렌더링 작업을 "파이버(fibres)"라고 불리는 작은 부분으로 분할합니다. 이렇게 하면 React가 이러한 부분들을 조각조각 처리하고 필요할 때 작업을 프레임 간에 분배할 수 있습니다. 이 방식은 렌더링 프로세스에서 더 많은 유연성을 제공하며 업데이트를 우선 순위 지정하고 스케줄링할 수 있는 기능을 제공합니다.

## 이게 왜 중요한가요?

<div class="content-ad"></div>

산업에서 많은 개발자들이 React Fiber 아키텍처에 대해 완전히 알지 못하는 경우가 많습니다. React Fiber는 렌더링 프로세스를 작은 단위로 나눔으로써 훨씬 효율적인 애플리케이션을 만들 수 있는 기회를 제공하며, 웹 개발 분야에서 엄청난 발전을 이뤘습니다.

## 이전 알고리즘 (스택 조정자)

이전 조정 알고리즘인 스택 조정자는 React가 업데이트를 동기적으로 한 번 적용했습니다. 이는 컴포넌트의 상태가 변경될 때 React가 전체 컴포넌트 트리를 탐색하고 이전 트리와 비교한 다음 필요한 업데이트를 한 번에 DOM에 적용한 것을 의미합니다. 이 방법은 간단한 애플리케이션에는 좋았지만, 복잡한 애플리케이션에서는 브라우저를 렌더링하는 동안 브라우저를 잠그는 등의 문제가 발생할 수 있어서 쟁점이 되었습니다.

## Fiber 조정자

<div class="content-ad"></div>

React Fiber는 렌더링 작업을 "파이버(fibers)"로 분할하여 점진적으로 처리할 수 있게 함으로써 우리가 논의하는 조정 유형에 새로운 시각을 제공합니다. 이를 통해 React는 렌더링 작업이 서로 다른 프레임에 고르게 분배되어 일시적으로 작동을 중지하고 나중에 다시 작동할 수 있게 됩니다. 이 접근 방식의 주요 이점은 전반적인 성능과 반응 속도 향상입니다.

# React-Fiber 뒤에 숨겨진 주요 개념

## 1. 점진적 렌더링

우선순위 기반 업데이트: React Fiber는 모든 업데이트를 서로 다른 우선순위로 나눕니다. 사용자 상호작용과 같은 중요한 주의를 필요로 하는 업데이트는 즉시 처리되고, 데이터 가져오기와 같은 비교적 중요하지 않은 업데이트는 백그라운드에서 처리되어 시스템 반응성을 향상시킵니다.

<div class="content-ad"></div>

## 2. 동시성

React Fiber은 멀티스레드이며 병렬 처리 또는 동시성을 지원합니다. 이는 응용 프로그램에서 상호 작용을 도입하는 다양한 하위 인터페이스가 있을 때 특히 유용합니다. 항상 순조로운 상호 작용 UI를 유지하기 위해 큐의 맨 위에 중요하게 처리해야 할 업데이트를 유지하면서 비교적 중요도가 낮은 작업에 대해 일정량의 진전을 보입니다.

## 3. 트리 구조

React Fiber는 각 항목이 상태, 데이터 및 계층 위치와 함께 UI의 일부인 Fiber 트리를 사용합니다. 이 구조를 통해 React는 DOM의 부분을 업데이트하려는 필요한 변경 사항을 더 잘 이해하고 추적하여 전체 성능 및 렌더링 속도를 향상시킵니다.

<div class="content-ad"></div>

# 화해 과정

![화해과정](/assets/img/2024-06-19-ReactFiberExplainedIncrementalRenderingforSmootherUIs_1.png)

우리가 상태를 변경할 때, React는 메인 스레드가 비어있을 때까지 기다렸다가 작업 중인 트리(Work In Progress, WIP)를 구축하기 시작합니다. 이 WIP 트리는 fiber를 사용하여 구축되며, 그 구조는 코드 내의 컴포넌트를 반영합니다. 렌더링 또는 화해 단계에서는 WIP 트리를 구성하고 변경 사항을 식별하는 비동기 작업이 진행됩니다. 이 단계는 메인 스레드가 다른 작업을 처리해야 할 경우 중지될 수 있으며, 작업의 중요도에 따라 우선순위가 부여됩니다. 메인 스레드가 다시 비어있게 되면, 중단된 지점부터 WIP 트리를 계속 구축합니다.

![화해과정](/assets/img/2024-06-19-ReactFiberExplainedIncrementalRenderingforSmootherUIs_2.png)

<div class="content-ad"></div>

두 번째 단계인 커밋 단계는 전체 WIP 트리가 완료된 후 시작됩니다. 이 단계는 동기적으로 진행되며 중단될 수 없습니다. React는 이 단계에서 현재 트리와 진행 중인 작업 트리의 포인터를 교환하여 DOM에 변경 사항을 적용한 다음, 이러한 파이버를 DOM에 렌더링합니다. 교환 후, 새로운 진행 중인 작업 트리는 향후 상태 변경에 준비가 된 상태입니다.

# 실제 세계 응용프로그램

![이미지](/assets/img/2024-06-19-ReactFiberExplainedIncrementalRenderingforSmootherUIs_3.png)

Facebook: 뉴스 피드 업데이트, 실시간 알림 및 실시간 채팅과 같은 기능.

<div class="content-ad"></div>

인스타그램: 무한 스크롤링, 라이브 스토리, 실시간 댓글 등의 기능을 제공합니다.

WhatsApp Web: 실시간 업데이트, 여러 채팅 창, 미디어 처리 등의 기능을 제공합니다.

# 참고 자료

이 참고 자료들이 React Fiber와 해당 아키텍처에 대한 이해를 돕는 데 도움이 되었습니다. 유용하게 활용하시기를 바랍니다.

<div class="content-ad"></div>

# Andrew Clark: 리액트의 다음 단계 - ReactNext 2016

- 리액트 파이버 아키텍처 - Github 저장소

- SMOOSHCAST: 다니엘 아브라모프와 함께하는 리액트 파이버 심층 탐구

읽어 주셔서 감사합니다!