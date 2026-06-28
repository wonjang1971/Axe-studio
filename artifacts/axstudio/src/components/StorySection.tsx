import { motion } from "framer-motion";
import { Quote, Sparkles, Swords, Compass } from "lucide-react";

const worldview = [
  {
    no: "01",
    title: "승경도에 봉인된 서령과 망각령",
    body: "조선 초기, 말단 서리 승경은 민초의 진실을 담은 '침원록'을 남기다 역모로 몰려 소멸한다. 정혼자 서령은 스스로를 승경도 놀이판에 봉인하고, 대제학 변세겸은 기억을 지우는 '망각령'이 되어 침원록을 12개의 망각비로 흩어 놓는다.",
  },
  {
    no: "02",
    title: "망각비 퀘스트",
    body: "조선의 여러 타임라인에 봉인된 망각비. 한 퀘스트를 깰 때마다 직업을 체험하고, 잊힌 민초의 기억과 삶의 가치를 하나씩 되찾는다. 망각비가 무너질 때마다 침원록의 기억이 놀이판에 새겨진다.",
  },
  {
    no: "03",
    title: "기혈단과 기억자, 회중시계",
    body: "승경·미래·정경·석현은 진실을 복원할 운명을 타고난 '기혈단'의 후손. 그들이 모여야 승경도가 깨어난다. 엄마가 남긴 '회중시계'는 시간의 문을 여는 열쇠이며, 12살 승경은 자신이 600년 전 서리 승경의 환생인 '기억자'임을 각성한다.",
  },
];

export function StorySection() {
  return (
    <section
      id="story"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #150f07 0%, #221708 45%, #150f07 100%)",
      }}
    >
      {/* Slogan banner */}
      <div className="container mx-auto px-5 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-16 md:mb-24"
        >
          <span
            className="inline-block px-4 py-1.5 rounded-full border text-xs font-bold tracking-[0.22em] uppercase mb-7"
            style={{
              borderColor: "rgba(201,154,69,0.5)",
              color: "#f4d28d",
              background: "rgba(201,154,69,0.12)",
            }}
          >
            Drama Slogan
          </span>
          <h2
            className="leading-[1.2] text-[#f4d28d] text-5xl md:text-7xl"
            style={{ fontFamily: "'Nanum Brush Script', 'Noto Serif KR', serif" }}
          >
            위인은 기록되지만,
            <br />
            민초는 기억되어야 한다.
          </h2>
          <p className="mt-6 text-base md:text-lg text-white/65 leading-relaxed">
            역사를 만든 건 위인이 아닌, 민초들이다.
          </p>
        </motion.div>

        {/* Logline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <div className="relative rounded-2xl border border-[#c99a45]/30 bg-white/[0.03] p-7 md:p-10">
            <Quote className="w-8 h-8 text-primary/70 mb-4" />
            <h3 className="text-xs font-bold tracking-widest uppercase text-primary mb-3">
              Logline · 로그라인
            </h3>
            <p className="text-lg md:text-2xl font-serif leading-[1.6] text-white/90">
              조선시대 보드게임 '승경도'에 빨려 들어간 네 아이가 망각비를 깨며
              지워진 민초의 기억 '침원록'을 복원하고, 납치된 엄마를 되찾아
              '판(계급)' 자체를 다시 쓰는 타임슬립 어드벤처.
            </p>
          </div>
        </motion.div>

        {/* 기획의도 & 주제의식 */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-7 max-w-4xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-8"
          >
            <div className="mb-4 bg-primary/15 w-11 h-11 rounded-lg flex items-center justify-center">
              <Compass className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-3">
              기획 의도
            </h3>
            <p className="text-sm md:text-base text-white/65 leading-[1.75]">
              조선 역사의 주인공은 누구였을까? 정사에 남지 않은 이들, 이름조차
              없던 사람들. AI·디지털 세대 아이들이 승경도 놀이판에 빨려 들어가
              조선의 직업과 민중의 삶을 체험하며, 정의·기억·헌신 같은 '삶의
              가치'를 복원하는 공감형 힐링 판타지 어드벤처입니다.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 md:p-8"
          >
            <div className="mb-4 bg-primary/15 w-11 h-11 rounded-lg flex items-center justify-center">
              <Swords className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white mb-3">
              주제 의식
            </h3>
            <p className="text-sm md:text-base text-white/65 leading-[1.75]">
              민초의 기억을 복원하려는 승경과 친구들, 그리고 기록만 남겨 잊게
              만들려는 망각령의 대결. 기억이야말로 진짜 정의입니다. 꿈은 "어떤
              직업을 갖느냐가 아니라, 어떤 가치를 이루는 사람이 될 것인가"라는
              질문을 남깁니다.
            </p>
          </motion.div>
        </div>

        {/* 세계관 */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8 md:mb-10"
          >
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-xl md:text-2xl font-serif font-bold text-white">
              세계관
            </h3>
          </motion.div>

          <div className="space-y-4 md:space-y-5">
            {worldview.map((item, i) => (
              <motion.div
                key={item.no}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-5 md:gap-7 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
              >
                <span className="font-serif text-2xl md:text-4xl font-bold text-primary/60 shrink-0">
                  {item.no}
                </span>
                <div>
                  <h4 className="text-base md:text-lg font-bold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm md:text-base text-white/65 leading-[1.75]">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
