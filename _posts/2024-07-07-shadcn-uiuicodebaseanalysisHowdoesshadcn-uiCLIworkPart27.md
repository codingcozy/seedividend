---
title: "shadcn-ui UI 코드베이스 분석 shadcn-ui CLI는 어떻게 작동하나요  27부"
description: ""
coverImage: "/TIL/assets/img/2024-07-07-shadcn-uiuicodebaseanalysisHowdoesshadcn-uiCLIworkPart27_0.png"
date: 2024-07-07 22:00
ogImage:
  url: /assets/img/2024-07-07-shadcn-uiuicodebaseanalysisHowdoesshadcn-uiCLIworkPart27_0.png
tag: Tech
originalTitle: "shadcn-ui ui codebase analysis: How does shadcn-ui CLI work? — Part 2.7"
link: "https://medium.com/@ramu.narasinga_61050/shadcn-ui-ui-codebase-analysis-how-does-shadcn-ui-cli-work-part-2-7-534165164380"
---

shadcn-ui CLI가 어떻게 작동하는지 알아보고 싶었어요. 이 글에서는 shadcn-ui/ui CLI를 구축하는 데 사용된 코드에 대해 이야기하고 있어요.

2.6 부에서는 프로젝트의 ts-config.json 파일에서 사용되는 별칭을 반환하는 getTsConfigAliasPrefix 함수를 살펴봤어요.

이제 다음 코드 라인으로 넘어가 봅시다.

![이미지](/TIL/assets/img/2024-07-07-shadcn-uiuicodebaseanalysisHowdoesshadcn-uiCLIworkPart27_0.png)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

L84에서는 projectType 또는 tailwindCssFile 또는 tsConfigAliasPrefix 중 하나라도 존재하지 않는 경우 null을 반환하는 간단한 확인 작업입니다.

isTypescriptProject(cwd)에 대해 더 알아보겠습니다.

```js
const isTsx = await isTypeScriptProject(cwd);
```

isTypescriptProject는 ui/packages/cli/src/utils/get-project-info.ts로부터 가져온 함수이며, 이 함수는 현재 작업 디렉토리(cwd)에 tsconfig.json 파일이 있는지 확인합니다.

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

```js
export async function isTypeScriptProject(cwd: string) {
  // cwd에 tsconfig.json 파일이 있는지 확인합니다.
  return pathExists(path.resolve(cwd, "tsconfig.json"));
}
```

# pathExists

pathExists는 fs-extra에서 가져온 함수입니다.

```js
import fs, { pathExists } from "fs-extra";
```

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 결론:

프로젝트가 TypeScript를 사용하는지 확인하려면 shadcn-ui/ui CLI 패키지와 같은 작업을 수행할 수 있습니다. 즉, fs-extra에서 제공하는 pathExists 함수를 사용하여 지정된 cwd에 있는 tsconfig.json 경로가 있는지 확인하면 됩니다.

# 나에 대해:

웹사이트: [https://ramunarasinga.com/](https://ramunarasinga.com/)

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

Linkedin: [링크드인](https://www.linkedin.com/in/ramu-narasinga-189361128/)

Github: [깃허브](https://github.com/Ramu-Narasinga)

이메일: ramu.narasinga@gmail.com

shadcn-ui/ui를 처음부터 만들기

<!-- TIL 수평 -->

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-4877378276818686"
     data-ad-slot="1549334788"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>

<script>
(adsbygoogle = window.adsbygoogle || []).push({});
</script>

# 참고 자료:

- [shadcn-ui 프로젝트 정보 가져오기](https://github.com/shadcn-ui/ui/blob/main/packages/cli/src/utils/get-project-info.ts#L84C3-L88C47)
- [shadcn-ui 프로젝트 정보 가져오기](https://github.com/shadcn-ui/ui/blob/main/packages/cli/src/utils/get-project-info.ts#L174)
- [shadcn-ui 프로젝트 정보 가져오기](https://github.com/shadcn-ui/ui/blob/main/packages/cli/src/utils/get-project-info.ts#L10)
- [fs-extra 패키지](https://www.npmjs.com/package/fs-extra)
