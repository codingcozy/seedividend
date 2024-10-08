---
title: "닌텐도 에뮬레이터를 만든 이유"
description: ""
coverImage: "/assets/img/2024-08-03-WhyIWroteANintendoEmulator_0.png"
date: 2024-08-03 18:59
ogImage:
  url: /assets/img/2024-08-03-WhyIWroteANintendoEmulator_0.png
tag: Tech
originalTitle: "Why I Wrote A Nintendo Emulator"
link: "https://medium.com/engage/why-i-wrote-a-nintendo-emulator-804270d2e193"
isUpdated: true
---

## 컴퓨터 과학

![이미지](/assets/img/2024-08-03-WhyIWroteANintendoEmulator_0.png)

2008년에 닌텐도 엔터테인먼트 시스템 (NES) 게임 콘솔용 엠뮬레이터를 작성했었어요.

요즘 옛날 사진 몇 장을 발견해서 다시 한번 돌아보고, 그래서 이 글을 쓰게 되었어요.

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

이 문서는 전반적인 내용을 유지하되 때로는 기술적인 세부 사항에 대해 깊이 들어갈 것입니다. 설명을 위해 한 세그먼트의 코드가 있습니다. 이 게시물은 제가 한 여정에 대한 것이며 내가 한 구체적인 작업에 대한 것은 아닙니다.

그렇다면 에뮬레이터는 무엇일까요?

이 경우에는 PC 또는 Mac에서 NES 게임을 할 수 있는 것을 의미합니다. 다양한 게임 콘솔과 컴퓨터 시스템을 위한 많은 에뮬레이터가 있습니다(원리적으로는 같은 것입니다).

나는 컴퓨터에 관심을 가지던 시간만큼 에뮬레이터에 놀라움을 느끼고 있었습니다. 컴퓨터 안에서 컴퓨터를 실행시키는 것. 에뮬레이터 안에서 다시 다른 에뮬레이터를 실행시키는 것. 무한한 인형 뱀이라 해도 좋겠죠.

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

에뮬레이터는 정말 재미있었어요. 그래서 제가 직접 만들어 보려고 했죠.

제가 코딩을 시작한 건 11살 땐데요. QBASIC로 시작해서 나중에 C로 넘어가서 Linux 커널 내부를 만지작거리기도 했어요. 그저 호기심과 즐거움을 찾아서였죠. 그것만이 모든 일을 하는 이유였죠.

사진 촬영과 소매업을 경험한 뒤, 결국 컴퓨터 과학을 전공하기로 결심했어요. 마냥 주저하면서요. 왜냐면 내가 본 수업들이 모두 직장에서 중요시하는 내용들에 초점이 맞춰져 있어서였죠. "전문가적인"이란 단어는 내 사전에 없었거든요. 제가 원했던 건 순수한 컴퓨터 과학이었죠.

그런데, 몇 해가 흘렀을 때, 마침내 마지막 학년 프로젝트가 다가왔어요. 그건 충분한 변명이었죠. 제 에뮬레이터를 만들 시간이 왔다는 거죠. 코드로 전체 컴퓨터 시스템을 에뮬레이션하는 것은 컴퓨터 과학의 기본을 이해했다는 것을 증명하기에 더할 나위 없는 방법이었어요.

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

NES의 인기와 간편함으로 선택하기에 좋은 선택이었습니다. 또한 잘 문서화되어 있었습니다. 따라서 많이 다뤄진 주제였지만 여전히 도전적이었습니다. 그것은 그 때까지 내가 한 가장 큰 일이었을 것입니다. 큰 일을 하는 것에 익숙했습니다.

그 전년에는 한 해 동안의 팀 프로젝트 일환으로 항공표 관리 시스템을 제공했습니다. 혼자서, 이는 "팀 프로젝트"의 정신에 어긋나는 일이었지만, 그것이 그랬습니다. 팀에 임의로 배정된 구성원들은 불평을 하지 않았습니다. 우리는 모두 100%의 성적을 받았습니다. 교수님 중 한 분이 30개 정도의 팀 중 유일하게 현실 세계에서 사용될 수 있는 제품으로 언급했습니다. 멋지네요. 나는 물건을 만들었습니다. 그들이 작동했습니다.

첫해에, 나는 정적 모험 게임을 제공하는 것 이상으로 fantasy roleplaying을 전체 스프라이트 애니메이션, 규칙 시스템, 전투 메카닉, 인벤토리 관리, 지도 화면 및 기타 기능이 있는 것으로 제공했습니다.

약 2006년대, 아직 사용 중입니다.

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

<img src="/assets/img/2024-08-03-WhyIWroteANintendoEmulator_1.png" />

어쨌든, BIG. 저도 타버리기에 익숙해졌었어요. 한계를 시험하기.

그래서, 이것에 대해 완전히 할 수 있을지 확신하지 못했어요. 그래서 더욱 흥미로웠어요.

학년이 시작되기 전에 연구와 준비를 시작했어요. NES에 대해 찾을 수 있는 모든 문서를 읽으며 실험하고 프로토타입을 만들었어요. 배우는 유일한 방법은 경험해 보는 것이에요.

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

워킹 에뮬레이터를 만들기 위해 다룰 필요가 있는 영역들이었어요:

- CPU와 메모리
- ROM 지원, 즉, 게임 데이터 로딩
- 그래픽 처리 및 렌더링
- 입력 처리

오디오는 제외하기로 결정했어요. 시간이 남는다면 나중에 돌아올 수도 있겠죠. 그래픽 작업은 아주 어렵게 보였어요. 겁도 났죠. 이해할 수 없는 거였어요. 그 어려움을 겪으면서 해결책을 찾아나갈 거예요.

또한 초기 닌텐도 게임만 지원하기로 결정했어요. Donkey Kong, Mario Bros. 등을 예로 들 수 있어요. 나중 게임들은 게임 카트리지의 커스텀 칩이 제공하는 고급 기능에 의존했어요. 이러한 다양한 "매퍼"들도 에뮬레이션할 수 있고, 다른 더 "완벽한" 에뮬레이터들도 그랬어요. 하지만 그 정도로는 가지 않기로 했어요. 초기 코어 게임들을 지원하는 것이 충분할 거라고 판단했죠.

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

일어나는 부분은 그 원래의 NES 게임들이 (소리 없이) 가능한 많이 원래의 경험을 복제하며 부드럽게 플레이할 수 있을 때 점에 도달한 것만으로 충분히 성과 여부라고 할 수 있습니다. 나는 기존의 NES 에뮬레이터와 경쟁하기 위해 이것을 제작한 것이 아니었습니다. 이는 배우기, 도전, 성장, 그리고 대단한 도파민 분비를 경험하는 것에 관한 것이었습니다.

CPU로 시작했습니다. NES는 MOS Technology 6502로 구동되었는데, 그것은 그 시대의 여러 컴퓨터 시스템과 게임 콘솔에서 사용되는 인기 있는 8비트 프로세서였습니다. 잘 문서화되어 있고 이해하기 쉽습니다. 에뮬레이터를 디버깅하기 위해 6502 어셈블리어를 배워야 했습니다. C++로 작업했고, addressing mode와 instructions을 코딩하고 테스트했습니다. 레지스터, 플래그, 옵코드, 클럭 타이밍도 했습니다.

단지 하나의 큰 연속된 루프였으며 switch 문을 가지고 지침을 처리했습니다. 옵코드 읽기. 어떤 지침인지 판단하기. 어떤 addressing mode인지 판단하기. 메모리 내 위치에서 데이터를 가져오기. 적절한 작업을 수행하기. 메모리에 다시 기록하기. 여기저기 레지스터와 플래그를 마구 조작하며.

내부 작업을 시각화할 수 있었습니다. 프로세서 작동 이론을 알고 있는 것도 하나이지만, 그것을 코드로 시뮬레이션하고 단계별로 실행하는 것은 다른 문제입니다.

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

그것은 간단했어요. 우아했어요.

게임 데이터를 불러오는 것이 더욱 간단했어요. 게임 데이터는 카트리지에서 추출되어 "ROM"으로 온라인에 제공됩니다. 라이센스와 저작권 문제 때문에 ROM을 그냥 다운로드하는 것은 합법적이지 않습니다. 원본 게임을 소유하고 있다면 제외입니다. 그리고 저는 원본 게임을 소유했죠.

ROM 형식은 합리적이었어요. 구성 플래그, 게임 로직, 배경 타일, 캐릭터 스프라이트가 포함되어 있었죠. 모든 것을 파싱하고 제 에뮬레이터의 메모리(간단한 배열)에 로드했어요.

거기에는 NES의 그래픽 하드웨어인 PPU(Picture Processing Unit)가 있었습니다. 발칙했어요. 이것이 어려웠어요.

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

"스캔라인” 중 262개가 있습니다. 화면에 표시되는 것은 이중 240개입니다. 수평 선들. 256픽셀의 행들. 배경 타일과 캐릭터 스프라이트로 구성되어 있습니다. 모두가 표시될 256 x 240 프레임을 이루고 있습니다.

첫 번째 시도는 ASCII로 일부 배경 타일을 텍스트 파일에 렌더링해보는 것이었습니다. 픽셀 행들을 올바르게 해석하고 조립할 수 있는지 확인해보려는 것이었습니다.

게임의 타이틀 화면을 ASCII 문자로 대략적으로 렌더링한 텍스트 파일은 첫 번째 성공의 순간이었습니다. 2개월 정도 지난 후에였죠. 올바른 방향에 있다는 첫 번째 확인 신호였습니다.

<img src="/assets/img/2024-08-03-WhyIWroteANintendoEmulator_2.png" />"

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

백그라운드 렌더링을 완벽하게 작동하도록 집중했어요. 우선은 흑백으로 시작했어요. 컬러 팔레트는 조금 까다로웠어요 (룩업 테이블로 하드 코딩되어 있었죠).

다음은 흑백 단계에서의 동키콩 이미지에요. 왼쪽 상단에 있는 동키콩 캐릭터는 배경 타일들로 이루어진 스프라이트가 아니에요. 보이지 않는 마리오도 있고, 그리고 다운으로 떨어지는 배럴과 다른 장애물들을 포함한 전경 스프라이트가 될 거에요. 그 다음에 할 작업이었어요.

이미지:

백그라운드 렌더링을 완벽하게 작동하도록 집중했어요. 우선은 흑백으로 시작했어요. 컬러 팔레트는 조금 까다로웠어요 (룩업 테이블로 하드 코딩되어 있었죠).

다음은 흑백 단계에서의 동키콩 이미지에요. 왼쪽 상단에 있는 동키콩 캐릭터는 배경 타일들로 이루어진 스프라이트가 아니에요. 보이지 않는 마리오도 있고, 그리고 다운으로 떨어지는 배럴과 다른 장애물들을 포함한 전경 스프라이트가 될 거에요. 그 다음에 할 작업이었어요.

화면에 256 x 240 픽셀로 조립된 프레임 버퍼를 가져와 화면에 표시하는 것은 SDL 라이브러리를 사용해서 처리했어요. 이 라이브러리는 디스플레이 출력, 디바이스 입력 등을 제공해요. 정말 간단하게 화면에 프레임 버퍼를 뿌려줄 수 있었어요.

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

다음으로, 전경 스프라이트, 즉 움직이는 요소에 대해 생각해 보겠습니다. 이러한 스프라이트를 렌더링하고 이미 프레임 버퍼에 추가된 것과 섞습니다. 한 줄씩 작업합니다. 많은 비트 시프트 연산을 거치며 위치와 방향에 따라 스프라이트를 계산하는 방법을 찾아내려고 노력해왔는데, 이 일은 거의 제 정신을 잃도록 만들었습니다.

종이 위에서 이를 이해하려고 몇 주 동안 노력하며 정신을 바짝 차릴 때도 있었습니다. 종이 조각과 노트북으로 둘러싸인 기차 안에서 열정적으로 코드를 메겨가며 스프라이트를 올바르게 렌더링하는 방법을 규명하기 위해 이상한 기호를 적는 재미있는 순간들이었죠.

결국, 문제를 해결했습니다. 아니면 문제가 저를 해결했을지도 모르겠군요. 스프라이트를 올바른 위치에 올바른 가로 및 세로 방향으로 렌더링하고, 다른 "투명하지 않은" 스프라이트나 배경 요소에 닿은 스프라이트의 어느 부분이든 "충돌" 플래그를 설정합니다. 즉, 충돌 감지, 즉 "마리오 머리를 통해 통나무가 충돌했나요?"와 같은 작업을 수행합니다.

이것은 스프라이트 프레임을 렌더링하는 데 사용된 함수입니다.

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
inline void PPU::render_sprite_frame() {
    for (int i = 252; i >= 0; i -= 4) {
        Byte* sprite = &SPR_RAM[i];

        int y_pos = sprite[0] + 1;
        int h_pos = sprite[3];

        int tile_index = sprite[1] << 4;

        Byte* tile = &sprite_pattern_table[tile_index];

        int palette_index = (((sprite[2] >> 1) & 1) << 1) | (sprite[2] & 1);

        bool h_flip = (sprite[2] >> 6) & 1;
        bool v_flip = (sprite[2] >> 7) & 1;

        //bool bg_priority = (sprite[2] >> 5) & 1;

        int pixels[8][8];

        for (int j = 0; j < 8; j++) {
            int k = 0;
            for (int bit = 7; bit >= 0; bit--) {
                int colour_index = (((tile[j + 8] >> bit) & 1) << 1) | ((tile[j] >> bit) & 1);

                // 만약 투명한 색상이 아닌 경우...
                if (colour_index > 0)
                    pixels[j][k] = VRAM[SPRITE_PALETTE + (palette_index << 2) + colour_index];
                // 그렇지 않으면 해당 픽셀을 투명(-1)으로 표시
                else
                    pixels[j][k] = -1;

                k++;
            }
        }

        // 타일 픽셀을 프레임버퍼로 복사
        for(int v = 0; v < 8; v++)

            for(int h = 0; h < 8; h++)

                if (y_pos + v < 240 && pixels[v][h] != -1) {
                    int y = y_pos + (v_flip ? 7 - v : v);
                    int x = h_pos + (h_flip ? 7 - h : h);
                    Byte bg_pixel = framebuffer[y][x];

                    // 스프라이트 0에만 해당
                    if (i == 0 && (bg_pixel != VRAM[IMAGE_PALETTE] && pixels[v][h] != VRAM[SPRITE_PALETTE])) {
                        // 만약 배경 픽셀과 스프라이트 0 픽셀이 투명이 아닌 경우 히트 플래그 설정
                        PPU_Status_Reg |= 0x40;
                    }

                    framebuffer[y][x] = pixels[v][h];
                }
    }
}
```

그래요. 그랬어요. 배경 및 전경 스캔라인. 조립, 프레임 버퍼에 합성하고, 그리고 표시되었어요. 루프 내에서 계속해서.

그런 다음 필요한대로 크기가 조정된 256x240 픽셀을 간단한 SDL 라이브러리 함수로 출력했어요. 전체 화면 모드도 제공했어요.

SDL 라이브러리는 키보드 입력에도 사용되었죠. "버튼 눌림" 또는 "버튼 떼기" 상태를 고정된 위치의 메모리에 설정함으로써 처리되는 키 감지가 CPU에 의해 읽혀 인터럽트를 발생시켰어요.

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

각 스캔 라인당 CPU 사이클 수와 미리 설정된 "명령 당 사이클" 데이터를 계산하여 타이밍을 처리했습니다. 그 덕분에 에뮬레이션을 일정한 속도로 유지할 수 있었어요.

그리고 그것이었어요. 마침내 작동하는 에뮬레이터를 만들었습니다! 플레이할 수 있었어요. 원활하게 실행되었습니다.

![이미지](/assets/img/2024-08-03-WhyIWroteANintendoEmulator_4.png)

하지만 아직 끝나지 않았어요. 데모를 만들어야 했고 약간의 화려함이 필요했습니다. 게임이 컨트롤러로 플레이되도록 디자인되었는데 키보드로 하는 게임은 재미없잖아요?

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

원래 컨트롤러를 지원하게 추가할 거에요. 어떤 컨트롤러인가요? 원래 NES 컨트롤러인요.

원래 NES 컨트롤러 두 개를 가지고 있어요. USB 마이크로컨트롤러 칩들 몇 개를 가졌어요. 컨트롤러를 열어서 기존 케이블들을 자르고 USB 마이크로컨트롤러에 납땜했어요.

왔죠! USB NES 컨트롤러가 완성됐어요!

![image](/assets/img/2024-08-03-WhyIWroteANintendoEmulator_5.png)

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

![이미지1](/assets/img/2024-08-03-WhyIWroteANintendoEmulator_6.png)

![이미지2](/assets/img/2024-08-03-WhyIWroteANintendoEmulator_7.png)

그게 다였다. 나는 끝났다.

데모는 매우 성공적이었다. 내가 한 일에 대해 혼란스러워했던 사람들이 있었다. 다른 모든 졸업 프로젝트들은 웹사이트였기 때문이다.

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

내가 컴퓨터 과학을 부르게 된 것 같았어요.

결과에 만족하고 성취감을 느꼈어요. 6개월 이상 동안 제 삶이었던 거예요. 완전한 집착 그 자체였죠. 되지 않을 것 같다고 생각하고 포기하고 싶었던 순간들이 있었어요. 되돌아보면, 테스트 주변에서 엄격하고 규율된 접근으로 나에게 도와줄 수 있었을 텐데, 그랬더라도 내게 그 때에는 모르는 일이었어요. 그때 나는 해커였죠.

아 그렇다. 학위 논문 쓰는 걸 또 깜빡했네요. 그래서 평가 대부분이 그 부분에서 결정될 건데, 이건 문제가 될 거에요. 얍스.

그것에 대해서는 결코 끝을 보지 않았어요. 사실, 그 학위도 마치지 않았어요. 중퇴했어요. 내가 너무 지쳤었거든요.

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

저도 역시 에뮬레이터를 다시 확인하지 않았어요. 그것으로 끝났어요. 중요한 건 결말이 아니라 그 여정이었거든요.

숙련의 기념일이던 시절이었어요.

몇 년 뒤에 GitHub에 코드를 올렸어요. 2009년 이후로 변경 사항이 없어요. 관심 있는 분들을 위해 여기에 있어요. 코드에는 주석이 달려 있어요. 제 주석 뿐만 아니라 문서 소스에서 복사한 일부 블록도 있어요.

이 게시물을 작성하면서 코드를 활용해 봤는데요. 컴파일하는 데 손쉬웠어요. 15년이 넘은 지금에도 여전히 작동하고 있어요.

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

제 USB NES 컨트롤러가 어떻게 됐는지 전혀 모르겠어요.

포스트를 마무리하는 중인데, 맥북에서 작동 중입니다.

![image](/assets/img/2024-08-03-WhyIWroteANintendoEmulator_8.png)

이 업적을 축하한 적이 없었어요. 이 포스트가 그것을 기념하는 방법이자, 나 자신에게 나도 큰 일을 할 수 있다는 것을 상기시키는 것입니다.

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

아니면 이게 누락된 논문일지도 몰라요.

에뮬레이터를 왜 작성했냐고요? 저에게 모든 일을 같이 하는 것처럼, 그저 즐거움 때문에요.

## 에뮬레이터 실행을 위한 기술적 세부 정보

저장소에 간단한 Makefile이 있습니다. SDL은 sdl-config 도구와 함께 설치되어야 합니다. 대부분의 UNIX/Linux 환경에서 컴파일하고 실행될 것입니다.

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

게임 ROM이 필요합니다. 불법으로 ROM을 다운로드하지 마세요. 여기에는 공개 도메인 ROM이 있습니다 - 사람들이 NES를 위해 만든 게임들이 있어요.

즐겁게 즐기세요!
