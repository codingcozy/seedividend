---
title: "SigmaHQ Rules 릴리스 하이라이트  r2024-05-13"
description: ""
coverImage: "/assets/img/2024-05-15-SigmaHQRulesReleaseHighlightsr20240513_0.png"
date: 2024-05-15 03:57
ogImage: 
  url: /assets/img/2024-05-15-SigmaHQRulesReleaseHighlightsr20240513_0.png
tag: Tech
originalTitle: "SigmaHQ Rules Release Highlights — r2024–05–13"
link: "https://medium.com/sigma-hq/sigmahq-rules-release-highlights-r2024-05-13-237ed77459bf"
isUpdated: true
---





![SigmaHQRulesReleaseHighlights](/assets/img/2024-05-15-SigmaHQRulesReleaseHighlightsr20240513_0.png)

2024년 5월 13일 Sigma Rule Packages가 발표되었습니다. 이번 릴리즈에는 16개의 새로운 규칙, 7개의 규칙 업데이트 및 1개의 규칙 수정이 7명의 기여자에 의해 추가되었습니다.

# 새로운 규칙

새로운 규칙 중 일부 하이라이트는 다음과 같습니다. Wbadmin을 이용하여 민감한 파일을 덤프/복원하고 백업을 삭제하는 다양한 사례를 다루는 규칙입니다.



```js
제목: Wbadmin.EXE를 통한 파일 복구
아이디: 6fe4aa1e-0531-4510-8be2-782154b73b48
관련:
    - 아이디: 84972c80-251c-4c3a-9079-4f00aad93938
      유형: 파생
상태: 실험적
설명: |
    "wbadmin.exe"를 통한 백업 파일로부터 파일 복구를 감지합니다.
    공격자는 NTDS.DIT 또는 레지스트리 하이브와 같은 민감한 파일을 백업에서 복원하여 자격 증명을 뽑아낼 수 있습니다.
참고:
    - https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/wbadmin-start-recovery
    - https://lolbas-project.github.io/lolbas/Binaries/Wbadmin/
작성자: Nasreddine Bencherchali (Nextron Systems), frack113
날짜: 2024/05/10
태그:
    - attack.impact
    - attack.t1490
로그 소스:
    카테고리: process_creation
    제품: windows
감지:
    선택 이미지:
        - Image|endswith: '\wbadmin.exe'
        - OriginalFileName: 'WBADMIN.EXE'
    선택 CLI:
        CommandLine|contains|all:
            - ' recovery'
            - 'recoveryTarget'
            - 'itemtype:File'
    조건: 모두 선택_*
거짓 양성:
    - 알 수 없음
수준: 중간
```

```js
제목: Wbadmin.EXE를 통한 민감한 파일 덤프
아이디: 8b93a509-1cb8-42e1-97aa-ee24224cdc15
상태: 실험적
설명: |
    "NTDS.DIT" 및 "SECURITY" 하이브와 같은 고도로 민감한 파일의 덤프를 감지합니다.
    공격자는 "wbadmin" 유틸리티를 활용하여 자격 증명이나 민감한 정보가 포함된 민감한 파일을 덤프할 수 있습니다.
참고:
    - https://github.com/LOLBAS-Project/LOLBAS/blob/2cc01b01132b5c304027a658c698ae09dd6a92bf/yml/OSBinaries/Wbadmin.yml
    - https://lolbas-project.github.io/lolbas/Binaries/Wbadmin/
    - https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/wbadmin-start-recovery
    - https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/wbadmin-start-backup
작성자: Nasreddine Bencherchali (Nextron Systems), frack113
날짜: 2024/05/10
태그:
    - attack.credential_access
    - attack.t1003.003
로그 소스:
    카테고리: process_creation
    제품: windows
감지:
    선택 이미지:
        - Image|endswith: '\wbadmin.exe'
        - OriginalFileName: 'WBADMIN.EXE'
    선택 백업:
        CommandLine|contains:
            - 'start'
            - 'backup'
    선택 경로:
        CommandLine|contains:
            - '\config\SAM'
            - '\config\SECURITY'
            - '\config\SYSTEM'
            - '\Windows\NTDS\NTDS.dit'
    조건: 모두 선택_*
거짓 양성:
    - 허가된 관리자에 의한 합법적인 백업 작업. 일치 사항은 감사하고 사안별로 허용되어야 합니다.
수준: 높음
```

파워셸 cmdlet인 “Start-NetEventSession" 및 “New-NetFirewallRule" 사용을 다루는 새로운 규칙을 소개하였습니다. 공격자가 패킷을 캡처하거나 새 방화벽 규칙을 생성하는 데 사용할 수 있습니다.

```js
제목: New-NetFirewallRule Cmdlet을 통한 새 Windows 방화벽 규칙 추가 - ScriptBlock
아이디: 8d31dd2e-b582-48ca-826e-dcaa2c1ca264
관련:
    - 아이디: 51483085-0cba-46a8-837e-4416496d6971
      유형: 유사
상태: 실험적
설명: |
    PowerShell 스크립트에 "New-NetFirewallRule" cmdlet 호출이 포함되어 있어 "허용" 동작을 하는 새 방화벽 규칙이 추가될 때 감지합니다.
참고:
    - https://github.com/redcanaryco/atomic-red-team/blob/master/atomics/T1562.004/T1562.004.md#atomic-test-24---set-a-firewall-rule-using-new-netfirewallrule
    - https://malware.news/t/the-rhysida-ransomware-activity-analysis-and-ties-to-vice-society/72170
    - https://cybersecuritynews.com/rhysida-ransomware-attacking-windows/
작성자: frack113
날짜: 2024/05/10
태그:
    - attack.defense_evasion
    - attack.t1562.004
    - detection.threat_hunting
로그 소스:
    제품: windows
    카테고리: ps_script
    정의: '요구 사항: 스크립트 블록 로깅이 활성화되어 있어야 함'
감지:
    선택:
        ScriptBlockText|contains: 'New-NetFirewallRule*-Action*Allow'
    조건: 선택
거짓 양성:
    - 관리자 스크립트
수준: 낮음
```



```yaml
title: "Start-NetEventSession를 통한 잠재적인 패킷 캡처 활동 - 스크립트 블록"
id: da34e323-1e65-42db-83be-a6725ac2caa3
status: experimental
description: |
    "Start-NetEventSession" cmdlet을 호출하는 PowerShell 스크립트 실행을 감지합니다. 이를 통해 공격자는 네트워크 이벤트 세션에 이벤트 및 패킷 캡처를 시작할 수 있습니다.
    이 기술을 통해 수행 중인 작업의 정보를 수집하기 위해 공격자가 네트워크를 캡처하려 할 수 있습니다.
    이 기술을 통해 캡처된 데이터에는 특히 안전하지 않고 암호화되지 않은 프로토콜을 통해 전송된 사용자 자격 증명이 포함될 수 있습니다.
references:
    - https://github.com/redcanaryco/atomic-red-team/blob/5f866ca4517e837c4ea576e7309d0891e78080a8/atomics/T1040/T1040.md#atomic-test-16---powershell-network-sniffing
    - https://github.com/0xsyr0/Awesome-Cybersecurity-Handbooks/blob/7b8935fe4c82cb64d61343de1a8b2e38dd968534/handbooks/10_post_exploitation.md
    - https://github.com/forgottentq/powershell/blob/9e616363d497143dc955c4fdce68e5c18d28a6cb/captureWindows-Endpoint.ps1#L13
author: frack113
date: 2024/05/12
tags:
    - attack.credential_access
    - attack.discovery
    - attack.t1040
logsource:
    product: windows
    category: ps_script
    definition: 'Script Block Logging이 활성화되어 있어야 함'
detection:
    selection:
        ScriptBlockText|contains: 'Start-NetEventSession'
    condition: selection
falsepositives:
    - 적절한 네트워크 진단 스크립트.
level: medium
```

또한 "KeyScrambler.exe"의 잠재적으로 의심스러운 자식 프로세스를 보와하는 새로운 규칙이 추가되었습니다.

```yaml
title: "KeyScrambler.exe의 잠재적으로 의심스러운 자식 프로세스"
id: ca5583e9-8f80-46ac-ab91-7f314d13b984
related:
    - id: d2451be2-b582-4e15-8701-4196ac180260
      type: similar
status: experimental
description: KeyScrambler.exe의 잠재적으로 의심스러운 자식 프로세스를 감지합니다.
references:
    - https://twitter.com/DTCERT/status/1712785421845790799
author: Swachchhanda Shrawan Poudel
date: 2024/05/13
tags:
    - attack.execution
    - attack.defense_evasion
    - attack.privilege_escalation
    - attack.t1203
    - attack.t1574.002
logsource:
    category: process_creation
    product: windows
detection:
    selection_parent:
        ParentImage|endswith: '\KeyScrambler.exe'
    selection_binaries:
        - Image|endswith:
              - '\cmd.exe'
              - '\cscript.exe'
              - '\mshta.exe'
              - '\powershell.exe'
              - '\pwsh.exe'
              - '\regsvr32.exe'
              - '\rundll32.exe'
              - '\wscript.exe'
        - OriginalFileName:
              - 'Cmd.Exe'
              - 'cscript.exe'
              - 'mshta.exe'
              - 'PowerShell.EXE'
              - 'pwsh.dll'
              - 'regsvr32.exe'
              - 'RUNDLL32.EXE'
              - 'wscript.exe'
    condition: all of selection_*
falsepositives:
    - 알 수 없음
level: medium
```  

모든 새로운 규칙 목록의 전체 릴리스 변경 로그를 확인하세요.




# 새로운 업데이트

일부 이전 규칙들이 커버리지 및 메타데이터에서 개선되었습니다.

우선, "Microsoft-Windows-Windows Firewall With Advanced Security"를 활용하는 몇 가지 규칙에서는 커버리지를 늘리기 위해 EID 2097이 추가되었습니다.

```js
title: 잠재적으로 의심스러운 응용 프로그램을 위한 Windows 방화벽 예외 목록에 새로운 방화벽 규칙이 추가되었습니다.
id: 9e2575e7-2cb9-4da1-adc8-ed94221dca5e
related:
    - id: cde0a575-7d3d-4a49-9817-b8004a7bf105
      type: derived
status: experimental
description: 잠재적으로 의심스러운 위치에 있는 응용 프로그램에 대한 Windows 방화벽 예외 목록에 새로운 규칙이 추가되는 것을 탐지합니다.
references:
    - https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/dd364427(v=ws.10)
    - https://app.any.run/tasks/7123e948-c91e-49e0-a813-00e8d72ab393/#
author: frack113
date: 2023/02/26
modified: 2024/05/10
tags:
    - attack.defense_evasion
    - attack.t1562.004
logsource:
    product: windows
    service: firewall-as
detection:
    selection:
        EventID:
            - 2004 # Windows Defender 방화벽 예외 목록에 규칙이 추가되었습니다. (Windows 10)
            - 2071 # Windows Defender 방화벽 예외 목록에 규칙이 추가되었습니다. (Windows 11)
            - 2097
        ApplicationPath|contains:
            - ':\PerfLogs\'
            - ':\Temp\'
            - ':\Tmp\'
            - ':\Users\Public\'
            - ':\Windows\Tasks\'
            - ':\Windows\Temp\'
            - '\AppData\Local\Temp\'
    filter_main_block:
        Action: 2 # 차단
    condition: selection and not 1 of filter_main_*
falsepositives:
    - 알 수 없음
level: 높음
```



```js
title: Windows 방화벽 예외 목록에 추가된 새로운 드문한 방화벽 규칙
id: cde0a575-7d3d-4a49-9817-b8004a7bf105
status: experimental
description: Windows 방화벽 예외 목록에 규칙이 추가된 것을 감지합니다
references:
    - https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2008-r2-and-2008/dd364427(v=ws.10)
author: frack113
date: 2022/02/19
modified: 2024/05/10
tags:
    - attack.defense_evasion
    - attack.t1562.004
logsource:
    product: windows
    service: firewall-as
detection:
    selection:
        EventID:
            - 2004 # Windows Defender 방화벽 예외 목록에 규칙이 추가됨
            - 2071 # Windows Defender 방화벽 예외 목록에 규칙이 추가됨. (Windows 11)
            - 2097
    filter_main_block:
        Action: 2 # 차단
    filter_main_generic:
        ApplicationPath|contains:
            - ':\Program Files (x86)\'
            - ':\Program Files\'
            - ':\Windows\System32\'
            - ':\Windows\SysWOW64\'
            - ':\Windows\WinSxS\'
    filter_optional_msmpeng:
        ModifyingApplication|contains|all:
            - ':\ProgramData\Microsoft\Windows Defender\Platform\'
            - '\MsMpEng.exe'
    filter_main_covered_paths:
        # 이 필터는 9e2575e7-2cb9-4da1-adc8-ed94221dca5e로부터의 중복 경고 방지를 위해 추가되었습니다
        ApplicationPath|contains:
            - ':\PerfLogs\'
            - ':\Temp\'
            - ':\Tmp\'
            - ':\Users\Public\'
            - ':\Windows\Tasks\'
            - ':\Windows\Temp\'
            - '\AppData\Local\Temp\'
    condition: selection and not 1 of filter_main_* and not 1 of filter_optional_*
level: medium
```

`PDQDeployRunner`를 사용하여 추가 경로 및 프로세스가 규칙에 추가되었습니다. 이는 악의적인 랜섬웨어 위협 행위자들이 환경 전체로 악성 소프트웨어를 배포하기 위해 종종 사용하는 유틸리티입니다.

```js
title: PDQDeployRunner의 잠재적으로 의심스러운 실행
id: 12b8e9f5-96b2-41e1-9a42-8c6779a5c184
related:
    - id: d679950c-abb7-43a6-80fb-2a480c4fc450
      type: 비슷함
status: 테스트
description: "PDQDeployRunner"의 의심스러운 실행을 감지합니다. 이는 원격 장치에서 명령과 패키지를 실행하는 PDQDeploy 서비스 스택의 일부입니다
references:
    - https://twitter.com/malmoeb/status/1550483085472432128
author: Nasreddine Bencherchali (Nextron Systems)
date: 2022/07/22
modified: 2024/05/02
tags:
    - 공격.실행
logsource:
    category: process_creation
    product: windows
detection:
    selection_parent:
        ParentImage|contains: '\PDQDeployRunner-'
    selection_child:
        # 다른 의심스러운 프로세스, 명령줄 또는 경로 추가하여 이 섹션을 개선
        - Image|endswith:
              # 다음 프로세스 중 하나를 정상적으로 사용할 경우 주석 처리
              - '\bash.exe'
              - '\certutil.exe'
              - '\cmd.exe'
              - '\csc.exe'
              - '\cscript.exe'
              - '\dllhost.exe'
              - '\mshta.exe'
              - '\msiexec.exe'
              - '\regsvr32.exe'
              - '\rundll32.exe'
              - '\scriptrunner.exe'
              - '\wmic.exe'
              - '\wscript.exe'
              - '\wsl.exe'
        - Image|contains:
              - ':\ProgramData\'
              - ':\Users\Public\'
              - ':\Windows\TEMP\'
              - '\AppData\Local\Temp'
        - CommandLine|contains:
              - ' -decode '
              - ' -enc '
              - ' -encodedcommand '
              - ' -w hidden'
              - 'DownloadString'
              - 'FromBase64String'
              - 'http'
              - 'iex '
              - 'Invoke-'
    condition: all of selection_*
falsepositives:
    - PDQDeploy 도구를 사용하여 이러한 명령을 실행하는 것이 정당할 경우
level: medium
```

모든 업데이트 목록을 확인하려면 전체 릴리스 변경 로그를 확인하세요.




# 수정 사항

이 릴리스에서는 "Forest Blizzard APT - 프로세스 생성 활동" 규칙이 작동하지 않도록 만드는 누락된 수정 자를 처리한 것을 확인할 수 있었습니다.

변경 사항 및 추가 사항의 전체 변경 로그를 확인하려면 아래 릴리스 페이지를 참조해주세요.

# 기여자



이 릴리스는 Sigma 커뮤니티 기여자 여러분 덕분에 가능해 졌어요. 다음 분들께 큰 감사를 전합니다.

- @ahmedfarou22
- @frack113
- @hasselj
- @joshnck
- @nasbench
- @pratinavchandra
- @swachchhanda000