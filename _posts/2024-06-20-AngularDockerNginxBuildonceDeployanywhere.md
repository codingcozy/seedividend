---
title: "Angular, Docker, Nginx 한 번 빌드하고 어디서든 배포하세요"
description: ""
coverImage: "/assets/img/2024-06-20-AngularDockerNginxBuildonceDeployanywhere_0.png"
date: 2024-06-20 05:31
ogImage:
  url: /assets/img/2024-06-20-AngularDockerNginxBuildonceDeployanywhere_0.png
tag: Tech
originalTitle: "Angular, Docker , Nginx: Build once, Deploy anywhere."
link: "https://medium.com/@fabiozuin/build-once-deploy-anywhere-with-angular-17-bf477c49668f"
isUpdated: true
---

<img src="/assets/img/2024-06-20-AngularDockerNginxBuildonceDeployanywhere_0.png" />

Github 코드: https://github.com/fbzz/angular-build-once-deploy-anywhere

소프트웨어 개발 과정에서 각기 다른 설정을 갖는 여러 환경을 보유하는 것은 꽤 흔합니다. Angular는 환경 변수를 관리하는 내장 시스템을 제공하여 빌드 시 파일을 교체할 수 있도록 합니다. 그러나 이 접근 방식은 종종 각 환경별로 별도의 빌드를 생성해야 하므로 시간이 소모될 수 있습니다. 이를 해결하기 위해 업계에서는 꽤 흔한 패턴이 있습니다.

## 한 번 빌드하고 어디에나 배포하세요…

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

그래서, DEV와 PROD라는 두 가지 환경이 있는 예제를 살펴보겠습니다. 하나의 빌드를 사용하려면 다음을 사용합니다:

- Angular — SPA 애플리케이션을 구축하기 위한 프론트엔드 프레임워크입니다.
- Nginx — 웹 서버 및 역방향 프록시 서버입니다.
- Docker — 가볍고 휴대 가능하며 독립적인 환경인 컨테이너에서 애플리케이션을 개발, 배포 및 실행하는 플랫폼입니다.

# 1 - Angular

세 가지 파일을 생성해보겠습니다. 이 파일들은 환경에 기반한 다른 구성을 처리할 것입니다:

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

`src\config`

- `app-config.dev.json` — 개발용.
- `app-config.prod.json` — 프로덕션용.

`src\`

- `app-config.json` — 로컬 개발용이며, 향후 대체될 예정입니다.

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
//App 구성의 예시, 간단한 JSON입니다.
{
  "API_URL": "로컬 개발용",
}
```

이제 번들에 포함시켜 봅시다. Angular.json 파일의 빌드 섹션에, config 폴더를 자산에 추가하세요.:

```js
  "build": {
          "builder": "@angular-devkit/build-angular:browser-esbuild",
            ...
            "assets": [
              "src/favicon.ico",
              "src/assets",
              "src/app-config.json",
              "src/config", // 여기
            ],
            ...
}
```

npm run build를 실행하면 dist에 config 폴더가 생깁니다.

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

![Angular Docker Nginx BuildonceDeployanywhere](/assets/img/2024-06-20-AngularDockerNginxBuildonceDeployanywhere_1.png)

1.2 - Angular에서는 응용 프로그램 전체에 걸쳐 데이터를 유지할 수 있는 싱글톤 서비스를 생성할 수 있습니다. 이는 응용 프로그램 전체에서 재사용할 수 있습니다.

```js
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpBackend } from '@angular/common/http';

//Move this type to a shared folder
export interface AppConfig {
  API_URL: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  //We create the configuration with default values in case anything fails
  private configuration: AppConfig = {
    API_URL: '/api',
  };

  private http: HttpClient;
  constructor(private readonly httpHandler: HttpBackend) {
    this.http = new HttpClient(this.httpHandler);
  }

  //This function will get the current config for the environment
  setConfig(): Promise<void | AppConfig> {
    return firstValueFrom(this.http.get<AppConfig>('./app-config.json'))
      .then((config: AppConfig) => (this.configuration = config))
      .catch(error => {
        console.error(error);
      });
  }

  //We're going to use this function to read the config.
  readConfig(): AppConfig {
    return this.configuration;
  }
}
```

1.3 - Angular에서는 APP_INITIALIZER라는 DI 토큰을 제공하여 하나 이상의 초기화 함수를 제공할 수 있습니다. 이 함수는 응용 프로그램 부트스트랩 프로세스 중에 실행되며 시작할 때 필요한 데이터가 사용 가능해집니다.

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

NgModules:

```typescript
// Config Service를 받아와 사용하여 설정 파일을 가져오는 함수가 여기 있습니다.
export function initConfig(appConfig: ConfigService) {
  return () => appConfig.setConfig();
}

@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [ConfigService], // Angular에게 이 초기화 프로그램이 ConfigService에 의존한다고 말합니다.
      // 따라서 config 서비스는 init config에서 사용할 수 있게 됩니다.
      multi: true,
    },
  ],
})
export class AppModule {}
```

Standalone:

```typescript
import { provideHttpClient } from "@angular/common/http";
import { APP_INITIALIZER } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { ConfigService } from "./core/services/config.service";

export function initConfig(appConfig: ConfigService) {
  return () => appConfig.setConfig();
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      multi: true,
      deps: [ConfigService],
    },
  ],
});
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

1.4 - 이제, 구성 요소에서 소비하는 것은 간단합니다!

```js
import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { ConfigService } from "../util/config.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./app.component.html",
  //참고: 우리가 이미 제공했기 때문에 providers에서 제공할 필요가 없습니다.
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  //참고: 이 구성 요소는 독립 실행형으로 사용하고 있으며, ngModules의 경우 module providers에서 가져오기만 하면 됩니다.
  configService = inject(ConfigService);

  apiUrl = this.configService.readConfig().API_URL;

  constructor() {
    console.log(this.configService.readConfig().API_URL);
  }
}
```

# 2 - Nginx 구성 파일

프로젝트 루트에서 자산을 제공하기 위한 간단한 구성 파일을 작성합니다. 참고: 귀하의 구성을 자유롭게 포함하십시오.

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
server {
  listen 80;

  gzip on;
  gzip_http_version 1.1;
  gzip_disable      "MSIE [1-6]\.";
  gzip_min_length   256;
  gzip_vary         on;
  gzip_proxied      expired no-cache no-store private auth;
  gzip_types        text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript;
  gzip_comp_level   9;
  client_max_body_size 5M;
  proxy_read_timeout 200s;

  location / {
    include /etc/nginx/mime.types;
    root /usr/share/nginx/html;
    add_header Cache-Control "public, max-age=1M";
    try_files $uri $uri/ /index.html =404;
  }

  location /healthcheck {
        access_log off;
        add_header 'Content-Type' 'text/plain';
        return 200 "Healthy\n";

  }
}
```

# 3 - Docker

Let’s containerize our application by creating the Dockerfile at the root of our project, inside of it we have all the steps for building our application.

```js
# Use official node image as the base image
FROM node:lts as build

ADD ./package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/local/app && cp -a /tmp/node_modules /usr/local/app/

WORKDIR /usr/local/app

# Add the source code from the app to the container
COPY ./ /usr/local/app/

# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with nginx server
# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/build/browser /usr/share/nginx/html

# This line is IMPORTANT, we will breakdown it on a minute.
COPY ./entrypoint.sh /usr/local/app/entrypoint.sh

# Copy the nginx conf that we created to the container
COPY ./nginx.conf  /etc/nginx/conf.d/default.conf

# Expose ports
EXPOSE 80 443 6006 4200

RUN chmod +x /usr/local/app/entrypoint.sh
ENTRYPOINT [ "/usr/local/app/entrypoint.sh" ]
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

우리 애플리케이션은 현재 컨테이너 내에 캡슐화되어 있습니다. 그러나 지정된 앱 구성을 사용하는 방법을 지정해야 합니다. 실행 중인 기기에는 현재 환경 정보를 전달하는 환경 변수가 있는 것으로 가정해 봅시다. 이를 용이하게 하기 위해 프로젝트 루트에서 entrypoint.sh를 생성할 수 있습니다. 이 스크립트는 애플리케이션이 작동하는 특정 환경에 기반한 파일 교체를 결정할 것입니다.

"Entrypoint"는 컨테이너가 시작될 때 실행되는 초기 명령어로, 본질적으로 컨테이너를 초기화합니다.

참고: 회사에 따라 구체적인 사항이 달라질 수 있지만 기본적인 컨셉은 적용 가능하며 프로젝트 요구에 따라 적응될 수 있습니다.

```js
#!/bin/bash -e

# ENVIRONMENT 변수를 확인하고 해당하는 파일로 교체합니다
if [[ $ENVIRONMENT == "Dev" ]]; then
   cp /usr/share/nginx/html/config/app-config.dev.json /usr/share/nginx/html/app-config.json
fi

if [[ $ENVIRONMENT == "Production" ]]; then
   cp /usr/share/nginx/html/config/app-config.prod.json /usr/share/nginx/html/app-config.json
fi

nginx -g 'daemon off;'
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

# 4 - 컨테이너 실행하기

```js
# 이미지를 빌드하고 태그를 할당하고, 루트 폴더에서 실행합니다
docker build . -t angular-boda

# 빌드가 완료되면 애플리케이션을 시작하고 포트 8080을 사용할 수 있습니다
# 검사를 위해 우리는 환경을 프로덕션으로 설정하여 BODA가 작동하는지 확인합니다
# 다른 값으로 테스트하려면 ENVIRONMENT=Dev로 변경하십시오
docker run -p 8080:80 -e ENVIRONMENT=Production -t angular-boda
```

localhost:8080에서 애플리케이션을 볼 수 있어야합니다:

![이미지](/assets/img/2024-06-20-AngularDockerNginxBuildonceDeployanywhere_2.png)

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

# 5. 마무리

읽어 주셔서 감사합니다. 이 글에서 우리는 Angular, Docker 및 Nginx의 힘을 활용하여 다양한 환경에서 원활하게 배포할 수 있는 다재다능한 컨테이너를 만들었습니다. 이는 개발 프로세스를 최적화할 뿐만 아니라 CI/CD 파이프라인의 효율도 최적화합니다.

GitHub에서 완성된 예제를 자유롭게 살펴보세요.

새해 복 많이 받으세요! 🎆🎆
