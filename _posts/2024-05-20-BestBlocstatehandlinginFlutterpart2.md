---
title: "플러터에서 최고의 Bloc 상태 관리 파트 2"
description: ""
coverImage: "/assets/img/2024-05-20-BestBlocstatehandlinginFlutterpart2_0.png"
date: 2024-05-20 23:15
ogImage:
  url: /assets/img/2024-05-20-BestBlocstatehandlinginFlutterpart2_0.png
tag: Tech
originalTitle: "Best Bloc state handling in Flutter (part 2)"
link: "https://medium.com/@moeinmoradi.dev/best-bloc-state-handling-in-flutter-part-2-a518b68dbc65"
isUpdated: true
---

안녕하세요, 친구들,
첫 번째 파트에 대한 좋은 피드백에 기쁩니다.
이번 파트에서는 디자인에서 EventStatus를 사용하는 방법을 가르치고 디자인의 모든 상태를 다루는 것을 알려드리고 싶어요.

![이미지](https://miro.medium.com/v2/resize:fit:580/1*wL6d8JPLeO4MbkwBPLHwcA.gif)

지난 파트에서는 Bloc_state에서 상태를 다루기위해 EventStatus 클래스를 사용했었습니다.

https://medium.com/@moeinmoradi.dev/best-bloc-state-handling-in-flutter-0f95a8e89e40

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

제 친구 한 명의 제안에 따라, EventStatus 클래스에 대해 좀 더 나은 컨셉을 제안하고 그 이름을 StateStatus로 변경해보겠습니다. 다음과 같이 변경해주세요.

```js
@immutable
abstract class StateStatus<T> {
  final int? itemId;
  final T? data;
  final ErrorModel? message;

  const StateStatus({
    this.itemId,
    this.data,
    this.message,
  });
}

class StateLoading<T> extends StateStatus<T> {
  const StateLoading({super.itemId});
}

class StateCompleted<T> extends StateStatus<T> {
  const StateCompleted({required super.data});
}

class StateInitial<T> extends StateStatus<T> {}

class StateError<T> extends StateStatus<T> {
  const StateError({required super.message});
}
```

좋아요, StateStatusLayout를 위한 클래스를 만들어봅시다.

# StateStatusLayout

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

StateStatus에 따라 다른 디자인 상태를 표시하는 클래스가 필요합니다. 이 클래스는 각 상태와 해당 위젯을 표시할 수 있어야 합니다.

이 클래스에서 BlocBuilder로부터 StateStatus를 받고 States에 따라 위젯을 반환했습니다 :

```js
class StateStatusLayout<T> extends StatelessWidget {
  final StateStatus<T> status;
  final Widget onErrorStatus;
  final void Function(ErrorModel error)? onErrorListener;
  final Widget Function(BuildContext context, T? data) onCompletedStatus;
  final Widget onInitialStatus;
  final Widget onLoadingStatus;
  const StateStatusLayout({
    super.key,
    required this.status,
    required this.onCompletedStatus,
    required this.onErrorStatus,
    required this.onInitialStatus,
    required this.onLoadingStatus,
    this.onErrorListener,
  });

  @override
  Widget build(BuildContext context) {
    if (status is StateError) {
      if (onErrorListener != null) {
        onErrorListener!(status.message!);
      }
    }
    if (status is StateCompleted) {
      return StreamBuilder(
        stream: Stream.value(status),
        builder: (context, snapshot) {
          log(status.data!.toString());
          return onCompletedStatus(context, status.data);
        },
      );
    }
    if (status is StateError) {
      return onErrorStatus;
    }
    if (status is StateInitial) {
      return onInitialStatus;
    }
    if (status is StateLoading) {
      return onLoadingStatus;
    }
    return Container();
  }
}
```

그런데, StateCompleted 조건을 살펴보세요. 데이터를 표시하기 위해 StreamBuilder를 사용했습니다. 이것에 대해 어떻게 생각하시나요?

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

![image](https://miro.medium.com/v2/resize:fit:700/1*I6k_gZJ0KRZYR4KU22Okig.gif)

가끔 블록 쪽에서 데이터를 페이지네이션하거나 스트리밍해야 할 때, 위젯은 반드시 모든 상황에서 업데이트되어야 합니다. 그리고 위젯에서 오류가 발생하지 않도록하기 위해 이러한 가능한 상황을 고려하기 위해 StreamBuilder를 사용합니다.

간단한 샘플 코드를 보여드리겠습니다. StateStatusLayout을 사용한 코드입니다:

```js
import 'package:flutter/material.dart';

class ShowLayout extends StatelessWidget {
  const ShowLayout({Key? key});

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<ShowBloc, ShowState>(
        builder: (context, state) {
          return StateStatusLayout(
            status: state.showsStatus,
            onCompletedStatus: (context, data) {
              return GridView.count(
                shrinkWrap: true,
                padding: const EdgeInsets.all(10),
                physics: const ClampingScrollPhysics(),
                crossAxisSpacing: 10,
                mainAxisSpacing: 20,
                crossAxisCount: 4,
                childAspectRatio: 9 / 16,
                children: List.generate(data!.shows!.length, (index) {
                  ShowModel item = data.shows![index];
                  return ShowCard(
                      show: item,
                      onSelected: () {
                        /// do Somethigs...
                      },
                    );
                }),
              );
            },
            onErrorStatus: const SizedBox(),
            onInitialStatus: const SizedBox(),
            onLoadingStatus: Padding(
              padding: const EdgeInsets.all(48.0),
              child: SizedBox(
                width: 50,
                height: 50,
                child: SpinKitRipple(
                  color: themeData.colorScheme.secondary,
                  size: 40,
                ),
              ),
            ),
          );
        },
      );
  }
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

이 샘플 코드에서는 Bloc이 emit() 함수로 갱신될 때 showsStatus 상태에 대한 onCompletedStatus 및 onLoadingStatus를 처리했습니다.

![이미지](https://miro.medium.com/v2/resize:fit:1280/1*XwwugAFY35KNciVoDHThEw.gif)

## 지금까지 함께 해주셔서 감사합니다

나와 함께 계속 이야기를 공유해주시고 피드백을 기다리고 있습니다. 분들의 소중한 의견을 기다리고 있습니다. 🙏
