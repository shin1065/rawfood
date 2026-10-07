import React, { useState } from 'react';
import { GlassWater, Milk, Coffee, Sparkles, Check, Flame } from 'lucide-react';

export const DrinkingGuideSection: React.FC = () => {
  const [activeBeverage, setActiveBeverage] = useState<'water' | 'milk' | 'soymilk'>('milk');

  const drinkOptions = {
    water: {
      title: '시원한 물 200ml',
      desc: '국내산 50가지 원재료 본연의 깔끔하고 개운한 퓨어 고소함',
      calories: '약 115 kcal (생식 1포 기준)',
      tasteScore: '깔끔함 ★★★★★ / 담백함 ★★★★☆',
      tip: '아침에 가볍게 속을 적시고 싶을 때 가장 깔끔합니다.',
    },
    milk: {
      title: '고소한 우유 200ml',
      desc: '미숫가루 라떼처럼 풍부하고 부드러우며 든든함이 오래 지속되는 조합',
      calories: '약 235 kcal (생식 1포 + 우유 기준)',
      tasteScore: '부드러움 ★★★★★ / 포만감 ★★★★★',
      tip: '가장 많은 고객분들이 선호하시는 베스트 시그니처 레시피입니다!',
    },
    soymilk: {
      title: '담백한 두유 200ml',
      desc: '콩의 건강한 진함이 어우러져 더욱 묵직하고 구수한 깊은 맛',
      calories: '약 215 kcal (생식 1포 + 두유 기준)',
      tasteScore: '구수함 ★★★★★ / 영양 균형 ★★★★★',
      tip: '유제품 섭취가 부대끼는 분들께 강력 추천해 드립니다.',
    },
  };

  return (
    <section id="how-to-drink" className="py-14 sm:py-20 bg-white border-b border-[#E8DFD1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs sm:text-sm font-extrabold text-[#2F5233] bg-[#EAF2E8] px-3.5 py-1 rounded-full">
            EASY 3-STEP RECIPE
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-[#1B381E] mt-3 mb-4 leading-tight text-balance">
            물이나 우유에 타서 맛있게 드세요!
          </h2>
          <p className="text-base sm:text-lg text-[#524636] font-medium leading-relaxed">
            전용 쉐이커만 있으면 10초 만에 고소하고 풍성한 한 끼가 완성됩니다.
          </p>
        </div>

        {/* 1 -> 2 -> 3 Sequence Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-14">
          
          {/* Step 1 */}
          <div className="relative bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border-2 border-[#E8DFD1] hover:border-[#2F5233] transition-all group flex flex-col justify-between">
            <div>
              {/* Sequence Indicator Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#2F5233] text-white flex items-center justify-center text-xl font-black shadow-sm">
                  1
                </div>
                <span className="text-xs font-black text-[#2F5233] bg-[#EAF2E8] px-3 py-1 rounded-full">
                  STEP 01
                </span>
              </div>

              <div className="text-4xl mb-4 text-center">🥛</div>

              <h3 className="text-xl font-black text-[#1B381E] text-center mb-2">
                음료 200ml 준비
              </h3>
              <p className="text-sm text-[#524636] text-center leading-relaxed">
                전용 쉐이커 보틀 표시선까지 <br />
                <strong className="text-[#2F5233] font-bold">물, 우유 또는 두유 200ml</strong>를 먼저 따라주세요.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8DFD1] text-xs text-[#6B5E4C] text-center font-semibold">
              💡 팁: 음료를 먼저 넣어야 가루가 바닥에 남지 않습니다.
            </div>

            {/* Mobile Arrow */}
            <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#2F5233] text-white flex items-center justify-center font-black text-sm shadow-md">
              →
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border-2 border-[#E8DFD1] hover:border-[#2F5233] transition-all group flex flex-col justify-between">
            <div>
              {/* Sequence Indicator Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#2F5233] text-white flex items-center justify-center text-xl font-black shadow-sm">
                  2
                </div>
                <span className="text-xs font-black text-[#2F5233] bg-[#EAF2E8] px-3 py-1 rounded-full">
                  STEP 02
                </span>
              </div>

              <div className="text-4xl mb-4 text-center">🌾</div>

              <h3 className="text-xl font-black text-[#1B381E] text-center mb-2">
                생식 1포 넣기
              </h3>
              <p className="text-sm text-[#524636] text-center leading-relaxed">
                이지컷 개별 포장 생식 스틱 <br />
                <strong className="text-[#2F5233] font-bold">1포(35g)</strong>를 보틀 안에 부어줍니다.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8DFD1] text-xs text-[#6B5E4C] text-center font-semibold">
              ✨ 가방에 1포씩 간편하게 휴대하세요!
            </div>

            {/* Mobile Arrow */}
            <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-[#2F5233] text-white flex items-center justify-center font-black text-sm shadow-md">
              →
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border-2 border-[#E8DFD1] hover:border-[#2F5233] transition-all group flex flex-col justify-between">
            <div>
              {/* Sequence Indicator Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#2F5233] text-white flex items-center justify-center text-xl font-black shadow-sm">
                  3
                </div>
                <span className="text-xs font-black text-[#2F5233] bg-[#EAF2E8] px-3 py-1 rounded-full">
                  STEP 03
                </span>
              </div>

              <div className="text-4xl mb-4 text-center">🧋</div>

              <h3 className="text-xl font-black text-[#1B381E] text-center mb-2">
                5~10초 쉐이킹!
              </h3>
              <p className="text-sm text-[#524636] text-center leading-relaxed">
                뚜껑을 꼭 닫고 5~10초간 잘 흔들어 <br />
                <strong className="text-[#2F5233] font-bold">고소하고 풍부하게</strong> 마십니다.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8DFD1] text-xs text-[#6B5E4C] text-center font-semibold">
              🍯 꿀 1스푼이나 견과류를 곁들여도 별미입니다!
            </div>
          </div>

        </div>

        {/* Beverage Flavor Pairing Interactive Calculator */}
        <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#E8DFD1]">
          <div className="text-center mb-6">
            <h3 className="text-lg sm:text-2xl font-black text-[#1B381E]">
              나에게 꼭 맞는 베스트 페어링 찾기
            </h3>
            <p className="text-xs sm:text-sm text-[#6B5E4C] mt-1 font-medium">
              원하시는 음료 종류를 선택하면 맛과 특징을 확인하실 수 있습니다.
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto mb-6">
            <button
              onClick={() => setActiveBeverage('water')}
              className={`p-3 sm:p-4 rounded-2xl border text-center transition-all cursor-pointer font-bold text-xs sm:text-sm flex flex-col items-center gap-1.5 ${
                activeBeverage === 'water'
                  ? 'bg-[#2F5233] text-white border-[#2F5233] shadow-sm'
                  : 'bg-white text-[#524636] border-[#E0D5C3] hover:bg-[#F3EDE2]'
              }`}
            >
              <GlassWater className="w-5 h-5" />
              <span>물 (Water)</span>
            </button>

            <button
              onClick={() => setActiveBeverage('milk')}
              className={`p-3 sm:p-4 rounded-2xl border text-center transition-all cursor-pointer font-bold text-xs sm:text-sm flex flex-col items-center gap-1.5 ${
                activeBeverage === 'milk'
                  ? 'bg-[#2F5233] text-white border-[#2F5233] shadow-sm'
                  : 'bg-white text-[#524636] border-[#E0D5C3] hover:bg-[#F3EDE2]'
              }`}
            >
              <Milk className="w-5 h-5" />
              <span>우유 (Milk) ★추천</span>
            </button>

            <button
              onClick={() => setActiveBeverage('soymilk')}
              className={`p-3 sm:p-4 rounded-2xl border text-center transition-all cursor-pointer font-bold text-xs sm:text-sm flex flex-col items-center gap-1.5 ${
                activeBeverage === 'soymilk'
                  ? 'bg-[#2F5233] text-white border-[#2F5233] shadow-sm'
                  : 'bg-white text-[#524636] border-[#E0D5C3] hover:bg-[#F3EDE2]'
              }`}
            >
              <Coffee className="w-5 h-5" />
              <span>두유 (Soy Milk)</span>
            </button>
          </div>

          {/* Selected Recipe Result Box */}
          <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#E0D5C3] max-w-2xl mx-auto text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base sm:text-lg font-black text-[#1B381E]">
                  {drinkOptions[activeBeverage].title}
                </span>
                <span className="text-xs bg-[#EAF2E8] text-[#2F5233] font-bold px-2 py-0.5 rounded">
                  {drinkOptions[activeBeverage].calories}
                </span>
              </div>
              <p className="text-sm text-[#524636] mb-2 font-medium">
                {drinkOptions[activeBeverage].desc}
              </p>
              <div className="text-xs text-[#2F5233] font-bold">
                {drinkOptions[activeBeverage].tasteScore}
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-3 rounded-xl border border-[#E8DFD1] text-xs text-[#6B5E4C] max-w-xs shrink-0">
              <span className="font-bold text-[#1B381E] block mb-1">💡 꿀팁 포인트</span>
              {drinkOptions[activeBeverage].tip}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
