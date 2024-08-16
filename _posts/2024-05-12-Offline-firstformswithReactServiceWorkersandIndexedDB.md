---
title: "리액트, 서비스 워커, IndexedDB를 이용한 오프라인 우선 양식"
description: ""
coverImage: "/assets/img/2024-05-12-Offline-firstformswithReactServiceWorkersandIndexedDB_0.png"
date: 2024-05-12 22:45
ogImage: 
  url: /assets/img/2024-05-12-Offline-firstformswithReactServiceWorkersandIndexedDB_0.png
tag: Tech
originalTitle: "Offline-first forms with React, Service Workers, and IndexedDB"
link: "https://medium.com/@dennistowns/offline-first-forms-with-react-service-workers-and-indexeddb-3da7c8305031"
isUpdated: true
---




![이미지](/assets/img/2024-05-12-Offline-firstformswithReactServiceWorkersandIndexedDB_0.png)

건설 산업을 위한 웹 응용 프로그램(또는 현장에서 사용할 웹 응용 프로그램)을 구축한다고 상상해보세요. 이 앱에서 현장 감독관들은 작업 사이트에서 양식을 통해 프로젝트 및 근로자 상태를 데이터베이스에 업데이트합니다. 이제 하루에 여러 사이트를 방문하고 iPad를 통해 웹 앱에 엑세스해야 하는 경우를 상상해보세요. 이러한 시나리오에서는 지속적인 인터넷 연결을 보장할 수 없습니다. 이 정보에 프로젝트 성공에 중요한 자원이 의존하는 경우는 어떨까요? 이 위험을 어떻게 완화할 수 있을까요? 이를 완화하는 한 가지 방법은 오프라인 우선 방법으로 앱을 구축하는 것입니다.

우리는 React와 네이티브 자바스크립트 라이브러리인 서비스 워커(Service Workers)와 IndexedDB를 결합하여 웹에서 오프라인 우선 양식을 만들 것입니다.

서비스 워커란 무엇인가요?



서비스 워커는 웹의 시크릿 에이전트처럼, 뒷면에서 작업하는 것 같아요. 이들은 원본과 경로에 대해 등록된 이벤트 기반 워커입니다. 웹 페이지/사이트를 제어할 수 있는 자바스크립트 파일이에요. 이들 스크립트는 메인 브라우저 스레드와 별도로 실행되며 논블로킹입니다. 그들은 네트워크 요청을 가로채거나 자원 요청을 캐시하거나 검색하며 푸시 메시지를 전달할 수 있어요. 또한 오프라인 상태일 때에도 작동합니다. 이것은 오프라인 우선 구성 SaSS 시나리오에 완벽합니다.

동기화 관리자와 IndexedDB: 완벽한 조합

Sync Manager API는 안정적인 연결이 확립될 때까지 작업을 연기하는 데 도움을 주는 네이티브 JS 기능입니다. IndexedDB는 로컬 스토리지보다 훨씬 강력한 클라이언트 측 저장소를 위한 저수준 API입니다. 함께 사용할 때 웹 응용프로그램은 사용자 세션 및 연결 상태 변경 사이에서 데이터를 저장하고 동기화할 수 있습니다.

사용 사례: 오프라인에서 양식 데이터 저장



건설 앱 시나리오에서 사용자는 양식을 입력하고 제출하려고 합니다. 일반적으로 연결이 끊어지면 해당 데이터가 손실될 수 있습니다. 그러나 저희 설정은 서비스 워커를 사용하여 폼 제출을 가로채고 데이터를 IndexedDB에 저장하며 Sync Manager와 동기화를 등록합니다. 연결이 다시 연결되면 데이터가 서버로 전송됩니다. 코드에서 어떻게 작동하는지 살펴봅시다.

# 코드 예시

## 시작하기

저희는 빠른 실행과 Vite를 빌드 도구로 사용하겠습니다.



번을 설치한 후 다음 명령어를 사용하여 Vite로 생성된 React 앱을 만들고 실행할 수 있어요:

```js
bun create my-app --template react
```

```js
cd my-app && bun run dev
```

저희는 src 디렉토리 내의 App.tsx 파일에서 애플리케이션을 개발하기 시작할 거예요.



**참고**: 이 예제의 React JSX나 백엔드는 확인하지 않습니다. 백엔드는 저장된 사람들을 위한 GET 및 POST 엔드포인트가 있는 기본 REST API입니다. 전체 코드는 GitHub 저장소를 참조하십시오.

# 단계 1: 서비스 워커 등록

애플리케이션이 로드될 때, 브라우저가 서비스 워커를 지원하는지 확인하고, 지원하는 경우 서비스 워커 스크립트를 등록합니다 (나중에 이 service-worker.js를 생성합니다). 이 등록은 애플리케이션이 시작되면 발생하며, 서비스 워커가 요청을 가로채고 캐싱 및 동기화 작업을 관리할 준비가 되도록 합니다.

```js
interface Person {
  firstName: string,
  lastName: string,
  age: number
}

function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const { register, handleSubmit } = useForm();

  const registerWorker = () => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js', {scope: '/', type: 'module'})
          .then(registration => {
            console.log('Service Worker registered: ', registration);
          })
          .catch(registrationError => {
            console.log('Service Worker registration failed: ', registrationError); 
          });
      });
    }
  }
```



# 단계 2: 서비스 워커 파일 생성 및 설치 시 IndexedDB 설정

우리가 App.tsx에서 등록하려고 하는 서비스 워커를 생성하기 위해, src 디렉토리와 동일한 디렉토리 수준에 service-worker.js라는 파일을 만들 것입니다. 이렇게 하는 이유는 서비스 워커를 더 넓은 범위로 설정하기 위해서입니다. 더 높은 또는 루트 디렉토리 수준에 서비스 워커를 배치하면 애플리케이션 전체에서 더 많은 리소스에 대한 요청을 가로챌 수 있습니다. 이 위치 설정은 서비스 워커가 캐싱 및 네트워크 요청을 효과적으로 관리할 수 있도록하는 데 중요합니다.

이 서비스 워커 파일에서 'install' 이벤트 동안 IndexedDB를 초기화합니다. 우리는 formDataStore라는 데이터베이스를 설정하고 오프라인 폼 데이터를 저장하기 위해 특별히 설계된 formData 개체 저장소를 구성합니다. 이 설정은 앱에서 견고한 오프라인 기능을 활성화하는 데 중요합니다:

```js
// service-worker.js 

self.addEventListener('install', async (event) => {
    console.log('Service Worker installing...');
    await openDB('formDataStore', 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('formData')) {
            db.createObjectStore('formData', { autoIncrement: true });
            console.log('Object store created!');
          }
        },
    });
    console.log('Service Worker installed.');
});
```



# 단계 3: 폼 제출 가로채기

폼이 제출되면, 애플리케이션은 기기가 온라인인지 확인합니다. 온라인 상태인 경우, 데이터를 API를 통해 직접 서버로 보냅니다. 오프라인 상태인 경우, 데이터를 IndexedDB에 저장합니다.

```js
// App.tsx

  const onSubmit = async (data: FieldValues) => {
    if (navigator.onLine) {
      const response = await fetch(API_URL + '/people',
        { method: "POST", body: JSON.stringify(data) }
      )
      if (response.ok) {
        console.log(response)
        setPeople((prevPeople) => [{...data} as Person, ...prevPeople])
      }

    } else {
      await storeFormDataLocally(data);
    }
  }
```

# 단계 4: 로컬로 데이터 저장하기



오프라인 상태에서는 폼 데이터가 IndexedDB에 저장됩니다. 이 storeFormDataLocally 함수는 formData 객체 저장소에서 트랜잭션을 열고 데이터를 작성한 다음, 이 데이터가 서버로 전송되어야 할 것임을 나타내는 sendFormData 태그와의 백그라운드 동기화 이벤트를 등록합니다. 이렇게 하면 나중에 연결이 복원될 때 이 데이터를 서버로 보낼 수 있습니다.

```js
async function storeFormDataLocally(formData : FieldValues) {

    const db = await openDB('formDataStore', 1);
    const tx = db.transaction('formData', 'readwrite');
    const store = tx.objectStore('formData');
    store.put(formData);
    await tx.done;
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      const registration : any  = await navigator.serviceWorker.ready
      try {
        await registration.sync.register('sendFormData');
          console.log('Sync event registered');
      } catch(e) {
          console.log('Failed to register sync, will retry on next   visit' + e);
      }
  }
    db.close();
  }
```

서비스 워커는 'sync' 이벤트를 수신 대기합니다. 이벤트가 트리거될 때(온라인으로 변경될 때 자동적으로 발생), IndexedDB에서 모든 저장된 폼 데이터를 검색하여 서버로 보내려고 시도합니다. 성공적인 제출은 그 후에 저장소에서 삭제되어 중복 전송을 방지합니다.

```js
self.addEventListener('sync', event => {
    if (event.tag === 'sendFormData') {
        event.waitUntil(sendFormDataToServer());
    }
});
```



# 단계 6: 데이터 서버로 전송하고 IndexedDB 초기화하기

실제 데이터 전송 함수는 formData 스토어에서 모든 항목을 가져와 각 항목을 서버로 전송하며 성공적인 전송 후 스토어에서 해당 항목을 제거합니다. 이렇게 함으로써 로컬 스토어를 유지하고 최신 상태로 유지할 수 있습니다.

```js
export async function sendFormDataToServer() {
    const db = await openDB('formDataStore', 1);
    const tx = db.transaction('formData', 'readonly');
    const store = tx.objectStore('formData');
    const allSavedData = await store.getAll();
    console.log('저장된 폼 데이터', allSavedData);
    try {
        allSavedData.forEach( async (form, index) =>  {
            const response = await fetch('http://localhost:3000/people',  
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (response.ok) {
                console.log('서버와 동기화된 데이터:', form);
                await db.transaction('formData', 'readwrite').objectStore('formData').delete(index);
                console.log(`제거된 폼 데이터: ${form.firstName} ${form.lastName}` )
            }
        });
    } catch (error) {
        console.error('폼 데이터 전송 실패:', error);
    }
}
```

# 결론



건설 SaSS 웹 앱 시나리오로 돌아가 봅시다. 건설 현장에서는 감독관이 여러 장소를 자주 이동하며 중요한 프로젝트 및 작업자 데이터에 원활하게 접근할 수 있어야 합니다. 때때로 인터넷 연결이 불안정한 상황에서도요.

React, 서비스 워커 및 IndexedDB를 사용하여 오프라인 우선 접근 방식을 채택함으로써 이러한 독특한 요구 사항을 충족시켰습니다. 이러한 기술을 활용하면 지속적인 워크플로우를 지원하고 신뢰할 수 없는 연결성으로 인한 위험을 완화하며 모든 이해관계자가 최신 정보에 접근할 수 있도록하여 적시에 결정을 내릴 수 있게 하며 꾸준한 프로젝트 진행을 보장할 수 있습니다.

코드의 전체 내용은 여기에서 Github 저장소를 참조하세요.

원문은 https://dennistowns.substack.com에서 원본 게시됨.