/**
 * CarouselLayer
 * 단일 캐러셀 레이어 (드래그 가능)
 */

import { useEffect, useRef, useState } from "react";
import { BeforeAfterCard, type BeforeAfterCardProps } from "./BeforeAfterCard";

export interface CarouselLayerProps {
  cards: Array<BeforeAfterCardProps>;
  direction: "left" | "right";
}

export function CarouselLayer({ cards, direction }: CarouselLayerProps) {
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 페이드인 애니메이션
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // 자동 스크롤 + 무한 루프
  useEffect(() => {
    if (isDragging) return;

    const cardWidth = 380 + 16; // card width + gap
    const totalWidth = cardWidth * cards.length;

    const interval = setInterval(() => {
      setOffset((prev) => {
        const speed = 0.5;
        let newOffset = direction === "right" ? prev + speed : prev - speed;

        // 무한 루프: offset이 한 세트를 넘어가면 리셋
        if (direction === "right" && newOffset > totalWidth) {
          newOffset = newOffset - totalWidth;
        } else if (direction === "left" && newOffset < -totalWidth) {
          newOffset = newOffset + totalWidth;
        }

        return newOffset;
      });
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [direction, isDragging, cards.length]);

  // 드래그 시작
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(offset);
  };

  // 드래그 중
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // 드래그 방향대로 스크롤: 오른쪽 드래그 → 오른쪽 컨텐츠 보기
    setOffset(scrollLeft + walk);
  };

  // 드래그 종료
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // 키보드 지원
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setOffset((prev) => prev - 50);
    } else if (e.key === "ArrowRight") {
      setOffset((prev) => prev + 50);
    }
  };

  // 무한 스크롤을 위한 카드 복제
  const infiniteCards = [...cards, ...cards, ...cards];

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-grab active:cursor-grabbing transition-opacity duration-700 ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionDelay: "400ms" }}
      role="region"
      aria-label="스탬프 카드 캐러셀"
      tabIndex={0}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <div
        className="flex gap-2 py-4 "
        style={{
          transform: `translateX(${-offset}px)`,
          transition: isDragging ? "none" : "transform 0.1s linear",
        }}
      >
        {infiniteCards.map((card, index) => (
          <div key={index} className="shrink-0">
            <BeforeAfterCard
              backgroundImage={card.backgroundImage}
              storeName={card.storeName}
              stampCount={card.stampCount}
              expiryDays={card.expiryDays}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
