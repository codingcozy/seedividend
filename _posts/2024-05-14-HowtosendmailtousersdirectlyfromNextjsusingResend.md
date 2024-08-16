---
title: "Nextjs를 사용하여 Resend를 이용해 사용자에게 직접 메일을 보내는 방법"
description: ""
coverImage: "/assets/img/2024-05-14-HowtosendmailtousersdirectlyfromNextjsusingResend_0.png"
date: 2024-05-14 11:58
ogImage: 
  url: /assets/img/2024-05-14-HowtosendmailtousersdirectlyfromNextjsusingResend_0.png
tag: Tech
originalTitle: "How to send mail to users directly from Next.js using Resend?"
link: "https://medium.com/coffeed/how-to-send-mail-to-users-directly-from-next-js-using-resend-9c558fc767e6"
isUpdated: true
---




Next.js는 매우 다재다능한 프론트엔드를 제공해줘요. 이를 단독으로 사용하여 웹 사이트의 대부분 요구 사항을 해결할 수 있어요. 프로젝트 구조 자체에 서버 측 렌더링을 활용하고 API를 생성할 수 있는 기능이 내장되어 있어 Next.js 앱의 기능을 확장할 수 있어요.

![Resend 이미지](/assets/img/2024-05-14-HowtosendmailtousersdirectlyfromNextjsusingResend_0.png)

이 기사에서는 개발자를 위한 이메일 API인 Resend를 탐색하고 앱과 통합해볼 거예요. 우리는 간단한 연락처 양식을 만들어서 제출하면 제출된 정보와 함께 이메일을 우리 받은 편지함으로 전송할 거에요. 이 통합은 문의, 대기 목록 또는 기타 양식 정보를 받고 바로 우리 받은 편지함으로 전달하고 싶을 때 아주 유용해요.

# 우리 Next.js 앱



간단한 Next.js 앱을 만들 계획이에요. contact form을 사용해서. yarn create next-app를 사용해서.

```js
yarn create next-app
```

프로젝트 구성을 위해 다음 설정을 사용했어요. tailwind를 스타일링에 선택하고 코드를 정리하기 위해 src 디렉토리를 사용했어요.

![이미지](/assets/img/2024-05-14-HowtosendmailtousersdirectlyfromNextjsusingResend_1.png)



## 연락 양식 만들기

간결하게 유지하려고 하며 이름과 이메일을 요청하는 연락 양식을 만들겠습니다.

다음과 같이 index.js 페이지 컴포넌트를 업데이트 해보세요:

```js
import { useState } from "react";
import Head from "next/head";

export default function Home() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
      console.log("여기에 API 호출하기")
    }
    return (
        <main
            className={`flex flex-col items-center p-24 min-h-screen`}
        >
            <Head>
                <title>Contact Me | Coffeed</title>
            </Head>

            <div className="relative flex flex-col gap-4 ">
                <div className="flex flex-col place-items-center gap-4">
                    <h1 className={`m-0 text-center text-3xl`}>연락하기</h1>
                </div>
                <form
                    className="mt-6 flex flex-col max-w-xl gap-4 z-10"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="name" className="sr-only">
                        이름
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        className="rounded-md bg-white/5 px-3.5 py-2.5 text-white ring-1 ring-inset focus:ring-blue-600 text-sm md:w-96"
                        placeholder="이름"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="email-address" className="sr-only">
                        이메일 주소
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        className="rounded-md bg-white/5 px-3.5 py-2.5 text-white ring-1 ring-inset focus:ring-blue-600 text-sm md:w-96"
                        placeholder="이메일"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="flex justify-center rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                    >
                        {loading ? (
                            <div
                                style={
                                    borderTopColor: "transparent",
                                }
                                className="w-6 h-6 border-4 border-white border-solid rounded-full animate-spin"
                            ></div>
                        ) : (
                            "제출"
                        )}
                    </button>
                </form>
            </div>
        </main>
    );
}
```



테일윈드를 사용하여 스타일을 입히고 사용자로부터 이름과 이메일을 받는 간단한 양식을 만들었습니다. 양식을 제출할 때 Send Mail API 호출을 트리거합니다.

다음 단계를 진행하기 위해 Next.js에서 Resend 및 필수 API를 설정해봅시다.

# Resend로 시작하기

resend.com으로 이동하여 계정에 로그인하세요. 이메일이나 Github를 사용하여 새로운 계정을 만들 수 있습니다.



Resend는 플랫폼에서 도메인을 소유하고 확인한 경우에만 사용자에게 이메일을 보낼 수 있습니다. 이를 통해 해당 도메인 이름을 사용하여 어떤 이메일 주소에서든 이메일을 보낼 수 있습니다. 예를 들어, noreply@coffeed.com에서 사용자에게 이메일을 보내려면 coffeed.com 도메인을 Resend에 추가한 다음 해당 도메인 이름 레코드를 추가하여 해당 도메인을 소유하고 있는 것을 확인해야 합니다.

## 도메인 추가

도메인을 추가하려면 도메인으로 이동한 다음 도메인 추가를 클릭하세요.

![도메인 추가](/assets/img/2024-05-14-HowtosendmailtousersdirectlyfromNextjsusingResend_2.png)



도메인 이름을 입력하고 지역을 선택해주세요. 기본값인 "us-east-1"은 무료이며 저희가 사용하는 용도에 적합합니다.

![도메인 설정](/assets/img/2024-05-14-HowtosendmailtousersdirectlyfromNextjsusingResend_3.png)

도메인을 추가하면 DNS 레코드 세트가 표시되며, 해당 레코드들을 도메인 서비스 제공업체에서 업데이트해야 합니다. MX 및 2개의 TXT 레코드를 DNS에 추가한 후에 "DNS 레코드 확인"을 클릭하여 도메인을 확인할 수 있습니다.

![DNS 레코드 확인](/assets/img/2024-05-14-HowtosendmailtousersdirectlyfromNextjsusingResend_4.png)



도메인을 확인하는 것은 이메일 전달성을 보장하는 데 필수적입니다. 한 번 도메인을 확인하면 이메일을 보낼 수 있는 권한이 부여됩니다.

## API 키 생성

API 키는 요청을 인증하는 비밀 토큰입니다.

- 사이드바의 API 키로 이동합니다.
- API 키 생성을 클릭합니다.
- API 키에 이름을 지정합니다.
- 허가로 보내기 액세스를 선택하고 액세스를 제한하려는 특정 도메인을 선택하세요.



<img src="/assets/img/2024-05-14-HowtosendmailtousersdirectlyfromNextjsusingResend_5.png"/>

또한 "전체 액세스" 권한이 있지만 보안을 위해 단일 도메인에 제한된 "전송 액세스" 권한을 사용하는 것이 좋습니다. .env 파일에 생성된 이 API 키를 RESEND_API_KEY 변수로 추가하세요.

# Next.js 앱에 Resend 추가하기

이제 프로젝트로 돌아가서 Resend sdk 라이브러리를 추가해봅시다. 터미널에서 다음 명령을 실행하세요:



```js
yarn add resend
```

## 1. 이메일 템플릿 추가하기

먼저 src 폴더의 components 폴더에 새로운 이메일 템플릿 폴더를 만들어보세요. src/components/email/ 폴더에 contact-form.jsx라는 새로운 이메일 템플릿을 추가해주세요.

```js
export const EmailTemplate = ({
  name,
  email
}) => (
  <div>
    <p>안녕하세요 Kavya,</p>
    <p>
        {name}님이 웹사이트에서 연락 양식을 제출했습니다. 그들의
        이메일은 {email} 입니다!
    </p>
    <p>
        감사합니다,
        <br />
        Coffee
    </p>
  </div>
);
```



이메일 본문을 스타일링하기 위해 HTML을 사용하여 이름과 이메일을 입력할 수 있는 간단한 템플릿을 만들었습니다. React 컴포넌트로 구성된 이 템플릿을 보면 프로젝트에서 디자인한 React 컴포넌트를 사용하거나 수정할 수 있습니다.

## 2. 이메일을 보내는 API 생성하기

pages/api/ 디렉토리 아래에 send.js라는 API 파일을 생성하세요. 요청 본문에서 이름과 이메일을 가져와서 Resend 라이브러리의 sendEmail 함수를 호출하고 EmailTemplate과 함께 사용하세요.

```js
const resend = new Resend(process.env.RESEND_API_KEY);

const data = await resend.sendEmail({
    from: `${process.env.FROM_EMAIL}`,
    to: `${process.env.TO_EMAIL}`,
    subject: "🎉 연락 양식으로 새로운 제출이 도착했습니다!",
    html: "",
    react: EmailTemplate({ name, email })
});
```



다음 변수들은 .env 파일에 선언되어야 합니다:

- RESEND_API_KEY — Resend 관리자 섹션에서 생성된 API 키.
- FROM_EMAIL — 메일이 보내지는 이메일 주소. Resend 관리자에서 확인된 도메인으로부터 보내진 것으로 나타나야 합니다.
- TO_EMAIL — 메일이 전송될 이메일 주소. 이 경우에는 내 이메일 주소로 메일을 보내고 있습니다.

```js
import { EmailTemplate } from '../../components/email/contact-form';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async (req, res) => {
  try {
    const { name, email } = JSON.parse(req.body);

    const data = await resend.sendEmail({
        from: `${process.env.FROM_EMAIL}`,
        to: `${process.env.TO_EMAIL}`,
        subject: "🎉당신의 연락 양식으로의 새로운 제출!",
        html: "",
        react: EmailTemplate({ name, email })
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
  }
};
```

대신 제출된 이메일 주소로 설정하여 사용자에게 바로 이메일이 전송되도록 할 수도 있습니다.



## 3. 양식 제출 시 이메일 트리거

handleSubmit 함수를 만들고 이름과 이메일을 본문의 매개변수로 사용하여 이메일을 트리거할 수 있습니다.
```js
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (name == "" && email == "") {
        setLoading(false);
        alert("이름과 이메일을 모두 입력해주세요");
        return false;
    }

    await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify({ name, email }),
    })
        .then((res) => res.json())
        .then((data) => {
            setLoading(false);
            if (data && data.id) {
                alert(`${name}님, 관심 표현해 주셔서 감사합니다! 곧 연락 드리겠습니다!`);
                setName("");
                setEmail("");
            } else {
                alert("죄송합니다! 다시 시도해주세요.");
            }
        })
        .catch((err) => {
            setLoading(false);
            alert("우왕! 불행하게도 오류가 발생했습니다.");
        });
    return true;
};
```

이렇게 하면 Next.js 앱에 Resend 기능을 연결할 수 있습니다. 여기에 인덱스 페이지의 최종 코드가 있습니다:



```js
import { useState } from "react";
import Head from "next/head";

export default function Home() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        if (name == "" && email == "") {
            setLoading(false);
            alert("이름과 이메일 주소를 모두 입력해주세요!");
            return false;
        }

        await fetch("/api/send", {
            method: "POST",
            body: JSON.stringify({ name, email }),
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                if (data && data.id) {
                    alert(`${name}님, 저희에게 관심 가져주셔서 감사합니다! 곧 연락드리겠습니다!`);
                    setName("");
                    setEmail("");
                } else {
                    alert("죄송합니다! 다시 시도해주세요.");
                }
            })
            .catch((err) => {
                setLoading(false);
                alert("앗! 죄송하지만 오류가 발생했습니다.");
            });
        return true;
    };
    return (
        <main
            className={`flex flex-col items-center p-24 min-h-screen`}
       >
            <Head>
                <title>나에게 연락하기 | Coffeed</title>
            </Head>

            <div className="relative flex flex-col gap-4 ">
                <div className="flex flex-col place-items-center gap-4">
                    <h1 className={`m-0 text-center text-3xl`}>나에게 연락하기</h1>
                </div>
                <form
                    className="mt-6 flex flex-col max-w-xl gap-4 z-10"
                    onSubmit={handleSubmit}
                >
                    <label htmlFor="name" className="sr-only">
                        이름
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                       className="rounded-md bg-white/5 px-3.5 py-2.5 text-white ring-1 ring-inset focus:ring-blue-600 text-sm md:w-96"
                        placeholder="이름"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="email-address" className="sr-only">
                        이메일 주소
                    </label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        className="rounded-md bg-white/5 px-3.5 py-2.5 text-white ring-1 ring-inset focus:ring-blue-600 text-sm md:w-96"
                        placeholder="이메일"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="flex justify-center rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
                    >
                        {loading ? (
                            <div
                                style={{
                                    borderTopColor: "transparent",
                                }}
                                className="w-4 h-4 border-2 border-white border-solid rounded-full animate-spin"
                            ></div>
                        ) : (
                            "제출하기"
                        )}
                    </button>
                </form>
            </div>
        </main>
    );
}
```

양식을 제출하면 이메일이 .env 파일에 설정된 TO_EMAIL로 전송됩니다.

<img src="/assets/img/2024-05-14-HowtosendmailtousersdirectlyfromNextjsusingResend_6.png" />

이메일 API를 활용하여 다른 사용 사례에 통합하여 직접 알림을 받을 수도 있습니다.



Next.js playbook **Coffee** 팀에서 작업 중인 페이지입니다. 대기 목록에 추가하려면 coffee@coffeeinc.in으로 이메일을 보내주세요.