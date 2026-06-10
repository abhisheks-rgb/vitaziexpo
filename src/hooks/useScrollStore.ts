import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { create } from 'zustand';

type ScrollStore = {
  isScrolled: boolean;
  setIsScrolled: (value: boolean) => void;
  handleScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export const useScrollStore = create<ScrollStore>((set) => ({
  isScrolled: false,

  setIsScrolled: (value) =>
    set({
      isScrolled: value,
    }),
  handleScroll: (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    set({
      isScrolled: offsetY > 10,
    });
  },
}));
