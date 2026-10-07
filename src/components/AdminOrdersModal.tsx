import React, { useState, useEffect, useRef } from 'react';
import { X, RefreshCw, Search, Trash2, Edit3, Truck, Package, CheckCircle2, AlertCircle, Radio } from 'lucide-react';

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
  memo?: string;
}

interface Stats {
  totalOrders: number;
  totalRevenue: number;
  newOrdersCount: number;
  preparingCount: number;
  shippingCount: number;
  completedCount: number;
}

interface AdminOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminOrdersModal: React.FC<AdminOrdersModalProps> = ({ isOpen, onClose }) => {
  const [orders, setOrders] = useState<ServerOrder[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<string>('전체');
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Track new order alert
  const previousCountRef = useRef<number>(0);
  const [hasNewOrderAlert, setHasNewOrderAlert] = useState<boolean>(false);

  // Status edit inline
  const [editingOrderNum, setEditingOrderNum] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<string>('신규접수');
  const [newTracking, setNewTracking] = useState<string>('');

  const fetchOrdersAndStats = async (isAutoPoll = false) => {
    if (!isAutoPoll) setLoading(true);
    try {
      const queryUrl = `/api/orders?status=${encodeURIComponent(statusFilter)}&search=${encodeURIComponent(searchTerm)}`;
      const res = await fetch(queryUrl);
      const data = await res.json();
      
      if (data.success) {
        // Detect new order arrival during auto-polling
        if (isAutoPoll && previousCountRef.current > 0 && data.orders.length > previousCountRef.current) {
          setHasNewOrderAlert(true);
          setTimeout(() => setHasNewOrderAlert(false), 5000);
        }
        previousCountRef.current = data.orders.length;
        setOrders(data.orders);
      }

      const statsRes = await fetch('/api/stats');
      const statsData = await statsRes.json();
      setStats(statsData);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      if (!isAutoPoll) setLoading(false);
    }
  };

  // Auto Polling Every 3 Seconds (새 주문 자동 감지)
  useEffect(() => {
    if (!isOpen) return;

    fetchOrdersAndStats(false);

    const timer = setInterval(() => {
      fetchOrdersAndStats(true);
    }, 3000); // 3 seconds real-time auto refresh

    return () => clearInterval(timer);
  }, [isOpen, statusFilter, searchTerm]);

  if (!isOpen) return null;

  // Quick 1-click status change to "배송중" or "배송완료"
  const handleQuickStatusChange = async (orderNumber: string, status: '배송중' | '배송완료') => {
    try {
      const res = await fetch(`/api/orders/${orderNumber}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        fetchOrdersAndStats(true);
      }
    } catch (err) {
      alert('상태 변경 실패');
    }
  };

  // Detailed status update
  const handleUpdateDetails = async (orderNumber: string) => {
    try {
      const res = await fetch(`/api/orders/${orderNumber}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          trackingNumber: newTracking,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEditingOrderNum(null);
        fetchOrdersAndStats(true);
      }
    } catch (err) {
      alert('업데이트 실패');
    }
  };

  const handleDeleteOrder = async (orderNumber: string) => {
    if (!confirm(`정말로 주문 [${orderNumber}] 건을 삭제하시겠습니까?`)) return;

    try {
      const res = await fetch(`/api/orders/${orderNumber}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchOrdersAndStats(true);
      }
    } catch (err) {
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-6xl bg-[#FAF7F2] rounded-3xl border-2 border-[#E8DFD1] shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-[#1B381E] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2F5233] flex items-center justify-center text-white font-black shrink-0">
              📋
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black">판매자 주문 관리 시스템</h3>
                {/* Auto Sync Live Pulse Badge */}
                <span className="inline-flex items-center gap-1 text-[11px] bg-[#2F5233] text-[#A8CFA3] font-bold px-2.5 py-0.5 rounded-full border border-[#427A48]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>실시간 자동 동기화 (3초)</span>
                </span>
              </div>
              <p className="text-xs text-[#A1C9A0] font-medium mt-0.5">
                새 주문이 들어오면 새로고침 없이 자동으로 표에 표시됩니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => fetchOrdersAndStats(false)}
              disabled={loading}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1 text-xs font-bold"
              title="수동 새로고침"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">새로고침</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* New Order Alert Banner */}
        {hasNewOrderAlert && (
          <div className="bg-emerald-500 text-white px-4 py-2.5 text-xs font-black text-center animate-bounce flex items-center justify-center gap-2 shadow-md">
            <Radio className="w-4 h-4" />
            <span>🔔 새로운 주문이 방금 들어왔습니다! 목록에 자동으로 업데이트되었습니다.</span>
          </div>
        )}

        {/* Stats Summary Cards */}
        {stats && (
          <div className="bg-[#EAF2E8] p-3 sm:p-5 border-b border-[#C5DDC0] grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-left">
            <div className="bg-white p-3 rounded-2xl border border-[#D0E2CF] shadow-xs">
              <span className="text-[11px] text-[#6B5E4C] font-bold block">총 누적 매출</span>
              <span className="text-lg sm:text-xl font-black text-[#2F5233]">
                {stats.totalRevenue.toLocaleString()}원
              </span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-[#D0E2CF] shadow-xs">
              <span className="text-[11px] text-[#6B5E4C] font-bold block">총 주문 건수</span>
              <span className="text-lg sm:text-xl font-black text-[#1B381E]">
                {stats.totalOrders}건
              </span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-[#D0E2CF] shadow-xs">
              <span className="text-[11px] text-[#6B5E4C] font-bold block">신규 접수</span>
              <span className="text-lg sm:text-xl font-black text-amber-600">
                {stats.newOrdersCount}건
              </span>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-[#D0E2CF] shadow-xs">
              <span className="text-[11px] text-[#6B5E4C] font-bold block">배송 중 / 완료</span>
              <span className="text-lg sm:text-xl font-black text-blue-600">
                {stats.shippingCount + stats.completedCount}건
              </span>
            </div>
          </div>
        )}

        {/* Filter Tabs & Search Bar */}
        <div className="p-3 sm:p-4 bg-white border-b border-[#E8DFD1] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
            {['전체', '신규접수', '배송준비', '배송중', '배송완료', '주문취소'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#2F5233] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#524636] border border-[#E8DFD1] hover:bg-[#F3EDE2]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 md:w-60">
              <input
                type="text"
                placeholder="주문자/전화번호/주문번호..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchOrdersAndStats(false)}
                className="w-full px-3 py-1.5 pl-8 bg-[#FAF7F2] border border-[#DCD0BE] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#2F5233]"
              />
              <Search className="w-3.5 h-3.5 text-[#8C7A65] absolute left-2.5 top-2.5" />
            </div>
          </div>
        </div>

        {/* STRUCTURED TABLE VIEW */}
        <div className="p-3 sm:p-5 overflow-y-auto flex-1">
          {orders.length === 0 ? (
            <div className="text-center py-16 text-[#6B5E4C]">
              <Package className="w-12 h-12 mx-auto text-[#C3B59F] mb-2" />
              <p className="font-bold text-base">조회할 주문 내역이 없습니다.</p>
              <p className="text-xs text-[#8C7A65] mt-1">
                고객이 메인 화면에서 주문을 진행하면 3초 내로 여기에 자동으로 나타납니다.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-[#E8DFD1] bg-white shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                {/* Table Header */}
                <thead>
                  <tr className="bg-[#1B381E] text-white font-bold text-xs uppercase border-b border-[#2F5233]">
                    <th className="p-3.5 sm:p-4 shrink-0">주문번호</th>
                    <th className="p-3.5 sm:p-4">주문자 정보</th>
                    <th className="p-3.5 sm:p-4">주문 상품</th>
                    <th className="p-3.5 sm:p-4">결제 금액</th>
                    <th className="p-3.5 sm:p-4">상태</th>
                    <th className="p-3.5 sm:p-4 text-center">빠른 상태 변경</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody className="divide-y divide-[#F3EDE2]">
                  {orders.map((ord) => {
                    const isEditing = editingOrderNum === ord.orderNumber;

                    return (
                      <React.Fragment key={ord.orderNumber}>
                        <tr className="hover:bg-[#FAF7F2] transition-colors">
                          {/* 1. 주문번호 */}
                          <td className="p-3.5 sm:p-4 align-top font-black text-[#1B381E] whitespace-nowrap">
                            <div className="text-sm font-black text-[#2F5233]">{ord.orderNumber}</div>
                            <div className="text-[10px] text-[#8C7A65] font-normal mt-0.5">
                              {new Date(ord.createdAt).toLocaleString('ko-KR', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                          </td>

                          {/* 2. 주문자 정보 */}
                          <td className="p-3.5 sm:p-4 align-top">
                            <div className="font-black text-sm text-[#1B381E]">
                              {ord.customerName}
                            </div>
                            <div className="text-[#6B5E4C] font-semibold text-xs">
                              📞 {ord.phone}
                            </div>
                            <div className="text-[#524636] text-[11px] mt-0.5 max-w-xs leading-tight">
                              📍 {ord.address}
                            </div>
                          </td>

                          {/* 3. 상품 정보 */}
                          <td className="p-3.5 sm:p-4 align-top">
                            <div className="font-bold text-[#1B381E]">
                              {ord.productName} ({ord.quantity}개)
                            </div>
                            <div className="text-[#2F5233] text-[11px] mt-0.5">
                              🎁 {ord.bonusGift}
                            </div>
                          </td>

                          {/* 4. 결제 금액 */}
                          <td className="p-3.5 sm:p-4 align-top whitespace-nowrap">
                            <div className="font-black text-sm text-[#1B381E]">
                              {ord.totalPrice.toLocaleString()}원
                            </div>
                            <div className="text-[11px] text-[#8C7A65] font-semibold">
                              {ord.paymentMethod}
                            </div>
                          </td>

                          {/* 5. 주문 상태 */}
                          <td className="p-3.5 sm:p-4 align-top whitespace-nowrap">
                            <span
                              className={`inline-block text-xs font-black px-2.5 py-1 rounded-full ${
                                ord.status === '신규접수'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                  : ord.status === '배송중'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-300 animate-pulse'
                                  : ord.status === '배송완료'
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : ord.status === '주문취소'
                                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                  : 'bg-gray-100 text-gray-800 border border-gray-300'
                              }`}
                            >
                              {ord.status}
                            </span>
                            {ord.trackingNumber && (
                              <div className="text-[10px] text-[#2F5233] font-bold mt-1 max-w-[120px] truncate">
                                🚚 {ord.trackingNumber}
                              </div>
                            )}
                          </td>

                          {/* 6. 빠른 상태 변경 버튼 (배송중 / 배송완료) */}
                          <td className="p-3.5 sm:p-4 align-top text-center whitespace-nowrap">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5">
                              {/* 1-Click [배송중] button */}
                              <button
                                onClick={() => handleQuickStatusChange(ord.orderNumber, '배송중')}
                                className={`px-2.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1 ${
                                  ord.status === '배송중'
                                    ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-400'
                                    : 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200'
                                }`}
                              >
                                <Truck className="w-3.5 h-3.5" />
                                <span>배송중</span>
                              </button>

                              {/* 1-Click [배송완료] button */}
                              <button
                                onClick={() => handleQuickStatusChange(ord.orderNumber, '배송완료')}
                                className={`px-2.5 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1 ${
                                  ord.status === '배송완료'
                                    ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-400'
                                    : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200'
                                }`}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>배송완료</span>
                              </button>

                              {/* Detailed edit toggle */}
                              <button
                                onClick={() => {
                                  if (isEditing) {
                                    setEditingOrderNum(null);
                                  } else {
                                    setEditingOrderNum(ord.orderNumber);
                                    setNewStatus(ord.status);
                                    setNewTracking(ord.trackingNumber || '');
                                  }
                                }}
                                className="p-1.5 text-gray-500 hover:text-[#2F5233] cursor-pointer"
                                title="상세 편집 (운송장 등록 등)"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>

                              <button
                                onClick={() => handleDeleteOrder(ord.orderNumber)}
                                className="p-1.5 text-gray-400 hover:text-red-600 cursor-pointer"
                                title="주문 삭제"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Inline Detailed Edit Box */}
                        {isEditing && (
                          <tr className="bg-[#EAF2E8]">
                            <td colSpan={6} className="p-3 border-t border-b border-[#C5DDC0]">
                              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                  <span className="font-bold text-[#1B381E] shrink-0">상태 선택:</span>
                                  <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="px-2.5 py-1 bg-white border border-[#A8CFA3] rounded-lg font-bold text-[#1B381E]"
                                  >
                                    <option value="신규접수">신규접수</option>
                                    <option value="배송준비">배송준비</option>
                                    <option value="배송중">배송중</option>
                                    <option value="배송완료">배송완료</option>
                                    <option value="주문취소">주문취소</option>
                                  </select>
                                </div>

                                <div className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-sm">
                                  <span className="font-bold text-[#1B381E] shrink-0">운송장:</span>
                                  <input
                                    type="text"
                                    placeholder="예: 우체국택배 609281749..."
                                    value={newTracking}
                                    onChange={(e) => setNewTracking(e.target.value)}
                                    className="w-full px-2.5 py-1 bg-white border border-[#A8CFA3] rounded-lg"
                                  />
                                </div>

                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                  <button
                                    onClick={() => handleUpdateDetails(ord.orderNumber)}
                                    className="px-3 py-1 bg-[#2F5233] text-white rounded-lg font-bold cursor-pointer hover:bg-[#203D23]"
                                  >
                                    저장
                                  </button>
                                  <button
                                    onClick={() => setEditingOrderNum(null)}
                                    className="px-3 py-1 bg-white text-gray-600 rounded-lg font-bold cursor-pointer"
                                  >
                                    취소
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
