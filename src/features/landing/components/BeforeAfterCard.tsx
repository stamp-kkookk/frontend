/**
 * BeforeAfterCard
 * 380x360 크기의 Before/After 카드 - 겹침 레이아웃
 */

import { Coffee, Stamp } from "lucide-react";

export interface BeforeAfterCardProps {
  backgroundImage: string;
  storeName: string;
  stampCount: number;
  expiryDays: number;
}

export function BeforeAfterCard({
  backgroundImage,
  storeName,
  stampCount,
  expiryDays,
}: BeforeAfterCardProps) {
  return (
    <div
      className="relative flex p-4 transition-all duration-300 bg-white group rounded-2xl shadow-kkookk-md hover:shadow-kkookk-lg"
      style={{ width: "400px", height: "360px" }}
    >
      {/* Before - 왼쪽 상단 */}
      <div className="absolute transition-all duration-300 w-72 top-4 left-4 group-hover:opacity-50">
        <div className="p-4 w-full aspect-[1.58/1] bg-kkookk-sand rounded-xl shadow-md relative overflow-hidden border-2 border-dashed border-kkookk-steel/30 flex flex-col items-center justify-center">
          <Stamp className="w-12 h-12 mb-2 text-kkookk-steel/20" />
          <div className="text-center">
            <p className="font-semibold text-kkookk-steel/80">
              구겨지고, 잃어버리는
            </p>
            <p className="text-sm text-kkookk-steel/60">종이 스탬프 쿠폰</p>
          </div>
        </div>
      </div>

      {/* After - 오른쪽 하단 (Before와 겹침) */}
      <div className="absolute transition-all duration-300 right-2 bottom-14 w-80 group-hover:scale-110 group-hover:-translate-y-2 group-hover:translate-x-1">
        <div
          className="w-full aspect-[1.58/1] rounded-xl p-3.5 text-white shadow-xl relative overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          {/* 배경 오버레이 (가독성 향상) */}
          <div className="absolute inset-0 bg-black/20 rounded-xl" />

          {/* StampCardItem 스타일 */}
          <div className="relative z-10 flex flex-col justify-between h-full">
            {/* 헤더 */}
            <div className="flex items-start justify-between">
              <span className="text-sm font-bold opacity-90 drop-shadow-md">
                {storeName}
              </span>
              <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] backdrop-blur-sm font-medium">
                D-{expiryDays}
              </span>
            </div>

            {/* 푸터 */}
            <div>
              <p className="text-white/80 text-[8px] font-medium mb-0.5">
                현재 스탬프
              </p>
              <p className="text-xl font-bold leading-none text-white drop-shadow-sm">
                {stampCount}개
              </p>
            </div>
          </div>

          {/* 배경 아이콘 */}
          <Coffee
            className="absolute w-20 h-20 transform -right-1 -bottom-2 text-white/10 rotate-12"
            strokeWidth={1}
          />
        </div>
      </div>
    </div>
  );
}
