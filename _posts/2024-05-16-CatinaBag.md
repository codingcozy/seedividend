---
title: "가방 속의 고양이"
description: ""
coverImage: "/assets/img/2024-05-16-CatinaBag_0.png"
date: 2024-05-16 17:28
ogImage: 
  url: /assets/img/2024-05-16-CatinaBag_0.png
tag: Tech
originalTitle: "Cat in a Bag!"
link: "https://medium.com/@juliaeveritt09/cat-in-a-bag-567d8c5b3bda"
isUpdated: true
---




제 최종 프로젝트는 '가방 안 고양이(Cat in a Bag)' 라는 게임입니다. 이 게임의 아이디어는 제 룸메이트가 기르는 퍼시라는 이름의 고양이에서 영감을 받았어요. 퍼시는 가방을 좋아하는 회색 고양이예요. 그녀가 가장 좋아하는 가방은 녹색 퍼블릭스 가방인데, 그 속에 숨어들어 가끔 마주쳤었죠. 아래에서 진짜 퍼시가 가방 안에 있는 모습을 보실 수 있어요!

이 게임의 목표는 조이스틱을 이용하여 퍼시 스프라이트를 제어하고 화면 주위를 움직이는 녹색 가방 스프라이트를 성공적으로 클릭하는 것이에요. 화면 주위에는 여러 다른 색의 가방 스프라이트들이 많이 튀어다니는데, 그 중에서 녹색 가방만 움직이죠. 플레이어들은 올바른 가방을 클릭하기 위해 30초와 3번의 시도 기회를 가집니다. 모든 시도 기회를 소진하거나 시간이 다 되면 게임에 패배합니다. 시간 내에 녹색 가방을 클릭할 수 있다면 이기는 거죠.

이 프로젝트를 만들기 위해 아두이노 프로그램을 작성하여 조이스틱 입력을 p5 JavaScript 프로그램으로 전송하고, JavaScript 프로그램은 다시 정보를 아두이노로 전송하여 3개의 LED 라이트를 제어하도록 했어요. 또한, 아두이노가 p5 프로그램에 연결되면 시작되는 배경 음악을 위한 Tone.js 사운드 시퀀스를 만들었습니다. LED 라이트는 올바른 가방을 클릭할 시도 횟수를 나타냅니다. 틀린 가방을 클릭할 때마다 라이트 중 하나가 꺼지게 됩니다. 플레이어가 올바른 가방을 클릭할 수 있으면, 라이트가 몇 번 깜빡이고 다른 음악 시퀀스가 재생됩니다. 게임의 시작할 때는 화면에 게임 방법을 설명하는 텍스트가 나타납니다. 게임에서 이기면 승리 화면으로 전환되고, 그렇지 않으면 시도 기회가 모두 소진되었다는 안내가 표시됩니다. 모든 스프라이트 그래픽은 Piskel에서 그리고 스프라이트 시트로 내보냈어요.

![Cat in a Bag](/assets/img/2024-05-16-CatinaBag_0.png)

<div class="content-ad"></div>


![CatinaBag_1](/assets/img/2024-05-16-CatinaBag_1.png)

![CatinaBag_2](/assets/img/2024-05-16-CatinaBag_2.png)

Below is a video of my project in action.

For future development, I think it would be cool to add more Arduino elements, such as buzzers or photoreceptors, to enhance the game with additional features. Instead of just moving a sprite on the screen, players could control sprite speed or collect power-ups. Implementing a points system would make the game more competitive, so players could strive to beat their own high scores in addition to beating the clock. Some aspects of the current game can be refined for more consistent gameplay. For example, if two wrong bags are clicked simultaneously, the Arduino might struggle to process the request to turn off two LEDs at the same time.


<div class="content-ad"></div>

전반적으로 내 프로젝트 결과물에 매우 만족하고 만들기 위해 들인 모든 노력을 배우는 것을 즐겼어요. 'Cat in a Bag' 게임 즐기시길 바랍니다!