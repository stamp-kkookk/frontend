/**
 * RequestStampButton 컴포넌트
 * 스탬프 요청 플로우를 시작하는 버튼
 */

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { QrCode, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useWalletStampCards } from '@/features/wallet/hooks/useWallet';
import { useCreateIssuanceRequest, useIssuanceRequestStatus } from '@/features/issuance/hooks/useIssuance';
import { RequestingView } from './RequestingView';
import { RequestResultView } from './RequestResultView';

type RequestState = 'idle' | 'pending' | 'approved' | 'rejected' | 'expired';

export function RequestStampButton() {
  const navigate = useNavigate();
  const { cardId } = useParams<{ cardId: string }>();
  const [requestState, setRequestState] = useState<RequestState>('idle');
  const [requestId, setRequestId] = useState<number | null>(null);

  // Get wallet stamp cards to find current card info
  const { data: walletData } = useWalletStampCards();
  const card = walletData?.find((c) => String(c.id) === cardId);

  // Create issuance request mutation
  const createIssuance = useCreateIssuanceRequest();

  // Poll for request status when we have a pending request
  const { data: requestStatus } = useIssuanceRequestStatus(
    requestId ?? undefined,
    requestState === 'pending'
  );

  // Update state based on polling result
  if (requestStatus && requestState === 'pending') {
    if (requestStatus.status === 'APPROVED') {
      setRequestState('approved');
    } else if (requestStatus.status === 'REJECTED') {
      setRequestState('rejected');
    } else if (requestStatus.status === 'EXPIRED') {
      setRequestState('expired');
    }
  }

  const handleRequest = () => {
    if (!card) return;

    createIssuance.mutate(
      { walletId: card.id },
      {
        onSuccess: (data) => {
          setRequestId(data.id);
          setRequestState('pending');
        },
        onError: (error) => {
          alert(`적립 요청 실패: ${error.message}`);
        },
      }
    );
  };

  const handleBack = () => {
    navigate(`/customer/wallet/${cardId}`);
  };

  // Pending state - show waiting screen
  if (requestState === 'pending') {
    return (
      <RequestingView
        requestId={String(requestId)}
        remainingSeconds={requestStatus?.remainingSeconds ?? 120}
        showDevControls={false}
      />
    );
  }

  // Approved state
  if (requestState === 'approved') {
    return (
      <RequestResultView
        success={true}
        onConfirm={handleBack}
      />
    );
  }

  // Rejected or Expired state
  if (requestState === 'rejected' || requestState === 'expired') {
    return (
      <RequestResultView
        success={false}
        message={requestState === 'expired' ? '요청 시간이 만료되었습니다.' : '매장에서 요청을 거절했습니다.'}
        onConfirm={handleBack}
      />
    );
  }

  // Idle state - show request button
  return (
    <div className="h-full flex flex-col p-6 justify-center text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-kkookk-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 text-kkookk-orange-500">
          <QrCode size={32} />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-kkookk-navy">
          적립 요청을 보낼까요?
        </h2>
        {card ? (
          <p className="text-kkookk-steel">
            현재 {card.currentStampCount}개 → 적립 후 {card.currentStampCount + 1}개
          </p>
        ) : (
          <p className="text-kkookk-steel">카드 정보를 불러오는 중...</p>
        )}
      </div>

      <div className="space-y-3 w-full">
        <Button
          onClick={handleRequest}
          variant="primary"
          size="full"
          className="shadow-lg"
          disabled={!card || createIssuance.isPending}
        >
          {createIssuance.isPending ? (
            <span className="flex items-center gap-2 justify-center">
              <Loader2 className="w-4 h-4 animate-spin" />
              요청 중...
            </span>
          ) : (
            '요청 보내기'
          )}
        </Button>
        <Button onClick={handleBack} variant="subtle" size="full">
          취소
        </Button>
      </div>
    </div>
  );
}

export default RequestStampButton;
