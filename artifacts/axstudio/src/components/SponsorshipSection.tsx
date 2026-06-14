import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitSponsorshipInquiry } from "@workspace/api-client-react";
import { sponsorSchema, type SponsorFormValues } from "@/lib/validations";
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
import { Building2, Landmark, HelpCircle } from "lucide-react";

export function SponsorshipSection() {
  const { toast } = useToast();
  const submitMutation = useSubmitSponsorshipInquiry();

  const form = useForm<SponsorFormValues>({
    resolver: zodResolver(sponsorSchema),
    defaultValues: {
      organizationName: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      sponsorType: "기업협찬",
      message: "",
    },
  });

  const onSubmit = (data: SponsorFormValues) => {
    submitMutation.mutate(
      { data: { ...data, sponsorType: data.sponsorType as any } },
      {
        onSuccess: () => {
          toast({
            title: "문의 접수 완료",
            description: "협찬 및 파트너십 문의가 성공적으로 접수되었습니다. 담당자가 확인 후 연락드리겠습니다.",
          });
          form.reset();
        },
        onError: () => {
          toast({
            title: "접수 실패",
            description: "문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <section id="sponsor" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">협찬 및 파트너십</h2>
              <p className="text-lg text-muted-foreground">
                가장 한국적인 IP로 전 세계와 소통할 파트너를 모십니다.
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">협력 분야</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start p-4 bg-card rounded-lg border border-border">
                    <Landmark className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">지자체 협찬</h4>
                      <p className="text-sm text-muted-foreground">지역 명소 로케이션 촬영, 지자체 홍보 및 문화 콘텐츠 공동 기획</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 bg-card rounded-lg border border-border">
                    <Building2 className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">기업 협찬</h4>
                      <p className="text-sm text-muted-foreground">제작 투자, PPL, 라이선싱 상품 개발 및 에듀테인먼트 제휴</p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 bg-card rounded-lg border border-border">
                    <HelpCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold mb-1">기타 제휴</h4>
                      <p className="text-sm text-muted-foreground">교육 기관, 출판사 등 다양한 형태의 파트너십 제안 환영</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 bg-card p-8 rounded-2xl border border-border shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-6">제휴 문의하기</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="sponsorType"
                      render={({ field }) => (
                        <FormItem className="col-span-2 sm:col-span-1">
                          <FormLabel>협찬 유형</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="유형 선택" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="지자체협찬">지자체 협찬</SelectItem>
                              <SelectItem value="기업협찬">기업 협찬</SelectItem>
                              <SelectItem value="기타">기타 제휴</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="organizationName"
                      render={({ field }) => (
                        <FormItem className="col-span-2 sm:col-span-1">
                          <FormLabel>기관/기업명</FormLabel>
                          <FormControl>
                            <Input placeholder="액스기업" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem className="col-span-2 sm:col-span-1">
                          <FormLabel>담당자 성함</FormLabel>
                          <FormControl>
                            <Input placeholder="홍길동 팀장" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem className="col-span-2 sm:col-span-1">
                          <FormLabel>연락처 (선택)</FormLabel>
                          <FormControl>
                            <Input placeholder="010-0000-0000" {...field} value={field.value || ''} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>이메일</FormLabel>
                        <FormControl>
                          <Input placeholder="example@axstudio.com" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>문의 내용</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="제안하시고자 하는 협력 내용이나 문의사항을 상세히 적어주세요." 
                            className="resize-none min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full h-12 text-lg" disabled={submitMutation.isPending}>
                    {submitMutation.isPending ? "접수 중..." : "제휴 문의 접수하기"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
