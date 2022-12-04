# GraduationApplication

# 첫 시작(setting)
[공식문서](https://reactnative.dev/)
- 초기 세팅: [반드시 따라하기](https://reactnative.dev/docs/environment-setup)
- java 17 버전 설치하면 안 됨(11버전 설치할 것), 환경 변수 설정도 잘 해 놓을 것(JAVA_HOME)
- Android SDK 29 이상
- [adb](https://developer.android.com/studio/releases/platform-tools) 설치 필요, ANDROID_HOME 환경변수도
- [m1 mac용 설정](https://qnrjs42.blog/react-native/m1-arm64-setting)
- [읽어보면 좋은 벨로퍼트님의 글](https://ridicorp.com/story/react-native-1year-review/)

```shell
(프로젝트를 만들고자 하는 폴더로 이동)
npm i -g react-native (안 해도 됨)
npx react-native init GraduationApplication --template react-native-template-typescript
```

설치 시 마지막에 다음 에러가 나오면 cd ./ParkingProject/ios && pod install 입력할 것
```
error Error: Failed to install CocoaPods dependencies for iOS project, which is required by this template.
Please try again manually: "cd ./FoodDeliveryApp/ios && pod install".
```

```shell
cd ParkingProject # 폴더로 이동
yarn android # 안드로이드 실행 명령어
yarn ios # 아이폰 실행 명령어
```

**잠깐!!**

yarn 설치는
```shell
npm i -g yarn
```

서버가 하나 뜰 것임. Metro 서버. 여기서 서버가 안 뜨고 No device 등의 에러 메시지가 뜬다면 에뮬레이터 실행한 채로 다시 명령어 입력할 것.
Metro 서버에서 소스 코드를 컴파일하고 앱으로 전송해줌. 기본 8081포트.
메트로 서버가 꺼져있다면 터미널을 하나 더 열어
```shell
yarn start
```
