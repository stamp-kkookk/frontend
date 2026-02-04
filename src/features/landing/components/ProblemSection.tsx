/**
 * ProblemSection
 * 문제 제기 섹션 - 사장님들의 고민 공감대 형성
 */

const problems = [
  {
    icon: "/logo/nodoc.png",
    title: "고객이 종이 쿠폰을 잃어버려요",
    description:
      "쿠폰을 집에 두고 오거나 분실해서 혜택을 못 받는 고객들. 재방문 기회를 놓치고 있어요.",
  },
  {
    icon: "/logo/cryimti.png",
    title: "일일이 도장 찍고 확인하기 번거로워요",
    description:
      "바쁜 시간대에 쿠폰을 찾고, 도장 찍고, 위조 걱정까지. 진짜 고객 응대에 집중하고 싶어요.",
  },
  {
    icon: "/logo/arrow_rb.png",
    title: "혜택을 줘도 다시 안 오시네요",
    description:
      "쿠폰은 만들었는데 고객이 잊어버리거나 관심이 없어요. 효과적인 재방문 유도가 어려워요.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-20 bg-kkookk-navy-50">
      <div className="px-6 mx-auto max-w-7xl">
        <h2 className="mb-20 text-3xl font-semibold text-center md:text-5xl text-kkookk-navy">
          이런 고민 너무 익숙하시죠?
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 ">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="p-8 transition-transform bg-kkookk-orange-50/50 rounded-2xl shadow-kkookk-md hover:scale-105"
            >
              <div className="flex items-center justify-center mb-6 rounded-full bg-kkookk-orange-100">
                <img src={problem.icon} width={200} alt={problem.title} />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-center text-kkookk-navy break-keep">
                {problem.title}
              </h3>
              <p className="leading-relaxed text-center text-kkookk-steel break-keep">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
