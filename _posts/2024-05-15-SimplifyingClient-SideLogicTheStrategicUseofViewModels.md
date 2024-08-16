---
title: "클라이언트 측 로직 간소화 뷰 모델의 전략적 활용"
description: ""
coverImage: "/assets/img/2024-05-15-SimplifyingClient-SideLogicTheStrategicUseofViewModels_0.png"
date: 2024-05-15 02:45
ogImage: 
  url: /assets/img/2024-05-15-SimplifyingClient-SideLogicTheStrategicUseofViewModels_0.png
tag: Tech
originalTitle: "Simplifying Client-Side Logic: The Strategic Use of View Models"
link: "https://medium.com/netanelbasal/simplifying-client-side-logic-the-strategic-use-of-view-models-db0ae0363be4"
isUpdated: true
---





![User View Model](/assets/img/2024-05-15-SimplifyingClient-SideLogicTheStrategicUseofViewModels_0.png)

애플리케이션은 종종 서버에서 직접 사용 가능한 데이터 표현과는 다른 데이터 표현이 필요합니다. 예를 들어 사용자 객체에는 열거형 역할, 열거형 상태, 이름 등의 속성이 포함될 수 있습니다. 클라이언트 측 뷰에서 이러한 서버 측 모델을 직접 사용하면 종종 UI 로직 전체에 분산된 복잡한 변환을 유발합니다.

이 문제를 해결하기 위해 각 엔티티에 대한 뷰 모델 클래스를 생성하는 것을 주장합니다. 이 캡슐화는 데이터 처리를 간단하게 만들어주며 UI가 필요한 것만 받도록 보장합니다. 다음은 UserVm의 간단한 실제 예시입니다:

```js
const rolesMap = fromBeEnum(UserRoleEnum, {
  VIEWER: '뷰어',
  ADMIN: '관리자',
  SIGNER: '서명자',
  OWNER: '소유자'
});

export class UserVm {
  constructor(dto: User) {
    this.displayName = dto.name || dto.email;
    this.isActive = dto.status === UserStatusEnum.ACTIVE;
    this.isServiceAccount = dto.type === UserTypeEnum.SERVICE_ACCOUNT;
    this.isViewer = dto.role === UserRoleEnum.VIEWER;
    this.isOwner = dto.role === UserRoleEnum.OWNER;
    this.isActiveAdmin = dto.isAdmin && this.isActive;
    this.typeLabel = dto.isServiceAccount ? '서비스 계정' : '사용자';
    this.roleLabel = this.userRoleToLabel();
    this.hasAddQuorum = hasQuorum(dto, 'add');
    this.hasRemoveQuorum = hasQuorum(dto, 'remove');
    this.isPendingApproval = this.hasAddQuorum || this.hasRemoveQuorum;
  }
  
  private userRoleToLabel() {
    return rolesMap[this.dto.role] || '알 수 없음';
  }
}
```



getUser 엔드포인트에서 데이터를 받으면 UserVm 클래스를 사용하여 응답에 맞는 새 사용자 뷰 모델을 생성합니다. 이 추상화를 통해 깔끔하고 유지 관리 가능한 코드 구조를 유지할 수 있습니다.

```js
import { injectQuery, mapResultData } from '@ngneat/query';

@Injectable({ providedIn: 'root' })
export class UserService {
  private query = injectQuery();
  private client = injectApiClient();

  getUser({ vaultId }) {
    return this.query({
      queryKey: ['user'],
      queryFn: () => {
        return this.client.getAuthenticatedUser({ vaultId })
      }
    }).result$.pipe(
      mapResultData(user => new UserVm())
    )
  }
}
```

이 원칙은 엔티티 배열을 다룰 때에도 동일하게 적용됩니다. 예를 들어, 응용 프로그램 내에서 거래가 어떻게 처리되는지 살펴보면 — UI 변환을 거치는 중요한 엔티티인 거래에 대해 어떻게 다루는지에 대해 생각해 보세요.

```js
import { injectQuery, mapResultData } from '@ngneat/query';

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private query = injectQuery();
  private client = injectApiClient();

  getTransactions({ vaultId }) {
    return this.query({
      queryKey: ['transactions'],
      queryFn: () => {
        return this.client.getTransactions({ vaultId })
      }
    }).result$.pipe(
      mapResultData(res => res.transactions.map(t => new TransactionVm(t)))
    )
  }
}
```



# 뷰 모델 사용의 이점

## 명확성과 사용자 정의

백엔드 네이밍 규칙 때문에 머리를 긁는 순간들을 우리 모두 겪어봤죠 😛. 뷰 모델은 속성 이름을 바꿔 더 직관적으로 만들 수 있습니다. DTO 이름이 애매할 때, VM은 DTO를 직접 변경하지 않고 더 구체적인 이름을 사용하는 방법을 제공합니다.

## 스키마 유연성



VMs(Visual Models)은 백엔드 구조에 영향을 미치지 않고 DTO 스키마를 애플리케이션의 요구에 더 잘 맞게 수정할 수 있는 기회를 제공합니다. 이 유연성은 다양한 사용 케이스에 적응하는 데 중요합니다.

## 중앙화된 수정

DTO에 중요한 변경이 있거나 예기치 못한 수정이 필요한 경우, 조정은 뷰 모델에서만 하면 되며 애플리케이션 전체에 수정을 반영할 필요가 없습니다. 이 중앙화는 버그와 유지보수 부담을 크게 줄여줍니다.

## 캡슐화



변환 로직을 VM 내부로 캡슐화하면 컴포넌트 전체에서의 파이프, 유틸리티 함수 및 열거형에 대한 의존성이 줄어들어 더 깨끗하고 유지보수가 쉬운 코드를 작성할 수 있습니다.

## 재사용성

한 번 정의된 View Model은 응용 프로그램의 다른 부분 또는 다른 프로젝트에서도 재사용할 수 있습니다. 이러한 재사용성은 개발 시간을 크게 단축하고 오류를 줄일 수 있습니다. 예를 들어, ownerVm을 사용하는 DeviceVm의 시나리오를 살펴보겠습니다:

```js
export class DeviceVm {
  ownerVm: UserVm;

  constructor(device: Device) {
    // ...device props
    this.ownerVm = new UserVm(device.owner);
  }
}
```



이 설정을 사용하면 장치를 처리하는 애플리케이션의 어떤 부분이든 UserVm에서 사용 가능한 풍부한, 사전 처리된 데이터를 자동으로 활용할 수 있습니다.

Entity 간 관련이 있는 복잡한 데이터 구조는 조합된 VM에서 크게 이점을 얻을 수 있습니다. 예를 들어, 여러 장치를 가진 사용자 시나리오는 다음과 같이 보일 수 있습니다:

```js
export class UserWithDevicesVm extends UserVm {
  devices: DeviceVm[];

  constructor(user: User, devices: Device[]) {
    super(user); // 기본 UserVm 초기화
    this.devices = devices.map(device => new DeviceVm(device));
  }
}

// 서비스에서
import { intersectResults$ } from '@ngneat/query';

combineLatest([
  this.usersService.getUsers({ vaultId }),
  this.devicesService.getDevices({ vaultId })
]).pipe(
  intersectResults$(([users, devices]) => {
    const userDevices = devices.filter(...); 
    return users.map(user => new UserWithDevicesVm(user, userDevices));
  })
)
```

# 업데이트용 뷰 모델 복제



가끔가다 VM을 업데이트해야 할 때가 있습니다. 이런 경우를 위해 원본 DTO를 보존하고 복제 방법을 구현할 수 있습니다:

```js
export class DeviceVm {
  
  constructor(private dto: Device) {
    // 장치 속성
  }
  
  clone() {
    return new DeviceVm(this.dto)
  }
}
```

제 애플리케이션에서는 보통 VM을 직접 업데이트하지 않습니다. 대신 성능 문제가 없는 한, @ngneat/query(내부적으로 tanstack/query를 사용)의 invalidateQueries 함수를 활용합니다. 이 방식은 서버에서 데이터를 다시 가져오고 자동으로 새 VM을 생성하여 사용자 인터페이스를 업데이트합니다.

# 결론



뷰 모델은 애플리케이션 데이터를 관리하기 위한 강력한 패턴으로 작용합니다. 이들은 클라이언트 측 개발을 단순화할 뿐만 아니라 애플리케이션의 유지 보수성과 확장성을 향상시킵니다. 데이터 처리 및 변환을 전용 클래스로 추상화함으로써, 개발자들은 견고하고 사용자 친화적인 인터페이스를 구축하는 데 집중할 수 있습니다.

Angular 및 JS에 대해 더 알아보려면 Medium 또는 Twitter에서 팔로우해주세요!