/**
 * StampCardStats 컴포넌트
 * 스탬프 카드 전체 페이지 통계 뷰
 * 원본 mock/ui.old.js 구현 기반
 */

import {
  Calendar,
  Check,
  ChevronLeft,
  Clock,
  Download,
  Gift,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

interface StampCardStatsProps {
  cardName: string;
  onBack: () => void;
}

const WEEKLY_DATA = [
  { day: "월", val: 45, prev: 30 },
  { day: "화", val: 52, prev: 40 },
  { day: "수", val: 38, prev: 45 },
  { day: "목", val: 65, prev: 50 },
  { day: "금", val: 85, prev: 60 },
  { day: "토", val: 95, prev: 80 },
  { day: "일", val: 70, prev: 65 },
];

const TIME_DATA = [
  { time: "점심 (12-14)", pct: 45 },
  { time: "저녁 (18-20)", pct: 30 },
  { time: "오후 (14-17)", pct: 15 },
  { time: "기타", pct: 10 },
];

const STATS_CARDS = [
  {
    title: "누적 적립 수",
    value: "1,240",
    unit: "개",
    icon: <TrendingUp size={20} />,
    change: "+12%",
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "쿠폰 발급 수",
    value: "128",
    unit: "장",
    icon: <Gift size={20} />,
    change: "+5%",
    color: "bg-orange-50 text-orange-600",
  },
  {
    title: "쿠폰 사용 수",
    value: "110",
    unit: "회",
    icon: <Check size={20} />,
    change: "+8%",
    color: "bg-green-50 text-green-600",
  },
  {
    title: "활성 이용자",
    value: "342",
    unit: "명",
    icon: <Users size={20} />,
    change: "+24%",
    color: "bg-purple-50 text-purple-600",
  },
];

export function StampCardStats({ cardName, onBack }: StampCardStatsProps) {
  return (
    <div className="flex flex-col w-full h-full max-w-6xl p-8 mx-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 -ml-2 transition-colors rounded-full text-kkookk-steel hover:text-kkookk-navy hover:bg-slate-100"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h3 className="text-xl font-bold text-kkookk-navy">
              {cardName} 통계
            </h3>
            <p className="mt-1 text-sm text-kkookk-steel">
              최근 30일간의 데이터를 분석합니다.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold bg-white border rounded-lg border-slate-200 text-kkookk-steel hover:bg-slate-50">
            <Calendar size={16} /> 2023.11.01 ~ 11.30
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white rounded-lg bg-kkookk-navy hover:bg-slate-800">
            <Download size={16} /> 리포트 다운로드
          </button>
        </div>
      </div>

      {/* KPI 카드 */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {STATS_CARDS.map((stat, i) => (
          <div
            key={i}
            className="p-6 transition-shadow bg-white border shadow-sm rounded-2xl border-slate-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>{stat.icon}</div>
              <span className="px-2 py-1 text-xs font-bold text-green-600 rounded-full bg-green-50">
                {stat.change}
              </span>
            </div>
            <p className="mb-1 text-xs font-medium text-kkookk-steel">
              {stat.title}
            </p>
            <div className="flex items-baseline gap-1">
              <h4 className="text-2xl font-bold text-kkookk-navy">
                {stat.value}
              </h4>
              <span className="text-sm text-kkookk-steel">{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 차트 섹션 */}
      <div className="grid flex-1 min-h-0 grid-cols-3 gap-6">
        {/* 주간 차트 */}
        <div className="flex flex-col col-span-2 p-6 bg-white border shadow-sm rounded-2xl border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-lg font-bold text-kkookk-navy">
              주간 적립 추이
            </h4>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 text-xs text-kkookk-steel">
                <div className="w-2.5 h-2.5 bg-kkookk-indigo rounded-full" />{" "}
                스탬프 적립
              </div>
              <div className="flex items-center gap-1.5 text-xs text-kkookk-steel">
                <div className="w-2.5 h-2.5 bg-slate-200 rounded-full" /> 지난주
                평균
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-end justify-between gap-4 px-2 min-h-[200px]">
            {WEEKLY_DATA.map((d, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-end flex-1 h-full gap-2 cursor-pointer group"
              >
                <div className="relative flex items-end justify-center w-full h-full">
                  {/* 툴팁 */}
                  <div className="absolute z-10 px-2 py-1 mb-2 text-xs font-bold text-white transition-opacity rounded opacity-0 pointer-events-none -top-10 group-hover:opacity-100 bg-kkookk-navy whitespace-nowrap">
                    {d.val}건 적립
                  </div>
                  {/* 지난주 막대 */}
                  <div
                    className="absolute bottom-0 w-3 transition-all duration-500 rounded-t-full opacity-0 bg-slate-200 group-hover:opacity-50"
                    style={{ height: `${d.prev}%` }}
                  />
                  {/* 이번주 막대 */}
                  <div
                    className="relative z-10 w-3 transition-all duration-500 rounded-t-full bg-kkookk-indigo hover:bg-blue-700"
                    style={{ height: `${d.val}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-kkookk-steel">
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 시간대 분포 및 인사이트 */}
        <div className="flex flex-col col-span-1 gap-6">
          {/* 시간대 분포 */}
          <div className="flex-1 p-6 bg-white border shadow-sm rounded-2xl border-slate-200">
            <h4 className="mb-4 text-lg font-bold text-kkookk-navy">
              주요 방문 시간대
            </h4>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-full bg-orange-50 text-kkookk-indigo">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-sm text-kkookk-steel">가장 붐비는 시간</p>
                <p className="text-xl font-bold text-kkookk-navy">
                  12:00 - 14:00
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {TIME_DATA.map((t, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1 text-xs">
                    <span className="font-bold text-kkookk-navy">{t.time}</span>
                    <span className="text-kkookk-steel">{t.pct}%</span>
                  </div>
                  <div className="w-full h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-kkookk-navy"
                      style={{ width: `${t.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI 인사이트 */}
          <div className="p-6 text-white shadow-sm bg-slate-800 rounded-2xl">
            <div className="flex items-start gap-3">
              <Sparkles className="text-yellow-400 shrink-0" size={20} />
              <div>
                <h5 className="mb-1 text-sm font-bold text-white">인사이트</h5>
                <p className="text-xs leading-relaxed text-slate-300">
                  이번 달{" "}
                  <span className="font-bold text-white">금요일 점심 시간</span>
                  에 쿠폰 사용률이 가장 높습니다. 이 시간대에 타임 세일 이벤트를
                  진행해보세요!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StampCardStats;
