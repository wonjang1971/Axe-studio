import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Megaphone, ExternalLink } from "lucide-react";

type NewsItem = {
  date: string;
  category: string;
  title: string;
  summary: string;
  badge?: "신규" | "중요";
  link?: string | null;
};

const recentNews: NewsItem[] = [
  {
    date: "2026.06",
    category: "공간",
    title: "서울영상위원회 2026년 입주 스튜디오 선정",
    summary: "서울영상위원회 공식 제작 지원 공간에 액스스튜디오가 입주 기업으로 최종 선정됐습니다.",
    badge: "신규",
  },
  {
    date: "2026.06",
    category: "오디션",
    title: "출연 배우 오디션 시작",
    summary: "'승경아 놀자' 드라마 출연 배우 공개 오디션이 시작되었습니다. 관련 기사는 게시 후 링크가 연결될 예정입니다.",
    badge: "신규",
    link: null,
  },
  {
    date: "2026.04",
    category: "게임",
    title: "모바일게임 개발사 파트너십 협의 진행 중",
    summary: "글로벌 출시를 목표로 국내 모바일게임 전문 개발사와 공동 개발 파트너십 협의를 진행 중입니다.",
    badge: "중요",
  },
];

const pastNews: NewsItem[] = [
  {
    date: "2025.12",
    category: "오디션",
    title: "1차 내방 오디션 일정 및 배역 공고 준비 완료",
    summary: "주연·조연 배역 오디션 기획안 수립 및 공고 체계 구성이 완료되었습니다.",
  },
  {
    date: "2025.09",
    category: "IP",
    title: "승경도 기반 콘텐츠 IP 상표 등록 절차 개시",
    summary: "'승경아 놀자' 타이틀 및 핵심 캐릭터명에 대한 상표 등록 절차를 개시하였습니다.",
  },
  {
    date: "2025.08",
    category: "공간",
    title: "경기도 파주 헤이리 예술마을 제작 오피스 입주",
    summary: "헤이리 예술마을 내 제작·기획 오피스에 입주하여 본격적인 IP 개발 작업을 시작하였습니다.",
  },
  {
    date: "2025.06",
    category: "설립",
    title: "주식회사 액스스튜디오 법인 설립",
    summary: "2025년 6월 25일, 콘텐츠 IP 전문 크리에이티브 프로덕션 주식회사 액스스튜디오가 공식 설립되었습니다.",
  },
];

const badgeColor = (badge?: string) => {
  if (badge === "신규") return "bg-primary/15 text-primary border border-primary/30";
  if (badge === "중요") return "bg-amber-500/15 text-amber-600 border border-amber-500/30";
  return "";
};

export function NewsSection() {
  const [showPast, setShowPast] = useState(false);

  return (
    <section id="news" className="py-24 bg-card">
      <div className="container mx-auto px-6">

        {/* 헤더 */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">News</h2>
            <h3 className="text-4xl xl:text-5xl font-serif font-bold text-foreground mb-6 leading-[1.3]">
              최신 소식
            </h3>
            <p className="text-lg text-muted-foreground leading-[1.65]">
              액스스튜디오와 '승경아 놀자' IP의 주요 진행 사항을 전해드립니다.
            </p>
          </motion.div>
        </div>

        {/* 새로운 소식 카드 */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Megaphone className="w-5 h-5 text-primary" />
            <h4 className="text-lg font-bold text-foreground">새로운 소식</h4>
          </div>

          <div className="space-y-4">
            {recentNews.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl border border-border bg-background hover:border-primary/40 hover:shadow-md transition-all cursor-default"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                    {item.category}
                  </span>
                  {item.badge && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${badgeColor(item.badge)}`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <h5 className="text-base font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h5>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-primary hover:underline"
                  >
                    기사 보기 <ExternalLink className="w-3 h-3" />
                  </a>
                ) : item.link === null && (
                  <span className="inline-flex items-center gap-1 mt-3 text-xs text-muted-foreground/50 select-none">
                    기사 링크 추후 게시 예정
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          {/* 더보기 버튼 */}
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowPast((v) => !v)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-background text-sm font-medium text-muted-foreground hover:border-primary/50 hover:text-primary transition-all"
            >
              {showPast ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  접기
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  지난 소식 더보기
                </>
              )}
            </button>
          </div>

          {/* 지난 소식 — 더보기 누를 때 펼쳐짐 */}
          <AnimatePresence>
            {showPast && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-6">
                  <div className="text-xs font-semibold text-muted-foreground tracking-widest uppercase mb-4 px-1">
                    지난 소식
                  </div>
                  <div className="divide-y divide-border rounded-2xl border border-border overflow-hidden bg-background">
                    {pastNews.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="group flex items-start gap-4 px-5 py-4 hover:bg-muted/40 transition-colors cursor-default"
                      >
                        <span className="shrink-0 text-[11px] font-mono text-muted-foreground/60 whitespace-nowrap pt-0.5">
                          {item.date}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground mb-1 inline-block">
                            {item.category}
                          </span>
                          <p className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">
                            {item.title}
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-1">{item.summary}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
