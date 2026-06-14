import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      >
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-background via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground border border-primary/30 text-sm font-medium tracking-widest uppercase mb-4">
            AXE Studio Flagship IP
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white drop-shadow-lg leading-tight">
            승경아 놀자
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
            승경도 판 위에서 펼쳐지는 아이들의 조선 시대 시간 여행.
            <br className="hidden md:block" /> 
            역사와 전통이 살아 숨 쉬는 웰메이드 역사 판타지가 시작됩니다.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 h-14"
              onClick={() => scrollTo('#project')}
            >
              프로젝트 보기
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full sm:w-auto bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white text-lg px-8 h-14"
              onClick={() => scrollTo('#audition')}
            >
              오디션 안내
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent mx-auto" />
      </motion.div>
    </section>
  );
}
