/**
 * TerminalDashboardPage
 * 매장 승인 작업을 위한 메인 터미널 대시보드
 */

import { OwnerLoginPage } from "@/features/auth/pages/OwnerLoginPage";
import { MOCK_REQUESTS } from "@/lib/constants/mockData";
import type { IssuanceRequest, StoreStatus } from "@/types/domain";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ApprovalQueue } from "../components/ApprovalQueue";
import { ProcessedHistory } from "../components/ProcessedHistory";
import { StoreStatusToggle } from "../components/StoreStatusToggle";
import { TerminalSidebar } from "../components/TerminalSidebar";
import type { TerminalTab } from "../types";

export function TerminalDashboardPage() {
  const navigate = useNavigate();
  const { storeId } = useParams<{ storeId: string }>();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<TerminalTab>("requests");
  const [requests, setRequests] = useState<IssuanceRequest[]>(MOCK_REQUESTS);
  const [storeStatus, setStoreStatus] = useState<StoreStatus>("OPEN");

  // TODO: storeId로 매장 정보 조회
  const storeName = storeId === "store-1" ? "카페 루나" : `매장 ${storeId}`;

  const handleApprove = useCallback((id: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "approved" as const } : r,
      ),
    );
  }, []);

  const handleReject = useCallback((id: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: "rejected" as const } : r,
      ),
    );
  }, []);

  const handleToggleStatus = useCallback(() => {
    setStoreStatus((prev) => (prev === "OPEN" ? "CLOSED" : "OPEN"));
  }, []);

  const handleLogout = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  if (!isLoggedIn) {
    return (
      <OwnerLoginPage
        title="매장용 태블릿"
        onLoginSuccess={() => setIsLoggedIn(true)}
        onBack={handleLogout}
        isTabletMode
      />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-8 min-w-screen bg-kkookk-navy">
      <div className="w-5xl min-h-[80vh] max-h-[90vh] bg-kkookk-sand rounded-4xl overflow-hidden shadow-2xl flex border-2 border-kkookk-steel relative">
        {/* 사이드바 */}
        <TerminalSidebar
          storeName={storeName}
          storeStatus={storeStatus}
          activeTab={activeTab}
          pendingCount={pendingCount}
          onTabChange={setActiveTab}
          onLogout={handleLogout}
        />

        {/* 메인 콘텐츠 */}
        <div className="flex flex-col flex-1 bg-kkookk-sand">
          {activeTab === "requests" && (
            <ApprovalQueue
              requests={requests}
              onApprove={handleApprove}
              onReject={handleReject}
            />
          )}

          {activeTab === "history" && <ProcessedHistory requests={requests} />}

          {activeTab === "settings" && (
            <StoreStatusToggle
              status={storeStatus}
              onToggle={handleToggleStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default TerminalDashboardPage;
