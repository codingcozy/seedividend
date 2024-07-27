---
title: "댓글, 모델, 그리고 사용자들- 어머나 개별 사용자를 위한 풀 스택 기능 생성하기"
description: ""
coverImage: "/assets/img/2024-05-12-CommentsModelsandUsersOhMyGeneratingFull-StackFunctionalityforIndividualUsers_0.png"
date: 2024-05-12 21:57
ogImage: 
  url: /assets/img/2024-05-12-CommentsModelsandUsersOhMyGeneratingFull-StackFunctionalityforIndividualUsers_0.png
tag: Tech
originalTitle: "Comments, Models, and Users— Oh My! Generating Full-Stack Functionality for Individual Users"
link: "https://medium.com/@jasen.miyamoto/comments-models-and-users-oh-my-generating-full-stack-functionality-for-individual-users-8c870e20c9f5"
---


<img src="/assets/img/2024-05-12-CommentsModelsandUsersOhMyGeneratingFull-StackFunctionalityforIndividualUsers_0.png" />

프론트엔드와 백엔드 프로그래밍에 대해 충분히 배웠다면, 풀스택 애플리케이션을 구축한 후에 할 일은 아마도 다른 사용자가 응용 프로그램에 로그인하고 로그인한 사용자에 맞게 사이트의 특정 세부 정보를 제공할 수 있도록 하는 것일 것입니다. 이제 데이터베이스와 모델에 대한 지식을 활용하여 그 모든 정보를 저장할 데이터베이스(또는 여러 개)를 만들 수 있습니다. 지금, 사용자의 로그인 유효성 검사 및 암호화에 필요한 모든 사항에 대해 다루지는 않겠습니다(그것은 다른 블로그 게시물이 되겠죠), 하지만 사용자가 댓글을 달거나 평가할 수 있도록 허용하는 백엔드 구조 및 해당 구조를 클라이언트 측에서 사용하여 현재 사용자에 대한 특정 정보를 렌더링하는 방법에 대해서 이야기해보려고 합니다.

# 모델

아래에는 우리의 User 클래스에 대한 상당히 기본적인 모델과 Flask/SQLAlchemy를 통해 생성될 데이터베이스 테이블이 있으며, 그 관계들이 포함되어 있습니다.



```js
from sqlalchemy_serializer를 SerializerMixin에 import합니다.
SQLAlchemy.ext.associationproxy에서 association_proxy도 import합니다.

config에서 db를 import하고 User 클래스를 만듭니다. User 클래스는 db.Model과 SerializerMixin을 상속받습니다.
아래는 User 클래스의 일부분입니다.

__tablename__ = 'users'
id = db.Column(db.Integer, primary_key=True)
username = db.Column(db.String)
_password_hash = db.Column(db.String)

game_statistics = db.relationship('GameStatistics', back_populates='user', cascade='all, delete-orphan')
games = association_proxy('game_statistics', 'game')

serialize_rules = ('-game_statistics',)

사용자의 사용자 이름과 비밀번호를 저장하고 다른 데이터베이스와의 관계를 만들어 추가 정보를 보유하려고 합니다. 게임 등급 애플리케이션을 개발하고 사용자가 게임을 "좋아요"하거나 게임에 댓글/평가를 남기거나 게임을 위시리스트에 추가할 수 있도록 했으며, 각각의 기능은 특정 게임에 관한 것이어야 합니다. 이 애플리케이션에는 많은 게임이 있기 때문에 사용자와 게임 사이의 다대다 관계를 만들기 위해 사용자당 게임별로 좋아요, 위시리스트, 댓글 및 등급에 관한 모든 정보를 보유할 다른 데이터베이스가 필요합니다.

아래에는 다른 두 클래스 (그리고 이에 따른 Flask와 SQLAlchemy를 통한 테이블)의 간소화된 버전이 있습니다.

class Game(db.Model, SerializerMixin):
    __tablename__ = 'games'

    위의 User 클래스와 유사한 형태입니다. 이하 생략.

class GameStatistics(db.Model, SerializerMixin):
    __tablename__ = 'gameStatistics'

    위의 User 클래스와 유사한 형태입니다. 이하 생략.
```



이제 사용자 정보를 모두 보유한 데이터베이스, 게임에 대한 모든 세부 정보를 보유한 데이터베이스, 이 둘 사이에서 중개 역할을 하는 세 번째 테이블이 있습니다. 외래 키를 사용하여 통계와 게임, 사용자 간의 연관을 볼 수 있습니다. 데이터베이스가 다른 테이블의 열에 연결되어 있는지 알 수 있게 됩니다. 사용자는 많은 게임과 연관을 갖을 수 있고, 게임은 해당 게임에 댓글을 남기거나 즐겨찾기에 추가한 많은 사용자들을 가질 수 있습니다. 이에 대한 데이터를 완전히 새로운 테이블에 보유해야 합니다. 사용자와 게임을 식별하는 새로운 테이블을 생성합니다. 마지막으로 API가 관련 클래스의 모든 세부 정보를 보여줄 수 있도록 SQLAlchemy의 association proxy를 사용하여 관계를 생성합니다.

# 프론트 엔드

이제 스스로 묻고 있을 수 있습니다. "왜 프론트 엔드로 건너뛰나요? 아직 백엔드 루트를 만들지 않았는데요!" 맞습니다! 그러나 프론트 엔드에서 필요한 기능이 무엇인지 알 때 백엔드 루트를 만드는 것이 더 쉬울 수 있습니다. 특정 게임에 대한 모든 댓글이 해당 게임 페이지에 나타나게 하려면? 사용자가 지금까지 한 모든 댓글이 프로필 페이지에 나타나야 하나요? 사용자가 즐겨찾기한 것을 어디에서 렌더링하고 있나요? 사용자가 게임을 즐겨찾기했는지 여부는 게임 페이지에 나타나길 원하시나요? 다른 곳? 위시리스트도 어떻게 하나요? 동적으로 렌더링하면서 즐겨찾기한 경우 데이터베이스를 변경하고 싶으실 텐데요?

휴우! 프론트 엔드의 모든 렌더링과 기능을 계획하는 일은 많은 노력이 필요할 수 있지만, API를 위한 백엔드 루트를 만드는 것은 훨씬 간단해집니다. 위에서 나열된 옵션 중 일부만 가져와서 백엔드에 필요한 루트에 대해 이야기해보겠습니다:



- 게임 상세 페이지에 게임의 모든 코멘트를 나열합니다.
- 즐겨찾기한 게임을 즐겨찾기 페이지에서 나열합니다.
- 위시리스트 버튼을 동적으로 렌더링하고 데이터베이스를 변경합니다.

# 코멘트

게임 상세 페이지에서 단일 게임의 코멘트만 렌더링하는 기본적인 방법을 살펴봅시다. 프론트엔드는 다음과 같이 보일 수 있습니다. 프론트 엔드 라우트에서 사용되는 게임 ID에 대해 모든 게임 통계를 얻기 위해 백엔드 URL로 fetch 요청을 수행하고, React State를 응답으로 설정한 다음 해당 상태를 사용하여 목록을 반복하고 각 반환된 게임 통계에 대해 코멘트, 평점, 사용자를 표시하는 Review Card를 만들어야 합니다.

```js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import GameReviewCard from '../components/GameReviewCard';

function GameDetail({ user }) {
  // URL 파라미터에서 게임 ID를 가져옵니다.
  const { id } = useParams();
  // 게임 통계를 저장할 상태
  const [gameStats, setGameStats] = useState([]);

  useEffect(() => {
       fetch(back_end_url) //아직 이 변수를 정의하지 않았음을 참고해 주세요. 
      .then((res) => res.json())
      .then((data) => setGameStats(data))
      .catch((error) => console.error(error));
  return (
    <Box sx={ mt: 2 }>
            {gameStats.length > 0 ? (
              gameStats.map((stat) => (
                <GameReviewCard key={stat.game_stats_id} gameStats={stat} />
              ))
            ) : (
              <Typography>리뷰가 없습니다.</Typography>
            )}
          </Box>
  );
```



지금, 이 back-end route를 살펴보겠어요. 여러분이 fetch 문에서 `back_end_url`로 넣을 내용은 다음과 같습니다:

```js
class GameStatsByGameID(Resource):
    # 이는 특정 게임에 대한 모든 댓글과 평가를 가져와 개별 게임 페이지에 표시합니다
    def get(self, game_id): 
        gamestats = [gamestat.to_dict() for gamestat in GameStatistics.query.filter(GameStatistics.game_id == game_id, GameStatistics.comments != None).all()]
        if gamestats:
            return make_response(gamestats)
        else:
            return make_response({'error': ['아직 리뷰가 없습니다']})

api.add_resource(GameStatsByGameID, '/game-statistic/<int:game_id>')
```

이 route의 가장 중요한 부분은 우리가 하는 데이터베이스 쿼리입니다. 게임 ID(우리는 front-end route로부터 가져온 것)를 전달하고, 그 ID를 사용하여 전체 게임 통계 데이터베이스를 훑어서 해당 특정 게임과 관련된 모든 인스턴스를 추출합니다. filter 내부의 쿼리의 두 번째 부분은 실제로 존재하는 댓글만 추출하도록 하는 것입니다(기억하세요, 우리는 게임 통계 테이블에 Favorite와 Wishlist와 같은 것들도 저장하지만 페이지의 댓글 섹션에 렌더링되지 않길 원합니다!). 이제 반환된 결과를 사용하여 댓글/리뷰 카드를 렌더링할 수 있습니다! 그리고 front-end에서는 useParams에서 game_id를 가져오기 위해 fetch 요청에서 `back_end_url`을 `/game-statistic/$'id'`로 설정할 수 있어요.

# 즐겨찾기



즐겨찾기 기능도 비슷한 방식으로 작동하지만, 사용자 ID와 특정 게임 ID가 아닌 사용자 ID와 관련된 게임 통계를 쿼리하는 새로운 백앤드 루트가 필요합니다. 또한 즐겨찾기한 게임 통계만 쿼리 결과로 포함하고 싶습니다. 그래서 우리의 프런트엔드는 다음과 같이 간단하게 보일 수 있습니다:

```js
import React, { useState, useEffect, useParams } from 'react';
import FavoritesGameCard from '@/components/FavoritesGameCard.jsx';

function Favorites({ user }) {
  const [games, setGames] = useState([]);
  const [deleteGame, setDeleteGame] = useState(false);

  useEffect(() => {
    if (user && user.id) {
      fetch(`http://localhost:8080/favorites/${user.id}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return console.error("GET 요청 중에 문제가 발생했습니다");
          }
        })
        .then((gameData) => {
          setGames(gameData);
        });
    }
  }, [user, deleteGame]);

  const handleUnfavorite = (gameId) => {
    setGames(games.filter((game) => game.id !== gameId));
    setDeleteGame((prev) => !prev);
  };

  return (
    <div>
      {!games ? (
        <div className="no-favorites-message">
          <h2>아직 즐겨찾기한 게임이 없습니다</h2>
        </div>
      ) : (
        <>
          <div className="game-cards-container">
            {games.map((game) => (
              <FavoritesGameCard key={game.id} game={game} user={user} handleUnfavorite={handleUnfavorite} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Favorites;
```

새로운 백앤드 루트와 ID를 백앤드로 보내는 새로운 방법을 알 수 있을 것입니다. 우리는 현재 로그인한 사용자를 React 상태에 유지하여 해당 사용자에 대한 정보가 필요한 컴포넌트에 전달할 수 있습니다 (이 경우에는 ID가 필요합니다). 백앤드 루트와 쿼리는 다음과 같이 구성되어 있습니다:

```js
class FavoritesByUser(Resource):
    def get(self, user_id):
        favorites = [gamestat.game.to_dict() for gamestat in GameStatistics.query.filter(GameStatistics.user_id==user_id, GameStatistics.favorited==True).all()]
        if favorites:
            return make_response(favorites)
        else:
            return make_response({'error': ['아직 즐겨찾기한 게임이 없습니다']})
        
api.add_resource(FavoritesByUser, '/favorites/<int:user_id>')
```



알았어요! 이제, 즐겨찾기 및 위시리스트 관련 기능에 대해 더 이야기해보겠어요.

# 위시리스트 버튼

게임을 즐겨찾기 하는 방법은 React State를 활용하는 위시리스트 버튼을 구현하는 것으로 결정했어요. 이 버튼은 부모 컴포넌트로부터 전달된 prop과 이 컴포넌트 자체의 네이티브 state를 활용하여 사용자와 게임에 관련된 게임 통계를 확인하고 이에 맞게 렌더링하는 기능을 제공해요. 부모 컴포넌트로부터 넘어온 gameStatId 상태를 사용하여 데이터베이스로 fetch 요청을 보내 현재 로그인한 사용자의 ID(기억해요, 사용자 정보는 이미 state에 저장되어 있어요)와 현재 보고 있는 게임 상세 페이지의 게임 ID에 해당하는 게임 통계의 인스턴스가 있는지 확인해요. 만약 해당 인스턴스가 있다면 gameStateId를 업데이트하고 해당 상태를 버튼으로 전달해요.

```js
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button'; // Material-UI에서 Button 가져오기
import StarIcon from '@mui/icons-material/Star'; // Material-UI에서 즐겨찾기 아이콘 가져오기
import StarBorderIcon from '@mui/icons-material/StarBorder'; // Material-UI에서 즐겨찾기 해제 아이콘 가져오기

// gameId와 userId를 prop으로 전달받는 함수형 컴포넌트 WishlistButton 정의
function WishlistButton({ gameId, userId, gameStatId, updateGameStatId}) {
  
  // 게임을 위시리스트에 추가했는지 추적하는 상태
  const [isWishlisted, setIsWishlisted] = useState(false);

  // 게임 통계를 가져오는 useEffect 훅, gameId 또는 userId가 변경될 때 실행
  useEffect(() => {
    // 현재 사용자와 게임에 대한 게임 통계 가져오기
    fetch(`http://localhost:8080/game-statistics/${gameId}/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        // 게임 통계가 있는 경우 상태 업데이트
        if (data.game_stats_id) {
          setIsWishlisted(data.wish_listed);
          updateGameStatId(data.game_stats_id);
        } else {
          // 게임 통계가 없는 경우 기본 상태로 설정
          setIsWishlisted(false);
          updateGameStatId(null);
        }
      });
  }, [gameId, userId]); // useEffect의 의존성 배열

  // 위시리스트 버튼 클릭 처리 함수
  const handleWishlist = () => {
    // 게임 통계 인스턴스가 있는 경우 위시리스트 상태 업데이트
    if (gameStatId) {
      fetch(`http://localhost:8080/game-statistics/${gameId}/${userId}`, {
        method: 'PATCH', // 기존 데이터 업데이트용 PATCH 메소드 사용
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wish_listed: !isWishlisted }), // 위시리스트 상태 토글
      })
        .then((res) => res.json())
        .then((data) => setIsWishlisted(data.wish_listed)); // 새로운 위시리스트 상태로 상태 업데이트
    } else {
      // 게임 통계 인스턴스가 없는 경우 새로운 위시리스트 생성
      fetch(`http://localhost:8080/game-statistics`, {
        method: 'POST', // 새 데이터 생성용 POST 메소드 사용
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          game_id: gameId,
          wish_listed: true,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // 새 게임 통계 데이터로 상태 업데이트
          setIsWishlisted(true);
          updateGameStatId(data.game_stats_id);
        });
    }
  };

  // 위시리스트 버튼 동적 텍스트 및 아이콘을 기반으로 렌더링
  return (
    <div className="wishlist-container">
      <Button
        variant="contained"
        color="primary"
        startIcon={isWishlisted ? <StarIcon /> : <StarBorderIcon />}
        onClick={handleWishlist}
      >
        {isWishlisted ? '위시리스트에서 제거' : '위시리스트에 추가'}
      </Button>
    </div>
  );
}

export default WishlistButton; // 다른 부분에서 사용할 수 있도록 WishlistButton 컴포넌트 내보내기
```



만약 해당 인스턴스가 이미 존재한다면(예: 사용자가 이 게임에 댓글을 달았거나 위시리스트에 추가했을 경우), 위시리스트 버튼을 클릭하면 데이터베이스에서 해당 게임 통계를 업데이트하기 위해 서버로 PATCH 요청이 전송됩니다. 아직 인스턴스가 존재하지 않은 경우, POST 요청을 보내고 모든 다른 버튼들(위시리스트 및 댓글 등)의 상태를 업데이트하여 이후 PATCH 요청을 보냅니다. 그런 다음, 확실히 isWishlisted 상태를 사용하여 페이지에서 조건부 렌더링을 수행하여 버튼을 "위시리스트에서 제거" 또는 "위시리스트에 추가"로 표시하게 됩니다.

사용자와 상호 작용할 때 프론트엔드와 백엔드를 연결하는 몇 가지 방법 중 일부입니다. SerializerMixin 및 직렬화 규칙과 같은 것들을 사용하면 백엔드에서 반환되는 데이터를 더욱 구체적으로 얻을 수 있습니다. 매우 구체적인 라우팅을 만드는 것은 시간이 소모되고 때로는 중복된 느낌을 줄 수 있지만, 데이터베이스에 많은 양의 정보가 저장된 경우 메모리 및 로드 시간을 줄일 수도 있습니다.

좋은 코딩 되세요!