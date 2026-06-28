import { Router } from "express";
import { db, auditionRolesTable, auditionApplicationsTable } from "@workspace/db";
import { SubmitAuditionApplicationBody } from "@workspace/api-zod";

const router = Router();

const defaultAuditionRoles = [
  {
    roleName: "최승경",
    ageRange: "남 / 12세",
    description:
      "리더 기질이 강한 게임 천재이자 숨은 유튜브 스타. 사라진 엄마의 비밀을 좇으며 승경도 판의 기억을 깨우는 중심 인물입니다.||빠른 판단과 분석적인 말투||겉은 자신감, 속은 상처가 있는 감정선||팀을 이끄는 에너지와 변화하는 리더십",
    status: "접수중",
  },
  {
    roleName: "윤미래",
    ageRange: "여 / 12세",
    description:
      "밝고 에너지 넘치는 분위기 메이커. 사람의 감정을 잘 읽고 팀을 이어주는 언변가이자 무대 체질 캐릭터입니다.||표정과 리액션이 풍부한 연기||밝음 뒤의 인정욕구 표현||리듬감 있는 움직임과 순발력",
    status: "접수중",
  },
  {
    roleName: "최정경",
    ageRange: "남 / 13세",
    description:
      "조용한 역사 덕후이자 기록관. 말수는 적지만 관찰력이 뛰어나고, 잊힌 기억을 이야기로 남기는 따뜻한 인물입니다.||차분하고 섬세한 감정 표현||관찰자다운 눈빛과 집중력||내성적인 인물이 마음을 여는 변화",
    status: "접수중",
  },
  {
    roleName: "박석현",
    ageRange: "남 / 14세",
    description:
      "몸이 먼저 움직이는 행동대장. 겁도 있지만 의리와 보호 본능이 강한 팀의 탱커형 캐릭터입니다.||활동적이고 건강한 신체 표현||코믹한 겁과 따뜻한 의리의 균형||친구를 지키는 보호자 같은 에너지",
    status: "접수중",
  },
];

router.get("/auditions/roles", async (req, res) => {
  try {
    let roles = await db.select().from(auditionRolesTable).orderBy(auditionRolesTable.id);

    if (roles.length === 0) {
      roles = await db.insert(auditionRolesTable).values(defaultAuditionRoles).returning();
    }

    res.json(roles.map(r => ({
      id: r.id,
      roleName: r.roleName,
      ageRange: r.ageRange,
      description: r.description,
      status: r.status,
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to list audition roles");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/auditions/apply", async (req, res): Promise<void> => {
  const parsed = SubmitAuditionApplicationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation error", details: parsed.error.issues });
    return;
  }

  try {
    const [application] = await db.insert(auditionApplicationsTable).values({
      roleId: parsed.data.roleId,
      childName: parsed.data.childName,
      birthYear: parsed.data.birthYear,
      gender: parsed.data.gender,
      guardianName: parsed.data.guardianName,
      phone: parsed.data.phone,
      portfolio: parsed.data.portfolio ?? null,
      memo: parsed.data.memo ?? null,
    }).returning();

    res.status(201).json({
      id: application.id,
      roleId: application.roleId,
      childName: application.childName,
      birthYear: application.birthYear,
      gender: application.gender,
      guardianName: application.guardianName,
      phone: application.phone,
      portfolio: application.portfolio,
      memo: application.memo,
      createdAt: application.createdAt.toISOString(),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to submit audition application");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/auditions/applications", async (req, res) => {
  try {
    const applications = await db.select().from(auditionApplicationsTable).orderBy(auditionApplicationsTable.createdAt);
    res.json(applications.map(a => ({
      id: a.id,
      roleId: a.roleId,
      childName: a.childName,
      birthYear: a.birthYear,
      gender: a.gender,
      guardianName: a.guardianName,
      phone: a.phone,
      portfolio: a.portfolio,
      memo: a.memo,
      createdAt: a.createdAt.toISOString(),
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to list applications");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
