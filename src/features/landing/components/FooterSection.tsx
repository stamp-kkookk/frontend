/**
 * FooterSection
 * 푸터 섹션 - 회사 정보 및 법적 정보
 */

export function FooterSection() {
  return (
    <footer className="bg-kkookk-navy text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">꾸욱</h3>
            <p className="text-white/70">
              POS 연동 없는 디지털 스탬프 플랫폼
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">서비스</h4>
            <ul className="space-y-2 text-white/70">
              <li>이용 약관</li>
              <li>개인정보처리방침</li>
              <li>사업자 정보</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">문의</h4>
            <ul className="space-y-2 text-white/70">
              <li>이메일: contact@kkookk.com</li>
              <li>전화: 02-1234-5678</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-white/50 text-sm">
          © 2024 KKOOKK. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
