---
title: "고객 사이드 페이지 성능 확인 목록"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Client side page performance check-list"
link: "https://medium.com/@chhavikhandelwal/client-side-page-performance-check-list-c62f21884bd8"
isUpdated: true
---

퍼포먼스는 소프트웨어 개발에서 중요한 지표 중 하나입니다. 클라이언트 측 퍼포먼스는 사용자 경험과 직접적으로 관련이 있기 때문에 주목할 가치가 있습니다. 페이지 퍼포먼스를 위한 포괄적인 체크리스트를 구현함으로써 웹 개발자와 디자이너들은 웹사이트가 빠르게 로드되고, 다양한 기기에서 반응이 빠르며, 콘텐츠를 효율적으로 전달할 수 있도록 보장할 수 있습니다.

더 나은 페이지 퍼포먼스를 위해 클라이언트 측 코드를 작성할 때 염두에 둘 사항들은 다음과 같습니다:

- DOM 노드 감소
- 반복되는 요소 제거
- 요소의 로딩을 지연(lazy loading)
- :before 또는 :after를 이용해 CSS 가상 요소로 DOM 교체
- CSS 배경을 사용하여 SVG를 img로 렌더링하는 인라인 SVG 교체

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

```js
background-image: url("data:image/svg+xml, ${encodeURIcomponent(mysvg)}");
```

2. REACT 재렌더링 줄이기

- 상태가 없는 자식 컴포넌트
- 재렌더링을 줄이기 위해 redux 사용
- shouldComponentUpdate 사용해서 재렌더링 제어
- React.PureComponent 사용
  현재와 다음 props 간의 얕은 비교를 수행하여 변경 사항이 있을 때만 업데이트합니다.
- 얕은 비교를 위해 React.memo로 감싸기
- 올바른 상태 관리
  로컬 상태 사용 시점 파악; flux/redux를 사용하여 불변 상태 유지; HOC; Context, React hooks(불필요한 재랜더링 및 재계산을 줄이기 위해).

3. 스크립트를 head에서 body 하단으로 이동하여 블로킹되지 않도록 하기

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

4. 이미지 크기를 줄이세요

5. node_modules를 현명하게 선택하세요

- 가능하다면 lib 대신 util 함수를 선호하세요.
- google maps 라이브러리 대신 react 패키지를 사용하는 것을 선호하세요. 예: react/google-maps.

6. lodash에 주의하세요

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

- 적절한 임포트 사용

7. 제품 번들 확인

- babel-plugin 변환 및 react-remove-prop

8. 자산을 언제 어떻게 가져오는지 감사하세요

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

9. Redis를 사용하여 자산 사전 로드

10. 웹팩 번들 최적화

- 중간 규모의 작은 청크들이 더 많고 더 적은 큰 청크들

11. UI 구성 요소의 지연 로딩

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

12. 각 빌드마다 성능 모니터링 추가하기

- 번들 사이즈 기록해보기
- 모니터링을 위해 Lighthouse 사용하기

체크리스트는 프로젝트에 따라 다를 수 있습니다. 하지만 이런 점을 염두에 두는 것이 좋습니다. 페이지 성능 최적화는 사용자에게 원활하고 즐거운 브라우징 경험을 제공하는 데 중요합니다. 속도와 성능이 중요시되는 디지털 환경에서는 이러한 최적화 전략을 받아들이는 것이 오늘날 경쟁력 있는 온라인 시장에서 성공을 거두는 데 필수적입니다.
