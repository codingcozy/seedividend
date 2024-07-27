---
title: "리액트와 ASPNet Core 웹 API를 사용한 Full Stack CRUD 애플리케이션 개발하기"
description: ""
coverImage: "/assets/img/2024-05-14-CreatingFullStackCrudApplicationusingReactwithASPNetCoreWebAPI_0.png"
date: 2024-05-14 10:58
ogImage: 
  url: /assets/img/2024-05-14-CreatingFullStackCrudApplicationusingReactwithASPNetCoreWebAPI_0.png
tag: Tech
originalTitle: "Creating Full Stack Crud Application using React with ASP.Net Core Web API"
link: "https://medium.com/@divanimanarandi/creating-full-stack-crud-application-using-react-with-asp-net-core-web-api-0f9ad0b3897c"
---


리액트를 사용하여 ASP.NET Core 웹 API와 함께 전체 스택 CRUD 애플리케이션을 만드는 것은 강력한 방법입니다. 견고하고 효율적인 웹 애플리케이션을 개발하는 데 도움이 됩니다. 이 안내서에서는 CRUD 작업의 기본 원리를 탐구하고 React 프론트엔드와 ASP.NET Core 웹 API 백엔드를 설정하고 연결하는 단계별 프로세스를 살펴볼 것입니다. 각 계층의 복잡성과 상호 작용을 이해하여 개발자는 확장 가능하고 효율적인 전체 스택 애플리케이션을 구축하는 데 능숙해질 수 있습니다.

# 전체 스택 CRUD 애플리케이션 소개

전체 스택 CRUD (생성, 읽기, 업데이트, 삭제) 애플리케이션을 만드는 것은 프론트엔드와 백엔드 구성 요소 모두를 데이터베이스와 상호 작용하도록 구축하는 것을 포함합니다. 이를 통해 사용자는 기본적인 데이터베이스 작업을 원활하게 수행할 수 있습니다.

# CRUD 작업 이해



데이터베이스 작업시 사용되는 기본 작업은 CRUD 연산입니다. Create는 새 데이터를 추가하고, Read는 기존 데이터를 검색하며, Update는 데이터를 수정하고, Delete는 데이터를 삭제합니다. 이러한 작업들은 상호 작용하는 애플리케이션의 기본을 형성합니다.

ASP.Net Core Web API 백엔드 개발

ASP.Net Core Web API를 사용하여 백엔드를 구축하는 것은 데이터 작업을 처리하고 프론트엔드 애플리케이션과 상호 작용하는 견고한 기반을 만드는 것을 의미합니다.

먼저 시작하기 위해 먼저 Visual Studio에서 필요한 종속성을 설치해야 합니다. 이를 위해 Tools-`NuGet Package Manager-` Manage Nuget Packages for solution로 이동해야 합니다.




![이미지](/assets/img/2024-05-14-CreatingFullStackCrudApplicationusingReactwithASPNetCoreWebAPI_0.png)


그러고 나서 이 패키지들을 모두 설치하세요,

- Microsoft.EntityFrameworkCore.Design
- Microsoft.EntityFrameworkCore.SqlServer
- Microsoft.EntityFrameworkCore.Tools
- Newtonsoft.Json


![이미지](/assets/img/2024-05-14-CreatingFullStackCrudApplicationusingReactwithASPNetCoreWebAPI_1.png)




첫 번째 단계로 모델 폴더를 선택한 후에 마우스 오른쪽 단추를 클릭하여 Student.cs 클래스를 만드세요.

## Student.cs

```js
using System.ComponentModel.DataAnnotations;

namespace ReactASPCrud.Models
{
    public class Student
    {

    [Key] // 이것을 추가한 후에 위 라이브러리(DataAnnotations)가 자동으로 작성됩니다.
    public int id { get; set; }
    public string stname { get; set; }

    public string course { get; set; }

    }
}
```

## StudentDbContext.cs



```cs
using Microsoft.EntityFrameworkCore;

namespace ReactASPCrud.Models
{
    public class StudentDbContext : DbContext
    {

        public StudentDbContext(DbContextOptions<StudentDbContext> options) : base(options) 
        {
        
        }
    
        public DbSet<Student> Students { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Data Source=.; initial Catalog=lbs;User Id=test; password=123; TrustServerCertificate= True");
        }

    }
}
```

이곳에 SQL 인증을 추가하는 대신, 위의 OnConfiguring 메소드에 아래 코드를 사용하여 Windows 인증을 적용할 수 있습니다. (여기서는 id, password를 추가할 필요가 없습니다)

![이미지](/assets/img/2024-05-14-CreatingFullStackCrudApplicationusingReactwithASPNetCoreWebAPI_2.png)

```js
Data Source=DIVANI\SQLEXPRESS;Database=lbs;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False
```



- 데이터 원본 = DIVANI\SQLEXPRESS: 서버 이름 또는 IP 주소.
- 데이터베이스 = lbs: 데이터베이스의 이름.
- 통합 보안 = True: Windows 인증을 사용하여 연결을 인증하는 것을 나타냅니다.
- 연결 제한 시간 = 30: 연결 제한 시간(초).
- 암호화 = False: 암호화 비활성화.
- 서버 인증서 신뢰 = False: 서버 인증서 신뢰.
- 애플리케이션 의도 = ReadWrite: 읽기 및 쓰기 작업을 위한 의도.
- 멀티 서브넷 장애 조치 = False: 멀티 서브넷 장애 조치 설정. 이 설정은 클라이언트가 더 나은 오류 허용성을 위해 여러 서브넷을 통해 데이터베이스에 연결할 수 있게 합니다.

데이터베이스 연결 설정하기

다음 내용을 Program.cs 파일에 추가합니다.

```js
builder.Services.AddDbContext<StudentDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("StudentDbContext")));
```

웹 API에 이 권한을 허용하도록 설정하기

```js
app.UseCors(policy => policy.AllowAnyHeader()
.AllowAnyMethod()
.SetIsOriginAllowed(origin => true)
.AllowCredentials());
```



테이블 태그를 Markdown 형식으로 변경하세요.


| Header1 | Header2 | Header3 |
| ------- | ------- | ------- |
| Data1   | Data2   | Data3   |
| Data4   | Data5   | Data6   |


이제 위의 코드를 Program.cs 파일 내 어디에 붙여넣어야 하는지 알려줄 거에요.

```js
using Microsoft.EntityFrameworkCore;
using ReactAspCrud.Models;

var builder = WebApplication.CreateBuilder(args);

// 컨테이너에 서비스 추가.

builder.Services.AddControllers();
// 더 자세한 Swagger/OpenAPI 구성 방법은 https://aka.ms/aspnetcore/swashbuckle에서 확인하세요.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<StudentDbContext>(options =>
   options.UseSqlServer(builder.Configuration.GetConnectionString("StudentDbContext")));

var app = builder.Build();
app.UseCors(policy => policy.AllowAnyHeader()
                            .AllowAnyMethod()
                            .SetIsOriginAllowed(origin => true)
                            .AllowCredentials());

// HTTP 요청 파이프라인 구성.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
```

이제 appsettings.json 파일에 연결 문자열을 추가하세요.

```json
{
  "ConnectionStrings": {
    "StudentDbContext": "Data Source=DIVANI\SQLEXPRESS;Database=lbs;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"
  }
}
```



그 후에 도구-`NuGet 패키지 관리자-`패키지 관리자 콘솔로 이동하여 아래 명령어를 추가하십시오:

![이미지](/assets/img/2024-05-14-CreatingFullStackCrudApplicationusingReactwithASPNetCoreWebAPI_3.png)

add-migration initial

update-database



마이그레이션 파일을 생성하고 나서 데이터베이스가 만들어졌습니다. SQL Server를 열어서 데이터베이스가 생성되었는지 확인해보세요. 동시에 프로젝트에 마이그레이션 폴더가 생성되어 있습니다. 해당 폴더를 확인할 수 있습니다.

이제 SQL Server를 통해 추가되었는지 확인할 수 있습니다.

![이미지 1](/assets/img/2024-05-14-CreatingFullStackCrudApplicationusingReactwithASPNetCoreWebAPI_4.png)

![이미지 2](/assets/img/2024-05-14-CreatingFullStackCrudApplicationusingReactwithASPNetCoreWebAPI_5.png)



이후에 Controller 폴더를 선택하고 Web API로 Student Controller를 생성하세요.

![이미지1](/assets/img/2024-05-14-CreatingFullStackCrudApplicationusingReactwithASPNetCoreWebAPI_6.png)

![이미지2](/assets/img/2024-05-14-CreatingFullStackCrudApplicationusingReactwithASPNetCoreWebAPI_7.png)

![이미지3](/assets/img/2024-05-14-CreatingFullStackCrudApplicationusingReactwithASPNetCoreWebAPI_8.png)



이제 StudentController.cs 파일에 API를 만들어야 합니다.

여기서 API 내에서 CRUD 작업을 처리하기 위한 엔드포인트를 생성할 것입니다. POST, GET, PUT 및 DELETE와 같은 HTTP 동사를 사용하여 데이터를 생성, 읽기, 업데이트 및 삭제하는 메서드를 구현할 것입니다.

## StudentController.cs

```csharp
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactAspCrud.Models;

namespace ReactAspCrud.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentDbContext _studentDbContext;

        public StudentController(StudentDbContext studentDbContext)
        {
            _studentDbContext = studentDbContext;
        }

        [HttpGet]
        [Route("GetStudent")]
        public async Task<IEnumerable<Student>> GetStudents()
        {
            return await _studentDbContext.Student.ToListAsync();
        }

        [HttpPost]
        [Route("AddStudent")]
        public async Task<Student> AddStudent(Student objStudent)
        {
            _studentDbContext.Student.Add(objStudent);
            await _studentDbContext.SaveChangesAsync();
            return objStudent;
        }

        [HttpPatch]
        [Route("UpdateStudent/{id}")]
        public async Task<Student> UpdateStudent(Student objStudent)
        {
            _studentDbContext.Entry(objStudent).State= EntityState.Modified;
            await _studentDbContext.SaveChangesAsync();
            return objStudent;
        }

        [HttpDelete]
        [Route("DeleteStudent/{id}")]
        public bool DeleteStudent(int id) 
        {
            bool a = false;
            var student = _studentDbContext.Student.Find(id);
            if (student != null)
            {
                a = true;
                _studentDbContext.Entry(student).State= EntityState.Deleted;
                _studentDbContext.SaveChanges();
            }
            else
            {
                a = false;
            }
            return a;
        }
    }
}
```



프로그램을 실행한 후 Swagger를 통해 확인할 수 있어요.

![이미지](/assets/img/2024-05-14-CreatingFullStackCrudApplicationusingReactwithASPNetCoreWebAPI_9.png)

값을 실행하여 각 API 컨트롤러가 작동하는지 확인하세요.

# 어플리케이션을 위한 React Frontend 설정



이제 백엔드 개발 부분을 이미 마무리했군요.

이제 프론트엔드 개발 부분으로 넘어가 볼까요?

먼저, 관련 경로 내에서 React 앱을 생성해야 합니다.

![React app 생성](/assets/img/2024-05-14-CreatingFullStackCrudApplicationusingReactwithASPNetCoreWebAPI_10.png)



그럼 명령 프롬프트에 다음 명령을 입력해야 해요:

npx create-react-app my-app
cd my-app

React 프로젝트를 VS code 편집기에서 열고 React 앱을 실행하려면 이 명령을 추가하세요,

code .
npm start



이제 React 환영 페이지를 보실 수 있습니다.

그 후 다음 명령어를 입력하여 Bootstrap을 설치하십시오.

npm i bootstrap

그 후 다음 명령어를 입력하여 axios를 설치하십시오.



npm i axios

VS code에서 프로젝트를 열고 아래 코드를 추가하세요,

## App.js

```js
import './App.css';
import StudentCrud from './components/StudentCrud';

function App() {
  return (
    <div>
      <StudentCrud/>
    </div>
  );
}

export default App;
```



새 폴더(components)를 만든 후, 그 안에 StudentCrud.js 파일을 생성하고 아래 코드를 추가해주세요.

<img src="/assets/img/2024-05-14-CreatingFullStackCrudApplicationusingReactwithASPNetCoreWebAPI_11.png" />

## StudentCrud.js

```js
import axios from "axios";
import { useEffect, useState } from "react";

function StudentCrud(){

const [id, setId] = useState("");
const [stname, setName] = useState("");
const [course, setCourse] = useState("");
const [students, setUsers] = useState([]);

  useEffect(() => {
    (async () => await Load())();
  }, []);

  async function Load() {

    const result = await axios.get("https://localhost:7135/api/Student/GetStudent");
    setUsers(result.data);
    console.log(result.data);
  }

  async function save(event) {

    event.preventDefault();
    try {
      await axios.post("https://localhost:7135/api/Student/AddStudent", {

        stname: stname,
        course: course,

      });
      alert("학생 등록 성공");
          setId("");
          setName("");
          setCourse("");


      Load();
    } catch (err) {
      alert(err);
    }
  }
  async function editStudent(students) {
    setName(students.stname);
    setCourse(students.course);


    setId(students.id);
  }

  async function DeleteStudent(id) {

  await axios.delete("https://localhost:7135/api/Student/UpdateStudent/" + id);
  alert("학생이 성공적으로 삭제되었습니다");
  setId("");
  setName("");
  setCourse("");
  Load();
  }

  async function update(event) {
    event.preventDefault();
    try {
      //this is API handling the path
  await axios.patch("https://localhost:7135/api/Student/UpdateStudent/"+ students.find((u) => u.id === id).id || id,
        {
        id: id,
        stname: stname,
        course: course,
        }
      );
      alert("등록이 업데이트되었습니다");
      setId("");
      setName("");
      setCourse("");

      Load();
    } catch (err) {
      alert(err);
    }
  }


return(
 //student form
<div>
<h1>학생 세부 정보</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">

            <input
              type="text"
              class="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }
            />
            <label>학생 이름</label>
            <input
              type="text"
              class="form-control"
              id="stname"
              value={stname}
              onChange={(event) => {
                setName(event.target.value);
              }
            />
          </div>
          <div class="form-group">
            <label>과정</label>
            <input
              type="text"
              class="form-control"
              id="course"
              value={course}
              onChange={(event) => {
                setCourse(event.target.value);
              }
            />
          </div>
          <div>
            <button class="btn btn-primary mt-4" onClick={save}>
              등록
            </button>
            <button class="btn btn-warning mt-4" onClick={update}>
              업데이트
            </button>
          </div>
        </form>
      </div>
      <br></br>


      <table class="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">학생 아이디</th>
            <th scope="col">학생 이름</th>
            <th scope="col">과정</th>

            <th scope="col">옵션</th>
          </tr>
        </thead>
        {students.map(function fn(student) {
          return (
            <tbody>
              <tr>
                <th scope="row">{student.id} </th>
                <td>{student.stname}</td>
                <td>{student.course}</td>

                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editStudent(student)}
                  >
                    편집
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => DeleteStudent(student.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
</div>
);
}

export default StudentCrud;
```



프론트엔드와 백엔드 간 통신 수립하기
React 프론트엔드와 ASP.Net Core 웹 API 백엔드가 준비되었습니다. 이제 이들끼리 소통할 시간이에요. 이 디지털 소개팅을 설정하고 둘 사이에 원활한 통신 경로를 수립해봅시다.

React 컴포넌트에서 API 엔드포인트 사용하기
React 컴포넌트들은 마치 만물뷔페에서 배고픈 십대처럼, ASP.Net Core 웹 API에서 제공하는 API 엔드포인트를 소비하기를 열망하고 있습니다. 백엔드에서 데이터를 컴포넌트에 공급하는 방법을 배워서 UI를 기쁘게 춤추게 해보세요.

![이미지](/assets/img/2024-05-14-CreatingFullStackCrudApplicationusingReactwithASPNetCoreWebAPI_12.png)

따라서 백엔드 코드를 실행한 후, StudentCrud.js 파일의 해당 위치에 각 웹 API 규칙에 대한 요청 URL을 추가하세요.



![이미지](/assets/img/2024-05-14-CreatingFullStackCrudApplicationusingReactwithASPNetCoreWebAPI_13.png)

데이터 응답 및 오류 처리
가끔 데이터가 마치 부드러운 시냇물처럼 매끈하게 흘러들어오지만, 때로는 오류가 예기치 못하게 파티에 뜬금 없이 나타나는 손님처럼 발생하기도 합니다. 전문가처럼 데이터 응답을 우아하게 처리하고 문제를 해결하는 방법을 발견하여 응용 프로그램이 매끈하게 실행되도록 유지해보세요.

# 전체 스택 CRUD 애플리케이션 테스트 및 디버깅

React 컴포넌트의 유닛 테스트
우리의 React 컴포넌트를 현미경 아래 두고 연구실 쥐처럼 테스트해보겠습니다(하지만 더 정성을 다하면서요). 각 컴포넌트가 훌륭하게 역할을 수행하고 그 귀찮은 버그를 피하여 사용자 경험을 망가뜨리는 일을 방지하는 방법을 배워보세요.



API 엔드포인트의 통합 테스트
탐정 모자를 살 때입니다. API 엔드포인트의 동작을 조사해보세요. 통합 테스트를 통해 백엔드 서비스가 정확히 응답하고 프론트엔드와 잘 작동하는지 확인할 수 있습니다. 셜록 홈즈가 자랑스러워할 것입니다.

크로스 플랫폼 문제 해결
크로스 플랫폼 개발의 기쁨입니다. 다양한 브라우저에서 다양한 디바이스로, 이러한 문제를 해결하고 디버그하는 방법을 탐색해보세요. 이 문제들은 어플리케이션이 이상하게 작동하게 할 수 있습니다.

# 배포 및 유지보수 고려 사항

배포를 위한 애플리케이션 준비
쇼타임입니다! 풀 스택 CRUD 애플리케이션을 인터넷의 넓은 세계에 배포하기 위한 필수 단계를 배워보세요. 설정에서 최적화까지, 앱을 큰 무대에서 빛나게 할 준비를 해보세요.



애플리케이션 확장 전략
애플리케이션이 인기를 얻게 되면 확장이 매우 중요해집니다. 전체 스택 애플리케이션을 효율적으로 확장할 수 있는 전략을 알아보세요. 이를 통해 향후 증가하는 트래픽을 처리하고 최적 성능을 유지할 수 있습니다. 디지털 성장 분기점을 대비하는 것으로 생각해보세요.

모니터링 및 유지보수 최고의 실천법
애플리케이션이 러브 상태가 되면 일은 끝나지 않습니다. 애플리케이션 성능을 모니터링하고 사용자 행동을 추적하며 유지보수 루틴을 실행하는 최고의 실천법을 살펴보세요. 모든 것이 원활히 작동되도록 하기 위해 앱에 정기적인 건강 진단을 하는 느낌이죠.

결론적으로, ASP.Net Core Web API를 사용한 React를 이용한 Full Stack CRUD 애플리케이션 작성에 숙달하면 다재다능하고 반응 좋은 웹 애플리케이션을 개발하고자 하는 개발자들에게 다양한 기회를 제공해줍니다. 이 기사에서 제시된 지침을 따르면 두 기술의 장점을 활용하여 사용자 경험을 원활하게 만들고 프로젝트에서 혁신을 이끌어낼 수 있습니다. 풀 스택 개발의 잠재력을 받아들이고 늘 새로운 방법을 탐구하여 기술을 향상시키고 디지털 환경의 변화하는 경험을 만들어보세요.

# FAQ

# 1. 풀 스택 CRUD 애플리케이션이란 무엇인가요?



풀 스택 CRUD 애플리케이션은 프론트엔드 및 백엔드 기술을 이용하여 데이터를 생성, 읽기, 업데이트 및 삭제하는 웹 애플리케이션입니다. 일반적으로 사용자 인터페이스를 위한 프론트엔드 프레임워크와 데이터 및 비즈니스 로직을 관리하는 백엔드 시스템으로 구성됩니다.

## 2. 이 안내를 따르려면 React 및 ASP.Net Core 이전 경험이 필요한가요?

React와 ASP.Net Core의 이전 경험이 도움이 될 수 있지만, 이 안내서는 초보자를 위한 단계별 접근 방식을 제공하도록 구성되어 있습니다. JavaScript와 C#의 기본 지식이 도움이 될 것이나, 설명과 코드 샘플은 모든 개발자 수준에게 접근하기 쉽도록 하고 있습니다.

## 3. 완료 후 풀 스택 CRUD 애플리케이션을 어떻게 배포할 수 있나요?



애플리케이션을 배포하는 것은 프론트엔드와 백엔드 구성 요소를 서버에 호스팅하는 과정을 말합니다. React 프론트엔드의 경우, Netlify 또는 Vercel과 같은 플랫폼에 배포할 수 있습니다. ASP.Net Core Web API 백엔드는 Azure, AWS 또는 온프레미스 서버와 같은 서비스에 호스팅할 수 있습니다. 호스팅 환경에 따라 배포 과정이 달라질 수 있습니다.

# 4. 최고의 API 문서 작성 도구는 무엇인가요?

- Swagger
- Postman
- Readme
- Stoplight
- Redocly
- Document360