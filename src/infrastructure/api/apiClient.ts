import axios from 'axios';

import { API_BASE_URL } from '../../config/env';

/**
 * Axios instance pre-configured for the Vitazi API.
 * Token injection and refresh are wired up here — no UI changes needed when APIs go live.
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ── Request interceptor: inject auth token ────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    // Token is read from Zustand store / SecureStore at call time
    // Import lazily to avoid circular deps
    const { getState } = require('../../state/store/authStore');
    const token = getState().session?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response interceptor: handle 401 / token refresh ─────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { getState, setState } = require('../../state/store/authStore');
        const refreshToken = getState().session?.refreshToken;
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        const newAccessToken = data.access_token;
        setState((s: any) => ({
          session: s.session ? { ...s.session, accessToken: newAccessToken } : null,
        }));

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch {
        const { getState } = require('../../state/store/authStore');
        getState().clearSession();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);
