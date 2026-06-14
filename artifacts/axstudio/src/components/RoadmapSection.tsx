import { motion } from "framer-motion";

export function RoadmapSection() {
  const phases = [
    {
      num: "01",
      title: "Series",
      subtitle: "기획",
      desc: "지상파 채널을 통한 메인 스토리 전개 및 초기 팬덤 구축"
    },
    {
      num: "02",
      title: "Game",
      subtitle: "글로벌 모바일 게임",
      desc: "드라마 방영 시기에 맞춘 멀티플레이어 보드게임 런칭"
    },
    {
      num: "03",
      title: "Education",
      subtitle: "교육용 콘텐츠",
      desc: "학교 및 기관용 방과후 학습 교재 및 에듀테인먼트 전개"
    },
    {
      num: "04",
      title: "Experience",
      subtitle: "관광상품 및 경험",
      desc: "지역 명소와 연계한 승경도 오프라인 체험 콘텐츠 확장"
    }
  ];

  return (
    <section id="roadmap" className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-black/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">IP ROADMAP</h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            단일 콘텐츠를 넘어 입체적인 세계관으로 확장되는 승경아 놀자의 미래를 소개합니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              {/* Connection Line (hidden on mobile) */}
              {i < phases.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-1/2 w-full h-[1px] bg-primary-foreground/20" />
              )}
              
              <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-2xl p-8 backdrop-blur-sm h-full flex flex-col items-center text-center relative z-10 hover:bg-primary-foreground/20 transition-colors">
                <span className="text-4xl font-serif font-bold text-accent mb-4 block">
                  {phase.num}
                </span>
                <h3 className="text-2xl font-bold mb-1 tracking-wider">{phase.title}</h3>
                <h4 className="text-sm font-medium text-primary-foreground/90 mb-4">{phase.subtitle}</h4>
                <div className="w-8 h-[2px] bg-accent mb-4" />
                <p className="text-sm text-primary-foreground/70 leading-relaxed">
                  {phase.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
