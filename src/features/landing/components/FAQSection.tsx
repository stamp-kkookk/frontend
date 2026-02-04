/**
 * FAQSection
 * FAQ 섹션 - 자주 묻는 질문
 */

export function FAQSection() {
  return (
    <section className="py-20 bg-kkookk-navy-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-kkookk-navy text-center mb-12">
          자주 묻는 질문
        </h2>

        {/* Placeholder for FAQ accordion */}
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white p-6 rounded-2xl">
              <h3 className="text-lg font-semibold text-kkookk-navy mb-2">
                질문 {i}
              </h3>
              <p className="text-kkookk-steel">
                답변이 들어갈 자리입니다.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
