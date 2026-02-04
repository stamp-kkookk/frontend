/**
 * LandingHeader
 * 랜딩 페이지 헤더 - 로고 + 문의하기 CTA
 */

import { Link } from "react-router-dom";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-black/5">
      <div className="flex items-center justify-between h-16 px-6 mx-auto max-w-7xl">
        {/* Logo */}
        <Link to={"/"} className="flex items-center">
          <img
            src="/logo/logo_text_customer.png"
            alt="kkookk logo"
            className="object-contain w-auto h-30"
          />
        </Link>

        {/* CTA */}
        <button className="h-10 px-6 font-semibold text-white transition-colors rounded-2xl bg-kkookk-indigo hover:bg-kkookk-indigo/90">
          문의하기
        </button>
      </div>
    </header>
  );
}
