# FM - 식단 관리 앱

## 📱 프로젝트 개요
FM은 React Native와 Expo를 기반으로 개발된 개인 식단 관리 모바일 애플리케이션입니다. 사용자의 칼로리 섭취를 추적하고 건강한 식습관을 도와주는 기능을 제공합니다.

## 🚀 주요 기능
- **칼로리 추적**: 일일 권장 칼로리와 섭취 칼로리를 실시간으로 확인
- **식단 등록**: 아침, 점심, 저녁 식사를 분류하여 기록
- **다국어 지원**: 한국어, 영어, 일본어, 중국어, 독일어 지원
- **사용자 인증**: 일반 로그인 및 카카오 로그인 지원
- **개인화된 대시보드**: 사용자별 맞춤형 정보 제공

## 🏗️ 기술 스택
- **Frontend**: React Native 0.72.6
- **프레임워크**: Expo ~49.0.15
- **내비게이션**: React Navigation 6.x
- **상태 관리**: React Context API
- **데이터베이스**: SQLite
- **UI 라이브러리**: Native Base
- **언어**: JavaScript, TypeScript

## 📁 프로젝트 구조
```
app_pre_capstone-main/
├── App.js                    # 메인 앱 엔트리 포인트
├── Navigation.js             # 네비게이션 설정
├── package.json              # 의존성 및 스크립트 정의
├── app.json                  # Expo 앱 설정
├── babel.config.js           # Babel 설정
├── metro.config.ts           # Metro 번들러 설정
├── tsconfig.json             # TypeScript 설정
├── android/                  # Android 네이티브 코드
├── assets/                   # 이미지, 폰트 등 리소스
│   ├── 1.ttf                # 커스텀 폰트
│   ├── 3.png                # 앱 아이콘/로고
│   └── ...                  # 기타 이미지 파일들
└── screens/                  # 화면 컴포넌트들
    ├── FoodContext.js        # 글로벌 상태 관리
    ├── splash.js             # 스플래시/로그인 화면
    ├── signin.js             # 로그인 화면
    ├── signup.js             # 회원가입 화면
    ├── kakaoLogin.js         # 카카오 로그인
    ├── screen1.js            # 메인 대시보드
    ├── screen2.js            # 식단 관리 화면
    ├── screen3.js            # 상세 정보 화면
    ├── screen4.js            # 설정 화면
    ├── screen5.js            # 추가 기능 화면
    ├── total.js              # 종합 정보 화면
    ├── mealtype.js           # 식사 유형 선택
    ├── foodlist.js           # 음식 목록
    ├── ko.js                 # 한국어 지역화
    ├── ja.js                 # 일본어 지역화
    ├── ch.js                 # 중국어 지역화
    ├── de.js                 # 독일어 지역화
    └── wes.js                # 서양 음식 관련
```

## 📋 주요 의존성
- **@react-navigation/native**: 네비게이션 관리
- **@react-navigation/stack**: 스택 네비게이션
- **@react-navigation/bottom-tabs**: 하단 탭 네비게이션
- **expo-sqlite**: 로컬 데이터베이스
- **axios**: HTTP 클라이언트
- **react-native-calendars**: 캘린더 UI
- **expo-image-picker**: 이미지 선택 기능
- **native-base**: UI 컴포넌트 라이브러리

## 🛠️ 설치 및 실행

### 필수 요구사항
- Node.js (v14 이상)
- Expo CLI
- Android Studio (Android 개발용)
- Xcode (iOS 개발용)

### 설치 과정
1. 저장소 클론
```bash
git clone [repository-url]
cd app_pre_capstone-main
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 시작
```bash
npm start
# 또는
expo start
```

4. 플랫폼별 실행
```bash
# Android
npm run android
# 또는
expo run:android

# iOS
npm run ios
# 또는
expo run:ios

# 웹
npm run web
# 또는
expo start --web
```

## 📱 화면 구성
1. **스플래시 화면** (`splash.js`) - 로그인 및 초기 화면
2. **회원가입** (`signup.js`) - 새 사용자 등록
3. **메인 대시보드** (`screen1.js`) - 칼로리 정보 및 식단 등록
4. **식단 관리** (`screen2.js`) - 식사 기록 관리
5. **상세 정보** (`screen3.js`) - 영양 정보 상세 보기
6. **설정** (`screen4.js`) - 앱 설정 및 사용자 정보
7. **카카오 로그인** (`kakaoLogin.js`) - 소셜 로그인 기능

## 🌐 다국어 지원
앱은 다음 언어를 지원합니다:
- 한국어 (`ko.js`)
- 일본어 (`ja.js`)
- 중국어 (`ch.js`)
- 독일어 (`de.js`)
- 서양 지역 (`wes.js`)

## 🗄️ 데이터 관리
- **로컬 저장소**: Expo SQLite를 사용한 오프라인 데이터 저장
- **상태 관리**: React Context API를 통한 전역 상태 관리
- **서버 통신**: Axios를 통한 HTTP API 통신

## 🎨 UI/UX
- **커스텀 폰트**: 전용 폰트 파일 사용
- **반응형 디자인**: 다양한 화면 크기 지원
- **직관적인 네비게이션**: 탭 및 스택 네비게이션 조합

## ⚙️ 개발 설정
- **Metro 번들러**: 최적화된 번들링 설정
- **Babel**: JavaScript 트랜스파일링
- **TypeScript**: 타입 안전성 확보
- **ESLint**: 코드 품질 관리

## 📄 라이선스
이 프로젝트는 개인 프로젝트입니다.

## 🤝 기여하기
프로젝트에 기여하고 싶으시다면 이슈를 생성하거나 풀 리퀘스트를 보내주세요.

## 📞 문의
프로젝트 관련 문의사항이 있으시면 이슈를 통해 연락해주세요. 