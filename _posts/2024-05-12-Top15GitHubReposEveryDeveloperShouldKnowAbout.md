---
title: "모든 개발자가 알아야 할 상위 15개 이상의 GitHub 저장소"
description: ""
coverImage: "/assets/img/2024-05-12-Top15GitHubReposEveryDeveloperShouldKnowAbout_0.png"
date: 2024-05-12 20:47
ogImage: 
  url: /assets/img/2024-05-12-Top15GitHubReposEveryDeveloperShouldKnowAbout_0.png
tag: Tech
originalTitle: "Top 15+ GitHub Repos Every Developer Should Know About"
link: "https://medium.com/javascript-in-plain-english/top-15-github-repos-every-developer-should-know-about-c4d68d84db2c"
isUpdated: true
---




프로그래머가 되는 길을 가속화시키는 방법

![이미지](/assets/img/2024-05-12-Top15GitHubReposEveryDeveloperShouldKnowAbout_0.png)

GitHub은 오픈 소스 정신을 대변하는 우리가 좋아하는 사이트 중 하나입니다. 거기서 무료 전자책을 찾을 수 있고, 오늘날 가장 인기 있는 기술 주제를 논의하며, 코딩 기술을 향상시킬 수 있습니다.

이 게시물에서는 내가 가장 유용하게 느끼는 15가지 GitHub 저장소를 공유하고 싶고, 여러분이 즐길 것으로 기대합니다.



# 1. 글쓰기로 돈 벌기

만약 훌륭한 글을 쓰는 것을 즐기신다면, 여기 목록에서 돈을 벌 수 있는 적절한 방법을 찾을 수 있을 겁니다.

이런 글들을 읽기 위해 돈을 주고자 하는 많은 사람들 때문에, 여러분은 많은 돈을 벌 수 있는 글쓰기 전문가가 될 수 있다고 믿습니다.

# 2. 인터뷰를 쉽게 만들기



경쟁적인 면접을 통과하는 방법이 뭘까요?

오! 우리는 먼저 면접관을 만족시킬 이력서를 작성해야 해요. 이건 처음으로 해야 할 일 중 하나랍니다.

나는 이 두 개의 GitHub 저장소를 정말 좋아해요. 여기에는 이력서부터 면접까지의 전체 과정을 담은 완성된 패키지가 하나 있다구요.

거기에는 많은 고전적인 기술 면접 질문과 프로그램 코드 조각들이 많이 있답니다!



# 3. # 무료 프로그래밍 서적(281k)

와우!!! 정말 대단해요.

이것은 저에게 많은 도움을 주었어요. 프론트엔드 개발 엔지니어로 성장하는 여정에서, 무료 프로그래밍 서적, 고품질 무료 온라인 강의, 그리고 비디오, 팟캐스트 등을 통해 많은 도움을 받았어요.

우리 기술 스킬을 향상시키는 데 사용할 자료는 부족하지 않지만, 더 나은 사람이 되기 위한 결의와 행동이 부족합니다.



# 4. # The Art of Command Line(137k)

프로그래밍을 처음 시작했을 때는 그래픽 인터페이스 소프트웨어가 제일 즐겨 사용했어요. 터미널을 열고 명령어를 사용하는 것이 어렵다고 생각해서 심지어 두려워했죠.

그런데 어느 날, 명령어줄의 매력을 정말로 깨달았어요. 고급 개발자가 되고 싶다면, 꼭 명령어줄을 배우는 데 시간을 투자해야 합니다.

# 5. # javascript-algorithms(171k)



솔직히 말해서, 프론트엔드 개발자로서 저는 업무에서 알고리즘을 거의 사용하지 않습니다. 오히려 그것이 전혀 중요하지 않다고 생각하며, 제 우수한 업무에는 영향을 미치지 않는다고 생각합니다.

하지만 컴퓨터의 진정한 마법을 이해하고 싶다면, 자료 구조와 알고리즘을 배워야 한다는 것을 알고 있습니다.

해당 저장소에는 다양한 인기 알고리즘과 자료 구조의 JavaScript 기반 예제가 포함되어 있습니다.

프론트엔드 개발자에겐 안성맞춤입니다.



```js
import Sort from '../Sort';
```

```js
export default class QuickSort extends Sort {
  /**
   * @param {*[]} originalArray
   * @return {*[]}
   */
  sort(originalArray) {
    // 수정을 방지하기 위해 원본 배열을 복제합니다.
    const array = [...originalArray];
    // 배열에 요소가 하나 이하면 이미 정렬된 상태입니다.
    if (array.length <= 1) {
      return array;
    }
    // 좌측 배열과 우측 배열을 초기화합니다.
    const leftArray = [];
    const rightArray = [];
    // 배열의 첫 번째 요소를 피벗으로 선택합니다.
    const pivotElement = array.shift();
    const centerArray = [pivotElement];
    // 모든 배열 요소를 좌측, 중앙, 우측 배열로 분리합니다.
    while (array.length) {
      const currentElement = array.shift();
      // 콜백 함수를 호출합니다.
      this.callbacks.visitingCallback(currentElement);
      if (this.comparator.equal(currentElement, pivotElement)) {
        centerArray.push(currentElement);
      } else if (this.comparator.lessThan(currentElement, pivotElement)) {
        leftArray.push(currentElement);
      } else {
        rightArray.push(currentElement);
      }
    }
    // 좌측과 우측 배열을 정렬합니다.
    const leftArraySorted = this.sort(leftArray);
    const rightArraySorted = this.sort(rightArray);
    // 이제 정렬된 좌측 배열을 중앙 배열과 정렬된 우측 배열과 함께 결합합니다.
    return leftArraySorted.concat(centerArray, rightArraySorted);
  }
}
```

# 6. # You-Dont-Know-JS(168k)

프론트엔드 개발자로서 저는 주로 자바스크립트를 사용합니다. 그러나 자바스크립트는 매우 빠르게 변하므로 매년 새로운 기능과 프레임워크가 등장하여 학습 열정을 유지해야 합니다. 



# 7. 무료이지만 강력한 Api 목록(242k)

애플리케이션을 작성할 무료 데이터를 찾고 있다면, 이 목록이 최선의 선택이 될 것입니다.

음악, 뉴스, 소셜, 날씨 등이 포함되어 있습니다. 이 목록을 정말 좋아합니다. 음악 소프트웨어를 작성하거나 날씨에 관한 웹 사이트를 만드는 등 여러 가지 용도로 사용할 수 있어요.



# 8. # 30-seconds-of-code(112k)

와우! 이 아름다운 검색 페이지를 한번 보세요. 프로그래머의 성향에 아주 잘 맞죠.

![image](/assets/img/2024-05-12-Top15GitHubReposEveryDeveloperShouldKnowAbout_1.png)

여기서 많은 코드 조각을 찾을 수 있어요. 이것들은 우리 업무에서 대부분의 문제를 해결하는 데 사용할 수 있어요.



# 9. 비밀 지식의 책(99.1k)

헤이커들의 백과사전, 기술 블로그, 원 라이너 등을 모두 담고 있어요. 개발자들이 일상적인 작업을 거의 모두 처리할 수 있도록 도와줘요.

# 10. 프런트엔드 개발자 면접 질문들(57.2k)

![이미지](/assets/img/2024-05-12-Top15GitHubReposEveryDeveloperShouldKnowAbout_2.png)



프론트엔드 개발자 인터뷰 준비하는 방법을 모르겠다면, 이 목록에서 적절한 정보를 찾아보세요.

## 11. Gitignore (148k)

새로운 프로젝트를 생성할 때마다 .gitignore 파일을 수동으로 작성해야 했는데, 이 작업은 매우 비효율적이고 엉망입니다.

어느 날, 저는 유용한 .gitignore 템플릿이 많이 있는 보물을 발견했습니다. 정말 멋진 것이죠.



# 12. # 33-js-concepts(56.3k)

JavaScript 개발자가 알아야 할 33가지 개념.

https://github.com/leonardomso/33-js-concepts

# 13. # css-protips(25.4k)



내 친구야, CSS를 배우는 게 JavaScript보다 쉬울 것 같아? 실제로는 CSS를 아주 잘 다루는 개발자라도 매우 어려운 일이죠.

14. # design-resources-for-developers(51.7k)

웹 템플릿, UI 라이브러리, 사진 등 필요한 모든 자원을 제공합니다.

15. # web-skills(6.5k)



10년의 업무 경험에서 기술을 배울 수 있어요

# 간단한 영어로 🚀

In Plain English 커뮤니티의 일원이 되어주셔서 감사합니다! 떠나시기 전에:

- 작가를 clapping하고 팔로우해주세요 👏️️
- 팔로우하기: X | LinkedIn | YouTube | Discord | Newsletter
- 다른 플랫폼 방문하기: Stackademic | CoFeed | Venture | Cubed
- 알고리즘 콘텐츠와 싸우는 블로깅 플랫폼에 지쳤나요? Differ를 시도해보세요
- PlainEnglish.io에서 더 많은 콘텐츠 확인하기