---
title: "증명 개념 아두이노 UNO에서 비동기 프로그래밍"
description: ""
coverImage: "/assets/img/2024-05-15-ProofofConceptAsynchronousprogramminginArduinoUNO_0.png"
date: 2024-05-15 11:27
ogImage: 
  url: /assets/img/2024-05-15-ProofofConceptAsynchronousprogramminginArduinoUNO_0.png
tag: Tech
originalTitle: "Proof of Concept. Asynchronous programming in Arduino UNO."
link: "https://medium.com/@EDBCBlog/proof-of-concept-asynchronous-programming-in-arduino-uno-64801e64b7cd"
---


<img src="/assets/img/2024-05-15-ProofofConceptAsynchronousprogramminginArduinoUNO_0.png" />

안녕하세요.

요즘 NodeJS의 작동 방식에 관심을 갖게 되었습니다. 한 스레드에서 여러 작업을 동시에 실행하는 것이 가능하다는 것이 흥미롭게 느껴졌죠. 그래서 스스로에게 물었습니다. 아두이노 UNO에서도 이와 같은 것이 가능할까요?

그래서 이것이 어떻게 작동하는지 알아보기 위해 조금 연구를 해봤는데, Node.js는 한 스레드에서 동시성을 달성하기 위해 2가지 알고리즘을 사용한다는 것을 깨달았습니다.



- 이벤트 루프: 각기 다른 함수들로 이루어진 작업 목록을 저장하고 실행하는 역할을 담당합니다. 이러한 함수들은 쉽게 코루틴이 될 수 있습니다.

- 코루틴: 실행을 중단하고 나중에 다시 재개할 수 있는 함수 유형입니다. 

그래서 제가 Arduino UNO에서 동일한 동시성 시스템을 구현하기로 결정했습니다.

가장 쉬운 부분부터 시작했습니다. 코루틴입니다. C/C++은 내장 코루틴 지원이 없기 때문에, 자체 코루틴 시스템을 만들었습니다. 이를 위해 Duff의 장치라는 매우 유용한 알고리즘을 발견했습니다. 이 알고리즘은 코루틴과 직접적으로 관련되어 있지는 않지만, 코루틴 구현에 도움이 될 것입니다.



예, 주요 아이디어는 정적 상태 변수를 생성하여 코루틴의 상태를 기억할 수 있도록하는 것입니다. 그런 다음 switch 문을 사용하여 함수를 청크로 분할하고 상태 변수를 사용하여 필요한 부분을 실행할 수 있습니다. 내가 무슨 얘기를 하는지 이해 못 하겠다고요? 그래, 이런 느낌입니다!

```js
int coroutine(){
static int state = 0;

     switch(state){
         case 0: do { printf("Hello World 0"); state++; return 1; case 1:; } while(0);
                 do { printf("Hello World 1"); state++; return 1; case 2:; } while(0);
                 do { printf("Hello World 2"); state++; return 1; case 3:; } while(0);
                 do { printf("Hello World 3"); state++; return 1; case 4:; } while(0);
                 do { printf("Hello World 4"); state++; return 1; case 5:; } while(0);
                 do { printf("Hello World 5"); state=0; return 1;          } while(0);
     }

     return -1;

}

void setup(){
     Serial.begin( 9600 );
}

void loop(){
     coroutine();
     delay(1000);
}
```

![이미지](https://miro.medium.com/v2/resize:fit:852/1*FmR-nOMNpohwvWCPbysUiQ.gif)

좋죠? 하지만 이 방법을 사용하여보다 복잡한 코루틴을 작성한다고 상상해보세요. 그러다가 Duff 장치를 생성하는 것을 단순화하기 위해 매크로를 사용하기로 생각했습니다. 여기에는 몇 가지 매크로가 있습니다:



```js
#define coNext         do { _state_ = __LINE__; return 1; case __LINE__:; } while (0)
#define coGoto(VALUE)  do { _state_ = VALUE   ; return 1;                 } while (0)
#define coYield(VALUE) do { _state_ = VALUE   ; return 1; case VALUE:;    } while (0)
```

```js
#define coStart static int _state_ = 0; { switch(_state_) { case 0:;
#define coEnd do { _state_ = 0; return -1; } while (0)
#define coStop } _state_ = 0; return -1; }
#define coSet(VALUE) _state_ = VALUE
#define coGet _state_
```

참고: 매우 유용한 다른 매크로도 추가되었습니다.

```js
#define coDelay(VALUE)  do { static auto tm = millis()+VALUE; while( millis() < tm ){ coNext; } tm = millis()+VALUE; break; } while (0)
#define coUDelay(VALUE) do { static auto tm = micros()+VALUE; while( micros() < tm ){ coNext; } tm = micros()+VALUE; break; } while (0)
#define coWait(VALUE)   do { while( !VALUE ){ coNext; } } while(0)
```

이 구현의 작은 단점 중 하나는 switch 문을 사용하여 코루틴을 실행하기 때문에 코루틴 내에서 switch 문을 사용할 수 없다는 것입니다. 해당 경우는 코드를 완전히 깨뜨릴 것입니다.




이전 예제를 복제한다면 이렇게 될 것입니다:

```js
int coroutine(){
coStart

     printf("Hello World 0"); coNext;
     printf("Hello World 2"); coNext;
     printf("Hello World 3"); coNext;
     printf("Hello World 4"); coNext;
     printf("Hello World 5"); coNext;
     printf("Hello World 6");

coGoto(0);
coStop
}

void setup(){
     Serial.begin( 9600 );
}

void loop(){
     coroutine();
     delay(1000);
}
```

이제 실제 Arduino 프로젝트에서 이것을 적용한다면 어떻게 될까요?

아두이노 UNO에서 실행되는 3개의 비동기 프로세스를 실행하는 프로그램을 작성하고 싶다고 가정해보겠습니다. 이 프로그램은 일련의 LED를 켜고 끄게 할 것입니다. 아래에 코드가 있습니다:



```js
int coroutine1(){
     static bool b=0;
coStart

     digitalWrite(7,b);
     coDelay(300); b=!b;

coGoto(0);
coStop
}

int coroutine2(){
     static bool b=0;
coStart

     digitalWrite(6,b);
     coDelay(1000); b=!b;

coGoto(0);
coStop
}

int coroutine3(){
     static int x=0; static bool b=0;
     unsigned char pin[] = { 13, 12, 11, 10, 9, 8 };
coStart

     while( x-->0 ){
         digitalWrite( pin[x], b );
         coDelay(100);
     } b=!b; x=6;

coGoto(0);
coStop
}

void setup(){
     unsigned char pin[] = { 13, 12, 11, 10, 9, 8, 7, 6 };
     for( auto &x: pin ) pinMode( pin, OUTPUT );
}

void loop(){
     coroutine1();
     coroutine2();
     coroutine3();
}
```

![Animation](https://miro.medium.com/v2/resize:fit:852/1*LwDRI8sOZe-EVOxAEsgLHw.gif)

알아보기 쉽게 Arduino UNO에서 비동기 프로그래밍이 가능하다는 것을 확인할 수 있습니다. 시간이 부족해 이 데모에 대한 이벤트 루프를 구현하지 못했지만, loop 함수가 좋은 대체재가 됩니다. 이 글에 흥미를 느끼셨다면 제가 두 번째 파트를 작성해 이벤트 루프에 대해 설명해드릴게요. 이 프로젝트가 마음에 들었기를 바라며, 우리 다음에 또 뵙겠습니다.

이 글을 마치기 전에, 제가 만든 Nodepp라는 프레임워크를 소개하고 싶어요. 이 프레임워크는 NodeJS와 매우 유사한 구문으로 Arduino에서 비동기 코드를 작성할 수 있게 해주는 C++ 프레임워크입니다. 즐겁게 이용하시기를 바랍니다.




https://www.arduino.cc/reference/en/libraries/nodepp/