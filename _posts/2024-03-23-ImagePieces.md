---
title: "HTML, CSS, JS로 이미지 나눠지는 페이지 만드는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage:
  url:
tag: Tech
originalTitle: "Image Pieces"
link: "https://medium.com/@saurabh.kayasth10/image-pieces-f7fabad2e2be"
isUpdated: true
---

오늘은 CSS 세계로 들어가서 두 가지 필수 CSS 속성, background-size와 background-position에 초점을 맞추게 됩니다. 우리의 목표는 하나의 이미지를 여러 조각으로 나누는 것입니다. 그런데 왜 그러냐구요? 이 조각들을 정확하게 배열하여 하나의 일치하는 이미지처럼 보이도록 함으로써, 우리는 마법 같은 이편한 CSS 마법을 통해 분명한 이미지를 만들어 낼 수 있습니다!

하지만 잠깐, 여기서 반전이 있습니다: 이미지를 실제로 나누지는 않을 거에요. 대신 이미지 div들을 여럿 만들어서 서로 연결하고, 이들의 배경 위치와 크기를 설정하여 나란히 배치하면, 하나의 단일 이미지처럼 보일 수 있도록 할 겁니다.

요컨대, 우리는 여러 조각으로 나뉘어진 하나의 이미지인 것처럼 보이는 환상을 만들고 있습니다. 그리고 그 마법 같은 것에 더해, 그 조각들은 서로 멀어지고 다시 모이는 듯한 애니메이션을 가지고 있어, 매혹적인 시각 효과를 만들어 냅니다.

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

아주 최적화된 방법들이 있을 수도 있지만, 나는 이 방법이 재미있고 도전적이라고 생각했어.

자, 코딩을 시작해보자.

행과 열의 수: 이 함수는 요소의 총 수를 기반으로 그리드 레이아웃을 배열하는 최적의 행과 열의 수를 계산해.

```js
export function calculateGridDimensions(numberOfPieces: number): GridDimensions {
  const idealGridSize = Math.ceil(Math.sqrt(numberOfPieces));

  let columns = idealGridSize;
  let rows = Math.ceil(numberOfPieces / columns);

  while (columns * rows > numberOfPieces) {
    columns -= 1;
    rows = Math.ceil(numberOfPieces / columns);
  }

  return { rows, columns };
}
```

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

Piece Dimension: 이 함수는 그리드 레이아웃의 총 너비와 높이, 그리고 조각의 수에 기반하여 각 조각의 치수를 계산합니다. 먼저 calculateGridDimensions 함수를 사용하여 그리드 치수를 결정한 후, 총 너비와 높이를 각각 행 수 및 열 수로 나누어 각 조각의 치수를 얻습니다. 마지막으로, 각 조각의 너비와 높이를 객체 형태로 반환합니다.

```js
export function calculatePieceDimensions(width: number, height: number, numberOfPieces: number): PieceDimensions {
  const { rows, columns } = calculateGridDimensions(numberOfPieces);

  const pieceWidth = width / rows;
  const pieceHeight = height / columns;

  return { width: pieceWidth, height: pieceHeight };
}
```

Piece Position: 이 함수는 조각의 인덱스, 전체 조각 수, 그리드 치수를 기반으로 그리드 내에서 조각의 위치를 계산합니다. 인덱스가 유효한지 확인한 후, 조각의 위치를 그리드 내에서 결정합니다 (예: 좌측 상단, 우측 하단 등).

```js
export function calculatePiecePosition(
  index: number,
  numberOfPieces: number,
  gridDimensions: GridDimensions
): PiecePosition | null {
  if (index < 0 || index >= numberOfPieces) {
    console.error("잘못된 인덱스입니다.");
    return null;
  }

  const row = Math.floor(index / gridDimensions.rows);
  const col = index % gridDimensions.rows;

  const isTop = row === 0;
  const isBottom = row === gridDimensions.columns - 1;
  const isLeft = col === 0;
  const isRight = col === gridDimensions.rows - 1;

  if (isTop && isLeft) return PiecePosition.TOP_LEFT;
  if (isTop && isRight) return PiecePosition.TOP_RIGHT;
  if (isBottom && isLeft) return PiecePosition.BOTTOM_LEFT;
  if (isBottom && isRight) return PiecePosition.BOTTOM_RIGHT;
  if (isLeft) return PiecePosition.LEFT;
  if (isTop) return PiecePosition.TOP;
  if (isRight) return PiecePosition.RIGHT;
  if (isBottom) return PiecePosition.BOTTOM;

  return PiecePosition.CENTER;
}
```

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

위치에 따른 조각 애니메이션: 블로그를 간단하게 유지하기 위해 GitHub 링크를 추가했습니다.

[Github](https://github.com/Saurabh-kayasth/react-img-pieces/blob/master/src/Animations/styles.module.css)

조각 스타일: 이 함수는 조각이 그리드 레이아웃 내에서 인덱스, 총 너비, 높이 및 조각 수에 따라 스타일(배경 위치 및 크기)를 계산합니다. 먼저 그리드 차원과 각 조각의 차원을 계산한 다음, 조각을 그리드에 상대적으로 배치한 배경 위치와 크기를 결정합니다.

```js
export function calculatePieceStyles(
  index: number,
  width: number,
  height: number,
  numberOfPieces: number
): PieceStyles | null {
  const gridDimensions = calculateGridDimensions(numberOfPieces);

  const pieceDimensions = calculatePieceDimensions(width, height, numberOfPieces);

  const { rows: columns, columns: rows } = gridDimensions;
  const { width: pieceWidth, height: pieceHeight } = pieceDimensions;

  const row = Math.floor(index / gridDimensions.rows);
  const col = index % gridDimensions.rows;

  const backgroundSizeX = pieceWidth * columns;
  const backgroundSizeY = pieceHeight * rows;
  const backgroundSize = `${backgroundSizeX}px ${backgroundSizeY}px`;

  const shiftXBy = columns > 1 ? 100 / (columns - 1) : 100;
  const shiftYBy = rows > 1 ? 100 / (rows - 1) : 100;
  const backgroundPositionX = col * shiftXBy;
  const backgroundPositionY = row * shiftYBy;
  const backgroundPosition = `${backgroundPositionX}% ${backgroundPositionY}%`;

  return {
    backgroundPosition,
    backgroundSize,
  };
}
```

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

마지막 단계로 조각들을 합쳐봅시다!

```js
import React from 'react'
import styles from './Animations/styles.module.css'
import {
  calculateGridDimensions,
  calculatePieceDimensions,
  calculatePiecePosition,
  calculatePieceStyles
} from './Animations/utils'
import { type AnimationsComponentProps } from './types'

export const ImagePiece = (
  props: AnimationsComponentProps
): React.JSX.Element => {
  const {
    imgSrc,
    height: CONTAINER_HEIGHT,
    width: CONTAINER_WIDTH,
    pieces: PIECES,
    animationDirection = 'normal',
    animationDuration = '1s',
    animationIterationCount = 'infinite'
  } = props

  function createNumberArray(): number[] {
    const result: number[] = []
    for (let i = 1; i <= PIECES; i += 1) {
      result.push(i)
    }
    return result
  }

  const pieceDimensions = calculatePieceDimensions(
    CONTAINER_WIDTH,
    CONTAINER_HEIGHT,
    PIECES
  )

  return (
    <div>
      <div
        className={styles.container}
        style={ width: CONTAINER_WIDTH, height: CONTAINER_HEIGHT }
      >
        {createNumberArray().map((item, index) => {
          const { width, height } = pieceDimensions

          return (
            <div
              key={item}
              style={
                width,
                height,
                animationIterationCount,
                animationDuration,
                animationDirection,
                backgroundImage: `url(${imgSrc})`,
                ...calculatePieceStyles(
                  index,
                  CONTAINER_WIDTH,
                  CONTAINER_HEIGHT,
                  PIECES
                )
              }
              className={`${styles.piece} ${
                styles[
                  `piece_${calculatePiecePosition(
                    index,
                    PIECES,
                    calculateGridDimensions(PIECES)
                  )}`
                ]
              }`}
            />
          )
        })}
      </div>
    </div>
  )
}
```

![이미지](https://miro.medium.com/v2/resize:fit:1028/1*EmKEdlU7saaqS_2owuuvOQ.gif)

**결론:**

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

마지막으로, CSS 속성인 background-size와 background-position과 같은 속성들이 하나의 이미지를 이동하는 조각들의 동적 모자이크로 변환시킬 수 있다는 것을 살펴보았습니다. 이러한 속성들을 창의적으로 사용함으로써, 매력적인 동작을 하는 이미지를 만들어보았습니다. 여러분도 직접 시도해보고 싶다면, React 프로젝트에서 이러한 애니메이션을 쉽게 만들 수 있도록 만든 'react-img-pieces'라는 npm 패키지를 확인해보세요.

다만, 이 기법은 시각적으로 놀라운 결과물을 만들어내지만 고려해야 할 문제가 하나 있습니다. 수천 개와 같이 대량의 이미지 조각을 다룰 때 성능 문제가 발생할 수 있습니다.

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

읽어 주셔서 감사합니다! 코딩 즐기세요!
