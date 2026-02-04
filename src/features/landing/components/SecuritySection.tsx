/**
 * SecuritySection
 * 보안 섹션 - 신뢰 구축
 */

export function SecuritySection() {
  return (
    <section className="py-20 bg-kkookk-indigo/5">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-kkookk-navy text-center mb-4">
          걱정 없이 시작하세요
        </h2>
        <p className="text-lg text-kkookk-steel text-center mb-12">
          사장님의 비즈니스를 안전하게 지킵니다
        </p>

        {/* Placeholder for security features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['리딤 감사/로그', '직원 확인 모달', '60초 TTL'].map((feature) => (
            <div key={feature} className="bg-white p-6 rounded-2xl shadow-kkookk-md text-center">
              <div className="w-16 h-16 bg-kkookk-indigo/10 rounded-full mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-kkookk-navy mb-2">
                {feature}
              </h3>
              <p className="text-kkookk-steel">
                기능 설명이 들어갈 자리입니다.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
