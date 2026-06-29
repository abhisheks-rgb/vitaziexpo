import { create } from 'zustand';

type ToastVariant = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface UIState {
  globalLoading: boolean;
  toasts: Toast[];

  // Actions
  setGlobalLoading: (value: boolean) => void;
  showToast: (message: string, variant?: ToastVariant) => void;
  dismissToast: (id: string) => void;
}

/**
 * uiStore — ephemeral UI state (toasts, full-screen loading overlay).
 * Never persisted; resets on app restart.
 */
export const useUIStore = create<UIState>((set) => ({
  globalLoading: false,
  toasts: [],

  setGlobalLoading: (value) => set({ globalLoading: value }),

  showToast: (message, variant = 'info') =>
    set((state) => ({
      toasts: [...state.toasts, { id: Date.now().toString(), message, variant }],
    })),

  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
