import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, Tablet, Monitor, QrCode, CreditCard, User, History, 
  Settings, Check, X, Bell, LayoutTemplate, Palette, Gavel, 
  ChevronLeft, ChevronRight, Loader2, LogOut, Upload, Menu, Plus,
  Gift, ScrollText, LogIn, Coffee, Store, Power, Image as ImageIcon, Type,
  Edit, Trash2, Eye, BarChart3, Download, ArrowRight, MapPin, Filter, Search,
  Mail, Lock, KeyRound, Sparkles, TestTube, AlertCircle, FileText, Camera, Info, ChevronDown,
  TrendingUp, Users, Calendar, Clock
} from 'lucide-react';

/**
 * Global Styles & Theme Variables
 */
const GlobalStyles = () => (
  <style>{`
    @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css");
    
    :root {
      --color-kkookk-orange-500: #FF5A00;
      --color-kkookk-orange-100: #FFF0E6;
      --color-kkookk-paper: #FFFFFF;
      --color-kkookk-navy: #1A1E27;
      --color-kkookk-steel: #6E7583;
      --color-kkookk-sand: #F5F5F7;
      --color-kkookk-red: #F04438;
      --color-kkookk-amber: #F79009;
      --font-family-pretendard: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
    }
    
    body {
      font-family: var(--font-family-pretendard) !important;
      color: var(--color-kkookk-navy);
    }

    .bg-primary { background-color: var(--color-kkookk-orange-500); }
    .text-primary { color: var(--color-kkookk-orange-500); }
    .bg-navy { background-color: var(--color-kkookk-navy); }
    .text-navy { color: var(--color-kkookk-navy); }
    .text-steel { color: var(--color-kkookk-steel); }
    .bg-sand { background-color: var(--color-kkookk-sand); }
    
    /* Utility Overrides for quick mapping */
    .border-navy { border-color: var(--color-kkookk-navy); }

    /* Hide scrollbar for Chrome, Safari and Opera */
    .no-scrollbar::-webkit-scrollbar {
      display: none !important;
      width: 0 !important;
      height: 0 !important;
      background: transparent !important;
    }
    
    /* Hide scrollbar for IE, Edge and Firefox */
    .no-scrollbar {
      -ms-overflow-style: none !important;  /* IE and Edge */
      scrollbar-width: none !important;  /* Firefox */
    }
  `}</style>
);

/**
 * Shared Data & State Simulation
 */
const INITIAL_STAMP_CARD = {
  id: 'card_001',
  storeName: '블루보틀 성수', 
  current: 3,
  max: 10,
  reward: '아메리카노 1잔',
  theme: 'orange', 
  status: 'active'
};

const MOCK_REWARDS = [
  {
    id: 'reward_001',
    storeName: '블루보틀 성수',
    name: '아메리카노 1잔',
    expiry: '2023.12.31',
    isUsed: false,
    theme: 'orange',
    gradient: 'from-[var(--color-kkookk-orange-500)] to-[#E04F00]'
  },
  {
    id: 'reward_002',
    storeName: '스타벅스 역삼',
    name: '1,000원 할인',
    expiry: '2023.10.01',
    isUsed: true, 
    theme: 'gray',
    gradient: 'from-slate-600 to-slate-800'
  }
];

const MOCK_REQUESTS = [
  {
    id: 'req_101',
    type: 'stamp',
    user: '김단골',
    phone: '010-1111-2222',
    count: 2,
    time: new Date(Date.now() - 1000 * 60 * 2), 
    status: 'pending',
    store: '블루보틀 성수'
  },
  {
    id: 'req_102',
    type: 'stamp',
    user: '이카페',
    phone: '010-3333-4444',
    count: 1,
    time: new Date(Date.now() - 1000 * 60 * 15), 
    status: 'pending',
    store: '블루보틀 성수'
  },
  {
    id: 'req_103',
    type: 'stamp',
    user: '박라떼',
    phone: '010-5555-6666',
    count: 1,
    time: new Date(Date.now() - 1000 * 60 * 60), 
    status: 'approved',
    store: '블루보틀 성수'
  },
  {
    id: 'req_108',
    type: 'stamp',
    user: '김고객', 
    phone: '010-1234-5678',
    count: 1,
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), 
    status: 'approved',
    store: '스타벅스 역삼'
  },
  {
    id: 'req_109',
    type: 'stamp',
    user: '김고객', 
    phone: '010-1234-5678',
    count: 2,
    time: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), 
    status: 'approved',
    store: '블루보틀 성수'
  }
];

const MOCK_MIGRATIONS = [
  {
    id: 'mig_001',
    storeName: '블루보틀 성수',
    count: 5,
    status: 'pending',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2시간 전
  },
  {
    id: 'mig_002',
    storeName: '스타벅스 역삼',
    count: 8,
    status: 'approved',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) // 3 days ago
  },
  {
    id: 'mig_003',
    storeName: '블루보틀 성수',
    count: 12,
    status: 'rejected',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24) // 1 day ago
  }
];

/* =========================================
   HELPER COMPONENTS
   ========================================= */
const LauncherCard = ({ icon, title, desc, onClick, color }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all border border-slate-100 hover:border-slate-200 group"
  >
    <div className={`p-4 rounded-full text-white mb-4 group-hover:scale-110 transition-transform ${color}`}>
      {icon}
    </div>
    <h2 className="text-xl font-bold text-navy mb-2">{title}</h2>
    <p className="text-steel text-center text-sm">{desc}</p>
  </button>
);

const MenuLink = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors text-left group"
  >
    <div className="text-steel group-hover:text-primary transition-colors">{icon}</div>
    <span className="font-medium text-navy group-hover:text-primary transition-colors">{label}</span>
  </button>
);

/* =========================================
   OWNER AUTH COMPONENT
   ========================================= */
const OwnerAuth = ({ onLoginSuccess, onBack, title, subTitle, isTabletMode = false }) => {
  const [authMode, setAuthMode] = useState('login'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(''); 
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignupRequest = () => {
    if (!email || !password || !name || !phone) return alert('모든 정보를 입력해주세요.');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthMode('verify');
      alert(`[인증번호 발송됨]\n${phone}로 인증번호 123456을 보냈습니다.`);
    }, 1000);
  };

  const handleVerify = () => {
    if (verificationCode !== '123456') return alert('인증번호가 일치하지 않습니다. (123456)');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('휴대폰 인증이 완료되었습니다. 로그인해주세요.');
      setAuthMode('login');
      setVerificationCode('');
      setPassword('');
    }, 1000);
  };

  const handleLogin = () => {
    if (!email || !password) return alert('이메일과 비밀번호를 입력해주세요.');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 800);
  };

  return (
    <div className={`flex flex-col items-center justify-center ${isTabletMode ? 'h-full w-full' : 'min-h-screen'} bg-sand p-6`}>
      <div className={`bg-white rounded-3xl shadow-xl p-8 w-full ${isTabletMode ? 'max-w-sm border border-slate-100' : 'max-w-md border border-slate-200'}`}>
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-navy mb-2">{title}</h2>
          <p className="text-steel text-sm">{subTitle}</p>
        </div>

        {authMode === 'login' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            <div>
              <label className="block text-xs font-bold text-navy mb-2">이메일 주소</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="boss@partner.com" className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-navy mb-2">비밀번호</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:outline-none" />
              </div>
            </div>
            <button onClick={handleLogin} disabled={isLoading} className="w-full py-4 bg-navy text-white rounded-xl font-bold hover:bg-slate-800 transition-colors mt-4 flex justify-center items-center gap-2">
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : '로그인'}
            </button>
            <div className="text-center mt-4">
              <button onClick={() => setAuthMode('signup')} className="text-sm text-steel hover:text-primary underline decoration-slate-300 underline-offset-4">아직 계정이 없으신가요? 회원가입</button>
            </div>
          </div>
        )}

        {authMode === 'signup' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div>
              <label className="block text-xs font-bold text-navy mb-2">이름 (실명)</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="홍길동" className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-navy mb-2">휴대폰 번호 (인증필요)</label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="010-0000-0000" className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-navy mb-2">이메일 주소</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="boss@partner.com" className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-navy mb-2">비밀번호</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="8자 이상 입력" className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:outline-none" />
              </div>
            </div>
            <button onClick={handleSignupRequest} disabled={isLoading} className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-orange-600 transition-colors mt-4 flex justify-center items-center gap-2">
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : '인증번호 받기'}
            </button>
            <div className="text-center mt-4">
              <button onClick={() => setAuthMode('login')} className="text-sm text-steel hover:text-navy">이미 계정이 있으신가요? 로그인</button>
            </div>
          </div>
        )}

        {authMode === 'verify' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2"><Smartphone size={24} /></div>
              <p className="text-sm text-navy font-bold">{phone}</p>
              <p className="text-xs text-steel">위 번호로 인증번호를 보냈습니다.</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-navy mb-2">인증번호</label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-3.5 text-slate-400" size={18} />
                <input type="text" value={verificationCode} onChange={e => setVerificationCode(e.target.value)} placeholder="123456" className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:outline-none tracking-widest font-mono" />
              </div>
            </div>
            <button onClick={handleVerify} disabled={isLoading} className="w-full py-4 bg-navy text-white rounded-xl font-bold hover:bg-slate-800 transition-colors mt-4 flex justify-center items-center gap-2">
               {isLoading ? <Loader2 className="animate-spin" size={20} /> : '인증 완료'}
            </button>
            <div className="text-center mt-4">
              <button onClick={() => setAuthMode('signup')} className="text-sm text-steel hover:text-navy">전화번호 다시 입력하기</button>
            </div>
          </div>
        )}
      </div>
      <button onClick={onBack} className="mt-8 text-steel text-sm hover:text-navy flex items-center gap-1"><ChevronLeft size={16} /> 초기 화면으로</button>
    </div>
  );
};

/* =========================================
   CUSTOMER APP
   ========================================= */
const CustomerApp = ({ requests, addRequest, updateRequestStatus, stampCard, goBack }) => {
  const [screen, setScreen] = useState('landing');
  const [requestData, setRequestData] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rewards, setRewards] = useState(MOCK_REWARDS);
  const [redeemTarget, setRedeemTarget] = useState(null);
  const [redeemResult, setRedeemResult] = useState(null);
  const [migrations, setMigrations] = useState(MOCK_MIGRATIONS);
  
  const [activeCard, setActiveCard] = useState(stampCard);
  
  const MOCK_OTHER_CARDS = [
    { 
      id: 'card_mock_1', 
      storeName: '스타벅스 역삼', 
      current: 8, 
      max: 12, 
      reward: 'Tall 사이즈 음료', 
      theme: 'green',
      bgGradient: 'from-[#006241] to-[#1e3932]',
      shadowColor: 'shadow-green-900/20'
    },
    { 
      id: 'card_mock_2', 
      storeName: '메가커피 강남', 
      current: 2, 
      max: 10, 
      reward: '아메리카노 1잔', 
      theme: 'yellow',
      bgGradient: 'from-[#fbbf24] to-[#d97706]',
      shadowColor: 'shadow-yellow-500/20'
    },
  ];

  const allCards = [
    { ...stampCard, bgGradient: 'from-[var(--color-kkookk-orange-500)] to-[#E04F00]', shadowColor: 'shadow-orange-200' }, 
    ...MOCK_OTHER_CARDS
  ];

  useEffect(() => {
    if (activeCard.id === stampCard.id) {
      setActiveCard({ ...stampCard, bgGradient: 'from-[var(--color-kkookk-orange-500)] to-[#E04F00]', shadowColor: 'shadow-orange-200' });
    }
  }, [stampCard]);

  useEffect(() => {
    if (screen === 'requesting' && requestData) {
      const interval = setInterval(() => {
        const currentReq = requests.find(r => r.id === requestData.id);
        if (currentReq) {
          if (currentReq.status === 'approved') setScreen('success');
          if (currentReq.status === 'rejected') setScreen('rejected');
        }
      }, 500);
      return () => clearInterval(interval);
    }
  }, [screen, requestData, requests]);

  const handleRequestStamp = () => {
    const newReq = {
      id: `req_${Date.now()}`,
      type: 'stamp',
      user: '김고객',
      phone: '010-1234-5678',
      count: 1,
      time: new Date(),
      status: 'pending',
      store: activeCard.storeName
    };
    addRequest(newReq);
    setRequestData(newReq);
    setScreen('requesting');
  };

  const startRedeemProcess = (reward) => {
    setRedeemTarget(reward);
    setScreen('redeem'); 
  };

  const completeRedeem = (isSuccess) => {
    if (isSuccess && redeemTarget) {
      setRewards(prev => prev.map(r => 
        r.id === redeemTarget.id ? { ...r, isUsed: true } : r
      ));
      setRedeemResult('success');
    } else {
      setRedeemResult('fail');
    }
    setScreen('redeemResult');
  };

  const submitMigration = (storeName, count) => {
    const newMigration = {
      id: `mig_${Date.now()}`,
      storeName,
      count,
      status: 'pending',
      date: new Date()
    };
    setMigrations([newMigration, ...migrations]);
    setScreen('migrationList');
  };

  const MobileFrame = ({ children }) => (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-4">
      <div className="w-[390px] h-[844px] bg-white rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col border-8 border-navy">
        <div className="h-12 bg-white w-full flex justify-between items-center px-6 pt-2 select-none z-20">
          <span className="text-xs font-bold text-navy">9:41</span>
          <div className="w-20 h-6 bg-black rounded-full absolute left-1/2 -translate-x-1/2 top-2" />
          <div className="flex gap-1">
            <div className="w-4 h-2.5 bg-navy rounded-sm" />
            <div className="w-3 h-2.5 bg-navy rounded-sm" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto relative no-scrollbar bg-white">
           {children}
        </div>

        {isMenuOpen && (
          <div className="absolute inset-0 z-50 flex justify-end">
            <div 
              className="absolute inset-0 bg-navy/20 backdrop-blur-sm animate-in fade-in"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="relative w-[280px] h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
              <div className="p-6 flex justify-between items-center border-b border-slate-100">
                <span className="font-bold text-lg text-navy">전체 메뉴</span>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 -mr-2 text-steel hover:text-navy hover:bg-slate-50 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-2">
                <div className="px-6 py-4 mb-2">
                  <p className="text-xs text-steel mb-1">현재 계정</p>
                  <p className="font-bold text-lg text-navy">김고객님</p>
                </div>

                <MenuLink icon={<History size={20}/>} label="스탬프/리워드 이력" onClick={() => { setScreen('history'); setIsMenuOpen(false); }} />
                <MenuLink icon={<Gift size={20}/>} label="리워드 보관함" onClick={() => { setScreen('rewardBox'); setIsMenuOpen(false); }} />
                <MenuLink icon={<FileText size={20}/>} label="종이 스탬프 전환" onClick={() => { setScreen('migrationList'); setIsMenuOpen(false); }} />
                <MenuLink icon={<Settings size={20}/>} label="설정" onClick={() => { setScreen('settings'); setIsMenuOpen(false); }} />
              </div>

              <div className="p-6 border-t border-slate-100 bg-sand/30">
                <button 
                  onClick={goBack} 
                  className="flex items-center gap-3 w-full p-3 text-steel hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <LogOut size={20} />
                  <span className="font-medium text-sm">로그아웃 / 나가기</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const Landing = () => (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-white text-center">
      <div className="flex flex-col items-center flex-1 justify-center -mt-10">
        <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-white mb-8 shadow-xl shadow-orange-200">
           <QrCode size={40} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-navy leading-tight mb-3">
          {stampCard.storeName}에<br/>오신 것을 환영해요!
        </h2>
        <p className="text-steel text-sm mb-8">
          스탬프를 모아 특별한 혜택을 받아보세요.
        </p>
        <div className="bg-navy text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-navy/20 animate-pulse">
          현재 34명이 적립 중 🔥
        </div>
      </div>
      <div className="w-full mt-auto pb-8">
        <button 
          onClick={() => setScreen('login')}
          className="w-full py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-lg shadow-orange-200 active:scale-95 transition-transform"
        >
          내 지갑 열기
        </button>
        <button 
          onClick={() => setScreen('signup')}
          className="mt-4 text-sm text-steel/60 hover:text-steel underline decoration-steel/30 underline-offset-4"
        >
          처음이신가요?
        </button>
      </div>
    </div>
  );

  const Login = () => (
    <div className="h-full p-6 pt-12 flex flex-col bg-white">
      <div className="flex items-center mb-6 -ml-2">
        <button onClick={() => setScreen('landing')} className="p-2 text-steel">
          <ChevronLeft size={24} />
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-2 text-navy">반가워요!<br/>지갑을 찾아드릴게요.</h2>
      <p className="text-steel text-sm mb-10">가입하신 정보를 입력해주세요.</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-steel mb-2">이름</label>
          <input type="text" placeholder="홍길동" className="w-full p-4 bg-sand rounded-xl border border-slate-200 focus:outline-none focus:border-[var(--color-kkookk-orange-500)]" />
        </div>
        <div>
          <label className="block text-xs font-bold text-steel mb-2">휴대폰 번호</label>
          <input type="tel" placeholder="010-0000-0000" className="w-full p-4 bg-sand rounded-xl border border-slate-200 focus:outline-none focus:border-[var(--color-kkookk-orange-500)]" />
        </div>
        <button 
          onClick={() => setScreen('wallet')}
          className="w-full py-4 bg-navy text-white rounded-xl font-bold mt-4"
        >
          지갑 열기
        </button>
      </div>
    </div>
  );

  const SignUp = () => {
    const [step, setStep] = useState('input');
    return (
      <div className="h-full p-6 pt-12 flex flex-col bg-white">
        <div className="flex items-center mb-6 -ml-2">
          <button onClick={() => setScreen('landing')} className="p-2 text-steel">
            <ChevronLeft size={24} />
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-navy">첫 방문이시군요!<br/>멤버십을 만들어드릴게요.</h2>
        {step === 'input' ? (
          <div className="space-y-4 mt-8">
            <div>
              <label className="block text-xs font-bold text-steel mb-2">이름 (실명)</label>
              <input type="text" placeholder="홍길동" className="w-full p-4 bg-sand rounded-xl border border-slate-200 focus:outline-none focus:border-[var(--color-kkookk-orange-500)]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-steel mb-2">닉네임 (매장에서 불릴 이름)</label>
              <input type="text" placeholder="길동이" className="w-full p-4 bg-sand rounded-xl border border-slate-200 focus:outline-none focus:border-[var(--color-kkookk-orange-500)]" />
            </div>
            <div>
              <label className="block text-xs font-bold text-steel mb-2">휴대폰 번호</label>
              <input type="tel" placeholder="010-0000-0000" className="w-full p-4 bg-sand rounded-xl border border-slate-200 focus:outline-none focus:border-[var(--color-kkookk-orange-500)]" />
            </div>
            <button 
              onClick={() => setStep('otp')}
              className="w-full py-4 bg-primary text-white rounded-xl font-bold mt-4"
            >
              인증번호 받기
            </button>
          </div>
        ) : (
          <div className="space-y-6 mt-8 animate-in fade-in slide-in-from-right-4">
            <p className="text-steel text-sm">입력하신 번호로 인증번호를 보냈어요.</p>
            <div>
              <label className="block text-xs font-bold text-steel mb-2">인증번호 6자리</label>
              <input type="number" placeholder="123456" className="w-full p-4 bg-sand rounded-xl border border-slate-200 focus:outline-none focus:border-[var(--color-kkookk-orange-500)] tracking-widest font-mono text-center text-lg" />
            </div>
            <button 
              onClick={() => setScreen('signupSuccess')}
              className="w-full py-4 bg-navy text-white rounded-xl font-bold mt-4"
            >
              인증 완료하고 시작하기
            </button>
          </div>
        )}
      </div>
    );
  };

  const SignUpSuccess = () => (
    <div className="h-full flex flex-col p-6 bg-white">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-300">
          <Check size={48} className="text-green-600" strokeWidth={3} />
        </div>
        <h2 className="text-2xl font-bold mb-3 text-navy text-center animate-in fade-in slide-in-from-bottom-4 delay-100">
          환영합니다!<br/>멤버십이 생성되었어요.
        </h2>
        <p className="text-steel text-center animate-in fade-in slide-in-from-bottom-4 delay-200">
          이제 스탬프를 적립하고<br/>다양한 혜택을 받아보세요.
        </p>
      </div>
      
      <div className="w-full pb-8 animate-in fade-in slide-in-from-bottom-4 delay-300">
        <button 
          onClick={() => setScreen('wallet')}
          className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-orange-200 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          <Sparkles size={20} className="text-white" />
          내 지갑 확인하기
        </button>
      </div>
    </div>
  );

  const Wallet = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (e) => {
      const scrollLeft = e.target.scrollLeft;
      const width = e.target.offsetWidth;
      const cardWidth = width * 0.85; 
      const index = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(Math.min(Math.max(index, 0), allCards.length - 1));
    };

    return (
      <div className="h-full bg-sand flex flex-col">
        <div className="flex justify-between items-center px-6 pt-8 pb-4">
          <h1 className="text-2xl font-bold text-navy">내 지갑</h1>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center text-navy hover:bg-slate-50 transition-colors"
            title="메뉴 열기"
          >
            <Menu size={20} />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col justify-center pb-24">
          <div 
            className="flex overflow-x-auto snap-x snap-mandatory px-[7.5%] gap-4 no-scrollbar items-center py-6"
            onScroll={handleScroll}
          >
            {allCards.map((card, index) => (
              <div 
                key={card.id}
                className="snap-center shrink-0 w-[85%] transition-all duration-300"
                style={{
                  transform: currentIndex === index ? 'scale(1)' : 'scale(0.95)',
                  opacity: currentIndex === index ? 1 : 0.7
                }}
              >
                <div 
                  onClick={() => { setActiveCard(card); setScreen('detail'); }}
                  className={`
                    w-full aspect-[1.58/1] bg-gradient-to-br ${card.bgGradient} 
                    rounded-2xl p-6 text-white shadow-xl ${card.shadowColor} 
                    cursor-pointer flex flex-col justify-between relative overflow-hidden
                  `}
                >
                  <div className="flex justify-between items-start z-10">
                    <span className="font-bold text-lg opacity-90 text-white drop-shadow-md tracking-tight">{card.storeName}</span>
                    <span className="bg-white/20 px-2 py-1 rounded text-xs backdrop-blur-sm font-medium">D-15</span>
                  </div>
                  
                  <Coffee className="absolute -right-2 -bottom-4 text-white/10 w-32 h-32 transform rotate-12" strokeWidth={1} />
                  
                  <div className="flex justify-between items-end z-10">
                    <div>
                      <p className="text-white/80 text-[10px] font-medium mb-0.5 ml-0.5">현재 스탬프</p>
                      <p className="text-3xl font-bold text-white drop-shadow-sm leading-none">{card.current}개</p>
                    </div>
                    <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {allCards.map((_, i) => (
              <div 
                key={i} 
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-navy w-4' : 'bg-slate-300 w-1.5'}`} 
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const MigrationList = () => {
    return (
      <div className="h-full bg-sand flex flex-col">
        <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center">
            <button onClick={() => setScreen('wallet')} className="p-2 -ml-2 text-steel hover:text-navy">
              <ChevronLeft size={24} />
            </button>
            <h1 className="font-bold text-lg ml-2 text-navy">종이 스탬프 전환</h1>
          </div>
          <button 
            onClick={() => setScreen('migrationForm')}
            className="w-8 h-8 bg-navy text-white rounded-lg flex items-center justify-center hover:bg-slate-800"
          >
            <Plus size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4 overflow-y-auto">
          {migrations.length === 0 ? (
            <div className="text-center text-steel mt-20">
              <p>신청 내역이 없습니다.</p>
            </div>
          ) : (
            migrations.map(item => (
              <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-navy">{item.storeName}</h3>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full 
                    ${item.status === 'pending' ? 'bg-orange-100 text-orange-600' : 
                      item.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                    {item.status === 'pending' ? '제출됨' : item.status === 'approved' ? '승인됨' : '반려됨'}
                  </span>
                </div>
                <div className="flex justify-between items-end">
                  <p className="text-sm text-steel">신청 수량: <span className="font-bold text-navy">{item.count}개</span></p>
                  <p className="text-xs text-slate-400">{new Date(item.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const MigrationForm = () => {
    const [count, setCount] = useState('');
    const [file, setFile] = useState(null);
    
    const availableStores = allCards.map(card => {
      const isAlreadyApproved = migrations.some(m => m.storeName === card.storeName && m.status === 'approved');
      const isPending = migrations.some(m => m.storeName === card.storeName && m.status === 'pending');
      
      return {
        ...card,
        isDisabled: isAlreadyApproved || isPending,
        statusText: isAlreadyApproved ? '(전환 완료)' : (isPending ? '(심사 중)' : '')
      };
    });

    const initialStore = availableStores.find(s => !s.isDisabled) || availableStores[0];
    const [selectedStoreName, setSelectedStoreName] = useState(initialStore ? initialStore.storeName : '');

    const handleSubmit = () => {
      if (!selectedStoreName) return alert('매장을 선택해주세요.');
      
      const selectedStore = availableStores.find(s => s.storeName === selectedStoreName);
      if (selectedStore?.isDisabled) return alert('이미 전환 신청이 완료되었거나 진행 중인 매장입니다.');

      if (!count || !file) return alert('모든 정보를 입력해주세요.');
      submitMigration(selectedStoreName, count);
    };

    return (
      <div className="h-full bg-white flex flex-col">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center sticky top-0 bg-white z-10">
          <button onClick={() => setScreen('migrationList')} className="p-2 -ml-2 text-steel hover:text-navy">
            <ChevronLeft size={24} />
          </button>
          <h1 className="font-bold text-lg ml-2 text-navy">전환 신청하기</h1>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="bg-blue-50 p-4 rounded-xl flex gap-3 mb-8 text-blue-800 text-xs leading-relaxed">
            <Info size={20} className="shrink-0" />
            <div>
              <p className="font-bold mb-1">안내사항</p>
              <p>• 매장별로 1회만 전환 신청이 가능합니다.</p>
              <p>• 신청 후 승인까지 약 24~48시간 소요됩니다.</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-navy mb-2">매장 선택</label>
              <div className="relative">
                <select 
                  value={selectedStoreName} 
                  onChange={(e) => setSelectedStoreName(e.target.value)}
                  className="w-full p-4 bg-sand rounded-xl border border-slate-200 focus:outline-none appearance-none pr-10 text-navy font-medium disabled:bg-slate-100 disabled:text-slate-400"
                  disabled={availableStores.every(s => s.isDisabled)}
                >
                  {availableStores.map(store => (
                    <option 
                      key={store.id} 
                      value={store.storeName} 
                      disabled={store.isDisabled}
                    >
                      {store.storeName} {store.statusText}
                    </option>
                  ))}
                  {availableStores.length === 0 && <option disabled>보유한 스탬프 카드가 없습니다</option>}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-steel pointer-events-none" size={20} />
              </div>
              {availableStores.every(s => s.isDisabled) && (
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                  <AlertCircle size={12} /> 모든 매장의 전환 신청이 완료되었습니다.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-navy mb-2">보유 스탬프 개수</label>
              <input 
                type="number" 
                value={count} 
                onChange={(e) => setCount(e.target.value)}
                placeholder="0" 
                className="w-full p-4 bg-sand rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-navy mb-2">종이 쿠폰 사진 첨부</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-sand/30 hover:bg-sand cursor-pointer transition-colors relative">
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <div className="flex flex-col items-center text-steel">
                  {file ? (
                    <>
                      <Check size={32} className="text-green-500 mb-2" />
                      <p className="text-sm font-bold text-navy">{file.name}</p>
                    </>
                  ) : (
                    <>
                      <Camera size={32} className="mb-2" />
                      <p className="text-sm">터치하여 사진 촬영 또는 업로드</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100">
          <button 
            onClick={handleSubmit}
            disabled={availableStores.every(s => s.isDisabled)}
            className="w-full py-4 bg-navy text-white rounded-xl font-bold shadow-lg disabled:bg-slate-300 disabled:shadow-none transition-colors"
          >
            제출하기
          </button>
        </div>
      </div>
    );
  };

  const HistoryView = () => {
    const [filter, setFilter] = useState('all'); 

    const filteredRequests = requests
      .filter(req => req.status !== 'pending')
      .filter(req => {
        if (filter === 'all') return true;
        return req.type === filter;
      })
      .sort((a, b) => b.time - a.time);

    const formatDate = (date) => new Date(date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    return (
      <div className="h-full bg-white flex flex-col">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center sticky top-0 bg-white z-10 justify-between">
          <div className="flex items-center">
            <button onClick={() => setScreen('wallet')} className="p-2 -ml-2 text-steel hover:text-navy">
              <ChevronLeft size={24} />
            </button>
            <h1 className="font-bold text-lg ml-2 text-navy">활동 이력</h1>
          </div>
        </div>
        
        <div className="px-6 py-4 border-b border-slate-50 flex gap-2">
          {['all', 'stamp', 'reward'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                filter === f 
                  ? 'bg-navy text-white shadow-md shadow-slate-200' 
                  : 'bg-slate-100 text-steel hover:bg-slate-200'
              }`}
            >
              {f === 'all' ? '전체' : (f === 'stamp' ? '스탬프 적립' : '리워드 사용')}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-6">
          {filteredRequests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-steel">
              <History size={48} className="opacity-20 mb-4" />
              <p>내역이 없습니다.</p>
            </div>
          ) : (
            filteredRequests.map((req) => (
              <div key={req.id} className="flex items-center justify-between py-4 border-b border-slate-50 last:border-0 animate-in fade-in slide-in-from-bottom-2">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    req.status === 'rejected' ? 'bg-red-50 text-red-500' :
                    req.type === 'stamp' ? 'bg-orange-50 text-primary' : 'bg-purple-50 text-purple-600'
                  }`}>
                    {req.status === 'rejected' ? <X size={20} /> : (req.type === 'stamp' ? <Check size={20} /> : <Gift size={20} />)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm text-navy">{req.store}</p>
                      {req.status === 'rejected' && <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-bold">거절됨</span>}
                    </div>
                    <p className="text-xs text-steel mt-0.5">{formatDate(req.time)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`font-bold text-base ${
                    req.status === 'rejected' ? 'text-steel line-through opacity-50' :
                    req.type === 'stamp' ? 'text-primary' : 'text-navy'
                  }`}>
                    {req.type === 'stamp' ? `+${req.count}` : '사용'}
                  </span>
                  <p className="text-[10px] text-steel mt-0.5">
                    {req.type === 'stamp' ? '스탬프' : '리워드'}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  const SettingsView = () => (
    <div className="h-full bg-sand flex flex-col">
       <div className="px-6 py-4 border-b border-slate-100 flex items-center bg-white sticky top-0 z-10">
        <button onClick={() => setScreen('wallet')} className="p-2 -ml-2 text-steel hover:text-navy">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg ml-2 text-navy">설정</h1>
      </div>
      <div className="bg-white mt-2 border-t border-b border-slate-100">
        <div className="p-4 border-b border-slate-50 flex justify-between items-center cursor-pointer hover:bg-slate-50">
          <span className="text-navy font-medium">알림 설정</span>
          <div className="w-10 h-6 bg-primary rounded-full relative"><div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"/></div>
        </div>
        <div className="p-4 border-b border-slate-50 flex justify-between items-center cursor-pointer hover:bg-slate-50">
          <span className="text-navy font-medium">개인정보 처리방침</span>
          <ChevronRight size={16} className="text-steel" />
        </div>
        <div className="p-4 flex justify-between items-center">
          <span className="text-navy font-medium">버전 정보</span>
          <span className="text-steel text-sm">v1.0.0</span>
        </div>
      </div>
    </div>
  );

  const RewardBoxView = () => (
    <div className="h-full bg-sand flex flex-col relative">
      <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center sticky top-0 z-10">
         <button onClick={() => setScreen('wallet')} className="p-2 -ml-2 text-steel hover:text-navy">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg ml-2 text-navy">리워드 보관함</h1>
      </div>
      <div className="p-6 space-y-4 overflow-y-auto">
        {rewards.map((reward) => (
          <div 
            key={reward.id} 
            className={`
              bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 transition-transform 
              ${reward.isUsed ? 'opacity-60 grayscale' : 'hover:scale-[1.02] active:scale-95'}
            `}
          >
             <div className={`bg-gradient-to-r ${reward.gradient} p-6 text-white relative overflow-hidden h-32 flex flex-col justify-between`}>
                <div className="relative z-10">
                  <p className={`text-xs font-bold mb-1 ${reward.isUsed ? 'text-slate-300' : 'text-orange-100 opacity-90'}`}>{reward.storeName}</p>
                  <h3 className="text-2xl font-bold">{reward.name}</h3>
                </div>
                <p className="text-white/80 text-xs relative z-10">{reward.isUsed ? '사용 완료' : `${reward.expiry} 까지`}</p>
                <Coffee className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32" strokeWidth={1} />
             </div>
             <div className="p-4 bg-white flex justify-between items-center">
                <span className={`text-xs font-medium flex items-center gap-1 ${reward.isUsed ? 'text-steel' : 'text-primary'}`}>
                  {!reward.isUsed && <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />} 
                  {reward.isUsed ? '사용된 쿠폰입니다' : '사용 가능한 쿠폰'}
                </span>
                {!reward.isUsed && (
                  <button 
                    onClick={() => startRedeemProcess(reward)}
                    className="px-4 py-2 bg-navy text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    사용하기
                  </button>
                )}
             </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CardDetail = () => (
    <div className="h-full bg-white flex flex-col pt-12">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center">
        <button onClick={() => setScreen('wallet')} className="p-2 -ml-2 text-steel">
          <ChevronLeft size={24} />
        </button>
        <h1 className="font-bold text-lg ml-2 text-navy">{activeCard.storeName}</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 pb-32">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-1 text-navy">{activeCard.reward}</h2>
          <p className="text-steel text-sm">{activeCard.max}개를 모으면 무료로 드려요</p>
        </div>
        <div className="grid grid-cols-5 gap-3 mb-8">
          {Array.from({ length: activeCard.max }).map((_, i) => {
            const isActive = i < activeCard.current;
            return (
              <div 
                key={i} 
                className={`aspect-square rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500
                  ${isActive ? 'bg-primary text-white shadow-md scale-100' : 'bg-sand text-[var(--color-kkookk-steel)] opacity-50 scale-90'}
                `}
              >
                {isActive ? <Check size={14} strokeWidth={4} /> : i + 1}
              </div>
            );
          })}
        </div>
        <div className="bg-sand p-4 rounded-xl text-xs text-steel leading-relaxed">
          <p>• 스탬프 유효기간은 적립일로부터 6개월입니다.</p>
          <p>• 1일 최대 5개까지 적립 가능합니다.</p>
          <p>• 리워드 사용 시 사장님 확인이 필요합니다.</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full bg-white border-t border-slate-100 p-4 pb-8 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        {activeCard.current >= activeCard.max ? (
          <button 
            onClick={() => setScreen('rewardBox')}
            className="w-full py-4 bg-navy text-white rounded-xl font-bold flex items-center justify-center gap-2"
          >
            <Smartphone size={18} /> 사용 가능한 리워드 보기
          </button>
        ) : (
          <button 
            onClick={() => setScreen('request')}
            className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-orange-200 active:scale-95 transition-transform"
          >
            스탬프 적립하기
          </button>
        )}
      </div>
    </div>
  );

  const Request = () => (
    <div className="h-full flex flex-col p-6 justify-center text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-[var(--color-kkookk-orange-100)] rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
          <QrCode size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-navy">적립 요청을 보낼까요?</h2>
        <p className="text-steel">현재 {activeCard.current}개 → 적립 후 {activeCard.current + 1}개</p>
      </div>
      <div className="space-y-3 w-full">
        <button 
          onClick={handleRequestStamp}
          className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-lg"
        >
          요청 보내기
        </button>
        <button 
          onClick={() => setScreen('detail')}
          className="w-full py-4 bg-white text-steel border border-slate-200 rounded-xl font-bold"
        >
          취소
        </button>
      </div>
    </div>
  );

  const Requesting = () => (
    <div className="h-full flex flex-col p-6 justify-center text-center bg-navy text-white relative">
      <div className="flex-1 flex flex-col justify-center">
        <Loader2 className="animate-spin w-12 h-12 mx-auto mb-6 text-primary" />
        <h2 className="text-2xl font-bold mb-2">적립 승인 대기 중</h2>
        <p className="text-white/60 mb-8">매장에서 확인 후 승인해요</p>
        <div className="inline-block bg-white/10 px-4 py-2 rounded-full text-sm font-mono mb-12">
          남은 시간 01:58
        </div>
        <p className="text-xs text-white/40">요청번호 #{requestData?.id.slice(-6)}</p>
      </div>

      {/* 개발자용 시뮬레이션 컨트롤 */}
      <div className="bg-white/10 rounded-2xl p-4 mb-8 backdrop-blur-sm border border-white/10">
        <div className="flex items-center justify-center gap-2 mb-3 text-white/60 text-xs font-medium">
          <TestTube size={14} /> 
          <span>Developer Simulation Mode</span>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => updateRequestStatus(requestData.id, 'rejected')}
            className="flex-1 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-200 text-sm font-bold rounded-xl border border-red-500/30 transition-colors"
          >
            거절 시나리오
          </button>
          <button 
            onClick={() => updateRequestStatus(requestData.id, 'approved')}
            className="flex-1 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-200 text-sm font-bold rounded-xl border border-green-500/30 transition-colors"
          >
            승인 시나리오
          </button>
        </div>
        <p className="text-[10px] text-white/30 text-center mt-3">실제로는 매장 태블릿에서 누르는 버튼입니다.</p>
      </div>
    </div>
  );

  const Result = ({ success }) => (
    <div className="h-full flex flex-col p-6 justify-center text-center">
      <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${success ? 'bg-green-100 text-green-600' : 'bg-red-100 text-[var(--color-kkookk-red)]'}`}>
        {success ? <Check size={40} /> : <X size={40} />}
      </div>
      <h2 className="text-2xl font-bold mb-2 text-navy">{success ? '적립 완료!' : '승인되지 않았어요'}</h2>
      <p className="text-steel mb-8">{success ? `지금 ${activeCard.current}개예요` : '매장에 문의해주세요'}</p>
      <button 
        onClick={() => setScreen('detail')}
        className="w-full py-4 bg-sand text-navy rounded-xl font-bold"
      >
        {success ? '확인' : '다시 시도하기'}
      </button>
    </div>
  );

  const Redeem = () => {
    // 2차 확인 모달 상태 (직원용 버튼 클릭 시)
    const [showStaffConfirm, setShowStaffConfirm] = useState(false);

    return (
      <div className="h-full flex flex-col p-6 justify-center text-center bg-red-50 relative">
         <div className="flex-1 flex flex-col justify-center w-full">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full">
                <h2 className="text-xl font-bold text-[var(--color-kkookk-red)] mb-2">사장님 확인 중</h2>
                <p className="text-steel text-sm mb-6">화면을 직원에게 보여주세요</p>
                <div className="text-4xl font-mono font-bold text-navy mb-6 tracking-wider">
                  00:59
                </div>
                
                {/* 직원용 사용 처리 버튼 */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <button 
                    onClick={() => setShowStaffConfirm(true)} // 모달 띄우기
                    className="w-full py-4 bg-navy text-white rounded-xl font-bold text-lg shadow-lg hover:bg-slate-800 transition-colors animate-pulse"
                  >
                    사용 처리 완료 (직원용)
                  </button>
                  <p className="text-[10px] text-steel mt-3">직원이 직접 버튼을 눌러주세요</p>
                </div>
            </div>
         </div>
  
         {/* 리워드 사용 개발자 시뮬레이션 */}
         <div className="bg-white/90 rounded-2xl p-4 mb-8 backdrop-blur-sm border border-slate-200 shadow-lg">
          <div className="flex items-center justify-center gap-2 mb-3 text-steel text-xs font-medium">
            <TestTube size={14} /> 
            <span>Developer Simulation Mode</span>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => completeRedeem(false)}
              className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-bold rounded-xl border border-red-200 transition-colors"
            >
              거절 시나리오 (테스트용)
            </button>
          </div>
        </div>

        {/* 직원 확인 모달 */}
        {showStaffConfirm && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl p-6 w-full max-w-xs shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-red-100 text-[var(--color-kkookk-red)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle size={24} />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">직원 확인</h3>
                <p className="text-sm text-steel">
                  정말로 사용 처리 하시겠습니까?<br/>
                  (직원만 눌러주세요)
                </p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowStaffConfirm(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  취소
                </button>
                <button 
                  onClick={() => completeRedeem(true)}
                  className="flex-1 py-3 bg-navy text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
                >
                  확인 완료
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const RedeemResult = () => {
    const isSuccess = redeemResult === 'success';
    return (
      <div className="h-full flex flex-col p-6 justify-center text-center bg-white">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${isSuccess ? 'bg-green-100 text-green-600' : 'bg-red-100 text-[var(--color-kkookk-red)]'}`}>
          {isSuccess ? <Check size={40} /> : <AlertCircle size={40} />}
        </div>
        <h2 className="text-2xl font-bold mb-2 text-navy">
          {isSuccess ? '사용 완료!' : '사용 처리 실패'}
        </h2>
        <p className="text-steel mb-8">
          {isSuccess ? '리워드가 정상적으로 사용되었습니다.' : '다시 시도하거나 매장에 문의해주세요.'}
        </p>
        <button 
          onClick={() => setScreen('rewardBox')} // 사용 후 보관함으로 이동
          className="w-full py-4 bg-navy text-white rounded-xl font-bold"
        >
          확인하고 보관함 가기
        </button>
      </div>
    );
  };

  return (
    <MobileFrame>
      {screen === 'landing' && <Landing />}
      {screen === 'login' && <Login />}
      {screen === 'signup' && <SignUp />}
      {screen === 'signupSuccess' && <SignUpSuccess />}
      {screen === 'wallet' && <Wallet />}
      {screen === 'history' && <HistoryView />}
      {screen === 'settings' && <SettingsView />}
      {screen === 'rewardBox' && <RewardBoxView />}
      {screen === 'detail' && <CardDetail />}
      {screen === 'request' && <Request />}
      {screen === 'requesting' && <Requesting />}
      {screen === 'success' && <Result success={true} />}
      {screen === 'rejected' && <Result success={false} />}
      {screen === 'redeem' && <Redeem />}
      {screen === 'redeemResult' && <RedeemResult />}
      {screen === 'migrationList' && <MigrationList />}
      {screen === 'migrationForm' && <MigrationForm />}
    </MobileFrame>
  );
};

/* =========================================
   STORE APP (TABLET)
   ========================================= */
const StoreApp = ({ requests, updateRequestStatus, storeStatus, setStoreStatus, goBack }) => {
  const [activeTab, setActiveTab] = useState('requests'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  
  const pendingRequests = requests.filter(r => r.status === 'pending');
  const historyRequests = requests.filter(r => r.status !== 'pending').sort((a,b) => b.time - a.time);

  const maskPhone = (phone) => {
    return phone ? phone.replace(/(\d{3})-\d{4}-(\d{4})/, '$1-****-$2') : '010-****-0000';
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-8">
      <div className="w-[1024px] h-[768px] bg-sand rounded-[32px] overflow-hidden shadow-2xl flex border-8 border-navy relative">
        {!isLoggedIn ? (
          <OwnerAuth 
            title="매장용 태블릿" 
            subTitle="매장 관리자 계정으로 로그인하세요." 
            onLoginSuccess={() => setIsLoggedIn(true)} 
            onBack={goBack}
            isTabletMode={true}
          />
        ) : (
          <>
            <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
              <div className="p-6 border-b border-slate-100">
                <h1 className="font-bold text-xl text-navy">카페 루나</h1>
                <div className={`text-xs font-medium flex items-center gap-1 mt-1 ${storeStatus === 'OPEN' ? 'text-green-600' : 'text-slate-400'}`}>
                  <span className={`w-2 h-2 rounded-full ${storeStatus === 'OPEN' ? 'bg-green-500 animate-pulse' : 'bg-slate-400'}`}></span> 
                  {storeStatus === 'OPEN' ? '영업중 · 온라인' : '영업 종료'}
                </div>
              </div>
              <nav className="flex-1 p-4 space-y-2">
                <button 
                  onClick={() => setActiveTab('requests')}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all text-left ${activeTab === 'requests' ? 'bg-navy text-white shadow-lg shadow-slate-200' : 'text-steel hover:bg-slate-50'}`}
                >
                  <Bell size={20} />
                  <span className="font-bold">승인 대기</span>
                  {pendingRequests.length > 0 && (
                    <span className="ml-auto bg-[var(--color-kkookk-red)] text-white text-xs font-bold px-2 py-0.5 rounded-full">{pendingRequests.length}</span>
                  )}
                </button>
                <button 
                  onClick={() => setActiveTab('history')}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all text-left ${activeTab === 'history' ? 'bg-navy text-white shadow-lg shadow-slate-200' : 'text-steel hover:bg-slate-50'}`}
                >
                  <History size={20} />
                  <span className="font-bold">처리 내역</span>
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all text-left ${activeTab === 'settings' ? 'bg-navy text-white shadow-lg shadow-slate-200' : 'text-steel hover:bg-slate-50'}`}
                >
                  <Settings size={20} />
                  <span className="font-bold">설정</span>
                </button>
              </nav>
              <div className="p-4">
                 <button onClick={goBack} className="flex items-center gap-2 text-steel hover:text-navy p-2">
                   <LogOut size={16} /> 앱 종료
                 </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col bg-sand">
              {activeTab === 'requests' && (
                <>
                  <div className="p-6 pb-2 flex justify-between items-end">
                    <h2 className="text-2xl font-bold text-navy">승인 요청 <span className="text-primary">{pendingRequests.length}</span>건</h2>
                    <span className="text-sm text-steel flex items-center gap-2"><Loader2 className="animate-spin" size={12}/> 실시간 갱신 중</span>
                  </div>

                  <div className="p-6 grid grid-cols-2 gap-4 overflow-y-auto content-start flex-1">
                    {pendingRequests.length === 0 ? (
                      <div className="col-span-2 h-64 flex flex-col items-center justify-center text-steel border-2 border-dashed border-slate-200 rounded-2xl">
                        <Bell size={48} className="mb-4 opacity-20" />
                        <p>새로운 요청이 없습니다.</p>
                      </div>
                    ) : (
                      pendingRequests.map(req => (
                        <div key={req.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4">
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <span className={`text-xs font-bold px-2 py-1 rounded ${req.type === 'stamp' ? 'bg-[var(--color-kkookk-orange-100)] text-primary' : 'bg-purple-100 text-purple-700'}`}>
                                {req.type === 'stamp' ? '스탬프 적립' : '리워드 사용'}
                              </span>
                              <h3 className="text-xl font-bold mt-2 text-navy">{req.user}님</h3>
                              <p className="text-sm text-steel font-mono mt-1">{maskPhone(req.phone)}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-steel">{formatTime(req.time)} 요청</p>
                              <p className="font-bold text-lg text-primary mt-1">
                                {req.type === 'stamp' ? `+${req.count}개` : '사용'}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            <button 
                              onClick={() => updateRequestStatus(req.id, 'rejected')}
                              className="flex-1 py-4 border border-slate-200 text-steel font-bold rounded-xl hover:bg-slate-50 transition-colors"
                            >
                              거절
                            </button>
                            <button 
                              onClick={() => updateRequestStatus(req.id, 'approved')}
                              className="flex-[2] py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-orange-200 hover:bg-orange-600 active:scale-95 transition-transform"
                            >
                              승인하기
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}

              {activeTab === 'history' && (
                <>
                  <div className="p-6 pb-2">
                    <h2 className="text-2xl font-bold text-navy">최근 처리 내역</h2>
                  </div>
                  <div className="p-6 flex-1 overflow-y-auto">
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                          <tr>
                            <th className="p-4 text-xs font-bold text-steel">시간</th>
                            <th className="p-4 text-xs font-bold text-steel">닉네임</th>
                            <th className="p-4 text-xs font-bold text-steel">전화번호</th>
                            <th className="p-4 text-xs font-bold text-steel">내용</th>
                            <th className="p-4 text-xs font-bold text-steel">결과</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {historyRequests.length === 0 ? (
                            <tr>
                              <td colSpan="5" className="p-8 text-center text-steel text-sm">처리된 내역이 없습니다.</td>
                            </tr>
                          ) : (
                            historyRequests.map(req => (
                              <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-4 text-sm text-navy font-mono">{formatTime(req.time)}</td>
                                <td className="p-4 text-sm text-navy font-bold">{req.user}</td>
                                <td className="p-4 text-sm text-steel font-mono">{maskPhone(req.phone)}</td>
                                <td className="p-4 text-sm text-navy">
                                  {req.type === 'stamp' ? `스탬프 +${req.count}개` : '리워드 사용'}
                                </td>
                                <td className="p-4">
                                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${req.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {req.status === 'approved' ? '승인됨' : '거절됨'}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'settings' && (
                <>
                  <div className="p-6 pb-2">
                    <h2 className="text-2xl font-bold text-navy">매장 설정</h2>
                  </div>
                  <div className="p-6">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 flex justify-between items-center shadow-sm">
                      <div>
                        <h3 className="font-bold text-lg text-navy flex items-center gap-2">
                          <Store size={20} /> 영업 상태 설정
                        </h3>
                        <p className="text-sm text-steel mt-1">영업 종료 시 고객이 적립을 요청할 수 없습니다.</p>
                      </div>
                      <button 
                        onClick={() => setStoreStatus(prev => prev === 'OPEN' ? 'CLOSED' : 'OPEN')}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none ${storeStatus === 'OPEN' ? 'bg-green-500' : 'bg-slate-300'}`}
                      >
                        <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${storeStatus === 'OPEN' ? 'translate-x-7' : 'translate-x-1'}`} />
                      </button>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6 mt-4 flex justify-between items-center shadow-sm opacity-50 cursor-not-allowed">
                      <div>
                        <h3 className="font-bold text-lg text-navy flex items-center gap-2">
                          <Power size={20} /> 자동 승인 모드 (준비중)
                        </h3>
                        <p className="text-sm text-steel mt-1">바쁜 시간대에 모든 요청을 자동으로 승인합니다.</p>
                      </div>
                      <div className="relative inline-flex h-8 w-14 items-center rounded-full bg-slate-200">
                        <span className="inline-block h-6 w-6 transform rounded-full bg-white translate-x-1" />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* =========================================
   ADMIN BACKOFFICE APP
   ========================================= */
const AdminApp = ({ goBack }) => {
  const [activeTab, setActiveTab] = useState('stores'); 
  const [selectedStore, setSelectedStore] = useState(null); 
  const [isCreatingStore, setIsCreatingStore] = useState(false); 
  const [storeDetailTab, setStoreDetailTab] = useState('cards'); 
  const [cardViewMode, setCardViewMode] = useState('list'); // 'list', 'create', 'stats'
  const [historyFilter, setHistoryFilter] = useState('all'); 
  const [showQRModal, setShowQRModal] = useState(false); 
  const [qrStoreName, setQrStoreName] = useState(''); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminMigrations, setAdminMigrations] = useState(MOCK_MIGRATIONS); // 마이그레이션 관리 상태
  
  const [step, setStep] = useState(1);
  const [design, setDesign] = useState({
    template: 'basic',
    color: 'orange',
    cardName: '단골 스탬프',
    maxStamps: 10,
    reward: '아메리카노 1잔',
    backgroundImage: null,
    stampImage: null,
    textColor: 'black'
  });

  const handleFileUpload = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDesign(prev => ({ ...prev, [key]: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const MOCK_STORES = [
    { id: 1, name: '블루보틀 성수', address: '서울 성동구 아차산로 7', status: 'OPEN', activeCards: 1 },
    { id: 2, name: '스타벅스 역삼', address: '서울 강남구 테헤란로 211', status: 'CLOSED', activeCards: 0 },
  ];

  const MOCK_ADMIN_CARDS = [
    { id: 2, name: '겨울 시즌 한정', status: 'draft', benefit: '5개 적립 시 시즌 음료 1잔', created: '2023.10.25' },
    { id: 3, name: 'VIP 전용 카드', status: 'inactive', benefit: '20개 적립 시 MD 상품 증정', created: '2023.09.15' },
  ];

  const handleOpenQRModal = (e, storeName) => {
    e.stopPropagation();
    setQrStoreName(storeName);
    setShowQRModal(true);
  };

  // 마이그레이션 상태 변경 핸들러
  const handleMigrationAction = (id, newStatus) => {
    setAdminMigrations(prev => 
      prev.map(mig => mig.id === id ? { ...mig, status: newStatus } : mig)
    );
  };

  const getFilteredHistory = () => {
    let filtered = MOCK_REQUESTS.filter(r => r.status !== 'pending').sort((a,b) => b.time - a.time);
    if (historyFilter === 'stamp') filtered = filtered.filter(r => r.type === 'stamp');
    if (historyFilter === 'reward') filtered = filtered.filter(r => r.type === 'reward');
    return filtered;
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleString('ko-KR', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // 마이그레이션 관리 뷰 컴포넌트
  const MigrationManager = () => {
    const storeMigrations = adminMigrations.filter(m => m.storeName === selectedStore.name);
    const [viewImage, setViewImage] = useState(null); // 이미지 모달 상태

    return (
      <div className="p-8 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-navy">전환 신청 관리</h3>
          <span className="text-sm text-steel">총 {storeMigrations.length}건</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex-1 flex flex-col">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="p-4 pl-6 text-xs font-bold text-steel">신청일</th>
                <th className="p-4 text-xs font-bold text-steel">신청자</th>
                <th className="p-4 text-xs font-bold text-steel">수량</th>
                <th className="p-4 text-xs font-bold text-steel">증빙 사진</th>
                <th className="p-4 text-xs font-bold text-steel">상태</th>
                <th className="p-4 text-xs font-bold text-steel text-right pr-6">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {storeMigrations.map((mig) => (
                <tr key={mig.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 pl-6 text-sm text-steel font-mono">
                    {new Date(mig.date).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-sm font-bold text-navy">익명 사용자</td>
                  <td className="p-4 text-sm font-bold text-navy">{mig.count}개</td>
                  <td className="p-4">
                    <button 
                      onClick={() => setViewImage(mig.id)}
                      className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                    >
                      <ImageIcon size={14} /> 확인하기
                    </button>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2 py-1 rounded-full 
                      ${mig.status === 'pending' ? 'bg-orange-100 text-orange-600' : 
                        mig.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {mig.status === 'pending' ? '대기중' : mig.status === 'approved' ? '승인됨' : '반려됨'}
                    </span>
                  </td>
                  <td className="p-4 text-right pr-6">
                    {mig.status === 'pending' && (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => handleMigrationAction(mig.id, 'rejected')}
                          className="px-3 py-1.5 border border-slate-200 text-slate-500 rounded-lg text-xs font-bold hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-colors"
                        >
                          반려
                        </button>
                        <button 
                          onClick={() => handleMigrationAction(mig.id, 'approved')}
                          className="px-3 py-1.5 bg-navy text-white rounded-lg text-xs font-bold hover:bg-slate-700 transition-colors shadow-sm"
                        >
                          승인
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {storeMigrations.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-steel">신청 내역이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 이미지 확인 모달 */}
        {viewImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm" onClick={() => setViewImage(null)}>
            <div className="bg-white rounded-2xl p-2 max-w-sm w-full animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
              <div className="aspect-[3/4] bg-slate-100 rounded-xl flex flex-col items-center justify-center text-slate-400">
                <ImageIcon size={48} className="mb-2" />
                <p className="text-sm">이미지 미리보기 (시뮬레이션)</p>
              </div>
              <button 
                onClick={() => setViewImage(null)}
                className="w-full py-3 mt-2 font-bold text-navy hover:bg-slate-50 rounded-xl"
              >
                닫기
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  // ... (StoreCreateView implementation remains same)
  const StoreCreateView = () => (
    <div className="p-8 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <button onClick={() => setIsCreatingStore(false)} className="flex items-center gap-2 text-steel hover:text-navy mb-4 transition-colors">
          <ChevronLeft size={20} /> 돌아가기
        </button>
        <h2 className="text-2xl font-bold text-navy">새 매장 추가하기</h2>
        <p className="text-steel text-sm mt-1">매장 정보를 입력하여 서비스를 시작하세요.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-bold text-navy mb-2">매장 이름 <span className="text-red-500">*</span></label>
            <input type="text" placeholder="예: 카페 루나 강남점" className="w-full p-3 border border-slate-200 rounded-xl focus:border-primary focus:outline-none" />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-navy mb-2">매장 주소 <span className="text-red-500">*</span></label>
            <div className="flex gap-2">
              <input type="text" placeholder="주소를 검색해주세요" className="flex-1 p-3 border border-slate-200 rounded-xl focus:border-primary focus:outline-none" />
              <button className="px-4 py-3 bg-slate-100 text-navy font-bold rounded-xl hover:bg-slate-200 flex items-center gap-2">
                <Search size={18} /> 검색
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-navy mb-2">매장 전화번호</label>
            <input type="tel" placeholder="02-0000-0000" className="w-full p-3 border border-slate-200 rounded-xl focus:border-primary focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-bold text-navy mb-2">업종 카테고리</label>
            <div className="flex gap-2 flex-wrap">
              {['카페/베이커리', '음식점', '뷰티/미용', '학원/교육', '기타'].map(cat => (
                <button key={cat} className="px-4 py-2 border border-slate-200 rounded-full text-sm hover:border-primary hover:text-primary transition-colors bg-white">
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-navy mb-2">매장 설명 (선택)</label>
            <textarea placeholder="매장에 대한 간단한 소개를 입력해주세요." className="w-full p-3 border border-slate-200 rounded-xl focus:border-primary focus:outline-none h-24 resize-none" />
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end gap-3">
          <button 
            onClick={() => setIsCreatingStore(false)}
            className="px-6 py-3 border border-slate-200 text-steel font-bold rounded-xl hover:bg-slate-50 transition-colors"
          >
            취소
          </button>
          <button 
            onClick={() => { alert('매장이 성공적으로 등록되었습니다.'); setIsCreatingStore(false); }}
            className="px-6 py-3 bg-navy text-white font-bold rounded-xl hover:bg-slate-800 transition-colors"
          >
            매장 등록하기
          </button>
        </div>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <OwnerAuth 
        title="사장님 백오피스" 
        subTitle="통합 관리자 계정으로 로그인하세요." 
        onLoginSuccess={() => setIsLoggedIn(true)} 
        onBack={goBack}
      />
    );
  }

  return (
    <div className="min-h-screen bg-sand flex flex-col">
      <header className="h-16 bg-white border-b border-slate-200 flex justify-between items-center px-6 sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-lg text-navy">
          <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center text-white">B</div>
          Boss Partners
        </div>
        <button onClick={goBack} className="text-sm text-steel hover:text-navy">로그아웃</button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white border-r border-slate-200 p-4 hidden md:block">
          <div className="space-y-1">
             <button onClick={() => { setActiveTab('stores'); setSelectedStore(null); setIsCreatingStore(false); }} className={`w-full text-left px-4 py-3 rounded-lg cursor-pointer ${activeTab === 'stores' ? 'bg-[var(--color-kkookk-orange-100)] text-primary font-bold' : 'text-steel hover:bg-sand'}`}>스토어 관리</button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col min-w-0 bg-sand overflow-y-auto">
          {activeTab === 'stores' && (
            <>
              {isCreatingStore && <StoreCreateView />}

              {!isCreatingStore && !selectedStore && (
                <div className="p-8 max-w-6xl mx-auto w-full">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-navy">스토어 관리</h2>
                      <p className="text-steel text-sm mt-1">등록된 매장을 확인하고 관리하세요.</p>
                    </div>
                    <button 
                      onClick={() => setIsCreatingStore(true)}
                      className="px-6 py-3 bg-navy text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors"
                    >
                      <Plus size={20} /> 매장 추가
                    </button>
                  </div>

                  <div className="grid gap-4">
                    {MOCK_STORES.map(store => (
                      <div 
                        key={store.id}
                        onClick={() => setSelectedStore(store)}
                        className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                            <Store size={32} />
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-navy flex items-center gap-2">
                              {store.name}
                              <span className={`text-[10px] px-2 py-0.5 rounded-full ${store.status === 'OPEN' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                                {store.status === 'OPEN' ? '영업중' : '영업종료'}
                              </span>
                            </h3>
                            <p className="text-sm text-steel flex items-center gap-1 mt-1">
                              <MapPin size={14} /> {store.address}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-8">
                          <div className="text-right">
                            <p className="text-xs text-steel">활성 스탬프 카드</p>
                            <p className="text-lg font-bold text-navy">{store.activeCards}개</p>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              onClick={(e) => handleOpenQRModal(e, store.name)}
                              className="px-4 py-2 border border-slate-200 text-steel font-bold rounded-lg hover:bg-slate-50 hover:text-navy flex items-center gap-2"
                            >
                              <QrCode size={16} /> QR 포스터
                            </button>
                            <button className="px-4 py-2 bg-[var(--color-kkookk-orange-100)] text-primary font-bold rounded-lg hover:bg-orange-200 flex items-center gap-2">
                              관리 <ArrowRight size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!isCreatingStore && selectedStore && (
                <div className="flex flex-col h-full">
                  <div className="bg-white border-b border-slate-200 px-8 py-6">
                    <div className="flex items-center gap-4 mb-6">
                      <button onClick={() => setSelectedStore(null)} className="p-2 -ml-2 text-steel hover:text-navy hover:bg-slate-50 rounded-full transition-colors">
                        <ChevronLeft size={24} />
                      </button>
                      <div>
                        <h2 className="text-2xl font-bold text-navy">{selectedStore.name}</h2>
                        <p className="text-steel text-sm flex items-center gap-1"><MapPin size={12}/> {selectedStore.address}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button 
                        onClick={() => setStoreDetailTab('cards')}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${storeDetailTab === 'cards' ? 'bg-navy text-white' : 'text-steel hover:bg-slate-50'}`}
                      >
                        스탬프 카드 관리
                      </button>
                      <button 
                        onClick={() => setStoreDetailTab('history')}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${storeDetailTab === 'history' ? 'bg-navy text-white' : 'text-steel hover:bg-slate-50'}`}
                      >
                        적립/사용 내역
                      </button>
                      {/* 전환 신청 관리 탭 추가 */}
                      <button 
                        onClick={() => setStoreDetailTab('migrations')}
                        className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${storeDetailTab === 'migrations' ? 'bg-navy text-white' : 'text-steel hover:bg-slate-50'}`}
                      >
                        전환 신청 관리
                        {adminMigrations.filter(m => m.storeName === selectedStore.name && m.status === 'pending').length > 0 && (
                          <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">N</span>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    {/* ... Existing Tabs ... */}
                    {storeDetailTab === 'cards' && cardViewMode === 'list' && (
                      <div className="p-8 max-w-6xl mx-auto w-full">
                        {/* ... Existing Card List Content ... */}
                        <div className="flex justify-between items-center mb-8">
                          <div>
                            <h3 className="text-xl font-bold text-navy">보유 스탬프 카드</h3>
                            <p className="text-steel text-sm mt-1">고객에게 발급할 적립 카드를 관리합니다.</p>
                          </div>
                          <button 
                            onClick={() => { setCardViewMode('create'); setStep(1); }}
                            className="px-6 py-3 bg-navy text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors"
                          >
                            <Plus size={20} /> 새 스탬프 카드 만들기
                          </button>
                        </div>

                        <div className="mb-10">
                          <h4 className="font-bold text-navy mb-4 flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            현재 진행 중 (Active)
                          </h4>
                          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex gap-8 items-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-80 h-48 bg-gradient-to-br from-[var(--color-kkookk-orange-500)] to-[#E04F00] rounded-xl shadow-lg relative flex flex-col p-6 text-white overflow-hidden shrink-0">
                              <div className="flex justify-between items-start mb-4">
                                <span className="font-bold text-lg opacity-90">{selectedStore.name}</span>
                                <span className="text-xs bg-white/20 px-2 py-1 rounded">D-365</span>
                              </div>
                              <div className="mt-auto flex justify-between items-end">
                                <div>
                                  <p className="text-xs opacity-80 mb-1">진행률</p>
                                  <p className="text-2xl font-bold">3 / 10</p>
                                </div>
                                <Coffee className="text-white/20 w-16 h-16 absolute -right-4 -bottom-4" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-xl font-bold text-navy">단골 스탬프</h4>
                                <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">게시 중</span>
                              </div>
                              <p className="text-steel text-sm mb-6">10개 적립 시 아메리카노 1잔 제공</p>
                              <div className="flex gap-8 text-sm">
                                <div>
                                  <p className="text-steel mb-1">누적 적립</p>
                                  <p className="font-bold text-navy text-lg">1,240회</p>
                                </div>
                                <div>
                                  <p className="text-steel mb-1">쿠폰 발급</p>
                                  <p className="font-bold text-navy text-lg">128장</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-2">
                              <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-navy hover:bg-slate-50 flex items-center gap-2">
                                <Edit size={16} /> 수정
                              </button>
                              <button 
                                onClick={() => setCardViewMode('stats')}
                                className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-navy hover:bg-slate-50 flex items-center gap-2"
                              >
                                <BarChart3 size={16} /> 통계
                              </button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-steel mb-4">보관함 / 초안</h4>
                          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                            <table className="w-full text-left">
                              <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                  <th className="p-4 text-xs font-bold text-steel pl-6">상태</th>
                                  <th className="p-4 text-xs font-bold text-steel">카드명</th>
                                  <th className="p-4 text-xs font-bold text-steel">혜택</th>
                                  <th className="p-4 text-xs font-bold text-steel">생성일</th>
                                  <th className="p-4 text-xs font-bold text-steel text-right pr-6">관리</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100">
                                {MOCK_ADMIN_CARDS.map(card => (
                                  <tr key={card.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="p-4 pl-6">
                                      <span className={`text-xs font-bold px-2 py-1 rounded ${card.status === 'draft' ? 'bg-slate-100 text-slate-500' : 'bg-red-100 text-red-500'}`}>
                                        {card.status === 'draft' ? '작성 중' : '종료됨'}
                                      </span>
                                    </td>
                                    <td className="p-4 text-sm font-bold text-navy">{card.name}</td>
                                    <td className="p-4 text-sm text-steel">{card.benefit}</td>
                                    <td className="p-4 text-sm text-steel font-mono">{card.created}</td>
                                    <td className="p-4 text-right pr-6">
                                      <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 text-steel hover:text-navy hover:bg-slate-200 rounded-lg"><Edit size={16} /></button>
                                        <button className="p-2 text-steel hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 통계 뷰 모드 추가 */}
                    {storeDetailTab === 'cards' && cardViewMode === 'stats' && (
                      <div className="p-8 max-w-6xl mx-auto w-full h-full flex flex-col">
                        <div className="mb-8 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <button onClick={() => setCardViewMode('list')} className="p-2 -ml-2 text-steel hover:text-navy hover:bg-slate-100 rounded-full transition-colors">
                              <ChevronLeft size={24} />
                            </button>
                            <div>
                              <h3 className="text-xl font-bold text-navy">단골 스탬프 통계</h3>
                              <p className="text-sm text-steel mt-1">최근 30일간의 데이터를 분석합니다.</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                             <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-steel flex items-center gap-2 hover:bg-slate-50">
                               <Calendar size={16} /> 2023.11.01 ~ 11.30
                             </button>
                             <button className="px-4 py-2 bg-navy text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-slate-800">
                               <Download size={16} /> 리포트 다운로드
                             </button>
                          </div>
                        </div>

                        {/* 핵심 지표 카드 */}
                        <div className="grid grid-cols-4 gap-4 mb-8">
                          {[
                            { title: '누적 적립 수', value: '1,240', unit: '개', icon: <TrendingUp size={20}/>, change: '+12%', color: 'bg-blue-50 text-blue-600' },
                            { title: '쿠폰 발급 수', value: '128', unit: '장', icon: <Gift size={20}/>, change: '+5%', color: 'bg-orange-50 text-orange-600' },
                            { title: '쿠폰 사용 수', value: '110', unit: '회', icon: <Check size={20}/>, change: '+8%', color: 'bg-green-50 text-green-600' },
                            { title: '활성 이용자', value: '342', unit: '명', icon: <Users size={20}/>, change: '+24%', color: 'bg-purple-50 text-purple-600' },
                          ].map((stat, i) => (
                            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                               <div className="flex justify-between items-start mb-4">
                                  <div className={`p-3 rounded-xl ${stat.color}`}>
                                    {stat.icon}
                                  </div>
                                  <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.change}</span>
                               </div>
                               <p className="text-steel text-xs font-medium mb-1">{stat.title}</p>
                               <div className="flex items-baseline gap-1">
                                 <h4 className="text-2xl font-bold text-navy">{stat.value}</h4>
                                 <span className="text-sm text-steel">{stat.unit}</span>
                               </div>
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-3 gap-6 flex-1 min-h-0">
                          {/* 주간 적립 추이 차트 (CSS Only) */}
                          <div className="col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                             <div className="flex justify-between items-center mb-6">
                               <h4 className="font-bold text-lg text-navy">주간 적립 추이</h4>
                               <div className="flex gap-2">
                                  <div className="flex items-center gap-1.5 text-xs text-steel">
                                    <div className="w-2.5 h-2.5 bg-[var(--color-kkookk-orange-500)] rounded-full"></div> 스탬프 적립
                                  </div>
                                  <div className="flex items-center gap-1.5 text-xs text-steel">
                                    <div className="w-2.5 h-2.5 bg-slate-200 rounded-full"></div> 지난주 평균
                                  </div>
                               </div>
                             </div>
                             
                             <div className="flex-1 flex items-end justify-between gap-4 px-2 min-h-[200px]">
                                {[
                                  { day: '월', val: 45, prev: 30 },
                                  { day: '화', val: 52, prev: 40 },
                                  { day: '수', val: 38, prev: 45 },
                                  { day: '목', val: 65, prev: 50 },
                                  { day: '금', val: 85, prev: 60 },
                                  { day: '토', val: 95, prev: 80 },
                                  { day: '일', val: 70, prev: 65 },
                                ].map((d, i) => (
                                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                                     <div className="relative w-full flex justify-center h-full items-end">
                                        {/* Tooltip */}
                                        <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-navy text-white text-xs px-2 py-1 rounded pointer-events-none mb-2 z-10 whitespace-nowrap font-bold">
                                          {d.val}건 적립
                                        </div>
                                        {/* Bar */}
                                        <div 
                                          className="w-3 bg-slate-200 rounded-t-full absolute bottom-0 opacity-0 group-hover:opacity-50 transition-all duration-500" 
                                          style={{height: `${d.prev}%`}} 
                                        />
                                        <div 
                                          className="w-3 bg-[var(--color-kkookk-orange-500)] rounded-t-full relative z-10 transition-all duration-500 hover:bg-orange-600" 
                                          style={{height: `${d.val}%`}} 
                                        />
                                     </div>
                                     <span className="text-xs font-medium text-steel">{d.day}</span>
                                  </div>
                                ))}
                             </div>
                          </div>

                          {/* 방문 시간대 & 인사이트 */}
                          <div className="col-span-1 flex flex-col gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex-1">
                               <h4 className="font-bold text-lg text-navy mb-4">주요 방문 시간대</h4>
                               <div className="flex items-center gap-3 mb-6">
                                  <div className="p-3 bg-orange-50 rounded-full text-primary">
                                    <Clock size={24} />
                                  </div>
                                  <div>
                                    <p className="text-sm text-steel">가장 붐비는 시간</p>
                                    <p className="text-xl font-bold text-navy">12:00 - 14:00</p>
                                  </div>
                               </div>
                               <div className="space-y-3">
                                  {[
                                    { time: '점심 (12-14)', pct: 45 },
                                    { time: '저녁 (18-20)', pct: 30 },
                                    { time: '오후 (14-17)', pct: 15 },
                                    { time: '기타', pct: 10 },
                                  ].map((t, i) => (
                                    <div key={i}>
                                      <div className="flex justify-between text-xs mb-1">
                                        <span className="font-bold text-navy">{t.time}</span>
                                        <span className="text-steel">{t.pct}%</span>
                                      </div>
                                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-navy rounded-full" style={{width: `${t.pct}%`}}></div>
                                      </div>
                                    </div>
                                  ))}
                               </div>
                            </div>

                            <div className="bg-slate-800 p-6 rounded-2xl shadow-sm text-white">
                               <div className="flex items-start gap-3">
                                  <Sparkles className="text-yellow-400 shrink-0" size={20} />
                                  <div>
                                    <h5 className="font-bold text-sm text-white mb-1">인사이트</h5>
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                      이번 달 <span className="text-white font-bold">금요일 점심 시간</span>에 쿠폰 사용률이 가장 높습니다. 이 시간대에 타임 세일 이벤트를 진행해보세요!
                                    </p>
                                  </div>
                               </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {storeDetailTab === 'cards' && cardViewMode === 'create' && (
                      <div className="h-full flex flex-col">
                        <div className="flex-1 flex overflow-hidden">
                           <div className="w-[400px] bg-white border-r border-slate-200 p-8 overflow-y-auto">
                              <div className="mb-6 flex items-center gap-2">
                                <button onClick={() => setCardViewMode('list')} className="text-steel hover:text-navy text-sm flex items-center gap-1">
                                  <ChevronLeft size={16}/> 목록으로
                                </button>
                              </div>
                              
                              {step === 1 && (
                                <div className="space-y-6">
                                  <h3 className="font-bold text-lg text-navy">템플릿 선택</h3>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div 
                                      onClick={() => setDesign({...design, template: 'basic'})}
                                      className={`p-4 border rounded-xl cursor-pointer hover:border-[var(--color-kkookk-orange-500)] transition-colors ${design.template === 'basic' ? 'border-[var(--color-kkookk-orange-500)] ring-2 ring-orange-100' : 'border-slate-200'}`}
                                    >
                                       <div className="h-24 bg-slate-50 rounded-lg mb-3 flex flex-col items-center justify-center gap-2 border border-slate-100">
                                            <div className="flex -space-x-2">
                                                <div className="w-6 h-6 rounded-full bg-orange-500 border-2 border-white shadow-sm" />
                                                <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white shadow-sm" />
                                                <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
                                                <div className="w-6 h-6 rounded-full bg-rose-500 border-2 border-white shadow-sm" />
                                                <div className="w-6 h-6 rounded-full bg-violet-500 border-2 border-white shadow-sm" />
                                            </div>
                                            <div className="w-16 h-2 bg-slate-200 rounded-full" />
                                            <div className="w-10 h-2 bg-slate-200 rounded-full" />
                                        </div>
                                       <p className="font-medium text-sm text-center text-navy">기본형</p>
                                    </div>
                                    <div 
                                      onClick={() => setDesign({...design, template: 'image'})}
                                      className={`p-4 border rounded-xl cursor-pointer hover:border-[var(--color-kkookk-orange-500)] transition-colors ${design.template === 'image' ? 'border-[var(--color-kkookk-orange-500)] ring-2 ring-orange-100' : 'border-slate-200'}`}
                                    >
                                       <div className="h-24 bg-slate-100 border border-slate-200 rounded-lg mb-3 flex items-center justify-center text-slate-400"><ImageIcon /></div>
                                       <p className="font-medium text-sm text-center text-navy">이미지형 (커스텀)</p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {step === 2 && (
                                <div className="space-y-8">
                                  <div>
                                     <label className="block text-sm font-bold mb-3 text-navy">카드 이름</label>
                                     <input 
                                        value={design.cardName}
                                        onChange={(e) => setDesign({...design, cardName: e.target.value})}
                                        className="w-full p-3 border border-slate-200 rounded-lg focus:border-primary focus:outline-none" 
                                      />
                                  </div>

                                  {design.template === 'basic' && (
                                    <div>
                                       <label className="block text-sm font-bold mb-3 text-navy">브랜드 컬러</label>
                                       <div className="flex gap-3">
                                         {['orange', 'blue', 'emerald', 'rose', 'violet'].map(c => (
                                           <button 
                                              key={c}
                                              onClick={() => setDesign({...design, color: c})}
                                              className={`w-8 h-8 rounded-full ring-offset-2 ${
                                                c === 'orange' ? 'bg-[var(--color-kkookk-orange-500)]' : `bg-${c}-500`
                                              } ${design.color===c ? 'ring-2 ring-navy' : ''}`} 
                                           />
                                         ))}
                                       </div>
                                       <div className="mt-6">
                                         <label className="block text-sm font-bold mb-3 text-navy">배경 스타일</label>
                                         <div className="flex gap-2">
                                           <button className="flex-1 py-2 border border-navy bg-navy text-white rounded-lg text-sm">단색</button>
                                           <button className="flex-1 py-2 border border-slate-200 rounded-lg text-sm text-steel">그라데이션</button>
                                         </div>
                                      </div>
                                    </div>
                                  )}

                                  {design.template === 'image' && (
                                    <div className="space-y-6">
                                      <div>
                                        <label className="block text-sm font-bold mb-3 text-navy">텍스트 색상</label>
                                        <div className="flex gap-2">
                                          <button 
                                            onClick={() => setDesign({...design, textColor: 'black'})}
                                            className={`flex-1 py-2 border rounded-lg text-sm font-bold flex items-center justify-center gap-2 ${design.textColor === 'black' ? 'border-navy bg-navy text-white' : 'border-slate-200 text-steel'}`}
                                          >
                                            <div className="w-4 h-4 bg-black rounded-full border border-white"></div> 검은색
                                          </button>
                                          <button 
                                            onClick={() => setDesign({...design, textColor: 'white'})}
                                            className={`flex-1 py-2 border rounded-lg text-sm font-bold flex items-center justify-center gap-2 ${design.textColor === 'white' ? 'border-navy bg-navy text-white' : 'border-slate-200 text-steel'}`}
                                          >
                                            <div className="w-4 h-4 bg-white rounded-full border border-slate-200"></div> 흰색
                                          </button>
                                        </div>
                                      </div>

                                      <div>
                                         <label className="block text-sm font-bold mb-3 text-navy">카드 배경 이미지</label>
                                         <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors relative cursor-pointer group">
                                           <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'backgroundImage')} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                           <div className="text-steel flex flex-col items-center group-hover:text-primary transition-colors">
                                              <Upload size={24} className="mb-2"/>
                                              <span className="text-xs">{design.backgroundImage ? '이미지 변경하기' : '클릭하여 업로드'}</span>
                                           </div>
                                         </div>
                                         {design.backgroundImage && (
                                           <div className="mt-2 h-24 w-full rounded-lg bg-cover bg-center border border-slate-200 relative">
                                             <div className="absolute inset-0 bg-cover bg-center rounded-lg" style={{backgroundImage: `url(${design.backgroundImage})`}} />
                                             <button 
                                              onClick={() => setDesign({...design, backgroundImage: null})}
                                              className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full hover:bg-black/70"
                                             >
                                               <X size={12}/>
                                             </button>
                                           </div>
                                         )}
                                      </div>

                                      <div>
                                         <label className="block text-sm font-bold mb-3 text-navy">스탬프 아이콘 (완료 시)</label>
                                         <div className="flex gap-4 items-center">
                                           <div className="w-16 h-16 border-2 border-dashed border-slate-300 rounded-full flex items-center justify-center relative cursor-pointer hover:border-primary overflow-hidden">
                                             <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'stampImage')} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                             {design.stampImage ? (
                                               <img src={design.stampImage} alt="Stamp" className="w-full h-full object-cover" />
                                             ) : (
                                               <Check size={20} className="text-steel"/>
                                             )}
                                           </div>
                                           <div className="text-xs text-steel">
                                             <p>PNG, JPG (투명 배경 권장)</p>
                                             <p>권장 사이즈: 100x100px</p>
                                           </div>
                                         </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}

                              {step === 3 && (
                                <div className="space-y-8">
                                  <div>
                                     <label className="block text-sm font-bold mb-3 text-navy">목표 스탬프 수</label>
                                     <div className="flex items-center gap-4">
                                       <button onClick={() => setDesign({...design, maxStamps: Math.max(5, design.maxStamps-1)})} className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-navy">-</button>
                                       <span className="text-xl font-bold w-8 text-center text-navy">{design.maxStamps}</span>
                                       <button onClick={() => setDesign({...design, maxStamps: Math.min(20, design.maxStamps+1)})} className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-navy">+</button>
                                     </div>
                                  </div>
                                  <div>
                                     <label className="block text-sm font-bold mb-3 text-navy">보상 혜택</label>
                                     <input 
                                        value={design.reward}
                                        onChange={(e) => setDesign({...design, reward: e.target.value})}
                                        className="w-full p-3 border border-slate-200 rounded-lg focus:border-primary focus:outline-none" 
                                      />
                                  </div>
                                </div>
                              )}
                           </div>

                           <div className="flex-1 bg-sand flex flex-col items-center justify-center p-8 relative">
                             <div className="w-[320px] bg-white rounded-[32px] shadow-2xl border-4 border-navy overflow-hidden h-[600px] flex flex-col">
                                <div className={`h-full flex flex-col overflow-y-auto`}>
                                  <div className="p-4 pt-8">
                                     <h2 className="text-lg font-bold mb-4 text-navy">{design.cardName}</h2>
                                     
                                     <div 
                                        className={`rounded-2xl p-5 mb-6 shadow-lg relative overflow-hidden transition-all duration-300
                                          ${design.template === 'basic' 
                                            ? (design.color === 'orange' ? 'bg-primary shadow-orange-200' : `bg-${design.color}-600 shadow-${design.color}-200`) 
                                            : (design.backgroundImage ? 'shadow-md' : 'bg-slate-100 border border-slate-200 shadow-sm') 
                                          }
                                        `}
                                        style={design.template === 'image' && design.backgroundImage ? {
                                          backgroundImage: `url(${design.backgroundImage})`,
                                          backgroundSize: 'cover',
                                          backgroundPosition: 'center'
                                        } : {}}
                                     >
                                        {design.template === 'image' && design.backgroundImage && <div className="absolute inset-0 bg-black/10"></div>}

                                        <div className={`flex justify-between items-start mb-6 relative z-10 ${design.template === 'image' && design.textColor === 'black' ? 'text-navy' : (design.template === 'image' && !design.backgroundImage ? 'text-navy' : 'text-white')}`}>
                                          <span className={`font-bold opacity-90 ${design.template === 'image' && design.backgroundImage ? 'drop-shadow-md' : ''}`}>Store</span>
                                          <span className={`text-xs px-2 py-1 rounded backdrop-blur-sm shadow-sm ${design.template === 'image' && !design.backgroundImage ? 'bg-slate-200 text-steel' : 'bg-white/20'}`}>D-30</span>
                                        </div>
                                        <div className={`flex justify-between items-end relative z-10 ${design.template === 'image' && design.textColor === 'black' ? 'text-navy' : (design.template === 'image' && !design.backgroundImage ? 'text-navy' : 'text-white')}`}>
                                          <div>
                                             <p className={`text-xs opacity-70 mb-1 ${design.template === 'image' && design.backgroundImage ? 'drop-shadow-sm' : ''}`}>진행률</p>
                                             <p className={`text-2xl font-bold ${design.template === 'image' && design.backgroundImage ? 'drop-shadow-md' : ''}`}>3 / {design.maxStamps}</p>
                                          </div>
                                        </div>
                                     </div>

                                     <h3 className="text-sm font-bold text-steel mb-2">스탬프 보드</h3>
                                     <div 
                                        className={`grid grid-cols-5 gap-2 p-3 rounded-xl relative overflow-hidden transition-all
                                          ${design.template === 'basic' ? 'bg-sand' : 'bg-slate-50'} 
                                        `}
                                     >
                                        {Array.from({length: design.maxStamps}).map((_, i) => (
                                           <div 
                                             key={i} 
                                             className={`aspect-square rounded-full flex items-center justify-center text-[10px] font-bold overflow-hidden relative z-10
                                              ${i < 3 
                                                 ? (design.template === 'basic' 
                                                      ? (design.color === 'orange' ? 'bg-primary text-white' : `bg-${design.color}-600 text-white`)
                                                      : (design.textColor === 'black' ? 'bg-navy text-white' : 'bg-white border border-slate-200 text-navy shadow-sm')
                                                   )
                                                 : 'bg-white border border-slate-200 text-slate-300'
                                              }`}
                                           >
                                              {i < 3 ? (
                                                design.template === 'image' && design.stampImage ? (
                                                  <img src={design.stampImage} alt="stamp" className="w-full h-full object-cover" />
                                                ) : (
                                                  <Check size={10} className={design.template === 'image' && i < 3 ? (design.textColor === 'black' ? 'text-white' : 'text-navy') : 'text-white'} />
                                                )
                                              ) : i+1}
                                           </div>
                                        ))}
                                     </div>
                                  </div>
                                </div>
                             </div>
                           </div>
                        </div>

                        <div className="p-4 bg-white border-t border-slate-200 flex justify-between">
                           <button 
                             onClick={() => setStep(Math.max(1, step-1))}
                             disabled={step === 1}
                             className="px-6 py-3 rounded-lg font-bold text-steel hover:bg-sand disabled:opacity-30"
                           >
                             이전
                           </button>
                           {step < 3 ? (
                              <button 
                                onClick={() => setStep(step+1)}
                                className="px-6 py-3 bg-navy text-white rounded-lg font-bold hover:bg-slate-800"
                              >
                                다음 단계
                              </button>
                           ) : (
                              <button 
                                onClick={() => { alert("스탬프 카드가 생성되었습니다!"); setCardViewMode('list'); }}
                                className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-orange-600"
                              >
                                게시하기
                              </button>
                           )}
                        </div>
                      </div>
                    )}

                    {storeDetailTab === 'history' && (
                      <div className="p-8 h-full flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-xl font-bold text-navy">적립/사용 내역</h3>
                          <div className="flex bg-white border border-slate-200 rounded-lg p-1">
                            {['all', 'stamp', 'reward'].map((filter) => (
                              <button
                                key={filter}
                                onClick={() => setHistoryFilter(filter)}
                                className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${historyFilter === filter ? 'bg-navy text-white' : 'text-steel hover:bg-slate-50'}`}
                              >
                                {filter === 'all' ? '전체' : (filter === 'stamp' ? '스탬프 적립' : '리워드 사용')}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex-1 flex flex-col">
                          <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-200">
                              <tr>
                                <th className="p-4 pl-6 text-xs font-bold text-steel">일시</th>
                                <th className="p-4 text-xs font-bold text-steel">닉네임</th>
                                <th className="p-4 text-xs font-bold text-steel">연락처</th>
                                <th className="p-4 text-xs font-bold text-steel">구분</th>
                                <th className="p-4 text-xs font-bold text-steel text-right pr-6">내용</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {getFilteredHistory().map((req) => (
                                <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                                  <td className="p-4 pl-6 text-sm text-steel font-mono">{formatTime(req.time)}</td>
                                  <td className="p-4 text-sm font-bold text-navy">{req.user}</td>
                                  <td className="p-4 text-sm text-steel font-mono">{req.phone.replace(/(\d{3})-\d{4}-(\d{4})/, '$1-****-$2')}</td>
                                  <td className="p-4">
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${req.type === 'stamp' ? 'bg-[var(--color-kkookk-orange-100)] text-primary' : 'bg-purple-100 text-purple-700'}`}>
                                      {req.type === 'stamp' ? '적립' : '사용'}
                                    </span>
                                  </td>
                                  <td className="p-4 text-sm text-right pr-6 font-bold text-navy">
                                    {req.type === 'stamp' ? `+${req.count}` : '쿠폰 사용'}
                                  </td>
                                </tr>
                              ))}
                              {getFilteredHistory().length === 0 && (
                                <tr>
                                  <td colSpan="5" className="p-12 text-center text-steel">해당하는 내역이 없습니다.</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                    
                    {storeDetailTab === 'migrations' && <MigrationManager />}
                  </div>
                </div>
              )}
            </>
          )}

        </main>
      </div>

      {showQRModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm transition-opacity" onClick={() => setShowQRModal(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-navy">QR 포스터 미리보기</h3>
              <button onClick={() => setShowQRModal(false)} className="p-2 -mr-2 text-steel hover:text-navy rounded-full hover:bg-slate-100">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 bg-slate-50 flex justify-center">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center w-full aspect-[3/4] flex flex-col items-center justify-center">
                <h4 className="font-bold text-xl text-navy mb-1">{qrStoreName}</h4>
                <p className="text-xs text-primary font-bold mb-6">스탬프 적립 & 리워드 사용</p>
                
                <div className="bg-navy p-4 rounded-xl mb-6">
                  <QrCode size={120} className="text-white" />
                </div>
                
                <div className="flex items-center gap-2 text-navy font-bold text-sm bg-slate-100 px-4 py-2 rounded-full">
                  <Smartphone size={16} />
                  <span>카메라로 스캔하세요</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border-t border-slate-100">
              <p className="text-center text-sm text-steel mb-4 flex items-center justify-center gap-2">
                <Check size={14} className="text-green-500" /> 프린트 후 매장에 배치해주세요
              </p>
              <button 
                onClick={() => { alert('이미지가 저장되었습니다.'); setShowQRModal(false); }}
                className="w-full py-4 bg-navy text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-navy/20"
              >
                <Download size={20} /> 이미지로 저장하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* =========================================
   MAIN APP EXPORT
   ========================================= */
export default function App() {
  const [viewMode, setViewMode] = useState('launcher'); // launcher, customer, store, admin
  
  // Shared State for Interaction
  const [requests, setRequests] = useState(MOCK_REQUESTS);
  const [stampCard, setStampCard] = useState(INITIAL_STAMP_CARD);
  const [storeStatus, setStoreStatus] = useState('OPEN'); // OPEN, CLOSED
  
  // Functions to modify shared state
  const addRequest = (req) => setRequests(prev => [req, ...prev]);
  const updateRequestStatus = (id, status) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    // If approved, update stamp count simulation
    if (status === 'approved') {
      setStampCard(prev => ({ ...prev, current: Math.min(prev.current + 1, prev.max) }));
    }
  };

  const renderView = () => {
    switch(viewMode) {
      case 'customer':
        return (
          <CustomerApp 
            requests={requests} 
            addRequest={addRequest} 
            updateRequestStatus={updateRequestStatus} // 시뮬레이션을 위해 전달
            stampCard={stampCard} 
            goBack={() => setViewMode('launcher')} 
          />
        );
      case 'store':
        return <StoreApp requests={requests} updateRequestStatus={updateRequestStatus} storeStatus={storeStatus} setStoreStatus={setStoreStatus} goBack={() => setViewMode('launcher')} />;
      case 'admin':
        return <AdminApp goBack={() => setViewMode('launcher')} />;
      default:
        return (
          <div className="min-h-screen bg-sand flex flex-col items-center justify-center p-6">
            <h1 className="text-3xl font-bold text-navy mb-2">통합 로열티 시스템</h1>
            <p className="text-steel mb-10 text-center">각 디바이스 환경을 선택하여 시뮬레이션을 시작하세요.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
              <LauncherCard 
                icon={<Smartphone size={40} />} 
                title="고객용 PWA" 
                desc="스탬프 적립, 리워드 확인, 적립 요청" 
                onClick={() => setViewMode('customer')} 
                color="bg-primary"
              />
              <LauncherCard 
                icon={<Tablet size={40} />} 
                title="매장용 태블릿" 
                desc="적립/사용 요청 실시간 승인, 영업 관리" 
                onClick={() => setViewMode('store')} 
                color="bg-navy"
              />
              <LauncherCard 
                icon={<Monitor size={40} />} 
                title="사장님 백오피스" 
                desc="스탬프 카드 설계, 스토어 관리" 
                onClick={() => setViewMode('admin')} 
                color="bg-steel"
              />
            </div>
            <p className="mt-12 text-sm text-steel">Tip: 고객 앱에서 적립 요청 후 매장 태블릿에서 승인해보세요.</p>
          </div>
        );
    }
  };

  return (
    <div className="antialiased text-navy">
      <GlobalStyles />
      {renderView()}
    </div>
  );
}