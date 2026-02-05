/**
 * Wallet API Service for KKOOKK Customer
 */

import { getRaw } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type {
  WalletStampCardListResponse,
  StampHistoryResponse,
  RedeemHistoryResponse,
  WalletRewardListResponse,
  StampCardSortType,
  WalletRewardStatus,
} from '@/types/api';

// =============================================================================
// Wallet Stamp Cards
// =============================================================================

export interface GetWalletStampCardsParams {
  phone: string;
  name: string;
  sortBy?: StampCardSortType;
}

export async function getWalletStampCards(
  params: GetWalletStampCardsParams
): Promise<WalletStampCardListResponse> {
  return getRaw<WalletStampCardListResponse>(API_ENDPOINTS.CUSTOMER.WALLET_STAMP_CARDS, {
    phone: params.phone,
    name: params.name,
    sortBy: params.sortBy,
  });
}

// =============================================================================
// Stamp History (StepUp Required)
// =============================================================================

export interface GetStampHistoryParams {
  walletStampCardId: number;
  page?: number;
  size?: number;
}

export async function getStampHistory(
  params: GetStampHistoryParams
): Promise<StampHistoryResponse> {
  return getRaw<StampHistoryResponse>(
    API_ENDPOINTS.CUSTOMER.STAMP_HISTORY(params.walletStampCardId),
    {
      page: params.page ?? 0,
      size: params.size ?? 20,
    }
  );
}

// =============================================================================
// Redeem History (StepUp Required)
// =============================================================================

export interface GetRedeemHistoryParams {
  page?: number;
  size?: number;
}

export async function getRedeemHistory(
  params?: GetRedeemHistoryParams
): Promise<RedeemHistoryResponse> {
  return getRaw<RedeemHistoryResponse>(API_ENDPOINTS.CUSTOMER.REDEEM_HISTORY, {
    page: params?.page ?? 0,
    size: params?.size ?? 20,
  });
}

// =============================================================================
// Wallet Rewards (StepUp Required)
// =============================================================================

export interface GetWalletRewardsParams {
  status?: WalletRewardStatus;
  page?: number;
  size?: number;
}

export async function getWalletRewards(
  params?: GetWalletRewardsParams
): Promise<WalletRewardListResponse> {
  return getRaw<WalletRewardListResponse>(API_ENDPOINTS.CUSTOMER.WALLET_REWARDS, {
    status: params?.status,
    page: params?.page ?? 0,
    size: params?.size ?? 20,
  });
}
