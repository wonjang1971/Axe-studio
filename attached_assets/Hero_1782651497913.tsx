import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export function Hero() {
  const [, navigate] = useLocation();

  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[680px] h-[100svh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('/poster.png?v=3')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#100b07]/72 via-[#1d140c]/58 to-[#090605]/94" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#090605]/82 via-transparent to-[#090605]/76" />

      <div className="relative z-10 container mx-auto px-5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex px-4 py-1.5 rounded-full border text-[11px] md:text-xs font-bold tracking-[0.18em] uppercase mb-5"
            style={{
              borderColor: "rgba(218,170,86,0.55)",
              color: "#f4d28d",
              background: "rgba(120,70,28,0.22)",
            }}
          >
            Historical Fantasy Adventure
          </motion.span>

          <h1
            className="font-serif font-black leading-[0.95] drop-shadow-2xl"
            style={{ color: "#f4d28d", textShadow: "0 4px 42px rgba(0,0,0,0.9)" }}
          >
            <span className="block text-6xl md:text-8xl lg:text-[9rem]">승경도</span>
            <span className="block mt-3 text-3xl md:text-5xl lg:text-6xl">승경아 놀자</span>
          </h1>

          <p
            className="mt-6 text-base md:text-xl font-light max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,250,240,0.88)" }}
          >
            조선시대 보드게임에 빨려 들어간 네 아이가 잊힌 사람들의 기억을 복원하고,
            납치된 엄마를 되찾기 위해 판 자체를 다시 쓰는 타임슬립 어드벤처.
          </p>

          <p
            className="mt-4 text-sm md:text-base font-medium"
            style={{ color: "rgba(244,210,141,0.9)" }}
          >
            위인은 기록되지만, 민초는 기억되어야 한다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-8">
            <Button
              size="lg"
              data-testid="button-project"
              className="w-full sm:w-auto text-base px-8 h-12 font-bold"
              style={{ background: "#c99a45", color: "#17110a", border: "none" }}
              onClick={() => scrollTo("#project")}
            >
              프로젝트 보기
            </Button>
            <Button
              size="lg"
              variant="outline"
              data-testid="button-audition"
              className="w-full sm:w-auto text-base px-8 h-12 font-bold"
              style={{
                background: "rgba(255,250,240,0.08)",
                borderColor: "rgba(255,250,240,0.34)",
                color: "#fffaf0",
              }}
              onClick={() => navigate("/casting")}
            >
              오디션 안내
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-5 md:left-10 text-[11px] z-10 max-w-[240px]"
        style={{ color: "rgba(255,250,240,0.46)" }}
      >
        AXE Studio flagship IP in development
      </motion.p>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div
          className="w-px h-14 mx-auto"
          style={{ background: "linear-gradient(to bottom, rgba(201,154,69,0.6), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
