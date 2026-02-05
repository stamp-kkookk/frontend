/**
 * TerminalHistoryPage
 * 처리된 요청 히스토리 페이지
 */

import { ProcessedHistory } from "@/features/terminal/components/ProcessedHistory";
import { useOutletContext } from "react-router-dom";
import type { IssuanceRequest } from "@/types/domain";

interface TerminalContextType {
  requests: IssuanceRequest[];
}

export function TerminalHistoryPage() {
  const { requests } = useOutletContext<TerminalContextType>();

  return <ProcessedHistory requests={requests} />;
}

export default TerminalHistoryPage;
