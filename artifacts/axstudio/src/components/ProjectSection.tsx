import { motion } from "framer-motion";
import { Tv, Gamepad2, GraduationCap, Globe, Users, Sparkles } from "lucide-react";

export function ProjectSection() {
  const cards = [
    {
      icon: <Tv className="w-7 h-7 text-primary" />,
      title: "EBS 드라마(예정)",
      description: "현대 아이들이 조선 시대로 타임슬립하여 겪는 웰메이드 역사 판타지 시리즈.",
    },
    {
      icon: <Gamepad2 className="w-7 h-7 text-primary" />,
      title: "모바일게임 (글로벌 출시)",
      description: "드라마 세계관을 그대로 체험하는 승경도 멀티플레이어 모바일게임.",
    },
    {
      icon: <GraduationCap className="w-7 h-7 text-primary" />,
      title: "에듀테인먼트 IP",
      description: "역사와 관직 제도를 자연스럽게 배우는 교육적 가족형 콘텐츠.",
    },
    {
      icon: <Globe className="w-7 h-7 text-primary" />,
      title: "글로벌 IP 확장",
      description: "K-콘텐츠로서 한국을 넘어 전 세계 시장을 겨냥한 IP 비즈니스.",
    },
    {
      icon: <Users className="w-7 h-7 text-primary" />,
      title: "가족형 콘텐츠",
      description: "부모와 아이가 함께 즐기고, 함께 배우는 All-age 에듀테인먼트.",
    },
    {
      icon: <Sparkles className="w-7 h-7 text-primary" />,
      title: "타임슬립 세계관",
      description: "현대와 조선 시대를 오가는 독창적 판타지로 역사를 재해석합니다.",
    },
  ];

  return (
    <section id="project" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Main Project</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              드라마부터 모바일게임,<br />그리고 에듀케이션까지
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              '승경아 놀자'는 단순한 영상을 넘어선 확장형 IP입니다. 조선 시대 관직을 오르는 전통 놀이 '승경도'를 기반으로,
              아이들이 역사 속으로 직접 뛰어드는 드라마와 글로벌 모바일게임으로 완성됩니다.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Image — full display, no crop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl"
          >
            <img
              src="/project-bg.png"
              alt="승경아 놀자 타임슬립 판타지"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <span className="text-xs font-bold tracking-widest uppercase opacity-60">Family Historical Fantasy</span>
              <p className="text-xl font-serif font-bold mt-1 drop-shadow">시간이 열린다 — 타임슬립 판타지</p>
            </div>
          </motion.div>

          {/* Cards — 3×2 grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 content-start"
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
