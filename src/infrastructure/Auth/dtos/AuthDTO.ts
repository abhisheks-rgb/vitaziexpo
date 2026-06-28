/**
 * Shape returned by POST /users/login (no 2FA).
 * The key is literally "Access Key" with a space.
 */
export interface AuthResponseDTO {
  'Access Key': string;
  two_factor_auth_enabled: boolean;
}

/**
 * Shape returned by POST /2fa/verify (2FA login step 2).
 */
export interface TwoFAVerifyResponseDTO {
  'Access Key': string;
  two_factor_auth_enabled: boolean;
}

/**
 * Shape returned by POST /users/login when 2FA is required (step 1).
 */
export interface PreAuthResponseDTO {
  '2fa_required': true;
  pre_auth_token: string;
}
