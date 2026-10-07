import React, { useState } from 'react';
import { PRODUCT_OPTIONS, ProductOption } from '../data/ingredientsData';
import { CheckCircle2, Gift, Truck, ShieldCheck, ArrowRight, Sparkles, Star } from 'lucide-react';

interface ProductOrderSectionProps {
  onOrderClick: (selectedOption: ProductOption) => void;
}

export const ProductOrderSection: React.FC<ProductOrderSectionProps> = ({ onOrderClick }) => {
  const [selectedId, setSelectedId] = useState<string>('double'); // default to 2-month popular set

  const selectedOption = PRODUCT_OPTIONS.find((opt) => opt.id === selectedId) || PRODUCT_OPTIONS[0];

  return (
    <section id="order" className="py-14 sm:py-20 bg-[#FAF7F2] border-b border-[#E8DFD1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#EAF2E8] text-[#2F5233] px-3.5 py-1 rounded-full text-xs sm:text-sm font-extrabold mb-3">
            <Sparkles className="w-4 h-4" />
            <span>SPECIAL OFFER EVENT</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#1B381E] mb-3 leading-tight text-balance">
            하루한잔 국내산 50 생식 세트
          </h2>
          <p className="text-base sm:text-lg text-[#524636] font-medium leading-relaxed">
            원재료의 고소함을 매일 아침 부담 없이 만나보세요.
          </p>
        </div>

        {/* Product Order Box Card Container */}
        <div className="bg-white rounded-3xl border-2 border-[#E8DFD1] shadow-xl overflow-hidden p-6 sm:p-10 max-w-4xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Product Image & Bonus Gifts */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative rounded-2xl overflow-hidden border border-[#E8DFD1] bg-[#FAF7F2] w-full max-w-xs sm:max-w-none shadow-sm">
                <img
                  src="/src/assets/images/product_box_bottle_1791342110344.jpg"
                  alt="하루한잔 국내산 50 생식 패키지 및 쉐이커"
                  className="w-full h-64 sm:h-80 object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Free gift tag badge */}
                <div className="absolute top-3 left-3 bg-[#2F5233] text-white text-xs font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-md">
                  <Gift className="w-4 h-4" />
                  <span>쉐이커 보틀 100% 무료증정</span>
                </div>
              </div>

              {/* Guarantees */}
              <div className="mt-4 grid grid-cols-2 gap-2 w-full text-center">
                <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E8DFD1] flex items-center justify-center gap-1.5 text-xs font-bold text-[#1B381E]">
                  <Truck className="w-4 h-4 text-[#2F5233]" />
                  <span>전 상품 무료배송</span>
                </div>
                <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-[#E8DFD1] flex items-center justify-center gap-1.5 text-xs font-bold text-[#1B381E]">
                  <ShieldCheck className="w-4 h-4 text-[#2F5233]" />
                  <span>100% 국내산 보장</span>
                </div>
              </div>
            </div>

            {/* Right Product Selection & Big Order Button */}
            <div className="lg:col-span-7 space-y-6">
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex text-[#F59E0B]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-[#6B5E4C]">고객 만족도 4.9/5.0</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-black text-[#1B381E] leading-snug">
                  [하루한잔] 국내산 50 곡물채소 생식
                </h3>
                <p className="text-sm text-[#6B5E4C] mt-1 font-medium">
                  1포당 35g 개별 이지컷 스틱 포장 / 동결건조 원재료 100%
                </p>
              </div>

              {/* Package Options */}
              <div className="space-y-3">
                <label className="block text-xs sm:text-sm font-black text-[#1B381E]">
                  옵션 선택하기
                </label>

                {PRODUCT_OPTIONS.map((opt) => {
                  const isSelected = opt.id === selectedId;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedId(opt.id)}
                      className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#2F5233] bg-[#EAF2E8]/40 ring-1 ring-[#2F5233]'
                          : 'border-[#E8DFD1] bg-white hover:bg-[#FAF7F2]'
                      }`}
                    >
                      {opt.popular && (
                        <span className="absolute -top-2.5 right-4 bg-[#D97706] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                          ★ 가장 많이 찾는 인기구성
                        </span>
                      )}

                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-[#2F5233] bg-[#2F5233]' : 'border-[#C3B59F]'
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>

                        <div>
                          <div className="text-sm sm:text-base font-black text-[#1B381E]">
                            {opt.name}
                          </div>
                          <div className="text-xs text-[#6B5E4C] font-medium">
                            {opt.subText}
                          </div>
                          <div className="text-[11px] text-[#2F5233] font-bold mt-0.5">
                            🎁 {opt.bonusGift}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-[#8C7A65] line-through font-medium">
                          {opt.originalPrice.toLocaleString()}원
                        </div>
                        <div className="text-lg sm:text-xl font-black text-[#2F5233]">
                          {opt.discountPrice.toLocaleString()}원
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Calculation Card */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DFD1] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#6B5E4C] font-semibold block">총 결제 예정 금액</span>
                  <span className="text-xs text-[#2F5233] font-extrabold">무료배송 + 친환경 보틀 증정</span>
                </div>

                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black text-[#1B381E]">
                    {selectedOption.discountPrice.toLocaleString()}
                  </span>
                  <span className="text-base font-bold text-[#1B381E] ml-1">원</span>
                </div>
              </div>

              {/* HUGE ORDER BUTTON */}
              <button
                onClick={() => onOrderClick(selectedOption)}
                className="w-full bg-[#2F5233] hover:bg-[#203D23] active:scale-98 text-white py-4 sm:py-5 rounded-2xl font-black text-xl sm:text-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-3 focus:outline-none focus:ring-4 focus:ring-[#2F5233]/30"
              >
                <span>주문하기</span>
                <ArrowRight className="w-7 h-7" />
              </button>

              <p className="text-center text-xs text-[#6B5E4C] font-medium">
                🔒 카카오페이 / 네이버페이 / 신용카드 / 무통장입금 / 간편결제 지원
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
