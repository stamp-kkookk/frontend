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

  // 텍스트를 줄과 부분별로 구성
  const line1 = "사장님, 로고는 예쁜데 스탬프 카드는 평범한 기성품인가요?";
  const line2Part1 = "브랜드 완성의 꼭짓점, 꾸욱(kkookk)입니다."; // 오렌지 강조
  const line2Part2 = "으로 시작하세요!";

  let charIndex = 0;

  // 각 글자를 애니메이션 span으로 렌더링
  const renderChar = (char: string, isOrange = false) => {
    const index = charIndex++;
    return (
      <span
        key={index}
        className={`inline-block transition-all duration-300 ${
          mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
        } ${isOrange ? "font-bold text-kkookk-orange-500" : ""}`}
        style={{ transitionDelay: `${index * 20}ms` }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    );
  };

  return (
    <h1
      className="mb-8 text-4xl font-semibold tracking-normal lg:text-5xl text-kkookk-navy"
      style={{ lineHeight: "1.15" }}
    >
      {line1.split("").map((char) => renderChar(char))}
      <br />
      {line2Part1.split("").map((char) => renderChar(char, true))}
      {line2Part2.split("").map((char) => renderChar(char))}
    </h1>
  );
}
