import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Megaphone, ExternalLink } from "lucide-react";
import {
  useListNewsItems,
  getListNewsItemsQueryKey,
} from "@workspace/api-client-react";

const badgeColor = (badge?: string | null) => {
  if (badge === "신규") return "bg-primary/15 text-primary border border-primary/30";
  if (badge === "중요") return "bg-amber-500/15 text-amber-600 border border-amber-500/30";
  return "";
};

export function NewsSection() {
  const [showPast, setShowPast] = useState(false);
  const { data: newsItems = [] } = useListNewsItems({
    query: { queryKey: getListNewsItemsQueryKey() },
  });

  const sorted = useMemo(
    () => [...newsItems].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.id - a.id)),
    [newsItems]
  );
  const recentNews = sorted.filter((n) => n.isRecent);
  const pastNews = sorted.filter((n) => !n.isRecent);

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
                key={item.id}
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
                        key={item.id}
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
