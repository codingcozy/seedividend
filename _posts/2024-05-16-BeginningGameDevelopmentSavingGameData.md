---
title: "게임 개발 시작하기 게임 데이터 저장"
description: ""
coverImage: "/assets/img/2024-05-16-BeginningGameDevelopmentSavingGameData_0.png"
date: 2024-05-16 03:38
ogImage: 
  url: /assets/img/2024-05-16-BeginningGameDevelopmentSavingGameData_0.png
tag: Tech
originalTitle: "Beginning Game Development: Saving Game Data"
link: "https://medium.com/@lemapp09/beginning-game-development-saving-game-data-09a6e73be81b"
---


## Unity에서 C#을 활용한 저장 게임 기능 구현하기: 메소드, 저장소, 그리고 개인정보 보호

![게임 개발 데이터 저장하기](/assets/img/2024-05-16-BeginningGameDevelopmentSavingGameData_0.png)

안녕하세요! 플레이어 경험을 향상시키고 게임 진행 상태를 보장하기 위해 견고한 저장 게임 시스템은 필수입니다. Unity와 C#을 결합하면 다양한 저장 및 불러오기 기능을 구현할 수 있는 유연한 환경을 제공합니다. 이 글에서는 Unity에서 직렬화 기술을 활용하여 게임 상태, 플레이어 진행 상황, 그리고 동적인 게임 요소를 저장하는 방법에 대해 다루고 있습니다. 또한 로컬 저장과 원격 파일 저장의 장단점 및 플레이어 데이터 개인정보 보호에 대한 고려 사항을 살펴봅니다.

1. Unity에서의 직렬화 기술 직렬화란 객체의 상태를 저장하고 나중에 다시 생성할 수 있는 형식으로 변환하는 프로세스입니다. Unity는 게임 상태를 저장하는 데 중요한 여러 직렬화 기술을 지원합니다.



키 메서드:

- 이진 직렬화: System.Runtime.Serialization.Formatters.Binary 네임스페이스를 사용하여 객체를 이진 형식으로 변환합니다. 이 방법은 빠르고 효율적이지만 사람이 읽기 어려워 디버깅을 복잡하게 할 수 있습니다.

```js
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using UnityEngine;
public static class SaveSystem
{
    public static void SavePlayer(PlayerData player)
    {
        BinaryFormatter formatter = new BinaryFormatter();
        string path = Application.persistentDataPath + 
            "/player.save";
        FileStream stream = new FileStream(path, FileMode.Create);
        formatter.Serialize(stream, player);
        stream.Close();
    }
    public static PlayerData LoadPlayer()
    {
        string path = Application.persistentDataPath + 
            "/player.save";
        if (File.Exists(path))
        {
            BinaryFormatter formatter = new BinaryFormatter();
            FileStream stream = new FileStream(path, FileMode.Open);
            PlayerData data = formatter.Deserialize(stream) as 
                PlayerData;
            stream.Close();
            return data;
        }
        else
        {
            Debug.LogError("Save file not found in " + path);
            return null;
        }
    }
}
```

![게임 개발 시작화면용 데이터 저장 이미지](/assets/img/2024-05-16-BeginningGameDevelopmentSavingGameData_1.png)



- JSON 직렬화: Unity의 JsonUtility를 사용하면 객체를 JSON 형식으로 직렬화할 수 있습니다. JSON은 사람이 읽기 쉽고 수정하기 쉬워 설정 및 설정에 적합합니다.

```csharp
using UnityEngine;
public static class SaveSystem
{
    public static void SavePlayer(PlayerData player)
    {
        string json = JsonUtility.ToJson(player);
        System.IO.File.WriteAllText(Application.persistentDataPath + 
             "/player.json", json);
    }
    public static PlayerData LoadPlayer()
    {
        string path = Application.persistentDataPath + 
              "/player.json";
        if (System.IO.File.Exists(path))
        {
            string json = System.IO.File.ReadAllText(path);
            PlayerData data = 
                 JsonUtility.FromJson<PlayerData>(json);
            return data;
        }
        else
        {
            Debug.LogError("저장 파일을 " + path + "(으)로 찾을 수 없음");
            return null;
        }
    }
}
```

![게임 데이터 저장 개발 시작](/assets/img/2024-05-16-BeginningGameDevelopmentSavingGameData_2.png)

2. 로컬 vs. 원격 파일 저장소: 게임의 디자인과 목표에 따라 로컬 및 원격 저장소 중 어떤 것을 선택할지 결정하는 것이 중요합니다.



로컬 저장소:

- 장점: 빠른 액세스, 인터넷 연결이 필요하지 않으며 데이터에 대한 완전한 제어.
- 단점: 장치에 제한됨, 장치가 손상되거나 분실된 경우 데이터 손실 가능성, 플레이어가 조작하기 쉬울 수 있음.

원격 저장소:

- 장점: 모든 장치에서 액세스 가능, 데이터가 백업되어 손실 확률이 적음, 데이터 조작에 대한 보안이 높음.
- 단점: 인터넷 연결이 필요, 서버 유지보수에 지속적인 비용, 잠재적인 개인정보 보안 문제.



3. 플레이어 데이터 개인 정보 보호 저장한 게임 기능을 구현할 때 특히 원격 저장 시 개인 정보 보호는 최우선 과제여야 합니다.

개인 정보 보호 규정:

- 암호화: 저장된 데이터를 암호화하면 전송 중 및 휴식 상태에서 민감한 정보를 보호할 수 있습니다.
- 규정 준수: 게임은 플레이어 데이터를 저장하고 사용하는 방법을 규제하는 유럽의 GDPR과 같은 법적 기준을 준수해야 합니다.
- 명확한 사용자 허가: 플레이어에게 저장되는 데이터에 대해 알리고 원하는 경우 원격으로 데이터를 저장하지 않도록 선택할 수 있도록 허용하세요.

![이미지](/assets/img/2024-05-16-BeginningGameDevelopmentSavingGameData_3.png)



## 결론

Unity에서 C#을 사용하여 세이브 게임 기능을 구현하면 게임 상태와 플레이어 진행 상황을 효과적으로 관리할 수 있는 다양한 방법을 제공합니다. 로컬 또는 원격 저장소를 사용하더라도 각 방법은 보안과 플레이어 개인 정보 보호와 관련하여 장단점이 있습니다. Unity의 직렬화 기능을 이해하고 활용함으로써, 개발자는 플레이어에게 원활하고 안전한 게임 경험을 제공할 수 있습니다.