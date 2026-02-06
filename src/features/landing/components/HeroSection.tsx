/**
 * HeroSection
 * 히어로 섹션 - 핵심 메시지 + CTA + 스탬프 카드 캐러셀
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { StampCardCarousel } from "./StampCardCarousel";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex flex-col justify-center min-h-screen pt-20 pb-10 overflow-hidden snap-start snap-always"
      style={{
        background:
          "radial-gradient(ellipse 120% 80% at 50% 0%, #FFF7ED 0%, #FFFBF7 30%, #FFFFFF 100%)",
      }}
    >
      {/* Headline + CTA - 중앙 배치 */}
      <div className="px-6 mx-auto mb-4 text-center max-w-7xl">
        <AnimatedHeadline />
        <Link
          to={"/simulation"}
          className={`relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white shadow-lg rounded-2xl bg-kkookk-orange-500 hover:bg-kkookk-orange-600 active:scale-95 shadow-kkookk-orange-500/30 hover:shadow-kkookk-orange-500/40 transition-all duration-500 overflow-hidden group ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "350ms" }}
        >
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-out group-hover:-translate-y-full">
            무료 스탬프 만들기
          </span>
          <span className="absolute inset-0 flex items-center justify-center transition-transform duration-200 ease-out translate-y-full group-hover:translate-y-0">
            무료 스탬프 만들기
          </span>
          <span className="invisible">무료 스탬프 만들기</span>
        </Link>
      </div>

      {/* Carousel - 스탬프 카드 미리보기 */}
      <StampCardCarousel />
    </section>
  );
}
