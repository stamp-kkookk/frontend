/**
 * SolvingSection
 * 해결책 제시 섹션 - 꾸욱의 스탬프 커스터마이징 과정
 */

export function SolvingSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-kkookk-navy text-center mb-4">
          매출이 오르는 스탬프, 이렇게 만듭니다
        </h2>
        <p className="text-lg text-kkookk-steel text-center mb-12">
          3분이면 충분합니다
        </p>

        {/* Placeholder for UX flow */}
        <div className="space-y-8">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-kkookk-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {step}
              </div>
              <div className="flex-1 bg-kkookk-sand p-6 rounded-2xl">
                <h3 className="text-xl font-semibold text-kkookk-navy mb-2">
                  단계 {step}
                </h3>
                <p className="text-kkookk-steel">
                  단계 설명이 들어갈 자리입니다.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
