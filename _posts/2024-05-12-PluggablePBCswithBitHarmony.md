---
title: "플러거블 PBC와 비트 하모니에 대해 알아보기"
description: ""
coverImage: "/assets/img/2024-05-12-PluggablePBCswithBitHarmony_0.png"
date: 2024-05-12 23:12
ogImage: 
  url: /assets/img/2024-05-12-PluggablePBCswithBitHarmony_0.png
tag: Tech
originalTitle: "Pluggable PBCs with Bit Harmony"
link: "https://medium.com/bitsrc/pluggable-pbcs-with-bit-harmony-aaa2cb4e3638"
isUpdated: true
---




## 패키지 비즈니스 능력을 표준화하고 통합을 간소화하는 방법

![플러그 가능한 PBC와 비트 하모니](/assets/img/2024-05-12-PluggablePBCswithBitHarmony_0.png)

'패키지 비즈니스 능력' (PBCs), Gartner가 만든 용어로, 비즈니스 모델, 목표 및 언어와 일치하는 소프트웨어의 독립적으로 배포 가능하며 기능적으로 이산적인 단위입니다.

PBC의 도입이 점점 보급화되면서, 구현 및 통합을 숙달하는 조직들은 기술적 발전을 활용하여 지속적인 성장과 성공을 이끌어내기 위해 그 산업의 최전선에 자리한다는 것을 발견하게 될 것입니다.



이 기사에서는 조직의 패키지 비즈니스 기능을 크게 향상시킬 수 있는 도구 인 Bit Harmony를 탐색할 것입니다.

Bit Harmony는 스마트 의존성 주입을 사용하여 PBC(Package Business Capabilities)의 구성을 위한 혁신적인 플랫폼입니다. Bit Harmony를 사용하면 퓨전 팀이 최소한의 오버헤드로 PBC를 구성하고 일관성과 재사용성을 보장하면서 새로운 경험이나 앱을 가속화하여 제공할 수 있습니다.

![이미지](/assets/img/2024-05-12-PluggablePBCswithBitHarmony_1.png)

이 접근 방식의 데모를 보려면 'Apparel Wave' 범위 및 'Blog PBC' 범위를 방문해주세요.



<img src="/assets/img/2024-05-12-PluggablePBCswithBitHarmony_2.png" />

<img src="/assets/img/2024-05-12-PluggablePBCswithBitHarmony_3.png" />

# 측면

측면은 Harmony 솔루션의 구성 요소입니다. 다른 측면들에 대한 UI 및 백엔드 "서비스"를 제공하는 풀 스택 비트 컴포넌트입니다.



이 기사에서 Aspect는 더 큰 시스템에 플러그인되어 완전한 솔루션, 새로운 애플리케이션을 형성할 수 있는 단일 패키지 비즈니스 기능 (PBC)을 나타냅니다.

![이미지](/assets/img/2024-05-12-PluggablePBCswithBitHarmony_4.png)

Aspects는 다른 측면을 확장하기 위해 그들의 '슬롯' API에 등록함으로써 확장됩니다. 이러한 제어 반전으로 인해 퓨전 팀은 측면이 통합을 담당하고 있는 시스템이 아니라는 최소한의 오버헤드로 PBC를 구성할 수 있습니다.

예를 들어, 다음 Harmony 앱은 서퍼용 의류 온라인 쇼핑몰입니다. 해당 온라인 스토어를 담당하는 퓨전 팀은 사이트에 블로그를 추가하기로 결정했습니다. Bit 플랫폼에서 적합한 PBC를 찾은 후, 그들은 이 블로그 PBC를 발견했습니다. 그것을 사용하기로 결정하여, Harmony 애플리케이션에 추가했습니다:



```js
/**
 * @coponentId: learnbit.apparel-waves/apparel-waves
 * @filename: apparel-waves.bit-app.ts
 */ 

// imports...
import { SymphonyPlatformAspect } from '@bitdev/symphony.symphony-platform';
import { ApparelWavesPlatformAspect } from '@learnbit/apparel-waves.apparel-waves-platform';
import { BlogAspect } from '@learnbit/blog-pbc.blog';

export const ApparelWaves = HarmonyPlatform.from({
  name: 'apparel-waves',
  platform: [
   /**
    * ascpects register themsevles to the 'platform' aspect which
    * is the entry point for this application
    */
    SymphonyPlatformAspect,
    {
      name: 'Apparel Waves',
      slogan: 'Making waves in fashion',
      domain: 'apparel-waves.com',
    },
  ],
  /**
    * aspects can run in multiple runtime environments. here, aspects 
    * provide functionalitis to the NodeJS services and to the web frontend apps
   */
  runtimes: [new BrowserRuntime(), new NodeJSRuntime()],

  aspects: [
    /* 'apperal waves' aspect extends the system with its 
     * own unique functionalities. this aspect is maintained by 
     * a fusion team that composes the PBCs for their own solution.
     */
    ApparelWavesPlatformAspect,
    /**
     * the blog (PBC) aspect extends the system with content 
     * management capabilities. it is maintained by the blog PBC team.
     */
    [
      BlogAspect,
      {
       /**
         * the blog aspect also provide a config api for this app to use
         * in this case, since the the blog uses the Contenful platform,
         * the fusion team need to provide it with their own Contentful space ID
         */        
        spaceId: 'contentful-spaceId',
      },
    ],
  ],
});

export default ApparelWaves;
```

<img src="/assets/img/2024-05-12-PluggablePBCswithBitHarmony_5.png" />

Blog PBC (aspect)는 플랫폼에 여러 가지 방법으로 자체적으로 등록됩니다:

- 노드를위한 GraphQL 스키마를 내용 검색을 위한 노드로 확장합니다. 이 작업은 NodeJS 런타임에서 수행됩니다.
- 시스템의 라우팅을 /blog 경로로 확장합니다. 이 작업은 브라우저 런타임에서 수행됩니다.
- 헤더에 'Blog' 링크를 /blog로 추가하여 확장합니다. 이 작업은 브라우저 런타임에서 수행됩니다.



NodeJS 런타임

```js
/**
 * @coponentId: learnbit.blog-pbc/blog
 * @filename: blog.node.runtime.ts
 */

export class BlogNode {
  constructor(private config: BlogConfig) {}

  async getBlogPosts() {
    const blogData = new BlogData(this.config);
    return blogData.getBlogPosts();
  }

  static dependencies = [SymphonyPlatformAspect];

  static async provider(
    [symphonyPlatform]: [SymphonyPlatformNode],
    config: BlogConfig
  ) {
    const blog = new BlogNode(config);
    const gqlSchema = blogGqlSchema(blog);

    symphonyPlatform.registerBackendServer([
      {
        gql: gqlSchema,
      },
    ]);

    return blog;
  }
}

export default BlogNode;
```

브라우저 런타임

```js
/**
 * @coponentId: learnbit.blog-pbc/blog
 * @filename: blog.browser.runtime.ts
 */


export class BlogBrowser {
  constructor(private config: BlogConfig) {}

  static dependencies = [SymphonyPlatformAspect, HeaderAspect];

  static async provider(
    [symphonyPlatform, header]: [SymphonyPlatformBrowser, HeaderBrowser],
    config: BlogConfig
  ) {
    const blog = new BlogBrowser(config);

    symphonyPlatform.registerRoute([
      {
        path: '/blog',
        component: () => {
          return (
            <ApolloBlogProvider spaceId={config.spaceId}>
              <BlogLobby />
            </ApolloBlogProvider>
          );
        },
      },
    ]);

    header.registerLink([{ label: 'Blog', href: '/blog' }]);

    return blog;
  }
}

export default BlogBrowser;
```



PBC(Purchased- Built-Composed)는 기존 솔루션을 구입하여 새 코드로 조합하는 혼합 접근을 장려합니다. 전통적인 "사거나 만들기"의 이분법 대신으로써 서로 조화롭게 연결될 수 있는 새로운 코드로 이루어진 솔루션을 구입하여 채택합니다.

블로그 PBC는 Contentful 콘텐츠 관리 시스템을 사용하여 이 권고사항을 적용합니다. 이를 통해 회사의 PBC 생태계 내에서 구입한 서비스에 대한 일관된 "언어"를 제공하여 효과적으로 의사소통하고 원활하게 작동할 수 있도록 합니다.

```js
/**
 * @coponentId: learnbit.blog-pbc/blog
 * @filename: blog-data.ts
 */

import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';
import type { BlogConfig } from './blog-config.js';

export class BlogData {
  constructor(private readonly config: BlogConfig) {}

  private contentfulClient = new ApolloClient({
    link: new HttpLink({
      uri: `https://graphql.contentful.com/content/v1/spaces/${this.config.spaceId}`,
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      fetch,
    }),
    cache: new InMemoryCache(),
  });

  getBlogPosts = async () => {
    const { data } = await this.contentfulClient.query({
      query: gql`
        query GetBlogs {
          pageBlogPostCollection {
            items {
              title
              slug
              author {
                name
              }
            }
          }
        }
      `,
    });
    return data.pageBlogPostCollection.items.map((item) => ({
      title: item.title,
      slug: item.slug,
      author: {
        name: item.author ? item.author.name : null,
      },
    }));
  };
}
```