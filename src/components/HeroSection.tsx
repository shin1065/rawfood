import React from 'react';
import { ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onOrderClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOrderClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F3EDE2] via-[#FAF7F2] to-[#FAF7F2] pt-8 pb-14 sm:pt-12 sm:pb-20 border-b border-[#E8DFD1]">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E3EFE1] rounded-full blur-3xl opacity-50 -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#EFE6D8] rounded-full blur-3xl opacity-60 -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Sub-tag badge */}
            <div className="inline-flex items-center gap-2 bg-[#EAF2E8] border border-[#C5DDC0] px-3.5 py-1.5 rounded-full text-[#224A26] text-xs sm:text-sm font-bold mb-4 shadow-xs">
              <Sparkles className="w-4 h-4 text-[#2F5233]" />
              <span>100% 국내산 50가지 곡물·채소 동결건조</span>
            </div>

            {/* Main Title - Big prominent fonts */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#1B381E] leading-[1.18] tracking-tight mb-5 text-balance">
              하루한잔,<br />
              <span className="text-[#2F5233] relative inline-block">
                간편한 한끼
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-[#A8CFA3]/60 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Subtext - Focus on ingredients & convenience, no medicine/weight-loss claims */}
            <p className="text-base sm:text-xl text-[#524636] font-medium leading-relaxed mb-8 max-w-xl">
              바쁜 아침 1분 만에 뚝딱! 정성스레 재배한 국내산 곡물과 야채를 
              그대로 담아 입안 가득 감도는 원재료 고소함을 전해드립니다.
            </p>

            {/* Feature Bullet points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 w-full">
              <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-[#E8DFD1]">
                <CheckCircle2 className="w-5 h-5 text-[#2F5233] shrink-0" />
                <span className="text-sm sm:text-base font-bold text-[#2A231A]">국내산 곡물·야채·버섯 50종</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-[#E8DFD1]">
                <CheckCircle2 className="w-5 h-5 text-[#2F5233] shrink-0" />
                <span className="text-sm sm:text-base font-bold text-[#2A231A]">물이나 우유에 10초 쉐이킹</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-[#E8DFD1]">
                <CheckCircle2 className="w-5 h-5 text-[#2F5233] shrink-0" />
                <span className="text-sm sm:text-base font-bold text-[#2A231A]">영양소 파괴 최소화 동결건조</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-[#E8DFD1]">
                <CheckCircle2 className="w-5 h-5 text-[#2F5233] shrink-0" />
                <span className="text-sm sm:text-base font-bold text-[#2A231A]">개별 위생 파우치 1일 1포</span>
              </div>
            </div>

            {/* BIG ORDER BUTTON */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onOrderClick}
                className="group relative inline-flex items-center justify-center gap-3 bg-[#2F5233] hover:bg-[#213C24] active:scale-98 text-white px-8 py-4 sm:py-5 rounded-2xl font-black text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#2F5233]/30"
              >
                <span>지금 간편 주문하기</span>
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
              </button>

              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#6E604F] font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#2F5233]" />
                <span>오늘 주문 시 무료배송 + 쉐이커 보틀 증정</span>
              </div>
            </div>

          </div>

          {/* Right Hero Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="/src/assets/images/hero_saengsik_drink_1791342082434.jpg"
                alt="하루한잔 고소한 생식 한잔"
                className="w-full h-[360px] sm:h-[460px] object-cover hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Overlay card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#E0D5C3] shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#EAF2E8] flex items-center justify-center text-xl">
                    🌾
                  </div>
                  <div>
                    <div className="text-xs text-[#6B5E4C] font-semibold">자연 그대로의 영양</div>
                    <div className="text-sm font-bold text-[#1B381E]">국내산 50가지 원재료 함유</div>
                  </div>
                </div>
                <div className="bg-[#2F5233] text-white px-3 py-1.5 rounded-lg text-xs font-black">
                  1포 35g
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
