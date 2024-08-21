---
title: "EC2 인스턴스에 HTML 웹사이트를 호스팅하는 방법"
description: ""
coverImage: "/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_0.png"
date: 2024-06-22 15:27
ogImage:
  url: /assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_0.png
tag: Tech
originalTitle: "How to Host an HTML Website on an EC2 Instance"
link: "https://medium.com/@Biswaraj333/how-to-host-an-html-website-on-an-ec2-instance-3c0f83bb0b32"
isUpdated: true
---

AWS에서 HTML 웹사이트 호스팅하기

![How to Host an HTML Website on an EC2 Instance](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_0.png)

## 요구 사항:

AWS

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

VPC

# 사례 연구 및 소개:

2023년 두 번째 분기에 착한 인터넷 랜드마크 기업으로 시작한 스타트업은 외국인 근로자가 가족에게 돈을 송금하는 수요를 처리할 수 있는 웹 사이트를 구축할 계획입니다. 기관은 클라이언트가 쉽게 사용할 수 있는 웹 사이트를 운영하고자 합니다. 이 튜토리얼에서는 HTML 및 Apache 서버를 사용하여 Amazon EC2에 웹 사이트를 호스팅하는 방법에 대해 설명합니다.

HTML은 경량 언어로 다른 언어와 쉽게 인터페이스할 수 있습니다. 또한 EC2의 우수한 가용성, 보안, 비용 효율성 및 확장성을 활용할 수 있을 것입니다.

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

웹 사이트가 활성화되면 터미널을 사용하여 EC2에 SSH하여 모든 것이 올바르게 작동하는지 확인할 것입니다. 모든 단계를 완료한 후에 사용한 리소스를 정리할 것입니다.

# 목표

- 보안 그룹을 생성하고 포트 80과 22를 허용합니다.
- 기본 VPC를 사용합니다.
- 제공된 서브넷 및 리전을 사용합니다.
- 인스턴스를 시작합니다.
- Apache 웹 서버에 도달할 수 있는지 테스트합니다.
- 정리하기

# 단계 1: 지역 선택

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

새로운 AWS 콘솔을 사용하여 미국 동부(버지니아 북부) 지역을 선택하십시오. 사용하고 싶은 지역을 선택할 수 있습니다.

![이미지](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_1.png)

## 단계 2: 보안 그룹 생성 및 포트 80 및 22 열기

AWS 콘솔에서 VPC를 검색하고 VPC 대시 보드로 이동하세요.

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

아래는 마크다운 형식으로 변환한 내용입니다.

![이미지](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_2.png)

보안 그룹 선택 — 왼쪽 핸드 사이드 메뉴 또는 페이지 중앙에서 찾을 수 있습니다

![이미지](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_3.png)

오른쪽 핸드 사이드에서 '보안 그룹 생성' 버튼을 클릭하세요

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

![How to Host an HTML Website on an EC2 Instance - Step 4](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_4.png)

Create a security group by entering the name and description. You can choose any available VPC. In our case, we selected the default VPC.

![How to Host an HTML Website on an EC2 Instance - Step 5](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_5.png)

Scroll down to Inbound rules. First, add a rule for port 80 to allow internet users to access our website. Click on Add rule and choose HTTP with port 80 always open.

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

<img src="/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_6.png" />

다음으로 할 일은 소스 아래에서 포트 80으로 오는 트래픽을 인터넷의 어느 곳에서든 허용하도록 하는 것입니다. 소스에서 IPv4의 Anywhere를 선택하세요 — 이렇게 하면 자동으로 0.0.0/0이 나타납니다.

여전히 인바운드 규칙 아래에 있습니다. 다음으로 선택할 규칙은 SSH입니다. 이것은 TCP 프로토콜과 22 포트 범위를 나타냅니다. 소스에서 My IP를 선택해야 합니다 — 이것은 여러분의 IP 주소를 보여줍니다.

이것은 포트 22로 들어오는 트래픽이 여러분의 IP 주소에서 오는 경우에만 허용된다는 것을 의미합니다. 포트 22를 통해 EC2 인스턴스에 SSH로 연결할 수 있습니다.

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

보안 최상의 실천을 위해 항상 EC2 인스턴스로 SSH 접속할 수 있는 IP 주소를 귀하의 IP 주소로 제한해야 합니다.

![이미지](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_7.png)

따라서 이 두 가지 규칙을 열어야 합니다. 완료되면 페이지 하단 오른쪽 부분의 '보안 그룹 생성'을 클릭하세요.

![이미지](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_8.png)

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

보안 그룹이 생성되었어요

![이미지](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_9.png)

# 단계 3: EC2 인스턴스 시작. (보안 그룹 및 키페어 추가)

검색 바에서 EC2를 입력하고 서비스에서 EC2를 선택하세요.

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

[![Screenshot 1](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_10.png)](URL_LINK_1)
[![Screenshot 2](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_11.png)](URL_LINK_2)

Scroll down to Application and OS Images (Amazon Machine Image). Under Quick Start select Amazon Linux. The AMI that we are going to use is Amazon Linux 2 AMI Free Tier

[![Screenshot 3](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_12.png)](URL_LINK_3)

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

인스턴스 유형은 t2.micro 프리 티어로 설정됩니다.

![이미지](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_13.png)

키페어(로그인) 항목으로 내려가서 이전에 만들었던 키페어를 선택합니다.

![이미지](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_14.png)

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

네트워크 설정으로 스크롤하여 편집을 클릭하세요. 드롭다운 메뉴에서 선택 가능한 VPC 목록이 표시됩니다. 이전에 사용한 기본 VPC를 선택할 것입니다.

다음으로 이전에 만든 MYSECURITY33 보안 그룹을 선택해야 합니다.

![이미지](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_15.png)

오른쪽에 설정을 확인한 후 인스턴스를 시작을 클릭하세요.

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

![화면 캡처 1](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_16.png)

인스턴스를 성공적으로 시작했습니다. "모든 인스턴스 보기"를 클릭해봐요.

![화면 캡처 2](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_17.png)

![화면 캡처 3](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_18.png)

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

# 단계 4: EC2 인스턴스에 SSH로 접속하기

EC2 인스턴스로 SSH로 접속하려면 myinstance33를 선택하십시오.

![image1](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_19.png)

![image2](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_20.png)

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

cmd에서 키 다운로드 폴더로 이동해주세요.

![이미지](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_21.png)

그리고 여기에 Amazon 링크를 입력해주세요.

![이미지](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_22.png)

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

'yes' 값을 주면 cmd에서 ec2 인스턴스를 받을 수 있습니다.

![EC2 인스턴스](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_23.png)

# 단계 5: 웹 사이트에 필요한 소프트웨어 설치하기

EC2 터미널에 입력해야 하는 첫 번째 명령은 sudo su 이며, Enter를 눌러야 합니다 — 이는 루트 사용자로 변경하는 것을 허용합니다.

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

![이미지](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_24.png)

다음으로 입력해야 할 명령어는 yum update -y 입니다. 초록색 바탕의 프롬프트가 표시되면 다음 명령어를 실행할 수 있습니다.

![이미지](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_25.png)

이제 yum install -y httpd를 입력해 봅시다.

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

![이미지](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_26.png)

다음 명령어는 디렉토리 변경을 의미합니다. 즉, html 디렉토리로 이동하려는 의미입니다. cd /var/www/html 를 입력해 봅시다.

이전에는 ec2 디렉토리에 있었습니다.

![이미지](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_27.png)

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

![이미지](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_28.png)

위 명령을 실행한 후에 html 디렉토리에 이미 들어와 있는 것을 알 수 있습니다.

다음으로 Putty 세션에서 입력해야 할 명령은 다음과 같습니다: wget https://github.com/azeezsalu/techmax/archive/refs/heads/main.zip

각 명령어를 정의해 봅시다:

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

`wget`은 EC2 인스턴스로 파일을 다운로드하는 데 사용하는 Linux 명령어입니다.

다운로드하려는 파일이 위치한 URL입니다: https://github.com/azeezsalu/techmax/archive/refs/heads/main.zip

파일은 main.zip에 다운로드되었습니다. 파일을 확인하려면 ls를 입력해보세요.

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

![Image](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_30.png)

웹 파일을 EC2 인스턴스로 다운로드하고 나면, 웹 파일을 이 zip 폴더에 넣게 됩니다. 그리고 그 다음 단계로 이어집니다.

# Step 6: HTML 디렉토리에 웹 파일 넣기

우리는 웹사이트를 볼 수 있도록 html 디렉토리에 웹 파일을 넣어야 합니다. 우리의 다음 명령어가 바로 이 일을 수행할 것입니다. main.zip 파일을 풀기 위해 unzip main.zip을 실행합시다.

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

![How to Host an HTML Website on an EC2 Instance - Step 31](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_31.png)

If we type the ls command, it will show us the zip folder and the unzipped version.

![How to Host an HTML Website on an EC2 Instance - Step 32](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_32.png)

The next step is to copy all our web files from the unzipped version into the html directory. Let's use the following command: cp -r techmax-main/\* /var/www/html/

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

![Image description](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_33.png)

And if we type `ls` again, we are going to see all the web files in the html directory

![Image description](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_34.png)

The next command that we need to do is to remove the `main.zip` and the `techmax-main` that we unzipped because we don’t need them anymore. Let’s type `rm -rf techmax-main main.zip` and press Enter

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

<img src="/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_35.png" />

ls 명령어를 다시 입력하면 main.zip과 techmax-main이 더 이상 표시되지 않습니다.

<img src="/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_36.png" />

이제 모든 준비가 되었습니다! 아파치 서비스를 시작할 준비가 되었습니다.

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

# 단계 7: 아파치 서비스 시작하기

다음 두 명령을 실행해봅시다: `systemctl enable httpd`와 `systemctl start httpd`

![이미지 1](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_37.png)

![이미지 2](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_38.png)

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

![image 1](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_39.png)

AWS 콘솔로 돌아가서 EC2 인스턴스 대시보드로 이동합시다. myinstance33 인스턴스를 선택하고 아래의 세부 정보로 이동하세요. 퍼블릭 IPv4 주소를 복사해주세요.

![image 2](/assets/img/2024-06-22-HowtoHostanHTMLWebsiteonanEC2Instance_40.png)

다른 탭이나 창을 열고, 복사한 주소를 주소 창에 붙여넣어주세요.

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

여기 있어요! 우리는 우리 웹사이트에 접속할 수 있어요.

### 결론과 정리

다음과 같이 EC2 인스턴스에 HTML 웹사이트를 호스팅하는 방법이 이렇게 쉬워요. 이 방법을 사용하여 EC2 인스턴스에 어떤 HTML 웹사이트든 호스팅할 수 있어요. 이 튜토리얼에 필요한 모든 것들을 다 배웠으니, 다음 할 일은 EC2 인스턴스를 종료하여 비용을 절약하는 거예요.
