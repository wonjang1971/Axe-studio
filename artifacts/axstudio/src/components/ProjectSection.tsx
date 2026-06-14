import { motion } from "framer-motion";

export function ProjectSection() {
  return (
    <section id="project" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden shadow-xl"
            >
              <img
                src="/project-bg.png"
                alt="승경아 놀자 타임슬립"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <span className="text-xs font-bold tracking-widest uppercase opacity-70">Family Historical Fantasy</span>
                <p className="text-lg font-serif font-bold mt-0.5 drop-shadow">시간이 열린다 — 타임슬립 판타지</p>
              </div>
            </motion.div>
          </div>
          
          <div className="lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Main Project</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                드라마부터 보드게임,<br />그리고 에듀케이션까지
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                '승경아 놀자'는 단순한 영상을 넘어선 확장형 IP입니다. 조선 시대 관직을 오르는 전통 놀이 '승경도'를 기반으로, 아이들이 역사 속으로 직접 뛰어드는 흥미진진한 드라마와 이를 직접 체험할 수 있는 디지털 보드게임으로 완성됩니다.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid sm:grid-cols-2 gap-6"
            >
              <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
                <h4 className="text-xl font-bold text-foreground mb-3">EBS 드라마</h4>
                <p className="text-sm text-muted-foreground">현대의 아이들이 조선 시대로 타임슬립하여 겪는 모험을 그린 웰메이드 역사 판타지 시리즈.</p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border shadow-sm">
                <h4 className="text-xl font-bold text-foreground mb-3">디지털 보드게임</h4>
                <p className="text-sm text-muted-foreground">드라마의 감동을 그대로, 친구들과 함께 즐기는 승경도 디지털 멀티플레이어 보드게임.</p>
              </div>
              <div className="p-6 bg-card rounded-xl border border-border shadow-sm sm:col-span-2">
                <h4 className="text-xl font-bold text-foreground mb-3">에듀테인먼트 IP</h4>
                <p className="text-sm text-muted-foreground">자연스럽게 우리 역사와 관직 제도를 배우는 교육적 가치를 결합하여, 부모와 아이가 모두 만족하는 가족형 콘텐츠.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
