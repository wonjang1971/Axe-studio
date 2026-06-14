import { motion } from "framer-motion";
import { Users, Dice5, Swords, BookOpen, GraduationCap, Globe, Star, Scroll, Trophy, Zap } from "lucide-react";

export function GameSection() {
  const features = [
    {
      icon: <Users className="w-7 h-7 text-primary" />,
      title: "4인 멀티플레이어",
      description: "친구, 가족과 함께 즐기는 실시간 모바일 승경도."
    },
    {
      icon: <Dice5 className="w-7 h-7 text-primary" />,
      title: "윤목 & 품제",
      description: "전통 방식의 윷을 던져 관직을 오르고 미션을 수행!"
    },
    {
      icon: <Swords className="w-7 h-7 text-primary" />,
      title: "관직 승급",
      description: "시대를 넘나들며 미션을 해결하고 관직을 승급하세요!"
    },
    {
      icon: <BookOpen className="w-7 h-7 text-primary" />,
      title: "역사 이벤트 카드",
      description: "임진왜란, 훈민정음 창제 등 실제 역사 스토리가 카드로!"
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
      title: "캐릭터 성장",
      description: "나만의 관리로 성장하는 개성 있는 캐릭터 커스터마이징."
    },
    {
      icon: <Scroll className="w-7 h-7 text-primary" />,
      title: "원작 스토리",
      description: "드라마와 연동된 원작 스토리라인으로 깊은 세계관 체험."
    },
    {
      icon: <Trophy className="w-7 h-7 text-primary" />,
      title: "랭킹 & 업적",
      description: "전국 플레이어와 경쟁하고 희귀 칭호를 획득하세요!"
    },
    {
      icon: <Zap className="w-7 h-7 text-primary" />,
      title: "시즌 이벤트",
      description: "드라마 방영에 맞춘 한정 이벤트와 특별 보상이 업데이트됩니다."
    }
  ];

  const mobileFeatures = features.slice(0, 4);

  return (
    <section id="game" className="py-24 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-background/50" />

      <div className="container mx-auto px-6 relative z-10">

        {/* === 데스크탑 헤더 (lg+ 에서만 표시) === */}
        <div className="hidden lg:block max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Mobile Game</h2>
            <h3 className="text-4xl xl:text-5xl font-serif font-bold text-foreground mb-6 leading-[1.3]">전통이 모바일로 깨어나다</h3>
            <p className="text-lg text-muted-foreground leading-[1.65]">
              드라마 속 아이들이 하던 그 게임을 직접 즐겨보세요.
              전통 놀이 승경도가 화려한 그래픽과 함께 글로벌 모바일게임으로 재탄생합니다.
            </p>
          </motion.div>
        </div>

        {/* === 콘텐츠 영역 === */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-stretch">

          {/* ── 모바일 히어로 카드 (lg 미만에서만 표시) ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden min-h-[520px] flex flex-col justify-between p-6 pt-10 lg:hidden"
          >
            {/* 배경 이미지 */}
            <div className="absolute inset-0">
              <img
                src="/game-bg.png"
                alt=""
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/82" />
            </div>

            {/* 타이틀 + 설명 */}
            <div className="relative z-10">
              <span className="text-[11px] font-semibold text-primary/80 tracking-widest uppercase mb-2 block">Mobile Game</span>
              <h3 className="text-[30px] font-serif font-bold text-white leading-[1.25] mb-3">
                전통이 모바일로 깨어나다
              </h3>
              <p className="text-[15px] text-white/85 leading-[1.65]">
                드라마 속 아이들이 하던 승경도를 직접 즐겨보세요. 화려한 그래픽의 글로벌 모바일게임으로 재탄생합니다.
              </p>
            </div>

            {/* 4개 기능 카드 */}
            <div className="relative z-10 grid grid-cols-2 gap-2.5 mt-6">
              {mobileFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 flex flex-col"
                >
                  <div className="mb-2 bg-primary/20 w-9 h-9 rounded-xl flex items-center justify-center shrink-0">
                    <span className="scale-75">{feature.icon}</span>
                  </div>
                  <h4 className="text-[12px] font-bold text-white mb-1 leading-snug">{feature.title}</h4>
                  <p className="text-[11px] text-white/75 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── 데스크탑: 왼쪽 카드 5×2 (lg+ 에서만 표시) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:grid grid-cols-2 gap-4 content-start"
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

          {/* ── 데스크탑: 오른쪽 게임 이미지 (lg+ 에서만 표시) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden lg:block relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl"
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
