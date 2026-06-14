import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useGetSiteStats } from "@workspace/api-client-react";

export function Footer() {
  const { data: stats } = useGetSiteStats();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="bg-foreground text-background pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-16 mb-16">
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-3xl font-serif font-bold tracking-tighter text-white">
              AX STUDIO
            </h2>
            <p className="text-background/70 text-sm leading-relaxed max-w-sm">
              우리는 가장 한국적인 이야기를 가장 현대적인 방식으로 풀어내는 크리에이티브 프로덕션입니다.
            </p>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-4 h-4 bg-primary rounded-full animate-pulse inline-block" />
                공식 공지사항
              </h3>
              <ul className="space-y-4 text-sm text-background/80">
                <li className="border-b border-background/10 pb-4">
                  <span className="block text-primary mb-1">2026.02</span>
                  서울영상위원회 제작공간 입주 확정
                </li>
                <li className="border-b border-background/10 pb-4">
                  <span className="block text-primary mb-1">진행중</span>
                  '승경아 놀자' 주연 아역배우 오디션 모집 중
                </li>
              </ul>
            </div>
            
            <div className="bg-background/5 p-6 rounded-xl border border-background/10">
              <h3 className="text-lg font-bold text-white mb-4">현재 현황</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-background/70 text-sm">오픈된 배역</span>
                  <span className="text-xl font-bold text-accent">{stats?.openRoles || 0}개</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-background/70 text-sm">누적 지원자</span>
                  <span className="text-xl font-bold text-accent">{stats?.totalApplications || 0}명</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-background/70 text-sm">제휴 문의</span>
                  <span className="text-xl font-bold text-accent">{stats?.totalInquiries || 0}건</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-background/10 text-sm text-background/50">
          <p>© {new Date().getFullYear()} AX STUDIO. All rights reserved.</p>
          
          <button 
            onClick={scrollToTop}
            className="mt-6 md:mt-0 flex items-center gap-2 hover:text-white transition-colors group"
          >
            맨 위로 가기
            <span className="p-2 bg-background/10 rounded-full group-hover:bg-primary transition-colors">
              <ArrowUp className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
