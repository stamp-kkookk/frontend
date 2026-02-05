/**
 * TerminalLayout
 * 터미널(태블릿) 라우트용 레이아웃 래퍼
 * 사이드바와 상태 관리를 포함
 */

import { useCallback, useState } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { TerminalSidebar } from "@/features/terminal/components/TerminalSidebar";
import { MOCK_REQUESTS } from "@/lib/constants/mockData";
import type { StoreStatus, IssuanceRequest } from "@/types/domain";

export function TerminalLayout() {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();
  const [storeStatus, setStoreStatus] = useState<StoreStatus>("OPEN");
  const [requests, setRequests] = useState<IssuanceRequest[]>(MOCK_REQUESTS);

  // pendingCount 계산
  const pendingCount = requests.filter((r) => r.status === "pending").length;

  // TODO: storeId로 매장 정보 조회
  const storeName = storeId === "store-1" ? "카페 루나" : `매장 ${storeId}`;

  const handleLogout = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const approve = useCallback((id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "approved" as const } : r))
    );
  }, []);

  const reject = useCallback((id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "rejected" as const } : r))
    );
  }, []);

  const toggleStoreStatus = useCallback(() => {
    setStoreStatus((prev) => (prev === "OPEN" ? "CLOSED" : "OPEN"));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen p-8 min-w-screen bg-kkookk-navy">
      <div className="w-5xl min-h-[80vh] max-h-[90vh] bg-kkookk-sand rounded-4xl overflow-hidden shadow-2xl flex border-2 border-kkookk-steel relative">
        <TerminalSidebar
          storeName={storeName}
          storeStatus={storeStatus}
          pendingCount={pendingCount}
          onLogout={handleLogout}
        />
        <div className="flex flex-col flex-1 bg-kkookk-sand">
          <Outlet context={{ requests, approve, reject, storeStatus, toggleStoreStatus }} />
        </div>
      </div>
    </div>
  );
}

export default TerminalLayout;
