# Render 유료 이전

render.yaml은 싱가포르 웹 서버 1개와 PostgreSQL 1개를 만듭니다. 웹 서버와 DB의 컴퓨팅 및 DB 저장공간 비용이 발생하며 생성 전 Render의 견적을 확인하세요. Workspace 요금제는 무료 Hobby로 유지할 수 있습니다.

1. Render 계정의 Billing에서 직접 결제수단을 등록합니다.
2. GitHub Render 앱 연결은 이 저장소만 선택합니다. New > Blueprint에서 이 저장소의 codex/railway-migration 브랜치를 선택합니다.
3. render.yaml 설정과 비용을 확인합니다. ADMIN_PASSWORD는 사용자가 직접 입력합니다. VITE_ADMIN_PASSWORD는 입력하지 않습니다.
4. 기존 Replit 운영 DB 백업을 먼저 확보합니다. 새 DB의 외부 접속은 ipAllowList: []로 차단되어 있습니다. 복원할 때만 본인의 공인 IP를 잠시 허용하거나 Render의 앱 Shell에서 내부 DB 연결을 이용하세요. 복원 후 임시 허용 규칙은 제거합니다.
5. 운영 DB의 스키마·데이터를 빈 새 DB에 복원합니다. RAILWAY-DEPLOY.md의 pg_dump/pg_restore 절차에서 대상 주소만 Render 주소로 바꿉니다. 기존 데이터가 없다면 새 DB 초기화 여부를 먼저 결정해야 합니다.
6. /api/healthz는 프로세스 응답만 확인합니다. DB 복원 전에는 신청·공지 기능이 정상 작동하지 않습니다. 임시 onrender.com 주소에서 신청 저장과 관리자 조회·수정을 직접 검증합니다.
7. 기존 서버의 쓰기를 중지하고 최종 데이터를 동기화한 뒤 Custom Domains와 DNS를 전환합니다. 정상 확인 전 Replit 데이터를 삭제하지 않습니다.

Dockerfile은 Railway와 Render에서 공유합니다. 브랜치를 main으로 병합하면 Render 서비스의 배포 브랜치와 render.yaml의 branch도 main으로 변경하세요.
