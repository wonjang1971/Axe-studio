import { z } from "zod";

export const auditionSchema = z.object({
  roleId: z.coerce.number().min(1, "배역을 선택해주세요"),
  childName: z.string().min(2, "이름을 입력해주세요"),
  birthYear: z.string().regex(/^\d{4}$/, "출생년도 4자리를 입력해주세요"),
  gender: z.string().min(1, "성별을 선택해주세요"),
  guardianName: z.string().min(2, "보호자 성함을 입력해주세요"),
  phone: z.string().min(10, "연락처를 입력해주세요"),
  portfolio: z.string().optional(),
  memo: z.string().optional()
});

export type AuditionFormValues = z.infer<typeof auditionSchema>;

export const sponsorSchema = z.object({
  organizationName: z.string().min(2, "기관/기업명을 입력해주세요"),
  contactName: z.string().min(2, "담당자 성함을 입력해주세요"),
  contactEmail: z.string().email("올바른 이메일 주소를 입력해주세요"),
  contactPhone: z.string().optional(),
  sponsorType: z.enum(["지자체협찬", "기업협찬", "기타"], { required_error: "협찬 유형을 선택해주세요" }),
  message: z.string().min(10, "내용을 10자 이상 입력해주세요")
});

export type SponsorFormValues = z.infer<typeof sponsorSchema>;
