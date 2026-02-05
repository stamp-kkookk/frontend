/**
 * Auth API Service for KKOOKK
 * Handles OTP, wallet registration, and owner auth
 */

import { postRaw, getRaw } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import type {
  OtpRequestDto,
  OtpRequestResponse,
  OtpVerifyDto,
  OtpVerifyResponse,
  WalletRegisterRequest,
  WalletRegisterResponse,
  OwnerSignupRequest,
  OwnerSignupResponse,
  OwnerLoginRequest,
  OwnerLoginResponse,
  StorePublicInfoResponse,
} from '@/types/api';

// =============================================================================
// Public API - OTP
// =============================================================================

export async function requestOtp(data: OtpRequestDto): Promise<OtpRequestResponse> {
  return postRaw<OtpRequestResponse, OtpRequestDto>(
    API_ENDPOINTS.PUBLIC.OTP_REQUEST,
    data
  );
}

export async function verifyOtp(data: OtpVerifyDto): Promise<OtpVerifyResponse> {
  return postRaw<OtpVerifyResponse, OtpVerifyDto>(
    API_ENDPOINTS.PUBLIC.OTP_VERIFY,
    data
  );
}

// =============================================================================
// Public API - Wallet
// =============================================================================

export async function registerWallet(
  data: WalletRegisterRequest
): Promise<WalletRegisterResponse> {
  return postRaw<WalletRegisterResponse, WalletRegisterRequest>(
    API_ENDPOINTS.PUBLIC.WALLET_REGISTER,
    data
  );
}

// =============================================================================
// Public API - Store Info
// =============================================================================

export async function getStorePublicInfo(
  storeId: number
): Promise<StorePublicInfoResponse> {
  return getRaw<StorePublicInfoResponse>(API_ENDPOINTS.PUBLIC.STORE_INFO(storeId));
}

// =============================================================================
// Owner API - Auth
// =============================================================================

export async function ownerSignup(
  data: OwnerSignupRequest
): Promise<OwnerSignupResponse> {
  return postRaw<OwnerSignupResponse, OwnerSignupRequest>(
    API_ENDPOINTS.OWNER.SIGNUP,
    data
  );
}

export async function ownerLogin(
  data: OwnerLoginRequest
): Promise<OwnerLoginResponse> {
  return postRaw<OwnerLoginResponse, OwnerLoginRequest>(
    API_ENDPOINTS.OWNER.LOGIN,
    data
  );
}
