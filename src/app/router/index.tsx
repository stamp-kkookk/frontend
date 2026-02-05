/**
 * 라우터 설정
 * 모든 앱 라우트를 위한 React Router 설정
 */

import { CustomerLayout } from "@/app/layouts/CustomerLayout";
import { OwnerLayout } from "@/app/layouts/OwnerLayout";
import { TerminalLayout } from "@/app/layouts/TerminalLayout";
import { LandingPage } from "@/pages/LandingPage";
import { LauncherPage } from "@/pages/LauncherPage";
import { createBrowserRouter, Navigate } from "react-router-dom";

// 고객 페이지
import { CustomerHistoryPage } from "@/pages/customer/CustomerHistoryPage";
import { CustomerLandingPage } from "@/pages/customer/CustomerLandingPage";
import { CustomerSettingsPage } from "@/pages/customer/CustomerSettingsPage";

// 고객 기능 컴포넌트 (페이지로 래핑될 예정)
import { CustomerLoginForm, CustomerSignupForm } from "@/features/auth";
import { RequestStampButton } from "@/features/issuance";
import { MigrationForm, MigrationList } from "@/features/migration";
import { RedeemScreen, RewardList } from "@/features/redemption";
import { CardDetailView, WalletPage } from "@/features/wallet";

// 사장님 페이지
import { OwnerLoginPage } from "@/features/auth/pages/OwnerLoginPage";
import {
  StampCardCreatePage,
  StampCardStatsPage,
  StoreCreatePage,
  StoreDetailPage,
  StoreHistoryPage,
  StoreListPage,
  StoreMigrationsPage,
} from "@/pages/owner";

// 터미널 페이지
import { TerminalDashboardPage } from "@/features/terminal/pages/TerminalDashboardPage";

export const router = createBrowserRouter([
  // 랜딩 페이지
  {
    path: "/",
    element: <LandingPage />,
  },

  // 시연용 페이지
  {
    path: "/simulation",
    element: <LauncherPage />,
  },

  // 고객 라우트
  {
    path: "/customer",
    element: <CustomerLayout />,
    children: [
      { index: true, element: <CustomerLandingPage /> },
      { path: "login", element: <CustomerLoginForm /> },
      { path: "signup", element: <CustomerSignupForm /> },
      { path: "wallet", element: <WalletPage /> },
      { path: "wallet/:cardId", element: <CardDetailView /> },
      { path: "wallet/:cardId/stamp", element: <RequestStampButton /> },
      { path: "history", element: <CustomerHistoryPage /> },
      { path: "redeems", element: <RewardList /> },
      { path: "redeems/:redeemId/use", element: <RedeemScreen /> },
      { path: "migrations", element: <MigrationList /> },
      { path: "migrations/new", element: <MigrationForm /> },
      { path: "settings", element: <CustomerSettingsPage /> },
    ],
  },

  // 사장님 라우트
  {
    path: "/owner",
    element: <OwnerLayout />,
    children: [
      { index: true, element: <Navigate to="stores" replace /> },
      { path: "login", element: <OwnerLoginPage /> },
      { path: "stores", element: <StoreListPage /> },
      { path: "stores/new", element: <StoreCreatePage /> },
      { path: "stores/:storeId", element: <StoreDetailPage /> },
      { path: "stores/:storeId/history", element: <StoreHistoryPage /> },
      { path: "stores/:storeId/migrations", element: <StoreMigrationsPage /> },
      {
        path: "stores/:storeId/stamp-cards/new",
        element: <StampCardCreatePage />,
      },
      {
        path: "stores/:storeId/stamp-cards/:cardId/stats",
        element: <StampCardStatsPage />,
      },
    ],
  },

  // 터미널 라우트
  {
    path: "/terminal",
    element: <TerminalLayout />,
    children: [{ path: ":storeId", element: <TerminalDashboardPage /> }],
  },
]);

export default router;
