---
title: "Docker Scout 이미지 분석 방법"
description: ""
coverImage: "/assets/img/2024-07-10-DockerScoutimageanalysis_0.png"
date: 2024-07-10 02:08
ogImage:
  url: /assets/img/2024-07-10-DockerScoutimageanalysis_0.png
tag: Tech
originalTitle: "Docker Scout image analysis"
link: "https://medium.com/@meghasharmaa704/docker-scout-image-analysis-80274cfaf5b7"
isUpdated: true
---

![이미지](/assets/img/2024-07-10-DockerScoutimageanalysis_0.png)

이미지 분석을 활성화하면 Docker Scout가 해당 저장소로 푸시하는 새 이미지를 자동으로 분석합니다.

이미지 분석은 소프트웨어 자재 목록(SBOM) 및 기타 이미지 메타데이터를 추출하고, 보안 공지의 취약점 데이터와 비교하여 평가합니다.

CLI 또는 Docker Desktop을 사용하여 일회성 작업으로 이미지 분석을 실행하는 경우, Docker Scout는 이미지에 대한 데이터를 저장하지 않습니다. 그러나 컨테이너 이미지 저장소에 Docker Scout를 활성화하면, Docker Scout는 분석 후 이미지의 메타데이터 스냅샷을 저장합니다. 새로운 취약점 데이터가 제공되면 Docker Scout는 메타데이터 스냅샷을 사용하여 분석을 재보정하므로 이미지의 보안 상태가 실시간으로 업데이트됩니다. 이 동적 평가는 새 CVE 정보가 공개될 때 이미지를 다시 분석할 필요가 없음을 의미합니다.

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

Docker Scout 이미지 분석은 Docker Hub 저장소에서 기본적으로 제공됩니다. 또한 제3자 레지스트리와 다른 서비스를 통합할 수도 있습니다.

👉 저장소에서 Docker Scout 활성화하기

Docker Scout의 무료 티어를 사용하면 Docker 조직 당 최대 3개의 저장소에 대해 Docker Scout를 사용할 수 있습니다. 추가 저장소가 필요한 경우 Docker Scout 요금제를 업데이트할 수 있습니다.

제3자 레지스트리의 저장소에서 이미지 분석을 활성화하려면 해당 레지스트리가 Docker 조직의 Docker Scout와 통합되어 있어야 합니다. Docker Hub는 기본적으로 통합되어 있습니다.

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

이미지 분석을 활성화하려면:

- 도커 스카우트 대시보드의 저장소 설정으로 이동합니다.
- 활성화하려는 저장소를 선택합니다.
- 이미지 분석을 활성화합니다.

저장소에 이미지가 이미 있는 경우 도커 스카우트는 최신 이미지를 자동으로 가져와 분석합니다.

참고: 저장소에서 이미지 분석을 활성화하려면 도커 조직의 편집자 또는 소유자 역할이 있어야 합니다.

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

👉 레지스트리 이미지 분석하기

레지스트리 내 이미지의 분석을 활성화하려면 이미지를 Docker Scout와 통합된 레지스트리에 푸시하세요. 이미지 분석이 활성화된 저장소로 푸시해주세요.

참고: Docker Scout 플랫폼에서의 이미지 분석은 이미지 파일 크기 제한이 10GB이며, 단 이미지에 SBOM 보증이 있는 경우에는 제한이 없습니다.

- Docker ID로 로그인하세요. docker login 명령을 사용하거나 Docker Desktop에서 로그인 버튼을 클릭하세요.
- 분석하고 싶은 이미지를 빌드하고 푸시하세요.

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
docker build --push --tag <org>/<image:tag> --provenance=true --sbom=true .
```

--provenance=true 와 --sbom=true 플래그를 사용하여 이미지에 빌드 증명을 첨부합니다. Docker Scout는 증명을 사용하여 자세한 분석 결과를 제공합니다.

3. Docker Scout 대시보드에서 이미지 페이지로 이동합니다.

이미지가 레지스트리에 푸시되면 목록에 빠르게 표시됩니다. 분석 결과가 나타나기까지는 몇 분 정도 걸릴 수 있습니다.

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

👉 로컬 이미지 분석하기

도커 스카우트를 이용하여 도커 데스크톱 또는 도커 CLI의 명령어를 사용하여 로컬 이미지를 분석할 수 있습니다.

도커 데스크톱:

도커 데스크톱 GUI를 사용하여 로컬 이미지를 분석하는 방법:

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

- 분석하고 싶은 이미지를 가져오거나 빌드하세요.
- 도커 대시보드의 이미지 뷰로 이동하세요.
- 목록에서 로컬 이미지 중 하나를 선택하세요.

CLI:

도커 탐색기 CLI 명령은 터미널에서 도커 탐색기를 사용하기 위한 명령 줄 인터페이스를 제공합니다.

- docker scout quickview: 지정된 이미지에 대한 요약 정보
- docker scout cves: 지정된 이미지의 로컬 분석
- docker scout compare: 두 이미지를 분석하고 비교합니다.

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

기본적으로 결과는 표준 출력으로 출력됩니다. 또한 Static Analysis Results Interchange Format (SARIF)와 같은 구조화된 형식의 파일로 결과를 내보낼 수도 있습니다.

퀵뷰:

도커 스카우트 퀵뷰 명령은 지정된 이미지와 해당 베이스 이미지에서 발견된 취약점에 대한 개요를 제공합니다.

```js
$ docker scout quickview traefik:latest
✓ 이미지의 SBOM 이미 이미 캐시됨, 311개 패키지 색인

당신의 이미지 traefik:latest  │ 0C 2H 8M 1L
베이스 이미지 alpine:3 │ 0C 0H 0M 0L
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

만약 기본 이미지가 오래되었다면, quickview 명령어는 기본 이미지를 업데이트하는 것이 이미지의 취약성 노출을 어떻게 변경할지 보여줍니다.

```js
$ docker scout quickview postgres:13.1
✓ Pulled
✓ Image stored for indexing
✓ Indexed 187 packages

Your image  postgres:13.1                 │   17C    32H    35M    33L
Base image  debian:buster-slim            │    9C    14H     9M    23L
Refreshed base image  debian:buster-slim  │    0C     1H     6M    29L
                                          │    -9    -13     -3     +6
Updated base image  debian:stable-slim    │    0C     0H     0M    17L
                                          │    -9    -14     -9     -6
```

CVEs:

도커 스카우트 cves 명령어는 이미지 내 모든 취약성을 완전하게 보여줍니다. 이 명령어는 여러 플래그를 지원하여 취약성을 더 정확히 지정할 수 있도록 합니다. 예를 들어 심각성이나 패키지 유형별로 관심 있는 취약성을 지정할 수 있습니다.

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
$ docker scout cves --format only-packages --only-vuln-packages \
  --only-severity critical postgres:13.1
 ✓ 이미지의 SBOM은 이미 캐시되어 있습니다. 187개의 패키지가 인덱싱되었습니다.
 ✗ 총 10개의 취약한 패키지를 탐지했습니다. 이 중에는 17개의 취약점이 있습니다.

 이름           버전                유형        취약점
───────────────────────────────────────────────────────────────────────────
 dpkg         1.19.7                 deb       1C     0H     0M     0L
 glibc        2.28-10                deb       4C     0H     0M     0L
 gnutls28     3.6.7-4+deb10u6        deb       2C     0H     0M     0L
 libbsd       0.9.1-2                deb       1C     0H     0M     0L
 libksba      1.3.5-2                deb       2C     0H     0M     0L
 libtasn1-6   4.13-3                 deb       1C     0H     0M     0L
 lz4          1.8.3-1                deb       1C     0H     0M     0L
 openldap     2.4.47+dfsg-3+deb10u5  deb       1C     0H     0M     0L
 openssl      1.1.1d-0+deb10u4       deb       3C     0H     0M     0L
 zlib         1:1.2.11.dfsg-1        deb       1C     0H     0M     0L
```

👉 취약성 심각도 평가

Docker Scout는 취약성 데이터를 사용하여 취약성에 대한 심각도 등급을 할당합니다. 이러한 정보는 공람원으로부터 수신된 것이며, 관련된 패키지의 종류에 따라 등급이 부여됩니다.

예를 들어, 취약점이 OS 패키지에 영향을 미치는 경우, 배포 유지자에 의해 할당된 심각성 레벨이 우선 순위를 갖습니다.

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

만약 선호하는 안내 원천이 CVE에 심각성 등급을 할당했지만 CVSS 점수는 할당하지 않은 경우, Docker Scout는 다른 원천에서 CVSS 점수를 표시합니다. 선호하는 안내의 심각성 등급과 대체 원천에서의 CVSS 점수가 함께 표시됩니다. 이는 선호하는 안내가 LOW 등급을 할당하지만 CVSS 점수를 할당하지 않으면서 대체 원천 안내가 9.8의 CVSS 점수를 할당하는 경우 LOW 심각성 등급에 9.8의 CVSS 점수가 있는 취약점이 될 수 있다는 것을 의미합니다.

어떤 원천에서도 CVSS 점수가 할당되지 않은 취약점은 Unspecified(U)로 분류됩니다.

Docker Scout는 독자적인 취약점 메트릭스 시스템을 구현하지 않습니다. 모든 메트릭스는 Docker Scout가 통합하는 보안 안내에서 상속됩니다. 안내들은 취약점을 분류하기 위해 서로 다른 임계값을 사용할 수 있지만 대부분은 CVSS v3.0 사양을 준수하며 CVSS 점수를 다음 표에 따라 심각성 등급에 매핑합니다:

```js
CVSS 점수         심각성 등급
──────────────────────────────────
0.1 – 3.9            낮음 (L)
4.0 – 6.9            중간 (M)
7.0 – 8.9            높음 (H)
9.0 – 10.0           매우 심각함 (C)
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

노트: 이전에 설명한 지침 우선순위 및 후퇴 메커니즘을 고려할 때, Docker Scout에 표시된 심각도 등급은 이 등급 시스템과 다를 수 있습니다.

👉 최대 이미지 크기:

Docker Scout 플랫폼의 이미지 분석 및 Docker Desktop의 백그라운드 인덱싱으로 트리거된 분석은 이미지 파일 크기 제한이 10 GB(압축해제되지 않은 크기)로 설정되어 있습니다. 이보다 큰 이미지를 분석하려면 다음 중 하나를 선택할 수 있습니다:

- 빌드 시 SBOM 증명서 첨부
- CLI를 사용하여 로컬로 이미지 분석

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

지역에서 분석된 이미지와 SBOM 서류가 첨부된 이미지는 최대 파일 크기 제한이 없습니다.
