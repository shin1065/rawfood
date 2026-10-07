import React from 'react';
import { Sun, Clock, Heart, CheckCircle2, ArrowRight } from 'lucide-react';

interface TargetAudienceProps {
  onOrderClick: () => void;
}

export const TargetAudienceSection: React.FC<TargetAudienceProps> = ({ onOrderClick }) => {
  const targetCards = [
    {
      id: 1,
      badge: '추천 대상 01',
      icon: Sun,
      title: '아침을 자주 거르시는 분',
      subTitle: '바쁜 출근길·등굣길, 1분 만에 끝내는 아침 식사',
      description: '아침에 식사 준비할 시간이 부족해 빈속으로 집을 나서시는 직장인과 학생분들께 딱 맞습니다. 쉐이커에 넣어 흔들면 이동 중에도 간편하게 속을 든든하게 채울 수 있습니다.',
      highlights: ['바쁜 출근 시간 1분 완성', '빈속을 부드럽게 채워주는 따뜻한 고소함', '개별 포장으로 가방 속에 쏙'],
      badgeBg: 'bg-[#FEF3C7]',
      badgeText: 'text-[#92400E]',
      accentBorder: 'border-l-4 border-l-[#F59E0B]',
    },
    {
      id: 2,
      badge: '추천 대상 02',
      icon: Clock,
      title: '매번 끼니 챙기기 번거로운 분',
      subTitle: '장보기·조리·설거지 걱정 없는 원스톱 라이프',
      description: '혼자 사시거나 자취하시는 분, 매 끼니 인스턴트나 배달 음식 대신 신선하고 깨끗한 50가지 국내산 자원 재료를 챙겨 드시고 싶은 분을 위한 가장 똑똑한 식사 대안입니다.',
      highlights: ['조리 도구와 설거지 걱정 ZERO', '인스턴트 대신 50가지 자연 곡물 영양', '유통기한 걱정 없는 위생 스틱 포장'],
      badgeBg: 'bg-[#EAF2E8]',
      badgeText: 'text-[#2F5233]',
      accentBorder: 'border-l-4 border-l-[#2F5233]',
    },
    {
      id: 3,
      badge: '추천 대상 03',
      icon: Heart,
      title: '속 부담 없이 고소한 한 끼를 원하시는 분',
      subTitle: '더부룩함 없이 하루 종일 가볍고 편안한 느낌',
      description: '밀가루나 기름진 음식으로 쉽게 속이 부대끼시는 분들께 자연에서 온 50가지 곡물과 채소의 부드러움이 속을 편안하게 감싸주어 온 가족이 안심하고 드실 수 있습니다.',
      highlights: ['자극 없이 깔끔하고 담백한 풍미', '속이 부대끼지 않는 부드러움', '부모님·남녀노소 누구나 좋아하는 자극 없는 맛'],
      badgeBg: 'bg-[#FCE7F3]',
      badgeText: 'text-[#9D174D]',
      accentBorder: 'border-l-4 border-l-[#DB2777]',
    },
  ];

  return (
    <section id="recommendation" className="py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-extrabold text-[#2F5233] bg-[#EAF2E8] px-3.5 py-1 rounded-full">
            FOR YOUR DAILY ROUTINE
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#1B381E] mt-3 mb-4 leading-tight text-balance">
            이런 분께 더욱 좋아요!
          </h2>
          <p className="text-base sm:text-lg text-[#524636] font-medium leading-relaxed">
            매일 반복되는 일상 속, 건강하고 간편하게 나를 챙기는 가장 쉬운 방법
          </p>
        </div>

        {/* 3 Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {targetCards.map((card) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.id}
                className={`bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFD1] shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between ${card.accentBorder}`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className={`text-xs font-black px-3 py-1 rounded-full ${card.badgeBg} ${card.badgeText}`}>
                      {card.badge}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD1] flex items-center justify-center text-[#2F5233] shadow-2xs">
                      <IconComponent className="w-6 h-6 text-[#2F5233]" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-black text-[#1B381E] mb-2 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-[#2F5233] mb-4">
                    {card.subTitle}
                  </p>

                  <p className="text-sm text-[#524636] leading-relaxed mb-6 font-normal">
                    {card.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-4 border-t border-[#F3EDE2] space-y-2">
                  {card.highlights.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-[#2A231A]">
                      <CheckCircle2 className="w-4 h-4 text-[#2F5233] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Prompt */}
        <div className="bg-[#2F5233] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-black mb-2">
              내 일상에 딱 맞는 간편한 한 끼, 지금 바로 시작해 보세요!
            </h3>
            <p className="text-xs sm:text-sm text-[#D1E6CF] font-medium">
              신규 주문 고객 전원 친환경 전용 쉐이커 보틀 100% 증정 이벤트 진행 중
            </p>
          </div>

          <button
            onClick={onOrderClick}
            className="w-full sm:w-auto whitespace-nowrap bg-white text-[#2F5233] hover:bg-[#F3EDE2] active:scale-98 px-7 py-3.5 rounded-2xl font-black text-base shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>혜택 받고 주문하기</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
