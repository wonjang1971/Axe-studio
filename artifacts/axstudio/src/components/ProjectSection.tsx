import { motion } from "framer-motion";
import {
  BookOpen,
  Clock3,
  Gamepad2,
  GraduationCap,
  Landmark,
  ScrollText,
  Shield,
  Sparkles,
  Tv,
} from "lucide-react";

const storyKeywords = [
  {
    icon: <ScrollText className="w-5 h-5 text-primary" />,
    title: "침원록",
    description: "왕과 영웅이 아닌, 조선 곳곳의 민초가 남긴 진짜 삶의 기록.",
  },
  {
    icon: <Shield className="w-5 h-5 text-primary" />,
    title: "망각령",
    description: "기록될 자와 사라질 자를 나누며 기억을 지우려는 판의 설계자.",
  },
  {
    icon: <Sparkles className="w-5 h-5 text-primary" />,
    title: "기혈단",
    description: "승경도 판을 깨우는 네 아이의 혈통이자 모험을 여는 열쇠.",
  },
  {
    icon: <Clock3 className="w-5 h-5 text-primary" />,
    title: "회중시계",
    description: "사라진 엄마와 조선의 시간문을 잇는 미스터리한 장치.",
  },
];

const ipCards = [
  {
    icon: <Tv className="w-6 h-6 text-primary" />,
    title: "EBS 드라마",
    description: "20분 30부작 구성의 역사 판타지 어드벤처 시리즈로 기획 중입니다.",
  },
  {
    icon: <Gamepad2 className="w-6 h-6 text-primary" />,
    title: "모바일 게임",
    description: "승경도 판과 캐릭터 모험을 연결한 글로벌 모바일 보드게임을 준비합니다.",
  },
  {
    icon: <GraduationCap className="w-6 h-6 text-primary" />,
    title: "교육 콘텐츠",
    description: "직업 체험, 역사 이해, 가치 탐구를 가족형 콘텐츠로 확장합니다.",
  },
  {
    icon: <Landmark className="w-6 h-6 text-primary" />,
    title: "체험 IP",
    description: "지역 명소, 굿즈, 출판, 전시형 체험으로 이어지는 확장 IP를 목표로 합니다.",
  },
];

export function ProjectSection() {
  return (
    <section id="project" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-5 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">
              Main Project
            </h2>
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-5 leading-[1.25]">
              기억을 복원하는 타임슬립 어드벤처
            </h3>
            <p className="text-base md:text-lg text-muted-foreground leading-[1.7]">
              "승경도 : 승경아 놀자"는 조선시대 보드게임 승경도를 바탕으로,
              네 아이가 과거의 직업과 사건을 직접 겪으며 잊힌 사람들의 이름을 되찾는
              역사 판타지 IP입니다.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative min-h-[460px] md:min-h-[620px] rounded-lg overflow-hidden border border-border/60 shadow-2xl"
          >
            <img
              src="/project-bg.png"
              alt="승경아 놀자 타임슬립 판타지"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/24 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-white">
              <span className="text-xs font-bold tracking-widest uppercase text-primary">
                Story World
              </span>
              <p className="mt-2 text-sm sm:text-2xl lg:text-xl font-serif font-bold leading-tight whitespace-nowrap">
                판 위에 남겨진 기억, 아이들이 다시 쓰는 역사
              </p>
              <p className="mt-3 text-sm md:text-base text-white/78 leading-relaxed max-w-xl">
                꿈은 어떤 직업을 갖느냐가 아니라, 어떤 가치를 이루느냐에 있다는 질문에서 출발합니다.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
              {storyKeywords.map((item) => (
                <div key={item.title} className="bg-card p-5 rounded-lg border border-border shadow-sm">
                  <div className="mb-3 bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-card border border-border rounded-lg p-5 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-5 h-5 text-primary" />
                <h4 className="font-bold text-lg">IP 확장 방향</h4>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {ipCards.map((card) => (
                  <div key={card.title} className="rounded-lg bg-background border border-border/70 p-4">
                    <div className="mb-3">{card.icon}</div>
                    <h5 className="text-sm font-bold mb-1">{card.title}</h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
