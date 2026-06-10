# Portfolio - Next.js 풀스택 앱

## 기술 스택
- **Frontend**: Next.js 14 (App Router) + TypeScript
- **Backend**: Next.js API Routes (내장)
- **Database**: PostgreSQL + Prisma ORM (v7)
- **Auth**: JWT (jose) + bcrypt
- **Deploy**: Nginx + PM2

---

## 로컬 개발

### 1. 환경 변수 설정
```bash
cp .env.example .env
# .env 파일을 열어 실제 값 입력
```

주요 설정:
```env
DATABASE_URL="postgresql://USER:PASS@localhost:5432/DB_NAME"
JWT_SECRET="임의의 강력한 비밀키"
ADMIN_EMAIL="admin@yourdomain.com"
ADMIN_PASSWORD="강력한비밀번호!"
```

### 2. DB 마이그레이션 및 초기 데이터 생성
```bash
# Prisma 클라이언트 생성
npx prisma generate

# 마이그레이션 실행 (테이블 생성)
npx prisma migrate deploy

# 초기 데이터 생성 (admin 계정 + 샘플 데이터)
npm run db:seed
```

### 3. 개발 서버 실행
```bash
npm run dev
# → http://localhost:3000
```

---

## 배포 (Ubuntu/Debian 서버)

### 1. 서버에 코드 배포
```bash
# 서버에서:
cd /var/www
git clone <repository_url> portfolio
cd portfolio

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
nano .env  # 실제 값 입력
```

### 2. DB 설정 (기존 PostgreSQL Docker 사용)
```bash
# PostgreSQL에 데이터베이스 생성
docker exec -it <postgres-container> psql -U postgres
CREATE DATABASE portfolio_db;
\q

# .env의 DATABASE_URL을 Docker 컨테이너 연결 정보로 설정
# 예: postgresql://postgres:password@localhost:5432/portfolio_db

# 마이그레이션 실행
npm run db:migrate

# 초기 데이터 시드
npm run db:seed
```

### 3. 프로덕션 빌드
```bash
npm run build
```

### 4. PM2로 앱 실행
```bash
# PM2 설치 (없는 경우)
npm install -g pm2

# ecosystem.config.js에서 cwd 경로 수정 후:
pm2 start ecosystem.config.js
pm2 save
pm2 startup  # 서버 재시작 시 자동 실행
```

### 5. Nginx 설정
```bash
# nginx.conf.example 참고해서 설정 파일 생성
sudo nano /etc/nginx/sites-available/portfolio
# (nginx.conf.example 내용 복사 후 도메인/경로 수정)

# 심볼릭 링크 생성
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Nginx 설정 테스트 및 재시작
sudo nginx -t
sudo systemctl reload nginx
```

### 6. HTTPS 설정 (선택사항)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## 관리자 패널

- URL: `/admin`
- 로그인: `/admin/login`
- 기능:
  - **대시보드**: 콘텐츠 현황 확인
  - **홈 수정**: Hero 텍스트, 비즈니스 메트릭 수정 (JA/EN/KO)
  - **자기소개 수정**: 프로필 사진 업로드, Statement, 스킬, 경력 수정
  - **포트폴리오 관리**: 프로젝트 추가/수정/삭제, 공개/비공개 토글

---

## 디렉토리 구조

```
src/
├── app/
│   ├── page.tsx              (홈)
│   ├── about/                (자기소개)
│   ├── portfolio/            (포트폴리오)
│   ├── admin/                (관리자 패널)
│   └── api/                  (API Routes)
├── components/               (공통 컴포넌트)
├── contexts/                 (React Context)
└── lib/                      (유틸리티)
prisma/
├── schema.prisma             (DB 스키마)
└── seed.ts                   (초기 데이터)
```

---

## 주요 API 엔드포인트

| Method | URL | 설명 | 인증 |
|--------|-----|------|------|
| POST | `/api/auth/login` | 로그인 | ❌ |
| POST | `/api/auth/logout` | 로그아웃 | ❌ |
| GET | `/api/home` | 홈 콘텐츠 조회 | ❌ |
| PUT | `/api/home` | 홈 콘텐츠 수정 | ✅ Admin |
| GET | `/api/profile` | 프로필 조회 | ❌ |
| PUT | `/api/profile` | 프로필 수정 | ✅ Admin |
| GET | `/api/projects` | 프로젝트 목록 | ❌ |
| POST | `/api/projects` | 프로젝트 추가 | ✅ Admin |
| GET | `/api/projects/:id` | 프로젝트 상세 | ❌ |
| PUT | `/api/projects/:id` | 프로젝트 수정 | ✅ Admin |
| DELETE | `/api/projects/:id` | 프로젝트 삭제 | ✅ Admin |
| POST | `/api/upload` | 이미지 업로드 | ✅ Admin |
