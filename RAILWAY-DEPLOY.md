# Railway 이전

웹사이트와 API를 같은 Node 서버에서 제공합니다. Dockerfile과 railway.json이 배포 설정을 지정합니다.

## 배포

1. Railway 프로젝트에 PostgreSQL을 추가합니다. 앱은 이 저장소의 Railway 이전 브랜치에서 배포합니다. Root Directory는 비워 두세요.
2. 앱 Variables에서 DATABASE_URL을 PostgreSQL 서비스의 DATABASE_URL 참조로 연결합니다. (예: `${{Postgres.DATABASE_URL}}`, 실제 서비스명에 맞게 선택)
3. ADMIN_PASSWORD는 Railway에서 직접 입력하세요. VITE_ADMIN_PASSWORD는 사용하지 않습니다. PORT는 Railway가 지정합니다.
4. 먼저 기존 Replit **운영 DB**를 새 PostgreSQL에 복원하세요. 개발 DB와 혼동하지 마세요. 기존 데이터를 복원하면 schema push는 실행하지 않습니다.
5. Generate Domain으로 임시 주소를 만들고 /, /casting, /admin, /api/healthz를 확인합니다. 오디션 신청·후원 문의 저장과 관리자 조회·수정을 검증합니다.
6. 최종 전환 전 이전 서버의 쓰기를 중단하고 최종 백업/복원을 진행합니다. 임시 주소 테스트에 사용한 데이터를 운영 데이터로 오인하지 않도록 주의하세요.
7. 검증 후 Custom Domain에 www.axestudio.net과 axestudio.net을 등록하고 Railway가 제시한 DNS를 적용합니다. 이메일 MX/TXT는 유지합니다.
8. 새 사이트와 DB 백업 설정을 확인한 뒤 기존 Replit 서비스를 종료합니다.

## DB 복사

PostgreSQL 도구가 있는 환경에서 실행합니다. 비밀 연결 주소는 GitHub에 저장하지 마세요. 원본 버전 이상의 pg_dump를 사용합니다.

```sh
pg_dump --dbname="$SOURCE_DATABASE_URL" --format=custom --no-owner --file=axe-studio.dump
pg_restore --dbname="$TARGET_DATABASE_PUBLIC_URL" --no-owner --no-acl --exit-on-error axe-studio.dump
```

대상은 빈 DB여야 합니다. 재복원 시 임의로 --clean을 추가하지 마세요. 테이블별 건수, 주요 데이터, ID 시퀀스를 검증합니다.

기존 DB를 확보하지 못한 상태에서 새 DB로 서비스하면 과거 지원서·문의가 표시되지 않습니다. 새 DB 초기화가 필요한 경우에만 별도 승인된 환경에서 `pnpm --filter @workspace/db push`를 실행합니다. 컨테이너 시작 시 자동 스키마 변경은 하지 않습니다.

## 로컬 검증

```sh
pnpm install --frozen-lockfile
PORT=8080 BASE_PATH=/ NODE_ENV=production node artifacts/axstudio/node_modules/vite/bin/vite.js build --config artifacts/axstudio/vite.config.ts
node artifacts/api-server/build.mjs
DATABASE_URL=... ADMIN_PASSWORD=... PORT=8080 NODE_ENV=production node artifacts/api-server/dist/index.mjs
```

Docker 실행 이미지는 빌드 결과만 포함합니다. Railway 결제·DB 복원·DNS 변경은 코드 준비와 별도의 단계입니다. 비용은 앱/DB 사용량과 저장공간에 따라 달라집니다.
