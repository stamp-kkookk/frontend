/**
 * LandingPage
 * 꾸욱(KKOOKK) 서비스 랜딩 페이지
 * 소상공인(사장님) 타겟 - 회원가입 및 서비스 도입 유도
 */

import {
  FAQSection,
  FooterSection,
  HeroSection,
  ProblemSection,
  ReviewSection,
  GuaranteeSection,
  SolvingSection,
} from "@/features/landing/components";
import { LandingHeader } from "@/features/landing/components/LandingHeader";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white bg-linear-to-b">
      {/* Header */}
      <LandingHeader />

      {/* Main Content */}
      <main>
        <HeroSection />
        <ProblemSection />
        <SolvingSection />
        <GuaranteeSection />
        <ReviewSection />
        <FAQSection />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}

export default LandingPage;
