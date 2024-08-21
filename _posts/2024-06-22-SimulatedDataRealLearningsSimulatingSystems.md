---
title: "시뮬레이션 데이터로 배우는 실제 교훈 시스템 시뮬레이션 방법"
description: ""
coverImage: "/assets/img/2024-06-22-SimulatedDataRealLearningsSimulatingSystems_0.png"
date: 2024-06-22 14:24
ogImage:
  url: /assets/img/2024-06-22-SimulatedDataRealLearningsSimulatingSystems_0.png
tag: Tech
originalTitle: "Simulated Data, Real Learnings : Simulating Systems"
link: "https://medium.com/towards-data-science/simulated-data-real-learnings-simulating-systems-79374a9379fd"
isUpdated: true
---

<img src="/assets/img/2024-06-22-SimulatedDataRealLearningsSimulatingSystems_0.png" />

# 소개

시뮬레이션은 데이터 과학 도구 상자에서 강력한 도구입니다. 이 글에서는 시스템 시뮬레이션을 통해 우리가 더 나은 전략을 수립하고 더 나은 결정을 내릴 수 있는 방법에 대해 이야기하겠습니다.

이 글의 구체적인 주제는 다음과 같습니다:

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

시스템 시뮬레이션에 대해 설명해드릴게요. 시스템 시뮬레이션 최적화와 시스템 시뮬레이션 위험 평가에 대해 알아보겠습니다.

이것은 데이터 과학에서 시뮬레이션을 논의하는 다부분 시리즈 중 네 번째 부분입니다. 첫 번째 기사에서는 머신러닝 접근 방식을 테스트하는 데 시뮬레이션이 사용될 수 있는 방법을 다뤘고, 두 번째 기사에서는 디자인된 실험의 파워를 추정하는 데 시뮬레이션을 사용하는 내용을 다뤘으며, 세 번째 기사에서는 시나리오를 시뮬레이션하여 전략을 수립하는 방법을 논의했어요.

이전 기사들의 링크는 다음과 같습니다:

데이터 시뮬레이션이란 무엇인가요?

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

첫 번째 기사는 시뮬레이션을 정의하는 데 훨씬 더 많은 시간을 할애했습니다. 시뮬레이션이 무엇인지에 대해 보다 심층적인 대화를 위해 해당 기사를 참조하세요. 중복을 피하기 위해 여기서는 간단한 정의만 제공하겠습니다:

그럼 그만두고, 시스템 시뮬레이션에 대해 이야기해봅시다!

시스템 모델링

많은 분야에서 데이터 과학자들은 시스템에 관한 질문에 답변해야 합니다. 시스템은 목적을 달성하기 위해 설계된 연결된 구성 요소들의 집합입니다. 시스템은 우리 주변에 많이 있습니다. 항공 운영, 공급망, 대중 교통, 전기 및 배관 시스템 등이 그 예시입니다.

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

시스템을 시뮬레이션할 때는 시스템이 작동하는 방식에 대한 좋은 아이디어가 필요합니다; 시스템이 어떻게 작동하는지에 대한 정말 좋은 아이디어가 필요합니다. 시스템의 구성 요소와 그들이 어떻게 연결되는지에 대해 확실한 이해를 가져야 합니다. 이를 위해 비즈니스 파트너나 도메인 전문가와 상의하거나, 직접 도메인 전문가가 되는 것이 필요합니다 (데이터 과학자가 자신들의 도메인 및 데이터 과학 전문가가 될 수 없다는 규칙은 없습니다!).

![이미지](/assets/img/2024-06-22-SimulatedDataRealLearningsSimulatingSystems_1.png)

시스템 시뮬레이션에는 두 가지 주요 요소가 있습니다. (1) 시스템을 시뮬레이션하고 (2) 시스템을 통해 전달할 데이터를 시뮬레이션하는 것입니다. 시스템의 프레임워크에 대한 좋은 이해를 갖게 되면, 좋아하는 언어를 사용하여 시뮬레이션 시스템을 프로그래밍할 수 있습니다. 그런 다음 시스템을 통해 전달하고 싶은 어떤 종류의 데이터든 시뮬레이트할 수 있습니다. 이 연습의 가치는 우리가 시스템에 입력하는 시뮬레이션 데이터로부터 출력 KPI를 수집하는 것입니다. 우리는 상상할 수 있는 어떤 유효한 입력이라도 시뮬레이트할 수 있으며, 시뮬레이션된 입력 하에서 예상할 수 있는 KPI의 추정치를 얻을 수 있습니다. 이는 매우 강력할 수 있습니다!

시뮬레이션 시스템과 시뮬레이션 데이터를 조정함으로써 가치 있는 통찰력을 많이 얻을 수 있습니다. 시뮬레이션 데이터로 시스템 모델링은 종종 (1) 최적화 및 (2) 리스크 평가에 사용됩니다. 다음에는 이러한 포인트를 다루겠습니다!

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

계속하기 전에, 간단한 고지사항이 있습니다. 때때로 시뮬레이션은 부정(cheating)된 느낌을 줄 수 있습니다 - 왜냐하면 우리는 단지 데이터를 만들어내는 것이기 때문에, 우리의 시뮬레이션이 합리적인 가정에 기반을 두고 있는지 철저히 확인하지 않으면 그렇습니다. 생각해 보세요, 우리가 얻는 통찰력은 우리가 만드는 시뮬레이션만큼이나 좋습니다. 이상한 것을 넣으면, 이상한 것이 나옵니다! 결과를 의사 결정에 활용하기 전에 시뮬레이션에 들어가는 가정을 신중하게 검증했는지를 꼭 확인하세요.

알겠어요, 엄격한 말은 여기서 그만두겠습니다! 이제 예시를 설정하고 시스템 시뮬레이션을 사용하여 최적화와 위험 평가를 어떻게 할 수 있는지 알아보겠습니다!

시스템 모델링 시뮬레이션 예시: 식료품 점포 줄 서는 곳

이 기사의 나머지 부분은 예시를 통해 시스템 시뮬레이션의 힘을 보여줄 것입니다. 저는 2000년대 초반 TV 쇼 '미스터리헌터(Myth Busters)'의 팬입니다. 이 예시를 그들이 시즌 14, 에피소드 5에서 진행한 실험에서 영향을 받았습니다. 이 에피소드에서 그들은 두 가지 식료품 점포 줄 서는 곳 설정을 비교했습니다. 우리는 이 두 설정을 미세 시스템을 사용해서 테스트할 것이고, 물리적인 시스템이 아닌 시뮬레이션 시스템을 활용할 것입니다.

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

다음은 설정입니다: 두 가지 다른 식료품 점 줄 구성을 비교하려고 합니다. (1) 여러 줄, 각각 한 대의 레지스터가 있는 경우와 (2) 여러 레지스터가 있는 한 줄의 경우입니다. 첫 번째 구성은 각 레지스터를 위한 줄이 있고, 두 번째 구성은 여러 레지스터로 이어지는 단일 줄이 있습니다. 아래 시각적 표현을 참조하세요. 쇼핑 경험에서 둘 다 보았을 것입니다.

![image](/assets/img/2024-06-22-SimulatedDataRealLearningsSimulatingSystems_2.png)

우리는 Python에서 시스템 시뮬레이션을 수행할 것입니다. 주로 추적할 메인 메트릭은 줄의 마지막 고객이 기다리는 시간입니다. 따라서 코드는 각 레지스터에 무작위 계산 시간(항목을 스캔하고 지불하는 데 걸리는 시간)을 가진 고객들로 줄 또는 줄을 채우고, 마지막 고객이 기다려야 하는 시간을 추적합니다.

다음은 여러 줄과 여러 레지스터를 시뮬레이션하는 함수입니다:

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
def multiple_lines_trial(number_lines, customers):

    '''
      각 레지스터별로 대기 중인 고객을 보관하는 리스트의 빈 리스트를 만듭니다.

      입력:
        number_lines (int) : 체크아웃 시설의 라인 및 레지스터 수
        customers (list)   : 각 고객의 체크아웃 시간을 나타내는 리스트
                             고객마다 한 번씩
      반환:
        total_wait_time (float) : 마지막 고객이 레지스터에 도착하기까지 기다린 총 시간
    '''

    # 각 레지스터별 빈 리스트를 생성
    lines = [[] for i in range(number_lines)]

    # 마지막 고객의 대기시간을 계산해야 하므로 마지막 고객을 제외한 나머지를 복사
    customers_cp = copy(customers)
    last_customer = customers_cp.pop()

    # 각 고객은 볼 수있는 가장 짧은 라인으로 이동합니다.
    while customers_cp:

        # 가장 짧은 라인에 고객 추가
        temp_cust = customers_cp[0]
        customers_cp = customers_cp[1:]

        line_length_list = [len(lines[i]) for i in range(number_lines)]
        shortest_line = line_length_list.index(min(line_length_list))

        lines[shortest_line].append(temp_cust)

    # 마지막 고객도 가장 짧은 라인을 선택합니다.
    # 마지막 고객이 기다린 총 체크아웃 시간은 가장 짧은 라인의 총합입니다.
    line_length_list = [len(lines[i]) for i in range(number_lines)]
    shortest_line = line_length_list.index(min(line_length_list))

    total_wait_time = sum(lines[shortest_line])

    return total_wait_time
```

이제 한 줄에 여러 레지스터가 있는 경우를 시뮬레이트하는 함수가 있습니다:

```js
def single_line_trial(cashiers, customers):

    '''
      단일 라인으로 다중 레지스터가 있는 체크 아웃 구성의 마지막 고객의 대기 시간을 시뮬레이션합니다.

      입력:
        number_lines (int) : 체크아웃 시설의 라인 및 레지스터 수
        customers (list)   : 각 고객의 체크아웃 시간을 나타내는 리스트
                             고객마다 한 번씩
      반환:
        total_wait_time (float) : 마지막 고객이 레지스터에 도착하기까지 기다린 총 시간
    '''
    # 대기 시간을 나타내는 빈 리스트
    wait_time = []

    # 체크아웃중인 고객 목록 생성
    custm_at_checkout = customers[0:cashiers]

    # 레지스터에 대기중인 고객 수 만큼의 고객을 제거
    customers = customers[cashiers:len(customers)]

    # 각 고객에 대해 반복
    for i in customers:

        # 체크 아웃하는 데 가장 빨리 끝나는 시간 선택
        done_at_checkout = min(custm_at_checkout)

        # 체크 아웃되는 고객의 인덱스 가져오기
        done_index = custm_at_checkout.index(done_at_checkout)

        # 각 고객의 체크아웃 시간에서 가장 짧은 시간을 뺍니다.
        for j, cust in enumerate(custm_at_checkout):
            custm_at_checkout[j] -= done_at_checkout

        # 레지스터에서 체크아웃된 고객을 제거
        custm_at_checkout.pop(done_index)

        # 다음 라인에 대기 중인 다음 고객 추가
        if customers:
            custm_at_checkout.append(customers[0])
        else:
            # 더 이상 대기 중인 고객이 없는 경우 종료
            break

        # 레지스터에 대기 중인 고객 중 가장 빨리 체크 아웃이 끝난 고객을 대기 목록에서 제거
        customers = customers[1:]

        # 대기 시간을 목록에 추가
        wait_time.append(done_at_checkout)

    # 총 대기 시간 합산
    total_wait_time = sum(wait_time)

    return total_wait_time
```

이제 두 가지 구성 아래에서 한 명의 고객의 대기 시간을 시뮬레이션하는 코드가 완성되었습니다! 물론 한 명의 고객의 경험을 시뮬레이션하여 큰 결정을 내릴 수는 없습니다. 여러 명의 고객 대기 시간을 시뮬레이션하는 코드를 함께 작성해 보겠습니다.

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

테이블 태그를 마크다운 형식으로 변경해 드리겠습니다.

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

최적화

좋아, 모든 것을 설정하고 인사이트를 생성하기 준비가 되었어요! 여러 번 언급한 대로, 우리는 우리의 설정을 사용하여 최적의 결정을 내릴 수 있어요.

가장 최적인 라인 구성을 결정해야 해요. 우리가 지금 가지고 있는 프레임워크로 이 답변에 도달하기 위해 시뮬레이션을 실행할 수 있어요! 여러 가지 가능한 경우에 걸쳐 두 구성을 비교하기 위해 레지스터 직원 수와 줄 선 손님 수를 다양하게 변화시키며 여러 번 시뮬레이션을 실행해봐요.

두 접근 방식을 비교하기 위해 다른 함수를 호출하는 함수를 또 작성해봅시다:

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
def compare_trials(cashiers,
                   customer_number,
                   num_trials):
    '''
      두 줄 구성의 여러 시행을 비교합니다.
      각 시행이 짝을 이뤄 비슷한 고객 입력을 두 줄에 같이 전달하고 KPI를 비교합니다.

      입력:
        cashiers (int)        : 캐셔나 레지스터의 수
        customer_number (int) : 시스템에 있는 고객 수
        num_trials (int)      : 실행할 시행 수

      출력:
        single_line_watis (list) : 각 단일 줄 시행의 마지막 고객의 대기 시간 목록
        multi_line_waits (list)  : 각 다중 줄 시행의 마지막 고객의 대기 시간 목록

    '''

    single_line_waits = []
    multi_line_waits = []

    for _ in range(num_trials):
        customers = list(np.random.exponential(0.5, customer_number))

        single_line_wait = single_line_trial(cashiers, customers)
        single_line_waits.append(single_line_wait)

        multi_line_wait = multiple_lines_trial(cashiers, customers)
        multi_line_waits.append(multi_line_wait)

    return single_line_waits, multi_line_waits
```

위 코드를 작성한 후, 이제 시뮬레이션을 실행하고 결과를 시각화하는 몇 가지 코드를 만들어 보겠습니다:

```js
cashier_based_waits = {}

# 다른 캐셔 수에 대해 반복
for cashier in [2, 5, 8]:

    temp_single_wait_times = []
    temp_multi_wait_times = []

    # 다른 고객 수에 대해 반복
    for cust_num in range(10, 150):
        temp_single_line, temp_multi_line = compare_trials(cashier,
                                                           cust_num,
                                                           150)
        # KPI를 모으고 리스트에 저장
        temp_single_mean = np.mean(temp_single_line)
        temp_multi_mean = np.mean(temp_multi_line)

        temp_single_wait_times.append(temp_single_mean)
        temp_multi_wait_times.append(temp_multi_mean)

    cashier_based_waits[cashier] = (temp_single_wait_times,
                                    temp_multi_wait_times)
```

그래프를 그리는 코드는 다음과 같습니다:

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
# 서브플롯 생성
fig, axes = plt.subplots(1, 3, figsize=(15, 5))  # 1행, 3열

x = range(10, 150)

# 각 서브플롯에 데이터 플롯
axes[0].plot(x, cashier_based_waits[2][0], label='단일 라인')
axes[0].plot(x, cashier_based_waits[2][1], label='다중 라인')
axes[0].legend()
axes[0].set_title('2명의 캐셔')
axes[0].set_xlabel('고객 수')
axes[0].set_ylabel('대기 시간')
axes[1].plot(x, cashier_based_waits[5][0], label='단일 라인')
axes[1].plot(x, cashier_based_waits[5][1], label='다중 라인')
axes[1].set_title('5명의 캐셔')
axes[1].set_xlabel('고객 수')
axes[1].set_ylabel('대기 시간')
axes[1].legend()
axes[2].plot(x, cashier_based_waits[8][0], label='단일 라인')
axes[2].plot(x, cashier_based_waits[8][1], label='다중 라인')
axes[2].set_title('8명의 캐셔')
axes[2].set_xlabel('고객 수')
axes[2].set_ylabel('대기 시간')
axes[2].legend()

# 레이아웃 조정
plt.tight_layout()

plt.savefig('wait_times.png')

# 플롯 표시
plt.show()
```

그래, 그것은 많은 작업이었지만, 우리는 마침내 분석 결과를 얻었어요. 한번 살펴보자!

<img src="/assets/img/2024-06-22-SimulatedDataRealLearningsSimulatingSystems_3.png" />

여기서 왜 이런 결과가 나왔을까요? 2명의 캐셔일 때는 두 방식이 본질적으로 같아 보이지만, 캐셔 수가 늘어날수록 차이가 나타나기 시작합니다. 다중 라인 방식은 더 많은 분산을 보이기 시작하고 거의 항상 단일 라인 방식보다 높아집니다. 이는 이해가 됩니다. 왜냐하면 캐셔가 더 많을수록 각 줄이 짧아지기 때문에 (고객 수가 같은 경우) 더 많은 느린 고객이 무작위로 줄에 있을 확률이 높아집니다 (소 샘플 크기의 데이터의 분산에 대해 생각해 보세요). 단일 라인 방식은 여러 레지스터가 서비스하는 한 줄이 있기 때문에 동일한 ‘소 샘플 크기’ 현상에 영향을 받지 않습니다. 이러한 결과를 고려할 때, 외부 요인을 고려할 필요가 없고 시뮬레이션이 현실 세계를 대표한다고 판단된다면 대기 시간이 짧고 덜 변동적인 단일 라인 구성을 사용해야합니다.

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

결정을 내릴 필요가 없고 다시 돌아보지 않아도 돼요! 한 줄 전략으로 전진할 결정을 내린 다음, 저희 매장에서 실제 대기 시간을 관찰하여 예상 결과가 나타나는지 확인할 수 있어요. 싱글 라인을 다중 라인보다 더 우선한다는 저희 시뮬레이션이 올바르다고 100% 확신하지 않는다면 어떨까요? 시뮬레이션 결과를 사용하여 대부분의 매장을 싱글 라인 설정으로 변경(우리가 최적이라고 생각하는 이유로)하고 일부 매장은 다중 라인으로 설정할 수 있어요. 그 후 시뮬레이션 결과가 실제 세계에서 어떻게 진행되는지 관찰할 수 있어요. 시뮬레이션에 대해 100% 확신이 없더라도 우리가 배운 것을 활용하여 실제 세계 실험에서 더 많은 데이터를 수집하는 방법에 영향을 줄 수 있어요.

위험 평가

시스템 모델링과 시뮬레이트된 데이터는 시스템 내의 잠재적 문제, 취약점, 병목 현상을 찾는 데 사용될 수 있어요. 이 분야에서 시스템을 모델링한 후, 시스템의 취약점을 드러내기 위해 극단적인 데이터를 시뮬레이트할 수 있어요.

항공사를 위해 시스템 분석을 실시하는 경우, 덴버 공항이 나쁜 날씨로 인해 2일 동안 휴장된 상황을 나타내는 데이터를 시뮬레이트할 수 있어요. 그러면 이 극단적인 시나리오가 우리 시스템에 어떻게 영향을 미치는지 어디서 얼마나 심각한지를 관찰할 수 있어요. 식료품점 설정의 예로, 레지스터에서 손님 중 소수가 실제로 매우 긴 시간을 소비하는 경우(예: 수표로 결제, 모든 제품에 쿠폰 사용, 보육원용 식료품 구매)에 어떤 일이 벌어질지 시뮬레이트할 수 있어요.

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

시스템 모델에 극단적인 데이터를 시뮬레이션하고 입력함으로써 우리는 시스템이 압력 속에서 어디서 망가지거나 부담을 견디지 못할 지에 대한 통찰력을 얻을 수 있습니다. 이 지식을 통해 우리는 시스템에 극단적 상황에 대비하는 보호장치나 다른 조치를 취할 수 있습니다.

우리가 시뮬레이션된 데이터를 수정하여 고객 중 10%가 계산대에서 3배 더 오래 걸리게 하고, 이로 인해 대기 시간이 어떻게 영향을 받는지 살펴보겠습니다.

여기서, compare_trials 함수에 stress_factor 및 stress_pct 매개변수를 추가했습니다. 이러한 매개변수를 사용하면 사용자가 대기 시간 배율인 stress_factor를 일정 비율의 고객(stress_pct)에 추가할 수 있습니다.

여기가 업데이트된 코드입니다:

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
def compare_trials(cashiers,
                   customer_number,
                   num_trials,
                   stress_factor = 0,
                   stress_pct = 0.10):

 '''
      두 줄 구성의 여러 시도를 비교합니다.
      시스템을 스트레스받게하여 체크아웃 시간이 증가하는 고객을 만들 수 있습니다.
      각 시행이 짝을 이루는 비교임을 유의하십시오. 동일한
      고객 입력을 두 줄에 모두 전달하고 KPI를 비교합니다.

      입력:
        cashiers (int)                 : 캐셔 또는 현금 등록기 수
        customer_number (int)          : 시스템의 고객 수
        num_trials (int)               : 실행될 시행 수
        stress_factor (float, def = 0) : 고객에게 여유 시간에 대한 곱셈기
                                         선택되는 경우 고객의 대기 시간
        stress_pct (float, def = 0.1)  : 확률. 무작위로 선택된 고객 중
                                         스트레스 고객으로 선택될 고객의 비율

      출력:
        single_line_watis (list) : 각 단일 라인 시행의 마지막 고객의 대기 시간 목록

        multi_line_waits (list)  : 각 다중 라인 시행의 마지막 고객의 대기 시간 목록
    '''

    single_line_waits = []
    multi_line_waits = []

    for _ in range(num_trials):
        customers = list(np.random.exponential(0.5, customer_number))

        # 스트레스 요인 추가
        if stress_factor > 0:

            num_slow_custs = int(customer_number * stress_pct)

            slow_cust_index = np.random.choice(range(0, customer_number),
                                               num_slow_custs)

            for i in slow_cust_index:
                customers[i] = customers[i]*stress_factor


        single_line_wait = single_line_trial(cashiers, customers)
        single_line_waits.append(single_line_wait)

        multi_line_wait = multiple_lines_trial(cashiers, customers)
        multi_line_waits.append(multi_line_wait)

    return single_line_waits, multi_line_waits
```

이 새로운 기능을 활용하여, 3명의 캐셔와 100명의 고객이 스트레스 유무로 두 가지 시나리오를 실행해보겠습니다. 그 후, 우리가 선호하는 단일 줄 구성에 대해 스트레스가 대기 시간에 미치는 영향을 살펴보겠습니다.

```js
single_line_stress, (multi_line_stress = compare_trials(3, 100, 100, (stress_factor = 3), (stress_pct = 0.1)));

single_line_no_stress, (multi_line_no_stress = compare_trials(3, 100, 100));

plt.hist(single_line_stress, (label = "스트레스 시나리오"), (alpha = 0.5));
plt.hist(single_line_no_stress, (label = "기준 시나리오"), (alpha = 0.5));
plt.legend();
plt.savefig("stressed_dist.png");
plt.show();
```

<img src="/assets/img/2024-06-22-SimulatedDataRealLearningsSimulatingSystems_4.png" />

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

와우, 10% 느린 고객들이 우리 라인에서 문제를 일으키네요! 우리는 평균 대기 시간이 늘어나는 것뿐만 아니라 분산도 높아졌다는 것을 알 수 있어요! 이제 느린 고객들과 관련된 도전에 대한 어려움을 정량화할 수 있어요. 스트레스 테스트 결과가 저희의 허용 한계를 초과한다고 느껴진다면, 잠재적인 완화 전략을 살펴볼 수 있을 거예요. 아마도 다른 지역에서 일하는 보조 직원을 추가로 고용해서 필요할 때 호출하여 평소에 열지 않는 레지스터에서 느린 고객을 처리할 수 있을 거예요. 또한, 극도로 느린 대기 시간을 일으키는 요인을 찾아내고, 캐셔들에게 과정을 가속화하는 기술을 교육할 수도 있을 거예요.

가장 중요한 점은 우리 시스템에 특정 압력의 영향을 정량화할 수 있고, 이해를 바탕으로 극단적인 상황에서도 시스템이 내한 범위 내에서 성능을 발휘할 수 있도록 상응하는 대책을 만들 수 있다는 것이에요.

마치며

시스템 시뮬레이션은 현실 세계 시스템에 대한 통찰력을 얻기 위한 비용 효율적이고 유연한 방법입니다. 모의 시스템과 데이터는 시스템을 최적화하여 효율성을 높이는 데 사용할 수 있습니다. 또한 극단적인 시나리오에 대한 시스템을 스트레스 테스트하기 위해 사용될 수 있습니다. 모의 시나리오와 데이터가 실제 세계를 대표한다는 것을 확실히 해야 합니다. 만약 생성한 통찰력에 대한 신뢰가 있다면 즉시 시행할 수 있지만, 이를 통해 추가 정보에 대한 확신을 얻기 위해 테스트 전략을 통해 테스트할 수도 있습니다.
