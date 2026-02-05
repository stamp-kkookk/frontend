/**
 * StoreDetailPage 컴포넌트
 * 매장 상세 페이지 (탭: 카드 / 히스토리 / 전환신청)
 */

import {
  useDeleteStampCard,
  useStampCards,
} from "@/features/store-management/hooks/useStampCard";
import { useStore } from "@/features/store-management/hooks/useStore";
import type { StampCardStatus } from "@/types/api";
import {
  AlertCircle,
  BarChart3,
  ChevronLeft,
  Coffee,
  Edit,
  Loader2,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

type TabType = "cards" | "history" | "migrations";

export function StoreDetailPage() {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const [storeDetailTab, setStoreDetailTab] = useState<TabType>("cards");

  const storeIdNum = Number(storeId);

  // API Hooks
  const {
    data: store,
    isLoading: storeLoading,
    error: storeError,
  } = useStore(storeIdNum);
  const { data: stampCardsData, isLoading: cardsLoading } = useStampCards({
    storeId: storeIdNum,
  });
  const deleteStampCard = useDeleteStampCard();

  // Loading state
  if (storeLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[calc(100vh-64px)]">
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
          onClick={() => navigate("/owner/stores")}
          className="px-4 py-2 mt-4 font-bold border rounded-lg border-slate-200 text-kkookk-navy hover:bg-slate-50"
        >
          매장 목록으로
        </button>
      </div>
    );
  }

  const stampCards = stampCardsData?.content ?? [];
  const activeCard = stampCards.find((c) => c.status === "ACTIVE");
  const archivedCards = stampCards.filter((c) => c.status !== "ACTIVE");

  const handleTabClick = (tab: TabType) => {
    if (tab === "history") {
      navigate(`/owner/stores/${storeId}/history`);
    } else if (tab === "migrations") {
      navigate(`/owner/stores/${storeId}/migrations`);
    } else {
      setStoreDetailTab(tab);
    }
  };

  const getStatusBadge = (status: StampCardStatus) => {
    switch (status) {
      case "DRAFT":
        return (
          <span className="px-2 py-1 text-xs font-bold rounded bg-slate-100 text-slate-500">
            작성 중
          </span>
        );
      case "PAUSED":
        return (
          <span className="px-2 py-1 text-xs font-bold text-yellow-700 bg-yellow-100 rounded">
            일시정지
          </span>
        );
      case "ARCHIVED":
        return (
          <span className="px-2 py-1 text-xs font-bold text-red-500 bg-red-100 rounded">
            보관됨
          </span>
        );
      case "ACTIVE":
        return (
          <span className="px-2 py-1 text-xs font-bold text-green-700 bg-green-100 rounded">
            게시 중
          </span>
        );
      default:
        return null;
    }
  };

  const handleDeleteCard = (stampCardId: number) => {
    if (confirm("정말로 이 스탬프 카드를 삭제하시겠습니까?")) {
      deleteStampCard.mutate({ storeId: storeIdNum, stampCardId });
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 헤더 */}
      <div className="px-8 py-6 bg-white border-b border-slate-200">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => navigate("/owner/stores")}
            className="p-2 -ml-2 transition-colors rounded-full text-kkookk-steel hover:text-kkookk-navy hover:bg-slate-50"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-kkookk-navy">
              {store.name}
            </h2>
            <p className="flex items-center gap-1 text-sm text-kkookk-steel">
              <MapPin size={12} /> {store.address || "주소 미등록"}
            </p>
          </div>
        </div>

        {/* 탭 */}
        <div className="flex gap-1">
          <button
            onClick={() => handleTabClick("cards")}
            className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors ${
              storeDetailTab === "cards"
                ? "bg-kkookk-navy text-white"
                : "text-kkookk-steel hover:bg-slate-50"
            }`}
          >
            스탬프 카드 관리
          </button>
          <button
            onClick={() => handleTabClick("history")}
            className="px-4 py-2 text-sm font-bold transition-colors rounded-lg text-kkookk-steel hover:bg-slate-50"
          >
            적립/사용 내역
          </button>
          <button
            onClick={() => handleTabClick("migrations")}
            className="px-4 py-2 text-sm font-bold transition-colors rounded-lg text-kkookk-steel hover:bg-slate-50"
          >
            전환 신청 관리
          </button>
        </div>
      </div>

      {/* 카드 관리 탭 컨텐츠 */}
      <div className="flex-1 overflow-y-auto">
        {storeDetailTab === "cards" && (
          <>
            {cardsLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-8 h-8 animate-spin text-kkookk-indigo" />
              </div>
            ) : (
              <div className="w-full max-w-6xl p-8 mx-auto">
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-kkookk-navy">
                      보유 스탬프 카드
                    </h3>
                    <p className="mt-1 text-sm text-kkookk-steel">
                      고객에게 발급할 적립 카드를 관리합니다.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      navigate(`/owner/stores/${storeId}/stamp-cards/new`)
                    }
                    className="flex items-center gap-2 px-6 py-3 font-bold text-white transition-colors bg-kkookk-navy rounded-xl hover:bg-slate-800"
                  >
                    <Plus size={20} /> 새 스탬프 카드 만들기
                  </button>
                </div>

                {/* 현재 진행 중 (Active) */}
                <div className="mb-10">
                  <h4 className="flex items-center gap-2 mb-4 font-bold text-kkookk-navy">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    현재 진행 중 (Active)
                  </h4>
                  {activeCard ? (
                    <div className="flex items-center gap-8 p-6 transition-shadow bg-white border shadow-sm rounded-2xl border-slate-200 hover:shadow-md">
                      {/* 카드 미리보기 */}
                      <div className="relative flex flex-col h-48 p-6 overflow-hidden text-white shadow-lg w-80 bg-gradient-to-br from-kkookk-indigo to-blue-700 rounded-xl shrink-0">
                        <div className="flex items-start justify-between mb-4">
                          <span className="text-lg font-bold opacity-90">
                            {store.name}
                          </span>
                          <span className="px-2 py-1 text-xs rounded bg-white/20">
                            {activeCard.expireDays
                              ? `D-${activeCard.expireDays}`
                              : "무기한"}
                          </span>
                        </div>
                        <div className="flex items-end justify-between mt-auto">
                          <div>
                            <p className="mb-1 text-xs opacity-80">목표</p>
                            <p className="text-2xl font-bold">
                              0 / {activeCard.goalStampCount}
                            </p>
                          </div>
                          <Coffee className="absolute w-16 h-16 text-white/20 -right-4 -bottom-4" />
                        </div>
                      </div>

                      {/* 카드 정보 */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-xl font-bold text-kkookk-navy">
                            {activeCard.title}
                          </h4>
                          <span className="px-2 py-1 text-xs font-bold text-green-700 bg-green-100 rounded">
                            게시 중
                          </span>
                        </div>
                        <p className="mb-6 text-sm text-kkookk-steel">
                          {activeCard.goalStampCount}개 적립 시{" "}
                          {activeCard.rewardName || "리워드 제공"}
                        </p>
                        <div className="flex gap-8 text-sm">
                          <div>
                            <p className="mb-1 text-kkookk-steel">
                              목표 스탬프
                            </p>
                            <p className="text-lg font-bold text-kkookk-navy">
                              {activeCard.goalStampCount}개
                            </p>
                          </div>
                          <div>
                            <p className="mb-1 text-kkookk-steel">
                              리워드 수량
                            </p>
                            <p className="text-lg font-bold text-kkookk-navy">
                              {activeCard.rewardQuantity ?? 1}개
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* 액션 버튼 */}
                      <div className="flex flex-col gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold border rounded-lg border-slate-200 text-kkookk-navy hover:bg-slate-50">
                          <Edit size={16} /> 수정
                        </button>
                        <button
                          onClick={() =>
                            navigate(
                              `/owner/stores/${storeId}/stamp-cards/${activeCard.id}/stats`,
                            )
                          }
                          className="flex items-center gap-2 px-4 py-2 text-sm font-bold border rounded-lg border-slate-200 text-kkookk-navy hover:bg-slate-50"
                        >
                          <BarChart3 size={16} /> 통계
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 text-center bg-white border rounded-2xl border-slate-200">
                      <p className="text-kkookk-steel">
                        활성화된 스탬프 카드가 없습니다.
                      </p>
                      <button
                        onClick={() =>
                          navigate(`/owner/stores/${storeId}/stamp-cards/new`)
                        }
                        className="px-4 py-2 mt-4 font-bold text-white rounded-lg bg-kkookk-navy hover:bg-slate-800"
                      >
                        새 스탬프 카드 만들기
                      </button>
                    </div>
                  )}
                </div>

                {/* 보관함 / 초안 */}
                <div>
                  <h4 className="mb-4 font-bold text-kkookk-steel">
                    보관함 / 초안
                  </h4>
                  <div className="overflow-hidden bg-white border rounded-2xl border-slate-200">
                    <table className="w-full text-left">
                      <thead className="border-b bg-slate-50 border-slate-200">
                        <tr>
                          <th className="p-4 pl-6 text-xs font-bold text-kkookk-steel">
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
                          <th className="p-4 pr-6 text-xs font-bold text-right text-kkookk-steel">
                            관리
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {archivedCards.map((card) => (
                          <tr
                            key={card.id}
                            className="transition-colors hover:bg-slate-50 group"
                          >
                            <td className="p-4 pl-6">
                              {getStatusBadge(card.status)}
                            </td>
                            <td className="p-4 text-sm font-bold text-kkookk-navy">
                              {card.title}
                            </td>
                            <td className="p-4 text-sm text-kkookk-steel">
                              {card.goalStampCount}개 적립 시{" "}
                              {card.rewardName || "리워드"}
                            </td>
                            <td className="p-4 font-mono text-sm text-kkookk-steel">
                              {new Date(card.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-4 pr-6 text-right">
                              <div className="flex justify-end gap-2 transition-opacity opacity-50 group-hover:opacity-100">
                                <button className="p-2 rounded-lg text-kkookk-steel hover:text-kkookk-navy hover:bg-slate-200">
                                  <Edit size={16} />
                                </button>
                                {card.status === "DRAFT" && (
                                  <button
                                    onClick={() => handleDeleteCard(card.id)}
                                    className="p-2 rounded-lg text-kkookk-steel hover:text-red-600 hover:bg-red-50"
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
          </>
        )}
      </div>
    </div>
  );
}

export default StoreDetailPage;
