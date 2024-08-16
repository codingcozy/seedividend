---
title: "LOCKBIT의 귀환"
description: ""
coverImage: "/assets/img/2024-05-16-THERETURNOFLOCKBIT_0.png"
date: 2024-05-16 04:26
ogImage: 
  url: /assets/img/2024-05-16-THERETURNOFLOCKBIT_0.png
tag: Tech
originalTitle: "THE RETURN OF LOCKBIT!"
link: "https://medium.com/coinmonks/the-return-of-lockbit-8d7bcb9b75fa"
isUpdated: true
---




노트: Operation Cronos 이전 이야기를 시작했습니다. 따라서 FBI/Europol 타협 이전에 풀리기 시작하는 작은 세부 사항들을 볼 수 있습니다. 본문은 주로 LockBit 그룹의 강력한 컴백 및 Operation Cronos 이후의 접근에 초점을 맞추며 LockBitSupp의 신원과는 무관합니다. 또한, 주목받지 못한 LOCKBIT 시리즈의 사건들의 모음입니다.

소개

XSS 또는 Exploit과 같은 포럼에서의 LockBit 금지 및 Operation Cronos를 통한 Law Enforcement 침투 후에는, 협상 패널, 계열 회원 목록, 피해자 데이터베이스, 채팅 및 복호화 키와 같은 일부 내부 파일을 상실한 것으로 나타났습니다. 그들의 훌륭한 명성이 훼손되었다는 것이 명백합니다.

![이미지](/assets/img/2024-05-16-THERETURNOFLOCKBIT_0.png)



처음에는 돌아올 때 LockBit이 이전 누출 자료(크로노스 작전 이전)를 게시했습니다. 그러나 정보보안 커뮤니티에서 이전 누출 자료의 재사용에 대해 비판을 받은 후, 그룹은 이를 철회하고 새로운 희생자들의 새로운 일괄 처리로 돌아왔습니다.

이 기사는 LOCKBIT의 두 번째 지배에 중점을 두고 있습니다!

컴백

크로노스 작전 1부 이후, LockBit이 모든 미러 서버를 다시 온라인으로 복귀하는 데 약 일주일이 걸렸으며, 새로운 희생자들을 데이터 유출 사이트(DLS)에 명시했습니다.




![이미지](/assets/img/2024-05-16-THERETURNOFLOCKBIT_1.png)

모든 피해자들은 LockBit 유출 서버에 전체 데이터를 공개하기 전에 평균 29일의 협상 기간을 부여받습니다.

현재 피해자 목록은 200명 이상 (포스트 운영 크로노스)으로 나와 있으며 기업 랜섬웨어 시나리오에서 강력한 존재임을 나타냅니다.

피해자화




LockBit은 미국 정부 기관인 DSIB(District of Columbia 보험, 증권 및 은행부)와 같은 명성 높은 대상들을 비롯하여 더 자주 피해를 주고 있습니다. DISB(DC 보험, 증권 및 은행부)는 금융 서비스 업체를 규제합니다. Polycab, OracleCMS, Nampak, Crinetics 등이 포함되어 있습니다.

그러나 피해자의 데이터가 최근 사이트에 나타나고 있으며, Cronos 작전 이전과 달리 정기적으로 업로드되던 특징이 사라졌다는 것을 발견했습니다.

일부 케이스(예: Polycab, Krueth, CasaJove 등)에서는 마감 기한 이후에도 아직 유출이 목록에 없으며, 의심스럽습니다. 이는 Cronos 작전 때 LockBit에서 데이터를 잃었을 수도 있고, 피해자가 랜섬을 지불했을 수도 있습니다.

피해자 지리를 확인하면 미국이 상위를 차지하고 영국, 독일, 캐나다, 인도, 프랑스가 그 뒤를 이어나는 것을 볼 수 있습니다.




![LockBit Infrastructure Hunt](/assets/img/2024-05-16-THERETURNOFLOCKBIT_2.png)

During the analysis, it was found that LockBit maintains a stable server to host large leaks on a new Onion Domain:-

This leak site is running on nginx/1.25.4; which is the latest version of NGINX (ATTOW) as promised by LockBit to avoid any unpatched versions after Operation Cronos Part — 1.




주요 DLS는 아래와 같습니다. nginx/1.24.0에서 실행 중입니다.

조사 중에 LockBit의 원래 IP 주소가 노출되었습니다:

![LockBit](/assets/img/2024-05-16-THERETURNOFLOCKBIT_3.png)

더 깊이 파고들면 아래 세부 내용을 유추할 수 있습니다:



```js
IP: 5.182.5.126 
ASN: 49505
Location: 러시아
서버: NGINX 
```

이전의 LockBit 서버(현재 유럽 연합 또는 작전 크로노스에 의해 통제됨)는 Apache/2.4.57 (Debian)를 사용했습니다. LockBit 그룹은 최신 안정적인 온언 도메인을 사용하는 NGINX 서버로 이동했습니다.

LOCKBIT이 토렌트 파일 공유로 이동 중

2024년 3월 9일 LockBit 운영자들은 18개의 Vanity Onion 도메인을 온라인으로 만들었으며, 약 710명의 클라이언트 목록 및 다운로드를 쉽게 할 수 있는 토렌트 파일을 게시했습니다.




2023 년 11 월 중순: Lockbit은 모든 피해자를 위해 Torrent 파일을 만들기로 결정했습니다. 모든 피해자의 데이터 (Torrent 버전)은 회사 이름이 아닌 I85F5, 7E6EE, V4DV5, LIHD9, PLPT7 등과 같은 5자 이름이 할당되어 패키지화되었습니다.

![이미지](/assets/img/2024-05-16-THERETURNOFLOCKBIT_4.png)

더 깊숙이 파보면, 각 피해자에 대한 파일 트리도 동일한 날짜인 2024 년 3 월 9 일에 작성되고 있다는 것을 확인할 수 있습니다.

LockBit 유출의 모든 토렌트 트래커는 다음에 연결되어 있습니다:-



Leak에 대한 토렌트다운로드는 새로운 접근 방식이 아닙니다. Clop Ransomware Gang은 이미 2023년 9월에 사용했습니다. 이는 그들이 트래픽을 대중과 함께 결합할 수 있게 하며, 유출된 파일이 분산된 방식으로 공유되어 더 오래 남게 합니다.

피해자 사례 연구: CRINETICS

LockBit에 의해 Crinetics가 특정 그룹이나 계열사의 작품으로 나열되고 있으며, 해당 데이터를 LockBit이 직접 요구하고 있지는 않습니다.

![이미지](/assets/img/2024-05-16-THERETURNOFLOCKBIT_5.png)



3월 20일에 업데이트로, 그룹은 LockBit과 피해자 간에 진행된 협상의 8개 스크린샷을 나열했습니다.

요구액은 4백만 달러였지만, 고객은 최대 180만 달러까지 지불할 수 있었습니다.

![이미지](/assets/img/2024-05-16-THERETURNOFLOCKBIT_6.png)

협상이 성과를 거두지 못했기 때문에 4월 2일, 그룹은 유출 날짜를 2024년 4월 7일로 연장했으며, 이에 따라 LockBit은 정보를 제공했던 피해자와의 통신을 종료하고, 이에 LockBit이 제공한 지시를 따르지 못한 Recorded Future와의 소통이 불발되었다는 설명이 함께 제공되었습니다.




![LockBit Affiliate](/assets/img/2024-05-16-THERETURNOFLOCKBIT_7.png)

드디어, LockBit 제휴사는 2024년 4월 11일에 정보 파괴와 데이터 다운로드를 위한 몸값을 $7백만으로 인상하면서 이 장을 마쳤습니다.

Crinetics로 요구된 BTC 지갑은 다음과 같습니다:-

BTC: bc1qdtawyte5qtxgrk6far90tpeh9atfvyqgv5rcxs
XMR: 48XyFEbDz4117SopGgaSjAaMK2uXqvnmq7W2wFXKUFPJNdTLFUvgKyx82jcRiWXBDv9ojbijGYyqz9edtrsgZG9NMHG7Xff




LOCKBIT LEAK HOSTING

유럽 경찰 국제 협력 기구 이후 희생자들의 최근 공개된 데이터는 처음에는 LockBit 데이터 서버에 업로드되는 작업 시간이 더 오래 걸리기 때문에 Mega에 호스팅되어 있습니다.

나중에 LockBit 전용 서버로 이동됩니다.

관련 없는 LOCKBIT 도메인



데이터 누설을 분석하면, Pronat Industries 사례에서 특이성이 발견되었습니다. 이 회사의 데이터는 일반적인 LockBit 플랫폼에 호스팅되어 있지 않습니다.

이것은 다른 URL과 같이 국소적인 TOR 도메인이 아닙니다.

LockBit(또는 동맹사)가 Pronat Industries 데이터를 LockBit과 무관한 별도의 온이언 도메인에 저장하기로 결정한 것이거나, 비-LockBit 제휴사일 수도 있습니다.

해당 고객에 대해 이들은 Crinetics와 비슷한 BTC 및 XMR 주소를 제공했지만, BTC 주소는 다르지만 XMR은 동일합니다.




BTC: bc1qjwquf4n0j6tc55wg9zymkas2ue484ddxtl70wv
XMR: 48XyFEbDz4117SopGgaSjAaMK2uXqvnmq7W2wFXKUFPJNdTLFUvgKyx82jcRiWXBDv9ojbijGYyqz9edtrsgZG9NMHG7Xff


잘 알려진 LockBit 대상에 대한 새로운 패턴이 발견되었습니다. 이제 LockBit은 누출 기간을 5일에서 추가로 10일 늘려 누출을 지연시키고 있습니다.

LOCKBIT 모방자들이 주변에 있습니다.

다양한 사기꾼들이 텔레그램 채널, 디스코드 서버 등 다양한 소스에서 사이버 모서리 주변에 있음을 발견했습니다. 때때로 LockBit 공격 스타일을 모방한 몸값 쪽지를 볼 수도 있습니다.




![LockBit Image 8](/assets/img/2024-05-16-THERETURNOFLOCKBIT_8.png)

Many beginners have acquired the leaked version of LockBit and have turned it into a tool to attack various targets, hoping to strike it rich. These targets might mistake them for the real LockBit and end up paying a heavy price.

![LockBit Image 9](/assets/img/2024-05-16-THERETURNOFLOCKBIT_9.png)

Here is another chat log from a fraudulent LockBit support on the Telegram platform, who demands a $500 membership fee to join a private group:




![2024-05-16-THERETURNOFLOCKBIT_10.png](/assets/img/2024-05-16-THERETURNOFLOCKBIT_10.png)

다른 시나리오에서, LockBit에 의해 유출된 피해 기업들은 "Dispossessor"와 같은 다른 그룹에 의해 다시 등장하고 있습니다. 이 그룹은 동일한 LockBit 피해 기업을 나열하고 있습니다. 그들의 웹사이트에서 이에 대한 스크린샷을 확인할 수 있습니다:-

![2024-05-16-THERETURNOFLOCKBIT_11.png](/assets/img/2024-05-16-THERETURNOFLOCKBIT_11.png)

그들의 피해자 목록을 관찰해 보면, 그룹이 LockBit의 고객 80%를 나열했음을 알 수 있으며, 몇몇 피해자로는 3AM 및 8Base의 피해자도 명기하고 있습니다.



락빗 제휴사?

다크 웹에서 락빗 제휴사를 확인 중에, 러시아 회원인 "헥소니움"이라는 사용자가 딥 웹 포럼에서 락빗의 정품 온이언 도메인을 제공하여 락빗의 제휴사라 주장했음을 발견했습니다.

포럼 활동과 사용된 URL을 확인해보면, 이 회원이 2023년 12월 이후 활발하게 활동하고 있음을 확인할 수 있습니다.

![이미지](/assets/img/2024-05-16-THERETURNOFLOCKBIT_12.png)



포스트를 찾아 보시는 동안 다음을 볼 수 있습니다:-

![이미지](/assets/img/2024-05-16-THERETURNOFLOCKBIT_13.png)

Hexonium은 커뮤니티에서 쓰레드를 개설하지 않으며, 모든 포스트에서 "nigger"라는 공통 용어를 게시하여 브리치와 상호 작용합니다.

따라서 2022년 9월 LockBit Black이 유출된 이후 오로지 흥분을 유발하기 위해 LockBit aura를 사용하는 숙련자들이 많이 보여왔으므로 Hexonium을 진정한 제휴 업체로 신뢰할 수 없습니다.



현실 체크?

이는 LockBitSupp과 직접 상호 작용한 내용으로, 그가 다른 채널과는 무관하다고 부인한 내용입니다.

![이미지](/assets/img/2024-05-16-THERETURNOFLOCKBIT_14.png)

리크 날짜 연장: 새로운 접근법 채택



그룹이 이미 설정된 타이머에서 유출을 연기했다는 것이 발견되었습니다. 모든 명단에 해당되는 것은 아니지만 일부 사례에서 관찰되었습니다.

Polycab는 초기 유출 날짜가 4월 5일이었지만 다시 2024년 4월 22일까지 연장되었습니다. 타이머가 설정되면 데이터가 아직 목록에 표시되지 않았습니다 (ATTOW). 1차 크로노스 캠페인 동안 손실된 것으로 추정됩니다.

인도의 또 다른 잘 알려진 기업 "RJCorp"는 현재 목록에서 누락된 4월 15일에 발표 예정입니다.

이에 대한 2가지 가능성이 있습니다.



OPERATION CRONOS: PART 2

2024년 5월 첫째 주에 Europol이 LockBit의 이전에 침해된 웹사이트에 다음 업데이트를 게시했습니다:-

![이미지](/assets/img/2024-05-16-THERETURNOFLOCKBIT_15.png)

해당 게시물에 따르면, LockBitSupp와 다른 LockBit 제휴사의 신원이 5월 7일 14:00 UTC에 공개되었습니다.



그에 따르면, LockBitSupp의 신원은 러시아 국적인 "Dmitry Yuryevich Khoroshev"로 추적되었습니다.

![image](/assets/img/2024-05-16-THERETURNOFLOCKBIT_16.png)

LockBit 신원 공개 이후 관찰된 이벤트는 다음과 같습니다: 

- 이러한 공개 이후, 많은 보안 연구원들이 이 회원의 세부 정보를 확인하기 위해 공유된 이메일 주소 및 전화번호를 찾기 시작했습니다.
- 신원 공개 후 1시간 뒤, LockBitSupp은 다음과 같은 상태를 표명했습니다:



3) 이 상태 업데이트 이후 많은 산업 관계자들이 이를 흔하지 않은 자신의 방어적 접근으로 해석하기 시작했습니다.

이게 사실일 수도 있지만, 우리는 현재 이를 알 방법이 없어요.

4) 다음 날 5월 9일에, LockBit은 DLS 도메인에 새로운 피해자 77명을 추가했습니다. 일부 피해자들이 새로운 일괄로 다시 나타났습니다. 이것은 피해자 수를 부풀리고, 결과적으로 높은 수의 일괄 감염을 전반적으로 전달하기 위한 것일 수 있습니다.

![이미지](/assets/img/2024-05-16-THERETURNOFLOCKBIT_17.png)



5) LockBit은 DLS에 "contest.omg"이라는 새로운 메시지를 추가했습니다. 여기서 그는 커뮤니티에 도전하여 Dmitry와 새로운 포털을 통해 증거를 제시하도록 요청했습니다.

![이미지](/assets/img/2024-05-16-THERETURNOFLOCKBIT_18.png)

![이미지](/assets/img/2024-05-16-THERETURNOFLOCKBIT_19.png)

6) 4일 동안 활동했던 이전 사이트(Feds가 통제하는)가 지금 닫히고 있습니다.




![LockBitTox Status Updates](/assets/img/2024-05-16-THERETURNOFLOCKBIT_20.png)

LOCKBIT TOX STATUS UPDATES

Here are the important STATUS-UPDATES of LockBitSupp. Captured at different intervals:-

- все на шашлындос Everything is on the Barbeque
- ФБР блефует, я не Демон, мне жаль настоящего Демона))) о, и он получит пизды за мои грехи))) The FBI is bluffing, I'm not Dimon, I feel sorry for the real Dimon ))) oh and he will get pussy for my sins )))
- Придумайте как доказать, что я не Демон? Как показать всему миру что ФБР ошиблись или специально подставили Демона? Can you figure out how to prove that I'm not a Demon? How can we show the whole world that the FBI made a mistake or deliberately framed a Demon?
- участвуем в конкурсе, условия в блоге We participate in the competition, conditions in the blog




결론

테이크다운에 관해서 말하자면: 주장된 만큼 효과적이지는 않습니다. RaaS가 이윤을 창출하는 사업이기 때문에 이러한 추세는 계속될 것입니다. 한 그룹의 체포는 더 방어적인 접근을 하는 다음 그룹의 부활/탄생을 이끌어 낼 것입니다.

이 경우에는 아직 유럽 경찰이 Khoroshev를 어떻게 찾아냈는지 명확하지 않습니다. 간단히 말하면, Khoroshev와 LockBit 사이의 활성 연결을 설정하기 위한 구체적인 증거가 제시되지 않았지만, 유사한 타임라인의 가정이 있습니다.

동시에, 작전의 기밀성으로 인해 Dmitry가 LockBitSupp가 아님을 확신할 수 없습니다.



조금 더 기다려야 할 것 같아요. LockBitSupp가 돈이 아닌 피해자 수에 대해 이야기했으니 진실을 밝히기 위해서 더 기다려야 해요.

IOC

```js
TOR DOMAINS
===========

lockbit7z2jwcskxpbokpemdxmltipntwlkmidcll2qirbu7ykg46eyd.onion
lockbit6knrauo3qafoksvl742vieqbujxw7rd6ofzdtapjb4rrawqad.onion
lockbit7z2og4jlsmdy7dzty3g42eu3gh2sx2b6ywtvhrjtss7li4fyd.onion
lockbit7z2mmiz3ryxafn5kapbvbbiywsxwovasfkgf5dqqp5kxlajad.onion
lockbit7z355oalq4hiy5p7de64l6rsqutwlvydqje56uvevcc57r6qd.onion
lockbit7z36ynytxwjzuoao46ck7b3753gpedary3qvuizn3iczhe4id.onion
lockbit7z37ntefjdbjextn6tmdkry4j546ejnru5cejeguitiopvhad.onion
lockbit7z3azdoxdpqxzliszutufbc2fldagztdu47xyucp25p4xtqad.onion
lockbit7z3ddvg5vuez2vznt73ljqgwx5tnuqaa2ye7lns742yiv2zyd.onion
lockbit7z3hv7ev5knxbrhsvv2mmu2rddwqizdz4vwfvxt5izrq6zqqd.onion
lockbit7z3ujnkhxwahhjduh5me2updvzxewhhc5qvk2snxezoi5drad.onion
lockbit7z4bsm63m3dagp5xglyacr4z4bwytkvkkwtn6enmuo5fi5iyd.onion
lockbit7z4cgxvictidwfxpuiov4scdw34nxotmbdjyxpkvkg34mykyd.onion
lockbit7z4k5zer5fbqi2vdq5sx2vuggatwyqvoodrkhubxftyrvncid.onion
lockbit7z4ndl6thsct34yd47jrzdkpnfg3acfvpacuccb45pnars2ad.onion
lockbit7z55tuwaflw2c7torcryobdvhkcgvivhflyndyvcrexafssad.onion
lockbit7z57mkicfkuq44j6yrpu5finwvjllczkkp2uvdedsdonjztyd.onion
lockbit7z5ehshj6gzpetw5kso3onts6ty7wrnneya5u4aj3vzkeoaqd.onion
lockbit7z5hwf6ywfuzipoa42tjlmal3x5suuccngsamsgklww2xgyqd.onion
lockbit7z5ltrhzv46lsg447o3cx2637dloc3qt4ugd3gr2xdkkkeayd.onion
lockbit7z6choojah4ipvdpzzfzxxchjbecnmtn4povk6ifdvx2dpnid.onion
lockbit7z6dqziutocr43onmvpth32njp4abfocfauk2belljjpobxyd.onion
lockbit7z6f3gu6rjvrysn5gjbsqj3hk3bvsg64ns6pjldqr2xhvhsyd.onion
lockbit7z6qinyhhmibvycu5kwmcvgrbpvtztkvvmdce5zwtucaeyrqd.onion
lockbit7z6rzyojiye437jp744d4uwtff7aq7df7gh2jvwqtv525c4yd.onion
lockbitfilzhrvt6eya2lvnp7te4iifzmwybendqclgujqbzu3k4gaid.onion
lockbitfilzu5e62fybhieutf6653cpv6wco7twgjtkqwdgubn4q5rad.onion
lockbitfile2tcudkcqqt2ve6btssyvqwlizbpv5vz337lslmhff2uad.onion
lockbit33chewwx25efq6dgkhkw4u7nefudq4ijkuamjfd7x73on6dyd.onion

이전 LockBit TOR 도메인
=======================
lockbitapt6vx57t3eeqjofwgcglmutr3a35nygvokja5uuccip4ykyd.onion
lockbitapt2yfbt7lchxejug47kmqvqqxvvjpqkmevv4l3azl3gy6pyd.onion 
lockbitapt34kvrip6xojylohhxrwsvpzdffgs5z4pbbsywnzsbdguqd.onion 
lockbitapt5x4zkjbcqmz6frdhecqqgadevyiwqxukksspnlidyvd7qd.onion 
lockbitaptc2iq4atewz2ise62q63wfktyrl4qtwuk5qax262kgtzjqd.onion 
lockbitapt2d73krlbewgv27tquljgxr33xbwwsp6rkyieto7u4ncead.onion 
lockbitapt6vx57t3eeqjofwgcglmutr3a35nygvokja5uuccip4ykyd.onion 
lockbitapt72iw55njgnqpymggskg5yp75ry7rirtdg4m7i42artsbqd.onion 
lockbitaptawjl6udhpd323uehekiyatj6ftcxmkwe5sezs4fqgpjpid.onion 
lockbitaptbdiajqtplcrigzgdjprwugkkut63nbvy2d5r4w2agyekqd.onion 

BTC 지갑
===========
bc1qdtawyte5qtxgrk6far90tpeh9atfvyqgv5rcxs
bc1qjwquf4n0j6tc55wg9zymkas2ue484ddxtl70wv

XMR: 48XyFEbDz4117SopGgaSjAaMK2uXqvnmq7W2wFXKUFPJNdTLFUvgKyx82jcRiWXBDv9ojbijGYyqz9edtrsgZG9NMHG7Xff

IP: 5.182.5.126

TOX: 3085B89A0C515D2FB124D645906F5D3DA5CB97CEBEA975959AE4F95302A04E1D709C3C4AE9B7
```

EXTRA READING



如果您是LockBit Story的狂热读者，则可以阅读我个人喜欢的一些资源：-

```js
https://krebsonsecurity.com/2024/05/how-did-authorities-identify-the-alleged-lockbit-boss/
https://analyst1.com/ransomware-diaries-volume-5-unmasking-lockbit-2/
https://therecord.media/lockbitsupp-interview-ransomware-cybercrime-lockbit
```

# 在Twitter/X上关注我，发现有趣的DarkWeb/InfoSec简报！;-)