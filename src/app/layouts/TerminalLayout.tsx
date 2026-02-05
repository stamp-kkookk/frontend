/**
 * TerminalLayout
 * 터미널(태블릿) 라우트용 레이아웃 래퍼
 * 전체 화면을 차지하고 자식 컴포넌트를 렌더링
 */

import { Outlet } from "react-router-dom";

export function TerminalLayout() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen ">
      <Outlet />
    </div>
  );
}

export default TerminalLayout;
