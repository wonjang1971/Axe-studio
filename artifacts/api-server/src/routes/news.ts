import { Router } from "express";
import { eq } from "drizzle-orm";
import { db, newsItemsTable } from "@workspace/db";
import { CreateNewsItemBody, UpdateNewsItemBody } from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/adminAuth";

const router = Router();

// Initial news content: seeds an empty news table once at server startup so
// the previously hardcoded items appear in the database. After seeding, the
// database is the single source of truth (admin page manages all items).
const initialNewsItems = [
  {
    date: "2026.06",
    category: "공간",
    title: "서울영상위원회 2026년 입주 스튜디오 선정",
    summary: "서울영상위원회 공식 제작 지원 공간에 액스스튜디오가 입주 기업으로 최종 선정됐습니다.",
    badge: "신규",
    link: null,
    isRecent: true,
  },
  {
    date: "2026.04",
    category: "게임",
    title: "모바일게임 개발사 파트너십 협의 진행 중",
    summary: "글로벌 출시를 목표로 국내 모바일게임 전문 개발사와 공동 개발 파트너십 협의를 진행 중입니다.",
    badge: "중요",
    link: null,
    isRecent: true,
  },
  {
    date: "2025.12",
    category: "오디션",
    title: "1차 내방 오디션 일정 및 배역 공고 준비 완료",
    summary: "주연·조연 배역 오디션 기획안 수립 및 공고 체계 구성이 완료되었습니다.",
    badge: null,
    link: null,
    isRecent: false,
  },
  {
    date: "2025.09",
    category: "IP",
    title: "승경도 기반 콘텐츠 IP 상표 등록 절차 개시",
    summary: "'승경아 놀자' 타이틀 및 핵심 캐릭터명에 대한 상표 등록 절차를 개시하였습니다.",
    badge: null,
    link: null,
    isRecent: false,
  },
  {
    date: "2025.08",
    category: "공간",
    title: "경기도 파주 헤이리 예술마을 제작 오피스 입주",
    summary: "헤이리 예술마을 내 제작·기획 오피스에 입주하여 본격적인 IP 개발 작업을 시작하였습니다.",
    badge: null,
    link: null,
    isRecent: false,
  },
  {
    date: "2025.06",
    category: "설립",
    title: "주식회사 액스스튜디오 법인 설립",
    summary: "2025년 6월 25일, 콘텐츠 IP 전문 크리에이티브 프로덕션 주식회사 액스스튜디오가 공식 설립되었습니다.",
    badge: null,
    link: null,
    isRecent: false,
  },
];

export async function seedNewsItems(): Promise<void> {
  const existing = await db.select({ id: newsItemsTable.id }).from(newsItemsTable).limit(1);
  if (existing.length > 0) return;
  await db.insert(newsItemsTable).values(initialNewsItems);
}

function toApi(n: typeof newsItemsTable.$inferSelect) {
  return {
    id: n.id,
    date: n.date,
    category: n.category,
    title: n.title,
    summary: n.summary,
    badge: n.badge,
    link: n.link,
    isRecent: n.isRecent,
  };
}

router.get("/news", async (req, res) => {
  try {
    const items = await db.select().from(newsItemsTable).orderBy(newsItemsTable.id);
    res.json(items.map(toApi));
  } catch (err) {
    req.log.error({ err }, "Failed to list news items");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/news", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateNewsItemBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation error", details: parsed.error.issues });
    return;
  }

  try {
    const [item] = await db
      .insert(newsItemsTable)
      .values({
        date: parsed.data.date,
        category: parsed.data.category,
        title: parsed.data.title,
        summary: parsed.data.summary,
        badge: parsed.data.badge ?? null,
        link: parsed.data.link ?? null,
        isRecent: parsed.data.isRecent,
      })
      .returning();

    res.status(201).json(toApi(item));
  } catch (err) {
    req.log.error({ err }, "Failed to create news item");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/news/:newsId", requireAdmin, async (req, res): Promise<void> => {
  const newsId = Number(req.params.newsId);
  if (!Number.isInteger(newsId)) {
    res.status(400).json({ error: "Invalid news id" });
    return;
  }

  const parsed = UpdateNewsItemBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation error", details: parsed.error.issues });
    return;
  }

  try {
    const [item] = await db
      .update(newsItemsTable)
      .set({
        date: parsed.data.date,
        category: parsed.data.category,
        title: parsed.data.title,
        summary: parsed.data.summary,
        badge: parsed.data.badge ?? null,
        link: parsed.data.link ?? null,
        isRecent: parsed.data.isRecent,
      })
      .where(eq(newsItemsTable.id, newsId))
      .returning();

    if (!item) {
      res.status(404).json({ error: "News item not found" });
      return;
    }

    res.json(toApi(item));
  } catch (err) {
    req.log.error({ err }, "Failed to update news item");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/news/:newsId", requireAdmin, async (req, res): Promise<void> => {
  const newsId = Number(req.params.newsId);
  if (!Number.isInteger(newsId)) {
    res.status(400).json({ error: "Invalid news id" });
    return;
  }

  try {
    const [deleted] = await db
      .delete(newsItemsTable)
      .where(eq(newsItemsTable.id, newsId))
      .returning();

    if (!deleted) {
      res.status(404).json({ error: "News item not found" });
      return;
    }

    res.status(204).end();
  } catch (err) {
    req.log.error({ err }, "Failed to delete news item");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
