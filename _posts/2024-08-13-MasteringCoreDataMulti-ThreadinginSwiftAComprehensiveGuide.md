---
title: "Swift에서 코어 데이터를 멀티 스레딩으로 마스터하는 방법 정리"
description: ""
coverImage: "/assets/img/2024-08-13-MasteringCoreDataMulti-ThreadinginSwiftAComprehensiveGuide_0.png"
date: 2024-08-13 12:08
ogImage: 
  url: /assets/img/2024-08-13-MasteringCoreDataMulti-ThreadinginSwiftAComprehensiveGuide_0.png
tag: Tech
originalTitle: "Mastering Core Data Multi-Threading in Swift A Comprehensive Guide"
link: "https://medium.com/@lioz.balki1/mastering-core-data-multi-threading-in-swift-a-comprehensive-guide-a80c80038f00"
isUpdated: true
updatedAt: 1723864028868
---


![이미지](/assets/img/2024-08-13-MasteringCoreDataMulti-ThreadinginSwiftAComprehensiveGuide_0.png)

# 소개

코어 데이터(Core Data)는 iOS에서 데이터를 객체 지향적으로 관리하고 영속성을 유지하는 강력한 프레임워크입니다. 그러나 멀티스레딩을 다룰 때는 조심해야 합니다. 이 기사에서는 여러 스레드에서 안전하게 코어 데이터를 사용하는 방법, 동시성 디버깅을 활성화하는 방법, 데이터 손상이나 크래시 없이 앱이 효율적으로 작동하도록 하는 방법을 탐색해 보겠습니다.

# 코어 데이터와 멀티스레딩

<div class="content-ad"></div>

Core Data 컨텍스트 (NSManagedObjectContext)는 기본적으로 스레드에 안전하지 않습니다. 이는 각 컨텍스트가 한 번에 하나의 스레드에서만 액세스되어야 함을 의미합니다. Core Data를 멀티스레드 환경에서 사용해야 하는 경우, 컨텍스트를 올바르게 관리하여 데이터 손상이나 예기치 않은 충돌과 같은 문제를 피해야 합니다.

# Core Data 동시성 디버깅 활성화하기

![img](/assets/img/2024-08-13-MasteringCoreDataMulti-ThreadinginSwiftAComprehensiveGuide_1.png)

여러 스레드에서 Core Data를 올바르게 사용하는지 확인하려면 환경 변수 -com.apple.CoreData.ConcurrencyDebug를 1로 설정하여 Core Data의 동시성 디버깅 어서션을 활성화할 수 있습니다. 이렇게 하면 개발 중에 잠재적인 동시성 위반을 식별하여 문제를 조기에 파악하고 수정하는 데 도움이 됩니다.

<div class="content-ad"></div>

어떻게 활성화하나요:

- Xcode 프로젝트의 scheme 편집기로 이동합니다.
- "Run" 탭을 선택합니다.
- "Arguments" 탭을 클릭합니다.
- "Arguments Passed On Launch" 아래에 -com.apple.CoreData.ConcurrencyDebug 1을 추가합니다.

활성화하면 Core Data가 잘못된 스레드에서 관리 객체 컨텍스트를 사용하려고 시도하는 경우 Assert를 실행합니다.

# NSManagedObjectContextConcurrencyType 이해하기

<div class="content-ad"></div>

NSManagedObjectContext를 생성할 때는 NSManagedObjectContextConcurrencyType 열거형을 사용하여 해당 동시성 유형을 지정할 수 있습니다. 주요 두 가지 유형이 있습니다:

- mainQueueConcurrencyType: 이 컨텍스트는 주 스레드에서 실행되며 일반적으로 UI를 업데이트하는 데 사용됩니다. UI에 직접 영향을 미칠 수 있는 가져오기 또는 업데이트 작업을 수행해야 할 때 주로 이 유형을 사용하는 것이 중요합니다.
- privateQueueConcurrencyType: 이 컨텍스트는 개인 백그라운드 스레드에서 실행되며 원격 서버에서 데이터를 가져오는 것과 같은 시간이 많이 소요되는 작업을 차단하지 않고 수행하기에 이상적입니다.

# NSPersistentContainer, viewContext, 및 동시성 유형

NSPersistentContainer를 사용할 때 자동으로 설정된 viewContext를 제공합니다. viewContext는 기본적으로 mainQueueConcurrencyType을 사용하므로 즉시 UI를 업데이트해야 하는 작업에 적합합니다.

<div class="content-ad"></div>

그러나 백그라운드에서 작업을 수행해야 할 때는 privateQueueConcurrencyType을 사용하여 새로운 컨텍스트를 생성해야 합니다. 이렇게 하면 백그라운드 작업이 UI에 영향을 미치지 않거나 메인 스레드를 블록하지 않도록 보장할 수 있습니다.

예시:

```js
let backgroundContext = persistentContainer.newBackgroundContext()
backgroundContext.perform {
    // 여기서 백그라운드 작업 실행
}
```

# performAndWait 및 perform 사용하기

<div class="content-ad"></div>

NSManagedObjectContext은 context의 큐에서 코드 블록을 실행하는 두 가지 메서드를 제공합니다:

- performAndWait: 이 메서드는 블록을 context의 큐에서 동기적으로 실행합니다. 결과를 즉시 처리해야 하는 경우 유용합니다. 그러나 주 스레드에서 사용할 때 UI를 차단할 수 있으므로 주의가 필요합니다.
- perform: 이 메서드는 블록을 context의 큐에서 비동기적으로 실행합니다. 즉각적인 결과가 필요하지 않은 작업에 대해 선호되며, 응용 프로그램의 나머지 부분이 원활하게 실행되도록 합니다.

Concurrency Type Differences:

- mainQueueConcurrencyType을 사용할 때 perform은 블록을 주 스레드에서 비동기적으로 실행하여 UI의 응답성을 유지합니다.
- privateQueueConcurrencyType을 사용할 때 perform은 블록을 백그라운드 스레드에서 비동기적으로 실행하여 UI와 관련없는 작업에 적합합니다.

<div class="content-ad"></div>

# NSManagedObjectContext 병합 정책

병합 정책은 다른 컨텍스트 간의 충돌을 어떻게 해결할지를 정의합니다. Core Data는 여러 가지 병합 정책을 제공합니다:

- NSOverwriteMergePolicy: 이 정책은 현재 컨텍스트의 변경 사항을 무시하고 영구 저장소의 변경 사항으로 덮어씁니다.
- NSRollbackMergePolicy: 이 정책은 현재 컨텍스트의 모든 변경 사항을 롤백하여 병합 이전의 상태로 되돌립니다.
- NSMergeByPropertyObjectTrumpMergePolicy: 이 정책은 현재 컨텍스트의 변경 사항을 영구 저장소보다 우선시합니다. 충돌이 발생할 때 컨텍스트의 값들을 유지합니다.
- NSMergeByPropertyStoreTrumpMergePolicy: 이 정책은 영구 저장소의 변경 사항을 현재 컨텍스트보다 우선시하며, 컨텍스트의 변경 사항은 무시합니다.
- NSErrorMergePolicy: 이 정책은 충돌이 발생할 때 오류를 발생시켜 수동으로 병합을 처리할 수 있도록 합니다.

예시:

<div class="content-ad"></div>

```js
let context = NSManagedObjectContext(concurrencyType: .privateQueueConcurrencyType)
context.mergePolicy = NSMergeByPropertyObjectTrumpMergePolicy
```

## NSManagedObjectContext 알림

코어 데이터는 여러 알림을 제공하여 컨텍스트에서 발생하는 변경 사항을 추적하고 대응할 수 있도록 도와줍니다:

- willSaveObjectsNotification: 컨텍스트가 변경 사항을 저장하기 직전에 전송됩니다.
- didSaveObjectsNotification: 컨텍스트가 성공적으로 변경 사항을 저장한 후에 전송됩니다.
- didChangeObjectsNotification: 관리 객체가 삽입, 삭제 또는 업데이트될 때마다 전송됩니다.
- didSaveObjectIDsNotification: 컨텍스트가 성공적으로 변경 사항을 저장한 후에, 영향을 받는 객체들의 개체 식별자가 포함된 알림이 전송됩니다.
- didMergeChangesObjectIDsNotification: 다른 컨텍스트에서의 변경 사항이 병합된 후에 전송됩니다.

<div class="content-ad"></div>

이러한 알림을 사용하면 Core Data 스택에서 변경 사항에 반응하여 UI가 데이터와 동기화되도록 할 수 있습니다.

예시:

영구 저장소에 변경 내용이 저장될 때마다 UI를 업데이트하고 싶다고 가정해 봅시다. NSManagedObjectContext.didSaveObjectsNotification을 관찰하여 언제든지 context가 변경 내용을 저장할 때 알림을 받을 수 있습니다:

```js
NotificationCenter.default.addObserver(self, selector: #selector(contextDidSave(_:)), name: NSManagedObjectContext.didSaveObjectsNotification, object: nil)

@objc func contextDidSave(_ notification: Notification) {
    // 변경 사항을 주 컨텍스트로 병합하여 UI를 최신 상태로 유지
    let context = persistentContainer.viewContext
    context.perform {
        context.mergeChanges(fromContextDidSave: notification)
        // 여기서 UI를 업데이트합니다.
    }
}
```

<div class="content-ad"></div>

이 예시에서는 didSaveObjectsNotification을 관찰하고 주 컨텍스트로 변경 사항을 병합하여 UI가 최신 데이터를 반영하도록합니다. context.perform를 사용하여 UI 업데이트가 주 스레드에서 발생하도록 보장하여 앱이 반응적으로 유지되도록합니다.

## 결론

다중 스레드 환경에서 Core Data를 관리하는 것은 context 및 작업을 주의 깊게 다루어야합니다. 동시성 유형을 이해하고 context 작업에 적절한 메서드를 사용하며 적절한 병합 정책을 설정하여 Core Data 작업이 안전하고 효율적임을 보장할 수 있습니다. 동시성 디버깅을 활성화하면 문제를 조기에 파악하여 개발 프로세스가 원활하고 응용 프로그램이 더 신뢰할 수 있도록 할 수 있습니다.