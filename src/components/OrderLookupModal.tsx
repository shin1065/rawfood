import React, { useState } from 'react';
import { X, Search, Package, Truck, CheckCircle2, Clock } from 'lucide-react';

interface ServerOrder {
  orderNumber: string;
  customerName: string;
  phone: string;
  address: string;
  productName: string;
  boxCount: number;
  quantity: number;
  totalPrice: number;
  paymentMethod: string;
  bonusGift: string;
  status: '신규접수' | '배송준비' | '배송중' | '배송완료' | '주문취소';
  trackingNumber?: string;
  createdAt: string;
}

interface OrderLookupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderLookupModal: React.FC<OrderLookupModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<ServerOrder[] | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const res = await fetch(`/api/orders/lookup?query=${encodeURIComponent(query.trim())}`);
      const data = await res.json();
      if (data.success) {
        setResults(data.orders);
      } else {
        setResults([]);
      }
    } catch (err) {
      console.error('Lookup failed:', err);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border-2 border-[#E8DFD1] shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 bg-[#2F5233] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-[#A8CFA3]" />
            <h3 className="text-xl font-black">내 주문 배송 조회</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              required
              placeholder="주문번호 또는 연락처 (예: 010-1234-5678)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-white border border-[#DCD0BE] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#2F5233] hover:bg-[#203D23] text-white px-5 py-2.5 rounded-xl font-bold text-sm cursor-pointer transition-all"
            >
              {loading ? '조회 중...' : '조회'}
            </button>
          </form>

          {/* Results List */}
          {hasSearched && (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {results && results.length > 0 ? (
                results.map((ord) => (
                  <div
                    key={ord.orderNumber}
                    className="bg-white p-4 rounded-2xl border border-[#E8DFD1] shadow-2xs space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-[#F3EDE2] pb-2">
                      <span className="font-black text-sm text-[#1B381E]">{ord.orderNumber}</span>
                      <span className="bg-[#EAF2E8] text-[#2F5233] font-bold px-2.5 py-0.5 rounded-full text-xs">
                        {ord.status}
                      </span>
                    </div>

                    <div className="space-y-1 text-[#524636]">
                      <div><strong>주문자:</strong> {ord.customerName} ({ord.phone})</div>
                      <div><strong>상품명:</strong> {ord.productName} ({ord.quantity}개)</div>
                      <div><strong>배송지:</strong> {ord.address}</div>
                      <div><strong>결제금액:</strong> {ord.totalPrice.toLocaleString()}원</div>
                      {ord.trackingNumber && (
                        <div className="p-2 bg-[#EAF2E8] rounded-lg border border-[#C5DDC0] text-[#2F5233] font-bold mt-1">
                          🚚 운송장 번호: {ord.trackingNumber}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-[#6B5E4C] text-sm">
                  입력하신 조건과 일치하는 주문 내역이 없습니다.
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
