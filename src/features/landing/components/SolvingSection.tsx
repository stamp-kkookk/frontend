/**
 * SolvingSection
 * 해결책 제시 섹션 - 꾸욱의 스탬프 커스터마이징 과정
 * 실제 서비스 UI 기반 인터랙티브 데모
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

const steps = [
  {
    step: 1,
    title: "가게 정보 입력",
    subtitle: "매장명과 카드 이름을 설정해주세요",
  },
  {
    step: 2,
    title: "스탬프 디자인",
    subtitle: "브랜드 컬러 또는 이미지를 넣어 스탬프를 꾸며주세요!",
  },
  {
    step: 3,
    title: "리워드 규칙 설정",
    subtitle: "스탬프 개수와 보상을 설정해주세요",
  },
];

const COLOR_OPTIONS = [
  { name: "orange", color: "bg-kkookk-orange-500" },
  { name: "blue", color: "bg-blue-600" },
  { name: "emerald", color: "bg-emerald-600" },
];

export function SolvingSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [design, setDesign] = useState({
    storeName: "",
    cardName: "",
    maxStamps: 10,
    reward: "",
    color: "orange",
    hasBackgroundImage: false,
    stampIcon: "default",
  });
  const [isAnimating, setIsAnimating] = useState(false);

  // Typing animation helper
  const typeText = async (text: string, setter: (val: string) => void) => {
    setter("");
    for (let i = 0; i <= text.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 80));
      setter(text.substring(0, i));
    }
  };

  // Step 1: Store Info Animation
  const animateStep1 = async () => {
    setIsAnimating(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await typeText("꾸욱 카페", (val) =>
      setDesign((prev) => ({ ...prev, storeName: val }))
    );
    await new Promise((resolve) => setTimeout(resolve, 300));
    await typeText("단골 스탬프", (val) =>
      setDesign((prev) => ({ ...prev, cardName: val }))
    );
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsAnimating(false);
    setCurrentStep(1);
  };

  // Step 2: Design Animation
  const animateStep2 = async () => {
    setIsAnimating(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Color selection animation
    const colors = ["orange", "blue", "emerald", "orange"];
    for (const color of colors) {
      setDesign((prev) => ({ ...prev, color }));
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    // Background image animation
    setDesign((prev) => ({ ...prev, hasBackgroundImage: true }));
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Stamp icon animation
    setDesign((prev) => ({ ...prev, stampIcon: "custom" }));
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsAnimating(false);
    setCurrentStep(2);
  };

  // Step 3: Reward Animation
  const animateStep3 = async () => {
    setIsAnimating(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Stamp count animation
    const counts = [5, 10, 15, 10];
    for (const count of counts) {
      setDesign((prev) => ({ ...prev, maxStamps: count }));
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    await new Promise((resolve) => setTimeout(resolve, 300));
    await typeText("아메리카노 1잔 무료", (val) =>
      setDesign((prev) => ({ ...prev, reward: val }))
    );
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsAnimating(false);
    // Reset and go back to step 1
    setDesign({
      storeName: "",
      cardName: "",
      maxStamps: 10,
      reward: "",
      color: "orange",
      hasBackgroundImage: false,
      stampIcon: "default",
    });
    setCurrentStep(0);
  };

  // Trigger animations based on current step
  useEffect(() => {
    if (!isAnimating) {
      if (currentStep === 0) {
        animateStep1();
      } else if (currentStep === 1) {
        animateStep2();
      } else if (currentStep === 2) {
        animateStep3();
      }
    }
  }, [currentStep]);

  const getColorClass = (colorName: string) => {
    const colorOption = COLOR_OPTIONS.find((c) => c.name === colorName);
    return colorOption?.color || "bg-kkookk-orange-500";
  };

  return (
    <section className="relative py-32 overflow-hidden bg-white">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl text-kkookk-navy break-keep">
                매출이 오르는 스탬프,
                <br />
                <span className="text-kkookk-orange-500">이렇게 만듭니다</span>
              </h2>
              <p className="text-xl text-kkookk-steel break-keep">
                복잡한 설정 없이, 3분이면 충분합니다
              </p>
            </div>

            {/* Step Indicators */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start gap-4 p-4 transition-all rounded-2xl ${
                    currentStep === index
                      ? "bg-kkookk-orange-50 border-2 border-kkookk-orange-500"
                      : "bg-white/50 border-2 border-transparent"
                  }`}
                >
                  <div
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                      currentStep === index
                        ? "bg-kkookk-orange-500 text-white"
                        : "bg-kkookk-steel-100 text-kkookk-steel"
                    }`}
                  >
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-semibold text-kkookk-navy break-keep">
                      {step.title}
                    </h3>
                    <p className="text-sm text-kkookk-steel break-keep">
                      {step.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Mobile Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center"
          >
            {/* Mobile Frame */}
            <div className="w-[320px] bg-white rounded-4xl shadow-2xl border-4 border-kkookk-navy overflow-hidden h-160 flex flex-col relative">
              <div className="relative flex flex-col h-full overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 flex flex-col p-4 pt-8"
                  >
                    {/* Step Header */}
                    <div className="mb-4">
                      <div className="inline-block px-3 py-1 mb-2 text-xs font-semibold rounded-full bg-kkookk-orange-100 text-kkookk-orange-600">
                        {steps[currentStep].step}/3 단계
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-kkookk-navy break-keep">
                        {steps[currentStep].title}
                      </h3>
                    </div>

                    {/* Form Content */}
                    <div className="flex-1 mb-4 space-y-4">
                      {currentStep === 0 && (
                        <>
                          <div>
                            <label className="block mb-2 text-sm font-bold text-kkookk-navy">
                              매장명
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                value={design.storeName}
                                readOnly
                                className="w-full p-3 border rounded-lg border-kkookk-steel-100 bg-kkookk-navy-50 text-kkookk-navy"
                                placeholder="매장명 입력"
                              />
                              {isAnimating && design.storeName && (
                                <motion.div
                                  className="absolute w-0.5 h-4 bg-kkookk-orange-500 right-3 top-1/2 -translate-y-1/2"
                                  animate={{ opacity: [1, 0] }}
                                  transition={{
                                    duration: 0.5,
                                    repeat: Infinity,
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-bold text-kkookk-navy">
                              카드 이름
                            </label>
                            <input
                              type="text"
                              value={design.cardName}
                              readOnly
                              className="w-full p-3 border rounded-lg border-kkookk-steel-100 bg-kkookk-navy-50 text-kkookk-navy"
                              placeholder="카드 이름 입력"
                            />
                          </div>
                        </>
                      )}

                      {currentStep === 1 && (
                        <div>
                          <span className="block mb-3 text-sm font-bold text-kkookk-navy">
                            브랜드 컬러 선택
                          </span>
                          <div className="flex gap-3">
                            {COLOR_OPTIONS.map((colorOption) => (
                              <motion.div
                                key={colorOption.name}
                                animate={{
                                  scale:
                                    design.color === colorOption.name
                                      ? [1, 1.2, 1]
                                      : 1,
                                }}
                                transition={{ duration: 0.3 }}
                                className={`w-12 h-12 rounded-full ${colorOption.color} ${
                                  design.color === colorOption.name
                                    ? "ring-2 ring-kkookk-navy ring-offset-2"
                                    : ""
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {currentStep === 2 && (
                        <>
                          <div>
                            <span className="block mb-3 text-sm font-bold text-kkookk-navy">
                              목표 스탬프 수
                            </span>
                            <div className="flex items-center justify-center gap-4">
                              <div className="flex items-center justify-center w-10 h-10 border rounded-lg border-kkookk-steel-100 text-kkookk-steel bg-kkookk-navy-50">
                                -
                              </div>
                              <motion.span
                                key={design.maxStamps}
                                initial={{ scale: 1.5, color: "#ff4d00" }}
                                animate={{ scale: 1, color: "#1a1c1e" }}
                                className="text-2xl font-bold text-center text-kkookk-navy w-12"
                              >
                                {design.maxStamps}
                              </motion.span>
                              <div className="flex items-center justify-center w-10 h-10 border rounded-lg border-kkookk-steel-100 text-kkookk-steel bg-kkookk-navy-50">
                                +
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block mb-2 text-sm font-bold text-kkookk-navy">
                              보상 혜택
                            </label>
                            <input
                              type="text"
                              value={design.reward}
                              readOnly
                              className="w-full p-3 border rounded-lg border-kkookk-steel-100 bg-kkookk-navy-50 text-kkookk-navy"
                              placeholder="보상 입력"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {/* Preview Card */}
                    <div className="mt-auto">
                      <h4 className="mb-2 text-sm font-bold text-kkookk-steel">
                        미리보기
                      </h4>
                      <motion.div
                        layout
                        className={`rounded-2xl p-5 shadow-lg relative overflow-hidden ${
                          design.hasBackgroundImage
                            ? "bg-gradient-to-br from-purple-500 to-pink-500"
                            : getColorClass(design.color)
                        }`}
                      >
                        <div className="flex items-start justify-between mb-6 text-white">
                          <span className="font-bold opacity-90">
                            {design.storeName || "매장명"}
                          </span>
                          <span className="px-2 py-1 text-xs rounded bg-white/20 backdrop-blur-sm">
                            D-30
                          </span>
                        </div>
                        <div className="text-white">
                          <p className="mb-1 text-xs opacity-70">진행률</p>
                          <p className="text-2xl font-bold">
                            3 / {design.maxStamps}
                          </p>
                        </div>
                      </motion.div>

                      {/* Stamp Board */}
                      <div className="p-3 mt-3 rounded-xl bg-kkookk-sand">
                        <div className="grid grid-cols-5 gap-2 min-h-[84px]">
                          {Array.from({ length: design.maxStamps }).map(
                            (_, i) => (
                              <motion.div
                                key={`${design.maxStamps}-${i}`}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.03 }}
                                className={`aspect-square rounded-full flex items-center justify-center ${
                                  i < 3
                                    ? design.hasBackgroundImage
                                      ? "bg-gradient-to-br from-purple-500 to-pink-500 text-white"
                                      : `${getColorClass(design.color)} text-white`
                                    : "bg-white border border-kkookk-steel-100 text-kkookk-steel-200"
                                }`}
                              >
                                {i < 3 ? (
                                  design.stampIcon === "custom" ? (
                                    <span className="text-sm">⭐</span>
                                  ) : (
                                    <Check size={12} className="text-white" />
                                  )
                                ) : (
                                  <span className="text-[10px] font-bold">
                                    {i + 1}
                                  </span>
                                )}
                              </motion.div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Reward Display */}
                      {design.reward && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-3 mt-3 rounded-lg bg-kkookk-orange-500/10"
                        >
                          <p className="text-sm font-semibold text-center text-kkookk-orange-600 break-keep">
                            🎁 {design.reward}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 bg-kkookk-orange-500 blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 bg-kkookk-indigo blur-3xl -z-10" />
    </section>
  );
}
