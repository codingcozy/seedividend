---
title: "알고리즘 시각화 프로그램"
description: ""
coverImage: "/assets/img/2024-06-20-AlgorithmVisualiser_0.png"
date: 2024-06-20 00:45
ogImage:
  url: /assets/img/2024-06-20-AlgorithmVisualiser_0.png
tag: Tech
originalTitle: "Algorithm Visualiser"
link: "https://medium.com/@EverusLainus/algorithm-visualiser-608f1f2f7302"
isUpdated: true
---

## HTML, CSS, 및 JavaScript를 사용한 알고리즘 시각화 도구의 기능 구현

<img src="/assets/img/2024-06-20-AlgorithmVisualiser_0.png" />

협력과 혁신이 성공을 이끌어가는 시대에, 저희 다섯 명의 팀은 알고리즘 시각화 도구를 만드는 흥미진한 여정에 들어갔습니다. 이 프로젝트는 우리의 팀워크와 헌신의 증거뿐만 아니라 HTML, CSS, 그리고 JavaScript를 포함한 웹 개발 기초를 탐구하는 것이었습니다.

본문에서는 이 프로젝트에서 구현한 핵심 기능들을 안내해 드리겠습니다.

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

버블 정렬 비주얼라이저:

주어진 값으로 막대를 그렸고 막대마다 값이 적혀 있습니다. 주어진 값들을 배열에 저장하고 버블 정렬 알고리즘을 사용하여 정렬했습니다. 알고리즘에서 값들이 교환될 때마다 해당되는 막대를 강조하고 높이 값을 서로 바꾸었습니다.

```js
/* 코드베이스에서 발췌한 코드 조각 */
for (let i = 0; i < array.length - 1; i++) {
  for (let j = 0; j < array.length - i - 1; j++) {
    for (let k = 0; k < bso_bars.length; k++) {
      if (k !== j && k !== j + 1 && k < l) {
        bso_bars[k].style.backgroundColor = "brown";
      }
    }
    if (array[j] > array[j + 1]) {
      let temp = array[j];
      array[j] = array[j + 1];
      array[j + 1] = temp;

      let tempHeight = bso_bars[j].style.height;
      bso_bars[j].style.height = bso_bars[j + 1].style.height;
      bso_bars[j + 1].style.height = tempHeight;
      bso_bars[j].innerHTML = array[j];
      bso_bars[j + 1].innerHTML = array[j + 1];
      bso_bars[j].style.backgroundColor = "#feb737";
      bso_bars[j + 1].style.backgroundColor = "#feb737";

      await sleep(speed);
    }
  }
  l--;
  bso_bars[l].style.backgroundColor = "#2fb45d";

  await sleep(speed);
}
```

비슷한 방식으로 선택 정렬, 병합 정렬, 퀵 정렬의 비주얼라이저도 만들었습니다.

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

연결 리스트 시각화기:

연결 리스트 시각화기를 만들기 위해 d3 라이브러리(https://d3js.org/)를 사용했어요.

- HTML 컨테이너 요소를 선택하고 해당 컨테이너에 높이, 너비 및 배경색 속성을 가진 SVG 요소를 추가했어요.
- LinkedList 클래스를 정의하여 노드를 삽입하고 삭제하는 메서드로 연결 리스트를 관리했어요. insert 메서드는 지정된 인덱스에 새 노드를 생성하고 추가하거나 인덱스가 제공되지 않으면 끝에 추가해요. delete 메서드는 목록에서 특정 인덱스의 노드를 제거해요.
- Visualise 메서드는 SVG에서 기존 시각 요소를 지워요. 시각화에 필요한 총 너비를 계산하고 텍스트 및 선을 추가하여 머리부터 시작하는 연결 리스트를 시각적으로 나타내요. 목록 노드를 순환하면서 각 노드 데이터에 대한 원과 텍스트를 추가해요. 노드 간의 링크를 나타내기 위해 화살표 마커가 달린 선을 그려요. 목록의 끝을 나타내는 최종 "null" 텍스트를 추가해요.

```js
/* 코드베이스에서의 일부분 */

while (current !== null) {
  const nodeGroup = svg.append("g").attr("class", "node").attr("transform", `translate(${xPos}, ${yPos})`);

  nodeGroup
    .append("circle")
    .attr("r", nodeRadius)
    .attr("stroke", "black")
    .attr("fill", "white")
    .attr("stroke-width", 2);

  nodeGroup.append("text").attr("dy", 5).attr("text-anchor", "middle").text(current.data);

  if (current.next !== null) {
    svg
      .append("line")
      .attr("class", "link")
      .attr("x1", xPos + nodeRadius)
      .attr("y1", yPos)
      .attr("x2", xPos + nodeRadius + nodeMargin)
      .attr("y2", yPos)
      .attr("stroke", "black")
      .attr("marker-end", "url(#arrow)");
  }

  current = current.next;
  xPos += nodeRadius * 2 + nodeMargin;
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

에라토스테네스의 체

- 101개 요소가 있는 배열을 만들어 첫 번째 요소를 true로 지정하고 나머지 요소들은 false로 설정합니다.
- 1부터 100까지의 숫자를 반복하면서 각 숫자의 모든 배수를 소수가 아닌 것으로 표시합니다. 각 반복에서 현재 인덱스와 그 인덱스의 모든 배수를 강조합니다. 소수가 아닌 모든 인덱스를 추적하여 마지막에 모든 소수를 강조합니다.

```js
/* 코드 기반의 일부 */

for (let i = 1; i < 101; i++) {
  if (i == 1) {
    arr[i] = true;
    var cur = document.getElementById(`idx${i}`);
    cur.classList.add("current_cell");
    await sleep(ms);
    cur.classList.remove("current_cell");
    cur.classList.add("not_prime");
    if (flag) {
      return;
    }
    await sleep(ms);
  } else {
    if (!arr[i]) {
      var cur = document.getElementById(`idx${i}`);
      cur.classList.add("current_cell");
      await sleep(ms);
      for (let j = 2; j * i < 101; j++) {
        var multiples = document.getElementById(`idx${i * j}`);
        multiples.classList.add("multiple");
      }
      await sleep(ms);
      for (let j = 2; j * i < 101; j++) {
        var multiples = document.getElementById(`idx${i * j}`);
        multiples.classList.remove("multiple");
        arr[i * j] = true;
        if (flag) {
          return;
        }
        multiples.classList.add("not_prime");
      }
      cur.classList.remove("current_cell");
    }
  }
}
```

참조:

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

의견이나 제안이 있으시면 댓글을 남겨주세요.
