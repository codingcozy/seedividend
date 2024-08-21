---
title: "AWS가 CodeCommit을 중단한 이유"
description: ""
coverImage: "/assets/img/2024-08-17-DevOpsShockedAWSKillsItsOwnGitHubCompetitorCodeCommit_0.png"
date: 2024-08-17 01:11
ogImage:
  url: /assets/img/2024-08-17-DevOpsShockedAWSKillsItsOwnGitHubCompetitorCodeCommit_0.png
tag: Tech
originalTitle: " DevOps Shocked AWS Kills Its Own GitHub Competitor  CodeCommit"
link: "https://medium.com/@tomaszs2/devops-shocked-aws-kills-its-own-github-competitor-codecommit-8fcf6f9c2de4"
isUpdated: true
updatedAt: 1723864154592
---

![Image](/assets/img/2024-08-17-DevOpsShockedAWSKillsItsOwnGitHubCompetitorCodeCommit_0.png)

# 아마존 웹 서비스(AWS)가 레포지토리가 필요 없다고 한답니다. 계속 있을 수는 있지만, 이전 안내와 기한은 없어요. 모든 게 괜찮아요 🫨

보통 서비스를 폐지하는 것을 말하면 우리는 자동적으로 구글을 떠올리곤 합니다. 그러나 이번에는 아마존 웹 서비스가 스톱을 누르고 있습니다.

AWS의 수석 전도사인 Jeff Barr은 자신의 트윗에서 CodeCommit과 다른 몇 가지 서비스가 가방을 싸는 것을 언급했습니다:

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
많은 생각 끝에, AWS CodeCommit을 포함한 소수의 서비스에 대한 새로운 액세스를 중단하기로 결정했습니다.

이러한 서비스에 대해 새로운 고객을 추가로 영입하지는 않지만, 현재 얻는 기능이나 경험을 변경할 계획은 없으며, 안전하고 신뢰할 수 있게 유지할 것입니다.

또한 귀하의 변화하는 요구 사항과 더 잘 부합하는 다른 AWS 또는 제3자 솔루션으로의 이전을 지원합니다. 계속해서 피드백을 제공해주시기 바랍니다. 우리는 늘 귀하의 의견을 듣고 있습니다.
```

회사용에서 일반어로 해석하면:

```js
일부 서비스를 단계적으로 중단할 예정입니다.
좋은 소식이죠. 안녕히 주무세요.
```

기존 고객은 계속 사용할 수 있습니다. 그러나 얼마나 오래 사용할 수 있는지는 확실하지 않습니다.

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

하지만 결국 어떤 서비스가 영향을 받는지 배웠어요:

```js
제가 말하는 서비스는 다음과 같아요: S3 Select, CloudSearch, Cloud9, SimpleDB, Forecast, Data Pipeline, 그리고 CodeCommit.
```

정말 충격적인 소식이죠. 특히 S3 Select와 CodeCommit에 대해요.

후자는 GitHub의 AWS 복제본이랍니다. 미니멀리스트에게 좋은 선택이죠.

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

AWS가 왜 조용히 이를 수행하는지 이해하지 못하겠어요. 즉, 이 소식이 나오는 소셜 미디어 플랫폼에서 테일러 스위프트와 제프 바르를 팔로우하는 사람만이 아니라 많은 사람들이 있지 않기 때문입니다. 이미 이 서비스를 사용하고 있거나 널리 사용할 계획을 가지고 있던 사람들에게는 이 정보가 상당히 중요합니다.

CodeCommit과 그 저장소는 많은 프로덕션 시스템의 일부입니다.

안타깝게도, AWS가 더 나은 것을 위한 자리를 만드는 것은 아닙니다. 사실, 그들이 더는 저장소를 제공하지 않을 것처럼 보입니다.

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

공식 이전 가이드에 따르면 GitHub와 GitLab을 포함하고 있다는 것이 내 이해입니다.

정직하게 말하자면, 저장소를 이동하는 과정은 그렇게 어렵지 않습니다. 그러나 AWS에서 서로 연결된 모든 구성 요소를 이동하는 것은 어려울 수 있습니다.

이렇게 중요한 소식이 마감 기한과 함께 제공되지 않는 것도 놀라운 일입니다. 상황을 더 혼동스럽게 만드는 것뿐입니다.

하지만 좋은 소식은 GitHub나 다른 저장소가 CodeCommit보다 나은 것입니다. 그래서 모든 작업을 마친 후에는 케이크가 있을 것입니다.

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

AWS에 관한 이야기를 할 때, 사실 이건 조금 이상한 움직임이에요. 이렇게 오랫동안 아마존은 우리에게 AWS 안으로 모든 것을 옮기라고 해왔죠. 그래서 어느 정도까지는 AWS 스마트폰도 출시해도 괜찮을 것 같은데요.

하지만 이제 AWS가 몇 가지 서비스를 외부로 내보내려고 하고 있어요. 왜 그럴까요? 그들이 청구서를 낼 때 유지비를 지불하지 않았나요? CPU, 저장소, 전송량을 충분히 사용하지 않았다고요?

DevOps에서는 저장소가 시스템의 중심 부분이에요. 이걸 외부로 옮기면 AWS는 더 이상 완전한 솔루션이 아니게 될거에요.

개발의 핵심을 AWS 외부로 옮기면 새로운 기회들이 열립니다.

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

코딩에 관한 더 많은 소식을 얻으려면 팔로우, 구독 및 박수를 눌러주세요!
