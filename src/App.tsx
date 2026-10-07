import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { IngredientsSection } from './components/IngredientsSection';
import { TargetAudienceSection } from './components/TargetAudienceSection';
import { DrinkingGuideSection } from './components/DrinkingGuideSection';
import { ProductOrderSection } from './components/ProductOrderSection';
import { OrderDrawerModal } from './components/OrderDrawerModal';
import { AdminOrdersModal } from './components/AdminOrdersModal';
import { OrderLookupModal } from './components/OrderLookupModal';
import { AuthModal, UserProfile } from './components/AuthModal';
import { StickyMobileBar } from './components/StickyMobileBar';
import { ComplianceNoticeFooter } from './components/ComplianceNoticeFooter';
import { PRODUCT_OPTIONS, ProductOption } from './data/ingredientsData';

export default function App() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('haru_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);
  const [isLookupModalOpen, setIsLookupModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authPromptMessage, setAuthPromptMessage] = useState<string>('');
  const [selectedProductOption, setSelectedProductOption] = useState<ProductOption>(PRODUCT_OPTIONS[1]); // Default to 2-month set

  const handleOpenOrder = (option?: ProductOption) => {
    if (option) {
      setSelectedProductOption(option);
    }

    // Require Login Before Ordering
    if (!currentUser) {
      setAuthPromptMessage('주문하시려면 먼저 회원가입 또는 로그인을 완료해 주세요.');
      setIsAuthModalOpen(true);
      return;
    }

    setIsOrderModalOpen(true);
  };

  const handleLoginSuccess = (user: UserProfile) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('haru_user', JSON.stringify(user));
    } catch (e) {}

    // If login was triggered during ordering flow, proceed to order drawer
    if (authPromptMessage) {
      setIsOrderModalOpen(true);
      setAuthPromptMessage('');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('haru_user');
    } catch (e) {}
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#222222]">
      {/* Top Bar with '[Name] 님 환영합니다' Header */}
      <Header
        onOrderClick={() => handleOpenOrder()}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenLookupModal={() => setIsLookupModalOpen(true)}
        currentUser={currentUser}
        onOpenAuthModal={() => {
          setAuthPromptMessage('');
          setIsAuthModalOpen(true);
        }}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection onOrderClick={() => handleOpenOrder()} />

        {/* 50 Domestic Ingredients Section */}
        <IngredientsSection />

        {/* Recommended Target Audience Section (3 cards) */}
        <TargetAudienceSection onOrderClick={() => handleOpenOrder()} />

        {/* How to Drink Guide (1 -> 2 -> 3 Steps) */}
        <DrinkingGuideSection />

        {/* Product Pricing & Buy Section */}
        <ProductOrderSection onOrderClick={(opt) => handleOpenOrder(opt)} />
      </main>

      {/* Footer with Compliance Notice */}
      <ComplianceNoticeFooter />

      {/* Sticky Mobile Bar */}
      <StickyMobileBar onOrderClick={() => handleOpenOrder()} />

      {/* Auth Modal (Sign In & Sign Up with easy Korean errors) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        promptMessage={authPromptMessage}
      />

      {/* Direct Order Modal */}
      <OrderDrawerModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        selectedOption={selectedProductOption}
        defaultCustomerName={currentUser?.name || ''}
      />

      {/* Admin Order Management Dashboard Modal */}
      <AdminOrdersModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />

      {/* Customer Order Lookup Modal */}
      <OrderLookupModal
        isOpen={isLookupModalOpen}
        onClose={() => setIsLookupModalOpen(false)}
      />
    </div>
  );
}
