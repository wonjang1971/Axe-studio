import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, MessageSquare } from "lucide-react";

const MOCK_CODE = "123456";

export function AuditionSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: roles, isLoading } = useListAuditionRoles();
  const submitMutation = useSubmitAuditionApplication();

  const [phoneVerified, setPhoneVerified] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState("");

  const form = useForm<AuditionFormValues>({
    resolver: zodResolver(auditionSchema),
    defaultValues: {
      childName: "",
      birthYear: "",
      gender: "",
      guardianName: "",
      phone: "",
      portfolio: "",
      memo: "",
    },
  });

  const phoneValue = form.watch("phone");

  const handleSendCode = () => {
    if (!phoneValue || phoneValue.length < 10) {
      form.setError("phone", { message: "연락처를 먼저 입력해주세요" });
      return;
    }
    setCodeSent(true);
    setCodeError("");
    setCodeInput("");
    toast({
      title: "인증번호 발송",
      description: `${phoneValue}로 인증번호를 발송했습니다. (테스트: ${MOCK_CODE})`,
    });
  };

  const handleVerifyCode = () => {
    if (codeInput === MOCK_CODE) {
      setPhoneVerified(true);
      setCodeError("");
      toast({ title: "인증 완료", description: "휴대폰 번호가 인증되었습니다." });
    } else {
      setCodeError("인증번호가 올바르지 않습니다. 다시 확인해주세요.");
    }
  };

  const onSubmit = (data: AuditionFormValues) => {
    if (!phoneVerified) {
      toast({
        title: "휴대폰 인증 필요",
        description: "연락처 인증을 먼저 완료해주세요.",
        variant: "destructive",
      });
      return;
    }
    submitMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: "접수 완료",
            description:
              "오디션 지원서가 정상 접수되었습니다. 검토 후 내방 오디션 일정을 개별 안내해드립니다.",
          });
          form.reset();
          setPhoneVerified(false);
          setCodeSent(false);
          setCodeInput("");
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
    <section id="audition" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            오디션 접수
          </h2>
          <p className="text-muted-foreground">
            '승경아 놀자'와 함께할 빛나는 재능을 찾습니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Roles Info */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
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
                {roles?.map((role) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    data-testid={`card-role-${role.id}`}
                    className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors bg-background"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-foreground">
                        {role.ageRange}
                      </h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
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
                    <p className="text-sm text-muted-foreground">
                      {role.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="mt-8 p-6 bg-muted rounded-lg space-y-4">
              <div>
                <h4 className="font-bold mb-2">오디션 진행 안내</h4>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                  <li>1차 서류 및 영상 심사 (수시 개별 통보)</li>
                  <li>2차 대면 오디션 (지정 연기 및 자유 연기)</li>
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
          <div className="bg-background p-8 rounded-xl shadow-sm border border-border">
            <h3 className="text-2xl font-bold mb-8">지원서 작성</h3>
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
                              {role.ageRange}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
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

                <div className="grid grid-cols-2 gap-4">
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

                {/* Phone + Verification */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>연락처 (보호자)</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            placeholder="010-0000-0000"
                            data-testid="input-phone"
                            disabled={phoneVerified}
                            {...field}
                          />
                        </FormControl>
                        {phoneVerified ? (
                          <div className="flex items-center gap-1 text-sm text-green-600 font-medium whitespace-nowrap px-2">
                            <CheckCircle2 className="w-4 h-4" />
                            인증완료
                          </div>
                        ) : (
                          <Button
                            type="button"
                            variant="outline"
                            className="whitespace-nowrap shrink-0"
                            onClick={handleSendCode}
                            data-testid="button-send-code"
                          >
                            인증번호 발송
                          </Button>
                        )}
                      </div>
                      <FormMessage />

                      {codeSent && !phoneVerified && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-2 space-y-2"
                        >
                          <div className="flex gap-2">
                            <Input
                              placeholder="인증번호 6자리"
                              maxLength={6}
                              value={codeInput}
                              onChange={(e) => setCodeInput(e.target.value)}
                              data-testid="input-verify-code"
                            />
                            <Button
                              type="button"
                              className="whitespace-nowrap shrink-0"
                              onClick={handleVerifyCode}
                              data-testid="button-verify-code"
                            >
                              확인
                            </Button>
                          </div>
                          {codeError && (
                            <p className="text-sm text-destructive">{codeError}</p>
                          )}
                          <p className="text-xs text-muted-foreground">
                            인증번호가 오지 않으면{" "}
                            <button
                              type="button"
                              className="underline"
                              onClick={handleSendCode}
                            >
                              재발송
                            </button>
                            을 눌러주세요.
                          </p>
                        </motion.div>
                      )}
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

                <Button
                  type="submit"
                  className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
                  disabled={submitMutation.isPending || !phoneVerified}
                  data-testid="button-submit-audition"
                >
                  {submitMutation.isPending ? "접수 중..." : "지원서 접수하기"}
                </Button>

                {!phoneVerified && (
                  <p className="text-center text-xs text-muted-foreground">
                    연락처 인증 후 접수가 가능합니다.
                  </p>
                )}
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
