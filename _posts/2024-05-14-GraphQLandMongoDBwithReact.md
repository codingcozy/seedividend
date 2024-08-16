---
title: "GraphQL 및 MongoDB와 React"
description: ""
coverImage: "/assets/img/2024-05-14-GraphQLandMongoDBwithReact_0.png"
date: 2024-05-14 12:05
ogImage: 
  url: /assets/img/2024-05-14-GraphQLandMongoDBwithReact_0.png
tag: Tech
originalTitle: "GraphQL and MongoDB with React"
link: "https://medium.com/@xenbel/graphql-and-mongodb-with-react-285196d39a48"
isUpdated: true
---




![그림](/assets/img/2024-05-14-GraphQLandMongoDBwithReact_0.png)

웹 개발자들의 세계에서는 계속해서 최고의 개발 및 웹 응용 프로그램의 기능을 보여줄 수 있는 것을 찾기 위한 노력이 계속되고 있습니다. 오래된 REST API의 대안으로 최근에 인정받게 된 새롭고 흥미로운 기술이 GraphQL입니다. REST가 한 요청에 대해 자주 단일 데이터 세트를 반환하는데 반해, GraphQL은 클라이언트가 원하는 특정 데이터를 요청할 수 있습니다. 따라서 데이터 전송을 줄이는 것뿐만 아니라 서버 측 응답을 빠르고 간단하게 만드는 두 가지 과정으로 이루어집니다. GraphQL과 MongoDB의 조합은 데이터 처리에 있어 유연하고 효율적인 조합을 제공합니다. 이 멋진 GraphQL과 MongoDB의 조합은 개발자들이 동적 웹 응용 프로그램을 디자인하고 관리하는 방식에 혁명을 일으키고 있습니다.

# GraphQL의 힘

GraphQL의 가장 큰 장점은 그 유연성입니다. 개발자들은 쿼리를 최적화하여 필요한 모든 데이터를 한 군데서 얻을 수 있습니다. 이로 인해 REST API에 대해 여러 차례의 연이은 요청이 필요하지 않아집니다. 현재 장치의 다양성 및 네트워크 조건의 변동성에 매우 중요합니다.



GraphQL, MongoDB 및 React가 웹 개발의 주요 도구로 사용될 때, 이러한 도구들은 개발 프로세스를 자동화할 수 있게 되었습니다. 이것은 완전히 다르게 만듭니다. 문서 중심의 NoSQL 데이터베이스 시스템인 MongoDB는 대량의 비구조화 정보를 처리하는 우수한 옵션을 제공하며, 동적이고 구조화되지 않은 GraphQL 요청을 쿼리하는 데 매우 빠르고 유연합니다. React의 선언 기반 특성을 활용하여 사용자 인터페이스를 구축하고 응용 프로그램의 상태를 처리하는 것은 매우 적합합니다. React는 데이터베이스에서 사용자 인터페이스로 실시간 데이터를 제공하여 GraphQL의 동적이고 견고한 특성을 보완합니다.

본 글에서는 GraphQL을 통해 MongoDB와 통신하고 React 애플리케이션을 통합하는 과정, GraphQL 서버 설정 방법 및 데이터베이스 상호작용을 최적화하기 위한 최선의 방법에 대해 살펴보겠습니다. 이러한 기술의 결합을 통해 프로그래밍 시간을 최소화하고 애플리케이션의 유지 보수를 간소화할 뿐만 아니라, 고성능 및 확장 가능한 웹 애플리케이션을 구축할 수 있는 기회를 제공합니다.

# GraphQL 기초

2015년 Facebook 팀이 설계한 GraphQL은 API용 쿼리 언어로 볼 수 있으며, 동시에 제공된 데이터를 기반으로한 쿼리 실행 메커니즘을 제공합니다. 이를 통해 기업은 API 데이터를 완전하고 의미 있게 설명하여 고객이 정확히 필요한 것만 요청할 수 있도록 합니다. 결과적으로 네트워크 개선으로 이어지고, 네트워크 부하가 줄어듭니다.



# 스키마와 타입

GraphQL 스키마는 API의 중심 요소입니다. GraphQL 스키마는 데이터 유형과 그들 사이의 관계를 정의하며, 따라서 쿼리는 클라이언트가 원하는 것과 정확히 일치하도록 구성됩니다. 설명은 목록처럼 보이며 위치에는 유형이 있을 수 있습니다. 그들은 더 유연하고 복잡한 데이터 구조를 만들 수 있도록 유형의 유형일 수도 있습니다.

# 쿼리

GraphQL의 쿼리는 정적 특성 모음과 달리, GraphQL에서는 일치하는 스키마에서 제공된 유형에 해당하는 모든 데이터를 포함할 수 있습니다. GraphQL의 경우 클라이언트는 자주 REST API에서 발생하는 불필요한 정보 전달 없이 정확히 필요에 맞는 방식으로 데이터를 검색할 수 있습니다.



GraphQL에서의 예시 쿼리는 다음과 같을 수 있어요:

```js
{
  user(id: "1") {
    name
    email
    friends {
      name
    }
  }
}
```

이 쿼리는 사용자의 이름, 이메일, 그리고 친구들의 이름에 대한 정보만 요청하고, 사용자와 친구들에 대한 다른 모든 정보는 제외합니다.

# 뮤테이션(mutations)



GraphQL에서 돌연변이는 데이터를 수정하는 데 사용됩니다. 쿼리와 마찬가지로 돌연변이는 스키마에 의해 정의되며 클라이언트가 데이터를 정확하고 제어된 방식으로 변경할 수 있도록 합니다. 돌연변이는 다음과 같이 보일 수 있습니다:

```js
mutation {
  addUser(name: "John Doe", email: "john@example.com") {
    id
    name
    email
  }
}
```

이 예제에서 addUser 돌려변이는 지정된 이름과 이메일 주소를 가진 새로운 사용자를 추가하고 새로 생성된 사용자에 대한 정보를 반환합니다.

# Subscriptions



서브스크립션은 GraphQL의 중요한 부분으로, 클라이언트가 원하는 데이터에 대한 실시간 알림을 받을 수 있는 기능을 제공합니다. 이는 대화방이나 게임과 같이 데이터의 지속적인 업데이트가 필요한 애플리케이션에서 특히 유용합니다. GraphQL의 서브스크립션은 다음과 같이 구현할 수 있습니다:

```js
subscription {
  messageAdded(channelId: "1") {
    id
    content
    sender {
      name
    }
  }
}
```

채널에 새로운 게시물이 추가될 때, 모든 구독자는 즉시 게시물의 세부 정보를 포함한 알림을 받습니다.

# REST와의 비교



REST에서 볼 수 있는 데이터의 형태와 볼륨을 결정하는 데 서버가 가지는 고민과는 달리, GraphQL에서는 실제로 데이터를 요청하는 것이 클라이언트에 달려 있습니다. 이는 검색된 데이터를 필요한 것만으로 줄이고 데이터 상호작용이 어떻게 일어나는지에 대한 클라이언트의 제어를 더 많이 제공합니다. 이 GraphQL의 기능은 오늘날 고성능과 속도를 요구하는 웹 애플리케이션에 이상적입니다.

# GraphQL 서버 구성

MongoDB 및 React와 결합하여 GraphQL의 모든 잠재력을 실현하는 첫 번째 단계는 GraphQL 서버를 생성하는 것입니다. 이 섹션에서는 이 접근 방식을 사용하여 서버를 생성하고 실행하는 방법을 배우게 됩니다. 이 스택은 React 및 Apollo Client를 사용하여 프런트엔드 애플리케이션, Express 및 Apollo Server를 사용하는 백엔드, 그리고 Mongoose 라이브러리를 통해 서버리스 Mongo DB로 구성됩니다.

# 단계 1: 몇 가지 설치 의존성을 추가하여 프로젝트를 개인화하세요.



첫 번째로, 새로운 노드를 생성하세요. 먼저 새 브라우저 인스턴스를 열고 JS 프로젝트를 수행해야 하는 설치 페이지로 이동한 다음 필요한 패키지를 설치해주세요. 터미널을 열고 다음 명령을 실행하세요:

```js
mkdir graphql-mongo-server
cd graphql-mongo-server
npm init -y
npm install apollo-server-express express graphql mongoose
```

이러한 명령은 프로젝트를 위한 새 디렉토리를 생성하고, 새로운 Node.js 프로젝트를 초기화하며 필요한 종속성을 설치합니다.

# 단계 2: Express 및 Apollo Server 구성



`index.js` 파일을 만들고 Express 서버 구성 및 GraphQL 쿼리를 처리하기 위해 Apollo Server를 통합하세요.

```js
// index.js

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();

// GraphQL 스키마 정의
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// 리졸버 구현
const resolvers = {
  Query: {
    hello: () => '안녕, 세상아!'
  }
};

// Apollo 서버 생성
const server = new ApolloServer({ typeDefs, resolvers });

// Express 미들웨어에 Apollo 적용
server.applyMiddleware({ app });

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`서버가 http://localhost:${PORT}${server.graphqlPath} 에서 실행 중입니다.`)
);
```

# Step 3: MongoDB 연결

Mongoose를 사용하여 프로젝트에 MongoDB를 추가하세요. 이를 위해 `index.js` 파일을 업데이트하여 데이터베이스에 연결하는 코드를 추가하세요.



```js
const mongoose = require('mongoose');

// MongoDB에 연결
mongoose.connect('mongodb://localhost:27017/mygraphqlapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
  console.log('MongoDB 데이터베이스에 연결되었습니다');
});
```

로컬호스트:27017/mygraphqlapp를 귀하의 데이터베이스 연결 문자열로 교체해 주세요.

# 단계 4: GraphQL 모델 및 스키마 정의

Mongoose 데이터 모델의 정의를 형식화하고 이러한 모델을 사용하여 GraphQL 스키마를 설정합니다. 예를 들어, 사용자 모델을 생성하고 이를 GraphQL 스키마에 추가합니다.




```js
// Mongoose 사용자 모델 정의
const User = mongoose.model('User', new mongoose.Schema({
  name: String,
  email: String,
  age: Number
}));

// GraphQL 스키마 확장
const typeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String
    age: Int
  }
  type Query {
    users: [User]
  }
  type Mutation {
    addUser(name: String!, email: String!, age: Int): User
  }
`;
const resolvers = {
  Query: {
    users: () => User.find({})
  },
  Mutation: {
    addUser: async (_, { name, email, age }) => {
      const user = new User({ name, email, age });
      await user.save();
      return user;
    }
  }
};
```

이러한 단계를 통해 MongoDB 연결이 준비된 기본 GraphQL 서버를 생성할 수 있습니다. React 애플리케이션과 효율적으로 상호작용하는 쿼리 및 뮤테이션을 처리하기 위해 이 서버를 사용할 수 있습니다.

# React에서의 GraphQL 통합

GraphQL 서버를 설정하면 다음으로 할 일은 해당 서버를 React 앱과 통합하는 것입니다. Apollo Client를 통해 GraphQL 서버에 쉽게 쿼리 및 뮤테이션을 수행할 수 있어 MongoDB 데이터와 동적 상호작용을 가능하게 할 수 있습니다. 이 경우에는 React에 Apollo Client를 추가하고 이 섹션에서 몇 가지 작업을 찾아보는 방법을 살펴볼 것입니다.




# 단계 1: Apollo Client 설치하기

먼저 React 프로젝트에 필요한 Apollo Client 패키지를 설치해보세요:

```js
npm install @apollo/client graphql
```

# 단계 2: Apollo Client 사용자 정의하기



Apollo Client의 인스턴스를 생성하고 React 애플리케이션에 연결해보세요. 이를 위해 다음 코드를 ApolloClient.js와 같은 파일에 추가해주세요:

```js
import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql' // 여러분의 GraphQL 서버 URL로 교체해주세요
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([httpLink])
});
export default client;
```

# 단계 3: Apollo Provider 통합

React 앱을 ApolloProvider로 감싸서 쿼리와 뮤테이션을 앱의 모든 컴포넌트에서 사용할 수 있게 만들어보세요. App.js에서:



```js
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';
import Users from './components/Users';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>GraphQL and React</h1>
        <Users />
      </div>
    </ApolloProvider>
  );
}
export default App;
```

# 단계 4: 쿼리와 뮤테이션 만들고 사용하기

GraphQL과 상호 작용하기 위해 useQuery와 useMutation 훅을 사용하는 React 컴포넌트를 만듭니다. 사용자를 표시하고 새 사용자를 추가하는 컴포넌트 예제:

```js
import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!) {
    addUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

function Users() {
  const { data, loading, error } = useQuery(GET_USERS);
  const [addUser] = useMutation(ADD_USER);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name && email) {
      await addUser({ variables: { name, email } });
      window.location.reload(); // 추가 후 간단히 페이지 새로고침
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이름"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">사용자 추가</button>
      </form>
      <ul>
        {data && data.users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}
export default Users;
```



본 코드는 React 애플리케이션에서 GraphQL을 사용하여 데이터를 가져와 서버로 전송하는 예시입니다. 주어진 예시는 당신의 애플리케이션의 더 정교한 요구사항과 기능에 맞게 개선하고 일반화할 수 있습니다.

# 실제 예시: 할 일 앱

이어서, 웹 개발 기초를 학습하는 초보자들에게 표준 연습으로 사용되는 To-Do 애플리케이션을 만들어 봅시다. 이 특정 섹션에서는 우리의 프론트엔드로 React를 구현하고 데이터 관리를 위해 GraphQL을 사용하며, 데이터 저장소로 MongoDB를 사용할 간단한 Todo 애플리케이션을 만들어 보겠습니다. 이 프로젝트는 작업 생성, 편집 및 삭제와 같은 항목을 다룰 것입니다.

# 단계 1: MongoDB 데이터베이스 구성하기



MongoDB를 설치하여 작업 데이터를 저장하는 것이 첫 번째 단계입니다. Mongoose를 사용하여 MongoDB에 Todo 항목을 위한 스키마를 만듭니다:

```js
const mongoose = require('mongoose');

const { Schema } = mongoose;

const todoSchema = new Schema({
  text: String,
  completed: Boolean
});

const Todo = mongoose.model('Todo', todoSchema);
```

# 단계 2: GraphQL 스키마 만들기

Todo 요소를 관리하는 데이터 유형, 쿼리 및 뮤테이션을 포함하는 GraphQL 스키마를 정의합니다.



```js
상수 { gql } = require ('apollo-server-express')를 가져와주세요.

const typeDefs = gql`
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }
  type Query {
    todos: [Todo]
  }
  type Mutation {
    addTodo(text: String!): Todo
    updateTodo(id: ID!, completed: Boolean!): Todo
    deleteTodo(id: ID!): Todo
  }
`;

# 단계 3: 리졸버 구현하기

다음 단계는 GraphQL을 위한 리졸버를 구현하는 것인데, 이는 데이터베이스와 상호작용하는 논리를 제공합니다.

const resolvers = {
  Query: {
    todos: () => Todo.find({})
  },
  Mutation: {
    addTodo: async (_, { text }) => {
      const todo = new Todo({ text, completed: false });
      await todo.save();
      return todo;
    },
    updateTodo: async (_, { id, completed }) => {
      return Todo.findByIdAndUpdate(id, { completed }, { new: true });
    },
    deleteTodo: async (_, { id }) => {
      return Todo.findByIdAndRemove(id);
    }
  }
};
```



# 단계 4: Apollo Client를 통합하여 React와 통합

React 애플리케이션에 Apollo Client를 통합하고 작업을 표시 및 관리하는 컴포넌트를 만듭니다:

```js
import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_TODOS = gql`
  query {
    todos {
      id
      text
      completed
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      completed
    }
  }
`;

function Todos() {
  const { data, loading, error } = useQuery(GET_TODOS);
  const [addTodo] = useMutation(ADD_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const handleAddTodo = async text => {
    if (text) {
      await addTodo({ variables: { text } });
    }
  };

  return (
    <div>
      <ul>
        {data.todos.map(todo => (
          <li key={todo.id}>
            {todo.text}
          </li>
        ))}
      </ul>
      <button onClick={() => handleAddTodo('새 작업 추가')}>작업 추가</button>
    </div>
  );
}

export default Todos;
```

# 단계 5: 사용자 인터페이스 구현



간단한 사용자 인터페이스를 React로 개발해보세요. 사용자들이 작업을 추가하고 완료된 것으로 표시하거나 작업을 삭제할 수 있게 만들어보세요. 복잡한 양식이나 버튼을 사용하여 작업을 구성할 필요는 없습니다.

위에서 언급된 조치들은 React 애플리케이션과 GraphQL 서버 간에 완전한 통신을 제공하며 데이터베이스로 MongoDB를 사용합니다. 이를 통해 빠르고 효율적으로 작동하는 애플리케이션이 생성됩니다.

# 결론

따라서, 우리는 GraphQL, MongoDB 및 React를 결합하는 방법을 찾았습니다. 이 두 기술의 결합은 웹 애플리케이션의 성능을 실제로 향상시키며 개발 복잡성을 크게 줄일 수 있습니다. 이 기술 스택을 중요시하는 몇 가지 주요 포인트를 살펴봅시다.



# GraphQL을 사용해야 하는 이유

- 요청한 대로: GraphQL을 사용하면 필요한 데이터만 요청할 수 있어서 불필요한 데이터 없이 작업할 수 있습니다. 이는 더 적은 데이터 전송 및 빠른 페이지 로딩으로 이어집니다.
- 한 곳을 통해 모두 처리: REST API의 여러 엔드포인트에 작별을 고한다면, GraphQL은 하나의 통합된 지점을 통해 통신하여 코드를 추적 가능하고 아키텍처를 더욱 명료하게 만듭니다.
- 실시간 업데이트: GraphQL을 사용하면 채팅이나 협업과 같이 데이터가 지속적으로 업데이트되는 기능을 쉽게 구현할 수 있습니다.


# GraphQL을 강력하게 만드는 것은 무엇인가요?

- 유연성과 강력함: MongoDB는 데이터 저장을 유연하게 제공하며, 반면에 React는 사용자 인터페이스를 유연하게 구축하는 데 도움을 줍니다. 이 두 가지를 팀으로 사용하면 모든 요구 사항에 손쉽게 조정될 수 있는 좋은 조합이 될 수 있습니다.
- 개발이 쉬워짐: 이 스택은 GraphQL API의 명확한 규칙 덕분에 코드를 줄이고 개발 단계마다 확신을 키울 수 있도록 도와줍니다.



# GraphQL과 MongoDB의 성능 영향

GraphQL, React, 그리고 MongoDB가 함께 작동하면 여러분의 일상이 간소화되고 응용 프로그램은 더 빠르게 반응합니다. 쿼리 최적화는 서버 및 네트워크 부하를 줄이고 데이터 처리 속도를 높여 인터페이스를 더 반응적으로 만듭니다. 따라서 사용자들의 눈에 띄게 제품 품질을 향상하는 중요한 요소입니다.

요약하면, 더 강력한 웹 응용 프로그램을 만들고 싶다면 더 빠르고 개발하기 쉬운 웹 응용 프로그램을 만들어야 한다면 GraphQL, MongoDB 및 React의 세트가 반드시 필요합니다. 이것은 분명히 수익성이 입증된 프로젝트의 미래에 대한 장기적인 투자입니다!