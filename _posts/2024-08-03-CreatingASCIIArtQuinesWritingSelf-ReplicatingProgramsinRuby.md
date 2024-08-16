---
title: "Ruby로 ASCII 아트 퀸 만들기 셀프 복제 프로그램 작성 방법"
description: ""
coverImage: "/assets/img/2024-08-03-CreatingASCIIArtQuinesWritingSelf-ReplicatingProgramsinRuby_0.png"
date: 2024-08-03 18:52
ogImage: 
  url: /assets/img/2024-08-03-CreatingASCIIArtQuinesWritingSelf-ReplicatingProgramsinRuby_0.png
tag: Tech
originalTitle: "Creating ASCII Art Quines Writing Self-Replicating Programs in Ruby"
link: "https://medium.com/@sean0628/creating-ascii-art-quines-writing-self-replicating-programs-in-ruby-c5d1f7a1c4e0"
isUpdated: true
---




# 쿼인(Quine)이란 무엇인가요?

쿼인은 자체 복제 프로그램으로, 완전한 소스 코드를 출력물로 생성하는 프로그램입니다. 다시 말해, 쿼인은 어떤 입력도 받지 않고 출력물로 자신의 소스 코드 복사본을 생성하는 프로그램입니다.

쿼인은 실제로 실용적이지는 않지만 작성하기는 재미있고 교육적입니다.

# 루비(Ruby)에서 쿼인을 어떻게 작성할까요?

<div class="content-ad"></div>

이 글에서는 루비로 ASCII 쿼인을 작성하는 방법에 초점을 맞춥니다. 

쿼인은 다음 단계를 따라 작성할 수 있습니다:

- 프로그램의 소스 코드를 나타내는 문자열을 준비합니다.
- 문자열과 문자열의 문자열 표현을 결합하여 원본 소스 코드를 작성합니다.
- 원본 소스 코드를 출력합니다.

## 선행 요구 사항

<div class="content-ad"></div>

Sure! Here is your ASCII art representation of the source code:


1111111111111111
1000000000000001
1000011111000001
1000100000100001
1000100000100001
1000011111000001
1000000000000001
1111111111111111


<div class="content-ad"></div>

```js
aa = <<~AA
  11111111111111111111000000000000000000000000000000000000000011111111111111111111
  11111111111111111111000000000000000000000000000000000000000011111111111111111111
  11111111111111111111000000000000000000011100000000000000000011111111111111111111
  11111111111111111111000000000000000000111110000000000000000011111111111111111111
  111111111111111111110000000000000011111111111100000000000

<div class="content-ad"></div>

## 크고 작은 따옴표의 숨겨진 기능

이전에 인코딩된 ASCII 아트를 얻었으니 이제 루비에서 퀸을 구현할 수 있어요.

다음 단계에 따라 작동합니다:

- 인코딩된 ASCII 아트를 디코딩합니다.
- 문자 그리드를 소스 코드의 문자열로 대체하여 원래 소스 코드를 작성합니다.
- 원래 소스 코드를 출력합니다.

<div class="content-ad"></div>

```
<img src="/assets/img/2024-08-03-CreatingASCIIArtQuinesWritingSelf-ReplicatingProgramsinRuby_0.png" />

- Orange: 프로그램의 소스 코드를 문자열로 얻기.
- White: 인코딩된 ASCII 아트.
- Green: ASCII 아트를 디코딩하고, 원래 소스 코드를 구성하고, 원래 소스 코드를 출력하기.
- Light Blue: 소스 코드를 원래 소스 코드처럼 보이도록 패딩하기.

```js
eval$s=%w(s=%(eval$s                                        =%w(#{$s})*"");b="BA
hsK2n//w8AAAAA8P////                                        8PAAAAAPD/////DwCAAw
Dw/////w8AwAcA8P////                   8PA                  Pw/APD/////DwD8PwDw/
////w/A/D8D8P////8P/                  vvff/                 D/////D////z/w/////w
/8//8/8P////8P//////              D/////D/j//z              /w/////w/g//8H8P////
8PAP//AfD/////D4D//w              Hw/////w8AgA              EA8P////8PAIABAPD///
//DwCAAQDw/////w8AgA          EA  8P////8PAAAA  AP          D//w==";n=Marshal.lo
ad(b.unpack('m')[0])     ;sz=s.siz e;i=0;j=0; o='';whil     e(i<sz&&j<20*80);if(
n&(1<<j)).zero?;o+=3    2.chr;else;o+=s[i];i+=1;end;if      (j%80==79);o+="\n";e
nd;j+=1;end;puts(o);      #eval$s=%w{s=%(eval$s=%w(#{$      s})*"");b="BAhsK2n//
w8AAAAA8P////8PAAAAA    PD/////DwCAAwDw/////w8AwAcA8P///    /8PAPw/APD/////DwD8P
wDw/////w/A/D8D8P///       /8P/vvff/D/////D////z/w////      /w/8//8/8P////8P////
//D/////D/j//z/w////         /w/g//8H8P////8PAP//Af         D/////D4D//wHw/////w
8AgAEA8P////8PAIABAP            D/////DwCAAQDw///           //w8AgAEA8P////8PAAA
AAPD//w==";n=Marshal           .load(b.unpack('m'           )[0]);sz=s.size;i=0;
j=0;o='';while(i<sz&                   j<                   20*80);if(n&(1<<j)).
zero?;o+=32.chr;else                   ;o                   +=s[i];i+=1;end;if(j
%80==79);o+="\n";end                   ;j                   +=1;end;puts(o);q@ev
al$s=@j;}*"";eval$s=                   %w                   {s=%{eval$s=%w(#{$s}
)*""};b="BAhsK2n//w8                                        AAAAA8P////8PAAA)*""
```

## 퀸 실행하기


<div class="content-ad"></div>

```js
$ ruby ca.rb > _ca.rb
$ diff -s ca.rb _ca.rb
ca.rb 및 _ca.rb 파일은 동일합니다.
```

프로그램의 출력물은 프로그램 자체의 원본 소스 코드입니다.

# 결론

이 글에서는 쿼인(Quine)이 무엇인지, 그리고 루비로 쿼인을 작성하는 방법을 살펴보았습니다. 쿼인은 실제로는 유용하지는 않지만, 재밌고 동시에 교육적인 요소를 품고 있습니다. 다른 언어로 소스 코드를 생성하는 쿼인이나 음악을 연주하는 쿼인과 같은 많은 다른 유형의 쿼인도 있습니다. 쿼인에 관심이 있다면 더 알아보고 직접 쿼인을 작성해 보세요.

<div class="content-ad"></div>

# 참고 자료

- Quine (컴퓨팅) (최근 접속: 2024/08/02)
- JavaScript에서 AA Quine 입문 (최근 접속: 2024/08/02)
- Yusuke Endoh (2015). 『당신이 모르는 초선규 프로그래밍의 세계』.