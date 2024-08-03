---
title: "Nextjs 에서 빌드 성능을 향상시키는 방법"
description: ""
coverImage: ""
date: 2024-08-03 15:53
ogImage: 
  url: 
tag: Tech
originalTitle: "지속적인 통합 CI 빌드 캐싱"
link: "undefined"
---



# 지속적 통합 (CI) 빌드 캐싱

빌드 성능을 향상시키기 위해 Next.js는 빌드 간에 공유되는 캐시를 .next/cache에 저장합니다.

지속적 통합 (CI) 환경에서 이 캐시를 활용하려면 CI 워크플로우를 올바르게 구성하여 빌드 간에 캐시를 올바르게 유지해야 합니다.

> .next/cache를 빌드 간에 올바르게 유지하도록 CI가 구성되지 않은 경우 No Cache Detected 오류가 발생할 수 있습니다.

<div class="content-ad"></div>

다음은 일반적인 CI 제공업체에 대한 예시 캐시 구성입니다:

## Vercel

Next.js 캐싱은 자동으로 구성되어 있습니다. 여러분이 할 일은 없습니다.

## CircleCI

<div class="content-ad"></div>

답변 수정:

```bash
Change the table tag to Markdown format.
```

한국어로 번역한 내용입니다. 혹시 더 궁금한 점이 있으시면 언제든지 물어봐 주세요.

<div class="content-ad"></div>

```yaml
캐시를 추가하거나 .travis.yml 파일에 다음을 병합하세요:

cache:
  directories:
    - $HOME/.cache/yarn
    - node_modules
    - .next/cache
```

## GitLab CI

다음을 .gitlab-ci.yml 파일에 추가하거나 병합하세요:

<div class="content-ad"></div>

```yaml
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .next/cache/
```

## Netlify CI

넷리파이 플러그인을 사용해보세요
@netlify/plugin-nextjs와 함께
.

## AWS CodeBuild

<div class="content-ad"></div>

빌드 스펙 YAML에 다음 내용을 추가하거나 병합하세요:

```js
cache:
  paths:
    - 'node_modules/**/*' # `yarn` 또는 `npm i`를 빠르게 실행하기 위해 `node_modules` 캐시
    - '.next/cache/**/*' # 애플리케이션 재빌드를 더 빠르게하기 위해 Next.js 캐시
```

## GitHub Actions

GitHub의 actions/cache를 사용하여, 워크플로 파일에 다음 단계를 추가하세요:

<div class="content-ad"></div>

```yaml
uses: actions/cache@v4
with:
  # `yarn`을 사용하여 캐싱하는 방법은 여기를 참조하세요 https://github.com/actions/cache/blob/main/examples.md#node---yarn 또는 actions/setup-node를 사용하여 캐싱을 활용할 수 있습니다. https://github.com/actions/setup-node
  path: |
    ~/.npm
    ${ github.workspace }/.next/cache
  # 패키지나 소스 파일이 변경될 때마다 새 캐시를 생성합니다.
  key: ${ runner.os }-nextjs-${ hashFiles('**/package-lock.json') }-${ hashFiles('**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx') }
  # 소스 파일이 변경되었지만 패키지가 변경되지 않은 경우 이전 캐시에서 다시 빌드합니다.
  restore-keys: |
    ${ runner.os }-nextjs-${ hashFiles('**/package-lock.json') }-
```

## Bitbucket Pipelines

다음 코드를 bitbucket-pipelines.yml 파일의 최상위 수준(pipelines와 동일한 수준)에 추가하거나 병합합니다:

```yaml
definitions:
  caches:
    nextcache: .next/cache
```

<div class="content-ad"></div>

그런 다음 파이프라인 단계의 캐시 섹션에서 그것을 참조하세요:

```js
- step:
    name: your_step_name
    caches:
      - node
      - nextcache
```

## Heroku

Heroku의 사용자 정의 캐시를 사용하려면, top-level package.json에 cacheDirectories 배열을 추가하세요.

<div class="content-ad"></div>

```js
"cacheDirectories": [".next/cache"]
```

## Azure Pipelines

Azure Pipelines의 캐시 작업을 사용하여, 다음 빌드를 실행하는 작업 이전 어딘가에 아래 작업을 파이프라인 yaml 파일에 추가하세요:

```js
- task: Cache@2
  displayName: 'Cache .next/cache'
  inputs:
    key: next | $(Agent.OS) | yarn.lock
    path: '$(System.DefaultWorkingDirectory)/.next/cache'
```

<div class="content-ad"></div>

## Jenkins (파이프라인)

Jenkins의 Job Cacher 플러그인을 사용하여, 일반적으로 다음 빌드 또는 npm install을 실행하는 부분에 다음 빌드 단계를 Jenkinsfile에 추가해보세요:

```js
stage("npm 패키지 복원") {
    steps {
        // GIT_COMMIT 해시를 기반으로 캐시에 락 파일 작성
        writeFile file: "next-lock.cache", text: "$GIT_COMMIT"

        cache(caches: [
            arbitraryFileCache(
                path: "node_modules",
                includes: "**/*",
                cacheValidityDecidingFile: "package-lock.json"
            )
        ]) {
            sh "npm install"
        }
    }
}
stage("빌드") {
    steps {
        // GIT_COMMIT 해시를 기반으로 캐시에 락 파일 작성
        writeFile file: "next-lock.cache", text: "$GIT_COMMIT"

        cache(caches: [
            arbitraryFileCache(
                path: ".next/cache",
                includes: "**/*",
                cacheValidityDecidingFile: "next-lock.cache"
            )
        ]) {
            // aka `next build`
            sh "npm run build"
        }
    }
}
```

<div class="content-ad"></div>
