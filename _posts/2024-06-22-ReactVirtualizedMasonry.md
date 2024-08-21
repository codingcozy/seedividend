---
title: "React Virtualized로 Masonry 레이아웃 구현하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-ReactVirtualizedMasonry_0.png"
date: 2024-06-22 14:51
ogImage:
  url: /assets/img/2024-06-22-ReactVirtualizedMasonry_0.png
tag: Tech
originalTitle: "React Virtualized Masonry"
link: "https://medium.com/@onix_react/react-virtualized-masonry-221c7a4f297b"
isUpdated: true
---

![React Virtualized Masonry](/assets/img/2024-06-22-ReactVirtualizedMasonry_0.png)

웹 개발 분야에서 특히 대규모 데이터셋과 복잡한 레이아웃을 다룰 때는 성능을 유지하면서 부드러운 사용자 경험을 제공하는 것이 중요합니다. 이 균형을 달성하는 강력한 방법 중 하나는 React Virtualized와 Masonry를 함께 사용하는 것입니다. 이 다이내믹한 콤보는 다양한 높이의 항목 그리드를 렌더링하고 관리하는 효율적인 솔루션을 제공하여 가시적인 항목만 렌더링함으로써 최적의 성능을 보장합니다.

# Masonry 사용 이유

Masonry 컴포넌트 소개

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

Masonry 구성 요소는 윈도잉 기술을 사용하여 동적으로 크기가 조정되고 사용자가 위치를 지정한 셀을 효율적으로 표시합니다. 셀의 위치는 삽입된 cellPositioner 속성으로 제어됩니다. 윈도잉은 수직 방향이며, 이 구성 요소는 수평 스크롤을 지원하지 않습니다.

향상된 사용자 경험

인터페이스를 직관적으로 만들어 Masonry는 사용자들의 학습 곡선을 줄입니다. 사용자들이 자연스럽게 요소와 상호 작용할 수 있게 하여 참여도와 만족도를 높입니다.

생산성 향상

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

사용자들은 요소를 빠르게 재배열할 수 있어서 더 효율적인 작업 흐름을 이끌어냅니다. 특히 프로젝트 관리 도구나 디자인 소프트웨어와 같이 구성 요소를 자주 재조직해야 하는 애플리케이션에서 특히 유용합니다.

유연성

매소네리는 파일 관리 시스템부터 복잡한 웹 애플리케이션까지 다양한 용례에 적응할 수 있습니다. 다양한 플랫폼에서 일관된 상호작용 모델을 제공합니다.

미적 매력

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

현대적이고 세련된 외관으로, Masonry는 응용 프로그램을 시각적으로 매력적으로 만듭니다. 부드러운 전환과 애니메이션은 정교한 사용자 인터페이스를 형성하며 전반적인 사용자 경험을 향상시킵니다.

# Masonry의 주요 기능

측정 및 레이아웃

- 측정: 처음에 Masonry는 셀MeasurerCache 속성에서 제공된 추정된 셀 크기를 사용하여 배치에서 얼마나 많은 셀을 측정할지 결정합니다.
- 레이아웃 알고리즘: 빠르고 단순한 레이아웃 알고리즘은 이미지를 순서대로 쌓아 뷰포트가 채워질 때까지 진행됩니다.
- 캐싱: 모든 측정값은 성능을 위해 캐시되며, keyMapper에서 제공된 키를 사용합니다.

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

위치 지정 및 캐싱

- 위치 지정: 외부 cellPositioner는 캐싸이즈 측정을 사용하여 셀을 위치시킵니다.
- 캐싱: 위치 지정기가 반환하는 위치는 Masonry에 의해 빠르게 액세스할 수 있도록 캐시됩니다.
- 재계산: 사용자가 현재 레이아웃 경계를 벗어나거나 레이아웃이 무효화된 경우, 캐시된 위치를 지우고 recomputeCellPositions() 또는 clearCellPositions()를 사용하여 다시 계산할 수 있습니다.

애니메이션 및 레이아웃 제약 조건

- 간단한 애니메이션: 기본 애니메이션으로 사용자 경험을 향상시킵니다.
- 복잡한 애니메이션: 더 복잡한 애니메이션은 지원되지 않으며, 성능과 간단함에 중점을 두고 있습니다.
- 다중 열 레이아웃: 각 항목이 고유한 게으르게 측정된 높이를 가질 수 있도록 지원하는 다중 열을 지원합니다.
- 폭 동일: 열의 모든 항목은 동일한 너비를 가져야 합니다. 항목은 여러 열에 걸칠 수 없습니다.
- 동기식 측정: 빈번한 레이아웃 무효화를 피하기 위해 셀 측정은 동기적이어야 합니다.

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

# 공용 메소드

- clearCellPositions: 내부 위치 캐시를 지우고 강제 업데이트를 수행하여 레이아웃을 무효화하는 데 유용합니다.
- recomputeCellPositions: 내부 위치 캐시를 재설정하고 위치를 다시 계산하여 업데이트를 강제하여 레이아웃이 정확하도록합니다.
- cellRenderer: 셀의 인덱스를 제공하여 단일 셀을 렌더링하는 데 책임이 있으며 셀이 표시되는 방식에 유연성을 제공합니다.
- createMasonryCellPositioner: 간단한 레이아웃을 위한 내장 위치지정자를 제공하여 설정 프로세스를 간소화합니다.

![이미지](/assets/img/2024-06-22-ReactVirtualizedMasonry_1.png)

# 속성 유형

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

React Virtualized Masonry에서 Prop Types는 컴포넌트에서 사용되는 다양한 속성(prop)의 예상 데이터 유형을 정의하고 강제하는 방법입니다. 이들은 올바른 데이터가 컴포넌트로 전달되도록 보장하여 잠재적인 오류를 줄이고 코드 신뢰성을 향상시키는 데 도움이 됩니다.

Prop types에 대한 자세한 정보는 👉 여기에서 찾을 수 있습니다.

# React Virtualized Masonry 구현

다음은 React Virtualized를 사용하여 Masonry 레이아웃을 만드는 방법을 실제 예제로 보여줍니다. 이 예제는 항목 목록을 만들고 CellMeasurerCache를 사용하여 항목의 크기를 캐시합니다. cellPositioner는 셀을 세 개의 열이 있는 그리드에 배치하는 데 도움을 줍니다. 각 셀은 항목의 이미지와 캡션을 포함하는 CellMeasurer 컴포넌트를 반환하는 cellRenderer 함수를 사용하여 렌더링됩니다.

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
const cellPositioner = createMasonry(cellPositionerConfig);

const MasonryComponent = ({ itemsWithSizes, setRef }) => {
  const cellRenderer = ({ index, key, parent, style }) => {
    const { item, size } = itemsWithSizes[index];
    const height = columnWidth * (size.height / size.width) || defaultHeight;

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>
          <div>{item.title}</div>
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              style={{
                height: height,
                width: columnWidth,
                display: "block",
              }}
            />
          )}
        </div>
      </CellMeasurer>
    );
  };

  return (
    <Masonry
      cellCount={itemsWithSizes.length}
      cellMeasurerCache={cache}
      cellPositioner={cellPositioner}
      cellRenderer={cellRenderer}
      height={600}
      width={800}
      keyMapper={keyMapper}
      ref={setRef}
    />
  );
};
```

전체 코드 예제는 👉 codesandbox에서 확인할 수 있습니다.

<img src="https://miro.medium.com/v2/resize:fit:1200/1*Tb6VpBuPf_6Oav1kin8-Og.gif" />

# 마무리

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

React Virtualized과 Masonry를 결합하면 그리드 내에서 동적 크기의 사용자 위치 지정 셀을 처리하는 효율적인 방법을 제공합니다. 예제 코드는 측정 및 레이아웃 단계가 최적의 성능을 위해 중요함을 강조하며 통합을 보여줍니다. 이 조합은 대규모 데이터셋을 다루는 복잡한 레이아웃을 React 애플리케이션에서 효과적으로 관리하는 견고한 해결책이며 반응성과 부드러운 사용자 경험을 보장합니다.

텔레그램 / 인스타그램 / 페이스북 / 스레드 / 깃허브
