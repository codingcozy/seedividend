---
title: "러스트 트레이트 TypeScript 인터페이스의 강력한 대안"
description: ""
coverImage: "/assets/img/2024-05-20-RustTraitAPowerfulAlternativeToTypeScriptInterface_0.png"
date: 2024-05-20 21:42
ogImage: 
  url: /assets/img/2024-05-20-RustTraitAPowerfulAlternativeToTypeScriptInterface_0.png
tag: Tech
originalTitle: "Rust Trait: A Powerful Alternative To TypeScript Interface"
link: "https://medium.com/better-programming/rust-trait-a-powerful-alternative-to-typescript-interface-e671cd7f9690"
isUpdated: true
---





![RustTraitAPowerfulAlternativeToTypeScriptInterface](/assets/img/2024-05-20-RustTraitAPowerfulAlternativeToTypeScriptInterface_0.png)

Rust은 인터페이스 개념을 갖고 있지만, 다른 프로그래밍 언어들과는 다르게 클래스와 함수의 동작을 지정하기 위해 인터페이스 키워드를 사용하지 않습니다. 대신, Rust의 가장 가까운 추상화 패턴은 트레이트입니다. 이러한 개념들은 많은 차이가 있지만, 둘 다 다중 가능한 구현을 다루는 문제를 해결합니다.

이 블로그 포스트에서는 TypeScript 코드 조각과 잠재적인 Rust 동등 코드를 비교하여 간단하고 유연하며 조립 가능한 코드를 어떻게 구현하는지를 보여줄 것입니다.

# 선언


<div class="content-ad"></div>

이는 데이터베이스에 문서 및 이미지를 저장하고 나열하는 프로젝트를 상상해 봅시다. 두 유형의 파일이 동일한 저장소에 저장되고 공통 특성을 공유하기 때문에 공통 정보를 공유하기 위해 인터페이스를 사용할 수 있습니다.

인터페이스를 사용하면 공통 속성 및 메소드를 정의하여 어느 유형의 파일과도 작업할 수 있는 코드를 쉽게 작성할 수 있습니다.

TypeScript에서는 이러한 인터페이스를 다음과 같이 정의할 수 있습니다:

```js
interface Entity {
    id: string;
    timestamp: number;
}

interface Document extends Entity {
    revised: boolean;
}

interface Image extends Entity {
    type: string;
}
```

<div class="content-ad"></div>

Rust에서는 상속이 없기 때문에 가장 간단한 대응 구현은 타입을 복제해야 한다.

```js
struct Document {
    id: String,
    timestamp: u64,
    revised: bool,
}

struct Image {
    id: String,
    timestamp: u64,
    mime_type: String,
}
```

# 상속 및 제네릭

이제 특정 문서 또는 이미지를 찾고 싶은 시나리오를 고려해보겠습니다. TypeScript에서는 다음과 같은 코드로 이를 수행할 수 있습니다.

<div class="content-ad"></div>

```js
const getDocument = (
 id: string,
 documents: Document[]
): Document | undefined =>
 documents.find(({ id: docId }) => docId === id);

const getImages = (
 id: string,
 images: Image[]
): Image | undefined =>
 images.find(({ id: imageId }) => imageId === id);
```

하지만 두 함수가 동일한 인터페이스를 구현하기 때문에 중복을 피할 수 있습니다. 제네릭 함수를 추출하여 코드 중복을 피는 것이 좋습니다:

```js
const get = <T extends Entity>(
 id: string,
 elements: T[]
): T | undefined =>
 elements.find(({ id: elementId }) => elementId === id);

const getDocument = (
 id: string,
 documents: Document[]
): Document | undefined => get<Document>(id, documents);

const getImages = (
 id: string,
 images: Image[]
): Image | undefined => get<Image>(id, images);
```

Rust에서 동일한 기능을 구현하는 경우 초기에는 코드를 중복해야 합니다:

<div class="content-ad"></div>

```js
fn get_document(id: String, documents: Vec<Document>) -> Option<Document> {
    documents.into_iter().find(|document| document.id == id)
}

fn get_image(id: String, images: Vec<Image>) -> Option<Image> {
    images.into_iter().find(|image| image.id == id)
}
```

위에서 보듯이 Rust 코드는 TypeScript 구현과 매우 유사합니다. 그러나 Rust에는 상속이나 인터페이스 키워드가 없기 때문에 중복을 피하기 위해 위의 패턴을 정확히 복제할 수 없습니다. 여기서 트레잇이 나옵니다.

이 특정 예에서 문서 및 이미지 두 객체 모두 공유하는 공통 특성은 ID를 사용하여 비교할 수 있다는 것입니다. 이것이 우리가 이러한 특성을 트레잇으로 선언하고 각 구조체에 대한 해당 구현을 제공할 수 있는 이유입니다.

```js
trait Compare {
    fn compare(&self, id: &str) -> bool;
}

impl Compare for Document {
    fn compare(&self, id: &str) -> bool {
        self.id == id
    }
}

impl Compare for Image {
    fn compare(&self, id: &str) -> bool {
        self.id == id
    }
}
```

<div class="content-ad"></div>

마침내 러스트에서 공통 코드를 일반 함수로 추출할 수 있게 되었습니다. 이전에 TypeScript에서 했던 것처럼요.

```js
fn get<T: Compare>(id: String, elements: Vec<T>) -> Option<T> {
    elements.into_iter().find(|element| element.compare(&id))
}

fn get_document(id: String, documents: Vec<Document>) -> Option<Document> {
    get(id, documents)
}

fn get_image(id: String, images: Vec<Image>) -> Option<Image> {
    get(id, images)
}
```

또한 러스트에서는 트레이트를 “+” 기호로 결합하여 여러 공통 특성을 정의할 수 있습니다. 예를 들어:

```js
fn get<T: Compare + OtherTrait>(id: String, elements: Vec<T>) -> Option<T> {
    elements
        .into_iter()
        .find(|element| element.compare(&id) && element.other_trait(&id))
}
```

<div class="content-ad"></div>

이러한 패턴은 두 개의 매개변수가 동일한 구조체와 관련될 수 있기 때문에 객체를 비교하는 구현도 흥미로울 수 있습니다.

```rust
trait Compare {
    fn sort(&self, other: &Self) -> Ordering;
}

impl Compare for Document {
    fn sort(&self, other: &Self) -> Ordering {
        self.timestamp.cmp(&other.timestamp)
    }
}
```

# 결론

우리는 트레이트가 제공할 수 있는 강력함의 일부만 살펴봤지만, 저와 같이 러스트를 탐색하고 있는 자바스크립트 개발자들에게 이 간단한 튜토리얼이 유용할 것이라고 희망합니다.

<div class="content-ad"></div>

무한한 여정이 시작됩니다
데이비드

더 많은 모험을 원하시면 트위터에서 제 계정을 팔로우해주세요.