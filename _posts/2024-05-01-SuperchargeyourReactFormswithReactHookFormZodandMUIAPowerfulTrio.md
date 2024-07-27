---
title: "React Hook Form과 Zod, MUI로 React Form 만들기"
description: ""
coverImage: "/assets/img/2024-05-01-SuperchargeyourReactFormswithReactHookFormZodandMUIAPowerfulTrio_0.png"
date: 2024-05-01 17:57
ogImage: 
  url: /assets/img/2024-05-01-SuperchargeyourReactFormswithReactHookFormZodandMUIAPowerfulTrio_0.png
tag: Tech
originalTitle: "Supercharge your React Forms with React Hook Form, Zod, and MUI: A Powerful Trio"
link: "https://medium.com/@charuwaka/supercharge-your-react-forms-with-react-hook-form-zod-and-mui-a-powerful-trio-47b653e7dce0"
---


React Hook Form과 Zod 스키마를 사용하여 효율적으로 유효성을 검사하는 방법을 배우세요. MUI 컨트롤과 함께 사용하여 양식 유효성 검사 능력을 한 단계 업그레이드하세요. 이 포괄적인 가이드를 통해 React 애플리케이션에서 견고함과 정확성을 보장하세요. 통합 프로세스를 몰두하고 개발 워크플로우를 간소화하세요!

효율적이고 사용자 친화적인 양식을 작성하는 것은 React 애플리케이션에서 중요합니다. 그러나 유효성 검사, 상태 및 스타일 관리는 지루하고 복잡해질 수 있습니다. 이것이 React Hook Form, Zod 및 MUI의 조합이 빛을 발하는 곳입니다!

![](/assets/img/2024-05-01-SuperchargeyourReactFormswithReactHookFormZodandMUIAPowerfulTrio_0.png)

React Hook Form:

<div class="content-ad"></div>

- 선언적 접근 방식: 등록, 유효성 검사 및 제출에 대한 후크를 사용하여 양식 관리를 간소화합니다.
- 내장 유효성 검사: 외부 라이브러리가 필요하지 않습니다. 양식 내에서 직접 유효성 검사 규칙을 정의하세요.
- 비제어 컴포넌트: 네이티브 HTML 입력 또는 제어 컴포넌트를 활용하여 유연성을 높이세요.

Zod:

- 유형 안전한 유효성 검사: 강력한 스키마 유효성 검사 라이브러리로 데이터 품질을 보장하세요.
- 명확한 오류 메시지: Zod 스키마를 사용하면 사용자가 어떤 오류가 발생했는지 이해할 수 있도록 명확한 오류 메시지를 작성할 수 있습니다. 더 나아가 중첩된 유효성 검사를 사용하여 고급 유효성 검사 규칙을 작성할 수 있어 복잡한 데이터 구조를 처리하기가 더 쉬워집니다.
- React Hook Form과의 통합: zodResolver와의 원활한 통합으로 양식에서 간편한 유효성 검사를 수행하세요.

MUI:

<div class="content-ad"></div>

- 아름다운 UI 구성 요소: 미리 만들어진 MUI 컴포넌트를 사용하여 시각적으로 매력적이고 접근성 있는 양식을 만들어보세요.
- 사용자 정의: 브랜드 아이덴티티에 맞춰 테마를 사용자 정의하여 앱 UI의 모양과 느낌을 조정하세요.
- 쉬운 통합: Material-UI 컴포넌트는 React Hook Form과 원활하게 통합되어 스타일 충돌 가능성을 줄입니다.

이 3가지를 사용하는 장점:

- 향상된 개발자 경험: 보일러플레이트를 줄이고 더 깔끔하고 유지보수하기 쉬운 코드를 작성하세요.
- 향상된 사용자 경험: 자동 유효성 검사, 명확한 오류 메시지, 부드러운 작업 흐름을 활용하세요.
- 오류 감소: 타입 안전한 유효성 검사로 데이터 문제를 일찍 발견하고 예방하세요.
- 빠른 개발: 기능 구축에 집중하고 양식과의 싸움을 줄이세요.

예제를 만들어봅시다!

<div class="content-ad"></div>

```js
// 폼 유효성 검사를 위한 Zod 스키마 정의
// Yup 유효성 검사를 대신 사용할 수도 있습니다.
const schema = z.object({
  email: z.string().email("유효하지 않은 이메일입니다.").min(1, "이메일은 필수입니다."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
  phoneNumber: z
    .string()
    .min(10, "전화번호는 최소 10자 이상이어야 합니다.")
    .max(10)
    .optional(),
  country: z.string().min(1, "국가는 필수입니다."),
});
```

여기서 복잡한 객체를 Zod를 사용하여 유효성 검사하는 방법입니다.

```js
const addressSchema = z.object({
  street: z.string().min(1, "거리를 입력해주세요."),
  city: z.string().min(1, "도시를 입력해주세요."),
  zipCode: z
    .string()
    .min(5, "우편번호는 최소 5자 이상이어야 합니다.")
    .refine(value => /^\d+$/.test(value), {
      message: "우편번호는 숫자로만 이루어져야 합니다."
    }),
});

const userSchema = z.object({
  email: z.string().email("유효하지 않은 이메일입니다.").min(1, "이메일은 필수입니다."),
  password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),
  phoneNumber: z
    .string()
    .min(10, "전화번호는 최소 10자 이상이어야 합니다.")
    .max(10)
    .optional(),
  country: z.string().min(1, "국가는 필수입니다."),
  address: addressSchema,
});
```

폼 데이터의 유형을 정의하고 useForm 훅을 사용하여 입력 상태를 관리하세요.

<div class="content-ad"></div>

```js
// 폼 데이터 유형 정의
type FormData = z.infer<typeof schema>;
// react-hook-form에서 useForm을 구조분해하여 가져옵니다
const {
  // register: 입력 요소 등록 함수
  register,
  // handleSubmit: 폼 제출 처리 함수
  handleSubmit,
  // watch: 폼 입력 값 감시 함수
  watch,
  // formState: 폼 상태 정보를 포함한 객체
  formState: { errors, touchedFields }, // formState에서 errors 및 touchedFields를 구조분해합니다
} = useForm<FormData>({ // generic 타입 FormData로 useForm 훅 호출
  // resolver: Zod를 사용하여 폼 유효성 검사에 대한 리졸버 지정
  resolver: zodResolver(schema), // Zod 스키마를 리졸버에 전달
  // defaultValues: 폼 입력의 기본 값 지정
  defaultValues: {
    email: "", 
    password: "", 
    phoneNumber: "",
    country: "",
  },
});

 const onSubmit = (data: FormData) => {
    console.log(data); // 제출된 데이터로 API 호출
 };
```

React Hook Form과 Material-UI 컴포넌트, MUI 폼 컨트롤을 사용하여 폼을 생성해봅시다.

```js
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" gutterBottom>
            회원가입
          </Typography>
          <TextField
            label="이메일"
            fullWidth
            margin="normal"
            defaultValue={defaultValues.email}
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="비밀번호"
            type="password"
            fullWidth
            margin="normal"
            defaultValue={defaultValues.password}
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            label="전화번호"
            fullWidth
            margin="normal"
            defaultValue={defaultValues.phoneNumber}
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />

          <FormControl fullWidth margin="normal" error={!!errors.country}>
            <InputLabel>국가</InputLabel>
            <Select
              label="국가"
              {...register("country")}
              defaultValue={defaultValues.country}
              sx={ my: 1 }
            >
              <MenuItem value="USA">미국</MenuItem>
              <MenuItem value="Canada">캐나다</MenuItem>
              {/* 필요한 경우 다른 국가 추가 */}
            </Select>
            <FormHelperText>{errors.country?.message}</FormHelperText>
          </FormControl>

          <Button type="submit" variant="contained" color="primary">
            제출
          </Button>
        </form>
```

위의 코드에서 무슨 일이 벌어지고 있는지 설명드리겠습니다.

<div class="content-ad"></div>

```bash
- defaultValue={defaultValues.phoneNumber}: 여기서는 입력 필드의 기본값을 저장된 값으로 설정합니다.
- {...register("phoneNumber")}: 이 줄은 React Hook Form과 입력 필드를 등록하여 폼 데이터의 "phoneNumber" 필드와 연결합니다. 이를 통해 React Hook Form을 사용하여 폼 유효성 검사 및 데이터 처리를 활성화할 수 있습니다.
- error={!!errors.phoneNumber}: 이 속성은 입력 필드에 대한 오류 상태를 표시할지 여부를 결정합니다. 만약 폼 데이터의 "phoneNumber" 필드에 오류가 있으면 오류 상태를 트리거합니다.
- helperText={errors.phoneNumber?.message}: 여기서 "phoneNumber" 필드와 관련된 오류 메시지를 표시합니다. 오류가 없으면 이 속성은 비어 있지만, 폼 유효성 검사 중 오류가 발생하면 사용자에게 오류 메시지를 표시하여 안내합니다.
```

사용자에게 피드백을 제공하고 유효성 검사 오류를 조건적으로 표시하는 데 touchedFields 객체를 사용할 수 있습니다.

![이미지](/assets/img/2024-05-01-SuperchargeyourReactFormswithReactHookFormZodandMUIAPowerfulTrio_1.png)

예를 들어 사용자가 상호 작용한 필드에 대해서만 유효성 검사 오류를 표시하고 싶을 수 있습니다. 필드의 touched 상태가 true인지 확인하여 오류 메시지를 조건부로 렌더링할 수 있습니다.

<div class="content-ad"></div>

```js
error={!!errors.firstName && touchedFields.firstName}
```

watch를 사용하면 사용자가 입력하는 값의 변경 사항을 추적하고 반응할 수 있습니다. 비밀번호를 입력할 때 암호 강도를 표시하고 싶다면, 입력 값을 기반으로 실시간으로 유효성을 검사하는 watch를 사용하여 이를 달성할 수 있습니다.

```js
const password = watch('password');

useEffect(() => {
    console.log(passwordWatch); // 로깅
    if (password.length < 8 || !hasAlphabet(password) || !hasLowercase(password) || !hasSpecialCharacter(password)) {
      // 비밀번호 강도 경고 표시
    } else {
      // 경고 숨기기
    }
  }, [password]);
```

비밀번호가 변경될 때마다 비밀번호 값이 변경되는 것을 확인할 수 있습니다.

<div class="content-ad"></div>

<img src="/assets/img/2024-05-01-SuperchargeyourReactFormswithReactHookFormZodandMUIAPowerfulTrio_2.png" />

FormControl과 control은 서로 다른 목적을 가지고 있습니다.

FormControl

- Material-UI의 컴포넌트: 이 컴포넌트는 텍스트 필드, 체크박스, 라디오 버튼과 같은 폼 컨트롤을 스타일링하고 그룹화하기 위해 특별히 디자인된 컴포넌트입니다. 시각적 일관성과 접근성을 위한 스타일링 및 레이아웃 옵션을 제공합니다.
- 예시: 코드에서 FormControl은 이메일과 비밀번호 필드를 위해 InputLabel과 Select 컴포넌트를 감싸는 데 사용되어, 레이블과 에러 처리를 포함하는 스타일링된 인풋 그룹을 만듭니다.

<div class="content-ad"></div>

컨트롤

- react-hook-form의 기능: useForm 훅에서 제공되는 함수로, 폼 입력을 등록하고 값 및 상태를 관리할 수 있게 해줍니다. 입력을 폼 상태에 연결하고 검증 및 상호작용 메커니즘을 제공하는 내부 논리를 처리합니다.
- 예시: register 내에서 컨트롤 함수를 전달하면 필드 이름(이메일 또는 비밀번호)과 함께 입력을 폼 상태에 등록할 수 있습니다. 이렇게 하면 react-hook-form이 입력의 값을, 오류 및 검증 상태를 추적할 수 있습니다.

![이미지](/assets/img/2024-05-01-SuperchargeyourReactFormswithReactHookFormZodandMUIAPowerfulTrio_3.png)

react-hook-form-mui 라이브러리를 사용하는 것을 고려해보세요. 이 라이브러리는 Material-UI 구성요소에 대한 사용자 지정 컴포넌트 및 래퍼를 제공하며, react-hook-form과 원활하게 통합됩니다.

<div class="content-ad"></div>

# 일반 사용 사례

Material-UI 구성 요소를 사용할 때는 register 및 Controller 간의 선택이 특정 컴포넌트 및 원하는 제어 수준에 따라 달라집니다:

다음에 register 사용:

- 제어된 동작을 갖는 기본 Material-UI 구성 요소:

<div class="content-ad"></div>

- 텍스트 필드
- 선택
- 체크박스
- 라디오 그룹

컨트롤러 사용 사례:

기본적으로 제어된 동작을 따르지 않는 고급 Material-UI 구성 요소

- 자동 완성
- 날짜 선택기
- 시간 선택기
- 스위치

<div class="content-ad"></div>

# 주요 기능

## Re-Renderers 분리하기

Re-Renderers 분리하기는 React Hook Form의 기능 중 하나로, 필요한 컴포넌트만 다시 렌더링하여 폼의 성능을 개선할 수 있게 해줍니다. 전체 폼을 다시 렌더링하는 대신 업데이트해야 할 컴포넌트만 다시 렌더링하는 것이 중요합니다. 이는 폼이 로드되는 데 필요한 시간을 줄이고 사용자와의 상호 작용을 향상시킬 수 있습니다.

세 개의 자식 컴포넌트를 포함한 폼이 있다고 상상해봅시다: 자식 컴포넌트 A, 자식 컴포넌트 B, 자식 컴포넌트 C. 제어되는 폼에서 자식 컴포넌트 A를 변경하면, 자식 컴포넌트 B와 자식 컴포넌트 C가 업데이트될 필요가 없더라도 세 개의 자식 컴포넌트가 모두 다시 렌더링됩니다.

<div class="content-ad"></div>

React Hook Form을 사용하면 Child Component A의 다시 렌더링을 격리시켜 해당 컴포넌트가 변경되었을 때 해당 컴포넌트만 다시 렌더링됩니다. 이렇게 하면 대형이거나 복잡한 폼을 사용할 경우 폼의 성능을 크게 향상시킬 수 있습니다.

# 결론

React Hook Form, Zod 및 MUI를 결합하여 견고하고 효율적이며 사용자 친화적인 폼을 만들어 React 개발 경험을 향상시킬 수 있습니다. 그러니 복잡성을 버리고 엔터프라이즈 수준의 폼 빌딩 여정을 위해 이 강력한 세트를 환영해 보세요!

유용하게 여겨진다면 박수 버튼을 눌러주세요.