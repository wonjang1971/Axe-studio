import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useListAuditionRoles, useSubmitAuditionApplication, getListAuditionRolesQueryKey } from "@workspace/api-client-react";
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

export function AuditionSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: roles, isLoading } = useListAuditionRoles();
  const submitMutation = useSubmitAuditionApplication();

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

  const onSubmit = (data: AuditionFormValues) => {
    submitMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast({
            title: "지원 완료",
            description: "오디션 지원이 성공적으로 접수되었습니다.",
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: "지원 실패",
            description: "오디션 지원 중 오류가 발생했습니다. 다시 시도해주세요.",
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
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">캐스팅 오디션</h2>
          <p className="text-muted-foreground">
            '승경아 놀자'와 함께할 빛나는 재능을 찾습니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Roles Info */}
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-primary"></span>
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
                    className="p-6 border border-border rounded-lg hover:border-primary/50 transition-colors bg-background"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-foreground">{role.roleName} <span className="text-sm font-normal text-muted-foreground ml-2">{role.ageRange}</span></h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        role.status === '접수중' ? 'bg-primary/10 text-primary' : 
                        role.status === '마감' ? 'bg-muted text-muted-foreground' : 
                        'bg-secondary/10 text-secondary'
                      }`}>
                        {role.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </motion.div>
                ))}
              </div>
            )}
            
            <div className="mt-8 p-6 bg-muted rounded-lg">
              <h4 className="font-bold mb-2">오디션 진행 안내</h4>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc list-inside">
                <li>1차 서류 및 영상 심사 (수시 개별 통보)</li>
                <li>2차 대면 오디션 (지정 연기 및 자유 연기)</li>
                <li>3차 최종 미팅 및 계약</li>
              </ul>
            </div>
          </div>

          {/* Application Form */}
          <div className="bg-background p-8 rounded-xl shadow-sm border border-border">
            <h3 className="text-2xl font-bold mb-8">지원서 작성</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="roleId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>지원 배역</FormLabel>
                      <Select onValueChange={(v) => field.onChange(Number(v))} defaultValue={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="배역을 선택해주세요" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roles?.filter(r => r.status === '접수중').map((role) => (
                            <SelectItem key={role.id} value={role.id.toString()}>
                              {role.roleName} ({role.ageRange})
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
                          <Input placeholder="홍길동" {...field} />
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
                          <Input placeholder="2012" maxLength={4} {...field} />
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
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
                          <Input placeholder="홍아빠" {...field} />
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
                      <FormLabel>연락처</FormLabel>
                      <FormControl>
                        <Input placeholder="010-0000-0000" {...field} />
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
                        <Input placeholder="YouTube, Google Drive 링크 등" {...field} value={field.value || ''} />
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
                        <Textarea placeholder="경력사항, 특기 등을 자유롭게 적어주세요." className="resize-none" {...field} value={field.value || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-primary/90" disabled={submitMutation.isPending}>
                  {submitMutation.isPending ? "제출 중..." : "지원서 제출하기"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
