/**
 * TerminalLoginPage
 * 매장용 태블릿 로그인 페이지
 */

import { OwnerLoginPage } from "@/features/auth/pages/OwnerLoginPage";
import { useNavigate } from "react-router-dom";

export function TerminalLoginPage() {
  const navigate = useNavigate();

  return (
    <OwnerLoginPage
      title="매장용 태블릿"
      subtitle=""
      onLoginSuccess={() => navigate("/terminal/store-1/approval")}
      onBack={() => navigate("/simulation")}
      isTabletMode
    />
  );
}

export default TerminalLoginPage;
