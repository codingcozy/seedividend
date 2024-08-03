---
title: "Webpack 대신 Rspack을 써봤더니 이런 차이가 있더라"
description: ""
coverImage: "/assets/img/2024-07-09-ItriedreplacingWebpackwithRspackandhereswhatIvefound_0.png"
date: 2024-07-09 18:06
ogImage:
  url: /assets/img/2024-07-09-ItriedreplacingWebpackwithRspackandhereswhatIvefound_0.png
tag: Tech
originalTitle: "I tried replacing Webpack with Rspack and here’s what I’ve found"
link: "https://medium.com/@uu9924079/i-tried-replacing-webpack-with-rspack-and-heres-what-i-ve-found-c15579c6e823"
---

<img src="/assets/img/2024-07-09-ItriedreplacingWebpackwithRspackandhereswhatIvefound_0.png" />

프론트엔드 웹 개발자로 일하면, 브라우저가 이해할 수 있도록 코드를 번들링하는 Webpack과 같은 빌드 툴을 주로 사용합니다. Webpack은 강력하고 필요한 모든 기능을 제공합니다. 그러나 만약 이와 유사한 작업을 하되 더 빠른 빌드 시간을 제공하는 대안이 있다면 어떨까요?

최근에 저는 Rspack의 공식 문서를 읽는 데 시간을 할애했습니다. 낮은 설정 비용, Webpack 사용자를 위한 친근한 인터페이스, 그리고 빠른 빌드 시간이 모두 매력적으로 다가왔습니다.

비교적 한가한 업무 기간을 활용하여 회사 프로젝트에 Rspack을 적용해 보았고, 결과는 상당히 인상적이었습니다. 이 글에서는 저희 프로젝트의 프론트엔드 아키텍처를 공유하고, Rspack과 Webpack 간의 빌드 속도를 비교하여 이 글이 누군가에게 유용할 것으로 기대합니다.

<div class="content-ad"></div>

**TL;DR:** 웹팩을 사용할 때 사용자 지정 구성을 사용 중이라면 Rspack으로 교체해보세요. 대기 시간을 아끼는 데 큰 도움이 될 거예요.

## 우리 직장 프로젝트의 웹팩 구성

Rspack과 웹팩의 성능을 비교하기 전에, CSS 및 JavaScript 파일을 빌드하기 위해 웹팩을 어떻게 구성했는지 보여드릴게요.

다음은 우리 프로젝트의 webpack.config.js 파일입니다:

<div class="content-ad"></div>

```js
const path = require('path');
const glob = require('glob');
const toObject = require('./scripts/toObject');
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");

module.exports = (env, options) => {
    const jsSetting = {
        mode: 'production',
        entry: {
            'index': path.resolve(__dirname, 'src/js/entry/index.js'),
        },
        output: {
            path: path.resolve(__dirname, 'apps/statics/dist/'),
            filename: 'js/[name].js',
        },
        target: ['web', 'es5'],
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    include: path.resolve(__dirname, 'src'),
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                plugins: ['@babel/plugin-transform-runtime']
                            }
                        }
                    ],
                },
                {
                    test: /\.vue$/,
                    use: [
                        'vue-loader'
                    ]
                },
                {
                    test: /\.s?css$/i,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'sass-loader'
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                name: '[path][name].[ext]',
                                context: 'src',
                                fallback: require.resolve('file-loader'),
                                limit: 8192,
                            },
                        },
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf|)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]',
                                context: 'src'
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: 'style/[name].css',
            }),
            new CleanWebpackPlugin({ verbose: true }),
        ],
        resolve: {
            alias: {
                src: path.resolve(__dirname, 'src/'),
                apps: path.resolve(__dirname, 'apps/'),
            }
        },
        externals: {
            vue: 'Vue',
            axios: 'axios',
            jquery: 'jQuery',
        }
    };
    const cssSetting = {
        mode: 'production',
        entry: {
            ...toObject(glob.sync('apps/statics/scss/**/*.scss')),
        },
        output: {
            path: path.resolve(__dirname, ''),
        },
        module: {
            rules: [
                {
                    test: /\.s?css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        { loader: 'css-loader', options: { url: false },
                        'postcss-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                implementation: require("sass"),
                                sassOptions: {
                                    outputStyle: 'expanded'
                                }
                          }
                        }
                    ],
                },
            ],
        },
        plugins: [
            new FixStyleOnlyEntriesPlugin(),
            new MiniCssExtractPlugin({}),
        ],
        resolve: {
            alias: {
                src: path.resolve(__dirname, 'src/'),
                apps: path.resolve(__dirname, 'apps/'),
            }
        },
    };

    if (options.mode == 'development') {
        jsSetting.devtool = 'eval-source-map'
    }
    return [
        cssSetting,
        jsSetting,
    ];
};
```

내용을 간단하게 요약하여 적었어요. 필요한 부분만 남겼습니다.

우리 프로젝트에서는 먼저 CSS를 빌드하고, 그 다음 JavaScript를 빌드해요. CSS 파일에 대해서는 glob이라는 라이브러리를 사용해서 모든 .scss 파일을 감지합니다. toObject는 다음과 같이 키-값 쌍을 생성하는 사용자 정의 함수에요:

```js
{
  "apps/statics/scss/index": "apps/statics/scss/index.scss",
  // ...
}
```

<div class="content-ad"></div>

우리는 MiniCssExtractPlugin을 사용하여 .js 파일을 생성합니다. css-loader가 .css로 만든 것을 동일한 폴더에서 .scss 파일을 .css 파일로 만들 수 있게 FixStyleOnlyEntriesPlugin으로 동일한 .js 파일을 삭제합니다.

JavaScript 파일의 경우, 우리는 Vue SFC를 빌드하기 위해 vue-loader를 사용하며, vue-style-loader, css-loader 및 sass-loader를 사용하여 .vue 파일에서 scss를 작성할 수 있습니다. 그리고 JavaScript 파일을 빌드하기 위해 babel-loader를 사용합니다.

그래서 기본적으로 우리 프로젝트에 필요한 것들은 다음과 같습니다:

- Vue SFC 파일 빌드
- SCSS 파일에서 CSS 파일 빌드
- JavaScript 파일 빌드

<div class="content-ad"></div>

Rspack 설정을 구성하는 방법을 살펴봅시다.

## 내 Rspack 설정

여기가 바로 내 rspack.config.js 파일이에요:

```js
const path = require("path");
const glob = require("glob");
const toObject = require("./scripts/toObject");
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const PreventOutputJSPlugin = require("./scripts/PreventOutputJSPlugin");
module.exports = (env, options) => {
  const isProd = options.mode === "production";
  const cssSetting = {
    mode: "development",
    context: __dirname,
    devtool: false,
    entry: {
      ...toObject(glob.sync("apps/statics/scss/**/*.scss")),
    },
    output: {
      path: path.resolve(__dirname, ""),
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ["postcss-loader", "sass-loader"],
          type: "css",
        },
      ],
    },
    plugins: [new PreventOutputJSPlugin()],
    resolve: {
      alias: {
        src: path.resolve(__dirname, "src/"),
        apps: path.resolve(__dirname, "apps/"),
      },
    },
    optimization: {
      minimize: false,
    },
  };
  const jsSetting = {
    context: __dirname,
    devtool: false,
    entry: {
      index: path.resolve(__dirname, "src/js/entry/index.js"),
    },
    output: {
      path: path.resolve(__dirname, "apps/statics/dist/"),
      filename: "js/[name].js",
    },
    target: ["web", "es5"],
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
          options: {
            experimentalInlineMatchResource: true,
          },
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: "style-loader",
              options: {
                esModule: false,
              },
            },
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
          type: "javascript/auto",
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: "style-loader",
              options: {
                esModule: false,
              },
            },
            "css-loader",
          ],
          type: "javascript/auto",
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset/inline",
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf|)$/,
          type: "asset/resource",
        },
      ],
    },
    plugins: [new VueLoaderPlugin()],
    resolve: {
      alias: {
        src: path.resolve(__dirname, "src/"),
        apps: path.resolve(__dirname, "apps/"),
        node_modules: path.resolve(__dirname, "node_modules/"),
      },
    },
    externals: {
      vue: "Vue",
      axios: "axios",
      jquery: "jQuery",
    },
    optimization: {
      minimize: isProd,
    },
  };
  if (isProd) {
    jsSetting.plugins.push(new CleanWebpackPlugin({ verbose: true }));
  }
  return [cssSetting, jsSetting];
};
```

<div class="content-ad"></div>

CSS 파일의 경우, .scss를 빌드하기 위해 css-loader나 MiniCssExtractPlugin이 필요하지 않아요.

자바스크립트 파일의 경우, 대부분의 구성은 이전과 같아요.

우리 프로젝트에는 약 40개의 자바스크립트 파일과 90개의 CSS 파일이 빌드되어야 해요. 빌드 성능을 확인해보죠:

## 웹팩

<div class="content-ad"></div>

- 개발 서버 시작: 35초
- 프로덕션 빌드: 42초
- 개발 서버 핫 빌드 시간: ~300밀리초

## Rspack

- 개발 서버 시작: 15초
- 프로덕션 빌드: 15초
- 개발 서버 핫 빌드 시간: ~170밀리초

Rspack이 웹팩을 다양한 시나리오에서 앞선 성능을 보여줍니다.

<div class="content-ad"></div>

## 웹팩을 이미 Rspack로 대체했나요?

내 소중한 시간을 절약하기 위해 웹팩을 폐지하고 싶어요. 하지만, 저희 프로젝트에서는 .scss 파일의 url을 해결하지 않도록 css-loader를 구성해야 합니다:

```js
{ loader: 'css-loader', options: { url: false }
```

현재 버전의 Rspack (v0.2.9)은 아직 이를 지원하지 않아요. 웹팩보다 훨씬 빠르게 빌드하지만, 우리의 터미널에 오류 메시지를 톤으로 남겨줘요. 팀원들과 논의한 후, 우리는 지금은 변경하지 않기로 결정했어요. 이를 Rspack의 Github 이슈로 기능 요청으로 보고했고, 이 기능이 곧 사용할 수 있기를 희망해요.

<div class="content-ad"></div>

## 결론

앞에서 말했듯이, Rspack은 Webpack과 비교했을 때 CSS 및 JavaScript 파일을 구축하는 데 정말 좋은 성능을 보여줍니다. 또한 Webpack에서 Rspack으로 이주하는 데 많은 시간이 들지 않습니다. 따라서 빌드 시간을 줄이고 싶다면 주저하지 말고 시도해 보세요!

본 문서가 도움이 되었으면 좋겠고, 추가 의견이 있으시면 언제든지 알려주세요. 다음 달에 또 만나요!

참고 문헌:
