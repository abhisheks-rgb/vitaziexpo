// File: ReportDetailsScreen.tsx

import { BlurView } from 'expo-blur';
import React from 'react';
import {
  Animated,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import AppHeader from '../../components/AppHeader';
import AppImage from '../../components/AppImage';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import { AppImages } from '../../constants';
import { useTheme } from '../../theme';

import AfterCareSection from './components/AfterCare/AfterCareSection';
import EyeSelector from './components/EyeSelector/EyeSelector';
import { EYE_PILL_H } from './components/EyeSelector/styles';
import ReportImageCarousel from './components/ReportImageCarousel/ReportImageCarousel';
import { IMAGE_H } from './components/ReportImageCarousel/styles';
import ReportTabs from './components/ReportTabs/ReportTabs';
import AssessmentTab from './components/TabContent/AssessmentTab';
import DifferentialTab from './components/TabContent/DifferentialTab';
import FindingsTab from './components/TabContent/FindingsTab';
import InstructionsTab from './components/TabContent/InstructionsTab';
import PlanTab from './components/TabContent/PlanTab';
import { useReportDetails } from './hooks/useReportDetails';
import type { ContentTab } from './types/reportDetails.types';

const { width: SCREEN_W } = Dimensions.get('window');
const HEADER_H = 60;

export default function ReportDetailsScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const HEADER_ROW_H = 56;
  const overlayH = insets.top + HEADER_ROW_H;

  const scrollY = React.useRef(new Animated.Value(0)).current;

  const blurOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const {
    data,
    imageIndex,
    activeEye,
    activeTab,
    imageListRef,
    handleImageScroll,
    handleImageArrow,
    handleEyeChange,
    handleTabChange,
    handleScroll,
  } = useReportDetails();

  const onScrollEvent = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    handleScroll(e.nativeEvent.contentOffset.y, IMAGE_H, HEADER_H);
  };

  const onImageMomentumEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_W);
    handleImageScroll(idx);
  };

  const eyeReport = data.eyeReports[activeEye];

  const renderTabContent = (tab: ContentTab) => {
    switch (tab) {
      case 'Findings':
        return <FindingsTab data={eyeReport.findings} />;
      case 'Differential':
        return <DifferentialTab data={eyeReport.differential} />;
      case 'Assessment':
        return <AssessmentTab data={eyeReport.assessment} />;
      case 'Plan':
        return <PlanTab data={eyeReport.plan} />;
      case 'Instructions':
        return <InstructionsTab data={eyeReport.instructions} />;
    }
  };

  const rightActions = (
    <View style={styles.appBarActions}>
      <TouchableOpacity>
        <AppImage
          source={AppImages.share}
          containerStyle={styles.appBarIcon}
          contentFit="contain"
          showLoader={false}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <AppImage
          source={AppImages.print}
          containerStyle={styles.appBarIcon}
          contentFit="contain"
          showLoader={false}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <BackgroundBlobs />

      <Animated.ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
          listener: onScrollEvent,
        })}
        scrollEventThrottle={16}
      >
        {/* Image carousel + eye selector */}
        <View>
          <ReportImageCarousel
            images={data.images}
            imageIndex={imageIndex}
            date={data.date}
            listRef={imageListRef}
            onMomentumScrollEnd={onImageMomentumEnd}
            onArrowPress={handleImageArrow}
          />
          <EyeSelector activeEye={activeEye} onEyeChange={handleEyeChange} />
        </View>

        {/* White content card */}
        <View style={styles.contentCard}>
          <View style={{ height: EYE_PILL_H / 2 + 12 }} />

          <ReportTabs activeTab={activeTab} onTabChange={handleTabChange} />

          <View style={styles.tabBody}>{renderTabContent(activeTab)}</View>

          <AfterCareSection resources={data.careResources} />
        </View>
      </Animated.ScrollView>

      {/* Floating frosted header */}
      <View style={[styles.frostedOverlay, { height: overlayH }]}>
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, { opacity: blurOpacity }]}
        >
          <BlurView intensity={60} tint="light" style={StyleSheet.absoluteFill} />
        </Animated.View>

        <View style={{ height: insets.top }} />

        <AppHeader
          title="Report Details"
          titlePosition="left"
          showBackButton
          onBackPress={() => navigation.goBack()}
          rightComponent={rightActions}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: HEADER_H,
  },
  contentCard: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
    zIndex: 10,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 6,
  },
  tabBody: {
    paddingTop: 14,
    paddingBottom: 24,
  },
  frostedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  appBarActions: {
    flexDirection: 'row',
    gap: 8,
  },
  appBarIcon: {
    width: 36,
    height: 36,
  },
});
