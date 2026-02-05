/**
 * Wallet Hooks for KKOOKK Customer
 * TanStack Query hooks for wallet operations
 */

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import {
  getWalletStampCards,
  getStampHistory,
  getRedeemHistory,
  getWalletRewards,
  type GetWalletStampCardsParams,
  type GetStampHistoryParams,
  type GetRedeemHistoryParams,
  type GetWalletRewardsParams,
} from '../api/walletApi';
import { QUERY_KEYS } from '@/lib/api/endpoints';
import { isStepUpValid } from '@/lib/api/tokenManager';

// =============================================================================
// Wallet Stamp Cards Hook
// =============================================================================

export function useWalletStampCards(params: GetWalletStampCardsParams | null) {
  return useQuery({
    queryKey: params
      ? QUERY_KEYS.walletStampCards(params.phone, params.name)
      : ['wallet', 'stampCards', 'disabled'],
    queryFn: () => getWalletStampCards(params!),
    enabled: !!params?.phone && !!params?.name,
  });
}

// =============================================================================
// Stamp History Hook (StepUp Required)
// =============================================================================

export function useStampHistory(
  walletStampCardId: number | undefined,
  options?: Omit<GetStampHistoryParams, 'walletStampCardId'>
) {
  return useQuery({
    queryKey: QUERY_KEYS.stampHistory(walletStampCardId ?? 0),
    queryFn: () =>
      getStampHistory({
        walletStampCardId: walletStampCardId!,
        page: options?.page,
        size: options?.size,
      }),
    enabled: !!walletStampCardId && isStepUpValid(),
  });
}

export function useStampHistoryInfinite(
  walletStampCardId: number | undefined,
  pageSize = 20
) {
  return useInfiniteQuery({
    queryKey: [...QUERY_KEYS.stampHistory(walletStampCardId ?? 0), 'infinite'],
    queryFn: ({ pageParam = 0 }) =>
      getStampHistory({
        walletStampCardId: walletStampCardId!,
        page: pageParam,
        size: pageSize,
      }),
    getNextPageParam: (lastPage) => {
      const { pageInfo } = lastPage;
      if (pageInfo.number < pageInfo.totalPages - 1) {
        return pageInfo.number + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
    enabled: !!walletStampCardId && isStepUpValid(),
  });
}

// =============================================================================
// Redeem History Hook (StepUp Required)
// =============================================================================

export function useRedeemHistory(options?: GetRedeemHistoryParams) {
  return useQuery({
    queryKey: QUERY_KEYS.redeemHistory(),
    queryFn: () => getRedeemHistory(options),
    enabled: isStepUpValid(),
  });
}

export function useRedeemHistoryInfinite(pageSize = 20) {
  return useInfiniteQuery({
    queryKey: [...QUERY_KEYS.redeemHistory(), 'infinite'],
    queryFn: ({ pageParam = 0 }) =>
      getRedeemHistory({
        page: pageParam,
        size: pageSize,
      }),
    getNextPageParam: (lastPage) => {
      const { pageInfo } = lastPage;
      if (pageInfo.number < pageInfo.totalPages - 1) {
        return pageInfo.number + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
    enabled: isStepUpValid(),
  });
}

// =============================================================================
// Wallet Rewards Hook (StepUp Required)
// =============================================================================

export function useWalletRewards(options?: GetWalletRewardsParams) {
  return useQuery({
    queryKey: QUERY_KEYS.walletRewards(options?.status),
    queryFn: () => getWalletRewards(options),
    enabled: isStepUpValid(),
  });
}

export function useWalletRewardsInfinite(
  status?: GetWalletRewardsParams['status'],
  pageSize = 20
) {
  return useInfiniteQuery({
    queryKey: [...QUERY_KEYS.walletRewards(status), 'infinite'],
    queryFn: ({ pageParam = 0 }) =>
      getWalletRewards({
        status,
        page: pageParam,
        size: pageSize,
      }),
    getNextPageParam: (lastPage) => {
      const { pageInfo } = lastPage;
      if (pageInfo.number < pageInfo.totalPages - 1) {
        return pageInfo.number + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
    enabled: isStepUpValid(),
  });
}
