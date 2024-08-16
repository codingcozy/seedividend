---
title: "자바스크립트를 사용해서 간단한 버전 관리 시스템을 구현해보면 Git에 대한 이해도가 높아집니다"
description: ""
coverImage: "/assets/img/2024-05-14-ImplementaSimpleVersionControlwithJavaScripttoUnderstandGitBetter_0.png"
date: 2024-05-14 14:06
ogImage: 
  url: /assets/img/2024-05-14-ImplementaSimpleVersionControlwithJavaScripttoUnderstandGitBetter_0.png
tag: Tech
originalTitle: "Implement a Simple Version Control with JavaScript to Understand Git Better!"
link: "https://medium.com/gitconnected/implement-a-simple-version-control-with-javascript-to-understand-git-better-2307001dfe00"
isUpdated: true
---




Git 내부를 배우면서 더 나은 이해를 위해 간소화된 버전을 구현해 보세요!

![이미지](/assets/img/2024-05-14-ImplementaSimpleVersionControlwithJavaScripttoUnderstandGitBetter_0.png)

## Git 또는 일반적으로 버전 관리란?

우리 프로젝트를 시간에 따라 추적하는 데 도움이 되는 것이에요. 좋은 예시 중 하나는 소스 코드를 쉽게 과거의 특정 시간에 어떻게 보였는지 볼 수 있다는 것이죠.



# 왜 그것을 이해해야 할까요?

우선, 무언가 잘못되었을 때 몇 가지 명령어를 무심코 알아서는 도움이 되지 않습니다. 둘째로, 매일 다루고 있는 것이 어떻게 작동하는지 이해하지 못한다면, 재미가 어디에 있을까요?

이제 슈퍼 간단한 버전 관리 시스템인 Gitj를 구현하는 방법을 하나씩 이해해 보겠습니다.

# 구현



git은 압축 및 데이터 저장 방식과 같이 더 고급 기능을 수행한다는 것을 염두에 두세요. 이 내용은 별도의 기사에서 다룰 수 있습니다.

# 첫 번째 명령어 적용: Init!

아마도 알고 계시다시피 프로젝트를 git init으로 시작하면 git은 .git 폴더를 생성하고 데이터를 그 안에 저장합니다. 이를 구현해보겠습니다:

git이 생성하는 두 가지 중요한 폴더는 refs와 objects입니다. objects는 git의 구성 요소입니다. 3가지 유형(사실 4가지!)이 있을 수 있습니다: commit, tree 및 blob입니다. 이러한 각 유형을 자세히 살펴보겠습니다. refs 폴더에는 브랜치와 각 브랜치의 최신 커밋이 포함된 heads라는 하위 폴더가 있습니다(이름에서 알 수 있듯이 브랜치의 헤드를 저장하는 것으로 보입니다). 또한 현재 브랜치 또는 커밋을 유지하는 HEAD라는 중요한 파일이 있습니다.(가끔은 브랜치 대신 커밋에서 checkout을 수행할 수 있습니다)



"이제 init 함수를 호출하면 이러한 폴더들을 만들어 보겠습니다.

```js
const fs = require("fs");

function init() {
    // .gitj라는 폴더를 만들고, .gitj/objects와 .gitj/refs, .gitj/refs/heads와 같은 하위 폴더들을 생성합니다.
    fs.mkdirSync(".gitj");
    fs.mkdirSync(".gitj/objects");
    fs.mkdirSync(".gitj/refs");
    fs.mkdirSync(".gitj/refs/heads");
    // .gitj/refs/heads/master라는 파일을 생성합니다.
    fs.writeFileSync(".gitj/refs/heads/master", "");
    // .gitj/HEAD라는 파일을 생성합니다.
    fs.writeFileSync(".gitj/HEAD", "ref: refs/heads/master");
}

init();
```

# Git Add! 파일을 스테이징 영역에 추가하기

Git에서 파일은 세 가지 다른 단계에 있을 수 있습니다:"



![image](/assets/img/2024-05-14-ImplementaSimpleVersionControlwithJavaScripttoUnderstandGitBetter_1.png)

- Working Directory: 평소 작업하는 디렉토리로 파일 및 폴더를 변경하고 구조를 수정합니다.

- Staging Directory: 작업 디렉토리의 한 순간의 스냅샷이며 git add 명령을 사용하면 실제로 파일이 .git 폴더로 복사됩니다. 주의할 점은 스테이징 파일들이 이후에 리포지토리에 커밋하려는 최종 원고이라는 것입니다.

- Repository: commit 명령을 실행하면 리포지토리에 새로운 스냅샷이 생성됩니다. 이제 이 커밋의 SHA 해시를 사용하여 이 스냅샷을 가리킬 수 있습니다(스테이징 파일을 가리킬 수는 없으며 스테이징 파일은 종이 딱지 같은 역할을 합니다).



이제 git add 명령어를 구현해 봅시다.

git add에서 수행해야 할 단계는:

- 파일 내용 읽기
- 파일 내용을 해싱하기
- 해시를 파일 이름으로 사용하여 객체 폴더에 저장하기
- 파일이 이미 존재하는 경우 아무 작업도 수행하지 않습니다. 동일한 내용을 가진 파일이 10개 있다면(심지어 다른 파일 이름과 폴더 위치를 가지더라도), git은 그것들을 10번 복사하는 게 아니라 blob를 재사용할 수 있습니다.

또한, git은 해시의 처음 두 글자를 사용하여 폴더 이름을 생성합니다. 예를 들어, 해시가 4f9be057f0ea5d2ba72fd2c810e8d7b9aa98b469라면 git은 이 폴더에 저장합니다: 4f 및 나머지는 파일로 생성합니다: 9be057f0ea5d2ba72fd2c810e8d7b9aa98b469. 왜냐하면 시간이 지남에 따라 단일 폴더에 많은 파일이 있으면 파일에 액세스하는 데 시간이 더 오래 걸릴 수 있기 때문에 git은 폴더에 처음 두 글자를 사용함으로써 이 문제를 방지하려고 합니다.



```js
const fs = require("fs");
const crypto = require("crypto");

function add(filename) {
    try {
        // 파일이 존재하는지 확인
        fs.accessSync(filename);
        // 파일 읽기
        const content = fs.readFileSync(filename);
        // 파일 해싱
        const hash = crypto.createHash("sha1");
        hash.update(content);
        const sha = hash.digest("hex");
        // 해시의 첫 두 문자로 폴더 생성 (폴더가 없는 경우)
        if (!fs.existsSync(`.gitj/objects/${sha.slice(0, 2)}`)) {
            fs.mkdirSync(".gitj/objects/" + sha.slice(0, 2), { recursive: true });
        }
        if (fs.existsSync(`.gitj/objects/${sha.slice(0, 2)}/${sha.slice(2)}`)) {
            // 이미 같은 내용의 블롭이 존재함
            process.exit(0);
        }
        // 파일을 objects 폴더에 쓰기
        fs.writeFileSync(`.gitj/objects/${sha.slice(0, 2)}/${sha.slice(2)}`, content);
    } catch (error) {
        console.log(error);
        console.log(`파일 ${filename}이(가) 존재하지 않습니다.`);
        process.exit(1);
    }
}

add('./sample/src/readme.md')
```

add.js를 실행하여 소스 코드에서 파일을 추가한 후, 객체 저장소에 다음과 같은 파일이 생겼어야 합니다.

![이미지](/assets/img/2024-05-14-ImplementaSimpleVersionControlwithJavaScripttoUnderstandGitBetter_2.png)

# 변경사항을 커밋하세요!




커밋 자체도 객체 유형입니다. 아마도 예측하신 것처럼 우리의 객체 폴더에 더 많은 파일을 생성해야 합니다.

커밋의 목적은 현재 상황(파일 및 폴더)에 대한 포인터를 만들어 이 상태로 돌아올 수 있도록 하는 것입니다.

Git의 커밋 객체에는 다음 정보가 포함됩니다:

- 작성자: 변경사항을 만든 사람
- 커미터: 변경사항을 커밋한 사람 (때로는 다른 사람으로부터 패치를 받아 변경사항을 커밋해야 할 수도 있습니다.)
- 커밋일
- 커밋 메시지
- 트리 (작업 디렉토리의 모양을 생성 시점에 유지하는 또 다른 객체)
- 부모(존재하는 경우)



## Git Commit이 어떻게 보이는지 알아봅시다

만약 git log 명령어를 사용하면 커밋 해시 목록을 확인할 수 있고, 이 중 하나를 복사하여 git show --pretty=raw commitHash 명령어를 사용할 수 있습니다. 이 몤령어의 결과 예시는 다음과 같습니다(날짜는 커미터와 저자 이름 뒤의 타임스탬프로 표시됩니다):

![Git Commit](/assets/img/2024-05-14-ImplementaSimpleVersionControlwithJavaScripttoUnderstandGitBetter_3.png)

이 예제에서는 부모가 있지만, 만약 커밋이 모든 첫 번째 커밋이라면 부모가 없습니다.



부모가 커밋 객체 내에 존재하는 이유는 이러한 커밋들을 연결하여 연결할 수 있기 때문입니다. 따라서 우리가 과거의 커밋을 수동으로 변경하면 모든 커밋 해시를 다시 계산해야 하므로 모든 것이 엉망이 됩니다. 이는 리베이스와 같은 명령어를 사용하여 수행하는 작업입니다.

## Git에서 Tree 객체 유형은 무엇인가요?

폴더와 파일의 구조를 유지하는 객체 유형입니다. 예를 들어, 저가 보여준 커밋 예제에서 Tree 객체를 확인하고 내용을 볼 수 있습니다. Tree를 확인하려면 git ls-tree treeHash를 사용해야 합니다. 다음은 예시입니다:

![이미지](/assets/img/2024-05-14-ImplementaSimpleVersionControlwithJavaScripttoUnderstandGitBetter_4.png)



이것은 기본 트리입니다. 작업 디렉토리의 파일과 폴더를 포함하고 있습니다. 여기서 두 가지 다른 유형을 볼 수 있는데, 파일을 나타내는 blob과 이 경우 하위 폴더를 나타내는 다른 트리 객체를 가리키는 tree가 있습니다.

결과에서 두 번째 열은 객체의 유형, 세 번째 열은 SHA이며, 마지막 열은 파일 또는 폴더 이름입니다(파일 이름을 blob 밖에 유지하는 것은 동일한 내용을 반복해서 재사용하는 데 도움이 된다는 점을 이미 언급했습니다). 아직 알지 못하는 것은 첫 번째 열입니다. 첫 번째 열은 파일 모드입니다. 파일 모드는 객체의 유형 (예: blob, tree)과 해당 권한을 지정합니다. 040000 또는 100644와 같은 앞부분의 숫자는 8진수 표기법으로 파일 모드를 나타냅니다. 가장 일반적인 모드는 다음과 같습니다:

- 100644: 읽기-쓰기 권한이 있는 일반 파일 (blob)을 나타냅니다.
- 100755: 읽기-쓰기-실행 권한이 있는 실행 파일 (blob)을 나타냅니다.
- 040000: 디렉토리 (tree)를 나타냅니다.

커밋 기능을 구현하기 위해 필요한 조치:



- 현재 작업 디렉토리의 트리를 생성하세요
- 커밋 객체를 생성하세요
- 부모 커밋(Head)을 얻으세요. 만약 부모가 없다면 이 커밋 이후에 head(master)를 업데이트하세요.

우리는 git이 하는 방식과 동일한 파일 및 폴더 구조를 생성하는 간단한 트리를 만들 것입니다.

## 트리 생성 함수 구현!

각 파일의 파일 모드를 가져오는 작은 함수:



```js
async function getTreeFileMode(fileType, fileOrFolder) {
    const { mode } = await fs.stat(fileOrFolder);
    return fileType === 'tree' ? '040000' : '100' + ((mode & parseInt("777", 8)).toString(8));
}
```

파일의 해시 값을 가져오는 함수

```js
async function getHashOfFile(path) {
    const content = await fs.readFile(path);
    const hash = crypto.createHash("sha1");
    hash.update(content);
    const sha = hash.digest("hex");
    return sha;
}
```

이제 메인 함수입니다.



```js
async function createTreeObjectsFromPaths(folderPath) {
    let treeFileContent = '';
    let treeHash = ''
    // 이 함수의 설명:
    // 1- fs.readdir 결과를 반복한다.
    // 2- 만약 디렉토리라면 유형은 tree이고 이 함수를 재귀적으로 호출한다. 그렇지 않으면 파일 또는 blob이다.
    //    그리고 우리는 해시를 계산해야 한다.
    // 3- 우리는 트리 객체를 만들기 위해 파일 모드(040000, 100644, ...)를 가져온다.
    // 4- 트리 객체의 내용을 가지고 있다. 이제 해시를 생성할 수 있다.
    // 5- 객체(현재 트리의 해시)가 존재하면 아무것도 할 필요가 없고, 그렇지 않으면 객체를 만들어서 객체 폴더에 저장한다.

    // 이 함수를 실행해서 제대로 작동하는지 확인해봅시다:
}
```

이 함수를 실행해보고 정상적으로 작동하는지 확인해보겠습니다:



이제 폴더 구조는 이렇게 보입니다.

![Folder Structure](/assets/img/2024-05-14-ImplementaSimpleVersionControlwithJavaScripttoUnderstandGitBetter_5.png)

이제 `createTreeObjectsFromPaths('.')`를 실행합니다. 결과로 Gitj 폴더에 두 개의 새 객체가 생성됩니다:

![Result](/assets/img/2024-05-14-ImplementaSimpleVersionControlwithJavaScripttoUnderstandGitBetter_6.png)



이 중 하나의 객체 내용은 루트 폴더에 있는 package.json을 blob 유형으로 가지고 있을 것으로 예상되고 src 폴더를 가리키는 다른 tree 객체를 기대합니다:

![image 1](/assets/img/2024-05-14-ImplementaSimpleVersionControlwithJavaScripttoUnderstandGitBetter_7.png)

이 tree 커밋 해시는 이제 src 폴더의 구조를 저장하는 다른 객체를 가리킵니다:

![image 2](/assets/img/2024-05-14-ImplementaSimpleVersionControlwithJavaScripttoUnderstandGitBetter_8.png)



이제 커밋 기능을 구현할 시간입니다.

```js
const fs = require('fs').promises;
const crypto = require('crypto');
const { createTreeObjectsFromPaths, folderOrFileExist } = require('./tree');

async function commit(commitMessage) {
    const treeHash = await createTreeObjectsFromPaths('./sample');
    const parentHash = await getLatestCommitHash();
    const author = 'test';
    const committer = 'test';
    const commitDate = Date.now();
    const commitContent = `tree ${treeHash}\nparent ${parentHash}\nauthor ${author}\ncommitter ${committer}\ncommit date ${commitDate}\n${commitMessage}`;
    const hash = crypto.createHash("sha1");
    hash.update(commitContent);
    const commitHash = hash.digest("hex");
    // commit 객체를 objects 폴더에 작성합니다.
    if (!await folderOrFileExist(`.gitj/objects/${commitHash.slice(0, 2)}`)) {
        await fs.mkdir(`.gitj/objects/${commitHash.slice(0, 2)}`, { recursive: true });
    }
    if (await folderOrFileExist(`.gitj/objects/${commitHash.slice(0, 2)}/${commitHash.slice(2)}`)) {
        // 이미 동일한 내용의 커밋이 존재합니다.
        console.log(`.gitj/objects/${commitHash.slice(0, 2)}/${commitHash.slice(2)}`);
        return commitHash;
    }
    // 파일을 objects 폴더에 작성합니다.
    await fs.writeFile(`.gitj/objects/${commitHash.slice(0, 2)}/${commitHash.slice(2)}`, commitContent);
    // 현재 브랜치의 헤드를 커밋 해시로 설정합니다.
    await fs.writeFile('.gitj/refs/heads/master', commitHash);
    return commitHash;
}
```

어려운 부분은 트리 객체였는데, 이제 모든 데이터를 갖고 있고 이를 함께 묶어 새로운 커밋 객체를 만듭니다. 또한, 브랜치의 헤드를 업데이트하여 이 새로운 스냅샷을 가리키도록 해야 합니다 (당연히 커밋 해시).



## 마스터 브랜치 또는 메인 브랜치 또는 다른 브랜치가 무엇을 의미하죠?

브랜치는 단순히 커밋을 가리키는 참조 또는 책갈피입니다. 커밋의 구현에서 본 것처럼 파일 내용을 업데이트 했을 때 refs/head/master 와 같은 파일의 내용을 볼 수 있습니다. 그것은 단지 커밋 해시입니다. 이 커밋 해시에는 부모가 있을 수 있으며(첫 번째 커밋이 아닌 경우), 더 이상 커밋이 없을 때까지 과거로 돌아갈 수 있습니다. 즉, 이 브랜치 이름을 사용하여 최신 커밋(Head!)에 액세스할 수 있습니다. 간단히 말해, 특정 브랜치에 있는 것은 다른 head를 가리키고 있다는 것을 의미합니다.

blob에 파일 이름을 저장하지 않으므로, 파일 이름이 다르더라도 git이 blob을 사용할 수 있는 이점이 있습니다.

## Git Checkout를 어떻게 실행하나요?



이미 커밋 기능을 구현했으므로, 커밋에는 트리 객체(모든 폴더와 파일을 재귀적으로 가리킨다)에 접근할 수 있고, 파일은 .git(우리 경우 .gitj)에 blob으로 저장되어 있습니다. 따라서 먼저 작업 디렉토리를 제거한 다음 누군가가 다른 커밋(또는 브랜치 - 브랜치 헤드는 커밋 해시를 가리킨다)을 확인할 때 전체 디렉터리를 다시 만들어야 합니다. 하지만 먼저 커밋 해시 또는 브랜치 이름을 HEAD 파일에 저장해야 합니다.

그 전에, 해당 커밋의 트리 객체를 가져오는 작은 함수를 구현하고 싶습니다:

```js
async function getTreeHashFromCommit(commitHash) {
    const commitContent = await fs.readFile(`.gitj/objects/${commitHash.slice(0, 2)}/${commitHash.slice(2)}`, 'utf-8');
    const array = commitContent.split('\n').map(e=> e.split(' '))
    const elem = array.find(e => e[1] === 'tree');
    return elem[2];
};
```

이제 트리를 가지고 있으면 전체 폴더를 다시 만들어야 합니다:



먼저, 이 커밋을 HEAD 파일에 써서 헤드가 더 이상 마스터에 있지 않음을 기억합니다. 전체 폴더를 다시 만들기 위해 트리와 블롭을 재귀적으로 가져와야 합니다. 다음은 구현 내용입니다:

```js
async function convertTreeObject(treeHash, folderPrefix = '', files = []) {
    const treeObject = await fs.readFile(`.gitj/objects/${treeHash.slice(0, 2)}/${treeHash.slice(2)}`, 'utf-8');
    const array = treeObject.split('\n').map(e=> e.split(' '))
    for (const file of array) {
        if (!file || file.length < 2) continue;
        const [mode, type, hash, name] = file;
        if (type === 'tree') {
            await convertTreeObject(hash, folderPrefix + name + '/', files);
        } else {
            files.push({
                mode: mode,
                type: type,
                hash: hash,
                name: folderPrefix + name
            })
        }
    }
    return files;
}
```

만약 파일이 있다면 파일의 이름과 블롭(파일의 내용)을 배열에 추가합니다. 객체 타입이 tree이면 이것이 폴더라는 것이고, 이 함수를 재귀적으로 호출하여 올바른 파일 경로를 생성하기 위해 부모 폴더의 경로를 전달해야 합니다.



## 앞으로 구현하고 싶은 몇 가지 기능

- Git 상태 확인
- Git 차이 확인

# 결론

우리는 git이 히스토리를 추적할 수 있는 능력을 제공하기 위해 해시 및 커밋 해시 체인을 사용하는 방법을 배웠습니다. 개인적으로는 이런 식의 심층적인 탐구가 내용을 정말 잘 배우는 가장 좋은 방법이라고 생각합니다. 유용했기를 바랍니다. 만약 git에 더 많은 기능을 구현하는 데 관심이 있다면 이 GitHub 저장소를 확인해보세요.



# 참고 자료

- [CS50 YouTube 영상](https://www.youtube.com/watch?v=lG90LZotrpo&ab_channel=CS50)
- [유튜브의 인코드된 비디오](https://www.youtube.com/watch?v=P6jD966jzlk&pp=ygUgR2l0IGludGVybmFscyBob3cgaXQgc3RvcmVzIGRhdGE%3D)
- [GOTO Conferences YouTube 채널](https://www.youtube.com/watch?v=dBSHLb1B8sw&ab_channel=GOTOConferences)



https://www.youtube.com/watch?v=52MFjdGH20o&ab_channel=Brief