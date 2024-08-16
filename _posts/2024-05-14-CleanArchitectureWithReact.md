---
title: "리액트로 깨끗한 아키텍처 구현하기"
description: ""
coverImage: "/assets/img/2024-05-14-CleanArchitectureWithReact_0.png"
date: 2024-05-14 11:42
ogImage: 
  url: /assets/img/2024-05-14-CleanArchitectureWithReact_0.png
tag: Tech
originalTitle: "Clean Architecture With React"
link: "https://medium.com/better-programming/clean-architecture-with-react-cc097a08b105"
isUpdated: true
---




## 클린 아키텍처는 애플리케이션을 보다 쉽게 유지 보수하고 확장할 수 있게 만들어줍니다. 그러나 여러 가지 프레임워크 기반 코딩 스타일에 의해 우리의 코드는 편향될 수 있습니다. 이 기사에서는 React 기반 코드를 클린 아키텍처로 변환하는 방법을 보여드리고자 합니다.

![클린 아키텍처 이미지](/assets/img/2024-05-14-CleanArchitectureWithReact_0.png)

클린 아키텍처는 수직으로 쌓인 여러 층으로 정의되며 각 층은 소프트웨어의 다른 영역을 나타냅니다. 상위 층은 애플리케이션의 기본 정책을 나타내며 하위 층은 메커니즘을 나타냅니다.

![클린 아키텍처 이미지](/assets/img/2024-05-14-CleanArchitectureWithReact_1.png)



이 아키텍처가 작동하는 데 중요한 규칙은 의존성 규칙입니다. 이 규칙은 소스 코드 의존성은 위로만 가리킬 수 있다고 합니다. 계층과 의존성 규칙을 이용하면 데이터베이스와 프레임워크와 같은 기술 구현 세부 사항과 독립적인 매우 낮은 결합도를 가진 애플리케이션을 설계할 수 있습니다.

이 문서에서 정의한 계층을 사용하여 다음과 같이 설명합니다:

도메인 계층은 프로젝트나 애플리케이션이 하는 일을 설명합니다. 도메인 계층의 코드는 플랫폼과 프레임워크와 독립적이어야 합니다.

- 모델은 문제와 관련된 현실 세계 객체를 나타냅니다.
- 리포지토리는 모델에 액세스하기 위한 인터페이스를 제공합니다.
- Use case는 애플리케이션의 모든 비즈니스 로직을 포함합니다.



프레젠테이션 레이어는 애플리케이션이 외부 세계와 상호 작용하는 방식을 설명합니다.

데이터 레이어는 애플리케이션이 데이터를 관리하는 방법을 설명합니다.

주 레이어(가장 하단 레이어)는 다른 레이어의 모든 소프트웨어 구성 요소를 한 애플리케이션으로 통합하는 부트스트랩 코드를 제공합니다.

하지만 실제 애플리케이션에서는 제어 흐름이 항상 상향 방향인 것은 아닙니다. 예를 들어 UseCase 레이어의 비즈니스 로직은 Repository 레이어의 인터페이스를 사용하며, Repository(상위 레이어)는 데이터 레이어(하위 레이어)에 있는 데이터에 액세스해야 합니다. 아래 그림을 참조하세요.



<img src="/assets/img/2024-05-14-CleanArchitectureWithReact_2.png" />

이 종속성 규칙 위반을 해결하려면 일반적으로 의존성 역전 원칙을 사용합니다. 인터페이스 (예: RepositoryX)와 해당 구현 (예: RepositoryImpl) 간의 관계를 위로 향하는 소스 코드 의존성을 가리키도록 정렬합니다. 이 기술을 사용하면 상위 레이어가 하위 레이어에서 정의된 구현을 호출할 수 있습니다.

<img src="/assets/img/2024-05-14-CleanArchitectureWithReact_3.png" />

# React 애플리케이션을 클린 아키텍처로 변환하기



애플리케이션 코드를 리액트 애플리케이션의 템플릿(예: create-react-app로 생성된 꼬겨받은)에서 시작하면 모든 코드가 처음에 프레젠테이션 레이어에 포함됩니다. 이는 리액트(그리고 모든 UI 프레임워크)가 데이터를 사용자에게 어떻게 표시할지에 중점을 둔 것이기 때문입니다. 이 섹션에서는 리액트 기반 애플리케이션 코드를 변형하여 청결한 아키텍처를 준수하도록 만들 것입니다.

여기 공식 리액트 튜토리얼에서 사용된 TicTacToe의 원본 코드입니다.

```js
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
```



![이미지](/assets/img/2024-05-14-CleanArchitectureWithReact_4.png)

## 디자인 모델 레이어

먼저, Model 레이어에서 데이터 모델을 추출해보세요. 여기에 정의된 모델은 플랫폼과 프레임워크에 독립적이어야 하며, 순수하게 비즈니스 규칙에만 집중해야 합니다.

원본 코드에 명확한 타입 정의가 없더라도, TypeScript의 타입 추론 메커니즘을 활용하기 위해 반드시 해당 타입들을 정의해야 합니다. 이렇게 하면 개발하는 동안 TypeScript가 지원할 수 있습니다.



```js
export type Square = null | "X" | "O";

export type Board = Square[];

type HistoryStep = {
  board: Board;
};

export type History = HistoryStep[];
```

# 디자인 유스케이스 및 리포지토리 레이어 설계

다음 단계는 유스케이스를 추출하는 것입니다. 유스케이스는 "X가 발생했을 때, Y를 수행한다"라고 형식화할 수 있습니다.

React 애플리케이션에서 유스케이스는 일반적으로 (1) React 프레임워크에서 호출되는 렌더링 함수로 구현되거나, (2) 사용자 입력을 처리하는 이벤트 핸들러, 또는 (3) 자율적인 효과로 구현됩니다. TicTacToe 예제에서는 세 가지 유스케이스가 있습니다.




- render(): 데이터가 업데이트되면이 함수가 호출됩니다.
- handleClick(i): 보드에서 사각형을 누르면이 함수가 호출됩니다.
- jumpTo(step): "이동 #x로 이동"버튼을 누르면이 함수가 호출됩니다.

그러나 원본 사용 사례 함수 (render(), handleClick(), jumpTo())에는 여러 레이어 (UseCase, Repository, Data, Presentation (react))의 코드가 포함되어 있다는 것을 알게되었습니다. 이 스파게티를 해결하고 적절한 레이어로 코드를 분배해야 합니다.

보통 변수 간의 종속성을 분석하여 이 해결을 시작하고 다른 변수에서도 유추할 수 없는 기본 데이터 소스를 찾습니다. TicTacToe 예에서 아래 그림에 설명된 것처럼 history와 stepNumber 두 가지 주요 데이터 소스를 쉽게 감지할 수 있습니다. 이러한 기본 데이터는 영구 데이터 저장소에 저장해야하며 이를 Data 레이어에 놓습니다.

<img src="/assets/img/2024-05-14-CleanArchitectureWithReact_5.png" />



UseCase 레이어와 Repository 레이어 간의 경계를 설계하는 것은 주관적이며 일부는 당신에게 달려 있어. Repository 레이어는 모든 모델별 작업을 보관하는 중심 장소로 정의됩니다. 또한 Repository 레이어에서의 작업을 정의하는 내 정책은 다음과 같습니다:

- Repository 작업은 최소화되어야 합니다. 주요 데이터 소스에 대한 모든 노출된 setter/getter 함수를 노출하는 것은 좋은 아이디어가 아닙니다. 이는 쉽게 유효하지 않거나 일관성 없는 데이터로 이어질 수 있습니다.
- Repository 작업은 UseCase 레이어에 정의된 비즈니스 로직과 중립적이며 독립적이어야 합니다.
- 각 Repository 작업은 데이터 소스의 일관성을 유지하기 위해 일괄 작업으로 한 번에 변경할 필요가 있는 경우에만 여러 데이터 소스에 액세스해야 합니다.

이 정책에 따라 UseCase 레이어와 Repository 레이어를 다음과 같이 분리합니다:

![이미지](/assets/img/2024-05-14-CleanArchitectureWithReact_6.png)



레포지토리 인터페이스를 정의해 봅시다. 구현은 나중에 이어집니다.

```js
export type Step = {
  board: Board;
  stepNumber: number;
  numOfAllSteps: number;
};

/**
 * 틱택토 단계의 기록을 관리하는 레포지토리.
 * 각 단계는 보드로 이루어져 있습니다.
 */
export interface Repository {
  getCurrentStep(): Promise<Step>;
  setCurrentStepNumber(stepNumber: number): Promise<void>;
  deleteStepsAfterCurrentStepNumber(): Promise<void>;
  addStep(board: Board): Promise<void>;
}
```

그런 다음 유즈케이스 함수를 정의할 수 있습니다. 이제 비즈니스 로직을 더 명확하게 이해할 수 있어요.

```js
export async function clickOnBoard(
  indexOnBoard: number,
  repository: Repository
) {
  const { board, stepNumber } = await repository.getCurrentStep();
  const newBoard = board.slice();
  if (calculateWinnerOnBoard(newBoard) || newBoard[indexOnBoard]) {
    return;
  }
  newBoard[indexOnBoard] = isNextTurnX(stepNumber) ? "X" : "O";
  await repository.deleteStepsAfterCurrentStepNumber();
  await repository.addStep(newBoard);
  await repository.setCurrentStepNumber(stepNumber + 1);
}

export async function jumpToStep(
  stepNumber: number,
  repository: Repository
): Promise<void> {
  return repository.setCurrentStepNumber(stepNumber);
}
```



# 디자인 프리젠테이션 레이어

프리젠테이션 레이어에서 가장 중요한 팁은 MVC(Model-View-Controller)를 형성하는 것입니다. React 애플리케이션에서는 일반적으로 Presentation 레이어와 UseCase 레이어 사이의 다리 역할을 하는 하나의 객체로 "모델"과 "컨트롤러"를 통합합니다.

아래 그림에서 TicTacToeModelController를 참조하세요. React 컴포넌트는 MVC에서 "뷰"로 작동하며, 사용자 정의 후크를 사용하여 "모델-컨트롤러"를 참조합니다. 이렇게 하면 순수한 렌더링 코드("뷰")를 데이터 처리 코드("모델" 및 "컨트롤러")에서 분리할 수 있습니다.



이 코드는 TicTacToeModelController입니다.

```js
export function useTicTacToeModelController(repository: Repository) {
  const [currentStep, setCurrentStep] = useState<Step | null>(null);

  useEffect(() => {
    async function init() {
      const initialStep = await repository.getCurrentStep();
      setCurrentStep(initialStep);
    }
    init();
  }, []);

  const handleClickOnBoard = async (indexOnBoard: number) => {
    await clickOnBoard(indexOnBoard, repository);
    const newStep = await repository.getCurrentStep();
    setCurrentStep(newStep);
  };

  const handleJumpToStep = async (stepNumber: number) => {
    await jumpToStep(stepNumber, repository);
    const newStep = await repository.getCurrentStep();
    setCurrentStep(newStep);
  };

  return {
    currentStep,
    handleClickOnBoard,
    handleJumpToStep,
  };
}
```

그리고 여기는 TicTacToeView입니다.

```js
type TicTacToeViewProps = {
  repository: Repository;
};

export function TicTacToeView({ repository }: TicTacToeViewProps) {
  const { currentStep, handleClickOnBoard, handleJumpToStep } =
    useTicTacToeModelController(repository);

  if (!currentStep) {
    return null;
  }

  const winner = calculateWinnerOnBoard(currentStep.board);
  const xIsNext = isNextTurnX(currentStep.stepNumber);
  return (
    <div className="game">
      <div className="game-board">
        <BoardView board={currentStep.board} onClick={handleClickOnBoard} />
      </div>
      <div className="game-info">
        <StatusView winner={winner} xIsNext={xIsNext} />
        <JumpToStepButtons
          numOfAllSteps={currentStep.numOfAllSteps}
          onClick={handleJumpToStep}
        />
      </div>
    </div>
  );
}
```



# 데이터 레이어 디자인

데이터 레이어는 두 개의 서브 레이어로 구성됩니다. 데이터:저장소 레이어는 도메인:저장소 레이어에 정의된 동작을 구현하는 레이어입니다. 데이터:데이터원 레이어는 실제 데이터 저장소를 구현하는 곳으로, 예를 들어 메모리 저장소 또는 네트워크 저장소가 있습니다.

아래 그림에서 보듯이, 도메인:저장소 레이어(위쪽 레이어)와 데이터:저장소 레이어(아래쪽 레이어) 사이에 의존성 역전 원칙을 적용합니다. 제어 흐름은 아래로 진행됩니다(예: 도메인이 데이터를 사용함), 그러나 소스 코드 의존성은 위로 향합니다.



여기에 RepositoryImpl이 있습니다:

```js
export class RepositoryImpl implements Repository {
  dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async getCurrentStep(): Promise<Step> {
    const [history, stepNumber] = await Promise.all([
      this.dataSource.getHistory(),
      this.dataSource.getStepNumber(),
    ]);
    const board = history[stepNumber].board;
    const numOfAllSteps = history.length;

    return { board, stepNumber, numOfAllSteps };
  }

  async setCurrentStepNumber(stepNumber: number): Promise<void> {
    const history = await this.dataSource.getHistory();
    if (stepNumber < history.length) {
      await this.dataSource.setStepNumber(stepNumber);
    } else {
      throw Error(
        `Step number ${stepNumber} should be smaller than the history size (${history.length})`
      );
    }
  }

  async deleteStepsAfterCurrentStepNumber(): Promise<void> {
    const [history, stepNumber] = await Promise.all([
      this.dataSource.getHistory(),
      this.dataSource.getStepNumber(),
    ]);
    const trimmedHistory = history.slice(0, stepNumber + 1);
    await this.dataSource.setHistory(trimmedHistory);
  }

  async addStep(board: Board): Promise<void> {
    const history = await this.dataSource.getHistory();
    history.push({ board });
    await this.dataSource.setHistory(history);
  }
}
```

# 디자인 메인 레이어

마지막으로, 몇 개의 레이어에서 모든 구성 요소를 하나의 애플리케이션으로 짜바랍니닷.



이 부트스트랩 코드에서는 저장소 구현을 만들고 TicTacToeView에 전달합니다. 그런 다음 저장소는 TicTacToeModelController를 통해 UseCase 레이어에 전달됩니다.

```js
// 의존성 주입
const dataSource = new OnMemoryDataSourceImpl();
const repository = new RepositoryImpl(dataSource);

export function App() {
  return <TicTacToeView repository={repository} />;
}
```

이것은 의존성 주입(Dependency Injection, DI)이라는 기술입니다. 아래 다이어그램에서 보듯이, UseCase 레이어는 Repository 레이어를 사용하며 의존합니다. 그러나 UseCase 레이어의 코드에서는 하위 레이어(Data 레이어)에 의존하는 실제 객체를 Repository 레이어에서 만들어서는 안됩니다.

객체 생성(Main 레이어)과 객체 사용(UseCase 레이어)을 분리함으로써, 의존성 규칙을 깨지 않고(lower layer에서 upper layer로 모든 참조 화살표가 위쪽 방향을 가져야 함) 인 것을 피할 수 있습니다.



![이미지](/assets/img/2024-05-14-CleanArchitectureWithReact_9.png)

여기까지입니다! 최종 소스 코드를 확인할 수 있습니다.

# 결론

React 애플리케이션 코드를 깔끔한 아키텍처로 변환하는 방법을 보여드렸습니다. 깔끔한 아키텍처에 익숙해지면 처음부터 깔끔한 아키텍처에 부합하는 코드를 설계할 수 있게 될 것입니다. 그러나 그런 경우에도 이 글에서 설명한 디자인 프로세스가 리팩터링에 좋은 안내를 제공해 줄 것으로 기대합니다.