import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { AuditionSection } from "@/components/AuditionSection";
import { Footer } from "@/components/Footer";

export default function CastingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "캐스팅 | AXE Studio";
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col font-sans">
      <Navbar />
      <main className="flex-1 pt-24">
        <AuditionSection />
      </main>
      <Footer />
    </div>
  );
}
