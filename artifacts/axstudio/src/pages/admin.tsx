import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  useListAuditionApplications,
  useListAuditionRoles,
  useListSponsorshipInquiries,
  getListAuditionApplicationsQueryKey,
  getListAuditionRolesQueryKey,
  getListSponsorshipInquiriesQueryKey,
} from "@workspace/api-client-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "axe2026";

function csvEscape(value: unknown) {
  return `"${String(value ?? "").replaceAll('"', '""')}"`;
}

function downloadCsv(filename: string, headers: string[], rows: unknown[][]) {
  const csv = "\ufeff" + [headers, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");

  const { data: roles = [] } = useListAuditionRoles({
    query: { enabled: unlocked, queryKey: getListAuditionRolesQueryKey() },
  });
  const { data: applications = [] } = useListAuditionApplications({
    query: { enabled: unlocked, queryKey: getListAuditionApplicationsQueryKey() },
  });
  const { data: inquiries = [] } = useListSponsorshipInquiries({
    query: { enabled: unlocked, queryKey: getListSponsorshipInquiriesQueryKey() },
  });

  const roleById = useMemo(
    () => new Map(roles.map((role) => [role.id, role.roleName])),
    [roles]
  );

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    if (password !== ADMIN_PASSWORD) {
      setError("관리자 비밀번호가 맞지 않습니다.");
      return;
    }
    setError("");
    setUnlocked(true);
  };

  const exportApplications = () => {
    downloadCsv(
      "axstudio-audition-applications.csv",
      ["접수일", "지원배역", "지원자", "출생년도", "성별", "보호자", "연락처", "링크", "메모"],
      applications.map((item) => [
        item.createdAt,
        roleById.get(item.roleId) || item.roleId,
        item.childName,
        item.birthYear,
        item.gender,
        item.guardianName,
        item.phone,
        item.portfolio,
        item.memo,
      ])
    );
  };

  const exportInquiries = () => {
    downloadCsv(
      "axstudio-sponsorship-inquiries.csv",
      ["접수일", "협찬유형", "기관/기업명", "담당자", "이메일", "연락처", "문의내용"],
      inquiries.map((item) => [
        item.createdAt,
        item.sponsorType,
        item.organizationName,
        item.contactName,
        item.contactEmail,
        item.contactPhone,
        item.message,
      ])
    );
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-sans">
      <Navbar alwaysDark />
      <main className="flex-1 pt-24 bg-background">
        <section className="container mx-auto px-6 py-12 md:py-20">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">
              Admin
            </p>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
              오디션 접수 관리자
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Replit 임시 운영용 관리자 화면입니다. Vercel 이전 시에는 Supabase Auth 같은 정식 로그인으로 교체하는 것을 권장합니다.
            </p>
          </div>

          {!unlocked ? (
            <form
              onSubmit={handleLogin}
              className="max-w-md bg-card border border-border rounded-xl p-6 space-y-4"
            >
              <label className="block text-sm font-medium text-foreground">
                관리자 비밀번호
              </label>
              <Input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="관리자 비밀번호"
                data-testid="input-admin-password"
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button type="submit" className="w-full" data-testid="button-admin-login">
                관리자 페이지 열기
              </Button>
              <p className="text-xs text-muted-foreground leading-relaxed">
                기본 임시 비밀번호는 axe2026입니다. Replit Secrets에 VITE_ADMIN_PASSWORD를 설정하면 변경할 수 있습니다.
              </p>
            </form>
          ) : (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card border border-border rounded-xl p-5">
                  <span className="text-sm text-muted-foreground">오픈된 배역</span>
                  <b className="block text-3xl text-primary mt-2">{roles.length}개</b>
                </div>
                <div className="bg-card border border-border rounded-xl p-5">
                  <span className="text-sm text-muted-foreground">오디션 지원서</span>
                  <b className="block text-3xl text-primary mt-2">{applications.length}건</b>
                </div>
                <div className="bg-card border border-border rounded-xl p-5">
                  <span className="text-sm text-muted-foreground">제휴 문의</span>
                  <b className="block text-3xl text-primary mt-2">{inquiries.length}건</b>
                </div>
              </div>

              <section className="bg-card border border-border rounded-xl p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                  <h2 className="text-2xl font-bold">오디션 지원서</h2>
                  <Button type="button" onClick={exportApplications} variant="outline">
                    CSV 저장
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left text-muted-foreground">
                        <th className="py-3 pr-4">접수일</th>
                        <th className="py-3 pr-4">배역</th>
                        <th className="py-3 pr-4">지원자</th>
                        <th className="py-3 pr-4">출생년도</th>
                        <th className="py-3 pr-4">보호자</th>
                        <th className="py-3 pr-4">연락처</th>
                        <th className="py-3 pr-4">링크/메모</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((item) => (
                        <tr key={item.id} className="border-b border-border/60 align-top">
                          <td className="py-3 pr-4 whitespace-nowrap">{item.createdAt}</td>
                          <td className="py-3 pr-4">{roleById.get(item.roleId) || item.roleId}</td>
                          <td className="py-3 pr-4 font-medium">{item.childName}</td>
                          <td className="py-3 pr-4">{item.birthYear}</td>
                          <td className="py-3 pr-4">{item.guardianName}</td>
                          <td className="py-3 pr-4">{item.phone}</td>
                          <td className="py-3 pr-4 min-w-64">
                            {item.portfolio && (
                              <a className="text-primary underline block mb-1" href={item.portfolio} target="_blank" rel="noreferrer">
                                포트폴리오
                              </a>
                            )}
                            <span className="text-muted-foreground">{item.memo || "-"}</span>
                          </td>
                        </tr>
                      ))}
                      {applications.length === 0 && (
                        <tr>
                          <td className="py-8 text-muted-foreground" colSpan={7}>
                            아직 접수된 지원서가 없습니다.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="bg-card border border-border rounded-xl p-5 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                  <h2 className="text-2xl font-bold">제휴 문의</h2>
                  <Button type="button" onClick={exportInquiries} variant="outline">
                    CSV 저장
                  </Button>
                </div>
                <div className="grid gap-3">
                  {inquiries.map((item) => (
                    <article key={item.id} className="border border-border rounded-lg p-4">
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2">
                        <span>{item.createdAt}</span>
                        <span>{item.sponsorType}</span>
                      </div>
                      <h3 className="font-bold text-lg">{item.organizationName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.contactName} · {item.contactEmail} · {item.contactPhone || "연락처 없음"}
                      </p>
                      <p className="text-sm leading-relaxed mt-3">{item.message}</p>
                    </article>
                  ))}
                  {inquiries.length === 0 && (
                    <p className="text-muted-foreground">아직 접수된 제휴 문의가 없습니다.</p>
                  )}
                </div>
              </section>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
