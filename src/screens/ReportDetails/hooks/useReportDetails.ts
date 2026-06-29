// File: hooks/useReportDetails.ts

import { useRef, useState } from 'react';
import type { FlatList } from 'react-native';

import { REPORT_DETAILS_MOCK } from '../data/reportDetails.mock';
import type { ContentTab, EyeTab } from '../types/reportDetails.types';

export function useReportDetails() {
  const data = REPORT_DETAILS_MOCK;

  const [imageIndex, setImageIndex] = useState(0);
  const [activeEye, setActiveEye] = useState<EyeTab>('Right OD');
  const [activeTab, setActiveTab] = useState<ContentTab>('Findings');
  const [isScrolled, setIsScrolled] = useState(false);

  const imageListRef = useRef<FlatList>(null);

  const handleImageScroll = (index: number) => {
    setImageIndex(index);
    const mappedEye = data.imageEyeMap[index];
    if (mappedEye) {setActiveEye(mappedEye);}
  };

  const handleImageArrow = (dir: -1 | 1) => {
    const next = Math.max(0, Math.min(data.images.length - 1, imageIndex + dir));
    imageListRef.current?.scrollToIndex({ index: next, animated: true });
    setImageIndex(next);
    const mappedEye = data.imageEyeMap[next];
    if (mappedEye) {setActiveEye(mappedEye);}
  };

  const handleEyeChange = (eye: EyeTab) => {
    setActiveEye(eye);
  };

  const handleTabChange = (tab: ContentTab) => {
    setActiveTab(tab);
  };

  const handleScroll = (offsetY: number, imageH: number, headerH: number) => {
    setIsScrolled(offsetY > imageH - headerH);
  };

  return {
    data,
    imageIndex,
    activeEye,
    activeTab,
    isScrolled,
    imageListRef,
    handleImageScroll,
    handleImageArrow,
    handleEyeChange,
    handleTabChange,
    handleScroll,
  };
}
