---
title: "도커 없이 Optimism 노드 실행하는 방법"
description: ""
coverImage: "/assets/img/2024-05-17-RunningOptimismNodewithoutDocker_0.png"
date: 2024-05-17 03:55
ogImage: 
  url: /assets/img/2024-05-17-RunningOptimismNodewithoutDocker_0.png
tag: Tech
originalTitle: "Running Optimism Node without Docker"
link: "https://medium.com/@hiroyukinaito.eth/draft-running-optimism-node-without-docker-cb65fa9f780d"
isUpdated: true
---





![Optimism node](/assets/img/2024-05-17-RunningOptimismNodewithoutDocker_0.png)

Optimism 노드를 설치하는 것은 매우 간단합니다. 다른 슈퍼체인과 달리 많은 설정이 기본값으로 설정되어 있기 때문입니다.

그래서 Docker 없이 스냅 동기화 모드로 Optimism 노드를 실행하는 방법을 설명하겠습니다. "Docker 없이 베이스 노드 실행하기: 파트 2"에서 파생된 글입니다.

본 문서에서는 다음과 같은 설정을 하게 됩니다:


<div class="content-ad"></div>

- `/etc/environment`에 환경 변수 설정하기
- op-node 및 op-geth용 systemd 파일 생성하기
- op-node 및 op-geth 로그를 보존하기 위한 rsyslog 구성 파일 생성하기
- op-node 및 op-geth용 로그 회전 파일 생성하기

# 1. op-node 및 op-geth 설치하기

다음 단계로 진행하기 전에 "Running Base Node without Docker: Part 1" 글을 참고하여 op-geth와 op-node를 설치해야 합니다.

# 2. `/etc/environment`에 Optimism 노드 환경 변수 추가 및 데이터 디렉토리 생성

<div class="content-ad"></div>

## 2–1. 당신의 노드에 `/etc/environment` 파일에 다음 템플릿을 추가해주세요.

```js
##########################
#### OPTIMISM SETTING ####
##########################
OP_GETH_SEQUENCER_HTTP=https://mainnet-sequencer.optimism.io
# [필수] 선호하는 L1 노드 RPC URL로 변경해주세요:
OP_NODE_L1_ETH_RPC=[귀하의 L1 ETH RPC]
# [필수] 선호하는 L1 CL 비컨 엔드포인트로 변경해주세요:
OP_NODE_L1_BEACON=[귀하의 L1 BEACON RPC]
# [필수] 공용 IP 주소로 변경해주세요:
OP_NODE_P2P_ADVERTISE_IP=[귀하의 공용 IP 주소]
OP_NODE_BETA_EXTRA_NETWORKS=true
OP_NODE_L2_ENGINE_AUTH=/home/ethereum/data/engine-auth-jwt
OP_NODE_L2_ENGINE_RPC=ws://localhost:8551
OP_NODE_LOG_LEVEL=info
OP_NODE_METRICS_ADDR=0.0.0.0
OP_NODE_METRICS_ENABLED=true
OP_NODE_METRICS_PORT=7300
OP_NODE_NETWORK=op-mainnet
OP_NODE_P2P_LISTEN_IP=0.0.0.0
OP_NODE_P2P_LISTEN_TCP_PORT=9001
OP_NODE_P2P_LISTEN_UDP_PORT=9001
OP_NODE_P2P_PRIV_PATH=/home/ethereum/data/opnode_p2p_priv.txt
OP_NODE_P2P_DISCOVERY_PATH=/home/ethereum/data/opnode_discovery_db
OP_NODE_P2P_PEERSTORE_PATH=/home/ethereum/data/opnode_peerstore_db
OP_NODE_RPC_ADDR=0.0.0.0
OP_NODE_RPC_PORT=8547
OP_NODE_SNAPSHOT_LOG=/home/ethereum/data/op-node-snapshot-log
OP_NODE_VERIFIER_L1_CONFS=4
OP_NODE_ROLLUP_LOAD_PROTOCOL_VERSIONS=true
OP_NODE_SYNCMODE=execution-layer
# OP_NODE_L1_TRUST_RPC 는 더 빠른 동기화를 지원하지만, 사용 시 반드시 L1 RPC 노드가 완전히 신뢰성 있는 경우에만 사용해야 합니다.
# 또한 이는 저장 증명을 지원하지 않는 Erigon과 같은 클라이언트와 함께 작동할 수 있도록 합니다:
OP_NODE_L1_TRUST_RPC=true
GETH_DATA_DIR=/home/ethereum/data
VERBOSITY=3
RPC_PORT=8545
WS_PORT=8546
AUTHRPC_PORT=8551
METRICS_PORT=6060
HOST_IP="0.0.0.0"
P2P_PORT=30304
OP_GETH_GCMODE=full
OP_GETH_SYNCMODE=snap
```

## 2–2. 당신의 네트워크에 대한 값 변경하기

아래 세 가지 변수를 변경해야 합니다.

<div class="content-ad"></div>

OP_NODE_L1_ETH_RPC: 귀하의 L1 노드 (이더리움) RPC URL 또는 L1 PRC 노드 공급 업체 URL입니다.

- 예시 (게속 RPC)

```js
OP_NODE_L1_ETH_RPC=http://192.168.1.2:8545
```

OP_NODE_L1_BEACON: 귀하의 L1 노드 (이더리움) Beacon RPC URL 또는 L1 Beacon 노드 공급 업체 URL입니다.

<div class="content-ad"></div>

- 예시 (등대 비콘 rpc)

```js
OP_NODE_L1_BEACON=http://192.168.1.2:5052
```

OP_NODE_P2P_ADVERTISE_IP: 공용 IP 주소(개인 IP 주소가 아닙니다!)

- 예시

<div class="content-ad"></div>

```js
OP_NODE_P2P_ADVERTISE_IP=34.149.58.211
```

참고:
공개 IP 주소를 모르는 경우 노드에서 다음 명령을 사용하여 찾을 수 있습니다.

```js
$ curl http://api.ipify.org
34.149.58.211
```

(선택 사항) 다른 P2P 포트를 사용하거나 L1 RPC를 신뢰하지 않는 경우 환경에 맞게 변경해야 합니다.

<div class="content-ad"></div>

```js
P2P_PORT=30304 # op-geth용 P2P 포트
OP_NODE_P2P_LISTEN_TCP_PORT=9001 # op-node용 TCP P2P 수신 포트
OP_NODE_P2P_LISTEN_UDP_PORT=9001 # op-node용 UDP P2P 수신 포트
OP_NODE_L1_TRUST_RPC=true # L1 RPC를 신뢰하는 경우 true로 설정합니다.
```

위의 변경 사항을 기반으로 예시 /etc/environment 파일은 다음과 같습니다:

```js
sudo vim /etc/environments
```

```js
PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin"

##########################
#### OPTIMISM 설정 ####
##########################
OP_GETH_SEQUENCER_HTTP=https://mainnet-sequencer.optimism.io
# [필수] 선호하는 L1 노드 RPC URL로 교체:
OP_NODE_L1_ETH_RPC=http://192.168.1.2:8545
# [필수] 선호하는 L1 CL beacon 엔드포인트로 교체:
OP_NODE_L1_BEACON=http://192.168.1.2:5052
# 공인 IP 주소로 교체
OP_NODE_P2P_ADVERTISE_IP=34.149.58.211
OP_NODE_BETA_EXTRA_NETWORKS=true
OP_NODE_L2_ENGINE_AUTH=/home/ethereum/data/engine-auth-jwt
OP_NODE_L2_ENGINE_RPC=ws://localhost:8551
OP_NODE_LOG_LEVEL=info
OP_NODE_METRICS_ADDR=0.0.0.0
OP_NODE_METRICS_ENABLED=true
OP_NODE_METRICS_PORT=7300
OP_NODE_NETWORK=op-mainnet
OP_NODE_P2P_LISTEN_IP=0.0.0.0
OP_NODE_P2P_LISTEN_TCP_PORT=9001
OP_NODE_P2P_LISTEN_UDP_PORT=9001
OP_NODE_P2P_PRIV_PATH=/home/ethereum/data/opnode_p2p_priv.txt
OP_NODE_P2P_DISCOVERY_PATH=/home/ethereum/data/opnode_discovery_db
OP_NODE_P2P_PEERSTORE_PATH=/home/ethereum/data/opnode_peerstore_db
OP_NODE_RPC_ADDR=0.0.0.0
OP_NODE_RPC_PORT=8547
OP_NODE_SNAPSHOT_LOG=/home/ethereum/data/op-node-snapshot-log
OP_NODE_VERIFIER_L1_CONFS=4
OP_NODE_ROLLUP_LOAD_PROTOCOL_VERSIONS=true
OP_NODE_SYNCMODE=execution-layer

# OP_NODE_L1_TRUST_RPC를 사용하면 더 빠른 동기화가 가능하지만, L1 RPC 노드를
# 완전히 신뢰하는 경우에만 사용해야 합니다.
# 또한 storage proofs를 지원하지 않는 Erigon과 같은 클라이언트와 상호 작용하도록 합니다:
OP_NODE_L1_TRUST_RPC=true

OP_NODE_SYNCMODE=execution-layer
GETH_DATA_DIR=/home/ethereum/data
VERBOSITY=3
RPC_PORT=8545
WS_PORT=8546
AUTHRPC_PORT=8551
METRICS_PORT=6060
HOST_IP="0.0.0.0"
P2P_PORT=30304
OP_GETH_GCMODE=full
OP_GETH_SYNCMODE=snap
```


<div class="content-ad"></div>

## 2-3. 블록체인 데이터를 보존하기 위한 data 디렉토리 생성

```js
$ cd ~
$ mkdir data
```

당신의 환경에 기반하여 Optimism 노드 환경 변수를 성공적으로 설정하셨습니다.

# 3. op-node systemd 파일 생성

<div class="content-ad"></div>

```bash
$ sudo touch /etc/systemd/system/op-node.service
$ sudo vim /etc/systemd/system/op-node.service
```

다음 내용을 붙여넣고 저장하세요.

```bash
[Unit]
Description=Optimistic Node Client
After=network.target

[Service]
User=ethereum
Group=ethereum
Environment=HOME=/home/ethereum
EnvironmentFile=/etc/environment
Type=simple
ExecStart=/usr/bin/op-node
KillMode=process
KillSignal=SIGINT
TimeoutStopSec=90
Restart=on-failure
RestartSec=10s
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=op-node

[Install]
WantedBy=multi-user.target
```

op-node systemd 파일을 성공적으로 생성했습니다.

<div class="content-ad"></div>

# 4. op-geth systemd 파일 만들기

```js
$ sudo touch /etc/systemd/system/op-geth.service
$ sudo vim /etc/systemd/system/op-geth.service
```

다음 내용을 붙여 넣고 저장하세요.

```js
[Unit]
Description=옵티미즘 Go-이더리움 클라이언트
After=network.target

[Service]
User=ethereum
Group=ethereum
Environment=HOME=/home/ethereum
EnvironmentFile=/etc/environment
Type=simple
ExecStart=/usr/bin/op-geth --datadir="${GETH_DATA_DIR}" \
--verbosity="${VERBOSITY}" \
--http --http.corsdomain="*" \
--http.vhosts="*" \
--http.addr=0.0.0.0 \
--http.port="${RPC_PORT}" \
--http.api=web3,debug,eth,net,engine \
--authrpc.addr=0.0.0.0 \
--authrpc.port="${AUTHRPC_PORT}" \
--authrpc.vhosts="*" \
--authrpc.jwtsecret="${OP_NODE_L2_ENGINE_AUTH}" \
--ws \
--ws.addr=0.0.0.0 \
--ws.port="${WS_PORT}" \
--ws.origins="*" \
--ws.api=debug,eth,net,engine \
--metrics \
--metrics.addr=0.0.0.0 \
--metrics.port="${METRICS_PORT}" \
--syncmode="${OP_GETH_SYNCMODE}" \
--gcmode="${OP_GETH_GCMODE}" \
--maxpeers=100 \
--nat=extip:${HOST_IP} \
--rollup.sequencerhttp="${OP_GETH_SEQUENCER_HTTP}" \
--rollup.halt=major \
--op-network="${OP_NODE_NETWORK}" \
--port="${P2P_PORT}" \
--rollup.disabletxpoolgossip=true \
--state.scheme=path

KillMode=process
KillSignal=SIGINT
TimeoutStopSec=90
Restart=on-failure
RestartSec=10s
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=op-geth

[Install]
WantedBy=multi-user.target
```

<div class="content-ad"></div>

테이블 태그를 마크다운 형식으로 변경해주세요.

# 5. 로그 보존을 위한 rsyslog 구성 파일 생성

## 5-1. op-node rsyslog 구성 파일

```js
$ sudo touch /etc/rsyslog.d/24-op-node.conf
$ sudo vim /etc/rsyslog.d/24-op-node.conf
```

<div class="content-ad"></div>

아래 설정을 붙여넣고 저장하세요.

```js
if $programname == 'op-node' then /var/log/op-node.log
if $programname == 'op-node' then ~
```

## 5-2. op-geth rsyslog 구성 파일

<div class="content-ad"></div>


$ sudo touch /etc/rsyslog.d/25-op-geth.conf
$ sudo vim /etc/rsyslog.d/25-op-geth.conf


참고:
선호하는 파일 이름으로 변경해주세요.

다음 설정을 붙여넣고 저장하세요.


if $programname == 'op-geth' then /var/log/op-geth.log
if $programname == 'op-geth' then ~


<div class="content-ad"></div>

## 5-3. rsyslog 데몬 재시작

```js
$ sudo systemctl restart rsyslog
```

## 6. 로그 회전 구성 파일 생성

로그를 회전하지 않으면 많은 디스크 공간을 사용하므로 로그 회전을 설정해야 합니다.

<div class="content-ad"></div>

```shell
$ sudo touch /etc/logrotate.d/op-client
$ sudo vim /etc/logrotate.d/op-client
```

노트:
원하시는 이름으로 파일 이름을 변경하세요.

다음 설정을 붙여넣고 저장하세요.

```shell
/var/log/op-node.log
/var/log/op-geth.log
{
        rotate 4
        weekly
        missingok
        notifempty
        compress
        delaycompress
        sharedscripts
        postrotate
                [ -x /usr/lib/rsyslog/rsyslog-rotate ] && /usr/lib/rsyslog/rsyslog-rotate || true
        endscript
}
```

<div class="content-ad"></div>

# 7. 옵티미즘 노드 실행하기

축하합니다! 드디어 옵티미즘 노드를 실행할 시간이 왔습니다.

## 7-1. op-node 실행

<div class="content-ad"></div>

```js
$ sudo systemctl enable op-node
$ sudo systemctl start op-node
$ sudo systemctl status -l op-node
● op-node.service - Optimistic Node Client
     Loaded: loaded (/etc/systemd/system/op-node.service; disabled; vendor preset: enabled)
     Active: active (running) since Wed 2024-05-08 20:32:32 JST; 16h ago
   Main PID: 259669 (op-node)
      Tasks: 16 (limit: 18542)
     Memory: 786.9M
     CGroup: /system.slice/op-node.service
             └─259669 /usr/bin/op-node
```

## 7–2. op-geth 실행하기

```js
$ sudo systemctl enable op-geth
$ sudo systemctl start op-geth
$ sudo systemctl status -l op-geth
● op-geth.service - Optimism Go-ethereum client
     Loaded: loaded (/etc/systemd/system/op-geth.service; disabled; vendor preset: enabled)
     Active: active (running) since Wed 2024-05-08 20:36:22 JST; 16h ago
   Main PID: 259742 (op-geth)
      Tasks: 37 (limit: 18542)
     Memory: 13.8G
     CGroup: /system.slice/op-geth.service
             └─259742 /usr/bin/op-geth --datadir=/home/ethereum/data --verbosity=3 --http --http.corsdomain=* --http.vhosts=* --http>
```

## 7–3. 로그 확인하기
  

<div class="content-ad"></div>

다음 명령어를 사용하여 로그를 확인할 수 있어요:

```js
$ sudo tail -f /var/log/op-geth.log
$ sudo tail -f /var/log/op-node.log
```

성공적으로 실행하면, op-node와 op-geth에서 다음과 같은 로그가 기록될 거예요:

- Left (op-node), Right (op-geth)

<div class="content-ad"></div>


![image 1](/assets/img/2024-05-17-RunningOptimismNodewithoutDocker_1.png)

Roughly within 20 hours, op-geth will complete syncing with snap mode, as shown in the following image.

![image 2](/assets/img/2024-05-17-RunningOptimismNodewithoutDocker_2.png)

- Synced Example


<div class="content-ad"></div>

<img src="https://miro.medium.com/v2/resize:fit:1400/1*YTH6tEbhxERWqcUMkOsJxw.gif" />
## 7-4. 동기화 여부 확인

다음 명령어를 사용하여 공개 Optimism 노드 블록 번호와 귀하의 Optimism 노드 블록 번호를 비교할 수 있습니다.

- 공개 Optimism 노드에서 최신 블록 번호 가져오기

<div class="content-ad"></div>


```js
$ curl -sX POST -H "Content-Type: application/json" \
-d '{"jsonrpc": "2.0", "method": "eth_blockNumber", "params": [], "id":1}' \
https://mainnet.optimism.io/ \
| jq -r ".result" | printf "%d\n" $(cat -)
```

- 로컬 노드에서 최신 블록 번호 가져오기

```js
$ curl -sX POST -H "Content-Type: application/json" \
-d '{"jsonrpc": "2.0", "method": "eth_blockNumber", "params": [], "id":1}' \
http://localhost:8545/ \
| jq -r ".result" | printf "%d\n" $(cat -)
```

- 출력 예시


<div class="content-ad"></div>

<img src="/assets/img/2024-05-17-RunningOptimismNodewithoutDocker_3.png" />

# 첨부 1: 데이터 축소 시나리오

만약 노드가 제대로 중지되지 않거나 갑작스럽게 정전이 발생하면 데이터가 손상될 수 있습니다. 데이터 디렉토리를 삭제하여 깨끗한 상태로 다시 시작할 수 있습니다.

```js
$ sudo systemctl stop op-node
$ sudo systemctl stop op-geth
$ cd ~
$ rm -Rf ./data
$ mkdir ./data
$ sudo systemctl start op-node
$ sudo systemctl start op-geth
```

<div class="content-ad"></div>

# 부록 2: 사용자 정의

Optimism 환경 변수를 기반으로 사용자 정의를 원하시는 경우, Optimism 노드 구성 참조를 참고하십시오.

# 부록 3: CPU, 메모리 및 디스크 사용률

## A3–1. CPU 사용량

<div class="content-ad"></div>

Rock 5B에서 작동하는 Rockchip RK3588은 비용 효율적이고 겸손한 8코어 CPU입니다. 스냅 동기화 모드를 사용하는 Optimism 노드는 최대 사용량이 800%인 RK3588의 용량을 200%에서 300% 소비합니다.

참고:
이 글을 쓴 기본 노드보다 CPU를 더 많이 사용합니다.

```js
$ top -p $(pgrep op-geth)  -p $(pgrep op-node)
```

<img src="/assets/img/2024-05-17-RunningOptimismNodewithoutDocker_4.png" />

<div class="content-ad"></div>

## A3-2. 메모리 사용량

```js
$ free -h
              total        used        free      shared  buff/cache   available
Mem:           15Gi       7.2Gi       498Mi       8.0Mi       7.7Gi       8.0Gi
Swap:            0B          0B          0B
```

## A3-3. 디스크 사용량

지금은 2024년 5월 16일이며, --state.scheme=path 옵션을 사용한 스냅 동기화 모드는 지금까지 404 GB만 소비되었습니다. 따라서 1 TB 미만의 SSD로도 노드를 실행할 수 있습니다.

<div class="content-ad"></div>


$ du -sh ~/data
404G    /home/ethereum/data


# 소감

옵티미즘 노드를 Docker 없이 구축해주신 여정에 대해 감사드립니다. 옵티미즘 노드 설치는 많은 단계가 필요하지만, 도커 환경보다는 더 많은 사용자 정의가 제공됩니다. 동일한 L1 노드나 다른 L2, L3 솔루션에서 실행하더라도 각 포트 설정을 유연하게 변경할 수 있습니다. 이 설정들에 대한 오류를 발견하거나 개선 제안이 있으시면 소중한 피드백 주시기를 부탁드리며, 더 나은 분산화를 위해 개선사항을 지속적으로 반영할 수 있습니다.
