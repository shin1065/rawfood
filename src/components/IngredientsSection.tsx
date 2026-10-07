import React, { useState } from 'react';
import { DOMESTIC_50_INGREDIENTS, Ingredient } from '../data/ingredientsData';
import { Sparkles, MapPin, Check, ChevronRight, RefreshCw } from 'lucide-react';

export const IngredientsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['전체', '곡물류', '채소&야채류', '버섯&해조류', '구근&과일'];

  const filteredIngredients = DOMESTIC_50_INGREDIENTS.filter((item) => {
    const matchesCat = selectedCategory === '전체' || item.category === selectedCategory;
    const matchesSearch = item.name.includes(searchTerm) || item.origin.includes(searchTerm);
    return matchesCat && matchesSearch;
  });

  return (
    <section id="ingredients" className="py-14 sm:py-20 bg-white border-b border-[#E8DFD1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#EAF2E8] text-[#2F5233] px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold mb-3">
            <Sparkles className="w-4 h-4" />
            <span>100% 원산지 투명 공개</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#1B381E] leading-tight mb-4 text-balance">
            신선한 국내산 50가지<br />
            곡물과 채소를 통째로 담았습니다
          </h2>
          <p className="text-base sm:text-lg text-[#524636] font-medium leading-relaxed">
            전국 방방곡곡 우리 땅에서 건강하게 자란 50가지 엄선된 곡물, 야채, 버섯, 해조류를 
            열 가공 없이 동결건조하여 고소한 원재료 풍미를 살렸습니다.
          </p>
        </div>

        {/* Highlight Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
          
          {/* Image */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden border-2 border-[#E8DFD1] shadow-md bg-[#FAF7F2]">
              <img
                src="/src/assets/images/raw_ingredients_50_1791342098387.jpg"
                alt="국내산 50가지 신선한 원재료"
                className="w-full h-[320px] sm:h-[380px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-[#FAF7F2] border-t border-[#E8DFD1]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#6B5E4C]">동결건조(Freeze-Drying) 공법</span>
                  <span className="text-xs font-extrabold text-[#2F5233] bg-[#EAF2E8] px-2.5 py-1 rounded-md">영양소 보존</span>
                </div>
                <p className="text-xs text-[#524636] mt-2 font-medium">
                  영하 40도 이하에서 급속 동결시킨 후 수분을 승화시켜 영양소 손실과 맛 변질을 방지합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Key Facts & Process */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD1] flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-[#2F5233] text-white flex items-center justify-center font-black text-xl shrink-0 shadow-xs">
                🌾
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1B381E] mb-1">
                  풍부한 통곡물 18종 (현미·발아현미·보리·검은깨 등)
                </h3>
                <p className="text-sm text-[#524636]">
                  껍질째 갈아 만든 국내산 통곡물로 씹을수록 깊고 은은한 고소함과 든든함이 오래 지속됩니다.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD1] flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-[#3D6A42] text-white flex items-center justify-center font-black text-xl shrink-0 shadow-xs">
                🥬
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1B381E] mb-1">
                  신선한 영양 야채 16종 (케일·시금치·양배추·단호박 등)
                </h3>
                <p className="text-sm text-[#524636]">
                  평소 챙겨 먹기 힘든 녹황색 채소와 뿌리 야채를 수확 직후 신선하게 담아 담백하게 조화됩니다.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DFD1] flex gap-4 items-start">
              <div className="w-12 h-12 rounded-xl bg-[#6E5033] text-white flex items-center justify-center font-black text-xl shrink-0 shadow-xs">
                🍄
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1B381E] mb-1">
                  자연의 버섯 & 해조류 & 구근류 16종 (표고·다시마·고구마·마)
                </h3>
                <p className="text-sm text-[#524636]">
                  청정 완도 미역, 다시마와 강원 표고버섯, 안동 마가 균형을 이루어 더욱 깊고 감칠맛 나는 깔끔함을 선사합니다.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* 50 Ingredients Interactive Browser */}
        <div className="bg-[#FAF7F2] rounded-3xl p-5 sm:p-8 border border-[#E8DFD1] shadow-xs">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#E8DFD1]">
            <div>
              <h3 className="text-lg sm:text-2xl font-black text-[#1B381E] flex items-center gap-2">
                <span>국내산 50가지 원재료 도감</span>
                <span className="text-xs bg-[#2F5233] text-white font-bold px-2.5 py-0.5 rounded-full">
                  총 50가지
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-[#6B5E4C] mt-1 font-medium">
                탭을 클릭해 카테고리별 국내산 농산물 원산지를 확인해 보세요.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="원재료명 검색 (예: 케일, 보리)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 px-4 py-2 pl-9 bg-white border border-[#DCD0BE] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233] text-[#222222]"
              />
              <span className="absolute left-3 top-2.5 text-[#8C7A65] text-xs">🔍</span>
            </div>
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {categories.map((cat) => {
              const count = cat === '전체' 
                ? 50 
                : DOMESTIC_50_INGREDIENTS.filter(i => i.category === cat).length;
              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#2F5233] text-white shadow-xs'
                      : 'bg-white text-[#524636] border border-[#E0D5C3] hover:bg-[#F3EDE2]'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Ingredients Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-96 overflow-y-auto pr-1">
            {filteredIngredients.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 rounded-xl border border-[#E8DFD1] hover:border-[#2F5233] transition-all flex flex-col justify-between group shadow-2xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-extrabold text-[#2F5233]">{item.id}번</span>
                  <span className="text-[10px] bg-[#EAF2E8] text-[#1B381E] font-bold px-1.5 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>
                <div className="text-sm font-black text-[#1B381E] group-hover:text-[#2F5233] transition-colors">
                  {item.name}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#6B5E4C] mt-2 pt-2 border-t border-[#F3EDE2]">
                  <MapPin className="w-3 h-3 text-[#2F5233] shrink-0" />
                  <span className="truncate">{item.origin}</span>
                </div>
              </div>
            ))}
          </div>

          {filteredIngredients.length === 0 && (
            <div className="text-center py-10 text-[#6B5E4C] text-sm">
              검색 조건과 일치하는 원재료가 없습니다.
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-[#E8DFD1] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B5E4C]">
            <span className="font-semibold">※ 100% 농가 상생 정품 국내산 수확 원재료 사용</span>
            <span className="mt-1 sm:mt-0 text-[11px] text-[#8C7A65]">원료 산지는 농가 수확 시기에 따라 일부 변경될 수 있습니다.</span>
          </div>

        </div>

      </div>
    </section>
  );
};
