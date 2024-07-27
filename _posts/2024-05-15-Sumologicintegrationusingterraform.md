---
title: "테라폼을 사용한 Sumo Logic 통합"
description: ""
coverImage: "/assets/img/2024-05-15-Sumologicintegrationusingterraform_0.png"
date: 2024-05-15 03:43
ogImage: 
  url: /assets/img/2024-05-15-Sumologicintegrationusingterraform_0.png
tag: Tech
originalTitle: "Sumologic integration using terraform"
link: "https://medium.com/@sangeet_joy/sumologic-integration-using-terraform-885065421f4f"
---


<img src="/assets/img/2024-05-15-Sumologicintegrationusingterraform_0.png" />

프로젝트에서 매우 기술에 능통한 고객을 위해 작업 중입니다. 그들은 매일 많은 수의 API를 활용하여 방대한 기술 생태계를 구축했습니다. 이들 API의 특정 활동을 분석하고 로깅하여 시스템을 더 잘 관리하고 개선하기 위해 다수의 활성 모니터를 가진 경보 시스템을 생성해야 했습니다.

이 경보 시스템에서 그들은 Sumologic을 경보 시스템으로 선택했습니다.

사용 사례:
제 사용 사례는 다음과 같습니다. Sumologic 대시보드를 통해 모든 이러한 모니터를 수동으로 생성 및 구성했는데, 많은 수의 모니터를 관리하고 생성하는 작업은 번거로운 작업일 수 있습니다. 제 작업은 이 모니터 생성 및 관리 프로세스를 수동 작업에서 자동화된 방식 또는 코드를 통해 관리하는 것으로 변경하는 것이었습니다. 다시 말해, Sumologic 모니터를 Terraform과 통합하는 것입니다.



아래 섹션에서는 수동으로 작성한 모든 Sumologic 모니터를 테라폼으로 변환하는 데 수행한 모든 단계를 안내할 것입니다.

준비 사항:

- 테라폼에 대한 기본 지식이 충분히 갖춰져 있다면 시작할 수 있습니다(테라폼 문서)

Sumologic 모니터:



테라폼 코드를 올바르게 작성하여 Sumologic 모니터를 만들려면 먼저 Sumologic에서 이러한 모니터를 만드는 데 필요한 필드를 시각화해야 합니다.

Sumologic 대시보드에서 모니터를 만드는 "Create a Monitor"를 클릭하면 아래 화면이 나타납니다.

![이미지](/assets/img/2024-05-15-Sumologicintegrationusingterraform_1.png)

![이미지](/assets/img/2024-05-15-Sumologicintegrationusingterraform_2.png)



![이미지](/assets/img/2024-05-15-Sumologicintegrationusingterraform_3.png)

지금 보시는 예제 모니터의 설정을 테라폼 자원인 "sumologic_monitor"를 사용하여 생성할 수 있습니다. sumologic_monitor 자원 블록은 실제 모니터 필드와 매핑되는 몇 가지 특정 키-값 인수를 받아들일 것입니다.

다음은 테라폼 코드와 SumoLogic 모니터 필드의 몇 가지 매핑 예시입니다.

테라폼 모니터 생성:




![Sumologic Integration using Terraform - Screenshot 4](/assets/img/2024-05-15-Sumologicintegrationusingterraform_4.png)

```js
resource "sumologic_monitor" "any_name" {

trigger_condition {
   logs_static_condition {
        ...
   }
}
```

![Sumologic Integration using Terraform - Screenshot 5](/assets/img/2024-05-15-Sumologicintegrationusingterraform_5.png)

```js
resource "sumologic_monitor" "any_name" {

trigger_condition {
   logs_static_condition {
     critical {
       time_range = "5m"
       alert {
         thresold = "0"
         thresold_type = "GreaterThan"
       }
       resolution {
         thresold = "0"
         thresold_type = "LessThanOrEqual"
         resolution_window = "5m" 
       }
     }
   }
}
``` 





![image](/assets/img/2024-05-15-Sumologicintegrationusingterraform_6.png)

```js
resource "sumologic_monitor" "any_name" {
  queries {
    row_id = "A"
    query = "실행될 조건에 대한 실제 쿼리"
  }
}
```

![image](/assets/img/2024-05-15-Sumologicintegrationusingterraform_7.png)

통지를 위해 Slack, Webhook, Email 등과 같은 다양한 connection_type을 설정할 수 있습니다. sumologic 대시보드에 이미 있는 연결에 connection_id를 지정하거나 사용자 정의 연결을 만들고 알림 페이로드를 생성할 수 있습니다.




|| Sumologic API를 참조하고 curl을 실행하여 모든 연결을 가져와서 connection_id를 이름으로 필터링할 수 있어요-

curl -u "`accessId`:`accessKey`" -X GET https://api.`deployment`.sumologic.com/api/v1/connections

```js
resource "sumologic_monitor" "any_name" {
 notifications: {
  // 여러 알림 블록을 만들 수 있어요
  notification: {
   connection_type = "Email" //Slack | Webhook | Email 등
   connection_id = "<ID>" //기존 ID
  }
  notification: {
   connection_type = "Slack"
   //이것은 사용자 정의된 payload에요
   payload_override = <<JSON 
    {
     "service_key": "your_pagerduty_api_integration_key",
     "event_type": "trigger",
     "description": "Alert: Triggered {TriggerType} for Monitor {Name}",
     "client": "Sumo Logic",
     "client_url": "{QueryUrl}"
    }
   JSON
  }
  run_for_trigger_types = ["Critical", "ResolvedCritical"] //위의 알림 모니터 이미지용 체크박스를 선택할 거에요
}
```

<img src="/assets/img/2024-05-15-Sumologicintegrationusingterraform_8.png" />

```js
resource "sumologic_monitor" "any_name" {
 name = "monitor_name"
 parent_id = "<ID>" //모니터가 생성될 폴더의 ID
 description = "설명 문자열"
 is_disabled = boolean // 이것은 모니터를 활성화 또는 비활성화할 거에요
}
```



아래는 담당자의 작업 요약입니다:

1. 'init.tf' 또는 'main.tf' 파일을 추가하여 Sumo Logic Terraform 공급자를 설치하고 초기화해야 합니다. main.tf 파일에 다음과 같은 코드를 추가하세요.

```js
terraform {

 backend "s3" {}

 required_providers {
  sumologic = {
   source = "sumologic/sumologic"
   version = "2.28.2"
  }
 }

}

provider "sumologic" {
 access_id = ""
 access_key = ""
}
```

2. 'sumologic-monitor.tf' 파일을 추가하여 위에서 언급한 내용이 포함된 'sumologic_monitor' 리소스를 추가하세요.
3. 이후에는 테라폼 명령을 실행하면 됩니다.



```js
terrafrom init
terrafrom plan
terrafrom apply
```

참고 문서 -

- Sumologic 모니터 생성에 대한 자세한 내용은 다음을 참조하세요: [Sumologic 모니터 생성](https://help.sumologic.com/docs/alerts/monitors/create-monitor/)
- Terraform을 사용한 Sumologic 모니터 생성에 대한 자세한 내용은 다음을 참조하세요: [Sumologic 모니터 Terraform 문서](https://registry.terraform.io/providers/SumoLogic/sumologic/latest/docs/resources/monitor)
- Sumologic API에 대한 자세한 내용은 다음을 참조하세요: [Sumologic API](https://api.sumologic.com/docs/#section/Getting-Started/API-Endpoints)