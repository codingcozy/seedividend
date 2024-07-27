---
title: "플라스크(Flask)에 웹소켓(Websockets) 적용하기"
description: ""
coverImage: "/assets/img/2024-05-01-PoweringFlaskwithWebsockets_0.png"
date: 2024-05-01 22:54
ogImage: 
  url: /assets/img/2024-05-01-PoweringFlaskwithWebsockets_0.png
tag: Tech
originalTitle: "Powering Flask with Websockets"
link: "https://medium.com/@chandan-sharma/powering-flask-with-websockets-ca9f5a097ad9"
---


플라스크는 파이썬으로 작은부터 중간 규모의 웹 애플리케이션을 개발하기에 우수한 마이크로 프레임워크입니다.

웹소켓은 서버와 클라이언트 간 데이터를 동시에 교환하는 강력한 기술로, 동적이며 실시간 데이터 업데이트가 필요한 웹 애플리케이션에 배포될 수 있습니다.

이 이야기에서 우리는 웹소켓을 플라스크에서 사용하여 어떻게 작동하는지 이해하고 웹소켓의 힘을 발휘할 것입니다! HTTP 연결에서 클라이언트(브라우저)는 서버에 요청을 보내고 응답을 기다린 후 받은 후에 연결이 닫힙니다. 클라이언트가 데이터를 추가로 필요할 경우(또는 더 많은 데이터가 필요한 경우), 새로운 요청(연결)을 다시 해야 합니다. 이것은 한 번에 한 당사자만 데이터를 보내고 받을 수 있는 반양방향 연결이라고도 합니다. 반면 웹소켓은 클라이언트와 서버가 동시에 데이터를 교환할 수 있는 전양방향 연결로, 클라이언트가 서버에 데이터를 요청할 필요가 없습니다. 연결은 열린 상태에서(긴 지속성) 유지되며 데이터가 구할 수 있는 즉시 클라이언트로 보내집니다.

지금까지 이론적인 이야기는 충분하니, 웹소켓의 마법을 보여줄 웹 애플리케이션을 만들어 보겠습니다. 우리는 리눅스 터미널에서 공개 DNS 서버 8.8.8.8을 사용하여 인터넷 연결을 확인하는 웹 애플리케이션을 만들 것입니다.

<div class="content-ad"></div>

```js
[test@flask ~]$ ping -c 5 8.8.8.8
8.8.8.8(8.8.8.8)로 5번의 패킷 전송 중:
64바이트 데이터 전송됨.
8.8.8.8에서 icmp_seq=1 ttl=117 time=12.7 ms
8.8.8.8에서 icmp_seq=2 ttl=117 time=12.8 ms
8.8.8.8에서 icmp_seq=3 ttl=117 time=12.9 ms
8.8.8.8에서 icmp_seq=4 ttl=117 time=15.1 ms
8.8.8.8에서 icmp_seq=5 ttl=117 time=12.4 ms
```

우리 Flask 웹 응용프로그램에 이를 게시하기 위해 웹소켓을 사용합시다.

## Flask 웹 응용프로그램에 이를 게시하기 위해 Python 가상 환경 만들기

```js
[test@flask ~]$ /usr/local/bin/python3.8 -m venv myvirtual
[test@flask ~]$ source myvirtual/bin/activate
(myvirtual) [test@flask ~]$ pip install Flask
```

<div class="content-ad"></div>

## Flask-SocketIO 설치하기

플라스크(Flask)에서 웹소켓을 사용하려면 Flask-SocketIO를 사용할 수 있어요. 공식 문서에 따르면 아래와 같이 설치할 수 있어요:

```js
(myvirtual) [test@flask ~]$ pip install flask-socketio
```

## Flask 어플리케이션 만들기

<div class="content-ad"></div>

가상 환경 내부에서 응용 프로그램을 보관할 수 있는 디렉토리를 만들어보세요. "flaskapp"이라는 디렉토리를 만들고, 그 안에 응용 프로그램 코드용 "myapp.py" 파일을 만들어보세요. 그리고 "flaskapp" 안에 "templates"라는 디렉토리도 만들어주세요. "templates" 안에 "base.html"이라는 파일을 만들어주세요. Flask 디렉토리 구조 전체는 아래와 같아야 해요:

/home/test/flaskapp  
|— myapp.py  
|— templates/  
|— — — base.html  

이제 "myapp.py" 파일로 아래 코드를 입력해보세요. 이 코드는 Linux 터미널에서 ping 명령을 실행할 때와 같이 웹소켓을 통해 ping 결과를 브라우저에 공개하는 응용 프로그램 코드입니다.

```js  
from flask import Flask,render_template,request
from flask_socketio import SocketIO, emit
import subprocess  

app = Flask(__name__)  
socketio = SocketIO(app,debug=True,cors_allowed_origins='*',async_mode='eventlet')  

@app.route('/home')  
def main():  
        return render_template('base.html')  

@socketio.on("my_event")  
def checkping():  
    for x in range(5):  
        cmd = 'ping -c 1 8.8.8.8|head -2|tail -1'  
        listing1 = subprocess.run(cmd,stdout=subprocess.PIPE,text=True,shell=True)  
        sid = request.sid  
        emit('server', {"data1":x, "data":listing1.stdout}, room=sid)  
        socketio.sleep(1)  
``` 

<div class="content-ad"></div>

위 코드에서는 우선 위에 설치한 flask 및 socketio 패키지에서 필요한 객체를 가져와서 응용 프로그램에서 사용할 인스턴스를 생성했습니다. "eventlet"으로 정의한 async_mode에 주목해주세요. SocketIO 설명서에 따르면, 설명된 비동기 서비스 중 하나를 사용해야 합니다. 우리는 eventlet을 사용하고 설치했습니다.

다음으로, 우리는 flask 루트(엔드포인트)를 /home으로 정의했습니다. 이는 "base.html"이라는 HTML 페이지를 렌더링합니다. 이것은 나중에 만들 것입니다.

이어서, 웹소켓 코드의 가장 흥미로운 부분이 나옵니다. 여기서 "my_event"라는 사용자 정의 이벤트를 정의했습니다. 이벤트는 서버와 클라이언트 간에 데이터를 교환하는 데 사용됩니다. 위 코드에서 서버는 클라이언트(브라우저)로부터 "my_event"라는 이벤트를 받으면 "checkping"이라는 함수인 이벤트 핸들러를 실행하여 소켓을 통해 클라이언트(브라우저)에게 핑 명령 결과를 다시 보냅니다. "server"라는 소켓io emit 이벤트를 사용합니다. 이벤트는 클라이언트와 서버 모두에서 사용할 수 있습니다. 따라서 전반적으로 우리는 for 루프를 사용하여 핑 명령을 5번 실행하고 실행되는 즉시 연속적인 출력을 클라이언트에게 돌려보내고 있습니다.

## Gunicorn 및 Nginx를 사용한 Flask 응용 프로그램 제공

<div class="content-ad"></div>

이제 우리 애플리케이션이 준비되었고 웹 서버를 배포할 시간입니다. 프로덕션 환경에 잘 맞는 Gunicorn + Nginx 조합을 사용할 것입니다.

```js
(myvirtual) [test@flask ~]$ pip install gunicorn

[test@flask ~]$ sudo yum install epel-release
[test@flask ~]$ sudo yum install nginx
```

nginx.conf 파일을 수정하여 아래 내용을 포함하고 꼭 서버의 IP 주소를 server_name 섹션에 입력해주세요.

```js
server {
    listen       80;
    listen       [::]:80;
    server_name  <IP-Address>;

    location / {
       include proxy_params;
       proxy_pass http://127.0.0.1:5000;
    }

    location /socket.io {
       proxy_pass http://127.0.0.1:5000/socket.io;
       proxy_redirect off;
       proxy_buffering off;
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "Upgrade";
       proxy_hide_header Access-Control-Allow-Origin;
    }
}
```

<div class="content-ad"></div>

또한, 아래 내용으로 /etc/nginx/ 디렉토리 아래에 "proxy_params" 파일을 생성해주세요.

```js
proxy_set_header Host $http_host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Forwarded-Proto $scheme;
```

다음으로, Flask 애플리케이션을 위한 Linux systemd 서비스를 생성하여 Linux systemctl 명령어를 사용하여 애플리케이션을 시작하거나 중지할 수 있도록 해주세요. 또한 이 방법을 통해 서버 재부팅 시에 자동으로 Flask 애플리케이션이 시작되도록 할 수 있습니다.

아래 내용으로 /etc/systemd/system/ 디렉토리 아래에 "myapp.service" 파일을 생성해주세요.

<div class="content-ad"></div>

```js
[Unit]
Description=Gunicorn 인스턴스를 통해 Flask를 제공합니다.
After=network.target

[Service]
User=test
WorkingDirectory=/home/test/flaskapp/
ExecStart=/home/test/myvirtual/bin/gunicorn --worker-class eventlet -w 1 myapp:app --bind 0.0.0.0:5000
Restart=always

[Install]
WantedBy=multi-user.target
```

## Flask 응용 프로그램을 위한 HTML 페이지 만들기

위의 Flask 응용 프로그램 디렉토리 구조에서 "templates" 폴더와 "base.html" 파일을 생성했습니다. 이 파일은 브라우저를 http://`서버-IP`/home으로 가리킬 때 렌더링됩니다.

이는 서버가 보낸 핑 결과를 보는 데 사용되는 응용 프로그램에 의해 제공되는 페이지입니다.

<div class="content-ad"></div>

"base.html" 파일 안에 아래 내용을 추가해 주세요.

```js
<!DOCTYPE html>
<html lang="en">
  <head>
<meta http-equiv="Cache-control" content="no-cache" charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/3.0.4/socket.io.js" integrity="sha512-aMGMvNYu8Ue4G+fHa359jcPb1u+ytAF+P2SCb+PxrjCdO3n3ZTxJ30zuH39rimUggmTwmh2u7wvQsDTHESnmfQ==" crossorigin="anonymous"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script type="text/javascript" src="//code.jquery.com/jquery-1.4.2.min.js"></script>
<style>
.navbar-brand {
font-family: 'Merriweather';
font-size: 30px;
}
.inner {
text-align: center;
margin: auto;
margin-top: 10px;
padding: 10px;
border-style: solid;
width: 50%;
color: black;

}
</style>
</head>

<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
   <a class="navbar-brand" href={ url_for('main') }>Flask</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  </div>
</nav>
<div class="container">
<div class="inner">
 <div id="header"></div><br>
<button class="btn btn-primary" id="checkbutton" onClick="myupdate()">제출</button>
<div id="demo"></div>
</div>
</div>
<script>
        const socket = io(); //socketio connection to server//
        $(document).ready(function() {
 });
socket.on("connect", () => {
 console.log("connected");
        document.getElementById("header").innerHTML = "<h3>" + "Websocket Connected" + "</h3";


});

socket.on("disconnect", () => {
 console.log("disconnected");
        document.getElementById("header").innerHTML = "<h3>" + "Websocket Disconnected" + "</h3>";
});

function myupdate() {
  //Event sent by Client
 socket.emit("my_event", function() {
 });
}

// Event sent by Server//
socket.on("server", function(msg) {
        let myvar = JSON.parse(msg.data1);
        //Check if entire data is sent by server//
        if (myvar == "4") {
                document.getElementById("demo").innerHTML = "";
                document.querySelector('#checkbutton').innerText = "Submit";
                document.getElementById("checkbutton").style.cursor = "pointer";
                document.getElementById("checkbutton").disabled = false;
                document.getElementById("checkbutton").className = "btn btn-primary";
 
        }

        else {
                document.getElementById("demo").innerHTML += msg.data + "<br>";
                document.getElementById("checkbutton').disabled = true;
                document.getElementById("checkbutton').innerHTML = "로딩 중..";
                document.getElementById("checkbutton').style.cursor = "not-allowed";
                document.getElementById("checkbutton').style.pointerEvents = "auto";
        }
});

</script>
</body>
</html>
```

위의 HTML에서 가장 중요한 부분은 소켓IO 이벤트 핸들러(connect, disconnect, my_event 및 server)입니다. 이 네 가지 이벤트가 사용되고 있습니다. 자세한 정보는 여기에서 확인할 수 있습니다. 소켓IO 연결 및 해제 이벤트는 WebSocket 연결 및 연결해제에 대한 내장 이벤트입니다. 다른 두 이벤트인 "my_event" 및 "server"은 사용자 정의된 이벤트입니다. "my_event" 이벤트는 클라이언트에서 서버로 데이터를 보내기 위해 사용됩니다(그러나 여기서는 실제로 데이터를 서버로 보내지는 않으나 버튼 클릭 이벤트를 트리거하기 위해 사용됩니다). 버튼 클릭은 "myupdate"라는 함수를 실행하며, 이 함수는 서버로 데이터를 전달하는 "my_event" 이벤트를 생성합니다. 이 "my_event"는 서버(Flask 어플리케이션)에서 받아지고 ping 결과를 처리하고 결과를 송수신 이벤트인 "server"를 사용하여 결과를 전송합니다(이것은 사용자 정의 이름일 수 있습니다). 클라이언트는 Flask 애플리케이션에서 보낸 이벤트인 "server"를 잡아서 ping 결과를 웹 페이지에 표시합니다.

위의 Flask 어플리케이션 코드에서 클라이언트로 for 루프 실행(루프가 실행된 횟수)을 "data1"로 보내고 있음을 기억하세요. 루프가 실제로 완료되었는지 확인하기 위해 루프가 몇 번 실행되었는지 확인합니다(따라서 서버에서 클라이언트로 완전한 ping 데이터가 전송되었는지 확인합니다). Python For Loop에서는 0부터 4까지로 계산되므로, 5회차가 완료되면 루프가 정말로 완료되었는지 확인하게 됩니다. 따라서 4번째 반복이 완료되면, 서버로부터 클라이언트로 완전한 데이터가 전송된 것입니다. 우리는 이 확인을 위하여 HTML 코드에서 데이터가 여전히 수신 중인지를 확인합니다. 데이터가 여전히 수신 중이라면, 버튼 클릭을 비활성화합니다. 완전한 데이터를 받으면, 버튼이 다시 활성화됩니다.

<div class="content-ad"></div>

## Flask 애플리케이션 시작하기

```js
(myvirtual) [test@flask ~]$ sudo systemctl enable myapp.service 
(myvirtual) [test@flask ~]$ sudo systemctl start myapp.service
```

브라우저를 열고 http://`server-ip`/home을 방문하여 애플리케이션을 확인해보세요. 만약 아래와 같이 보여져야 합니다. 플라스크 애플리케이션을 중지해보세요(sudo systemctl stop myapp.service), 그러면 웹페이지에 "Websocket Disconnected" 메시지가 표시됩니다.

![웹소켓과 함께 플라스크 활용하기](/assets/img/2024-05-01-PoweringFlaskwithWebsockets_0.png)

<div class="content-ad"></div>

브라우저로 전송된 실시간 핑 결과를 확인하려면 "제출" 버튼을 클릭하세요!

여기까지입니다! 웹소켓을 사용하여 웹 애플리케이션을 구축하는 것은 시작에 불과합니다.

![image](https://miro.medium.com/v2/resize:fit:1400/1*dGtF5scLDyMycFVN6wXzbw.gif)