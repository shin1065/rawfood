import React, { useState, useEffect } from 'react';
import { ProductOption } from '../data/ingredientsData';
import { X, Truck, CreditCard, ArrowRight, ShieldAlert, CheckCircle2, AlertTriangle, Building, Lock } from 'lucide-react';

interface OrderDrawerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOption: ProductOption;
  onOrderSuccess?: () => void;
  defaultCustomerName?: string;
}

export const OrderDrawerModal: React.FC<OrderDrawerModalProps> = ({
  isOpen,
  onClose,
  selectedOption,
  onOrderSuccess,
  defaultCustomerName = '',
}) => {
  const [step, setStep] = useState<'info' | 'payment' | 'completed'>('info');
  const [quantity, setQuantity] = useState<number>(1);
  const [name, setName] = useState<string>(defaultCustomerName);
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  
  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'naverpay' | 'tosspay' | 'kakaopay' | 'bank'>('card');
  const [cardNumber, setCardNumber] = useState<string>('1111-2222-3333-4444');
  const [cardExpiry, setCardExpiry] = useState<string>('12/28');
  const [cardCvc, setCardCvc] = useState<string>('777');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [placedOrderNumber, setPlacedOrderNumber] = useState<string>('');

  useEffect(() => {
    if (defaultCustomerName) {
      setName(defaultCustomerName);
    }
  }, [defaultCustomerName, isOpen]);

  if (!isOpen) return null;

  const totalPrice = selectedOption.discountPrice * quantity;

  // Proceed from Info step to Payment step
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert('배송 정보를 모두 정확히 입력해 주세요.');
      return;
    }
    setStep('payment');
  };

  // Final Payment Click -> Post Order & Show Completed Screen
  const handleFinalPayment = async () => {
    setIsSubmitting(true);

    try {
      const pmLabel = 
        paymentMethod === 'card' ? '신용카드(연습용)' :
        paymentMethod === 'naverpay' ? '네이버페이(연습용)' :
        paymentMethod === 'tosspay' ? '토스페이(연습용)' :
        paymentMethod === 'kakaopay' ? '카카오페이(연습용)' : '무통장입금(연습용)';

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
          productName: selectedOption.name,
          boxCount: selectedOption.boxCount,
          quantity,
          totalPrice,
          paymentMethod: pmLabel,
          bonusGift: selectedOption.bonusGift,
        }),
      });

      const data = await response.json();

      if (data.success && data.order) {
        setPlacedOrderNumber(data.order.orderNumber);
        setStep('completed');
        if (onOrderSuccess) onOrderSuccess();
      } else {
        alert(data.error || '결제 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('서버 연결 실패. 네트워크 연결 상태를 확인해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep('info');
    setName(defaultCustomerName || '');
    setPhone('');
    setAddress('');
    setQuantity(1);
    setCardNumber('1111-2222-3333-4444');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border-2 border-[#E8DFD1] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-[#2F5233] text-white flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#A8CFA3] uppercase tracking-wide">
              {step === 'info' && 'STEP 1: 배송지 정보'}
              {step === 'payment' && 'STEP 2: 연습용 결제 진행'}
              {step === 'completed' && 'STEP 3: 주문 완료'}
            </span>
            <h3 className="text-xl font-black">
              {step === 'completed' ? '주문완료' : '하루한잔 생식 주문 및 결제'}
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Prominent Safety Banner on All Steps */}
        <div className="bg-[#FEF3C7] border-b border-[#F59E0B]/30 px-4 py-2.5 flex items-center justify-center gap-2 text-center text-xs font-black text-[#92400E]">
          <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
          <span>실제로 결제되지 않는 연습용 가짜 결제 시스템입니다</span>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* STEP 1: Customer Order Information */}
          {step === 'info' && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              
              {/* Product Summary */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DFD1] flex items-center justify-between">
                <div>
                  <div className="text-sm font-black text-[#1B381E]">
                    {selectedOption.name}
                  </div>
                  <div className="text-xs text-[#2F5233] font-bold mt-0.5">
                    🎁 {selectedOption.bonusGift}
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center border border-[#E8DFD1] rounded-xl overflow-hidden bg-[#FAF7F2]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 font-bold text-[#524636] hover:bg-[#E8DFD1] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-sm font-extrabold text-[#1B381E]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 font-bold text-[#524636] hover:bg-[#E8DFD1] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Shipping Information Fields */}
              <div className="space-y-3">
                <h4 className="text-xs sm:text-sm font-black text-[#1B381E] flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#2F5233]" />
                  <span>배송지 정보</span>
                </h4>

                <div>
                  <label className="block text-xs font-bold text-[#524636] mb-1">
                    수령인 성함 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="예: 윤성미"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-[#DCD0BE] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#524636] mb-1">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="예: 010-1234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-[#DCD0BE] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#524636] mb-1">
                    배송 주소 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="도로명 주소 및 상세주소 입력"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-[#DCD0BE] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]"
                  />
                </div>
              </div>

              {/* Price Calculation */}
              <div className="bg-[#EAF2E8] p-3.5 rounded-2xl border border-[#C5DDC0] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#2F5233] font-bold block">결제 금액</span>
                  <span className="text-[11px] text-[#524636]">전 상품 무료배송</span>
                </div>
                <div className="text-xl font-black text-[#1B381E]">
                  {totalPrice.toLocaleString()}원
                </div>
              </div>

              {/* Next Step Button */}
              <button
                type="submit"
                className="w-full bg-[#2F5233] hover:bg-[#203D23] active:scale-98 text-white py-3.5 sm:py-4 rounded-2xl font-black text-lg shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>다음: 결제화면 이동하기</span>
                <ArrowRight className="w-5 h-5" />
              </button>

            </form>
          )}

          {/* STEP 2: PRACTICE PAYMENT GATEWAY SCREEN */}
          {step === 'payment' && (
            <div className="space-y-4">
              
              {/* Payment Summary Header */}
              <div className="bg-white p-3.5 rounded-2xl border border-[#E8DFD1] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#6B5E4C] font-semibold block">주문자: {name} 님 ({phone})</span>
                  <span className="text-xs text-[#1B381E] font-bold">{selectedOption.name} ({quantity}개)</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#6B5E4C] block">결제할 금액</span>
                  <span className="text-lg font-black text-[#2F5233]">{totalPrice.toLocaleString()}원</span>
                </div>
              </div>

              {/* Payment Method Selector Grid */}
              <div className="space-y-2">
                <label className="block text-xs font-black text-[#1B381E] flex items-center gap-1">
                  <CreditCard className="w-4 h-4 text-[#2F5233]" />
                  <span>결제 수단 선택 (연습용)</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-xs font-extrabold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-[#2F5233] text-white border-[#2F5233] shadow-xs'
                        : 'bg-white text-[#524636] border-[#E8DFD1] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>💳 신용/체크카드</span>
                    <span className="text-[10px] opacity-80">(카드번호 자동채움)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('naverpay')}
                    className={`p-2.5 rounded-xl border text-xs font-extrabold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'naverpay'
                        ? 'bg-[#03C75A] text-white border-[#03C75A] shadow-xs'
                        : 'bg-white text-[#524636] border-[#E8DFD1] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>🟢 네이버페이</span>
                    <span className="text-[10px] opacity-80">(연습용 원클릭)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('tosspay')}
                    className={`p-2.5 rounded-xl border text-xs font-extrabold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'tosspay'
                        ? 'bg-[#0064FF] text-white border-[#0064FF] shadow-xs'
                        : 'bg-white text-[#524636] border-[#E8DFD1] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>🔵 토스페이</span>
                    <span className="text-[10px] opacity-80">(연습용 1초 송금)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('kakaopay')}
                    className={`p-2.5 rounded-xl border text-xs font-extrabold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      paymentMethod === 'kakaopay'
                        ? 'bg-[#FEE500] text-[#191919] border-[#FEE500] shadow-xs'
                        : 'bg-white text-[#524636] border-[#E8DFD1] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>🟡 카카오페이</span>
                    <span className="text-[10px] opacity-80">(연습용 톡결제)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bank')}
                    className={`p-2.5 rounded-xl border text-xs font-extrabold flex flex-col items-center gap-1 transition-all cursor-pointer col-span-2 sm:col-span-1 ${
                      paymentMethod === 'bank'
                        ? 'bg-[#1B381E] text-white border-[#1B381E] shadow-xs'
                        : 'bg-white text-[#524636] border-[#E8DFD1] hover:bg-[#FAF7F2]'
                    }`}
                  >
                    <span>🏦 무통장입금</span>
                    <span className="text-[10px] opacity-80">(연습용 가상계좌)</span>
                  </button>
                </div>
              </div>

              {/* CARD INPUT BOX WITH PRE-FILLED 1111-2222-3333-4444 */}
              {paymentMethod === 'card' && (
                <div className="bg-white p-4 rounded-2xl border-2 border-[#2F5233] space-y-3 shadow-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-[#F3EDE2]">
                    <span className="text-xs font-black text-[#1B381E] flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5 text-[#2F5233]" />
                      <span>카드 정보 입력 (연습용)</span>
                    </span>
                    <span className="text-[11px] text-[#2F5233] font-bold bg-[#EAF2E8] px-2 py-0.5 rounded">
                      자동 채움 완료
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#524636] mb-1">
                      카드 번호
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#2F5233] rounded-xl text-sm font-black text-[#1B381E] text-center tracking-widest focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#524636] mb-1">
                        유효기간
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3.5 py-1.5 bg-[#FAF7F2] border border-[#DCD0BE] rounded-xl text-xs font-bold text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#524636] mb-1">
                        CVC 번호
                      </label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3.5 py-1.5 bg-[#FAF7F2] border border-[#DCD0BE] rounded-xl text-xs font-bold text-center"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* NaverPay, TossPay, KakaoPay, Bank messaging */}
              {paymentMethod === 'naverpay' && (
                <div className="bg-[#EBFBEE] p-4 rounded-2xl border border-[#03C75A] text-xs font-bold text-[#027A37] text-center space-y-1">
                  <div>🟢 연습용 네이버페이 원클릭 간편결제 모드</div>
                  <div className="text-[11px] font-normal text-[#524636]">아래 [결제하기] 버튼을 누르시면 포인트 차감 없이 결제가 완결됩니다.</div>
                </div>
              )}

              {paymentMethod === 'tosspay' && (
                <div className="bg-[#EDF4FF] p-4 rounded-2xl border border-[#0064FF] text-xs font-bold text-[#0042A5] text-center space-y-1">
                  <div>🔵 연습용 토스 1초 송금 결제 모드</div>
                  <div className="text-[11px] font-normal text-[#524636]">계좌 연동 확인 없이 1초 만에 무료 결제가 처리됩니다.</div>
                </div>
              )}

              {paymentMethod === 'kakaopay' && (
                <div className="bg-[#FFFDE6] p-4 rounded-2xl border border-[#FEE500] text-xs font-bold text-[#3C1E1E] text-center space-y-1">
                  <div>🟡 연습용 카카오페이 톡결제 모드</div>
                  <div className="text-[11px] font-normal text-[#524636]">카카오톡 인증 없이 가짜 연습용 결제가 즉시 승인됩니다.</div>
                </div>
              )}

              {paymentMethod === 'bank' && (
                <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8DFD1] text-xs space-y-1 text-[#1B381E]">
                  <div className="font-bold flex items-center gap-1">
                    <Building className="w-4 h-4 text-[#2F5233]" />
                    <span>연습용 입금 계좌: 농협 301-0000-1111-22 (하루한잔)</span>
                  </div>
                  <div className="text-[11px] text-[#6B5E4C]">실제 입금하실 필요 없이 아래 버튼을 누르면 즉시 주문 완료됩니다.</div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('info')}
                  className="w-1/3 bg-white text-[#524636] border border-[#E8DFD1] py-3.5 rounded-2xl font-bold text-sm cursor-pointer hover:bg-[#FAF7F2]"
                >
                  이전 단계
                </button>

                <button
                  type="button"
                  onClick={handleFinalPayment}
                  disabled={isSubmitting}
                  className="w-2/3 bg-[#2F5233] hover:bg-[#203D23] active:scale-98 text-white py-3.5 rounded-2xl font-black text-lg shadow-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>결제 승인 중...</span>
                  ) : (
                    <>
                      <span>{totalPrice.toLocaleString()}원 연습용 결제하기</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: ORDER COMPLETED SCREEN */}
          {step === 'completed' && (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#EAF2E8] text-[#2F5233] flex items-center justify-center mx-auto text-3xl font-black shadow-xs">
                ✓
              </div>

              <div>
                <span className="text-xs bg-[#2F5233] text-white font-bold px-3 py-1 rounded-full">
                  주문 및 결제 완료
                </span>
                <h4 className="text-2xl font-black text-[#1B381E] mt-3">
                  주문이 성공적으로 접수되었습니다!
                </h4>
                <p className="text-xs sm:text-sm text-[#524636] mt-2 font-medium">
                  실제로 돈이 차감되지 않은 안전한 연습용 결제입니다.
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="bg-white p-4 rounded-2xl border border-[#E8DFD1] text-left text-xs sm:text-sm space-y-2.5">
                <div className="flex justify-between py-1 border-b border-[#F3EDE2]">
                  <span className="text-[#6B5E4C]">주문 번호</span>
                  <span className="font-extrabold text-[#2F5233]">{placedOrderNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F3EDE2]">
                  <span className="text-[#6B5E4C]">주문 상품</span>
                  <span className="font-bold text-[#1B381E]">{selectedOption.name} ({quantity}개)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F3EDE2]">
                  <span className="text-[#6B5E4C]">수령인</span>
                  <span className="font-bold text-[#1B381E]">{name} ({phone})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F3EDE2]">
                  <span className="text-[#6B5E4C]">배송지</span>
                  <span className="font-bold text-[#1B381E]">{address}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#F3EDE2]">
                  <span className="text-[#6B5E4C]">결제 방법</span>
                  <span className="font-bold text-[#2F5233]">연습용 결제 완료</span>
                </div>
                <div className="flex justify-between py-1 pt-2 font-black text-base text-[#1B381E]">
                  <span>결제 금액</span>
                  <span className="text-[#2F5233]">{totalPrice.toLocaleString()}원 (0원 실차감)</span>
                </div>
              </div>

              <button
                onClick={resetAndClose}
                className="w-full bg-[#2F5233] text-white py-4 rounded-2xl font-black text-base shadow-md hover:bg-[#213C24] transition-all cursor-pointer"
              >
                확인 및 쇼핑 계속하기
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
