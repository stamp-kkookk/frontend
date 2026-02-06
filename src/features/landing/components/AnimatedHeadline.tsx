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
        className={`font-bold transition-all duration-700
          text-lg sm:text-xl md:text-2xl lg:text-3xl
          bg-linear-to-r from-[#FF6A00] to-[#FF8C00] bg-clip-text text-transparent
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        사장님, 로고는 예쁜데 스탬프 카드는 평범한 기성품인가요?
      </h2>

      {/* Line 2 - 부분 그라디언트 */}
      <h1
        className={`font-semibold transition-all duration-700
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl
          mt-6 sm:mt-8 md:mt-9
          leading-tight
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        <span>단골의 치트키,</span>
        <span className="font-black bg-linear-to-r from-[#FF6A00] to-[#FF9100] bg-clip-text text-transparent">
          꾸욱
        </span>
        입니다.
      </h1>

      {/* Line 3 - 서브 텍스트 */}
      <p
        className={`text-black transition-all duration-700
          text-sm sm:text-base md:text-lg lg:text-xl
          mt-4 sm:mt-6
          leading-relaxed
          ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
        가게의 아이덴티티를 그대로 담은 감각적인 커스텀 디지털 스탬프,
        <br />
        성공적인 브랜딩의 마지막 조각, 꾸욱이 채워드립니다.
      </p>
    </div>
  );
}
