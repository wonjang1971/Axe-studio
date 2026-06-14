import { motion } from "framer-motion";
import { Users, Dice5, History, GraduationCap, Globe } from "lucide-react";

export function GameSection() {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "4인 멀티플레이어",
      description: "온라인에서 친구, 가족들과 함께 실시간으로 즐기는 승경도 게임."
    },
    {
      icon: <Dice5 className="w-8 h-8 text-primary" />,
      title: "윤목(주사위) & 품계",
      description: "전통 방식의 윷을 던져 관직을 오르내리는 스릴 넘치는 승급 시스템."
    },
    {
      icon: <History className="w-8 h-8 text-primary" />,
      title: "역사 이벤트 카드",
      description: "임진왜란, 훈민정음 창제 등 실제 역사적 사건이 게임의 판도를 바꿉니다."
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-primary" />,
      title: "교육용 EDU 버전",
      description: "학교와 기관에서 활용하는 맞춤형 커리큘럼 연계 교육용 모드 별도 제공."
    }
  ];

  return (
    <section id="game" className="py-24 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-background/50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Mobile Game</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">전통이 모바일로 깨어나다</h3>
            <p className="text-lg text-muted-foreground">
              드라마 속 아이들이 하던 그 게임을 직접 즐겨보세요.
              <br className="hidden sm:block" />
              전통 놀이 승경도가 화려한 그래픽과 함께 글로벌 모바일게임으로 재탄생합니다.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, i) => (
              <div key={i} className="bg-background p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="mb-4 bg-primary/10 w-16 h-16 rounded-xl flex items-center justify-center">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-foreground mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl"
          >
            <img
              src="/game-bg.png"
              alt="승경도 모바일게임 UI"
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-primary font-bold tracking-wider mb-2">개발 진행중</span>
              <h3 className="text-2xl font-serif font-bold mb-3">승경아 놀자: 모바일 에디션</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                  일반용 — 가족·친구와 함께 즐기는 멀티플레이
                </div>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <span className="w-2 h-2 rounded-full bg-primary/60 inline-block" />
                  교육용 — 학교·기관용 커리큘럼 연계 버전
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60 mt-1">
                  <Globe className="w-3.5 h-3.5" />
                  글로벌 동시 출시 예정
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
