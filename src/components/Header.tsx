import React from 'react';
import { ShoppingBag, Leaf, Search, ShieldCheck, UserCheck, LogOut, User } from 'lucide-react';
import { UserProfile } from './AuthModal';

interface HeaderProps {
  onOrderClick: () => void;
  onOpenAdminModal: () => void;
  onOpenLookupModal: () => void;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOrderClick,
  onOpenAdminModal,
  onOpenLookupModal,
  currentUser,
  onOpenAuthModal,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8DFD1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        
        {/* Zone 1: Brand title */}
        <a href="#" className="flex items-center gap-2 group shrink-0">
          <div className="w-9 h-9 rounded-full bg-[#2F5233] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Leaf className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#1B381E]">
              하루한잔 <span className="text-[#2F5233] font-black">생식</span>
            </span>
            <span className="text-[10px] text-[#6B5E4C] font-medium tracking-wide hidden sm:inline">
              100% 국내산 50가지 곡물·채소
            </span>
          </div>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-[#4A3F31]">
          <a href="#ingredients" className="hover:text-[#2F5233] transition-colors py-1">
            국내산 50가지 원재료
          </a>
          <a href="#recommendation" className="hover:text-[#2F5233] transition-colors py-1">
            이런 분께 추천
          </a>
          <a href="#how-to-drink" className="hover:text-[#2F5233] transition-colors py-1">
            섭취 가이드
          </a>
          <a href="#order" className="hover:text-[#2F5233] transition-colors py-1">
            상품 & 가격
          </a>
        </nav>

        {/* Zone 3: Actions (User greeting + Login/Logout + Order Lookup + Admin + Order CTA) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          
          {/* User Greeting Status Banner or Login Button */}
          {currentUser ? (
            <div className="flex items-center gap-2 bg-[#EAF2E8] border border-[#C5DDC0] px-2.5 sm:px-3 py-1.5 rounded-full">
              <span className="text-xs sm:text-sm font-black text-[#1B381E] flex items-center gap-1">
                <span className="text-[#2F5233] font-black">{currentUser.name} 님</span> 환영합니다
              </span>
              <button
                onClick={onLogout}
                className="text-[11px] font-bold text-[#8C7A65] hover:text-[#2F5233] underline ml-1 cursor-pointer flex items-center gap-0.5"
                title="로그아웃"
              >
                <LogOut className="w-3 h-3" />
                <span className="hidden sm:inline">로그아웃</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-1 bg-white hover:bg-[#F3EDE2] text-[#2F5233] px-3 py-1.5 rounded-xl text-xs font-black border border-[#C5DDC0] transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>로그인 / 회원가입</span>
            </button>
          )}

          {/* Customer Order Lookup Button */}
          <button
            onClick={onOpenLookupModal}
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-extrabold text-[#4A3F31] hover:bg-[#E8DFD1] transition-colors cursor-pointer border border-[#DCD0BE]"
            title="주문 배송 조회"
          >
            <Search className="w-3.5 h-3.5 text-[#2F5233]" />
            <span>주문 조회</span>
          </button>

          {/* Store Owner Admin Orders Dashboard */}
          <button
            onClick={onOpenAdminModal}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-black bg-[#FAF7F2] text-[#2F5233] hover:bg-[#E8DFD1] transition-colors cursor-pointer border border-[#DCD0BE]"
            title="사장님 주문 관리자"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#2F5233]" />
            <span>사장님 주문 관리</span>
          </button>

          {/* Main Order CTA */}
          <button
            onClick={onOrderClick}
            className="flex items-center gap-1.5 bg-[#2F5233] hover:bg-[#233E26] active:scale-98 text-white px-3.5 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#2F5233] cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>주문하기</span>
          </button>

        </div>

      </div>
    </header>
  );
};
