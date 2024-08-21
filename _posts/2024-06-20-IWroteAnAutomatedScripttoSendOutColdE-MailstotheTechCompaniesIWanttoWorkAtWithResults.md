---
title: "내가 원하는 테크 회사에 자동 이메일을 보내는 스크립트를 작성했어요 결과 포함"
description: ""
coverImage: "/assets/img/2024-06-20-IWroteAnAutomatedScripttoSendOutColdE-MailstotheTechCompaniesIWanttoWorkAtWithResults_0.png"
date: 2024-06-20 04:35
ogImage:
  url: /assets/img/2024-06-20-IWroteAnAutomatedScripttoSendOutColdE-MailstotheTechCompaniesIWanttoWorkAtWithResults_0.png
tag: Tech
originalTitle: "I Wrote An Automated Script to Send Out Cold E-Mails to the Tech Companies I Want to Work At (With Results)"
link: "https://medium.com/@priyanshu-shkl7/i-wrote-a-script-to-send-out-cold-e-mails-to-the-tech-companies-i-want-to-work-at-with-results-ab9647ea4ee2"
isUpdated: true
---

<img src="/assets/img/2024-06-20-IWroteAnAutomatedScripttoSendOutColdE-MailstotheTechCompaniesIWanttoWorkAtWithResults_0.png" />

'Cold e-mailing'은 오늘날 모든 구직자가 들어본 적이 있는 것입니다. 그러나 실제로 도움되고 쉬운 것일까요? 매번 이메일을 맞춤화하여 모든 채용 담당자 및 관리자들의 이메일을 검색하고 보내기는 귀찮은 일입니다. 굳이 그렇게 해야 하는가?

어떻게하면 프로세스를 쉽게 만들 수 있을까요? LinkedIn에서 사람들에게 메시지를 보내는 것은 수백 명의 사람들이 이미 모든 채용 담당자와 리크루터에게 메시지를 보냈다는 점을 고려하면 불가능합니다 (아무도 무시하려는 것이 아닙니다. 현재는 정말 어려운 시기이며 모두 최선을 다하고 있습니다)

# 생각

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

어떻게 하면 좋을까요? '회사 이름' 채용 담당자/리쿠르터의 LinkedIn을 온라인으로 검색하여 그들의 이름을 찾고, 직접적인 이메일을 보내는 스크립트를 작성한다면 어떨까요? 하지만 LinkedIn에서 이들의 이메일 주소를 어떻게 찾을까요? 각기 다른 회사에 맞춰 이메일을 어떻게 개인화할까요? 가장 중요한 것은, 이 모든 작업을 수작업으로 할 수는 없다는 것입니다.

# 아이디어 발산

처음에 생각한 것은, 스크립트를 작성하여 firstName+lastName@companywebsite.com의 모든 조합에 이메일을 보내는 것인데, 어떻게하면 유효한 이메일 주소인지 알 수 있을까요?

이 문제는 꽤 간단하게 해결할 수 있었습니다. 유효하지 않은 이메일로 메일을 보내면 메일러 데몬(발신자와 수신자 사이의 중간 인터페이스)이 수신자의 이메일 주소가 유효하지 않아서 이메일을 보낼 수 없다는 경고를 통보해줍니다.

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

알겠어요. 이제 하나의 조합이 유효하다면 메일러 데몬으로부터 알림을 받지 않는다는 사실을 알게 되었어요. 이제 조합을 생성하는 것은 또 다른 작업이었지만, 제 경험상 회사 이메일은 일반적으로 다음과 같은 양식을 따른다는 것을 알고 있어요 -

- jdoe@company.com
- johnd@company.com
- johndoe@company.com
- j.doe@company.com
- john.doe@company.com

그러나 몇몇 회사 이메일을 알고 있는 것에 기반하여 스크립트에 추가적인 조합 몇 가지를 추가했어요. 따라서 여기서의 작업은 탐색 스크립트로부터 수집된 이름에서 조합을 생성하는 것이었습니다. 문자열 조작과 생성적 AI를 사용하여 이 작업은 꽤 간단한 일이었어요.

# ‘맞춤’ 이메일

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

각 회사에 이메일을 맞춤화하는 것을 고려해야 하는 부분이었지만, 회사에 대한 내 흥미와 경력, 프로젝트, 학력을 언급한 일반적인 텍스트 조각을 만드는 것이 목표였어요. 또한, 이메일에 이력서를 첨부해야 했죠.

내가 미리 설정한 이메일 샘플:

```js
"안녕하세요, 제 이름은 Priyanshu입니다... 제 자격 및 성취는...
...${companyName}에서 일하고 싶어하는 이유는...
...SDE/풀스택 엔지니어와 같은 역할을 찾고 있습니다...
...제 이력서를 첨부했습니다..."
```

매우 간략한 형태로 이메일을 작성한 것을 볼 수 있어요. 회사 이름이 변수로 전달되는 것에 주목해주세요. 이 변수는 내가 최우선 순위로 둔 회사들의 배열에서 가져온 것이에요.

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

간단히 말씀드리면, 목록에서 각 회사에 대해 다음을 시도했습니다:

- 구글 검색을 통해 회사에서 채용 담당자/리쿠르터/시니어 개발자를 찾기 위해 — Puppeteer.js를 사용한 웹 스크래핑
- 스크랩된 텍스트에서 이름을 추출하기 위해 — 발생 모델 AI API 및 문자열 조작
- 내 이력서와 함께 맞춤형 이메일을 모든 조합에게 보내기 — Nodemailer API
- 이미 이메일을 보낸 주소를 저장하여 리쿠르터에게 스팸을 보내지 않도록 함 — MongoDB

위의 모든 작업은 저가 Node.js를 사용하여 작성한 스크립트로 자동화했습니다.

# 결과 및 결론

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

![1](/assets/img/2024-06-20-IWroteAnAutomatedScripttoSendOutColdE-MailstotheTechCompaniesIWanttoWorkAtWithResults_1.png)

![2](/assets/img/2024-06-20-IWroteAnAutomatedScripttoSendOutColdE-MailstotheTechCompaniesIWanttoWorkAtWithResults_2.png)

![3](/assets/img/2024-06-20-IWroteAnAutomatedScripttoSendOutColdE-MailstotheTechCompaniesIWanttoWorkAtWithResults_3.png)

![4](/assets/img/2024-06-20-IWroteAnAutomatedScripttoSendOutColdE-MailstotheTechCompaniesIWanttoWorkAtWithResults_4.png)

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

많은 추가적인 이메일도 있어요.

많은 긍정적인 응답을 받기는 했지만, 아직 후속 조치는 받지 못했어요. 현재 시장 상황과 후원 요건 때문에 조금 어려울지도 모르겠지만, 희망을 잃지 말아봐요!

읽어주셔서 감사합니다!
