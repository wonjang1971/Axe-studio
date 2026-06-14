import { motion } from "framer-motion";

export function CompanySection() {
  const companyFacts = [
    { label: "법인명", value: "주식회사 액스스튜디오 (AX STUDIO)" },
    { label: "설립일", value: "2025년 6월 25일" },
    { label: "소재지", value: "경기도 파주시 헤이리 예술마을" },
    { label: "주요업종", value: "방송프로그램제작 및 공급업, 영화상영업" },
    { label: "제작공간", value: "서울영상위원회 (2026년 2월 입주 선정)" },
    { label: "메인IP", value: "승경아 놀자" },
    { label: "현재준비", value: "EBS 드라마 + 디지털보드게임" },
  ];

  return (
    <section id="company" className="py-24 bg-card border-y border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">회사정보</h2>
            <p className="text-muted-foreground">
              신뢰할 수 있는 파트너, 액스스튜디오가 만들어갑니다.
            </p>
          </div>

          <div className="bg-background rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
              {/* Logo & Vision Area */}
              <div className="p-12 flex flex-col justify-center items-center text-center bg-muted/30">
                <h3 className="text-3xl font-serif font-bold tracking-tighter text-foreground mb-6">
                  AX STUDIO
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  우리는 가장 한국적인 이야기를<br />
                  가장 현대적인 방식으로 풀어내는<br />
                  크리에이티브 프로덕션입니다.
                </p>
              </div>

              {/* Facts Area */}
              <div className="p-8 md:p-12">
                <dl className="space-y-6">
                  {companyFacts.map((fact, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 border-b border-border/50 pb-4 last:border-0 last:pb-0">
                      <dt className="w-24 text-sm font-semibold text-muted-foreground shrink-0">{fact.label}</dt>
                      <dd className="text-base text-foreground font-medium">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
