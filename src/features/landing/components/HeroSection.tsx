/**
 * HeroSection
 * 히어로 섹션 - 핵심 메시지 + CTA + 교차 캐러셀
 */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatedHeadline } from "./AnimatedHeadline";
import { CrossCarousel } from "./CrossCarousel";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-20 pb-10 overflow-hidden">
      {/* Headline + CTA - 중앙 배치 */}
      <div className="px-6 mx-auto mb-12 text-center max-w-7xl">
        <AnimatedHeadline />
        <Link
          to={"/simulation"}
          className={`px-8 py-4 text-lg font-bold text-white shadow-lg rounded-2xl bg-kkookk-orange-500 hover:bg-kkookk-orange-600 active:scale-95 shadow-kkookk-orange-500/30 hover:shadow-kkookk-orange-500/40 transition-all duration-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: "350ms" }}
        >
          무료 스탬프 만들기
        </Link>
      </div>

      {/* Carousel - 2개 레이어 교차 */}
      <CrossCarousel />
    </section>
  );
}
