---
title: "ROS2에서 NVIDIA Jetson Nano에 RPLIDAR를 이용한 친절한 Cartographer 설정"
description: ""
coverImage: "/assets/img/2024-05-16-ROS2HumbleCartographeronNVIDIAJetsonNanowithRPLIDAR_0.png"
date: 2024-05-16 04:13
ogImage: 
  url: /assets/img/2024-05-16-ROS2HumbleCartographeronNVIDIAJetsonNanowithRPLIDAR_0.png
tag: Tech
originalTitle: "ROS2 Humble Cartographer on NVIDIA Jetson Nano with RPLIDAR"
link: "https://medium.com/@kabilankb2003/ros2-humble-cartographer-on-nvidia-jetson-nano-with-rplidar-c0dea4480b78"
---


![image](/assets/img/2024-05-16-ROS2HumbleCartographeronNVIDIAJetsonNanowithRPLIDAR_0.png)

소개:

ROS2 (로봇 운영 시스템 2)는 로봇 공학 분야를 혁신시킨 프레임워크로, 유연하고 강력한 기능을 제공합니다. 이 블로그 게시물에서는 인기 있는 싱글 보드 컴퓨터인 NVIDIA Jetson Nano에서 ROS2를 사용하여 카토그래퍼를 설정하는 방법과 RPLIDAR를 이용한 맵핑 작업에 대해 살펴볼 것입니다.

NVIDIA Jetson Nano에 ROS2 설정하기:



카토그래퍼 설정에 도입되기 전에, NVIDIA Jetson Nano에 ROS2가 적절히 설치되었는지 확인하고 작업 공간을 설정하고 모든 종속성이 충족되었는지 확인합시다.

```js
sudo apt install ros-humble-cartographer
```

RPLIDAR를 소개합니다:

RPLIDAR는 매핑 및 내비게이션을 위해로봇학에서 널리 사용되는 저가격 LIDAR 센서입니다. 가벼운 디자인과 저렴한 가격으로 취미로봇 및 소규모 로봇 프로젝트에 이상적인 선택지입니다. 우리는 RPLIDAR를 USB로 Jetson Nano에 연결하고 매핑 응용 프로그램에 통합하기 위해 ROS2와 통합할 것입니다.



RPLIDAR 설정을 시작해 보세요:

Github에서 rplidar 드라이버를 복제하세요.


https://github.com/Slamtec/sllidar_ros2.git


포트를 확인하고 활성화하세요.



```bash
ls -l /dev |grep ttyUSB

sudo chmod 666 /dev/ttyUSB0
```

Cartographer 구성:

카토그래퍼는 Google에서 개발한 강력한 오픈 소스 SLAM(Simultaneous Localization and Mapping) 라이브러리입니다. 우리는 ROS2 및 Jetson Nano에서 RPLIDAR 센서와 함께 카토그래퍼를 구성할 것입니다. 이는 센서 구성을 정의하고 매개변수를 조정하며 매핑 워크플로우를 설정하는 작업을 수행합니다.

매개변수 튜닝하기




```js
-- 2016년 카티그래퍼 저작권
--
-- Apache 라이선스 2.0 하에 라이선스가 부여됨
-- 라이선스를 준수하는 경우에만이 파일을 사용할 수 있습니다.
-- 라이선스 사본은 다음 위치에서 확인할 수 있습니다.
--
--      http://www.apache.org/licenses/LICENSE-2.0
--
-- 관련 법률에 의해 필요한 경우나 합의된 경우를 제외하고
-- 라이선스에 따라 배포되는 소프트웨어는 "있는 그대로"제공 됨
-- 보증이나 어떠한 종류의 조건도 없이.
-- 특정 언어에 대한 허가증을 위한 라이선스를 참조하고
-- 제한 사항은 라이선스 하에 지배하는 권한 및
-- 조건.

맵 빌더 설정:
- map_builder 를 MAP_BUILDER로 설정
- trajectory_builder 를 TRAJECTORY_BUILDER로 설정
- map_frame 은 "map"
- tracking_frame 은 "base_link"
- published_frame 은 "base_link"
- odom_frame 은 "odom"
- provide_odom_frame 을 true로 설정
- publish_frame_projected_to_2d 를 true로 설정
- use_odometry 를 false로 설정
- use_nav_sat 를 false로 설정
- use_landmarks 를 false로 설정

TRAJECTORY_BUILDER_2D 파라미터:
- min_range 와 max_range: 센서 특성 및 환경에 따라 성능을 향상시킬 수 있음
- missing_data_ray_length: 누락된 데이터를 처리하기 위해 적절히 설정해야 함
- use_imu_data: 시스템이 신뢰할 수 있고 IMU 데이터를 가지고 있다면, 이 값을 true로 설정하여 움직임 추정을 더 잘 할 수 있음

IMU 인터페이스가 필요하다면 이 블로그를 참고하세요
```



https://medium.com/@kabilankb2003/ros2-humble-mpu6050-imu-sensor-interface-for-nvidia-jetson-nano-c4d616647ee5

- use_online_correlative_scan_matching: 실시간 성능 요구 사항에 따라 토글할 수 있습니다.

실시간 Correlative Scan Matcher 매개변수:

- linear_search_window: 이 매개변수는 검색 창의 크기를 정의합니다. 조심히 조정하면 정확도를 희생하지 않고 일치 속도를 향상시킬 수 있습니다.
- translation_delta_cost_weight 및 rotation_delta_cost_weight: 이러한 가중치는 스캔 매칭 중 번역 및 회전을 균형있게 조정합니다. 세심하게 조정하면 성능을 향상시킬 수 있습니다.



움직임 필터 매개변수:

- max_angle_radians: 연속 스캔 간의 예상 최대 방향 변경에 따라 설정합니다.

포즈 그래프 최적화 매개변수:

- min_score 매개변수 in constraint_builder: 이를 조정하여 잘못된 제약 조건을 걸러내는 데 도움이 될 수 있습니다.
- huber_scale: 이는 최적화의 견고성에 영향을 미칩니다. 더 큰 값은 이상 값 제약 조건을 거부하는 데 도움이 될 수 있습니다.
- optimize_every_n_nodes: 포즈 그래프 최적화의 빈도를 균형있게 조절합니다. 계산 리소스와 매핑 요구 사항에 따라 조정하세요.



RPLIDAR을 실행하세요.

![image](/assets/img/2024-05-16-ROS2HumbleCartographeronNVIDIAJetsonNanowithRPLIDAR_1.png)

파라미터 및 런치 파일 구성 후 카토그래퍼 노드를 실행하세요.

카토그래퍼가 구성되면, Jetson Nano에서 매핑 노드를 실행할 거에요. 이 노드는 RPLIDAR 센서로부터 데이터를 구독하고, 실시간 SLAM 알고리즘을 수행하여 환경의 2D 지도를 생성할 거에요. 우리는 Cartographer가 제공하는 다양한 매핑 전략과 옵션을 탐색하여 매핑 성능을 최적화할 거에요.




![image](/assets/img/2024-05-16-ROS2HumbleCartographeronNVIDIAJetsonNanowithRPLIDAR_2.png)

Then launch rviz

![image](/assets/img/2024-05-16-ROS2HumbleCartographeronNVIDIAJetsonNanowithRPLIDAR_3.png)

Enable the map in topic





![TF Tranform](https://miro.medium.com/v2/resize:fit:1400/1*M10X6RQLyhSEk521t2-X9g.gif)

Cartographer Mapping




이미지:

![이미지](https://miro.medium.com/v2/resize:fit:1400/1*1Dumd45ScQu5y1a55SV4Vg.gif)

결론:

이 블로그 포스트에서는 NVIDIA Jetson Nano에서 ROS2를 사용하여 RPLIDAR 센서를 사용한 겸손한 지도 작성기를 설정하는 방법을 보여주었습니다. ROS2 및 Cartographer와 같은 오픈 소스 도구를 활용하여 취미로 로봇공학 및 로보틱스 열렬가들이 저렴한 하드웨어 플랫폼에서 복잡한 매핑 시스템을 구축할 수 있습니다. 로봇공학을 취미로 삼고 있거나 실제 응용 프로그램을 위한 솔루션을 개발하고 있다면, ROS2와 Jetson Nano는 매핑 및 내비게이션 작업에 대해 매력적인 조합을 제공합니다.