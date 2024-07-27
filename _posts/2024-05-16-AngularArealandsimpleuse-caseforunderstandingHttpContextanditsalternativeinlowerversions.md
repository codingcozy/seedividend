---
title: "Angular HttpContext를 이해하는 진짜 간단한 사용 사례와 이전 버전에서의 대안"
description: ""
coverImage: "/assets/img/2024-05-16-AngularArealandsimpleuse-caseforunderstandingHttpContextanditsalternativeinlowerversions_0.png"
date: 2024-05-16 03:21
ogImage: 
  url: /assets/img/2024-05-16-AngularArealandsimpleuse-caseforunderstandingHttpContextanditsalternativeinlowerversions_0.png
tag: Tech
originalTitle: "Angular: A real and simple use-case for understanding HttpContext and its alternative in lower versions"
link: "https://medium.com/@ramya-bala221190/angular-a-real-and-simple-use-case-for-understanding-httpcontext-and-its-alternative-in-lower-65dc1ceeeaa4"
---


이런 경우를 겪어 보셨나요? HTTP 요청들에 대해 캐싱, 스피너 보여주지 않기, 오류 추적하기 등의 작업을 대부분의 요청에 대해 수행하고 싶지만, 일부 요청에는 이 작업을 실행하고 싶지 않거나 그 반대로 수행하고 싶지 않은 경우가 있습니다.

각 요청에 컨텍스트를 추가하여 HttpRequests 간에 차이를 두실 수 있습니다. 이 컨텍스트에는 요청에 관한 메타데이터가 포함되어 있어서 인터셉터가 요청 간의 차이점을 구분할 수 있습니다.

HttpContext는 Angular V12+ 버전부터 추가된 기능입니다. 그렇다면 낮은 버전의 Angular은 이러한 시나리오를 어떻게 처리할까요? 이 스토리에서 이러한 질문들에 대한 대답을 제공해 드리겠습니다.

저는 간단한 예시를 들어 설명드리겠습니다. HTTP 오류를 추적하고 오류 내용을 데이터베이스에 저장하여 나중에 디버깅하는 API가 있다고 가정해 보겠습니다.



아래는 API를 호출하여 HTTP 오류를 추적하는 TrackErrorService입니다.

이제 오류를 추적해야 하는 HttpRequest도 필요합니다. 우리는 존재하지 않는 사용자의 세부 정보를 가져오기 위해 GET 요청을 수행하고 있습니다. 이 API 호출은 404 오류로 실패할 것입니다.

TestInterceptorService로 넘어가면,

인터셉터는 AppModule의 providers에 등록되어 있습니다.



```js
{
provide: HTTP_INTERCEPTORS,
useClass: TestInterceptorService,
multi: true,
},
```

위의 인터셉터 서비스에는 어떤 문제가 있나요?

HttpRequest 중에 오류가 발생하면 catchError 연산자가 실행되어 아래 2개의 observable을 순차적으로 실행합니다:

```ts
this.trackErrorService.trackError(err)
```




`throwError(err)

trackError() 메서드는 TrackErrorService의 첫 번째 observable을 반환하는데, 이는 HttpRequest를 실행할 때 발생한 오류를 추적할 것입니다.

throwError() rxjs 연산자에 의해 반환된 두 번째 observable은 오류를 구성 요소나 전역 핸들러 클래스(즉, 내장 ErrorHandler 클래스를 구현한)로 다시 던질 것입니다. 이후 추가 조치를 취할 수 있습니다.

만약 HTTP 오류를 추적하는 첫 번째 observable 자체에 오류가 발생하면 어떻게 될까요? 브라우저 창을 닫을 때까지 TrackErrorService의 trackError() 메서드가 무한히 호출되어 루프에 갇히게 됩니다.




I. HttpContext를 사용하여 메타데이터 전달하기

여기서 2개의 HttpRequests를 구별해야 할 필요가 생깁니다. 우리는 track error API 자체를 제외한 모든 HttpRequest에 대한 오류를 추적하고 싶습니다. 따라서 Interceptor와 TrackErrorService 클래스를 수정하여 HttpContext를 추가하겠습니다.

아래는 업데이트된 TestInterceptorService입니다.

다음은 우리가 한 변경사항입니다:



- HttpContextToken 클래스를 사용하여 컨텍스트 토큰을 생성했습니다. 이 토큰은 errorsToBeTracked라는 상수에 저장되어 있습니다. 이 토큰을 사용하여 HttpContext에 저장된 값에 액세스하고 조작할 것입니다. 이 토큰의 기본값은 true로, 람다 함수 () => `true`에서 확인할 수 있습니다. 이 토큰의 기본값이 true인 것은 기본적으로 모든 HTTP 요청이 오류 추적 대상임을 의미합니다.

```js
export const errorsToBeTracked = new HttpContextToken<boolean>(() => true);
```

2. intercept() 내부에서 errorsToBeTracked 토큰의 값을 확인하기 위한 IF 조건을 추가했습니다. 해당 토큰이 true인 경우, HttpRequest에 대한 오류를 추적해야 한다는 것을 의미합니다. 토큰 값이 false인 경우, HttpRequest에 대한 오류를 추적하지 말아야 합니다.

```js
catchError((err) => {

if (req.context.get(errorsToBeTracked)) {
console.log('오류가 추적될 것입니다');
return concat(this.trackErrorService.trackError(err), throwError(err));
} 
else {
console.log('오류가 추적되지 않을 것입니다');
return throwError(err);
}

})
```



현재 HttpContext에 저장된 토큰 errorsToBeTracked의 값을 어떻게 읽고 있나요?

현재 HttpRequest의 context에 저장된 token errorsToBeTracked의 값을 읽기 위해 HttpContext의 get()을 사용하고 있습니다.

```js
req.context.get(errorsToBeTracked)
```

토큰 값이 true이면, TrackErrorService의 trackError()를 사용하여 에러를 추적하고, 에러를 컴포넌트/전역 에러 핸들러로 다시 던집니다.



토큰 값이 false이면 오류를 추적하지 않고, 대신에 오류를 컴포넌트/전역 오류 핸들러로 다시 던집니다.

다음은 업데이트된 TrackErrorService입니다:

우리는 trackError()를 업데이트하여 이 HttpRequest에 대해 HttpContext에서 errorsToBeTracked 토큰의 기본 값을 true에서 false로 재정의했습니다.

데모



저희 애플리케이션은 이렇게 생겼어요. "사용자 불러오기" 버튼이 있습니다. 이 버튼을 클릭하면 TestService의 getUsersData()를 호출하게 됩니다.

존재하지 않는 사용자를 불러오기 위한 API는 예상대로 404 에러로 실패했어요.

위의 HttpRequest가 실패할 때 catchError 연산자가 실행되는데, 우리는 HttpRequest의 컨텍스트에 있는 토큰 값이 true 또는 false인지 확인하고 있어요. HttpRequest 내 토큰 값이 기본적으로 true인데, TestService 내에서 이 값을 재정의하지 않았기 때문에 이 HttpRequest에 대해 값은 여전히 true로 유지되어요.

따라서 오류를 추적하는 API가 호출된 적이 한 번 있으며, 이 역시 실패했어요. 이 HttpRequest의 컨텍스트 토큰 값이 false이기 때문에 오류 추적 API가 또 호출되지는 않았어요.



II. 헤더를 사용하여 메타데이터 전달하기

HttpContext는 V12 이하의 Angular 버전에서 사용할 수 없기 때문에 이 시나리오를 어떻게 처리할 수 있을까요? 요청 헤더를 사용합니다.

TrackErrorService가 다음과 같이 업데이트되었습니다. trackError() 내에서 사용자 정의 헤더 "allow-error-track"을 값 "no"와 함께 전달합니다. 이는 이 HttpRequest에 대한 오류를 추적하고 싶지 않다는 것을 의미합니다.

TestService가 다음과 같이 업데이트되었습니다. getUsersData() 내에서 사용자 정의 헤더 "allow-error-track"을 값 "yes"와 함께 전달합니다. 이는 이 HttpRequest에 대한 오류를 추적하고 싶다는 것을 의미합니다.



다른 인터셉터 서비스를 생성해 보겠습니다: AlternativeInterceptorService.

이 접근법을 테스트하려면 TestInterceptorService를 주석 처리하고 AppModule의 providers에 AlternativeInterceptorService를 등록하면 됩니다.

```js
providers: [
  //아래 시나리오 토큰을 위해 주석 처리를 해제하세요
  // {
  // provide: HTTP_INTERCEPTORS,
  // useClass: TestInterceptorService,
  // multi: true,
  // },

  //사용자 정의 헤더 접근법
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AlternativeInterceptorService,
    multi: true,
  },
],
```

이 인터셉터는 TestInterceptorService와 매우 유사합니다. 차이점은 HttpRequest에 대한 오류를 추적할지 여부를 결정하는 조건에 있습니다.



- 우리는 사용자 정의 요청 헤더 "allow-error-track"의 값을 확인하고 그 값을 상수인 shouldErrorsBeTracked에 저장하고 있습니다. 그런 다음 사용자 정의 "allow-error-track" 헤더를 삭제한 후에 HttpRequest의 클론을 생성하고 있습니다. 결과적으로 복제된 요청은 이 사용자 정의 헤더를 가지고 있지 않을 것입니다.

```js
const shouldErrorsBeTracked = req.headers.get('allow-error-track');

let modifiedRequest = req.clone({
headers: req.headers.delete('allow-error-track'),
});
```

2. 마지막으로 HttpRequest가 실패하는 경우 catchError 연산자가 실행됩니다. 여기서는 상수 shouldErrorsBeTracked의 값을 확인하고 있습니다.

만약 상수가 "no" 값을 포함하고 있다면, 해당 HttpRequest에 대한 오류를 추적할 필요가 없고, 컴포넌트/전역 오류 핸들러 클래스로 간단히 전달될 것을 의미합니다.



만약 상수에 "yes"가 포함되어 있다면, HttpRequest에 해당하는 오류를 추적해야 함을 의미합니다. 따라서 오류 추적 API가 호출되고, 그 다음에 오류가 컴포넌트/글로벌 오류 핸들러로 반환됩니다.

```js
return next.handle(modifiedRequest).pipe(
catchError((err) => {

if (shouldErrorsBeTracked === ‘yes’) {
console.log(‘error will be tracked’);
return concat(this.trackErrorService.trackError(err),throwError(err));
} 
else {
console.log(‘error will not be tracked’);
return throwError(err);
}
})
);
```

아래는 작동 예시입니다: