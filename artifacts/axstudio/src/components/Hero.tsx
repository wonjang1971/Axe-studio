import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import yunmokImg from "@assets/승경도윤목_온양민속박물관_1781435682818.jpg";

export function Hero() {
  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background — actual historical Seunggyeongdo board */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: "url('/seunggyeongdo-board.jpg?v=2')" }}
      />

      {/* Warm sepia-to-dark overlay — preserves the aged paper feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1208]/70 via-[#2c1c0a]/60 to-[#0d0905]/92" />
      {/* Side vignettes */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d0905]/80 via-transparent to-[#0d0905]/80" />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="max-w-3xl mx-auto space-y-5"
        >
          {/* Eyebrow badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block px-4 py-1.5 rounded-full border text-xs font-bold tracking-[0.22em] uppercase mb-2"
            style={{
              borderColor: "rgba(201,154,69,0.5)",
              color: "#f4d28d",
              background: "rgba(201,154,69,0.12)",
            }}
          >
            조선시대 실존 전통 놀이 원작 · AXE Studio Flagship IP
          </motion.span>

          <h1
            className="font-serif font-bold leading-tight drop-shadow-2xl space-y-1"
            style={{ color: "#fffaf0", textShadow: "0 4px 32px rgba(0,0,0,0.7)" }}
          >
            <span className="block text-5xl md:text-7xl lg:text-8xl tracking-widest" style={{ color: "#f4d28d" }}>
              승경도
            </span>
            <span className="block text-6xl md:text-8xl lg:text-9xl">
              승경아 놀자
            </span>
          </h1>

          <p
            className="text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,250,240,0.84)" }}
          >
            조선시대 실제 관직 체험 놀이 <strong style={{ color: "#f4d28d" }}>승경도</strong>를 원작으로 한
            온 가족 역사 판타지 타임슬립 드라마.
            이순신 장군의 난중일기에도 기록된 전통 놀이가, 아이들의 모험으로 다시 깨어납니다.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button
              size="lg"
              data-testid="button-project"
              className="w-full sm:w-auto text-base px-8 h-13 font-bold"
              style={{ background: "#c99a45", color: "#17110a", border: "none" }}
              onClick={() => scrollTo("#project")}
            >
              프로젝트 보기
            </Button>
            <Button
              size="lg"
              variant="outline"
              data-testid="button-audition"
              className="w-full sm:w-auto text-base px-8 h-13 font-bold"
              style={{
                background: "rgba(255,250,240,0.07)",
                borderColor: "rgba(255,250,240,0.3)",
                color: "#fffaf0",
              }}
              onClick={() => scrollTo("#audition")}
            >
              오디션 안내
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Yunmok badge — bottom right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="absolute bottom-10 right-6 md:right-12 flex items-end gap-3 z-10"
      >
        <div className="text-right">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-0.5"
            style={{ color: "#f4d28d" }}
          >
            윤목 (오각형 주사위)
          </p>
          <p
            className="text-[11px] leading-snug max-w-[160px]"
            style={{ color: "rgba(255,250,240,0.55)" }}
          >
            온양민속박물관 소장
          </p>
        </div>
        <img
          src={yunmokImg}
          alt="승경도 윤목 — 온양민속박물관 소장"
          className="w-20 h-14 object-cover rounded-md shadow-lg"
          style={{ border: "1px solid rgba(201,154,69,0.35)" }}
        />
      </motion.div>

      {/* Source credit — bottom left */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-10 left-6 md:left-12 text-[11px] z-10"
        style={{ color: "rgba(255,250,240,0.38)" }}
      >
        승경도 놀이판 원본 이미지 © 국립민속박물관
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
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
