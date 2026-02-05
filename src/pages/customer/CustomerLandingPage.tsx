/**
 * CustomerLandingPage 컴포넌트
 * QR 스캔 시 표시되는 고객 앱 랜딩 페이지
 */

import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

interface CustomerLandingPageProps {
  storeName?: string;
}

export function CustomerLandingPage({
  storeName = "카페 루나",
}: CustomerLandingPageProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white">
      <div className="flex flex-col items-center justify-center flex-1 -mt-10">
        <img
          src="/logo/symbol_customer.png"
          alt="KKOOKK Customer"
          className="mb-2 w-26 h-26 "
        />
        <h2 className="mb-3 text-2xl font-bold leading-tight text-kkookk-navy">
          {storeName}에
          <br />
          오신 것을 환영해요!
        </h2>
        <p className="mb-8 text-sm text-kkookk-steel">
          스탬프를 모아 특별한 혜택을 받아보세요.
        </p>
        <div className="bg-kkookk-navy text-white px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-kkookk-navy/20 animate-pulse">
          현재 34명이 적립 중
        </div>
      </div>
      <div className="w-full pb-8 mt-auto">
        <Button
          onClick={() => navigate("/customer/login")}
          variant="primary"
          size="full"
          className="shadow-lg shadow-orange-200"
        >
          내 지갑 열기
        </Button>
        <button
          onClick={() => navigate("/customer/signup")}
          className="mt-4 text-sm underline text-kkookk-steel/60 hover:text-kkookk-steel decoration-kkookk-steel/30 underline-offset-4"
        >
          처음이신가요?
        </button>
      </div>
    </div>
  );
}

export default CustomerLandingPage;
