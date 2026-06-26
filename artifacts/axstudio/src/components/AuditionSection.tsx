import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useListAuditionRoles,
  useSubmitAuditionApplication,
  getListAuditionRolesQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { auditionSchema, type AuditionFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { MessageSquare } from "lucide-react";

export function AuditionSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: roles, isLoading } = useListAuditionRoles();
  const submitMutation = useSubmitAuditionApplication();

  const form = useForm<AuditionFormValues>({
    resolver: zodResolver(auditionSchema),
    defaultValues: {
      roleId: undefined,
      childName: "",
      birthYear: "",
      gender: "",
      guardianName: "",
      phone: "",
      portfolio: "",
      memo: "",
      guardianConsent: false,
    },
  });

  const onSubmit = (data: AuditionFormValues) => {
    const { guardianConsent, ...applicationData } = data;
    submitMutation.mutate(
      { data: applicationData },
      {
        onSuccess: () => {
          toast({
            title: "접수 완료",
            description:
              "지원서가 접수되었습니다. 액스스튜디오 캐스팅 담당자가 검토 후 합격자에 한해 보호자 연락처로 개별 안내드립니다.",
          });
          form.reset();
          queryClient.invalidateQueries({
            queryKey: getListAuditionRolesQueryKey(),
          });
        },
        onError: () => {
          toast({
            title: "접수 실패",
            description: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <section id="audition" className="py-12 md:py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            오디션 접수
          </h2>
          <p className="text-muted-foreground">
            어린이 주요 배역을 찾습니다. 접수 내용은 액스스튜디오 캐스팅 담당자가 확인합니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Roles Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 md:mb-8 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary" />
              모집 배역
            </h3>

            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {roles?.map((role, idx) => {
                  const parts = role.description.split("||");
                  const mainDesc = parts[0];
                  const reqs = parts.slice(1);
                  const isLead = idx === 0;
                  return (
                    <motion.div
                      key={role.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      data-testid={`card-role-${role.id}`}
                      className={`p-5 md:p-6 border rounded-lg transition-colors bg-background ${
                        isLead
                          ? "border-primary/40 hover:border-primary ring-1 ring-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                              isLead
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground border border-border"
                            }`}
                          >
                            {isLead ? "주연" : "주조연"}
                          </span>
                          <h4 className="text-lg font-bold text-foreground">
                            {role.roleName}
                          </h4>
                          <p className="text-xs text-muted-foreground">{role.ageRange}</p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full shrink-0 sm:ml-2 w-fit ${
                            role.status === "접수중"
                              ? "bg-primary/10 text-primary"
                              : role.status === "마감"
                              ? "bg-muted text-muted-foreground"
                              : "bg-secondary/10 text-secondary"
                          }`}
                        >
                          {role.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {mainDesc}
                      </p>
                      {reqs.length > 0 && (
                        <ul className="space-y-1.5">
                          {reqs.map((req, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                              <span className="text-primary font-bold">✔</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            )}

            <div className="mt-8 p-5 md:p-6 bg-muted rounded-lg space-y-4">
              <div>
                <h4 className="font-bold mb-2">오디션 진행 안내</h4>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>1차 서류 및 영상 심사</li>
                  <li>2차 대면 오디션</li>
                  <li>3차 최종 미팅 및 계약</li>
                </ul>
              </div>
              <div className="pt-3 border-t border-border flex items-start gap-2 text-sm">
                <MessageSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">접수 완료 후 안내:</strong>{" "}
                  지원서 검토 후 합격자에 한해 <strong className="text-foreground">내방 오디션</strong> 일정을
                  등록하신 연락처로 개별 안내해드립니다.
                </p>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-background p-5 md:p-8 rounded-xl shadow-sm border border-border">
            <h3 className="text-2xl font-bold mb-3">지원서 작성</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8">
              보호자 동의 후 접수해 주세요. 접수 완료 즉시 모든 지원자에게 오디션 일정이 배정되는 것은 아니며,
              합격자에 한해 개별 연락드립니다.
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="roleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>지원 배역</FormLabel>
                      <Select
                        onValueChange={(v) => field.onChange(Number(v))}
                        defaultValue={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger data-testid="select-role">
                            <SelectValue placeholder="배역을 선택해주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles?.map((role) => (
                            <SelectItem
                              key={role.id}
                              value={role.id.toString()}
                            >
                              {role.roleName} · {role.ageRange}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="childName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>지원자 이름</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="홍길동"
                            data-testid="input-childName"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="birthYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>출생년도</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="2012"
                            maxLength={4}
                            data-testid="input-birthYear"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>성별</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger data-testid="select-gender">
                              <SelectValue placeholder="선택" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="M">남</SelectItem>
                            <SelectItem value="F">여</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="guardianName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>보호자 성함</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="홍아빠"
                            data-testid="input-guardianName"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>연락처 (보호자)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="010-0000-0000"
                          data-testid="input-phone"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="portfolio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>포트폴리오 링크 (선택)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="YouTube, Google Drive 링크 등"
                          data-testid="input-portfolio"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="memo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>특이사항 (선택)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="경력사항, 특기 등을 자유롭게 적어주세요."
                          className="resize-none"
                          data-testid="textarea-memo"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="guardianConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start gap-3 rounded-lg border border-border bg-muted/40 p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-guardian-consent"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-medium leading-relaxed">
                          보호자가 지원 사실과 개인정보 수집 및 오디션 안내 연락에 동의합니다.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
                  disabled={submitMutation.isPending}
                  data-testid="button-submit-audition"
                >
                  {submitMutation.isPending ? "접수 중..." : "지원서 접수하기"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
