/**
 * TerminalApprovalPage
 * 스탬프 적립 승인 대기 페이지
 */

import { ApprovalQueue } from "@/features/terminal/components/ApprovalQueue";
import { useOutletContext } from "react-router-dom";
import type { IssuanceRequest } from "@/types/domain";

interface TerminalContextType {
  requests: IssuanceRequest[];
  approve: (id: string) => void;
  reject: (id: string) => void;
}

export function TerminalApprovalPage() {
  const { requests, approve, reject } = useOutletContext<TerminalContextType>();

  return (
    <ApprovalQueue
      requests={requests}
      onApprove={approve}
      onReject={reject}
    />
  );
}

export default TerminalApprovalPage;
