import React, { useState } from 'react';
import { X, UserCheck, Lock, Mail, User, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';

export interface UserProfile {
  email: string;
  name: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
  promptMessage?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  promptMessage,
}) => {
  const [isSignUpMode, setIsSignUpMode] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDemoLogin = async () => {
    setName('윤성미');
    setEmail('sungmi@example.com');
    setPassword('password123');
    setErrorMessage('');

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'sungmi@example.com', password: 'password123' }),
      });
      const data = await res.json();
      if (data.success && data.user) {
        onLoginSuccess(data.user);
        onClose();
      } else {
        setErrorMessage(data.message || '로그인 중 오류가 발생했습니다.');
      }
    } catch (err) {
      setErrorMessage('서버 연결 실패. 네트워크 상태를 확인해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Easy Korean Validation Checks
    if (isSignUpMode && !name.trim()) {
      setErrorMessage('이름(성함)을 입력해 주세요.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('올바른 이메일 주소를 입력해 주세요. (예: name@naver.com)');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('비밀번호를 입력해 주세요.');
      return;
    }

    if (password.trim().length < 6) {
      setErrorMessage('비밀번호가 너무 짧습니다! 최소 6자 이상으로 만들어 주세요.');
      return;
    }

    if (isSignUpMode && password.trim() !== confirmPassword.trim()) {
      setErrorMessage('비밀번호와 비밀번호 확인이 서로 일치하지 않습니다. 다시 확인해 주세요.');
      return;
    }

    setLoading(true);

    try {
      const endpoint = isSignUpMode ? '/api/auth/signup' : '/api/auth/login';
      const payload = isSignUpMode
        ? { email: email.trim(), password: password.trim(), name: name.trim() }
        : { email: email.trim(), password: password.trim() };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success && data.user) {
        onLoginSuccess(data.user);
        onClose();
      } else {
        // Clear Korean friendly error output
        setErrorMessage(data.message || '입력하신 정보를 다시 확인해 주세요.');
      }
    } catch (err) {
      console.error('Auth error:', err);
      setErrorMessage('서버와 통신할 수 없습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#FAF7F2] rounded-3xl border-2 border-[#E8DFD1] shadow-2xl overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-5 bg-[#2F5233] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-[#A8CFA3]" />
            <h3 className="text-xl font-black">
              {isSignUpMode ? '회원가입' : '로그인'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          
          {/* Prompt banner if opened during ordering */}
          {promptMessage && (
            <div className="p-3 bg-[#EAF2E8] border border-[#C5DDC0] rounded-xl text-xs text-[#2F5233] font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0" />
              <span>{promptMessage}</span>
            </div>
          )}

          {/* Quick Demo Test Login Box for '윤성미 님' */}
          <div className="bg-white p-3.5 rounded-2xl border border-[#E8DFD1] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#1B381E]">💡 1초 빠른 체험 로그인</span>
              <span className="text-[10px] bg-[#EAF2E8] text-[#2F5233] font-extrabold px-2 py-0.5 rounded">
                윤성미 님 테스트 계정
              </span>
            </div>
            <p className="text-[11px] text-[#6B5E4C]">
              회원가입 없이 바로 로그인하여 체험하실 수 있습니다.
            </p>
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              className="w-full bg-[#EAF2E8] hover:bg-[#D3E5D0] text-[#2F5233] py-2 px-3 rounded-xl text-xs font-black transition-colors cursor-pointer flex items-center justify-center gap-1 border border-[#C5DDC0]"
            >
              <span>"윤성미 님"으로 즉시 로그인하기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Friendly Korean Error Alert Box */}
            {errorMessage && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 font-bold flex items-start gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div className="leading-relaxed">{errorMessage}</div>
              </div>
            )}

            {/* Name Field (Sign Up Only) */}
            {isSignUpMode && (
              <div>
                <label className="block text-xs font-bold text-[#524636] mb-1">
                  이름 (성함) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="예: 윤성미"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 pl-9 bg-white border border-[#DCD0BE] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]"
                  />
                  <User className="w-4 h-4 text-[#8C7A65] absolute left-3 top-3" />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-[#524636] mb-1">
                이메일 주소 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="예: sungmi@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 pl-9 bg-white border border-[#DCD0BE] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]"
                />
                <Mail className="w-4 h-4 text-[#8C7A65] absolute left-3 top-3" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-[#524636] mb-1">
                비밀번호 <span className="text-xs text-[#8C7A65] font-normal">(6자 이상)</span> <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="비밀번호 6자리 이상 입력"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 pl-9 bg-white border border-[#DCD0BE] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]"
                />
                <Lock className="w-4 h-4 text-[#8C7A65] absolute left-3 top-3" />
              </div>
            </div>

            {/* Password Confirm Field (Sign Up Only) */}
            {isSignUpMode && (
              <div>
                <label className="block text-xs font-bold text-[#524636] mb-1">
                  비밀번호 확인 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="비밀번호 한 번 더 입력"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 pl-9 bg-white border border-[#DCD0BE] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F5233]"
                  />
                  <Lock className="w-4 h-4 text-[#8C7A65] absolute left-3 top-3" />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2F5233] hover:bg-[#203D23] active:scale-98 text-white py-3.5 rounded-2xl font-black text-base shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>처리 중...</span>
              ) : (
                <>
                  <span>{isSignUpMode ? '회원가입 완료하기' : '로그인하기'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          {/* Mode Switch Toggle */}
          <div className="text-center pt-2 border-t border-[#E8DFD1]">
            <p className="text-xs text-[#6B5E4C]">
              {isSignUpMode ? '이미 계정이 있으신가요?' : '아직 회원이 아니신가요?'}
              {' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUpMode(!isSignUpMode);
                  setErrorMessage('');
                }}
                className="font-black text-[#2F5233] underline ml-1 cursor-pointer"
              >
                {isSignUpMode ? '로그인하기' : '회원가입하기'}
              </button>
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};
