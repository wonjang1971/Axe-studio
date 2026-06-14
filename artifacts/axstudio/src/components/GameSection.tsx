import { motion } from "framer-motion";
import { Users, Dice5, Swords, BookOpen, GraduationCap, Globe, Star, Scroll } from "lucide-react";

export function GameSection() {
  const features = [
    {
      icon: <Users className="w-7 h-7 text-primary" />,
      title: "4인 멀티플레이어",
      description: "친구, 가족과 함께 즐기는 실시간 모바일 승경도."
    },
    {
      icon: <Dice5 className="w-7 h-7 text-primary" />,
      title: "윤목 (주사위) & 품제",
      description: "전통 방식의 윷을 던져 관직을 오르고 미션 수행!"
    },
    {
      icon: <Swords className="w-7 h-7 text-primary" />,
      title: "미션 수행 & 관직 승급",
      description: "시대를 넘나들며 미션을 해결하고 관직을 승급하세요!"
    },
    {
      icon: <BookOpen className="w-7 h-7 text-primary" />,
      title: "역사 이벤트 카드",
      description: "임진왜란, 훈민정음 창제 등 실제 역사 스토리가 카드로 등장!"
    },
    {
      icon: <GraduationCap className="w-7 h-7 text-primary" />,
      title: "교육용 EDU 버전",
      description: "학교와 기관에서 활용 가능한 맞춤형 학습 모드 제공!"
    },
    {
      icon: <Globe className="w-7 h-7 text-primary" />,
      title: "글로벌 멀티플레이",
      description: "전 세계 친구들과 실시간으로 승경도를 즐겨보세요!"
    },
    {
      icon: <Star className="w-7 h-7 text-primary" />,
      title: "캐릭터 성장 시스템",
      description: "나만의 관리로 성장하는 개성 있는 캐릭터 커스터마이징."
    },
    {
      icon: <Scroll className="w-7 h-7 text-primary" />,
      title: "승경도 원작 스토리",
      description: "드라마와 연동된 원작 스토리라인으로 더 깊은 세계관 체험."
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

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          {/* Feature grid — 4×2 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4 content-start"
          >
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-background p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="mb-3 bg-primary/10 w-11 h-11 rounded-xl flex items-center justify-center shrink-0">
                  {feature.icon}
                </div>
                <h4 className="text-sm font-bold text-foreground mb-1 leading-snug">{feature.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </motion.div>

          {/* Game image — stretches to match card grid height */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl"
          >
            <img
              src="/game-bg.png"
              alt="승경도 모바일게임 포스터"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-primary font-bold tracking-wider mb-1 text-sm">개발 진행중</span>
              <h3 className="text-xl font-serif font-bold mb-2">승경아 놀자: 모바일 에디션</h3>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                  일반용 — 가족·친구와 함께 즐기는 멀티플레이
                </div>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 inline-block" />
                  교육용 — 학교·기관용 커리큘럼 연계 버전
                </div>
                <div className="flex items-center gap-2 text-xs text-white/60 mt-1">
                  <Globe className="w-3 h-3" />
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
