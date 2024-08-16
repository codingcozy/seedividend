---
title: "Angular에서 Web Sockets 구현하는 방법 가이드"
description: ""
coverImage: "/assets/img/2024-06-22-GuidetoimplementWebSocketsinAngular_0.png"
date: 2024-06-22 03:39
ogImage: 
  url: /assets/img/2024-06-22-GuidetoimplementWebSocketsinAngular_0.png
tag: Tech
originalTitle: "Guide to implement Web Sockets in Angular"
link: "https://medium.com/@shubhsalunkhe4199/guide-to-implement-web-sockets-in-angular-d8ce2b01abd4"
isUpdated: true
---




## 소개:

웹 개발은 진화 중이며 실시간 애플리케이션은 사용자에게 즉각적인 업데이트를 제공하는 능력으로 인해 인기를 얻고 있습니다. 웹 소켓은 강력한 기술로, 클라이언트와 서버 간 실시간 통신을 가능하게 합니다. 이 자습서에서는 Angular 애플리케이션에 웹 소켓을 통합하여 실시간 상호작용을 원활하게 할 것입니다.

Angular에서는 ngx-socket-io를 사용하여 웹 소켓 연결을 만들어 Angular 앱에 웹 소켓 기능을 추가하는 것이 더 쉬워집니다.

## Angular 애플리케이션에서 웹 소켓 사용 방법:

<div class="content-ad"></div>

## 1. 설치 :

NPM을 사용하여 Socket.IO를 프로젝트에 추가하려면 터미널이나 명령 프롬프트에서 다음 명령을 입력하면 됩니다:
// npm으로 설치하기
npm install socket.io

// yarn으로 설치하기
yarn add socket.io

## 2. 웹 소켓 서비스 생성하기:

<div class="content-ad"></div>

```js
// web-socket.service.ts

import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
 providedIn: 'root',
})
export class WebSocketService {
 private webSocket: Socket;

 constructor() {
  this.webSocket = new Socket({
   url: "https://exampleUrl.com",
   options: {},
  });
 }

 // This method is used to start the connection/handshake of the socket with the server
 connectSocket(message) {
  this.webSocket.emit('connect', message);
 }

 // This method is used to receive a response from the server
 receiveStatus() {
  return this.webSocket.fromEvent('/get-response');
 }

 // This method is used to end the web socket connection
 disconnectSocket() {
  this.webSocket.disconnect();
 }
}
```

## 3. Using Web-socket Service in an Angular Component:

```js
// my-component.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebSocketService } from './websocket.service';

@Component({
 selector: 'app-my-component',
 templateUrl: './my-component.component.html',
 styleUrls: ['./my-component.component.css'],
})
export class MyComponentComponent implements OnInit, OnDestroy {
 constructor(private webSocketService: WebSocketService) { }

 ngOnInit(): void {
  this.initializeSocketConnection();
 }

 ngOnDestroy() {
  this.disconnectSocket();
 }

 // Initializes the socket connection
 initializeSocketConnection() {
  this.webSocketService.connectSocket('message');
 }

 // Receives a response from the socket connection
 receiveSocketResponse() {
  this.webSocketService.receiveStatus().subscribe((receivedMessage: string) => {
   console.log(receivedMessage);
  });
 }

 // Disconnects the socket connection
 disconnectSocket() {
  this.webSocketService.disconnectSocket();
 }
}
```

# Conclusion:

<div class="content-ad"></div>

앵귤러에서 웹 소켓을 활용하면 애플리케이션의 프론트엔드와 백엔드 간 실시간 통신을 구축할 수 있습니다. 이를 통해 사용자들에게 실시간 업데이트, 채팅 기능 또는 협업 편집과 같은 기능을 제공할 수 있어요.
이 예시를 확장하여 추가 기능을 통합하거나 견고한 오류 처리를 구현하거나 백엔드 데이터베이스와 원활하게 통합하는 등 더 많은 기능을 추가할 수 있습니다. 즐거운 코딩 여행 되세요!