import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  useListAuditionApplications,
  useListAuditionRoles,
  useListSponsorshipInquiries,
  useCreateAuditionRole,
  useUpdateAuditionRole,
  useDeleteAuditionRole,
  useListNewsItems,
  useCreateNewsItem,
  useUpdateNewsItem,
  useDeleteNewsItem,
  getListAuditionApplicationsQueryKey,
  getListAuditionRolesQueryKey,
  getListSponsorshipInquiriesQueryKey,
  getListNewsItemsQueryKey,
  setAuthTokenGetter,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const createRoleMutation = useCreateAuditionRole();
  const updateRoleMutation = useUpdateAuditionRole();
  const deleteRoleMutation = useDeleteAuditionRole();
  const [editingRoleId, setEditingRoleId] = useState<number | null>(null);
  const [newRole, setNewRole] = useState({
    roleName: "",
    ageRange: "",
    description: "",
    status: "접수중" as "준비중" | "접수중" | "마감",
  });

  const createNewsMutation = useCreateNewsItem();
  const updateNewsMutation = useUpdateNewsItem();
  const deleteNewsMutation = useDeleteNewsItem();
  const [editingNewsId, setEditingNewsId] = useState<number | null>(null);
  const [newsForm, setNewsForm] = useState({
    date: "",
    category: "",
    title: "",
    summary: "",
    badge: "없음" as "없음" | "신규" | "중요",
    link: "",
    isRecent: true,
  });

  const { data: newsItems = [] } = useListNewsItems({
    query: { enabled: unlocked, queryKey: getListNewsItemsQueryKey() },
  });

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

  const resetRoleForm = () => {
    setEditingRoleId(null);
    setNewRole({ roleName: "", ageRange: "", description: "", status: "접수중" });
  };

  const handleSubmitRole = (event: FormEvent) => {
    event.preventDefault();
    if (!newRole.roleName.trim() || !newRole.ageRange.trim() || !newRole.description.trim()) {
      toast({
        title: "입력 확인",
        description: "배역 이름, 나이, 설명을 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    const data = {
      roleName: newRole.roleName.trim(),
      ageRange: newRole.ageRange.trim(),
      description: newRole.description.trim(),
      status: newRole.status,
    };

    if (editingRoleId !== null) {
      updateRoleMutation.mutate(
        { roleId: editingRoleId, data },
        {
          onSuccess: () => {
            toast({
              title: "배역 수정 완료",
              description: `'${data.roleName}' 배역이 수정되었습니다.`,
            });
            resetRoleForm();
            queryClient.invalidateQueries({ queryKey: getListAuditionRolesQueryKey() });
          },
          onError: () => {
            toast({
              title: "배역 수정 실패",
              description: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
              variant: "destructive",
            });
          },
        }
      );
      return;
    }

    createRoleMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: "배역 추가 완료",
            description: `'${data.roleName}' 배역이 추가되었습니다.`,
          });
          resetRoleForm();
          queryClient.invalidateQueries({ queryKey: getListAuditionRolesQueryKey() });
        },
        onError: () => {
          toast({
            title: "배역 추가 실패",
            description: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleEditRole = (role: (typeof roles)[number]) => {
    setEditingRoleId(role.id);
    setNewRole({
      roleName: role.roleName,
      ageRange: role.ageRange,
      description: role.description,
      status: role.status,
    });
  };

  const handleDeleteRole = (role: (typeof roles)[number]) => {
    if (!window.confirm(`'${role.roleName}' 배역을 삭제할까요?`)) return;
    deleteRoleMutation.mutate(
      { roleId: role.id },
      {
        onSuccess: () => {
          toast({
            title: "배역 삭제 완료",
            description: `'${role.roleName}' 배역이 삭제되었습니다.`,
          });
          if (editingRoleId === role.id) resetRoleForm();
          queryClient.invalidateQueries({ queryKey: getListAuditionRolesQueryKey() });
        },
        onError: (err) => {
          const conflict =
            typeof err === "object" && err !== null && "status" in err && err.status === 409;
          toast({
            title: "배역 삭제 실패",
            description: conflict
              ? "이미 접수된 지원서가 있는 배역은 삭제할 수 없습니다."
              : "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const resetNewsForm = () => {
    setEditingNewsId(null);
    setNewsForm({
      date: "",
      category: "",
      title: "",
      summary: "",
      badge: "없음",
      link: "",
      isRecent: true,
    });
  };

  const handleSubmitNews = (event: FormEvent) => {
    event.preventDefault();
    if (
      !newsForm.date.trim() ||
      !newsForm.category.trim() ||
      !newsForm.title.trim() ||
      !newsForm.summary.trim()
    ) {
      toast({
        title: "입력 확인",
        description: "날짜, 분류, 제목, 내용을 모두 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    const data = {
      date: newsForm.date.trim(),
      category: newsForm.category.trim(),
      title: newsForm.title.trim(),
      summary: newsForm.summary.trim(),
      badge: newsForm.badge === "없음" ? null : newsForm.badge,
      link: newsForm.link.trim() || null,
      isRecent: newsForm.isRecent,
    };

    const onSuccess = (action: string) => () => {
      toast({ title: `소식 ${action} 완료`, description: `'${data.title}' 소식이 ${action}되었습니다.` });
      resetNewsForm();
      queryClient.invalidateQueries({ queryKey: getListNewsItemsQueryKey() });
    };
    const onError = (action: string) => () => {
      toast({
        title: `소식 ${action} 실패`,
        description: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        variant: "destructive",
      });
    };

    if (editingNewsId !== null) {
      updateNewsMutation.mutate(
        { newsId: editingNewsId, data },
        { onSuccess: onSuccess("수정"), onError: onError("수정") }
      );
      return;
    }

    createNewsMutation.mutate(
      { data },
      { onSuccess: onSuccess("추가"), onError: onError("추가") }
    );
  };

  const handleEditNews = (item: (typeof newsItems)[number]) => {
    setEditingNewsId(item.id);
    setNewsForm({
      date: item.date,
      category: item.category,
      title: item.title,
      summary: item.summary,
      badge: item.badge === "신규" || item.badge === "중요" ? item.badge : "없음",
      link: item.link ?? "",
      isRecent: item.isRecent,
    });
  };

  const handleDeleteNews = (item: (typeof newsItems)[number]) => {
    if (!window.confirm(`'${item.title}' 소식을 삭제할까요?`)) return;
    deleteNewsMutation.mutate(
      { newsId: item.id },
      {
        onSuccess: () => {
          toast({ title: "소식 삭제 완료", description: `'${item.title}' 소식이 삭제되었습니다.` });
          if (editingNewsId === item.id) resetNewsForm();
          queryClient.invalidateQueries({ queryKey: getListNewsItemsQueryKey() });
        },
        onError: () => {
          toast({
            title: "소식 삭제 실패",
            description: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    if (password !== ADMIN_PASSWORD) {
      setError("관리자 비밀번호가 맞지 않습니다.");
      return;
    }
    setError("");
    setAuthTokenGetter(() => password);
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
                <h2 className="text-2xl font-bold mb-2">
                  {editingRoleId !== null ? "배역 수정" : "배역 추가"}
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  {editingRoleId !== null
                    ? "아래 내용을 수정한 뒤 저장을 누르세요."
                    : "새 배역을 추가하면 캐스팅 페이지의 모집 배역 목록에 바로 표시됩니다."}
                </p>
                <form onSubmit={handleSubmitRole} className="grid gap-4 max-w-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        배역 이름
                      </label>
                      <Input
                        value={newRole.roleName}
                        onChange={(event) =>
                          setNewRole((prev) => ({ ...prev, roleName: event.target.value }))
                        }
                        placeholder="예: 조연 - 홍길동"
                        data-testid="input-new-role-name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        모집 나이
                      </label>
                      <Input
                        value={newRole.ageRange}
                        onChange={(event) =>
                          setNewRole((prev) => ({ ...prev, ageRange: event.target.value }))
                        }
                        placeholder="예: 10~13세"
                        data-testid="input-new-role-age"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      배역 설명
                    </label>
                    <Textarea
                      value={newRole.description}
                      onChange={(event) =>
                        setNewRole((prev) => ({ ...prev, description: event.target.value }))
                      }
                      placeholder="배역 소개와 모집 조건을 적어주세요."
                      rows={4}
                      data-testid="input-new-role-description"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        접수 상태
                      </label>
                      <Select
                        value={newRole.status}
                        onValueChange={(value) =>
                          setNewRole((prev) => ({
                            ...prev,
                            status: value as "준비중" | "접수중" | "마감",
                          }))
                        }
                      >
                        <SelectTrigger data-testid="select-new-role-status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="준비중">준비중</SelectItem>
                          <SelectItem value="접수중">접수중</SelectItem>
                          <SelectItem value="마감">마감</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={createRoleMutation.isPending || updateRoleMutation.isPending}
                        data-testid="button-add-role"
                      >
                        {editingRoleId !== null
                          ? updateRoleMutation.isPending
                            ? "저장 중..."
                            : "수정 저장"
                          : createRoleMutation.isPending
                            ? "추가 중..."
                            : "배역 추가"}
                      </Button>
                      {editingRoleId !== null && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={resetRoleForm}
                          data-testid="button-cancel-edit"
                        >
                          취소
                        </Button>
                      )}
                    </div>
                  </div>
                </form>

                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-3">현재 배역 목록</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left text-muted-foreground">
                          <th className="py-3 pr-4">배역</th>
                          <th className="py-3 pr-4">모집 나이</th>
                          <th className="py-3 pr-4">상태</th>
                          <th className="py-3 pr-4">관리</th>
                        </tr>
                      </thead>
                      <tbody>
                        {roles.map((role) => (
                          <tr key={role.id} className="border-b border-border/60">
                            <td className="py-3 pr-4 font-medium">{role.roleName}</td>
                            <td className="py-3 pr-4">{role.ageRange}</td>
                            <td className="py-3 pr-4">{role.status}</td>
                            <td className="py-3 pr-4">
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditRole(role)}
                                  data-testid={`button-edit-role-${role.id}`}
                                >
                                  수정
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="destructive"
                                  disabled={deleteRoleMutation.isPending}
                                  onClick={() => handleDeleteRole(role)}
                                  data-testid={`button-delete-role-${role.id}`}
                                >
                                  삭제
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section className="bg-card border border-border rounded-xl p-5 md:p-6">
                <h2 className="text-2xl font-bold mb-2">
                  {editingNewsId !== null ? "소식 수정" : "소식 추가"}
                </h2>
                <p className="text-sm text-muted-foreground mb-5">
                  {editingNewsId !== null
                    ? "아래 내용을 수정한 뒤 저장을 누르세요."
                    : "새 소식을 추가하면 홈페이지의 최신 소식 섹션에 바로 표시됩니다."}
                </p>
                <form onSubmit={handleSubmitNews} className="grid gap-4 max-w-2xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        날짜
                      </label>
                      <Input
                        value={newsForm.date}
                        onChange={(event) =>
                          setNewsForm((prev) => ({ ...prev, date: event.target.value }))
                        }
                        placeholder="예: 2026.07"
                        data-testid="input-news-date"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        분류
                      </label>
                      <Input
                        value={newsForm.category}
                        onChange={(event) =>
                          setNewsForm((prev) => ({ ...prev, category: event.target.value }))
                        }
                        placeholder="예: 오디션, 공간, 게임"
                        data-testid="input-news-category"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      제목
                    </label>
                    <Input
                      value={newsForm.title}
                      onChange={(event) =>
                        setNewsForm((prev) => ({ ...prev, title: event.target.value }))
                      }
                      placeholder="소식 제목을 입력하세요."
                      data-testid="input-news-title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      내용
                    </label>
                    <Textarea
                      value={newsForm.summary}
                      onChange={(event) =>
                        setNewsForm((prev) => ({ ...prev, summary: event.target.value }))
                      }
                      placeholder="소식 내용을 입력하세요."
                      rows={3}
                      data-testid="input-news-summary"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        배지
                      </label>
                      <Select
                        value={newsForm.badge}
                        onValueChange={(value) =>
                          setNewsForm((prev) => ({
                            ...prev,
                            badge: value as "없음" | "신규" | "중요",
                          }))
                        }
                      >
                        <SelectTrigger data-testid="select-news-badge">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="없음">없음</SelectItem>
                          <SelectItem value="신규">신규</SelectItem>
                          <SelectItem value="중요">중요</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        표시 위치
                      </label>
                      <Select
                        value={newsForm.isRecent ? "recent" : "past"}
                        onValueChange={(value) =>
                          setNewsForm((prev) => ({ ...prev, isRecent: value === "recent" }))
                        }
                      >
                        <SelectTrigger data-testid="select-news-position">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">새로운 소식 (카드)</SelectItem>
                          <SelectItem value="past">지난 소식 (더보기)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        기사 링크 (선택)
                      </label>
                      <Input
                        value={newsForm.link}
                        onChange={(event) =>
                          setNewsForm((prev) => ({ ...prev, link: event.target.value }))
                        }
                        placeholder="https://..."
                        data-testid="input-news-link"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={createNewsMutation.isPending || updateNewsMutation.isPending}
                      data-testid="button-submit-news"
                    >
                      {editingNewsId !== null
                        ? updateNewsMutation.isPending
                          ? "저장 중..."
                          : "수정 저장"
                        : createNewsMutation.isPending
                          ? "추가 중..."
                          : "소식 추가"}
                    </Button>
                    {editingNewsId !== null && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={resetNewsForm}
                        data-testid="button-cancel-news-edit"
                      >
                        취소
                      </Button>
                    )}
                  </div>
                </form>

                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-3">현재 소식 목록</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-left text-muted-foreground">
                          <th className="py-3 pr-4">날짜</th>
                          <th className="py-3 pr-4">분류</th>
                          <th className="py-3 pr-4">제목</th>
                          <th className="py-3 pr-4">위치</th>
                          <th className="py-3 pr-4">관리</th>
                        </tr>
                      </thead>
                      <tbody>
                        {newsItems.map((item) => (
                          <tr key={item.id} className="border-b border-border/60">
                            <td className="py-3 pr-4 whitespace-nowrap">{item.date}</td>
                            <td className="py-3 pr-4">{item.category}</td>
                            <td className="py-3 pr-4 font-medium">{item.title}</td>
                            <td className="py-3 pr-4 whitespace-nowrap">
                              {item.isRecent ? "새로운 소식" : "지난 소식"}
                            </td>
                            <td className="py-3 pr-4">
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEditNews(item)}
                                  data-testid={`button-edit-news-${item.id}`}
                                >
                                  수정
                                </Button>
                                <Button
                                  type="button"
                                  size="sm"
                                  variant="destructive"
                                  disabled={deleteNewsMutation.isPending}
                                  onClick={() => handleDeleteNews(item)}
                                  data-testid={`button-delete-news-${item.id}`}
                                >
                                  삭제
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {newsItems.length === 0 && (
                          <tr>
                            <td className="py-8 text-muted-foreground" colSpan={5}>
                              등록된 소식이 없습니다.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

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
