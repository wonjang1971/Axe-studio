import { motion } from "framer-motion";
import { Tv, Gamepad2, GraduationCap, Globe, Users, Sparkles } from "lucide-react";

export function ProjectSection() {
  const cards = [
    {
      icon: <Tv className="w-6 h-6 text-primary" />,
      title: "EBS 드라마(예정)",
      description: "현대 아이들이 조선 시대로 타임슬립하는 웰메이드 역사 판타지 시리즈.",
    },
    {
      icon: <Gamepad2 className="w-6 h-6 text-primary" />,
      title: "모바일게임 (글로벌 출시)",
      description: "드라마 세계관을 그대로 체험하는 승경도 멀티플레이어 모바일게임.",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-primary" />,
      title: "에듀테인먼트 IP",
      description: "역사와 관직 제도를 자연스럽게 배우는 교육적 가족형 콘텐츠.",
    },
    {
      icon: <Globe className="w-6 h-6 text-primary" />,
      title: "글로벌 IP 확장",
      description: "K-콘텐츠로서 전 세계 시장을 겨냥한 IP 비즈니스.",
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "가족형 콘텐츠",
      description: "부모와 아이가 함께 즐기고 배우는 All-age 에듀테인먼트.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      title: "타임슬립 세계관",
      description: "현대와 조선 시대를 오가는 독창적 판타지로 역사를 재해석합니다.",
    },
  ];

  return (
    <section id="project" className="py-24 bg-background">
      <div className="container mx-auto px-6">

        {/* 데스크탑 헤더 */}
        <div className="hidden lg:block max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Main Project</h2>
            <h3 className="text-4xl xl:text-5xl font-serif font-bold text-foreground mb-6 leading-[1.3]">
              드라마부터 모바일게임, 그리고 에듀케이션까지
            </h3>
            <p className="text-lg text-muted-foreground leading-[1.65]">
              '승경아 놀자'는 단순한 영상을 넘어선 확장형 IP입니다. 조선 시대 관직을 오르는 전통 놀이 '승경도'를 기반으로
              아이들이 역사 속으로 직접 뛰어드는 드라마와 글로벌 모바일게임으로 완성됩니다.
            </p>
          </motion.div>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-stretch">

          {/* ── 모바일 히어로 카드 ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden lg:hidden"
            style={{ minHeight: 560, padding: "42px 22px" }}
          >
            {/* 배경 이미지: center top — 승경도 보드판이 상단에 노출 */}
            <div className="absolute inset-0">
              <img
                src="/project-bg.png"
                alt=""
                className="w-full h-full object-cover object-top"
              />
              {/* 3단 그라디언트: 상단 투명 → 중단 반투명 → 하단 불투명 */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.38) 35%, rgba(0,0,0,0.84) 100%)",
                }}
              />
            </div>

            {/* 콘텐츠 패널: 상단 40%(≈220px) 이미지 노출 후 글래스 패널 시작 */}
            <div
              className="relative z-10 rounded-[18px] p-5"
              style={{
                marginTop: 220,
                background: "rgba(0,0,0,0.38)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            >
              <span className="text-[11px] font-semibold text-primary/80 tracking-widest uppercase mb-2 block">
                Main Project
              </span>
              <h3
                className="text-[30px] font-serif font-bold text-white leading-[1.25] mb-3"
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.65)" }}
              >
                드라마부터 모바일게임, 에듀케이션까지
              </h3>
              <p
                className="text-[15px] text-white/90 leading-[1.65] mb-5"
                style={{ textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}
              >
                전통 놀이 '승경도'를 기반으로 타임슬립 드라마와 글로벌 모바일게임으로 완성되는 확장형 IP입니다.
              </p>

              {/* 카드 그리드 */}
              <div className="grid grid-cols-2 gap-2.5">
                {cards.map((card, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl border border-white/20 flex flex-col"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  >
                    <div className="mb-2 bg-primary/25 w-8 h-8 rounded-xl flex items-center justify-center shrink-0">
                      {card.icon}
                    </div>
                    <h4
                      className="text-[12px] font-bold text-white mb-0.5 leading-snug"
                      style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
                    >
                      {card.title}
                    </h4>
                    <p className="text-[11px] text-white/80 leading-relaxed">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── 데스크탑: 왼쪽 이미지 ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl"
          >
            <img
              src="/project-bg.png"
              alt="승경아 놀자 타임슬립 판타지"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-xs font-bold tracking-widest uppercase opacity-60">
                Family Historical Fantasy
              </span>
              <p className="text-xl font-serif font-bold mt-1 drop-shadow">
                시간이 열린다 — 타임슬립 판타지
              </p>
            </div>
          </motion.div>

          {/* ── 데스크탑: 오른쪽 카드 그리드 ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:grid grid-cols-2 gap-4 content-start"
          >
            {cards.map((card, i) => (
              <div
                key={i}
                className="bg-card p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="mb-3 bg-primary/10 w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                  {card.icon}
                </div>
                <h4 className="text-sm font-bold text-foreground mb-1 leading-snug">{card.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
