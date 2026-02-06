/**
 * AnimatedHeadline
 * 헤드라인 - 글자별 슬라이드 애니메이션
 */

import { useEffect, useState } from "react";

export function AnimatedHeadline() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mb-8">
      {/* Line 1 - 그라디언트 텍스트 */}
      <h2
        className={`font-bold transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{
          fontSize: "30px",
          fontWeight: 700,
          background: "linear-gradient(135deg, #FF6A00 0%, #FF8C00 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        사장님, 로고는 예쁜데 스탬프 카드는 평범한 기성품인가요?
      </h2>

      {/* Line 2 - 부분 그라디언트 */}
      <h1
        className={`font-semibold transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{
          fontSize: "80px",
          marginTop: "36px",
          lineHeight: 1.1,
        }}
      >
        <span>단골의 치트키,</span>
        <span
          style={{
            fontWeight: 1200,
            background: "linear-gradient(135deg, #FF6A00 0%, #FF9100 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          꾸욱
        </span>
        입니다.
      </h1>

      {/* Line 3 - 서브 텍스트 */}
      <p
        className={`text-black transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{
          fontSize: "18px",
          marginTop: "24px",
          lineHeight: 1.6,
        }}
      >
        가게의 아이덴티티를 그대로 담은 감각적인 커스텀 디지털 스탬프,
        <br />
        성공적인 브랜딩의 마지막 조각, 꾸욱이 채워드립니다.
      </p>
    </div>
  );
}
