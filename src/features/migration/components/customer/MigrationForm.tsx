/**
 * MigrationForm 컴포넌트
 * 고객이 종이 스탬프 전환 요청을 제출하기 위한 폼
 */

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useCustomerNavigate } from "@/hooks/useCustomerNavigate";
import {
  INITIAL_STAMP_CARD,
  MOCK_MIGRATIONS,
  MOCK_OTHER_CARDS,
} from "@/lib/constants/mockData";
import type { MigrationRequest, StampCard } from "@/types/domain";
import {
  AlertCircle,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  Info,
} from "lucide-react";
import { useState } from "react";

interface MigrationFormProps {
  cards?: StampCard[];
  existingMigrations?: MigrationRequest[];
}

export function MigrationForm({
  cards = [INITIAL_STAMP_CARD, ...MOCK_OTHER_CARDS],
  existingMigrations = MOCK_MIGRATIONS,
}: MigrationFormProps) {
  const { customerNavigate } = useCustomerNavigate();
  const [count, setCount] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // 아직 전환 요청을 받을 수 있는 매장 확인
  const availableStores = cards.map((card) => {
    const isAlreadyApproved = existingMigrations.some(
      (m) => m.storeName === card.storeName && m.status === "approved",
    );
    const isPending = existingMigrations.some(
      (m) => m.storeName === card.storeName && m.status === "pending",
    );

    return {
      ...card,
      isDisabled: isAlreadyApproved || isPending,
      statusText: isAlreadyApproved
        ? "(전환 완료)"
        : isPending
          ? "(심사 중)"
          : "",
    };
  });

  const initialStore = availableStores.find((s) => !s.isDisabled);
  const [selectedStoreName, setSelectedStoreName] = useState(
    initialStore?.storeName || "",
  );

  const allStoresUsed = availableStores.every((s) => s.isDisabled);

  // 폼 유효성 검사
  const isFormValid =
    selectedStoreName.trim() !== "" && count.trim() !== "" && file !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedStoreName) {
      alert("매장을 선택해주세요.");
      return;
    }

    const selectedStore = availableStores.find(
      (s) => s.storeName === selectedStoreName,
    );
    if (selectedStore?.isDisabled) {
      alert("이미 전환 신청이 완료되었거나 진행 중인 매장입니다.");
      return;
    }

    if (!count || !file) {
      alert("모든 정보를 입력해주세요.");
      return;
    }

    // TODO: API 연동 후 실제 제출 처리
    console.log(
      "Migration submitted:",
      selectedStoreName,
      parseInt(count),
      file,
    );
    customerNavigate("/migrations");
  };

  return (
    <div className="flex flex-col h-full pt-12 pb-10 bg-white">
      {/* 헤더 */}
      <div className="px-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex items-center sticky top-0 bg-white z-10 -mt-12 py-4">
        <button
          onClick={() => customerNavigate("/migrations")}
          className="p-2 -ml-2 text-kkookk-steel hover:text-kkookk-navy"
          aria-label="뒤로 가기"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="ml-2 text-lg font-bold text-kkookk-navy">
          전환 신청하기
        </h1>
      </div>

      {/* 폼 콘텐츠 */}
      <form onSubmit={handleSubmit} className="flex-1 p-6 overflow-y-auto">
        {/* 안내 배너 */}
        <div className="flex gap-3 p-4 mb-8 text-xs leading-relaxed text-blue-800 bg-blue-50 rounded-xl">
          <Info size={20} className="shrink-0" />
          <div>
            <p className="mb-1 font-bold">안내사항</p>
            <p>• 매장별로 1회만 전환 신청이 가능합니다.</p>
            <p>• 신청 후 승인까지 약 24~48시간 소요됩니다.</p>
          </div>
        </div>

        <div className="space-y-6">
          {/* 매장 선택 */}
          <div>
            <label
              htmlFor="store-select"
              className="block mb-2 text-sm font-bold text-kkookk-navy"
            >
              매장 선택 <span className="text-kkookk-orange-500">*</span>
            </label>
            <div className="relative">
              <select
                id="store-select"
                value={selectedStoreName}
                onChange={(e) => setSelectedStoreName(e.target.value)}
                className="w-full p-4 pr-10 font-medium border appearance-none bg-kkookk-sand rounded-xl border-slate-200 focus:outline-none text-kkookk-navy disabled:bg-slate-100 disabled:text-slate-400"
                disabled={allStoresUsed}
              >
                {availableStores.map((store) => (
                  <option
                    key={store.id}
                    value={store.storeName}
                    disabled={store.isDisabled}
                  >
                    {store.storeName} {store.statusText}
                  </option>
                ))}
                {availableStores.length === 0 && (
                  <option disabled>보유한 스탬프 카드가 없습니다</option>
                )}
              </select>
              <ChevronDown
                className="absolute -translate-y-1/2 pointer-events-none right-4 top-1/2 text-kkookk-steel"
                size={20}
              />
            </div>
            {allStoresUsed && (
              <p className="flex items-center gap-1 mt-2 text-xs text-kkookk-red">
                <AlertCircle size={12} /> 모든 매장의 전환 신청이
                완료되었습니다.
              </p>
            )}
          </div>

          {/* 스탬프 개수 */}
          <div>
            <label
              htmlFor="count-input"
              className="block mb-2 text-xs font-bold text-kkookk-navy"
            >
              보유 스탬프 개수 <span className="text-kkookk-orange-500">*</span>
            </label>
            <Input
              id="count-input"
              type="number"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="0"
              min={1}
            />
          </div>

          {/* 사진 업로드 */}
          <div>
            <label
              htmlFor="photo-upload"
              className="block mb-2 text-sm font-bold text-kkookk-navy"
            >
              종이 쿠폰 사진 첨부{" "}
              <span className="text-kkookk-orange-500">*</span>
            </label>
            <div className="relative p-8 text-center transition-colors border-2 border-dashed cursor-pointer border-slate-300 rounded-xl bg-kkookk-sand/30 hover:bg-kkookk-sand">
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <div className="flex flex-col items-center text-kkookk-steel">
                {file ? (
                  <>
                    <Check size={32} className="mb-2 text-green-500" />
                    <p className="text-sm font-bold text-kkookk-navy">
                      {file.name}
                    </p>
                  </>
                ) : (
                  <>
                    <Camera size={32} className="mb-2" />
                    <p className="text-sm">터치하여 사진 촬영 또는 업로드</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* 제출 버튼 */}
      <div className="px-6">
        <Button
          onClick={handleSubmit}
          disabled={allStoresUsed || !isFormValid}
          variant="primary"
          size="full"
          className="shadow-lg"
        >
          제출하기
        </Button>
      </div>
    </div>
  );
}

export default MigrationForm;
