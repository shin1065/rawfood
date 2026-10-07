import React from 'react';
import { Leaf, ShieldCheck, PhoneCall, Info } from 'lucide-react';

export const ComplianceNoticeFooter: React.FC = () => {
  return (
    <footer className="bg-[#1B381E] text-[#D0E2CF] py-12 pb-24 sm:pb-16 border-t border-[#2A4D2E]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#2D5A32]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2F5233] border border-[#437548] flex items-center justify-center text-white">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black text-white">하루한잔 生食</span>
              <p className="text-xs text-[#A1C9A0] font-medium">
                자연 그대로의 국내산 50가지 곡물과 채소를 담은 간편한 한 끼
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-[#B3DBB2]">
            <span>고객상담센터: 1800-0050</span>
            <span>·</span>
            <span>평일 09:00 ~ 18:00 (주말/공휴일 휴무)</span>
          </div>
        </div>

        {/* Regulatory Compliance & Product Notice Box */}
        <div className="my-8 bg-[#234526] p-5 rounded-2xl border border-[#345F38] text-xs text-[#B2D6B1] space-y-2">
          <div className="flex items-center gap-2 font-bold text-white text-sm">
            <Info className="w-4 h-4 text-[#A1C9A0] shrink-0" />
            <span>[일반식품 표시기준 및 제품 정보 안내]</span>
          </div>
          <p className="leading-relaxed">
            • 본 제품은 질병의 예방 및 치료를 위한 의약품이 아니며, 100% 국내산 곡물과 채소를 열 가공 없이 원재료 그대로 말려 만든 <strong>일반 가공식품(생식)</strong>입니다.
          </p>
          <p className="leading-relaxed">
            • 과대·허위 광고를 배제하고 원재료 본연의 신선함과 1분 완성 간편함, 고소하고 담백한 풍미 전달에 집중하여 제작되었습니다.
          </p>
        </div>

        {/* Company & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-[#8BB88A] space-y-3 sm:space-y-0">
          <div>
            <span>(주)하루한잔푸드 | 대표자: 홍길동 | 사업자등록번호: 123-87-00000</span>
            <br className="hidden sm:inline" />
            <span>통신판매업신고: 제2026-서울강남-01234호 | 서울특별시 강남구 테헤란로 100</span>
          </div>
          <div className="text-center sm:text-right text-[11px]">
            © 2026 HARU HANJAN SAENGSIK. ALL RIGHTS RESERVED.
          </div>
        </div>

      </div>
    </footer>
  );
};
