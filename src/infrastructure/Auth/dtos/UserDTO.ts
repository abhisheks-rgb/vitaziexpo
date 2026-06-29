/**
 * Shape of the `body` inside GET /users/profile response.
 */
export interface UserProfileBodyDTO {
  email: string;
  full_name: string;
  clinic_id: string;
  clinic_name: string;
  contact_phone: string;
  country: string;
  postal_code: string;
  province_or_state: string;
  street_address: string;
  city: string;
  licenses: string[];
  two_factor_auth_enabled: boolean;
  role: string;
}

/**
 * Full envelope returned by GET /users/profile.
 */
export interface UserProfileResponseDTO {
  statusCode: number;
  body: UserProfileBodyDTO;
  headers: Record<string, string>;
}
