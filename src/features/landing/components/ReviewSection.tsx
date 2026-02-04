/**
 * ReviewSection
 * 후기 섹션 - 사회적 증거
 */

export function ReviewSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-kkookk-navy text-center mb-12">
          실제 사장님들의 후기입니다
        </h2>

        {/* Placeholder for review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-kkookk-sand p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-kkookk-orange-200 rounded-full" />
                <div>
                  <h4 className="font-semibold text-kkookk-navy">사장님 {i}</h4>
                  <p className="text-sm text-kkookk-steel">카페 운영</p>
                </div>
              </div>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-kkookk-yellow text-xl">★</span>
                ))}
              </div>
              <p className="text-kkookk-navy">
                후기 내용이 들어갈 자리입니다.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
