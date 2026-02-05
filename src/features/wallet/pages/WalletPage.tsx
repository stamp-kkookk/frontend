/**
 * WalletPage 컴포넌트
 * 스탬프 카드 캐러셀이 포함된 메인 지갑 뷰
 */

import { useNavigate, useOutletContext } from 'react-router-dom';
import { Loader2, AlertCircle } from 'lucide-react';
import { WalletHeader } from '../components/WalletHeader';
import { StampCardCarousel } from '../components/StampCardCarousel';
import { useWalletStampCards } from '../hooks/useWallet';
import { useAuth } from '@/app/providers/AuthProvider';
import type { StampCard, StampCardTheme } from '@/types/domain';

interface CustomerLayoutContext {
  setIsMenuOpen: (open: boolean) => void;
}

// Design type to theme mapping
const designTypeToTheme: Record<string, StampCardTheme> = {
  COLOR: 'orange',
  IMAGE: 'green',
  PUZZLE: 'yellow',
};

export function WalletPage() {
  const navigate = useNavigate();
  const { setIsMenuOpen } = useOutletContext<CustomerLayoutContext>();
  const { user } = useAuth();

  // API Hook - use user info from auth context
  const { data: walletData, isLoading, error, refetch } = useWalletStampCards(
    user?.phone && user?.name
      ? { phone: user.phone, name: user.name }
      : null
  );

  // Transform API data to StampCard format
  const cards: StampCard[] = (walletData?.stampCards ?? []).map((apiCard) => ({
    id: String(apiCard.walletStampCardId),
    storeName: apiCard.storeName,
    current: apiCard.currentStampCount,
    max: apiCard.goalStampCount,
    reward: apiCard.rewardName || '리워드',
    theme: designTypeToTheme[apiCard.designType] || 'orange',
    status: 'active',
    bgGradient: 'from-[var(--color-kkookk-orange-500)] to-[#E04F00]',
    shadowColor: 'shadow-orange-200',
  }));

  const handleCardSelect = (card: StampCard) => {
    navigate(`/customer/wallet/${card.id}`);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col min-h-screen">
        <WalletHeader onMenuClick={() => setIsMenuOpen(true)} />
        <div className="flex-1 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-kkookk-orange-500" />
          <p className="mt-4 text-kkookk-steel">지갑을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex-1 flex flex-col min-h-screen">
        <WalletHeader onMenuClick={() => setIsMenuOpen(true)} />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <p className="mt-4 text-lg font-medium text-kkookk-navy">지갑을 불러올 수 없습니다</p>
          <p className="mt-1 text-sm text-kkookk-steel">잠시 후 다시 시도해주세요</p>
          <button
            onClick={() => refetch()}
            className="mt-4 px-6 py-2 bg-kkookk-navy text-white rounded-lg font-bold"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (cards.length === 0) {
    return (
      <div className="flex-1 flex flex-col min-h-screen">
        <WalletHeader onMenuClick={() => setIsMenuOpen(true)} />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <p className="text-lg font-medium text-kkookk-navy">아직 스탬프 카드가 없어요</p>
          <p className="mt-1 text-sm text-kkookk-steel">
            매장에서 QR 코드를 스캔하여 첫 스탬프를 받아보세요!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <WalletHeader onMenuClick={() => setIsMenuOpen(true)} />

      <div className="flex-1 flex flex-col justify-center">
        <StampCardCarousel cards={cards} onCardSelect={handleCardSelect} />
      </div>
    </div>
  );
}

export default WalletPage;
