/**
 * StoreDetailPage 컴포넌트
 * 매장 상세 페이지 (탭: 카드 / 히스토리 / 전환신청)
 */

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ChevronLeft,
  MapPin,
  Plus,
  Edit,
  BarChart3,
  Trash2,
  Coffee,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '@/features/store-management/hooks/useStore';
import { useStampCards, useDeleteStampCard } from '@/features/store-management/hooks/useStampCard';
import { useStoreMigrations } from '@/features/migration/hooks/useOwnerMigration';
import type { StampCardStatus } from '@/types/api';

type TabType = 'cards' | 'history' | 'migrations';

export function StoreDetailPage() {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const [storeDetailTab, setStoreDetailTab] = useState<TabType>('cards');

  const storeIdNum = Number(storeId);

  // API Hooks
  const { data: store, isLoading: storeLoading, error: storeError } = useStore(storeIdNum);
  const { data: stampCardsData, isLoading: cardsLoading } = useStampCards({ storeId: storeIdNum });
  const { data: migrations } = useStoreMigrations(storeIdNum);
  const deleteStampCard = useDeleteStampCard();

  const pendingMigrations = migrations?.filter((m) => m.status === 'SUBMITTED') ?? [];

  // Loading state
  if (storeLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-kkookk-indigo" />
        <p className="mt-4 text-kkookk-steel">매장 정보를 불러오는 중...</p>
      </div>
    );
  }

  // Error or not found state
  if (storeError || !store) {
    return (
      <div className="p-8 text-center">
        <AlertCircle className="w-12 h-12 mx-auto text-red-500" />
        <p className="mt-4 text-kkookk-steel">매장을 찾을 수 없습니다.</p>
        <button
          onClick={() => navigate('/owner/stores')}
          className="mt-4 px-4 py-2 border border-slate-200 rounded-lg text-kkookk-navy font-bold hover:bg-slate-50"
        >
          매장 목록으로
        </button>
      </div>
    );
  }

  const stampCards = stampCardsData?.content ?? [];
  const activeCard = stampCards.find((c) => c.status === 'ACTIVE');
  const archivedCards = stampCards.filter((c) => c.status !== 'ACTIVE');

  const handleTabClick = (tab: TabType) => {
    if (tab === 'history') {
      navigate(`/owner/stores/${storeId}/history`);
    } else if (tab === 'migrations') {
      navigate(`/owner/stores/${storeId}/migrations`);
    } else {
      setStoreDetailTab(tab);
    }
  };

  const getStatusBadge = (status: StampCardStatus) => {
    switch (status) {
      case 'DRAFT':
        return (
          <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-500">
            작성 중
          </span>
        );
      case 'PAUSED':
        return (
          <span className="text-xs font-bold px-2 py-1 rounded bg-yellow-100 text-yellow-700">
            일시정지
          </span>
        );
      case 'ARCHIVED':
        return (
          <span className="text-xs font-bold px-2 py-1 rounded bg-red-100 text-red-500">
            보관됨
          </span>
        );
      case 'ACTIVE':
        return (
          <span className="text-xs font-bold px-2 py-1 rounded bg-green-100 text-green-700">
            게시 중
          </span>
        );
      default:
        return null;
    }
  };

  const handleDeleteCard = (stampCardId: number) => {
    if (confirm('정말로 이 스탬프 카드를 삭제하시겠습니까?')) {
      deleteStampCard.mutate({ storeId: storeIdNum, stampCardId });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <div className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate('/owner/stores')}
            className="p-2 -ml-2 text-kkookk-steel hover:text-kkookk-navy hover:bg-slate-50 rounded-full transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-kkookk-navy">{store.name}</h2>
            <p className="text-kkookk-steel text-sm flex items-center gap-1">
              <MapPin size={12} /> {store.address || '주소 미등록'}
            </p>
          </div>
        </div>

        {/* 탭 */}
        <div className="flex gap-1">
          <button
            onClick={() => handleTabClick('cards')}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
              storeDetailTab === 'cards'
                ? 'bg-kkookk-navy text-white'
                : 'text-kkookk-steel hover:bg-slate-50'
            }`}
          >
            스탬프 카드 관리
          </button>
          <button
            onClick={() => handleTabClick('history')}
            className="px-4 py-2 rounded-lg font-bold text-sm transition-colors text-kkookk-steel hover:bg-slate-50"
          >
            적립/사용 내역
          </button>
          <button
            onClick={() => handleTabClick('migrations')}
            className="px-4 py-2 rounded-lg font-bold text-sm transition-colors text-kkookk-steel hover:bg-slate-50"
          >
            전환 신청 관리
            {pendingMigrations.length > 0 && (
              <span className="ml-1.5 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                N
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 카드 관리 탭 컨텐츠 */}
      <div className="flex-1 overflow-y-auto">
        {storeDetailTab === 'cards' && (
          <div className="p-8 max-w-6xl mx-auto w-full">
            {/* 헤더 */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-kkookk-navy">
                  보유 스탬프 카드
                </h3>
                <p className="text-kkookk-steel text-sm mt-1">
                  고객에게 발급할 적립 카드를 관리합니다.
                </p>
              </div>
              <button
                onClick={() => navigate(`/owner/stores/${storeId}/stamp-cards/new`)}
                className="px-6 py-3 bg-kkookk-navy text-white rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors"
              >
                <Plus size={20} /> 새 스탬프 카드 만들기
              </button>
            </div>

            {/* 현재 진행 중 (Active) */}
            <div className="mb-10">
              <h4 className="font-bold text-kkookk-navy mb-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                현재 진행 중 (Active)
              </h4>
              {cardsLoading ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-kkookk-indigo" />
                </div>
              ) : activeCard ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-6 flex gap-8 items-center shadow-sm hover:shadow-md transition-shadow">
                  {/* 카드 미리보기 */}
                  <div className="w-80 h-48 bg-gradient-to-br from-kkookk-indigo to-blue-700 rounded-xl shadow-lg relative flex flex-col p-6 text-white overflow-hidden shrink-0">
                    <div className="flex justify-between items-start mb-4">
                      <span className="font-bold text-lg opacity-90">
                        {store.name}
                      </span>
                      <span className="text-xs bg-white/20 px-2 py-1 rounded">
                        {activeCard.expireDays ? `D-${activeCard.expireDays}` : '무기한'}
                      </span>
                    </div>
                    <div className="mt-auto flex justify-between items-end">
                      <div>
                        <p className="text-xs opacity-80 mb-1">목표</p>
                        <p className="text-2xl font-bold">0 / {activeCard.goalStampCount}</p>
                      </div>
                      <Coffee className="text-white/20 w-16 h-16 absolute -right-4 -bottom-4" />
                    </div>
                  </div>

                  {/* 카드 정보 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-bold text-kkookk-navy">
                        {activeCard.title}
                      </h4>
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                        게시 중
                      </span>
                    </div>
                    <p className="text-kkookk-steel text-sm mb-6">
                      {activeCard.goalStampCount}개 적립 시 {activeCard.rewardName || '리워드 제공'}
                    </p>
                    <div className="flex gap-8 text-sm">
                      <div>
                        <p className="text-kkookk-steel mb-1">목표 스탬프</p>
                        <p className="font-bold text-kkookk-navy text-lg">{activeCard.goalStampCount}개</p>
                      </div>
                      <div>
                        <p className="text-kkookk-steel mb-1">리워드 수량</p>
                        <p className="font-bold text-kkookk-navy text-lg">{activeCard.rewardQuantity ?? 1}개</p>
                      </div>
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="flex flex-col gap-2">
                    <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-kkookk-navy hover:bg-slate-50 flex items-center gap-2">
                      <Edit size={16} /> 수정
                    </button>
                    <button
                      onClick={() =>
                        navigate(`/owner/stores/${storeId}/stamp-cards/${activeCard.id}/stats`)
                      }
                      className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-bold text-kkookk-navy hover:bg-slate-50 flex items-center gap-2"
                    >
                      <BarChart3 size={16} /> 통계
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                  <p className="text-kkookk-steel">활성화된 스탬프 카드가 없습니다.</p>
                  <button
                    onClick={() => navigate(`/owner/stores/${storeId}/stamp-cards/new`)}
                    className="mt-4 px-4 py-2 bg-kkookk-navy text-white rounded-lg font-bold hover:bg-slate-800"
                  >
                    새 스탬프 카드 만들기
                  </button>
                </div>
              )}
            </div>

            {/* 보관함 / 초안 */}
            <div>
              <h4 className="font-bold text-kkookk-steel mb-4">보관함 / 초안</h4>
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="p-4 text-xs font-bold text-kkookk-steel pl-6">
                        상태
                      </th>
                      <th className="p-4 text-xs font-bold text-kkookk-steel">
                        카드명
                      </th>
                      <th className="p-4 text-xs font-bold text-kkookk-steel">
                        혜택
                      </th>
                      <th className="p-4 text-xs font-bold text-kkookk-steel">
                        생성일
                      </th>
                      <th className="p-4 text-xs font-bold text-kkookk-steel text-right pr-6">
                        관리
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {archivedCards.map((card) => (
                      <tr
                        key={card.id}
                        className="hover:bg-slate-50 transition-colors group"
                      >
                        <td className="p-4 pl-6">{getStatusBadge(card.status)}</td>
                        <td className="p-4 text-sm font-bold text-kkookk-navy">
                          {card.title}
                        </td>
                        <td className="p-4 text-sm text-kkookk-steel">
                          {card.goalStampCount}개 적립 시 {card.rewardName || '리워드'}
                        </td>
                        <td className="p-4 text-sm text-kkookk-steel font-mono">
                          {new Date(card.createdAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 text-right pr-6">
                          <div className="flex justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-kkookk-steel hover:text-kkookk-navy hover:bg-slate-200 rounded-lg">
                              <Edit size={16} />
                            </button>
                            {card.status === 'DRAFT' && (
                              <button
                                onClick={() => handleDeleteCard(card.id)}
                                className="p-2 text-kkookk-steel hover:text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {archivedCards.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="p-12 text-center text-kkookk-steel"
                        >
                          보관함에 카드가 없습니다.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoreDetailPage;
