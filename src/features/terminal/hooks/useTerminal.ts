/**
 * Terminal Hooks for KKOOKK
 * TanStack Query hooks for terminal operations with polling
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getPendingIssuanceRequests,
  approveIssuanceRequest,
  rejectIssuanceRequest,
  getPendingRedeemSessions,
} from '../api/terminalApi';
import { QUERY_KEYS } from '@/lib/api/endpoints';

// =============================================================================
// Polling Configuration
// =============================================================================

const POLLING_INTERVAL_MS = 2000; // 2 seconds

// =============================================================================
// Pending Issuance Requests Hook (with Polling)
// =============================================================================

export function usePendingIssuanceRequests(
  storeId: number | undefined,
  options?: {
    enabled?: boolean;
    pollingEnabled?: boolean;
  }
) {
  const enabled = options?.enabled ?? true;
  const pollingEnabled = options?.pollingEnabled ?? true;

  return useQuery({
    queryKey: QUERY_KEYS.pendingIssuanceRequests(storeId ?? 0),
    queryFn: () => getPendingIssuanceRequests(storeId!),
    enabled: !!storeId && enabled,
    refetchInterval: pollingEnabled ? POLLING_INTERVAL_MS : false,
  });
}

// =============================================================================
// Approve Issuance Hook
// =============================================================================

export function useApproveIssuance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      storeId,
      requestId,
    }: {
      storeId: number;
      requestId: number;
    }) => approveIssuanceRequest(storeId, requestId),
    onSuccess: (_, { storeId }) => {
      // Invalidate pending requests to refresh list
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.pendingIssuanceRequests(storeId),
      });
    },
  });
}

// =============================================================================
// Reject Issuance Hook
// =============================================================================

export function useRejectIssuance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      storeId,
      requestId,
    }: {
      storeId: number;
      requestId: number;
    }) => rejectIssuanceRequest(storeId, requestId),
    onSuccess: (_, { storeId }) => {
      // Invalidate pending requests to refresh list
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.pendingIssuanceRequests(storeId),
      });
    },
  });
}

// =============================================================================
// Pending Redeem Sessions Hook (with Polling)
// =============================================================================

export function usePendingRedeemSessions(
  storeId: number | undefined,
  options?: {
    enabled?: boolean;
    pollingEnabled?: boolean;
  }
) {
  const enabled = options?.enabled ?? true;
  const pollingEnabled = options?.pollingEnabled ?? true;

  return useQuery({
    queryKey: QUERY_KEYS.pendingRedeemSessions(storeId ?? 0),
    queryFn: () => getPendingRedeemSessions(storeId!),
    enabled: !!storeId && enabled,
    refetchInterval: pollingEnabled ? POLLING_INTERVAL_MS : false,
  });
}
