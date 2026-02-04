/**
 * ProblemSection
 * 문제 제기 섹션 - 사장님들의 고민 공감대 형성
 */

export function ProblemSection() {
  return (
    <section className="py-20 bg-kkookk-navy-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-kkookk-navy text-center mb-12">
          이런 고민 너무 익숙하시죠?
        </h2>

        {/* Placeholder for problem cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-kkookk-md">
              <div className="w-12 h-12 bg-kkookk-orange-100 rounded-full mb-4" />
              <h3 className="text-xl font-semibold text-kkookk-navy mb-2">
                문제 {i}
              </h3>
              <p className="text-kkookk-steel">
                문제 설명이 들어갈 자리입니다.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
