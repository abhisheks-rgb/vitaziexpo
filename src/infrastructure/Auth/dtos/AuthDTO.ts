export interface AuthResponseDTO {
  access_token: string;
  refresh_token: string;
  user_id: string;
  expires_in: number; // seconds
}
