import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface StickyMobileBarProps {
  onOrderClick: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOrderClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8DFD1] p-3 shadow-2xl block sm:hidden">
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        
        {/* Left Price Info */}
        <div className="flex flex-col">
          <span className="text-[10px] text-[#6B5E4C] font-extrabold flex items-center gap-1">
            <span className="bg-[#2F5233] text-white px-1.5 py-0.2 rounded text-[9px]">무료배송</span>
            <span>+ 쉐이커 증정</span>
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-[#1B381E]">32,900</span>
            <span className="text-xs font-bold text-[#1B381E]">원</span>
            <span className="text-[10px] text-[#8C7A65] line-through ml-0.5">45,000원</span>
          </div>
        </div>

        {/* Right Big Button */}
        <button
          onClick={onOrderClick}
          className="flex-1 bg-[#2F5233] active:bg-[#203D23] text-white py-3.5 px-5 rounded-2xl font-black text-base shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>주문하기</span>
        </button>

      </div>
    </div>
  );
};
