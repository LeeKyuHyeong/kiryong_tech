# KIRYONG TECH - 기룡테크 기업 홈페이지

> 프레스 금형 제작 전문 기업 **기룡테크**의 반응형 기업 홈페이지
> 한국어 / English 이중 언어 지원

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| **Markup** | HTML5 Semantic Tags |
| **Styling** | CSS3, CSS Variables, Flexbox, Grid |
| **Script** | Vanilla JavaScript (ES6+) |
| **Font** | Google Fonts (Noto Sans KR, Bebas Neue) |
| **반응형** | Media Query 기반 모바일 대응 |

- 별도 프레임워크/라이브러리 없이 **순수 HTML/CSS/JS**로 구현
- 빌드 도구 없는 정적 웹사이트

---

## 주요 기능

- **이중 언어 지원** - 한국어(`/`) · 영어(`/en/`) 동일 구조 페이지 제공
- **반응형 웹 디자인** - 모바일 / 태블릿 / 데스크톱 대응 (breakpoint: 968px, 768px)
- **히어로 이미지 슬라이더** - 8초 자동 전환, 수동 네비게이션
- **스크롤 애니메이션** - IntersectionObserver 기반 AOS 스타일 애니메이션
- **숫자 카운트업 애니메이션** - 통계 수치 동적 표시
- **이미지 Lazy Loading** - `data-src` 기반 지연 로딩으로 초기 로딩 최적화
- **모바일 햄버거 메뉴** - CSS 트랜지션 기반 토글 애니메이션

---

## 페이지 구성

| 페이지 | 설명 |
|--------|------|
| `index.html` | 메인 페이지 (히어로 슬라이더, 회사 소개 요약) |
| `company-info.html` | 회사 소개 |
| `ceo-message.html` | CEO 인사말 |
| `certifications.html` | 품질 인증 현황 및 수상 |
| `gallery.html` | 현장 사진 갤러리 |
| `facilities.html` | 시설 · 장비 보유 현황 |
| `location.html` | 오시는 길 (지도) |
| `notice.html` | 공지사항 |

---

## 프로젝트 구조

```
kiryong_tech/
├── index.html              # 메인 페이지 (KR)
├── company-info.html
├── ceo-message.html
├── certifications.html
├── gallery.html
├── facilities.html
├── location.html
├── notice.html
├── css/
│   └── styles.css          # 전역 스타일시트 (CSS Variables 기반)
├── js/
│   └── script.js           # JavaScript 모듈 (클래스 기반)
├── images/                 # 이미지 리소스
└── en/                     # 영어 버전 (동일 구조)
    ├── index.html
    ├── company-info.html
    └── ...
```

---

## 실행 방법

```bash
# Python
python -m http.server 8000

# Node.js
npx serve
```

`http://localhost:8000` 에서 확인
