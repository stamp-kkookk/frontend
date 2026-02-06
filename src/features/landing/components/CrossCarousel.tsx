/**
 * CrossCarousel
 * 2개 레이어 교차 캐러셀 (위: 오른쪽, 아래: 왼쪽)
 */

import { CarouselLayer } from "./CarouselLayer";

export function CrossCarousel() {
  // 카드 데이터
  const cardsData = [
    {
      backgroundImage: "/mock/mock-background1.png",
      storeName: "스타벅스 강남점",
      stampCount: 8,
      expiryDays: 12,
    },
    {
      backgroundImage: "/mock/mock-background2.png",
      storeName: "투썸플레이스 역삼",
      stampCount: 5,
      expiryDays: 20,
    },
    {
      backgroundImage: "/mock/mock-background4.png",
      storeName: "베이커리 온리",
      stampCount: 12,
      expiryDays: 25,
    },
    {
      backgroundImage: "/mock/mock-background5.png",
      storeName: "폴바셋 테헤란",
      stampCount: 6,
      expiryDays: 15,
    },
    {
      backgroundImage: "/mock/mock-background6.png",
      storeName: "블루보틀 성수",
      stampCount: 9,
      expiryDays: 10,
    },
    {
      backgroundImage: "/mock/mock-background7.png",
      storeName: "상수 Breing",
      stampCount: 1,
      expiryDays: 13,
    },
    {
      backgroundImage: "/mock/mock-background8.png",
      storeName: "홍대 콤마",
      stampCount: 9,
      expiryDays: 16,
    },
    {
      backgroundImage: "/mock/mock-background9.png",
      storeName: "합정 블루스",
      stampCount: 4,
      expiryDays: 10,
    },
  ];

  return <CarouselLayer cards={cardsData} direction="right" />;
}
