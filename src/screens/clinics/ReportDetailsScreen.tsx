import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import AppImage from '../../components/AppImage';
import BackgroundBlobs from '../../components/BackgroundBlobs';
import { AppImages } from '../../constants';
import { useTranslation } from '../../hooks/useTranslation';
import type { Theme } from '../../theme';
import { useTheme } from '../../theme';

const { width: SCREEN_W } = Dimensions.get('window');
const IMAGE_H = 300;
const EYE_PILL_H = 48;
// Approximate rendered height of AppHeader + SafeAreaView top inset.
// Used to push the image down so it starts below the fixed header.
const HEADER_H = 60;

const IMAGE_EYE_MAP: Record<number, EyeTab> = {
  0: 'Right OD',
  1: 'Left OS',
  2: 'Left OS',
};

const IMAGES = [
  { id: '1', source: AppImages.retinalImage },
  { id: '2', source: AppImages.retinalImage },
  { id: '3', source: AppImages.retinalImage },
];

type EyeTab = 'Right OD' | 'Left OS';
const CONTENT_TABS = ['Findings', 'Differential', 'Assessment', 'Plan', 'Instructions'] as const;
type ContentTab = (typeof CONTENT_TABS)[number];

// ─── Data ─────────────────────────────────────────────────────────────────────
const FINDINGS_DATA: Record<EyeTab, { bullets: string[]; summary: string }> = {
  'Right OD': {
    bullets: ['Microaneurysms (OD)', 'Retinal Hemorrhages (OD)', 'Hard Exudates (OD)'],
    summary:
      'OD (right) shows microaneurysms, retinal hemorrhages, and hard exudates on the recorded ophthalmic findings. No additional findings are documented for OS (left) or OU (bilateral) in the provided encounter details.',
  },
  'Left OS': {
    bullets: ['No significant findings'],
    summary: 'OS (left) shows no significant retinal pathology documented at this encounter.',
  },
};

const DIFFERENTIAL_DATA: Record<EyeTab, { title: string; body: string }[]> = {
  'Right OD': [
    {
      title: 'Nonproliferative diabetic retinopathy (OD)',
      body: 'The recorded triad of microaneurysms, retinal hemorrhages, and hard exudates is a classic retinal lesion pattern for diabetic retinopathy.',
    },
    {
      title: 'Retinal vein occlusion (OD)',
      body: 'Retinal hemorrhages and hard exudates can occur in retinal vascular occlusive disease.',
    },
  ],
  'Left OS': [
    {
      title: 'No differential diagnoses noted',
      body: 'No pathological findings were documented for the left eye at this encounter.',
    },
  ],
};

const ASSESSMENT_DATA: Record<
  EyeTab,
  { insight: string; codes: { code: string; label: string }[] }
> = {
  'Right OD': {
    insight:
      'OD findings are most consistent with nonproliferative diabetic retinopathy, as the combination of microaneurysms, retinal hemorrhages, and hard exudates matches recognized diabetic retinopathy lesion markers.',
    codes: [
      {
        code: 'E11.3291',
        label:
          'Type 2 diabetes mellitus with mild nonproliferative diabetic retinopathy without macular edema, right eye.',
      },
      { code: 'H34.8312', label: 'Tributary (branch) retinal vein occlusion, right eye, stable.' },
      { code: 'H34.8112', label: 'Central retinal vein occlusion, right eye, stable.' },
    ],
  },
  'Left OS': { insight: 'No significant findings for the left eye.', codes: [] },
};

const PLAN_DATA: Record<EyeTab, { body: string; followUp: string; bullets: string[] }> = {
  'Right OD': {
    body: 'Retina findings OD are monitored as mild nonproliferative diabetic retinopathy without documented macular edema.',
    followUp: 'Follow-up recommended in 3 months',
    bullets: [
      'We will obtain or review a scan of the center of the retina in your right eye to check for any hidden swelling.',
      'We will continue to watch your right eye for any changes over time.',
      'Please return in 3 months for a dilated eye exam and repeat retinal imaging.',
    ],
  },
  'Left OS': {
    body: 'No plan items for the left eye at this encounter.',
    followUp: '',
    bullets: [],
  },
};

const INSTRUCTIONS_DATA: Record<EyeTab, { urgent: string; body: string }> = {
  'Right OD': {
    urgent:
      'Call sooner if you notice any change in your vision or if you are told there is new swelling or blood vessel changes in the right eye.',
    body: 'We found mild diabetes-related changes in the back of your right eye. There is no swelling in the center of the retina documented at this time.\n\nNext steps:\n• We will obtain or review a scan of the center of the retina in your right eye.\n• We will continue to watch your right eye for any changes over time.\n• Please return in 3 months for a dilated eye exam.',
  },
  'Left OS': { urgent: '', body: 'No specific instructions for the left eye at this visit.' },
};

const CARE_RESOURCES = [
  {
    id: '1',
    type: 'video',
    duration: '10:12',
    title: 'How to read your vessel metrics',
    desc: 'Understand what A/V ratio, fractal dimension...',
    date: '3 Feb 2026',
  },
  {
    id: '2',
    type: 'doc',
    title: '5 Things You Should Know about Diabetic Eye Disease.',
    desc: 'Learn what happens during a retinal scan, wh...',
    date: '12 Jan 2026',
  },
  {
    id: '3',
    type: 'doc',
    title: 'What are lesions and why do they matter? (factsheet)',
    desc: 'Bright and red lesions can be early signs of diabetic...',
    date: '18 Jan 2026',
  },
  {
    id: '4',
    type: 'video',
    duration: '9:00',
    title: "Don't Lose Sight of Diabetic Eye Disease (factsheet)",
    desc: 'Learn what happens during a retinal scan, wh...',
    date: '15 Dec 2025',
  },
];

// ─── Tab components ───────────────────────────────────────────────────────────
function FindingsTab({ eye, styles }: { eye: EyeTab; styles: ReturnType<typeof createStyles> }) {
  const data = FINDINGS_DATA[eye];
  return (
    <>
      {data.bullets.map((b) => (
        <View key={b} style={styles.bulletRow}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{b}</Text>
        </View>
      ))}
      <Text style={styles.sectionLabel}>Summary</Text>
      <Text style={styles.bodyText}>{data.summary}</Text>
    </>
  );
}

function DifferentialTab({
  eye,
  styles,
}: {
  eye: EyeTab;
  styles: ReturnType<typeof createStyles>;
}) {
  return (
    <>
      {DIFFERENTIAL_DATA[eye].map((item) => (
        <View key={item.title} style={{ marginBottom: 16 }}>
          <Text style={styles.sectionLabel}>{item.title}</Text>
          <Text style={styles.bodyText}>{item.body}</Text>
        </View>
      ))}
    </>
  );
}

function AssessmentTab({
  eye,
  styles,
  theme,
}: {
  eye: EyeTab;
  styles: ReturnType<typeof createStyles>;
  theme: Theme;
}) {
  const data = ASSESSMENT_DATA[eye];
  return (
    <>
      <Text style={styles.sectionLabel}>Oculomics Research Insights</Text>
      <Text style={[styles.bodyText, { marginBottom: 16 }]}>{data.insight}</Text>
      {data.codes.length > 0 && (
        <>
          <Text style={styles.sectionLabel}>ICD-10 Code(s)</Text>
          {data.codes.map((c) => (
            <View key={c.code} style={{ marginBottom: 8 }}>
              <Text style={[styles.bodyText, { fontWeight: '700', color: theme.colors.text }]}>
                {c.code}
              </Text>
              <Text style={styles.bodyText}>{c.label}</Text>
            </View>
          ))}
        </>
      )}
    </>
  );
}

function PlanTab({ eye, styles }: { eye: EyeTab; styles: ReturnType<typeof createStyles> }) {
  const data = PLAN_DATA[eye];
  return (
    <>
      <Text style={[styles.bodyText, { marginBottom: 12 }]}>{data.body}</Text>
      {data.followUp ? (
        <TouchableOpacity style={styles.followUpBtn} activeOpacity={0.85}>
          <Text style={styles.followUpIcon}>↗</Text>
          <Text style={styles.followUpText}>{data.followUp}</Text>
        </TouchableOpacity>
      ) : null}
      {data.bullets.map((b) => (
        <View key={b} style={[styles.bulletRow, { marginTop: 8 }]}>
          <Text style={styles.bulletDot}>•</Text>
          <Text style={styles.bulletText}>{b}</Text>
        </View>
      ))}
    </>
  );
}

function InstructionsTab({
  eye,
  styles,
}: {
  eye: EyeTab;
  styles: ReturnType<typeof createStyles>;
}) {
  const data = INSTRUCTIONS_DATA[eye];
  return (
    <>
      <Text style={styles.bodyText}>{data.body}</Text>
      {data.urgent ? (
        <View style={styles.urgentBox}>
          <Text style={styles.urgentText}>{data.urgent}</Text>
        </View>
      ) : null}
    </>
  );
}

function CareResourceCard({
  item,
  styles,
  theme,
}: {
  item: (typeof CARE_RESOURCES)[0];
  styles: ReturnType<typeof createStyles>;
  theme: Theme;
}) {
  return (
    <View style={styles.careCard}>
      <View style={styles.careThumbnail}>
        {item.type === 'video' ? (
          <>
            <AppImage
              source={AppImages.retinalImage}
              containerStyle={StyleSheet.absoluteFill}
              contentFit="cover"
              showLoader={false}
            />
            <View style={styles.playBadge}>
              <Text style={styles.playBadgeText}>{item.duration}</Text>
            </View>
          </>
        ) : (
          <AppImage
            source={AppImages.visitPlaceholder}
            containerStyle={[
              StyleSheet.absoluteFill,
              { backgroundColor: theme.colors.accentLight, padding: 12 },
            ]}
            contentFit="contain"
            showLoader={false}
          />
        )}
      </View>
      <View style={styles.careCardBody}>
        <Text style={styles.careTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.careDesc} numberOfLines={2}>
          {item.desc}
        </Text>
        <Text style={styles.careDate}>{item.date}</Text>
      </View>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function ReportDetailsScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [imageIndex, setImageIndex] = useState(0);
  const [activeEye, setActiveEye] = useState<EyeTab>('Right OD');
  const [activeTab, setActiveTab] = useState<ContentTab>('Findings');
  const [isScrolled, setIsScrolled] = useState(false);
  const imageListRef = useRef<FlatList>(null);

  // 🔥 HEADER CONSTANTS
  const HEADER_ROW_H = 56;
  const overlayH = insets.top + HEADER_ROW_H;

  // 🔥 SCROLL ANIMATION
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const blurOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // Frosted kicks in once the image has scrolled past the header
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setIsScrolled(e.nativeEvent.contentOffset.y > IMAGE_H - HEADER_H);
  };

  const onImageScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_W);
    setImageIndex(idx);
    const mappedEye = IMAGE_EYE_MAP[idx];
    if (mappedEye) setActiveEye(mappedEye);
  };

  const goImage = (dir: -1 | 1) => {
    const next = Math.max(0, Math.min(IMAGES.length - 1, imageIndex + dir));
    imageListRef.current?.scrollToIndex({ index: next, animated: true });
    setImageIndex(next);
    const mappedEye = IMAGE_EYE_MAP[next];
    if (mappedEye) setActiveEye(mappedEye);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Findings':
        return <FindingsTab eye={activeEye} styles={styles} />;
      case 'Differential':
        return <DifferentialTab eye={activeEye} styles={styles} />;
      case 'Assessment':
        return <AssessmentTab eye={activeEye} styles={styles} theme={theme} />;
      case 'Plan':
        return <PlanTab eye={activeEye} styles={styles} />;
      case 'Instructions':
        return <InstructionsTab eye={activeEye} styles={styles} />;
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

      {/*
        ── Scrollable body — full height, starts at top of SafeAreaView ──
        The header floats above it via absolute positioning.
        A paddingTop on the ScrollView pushes the first item (image)
        below the header so nothing is hidden underneath it.
      */}
      <Animated.ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
            listener: onScroll,
          },
        )}
        scrollEventThrottle={16}
      >
        {/* ── Image carousel ── */}
        <View style={styles.imageSection}>
          <FlatList
            ref={imageListRef}
            data={IMAGES}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onImageScroll}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <AppImage
                source={item.source}
                containerStyle={{ width: SCREEN_W, height: IMAGE_H }}
                contentFit="cover"
                showLoader={false}
              />
            )}
          />

          {/* Date label */}
          <LinearGradient
            colors={['rgba(0,0,0,0.45)', 'transparent']}
            style={styles.topGradient}
            pointerEvents="none"
          >
            <Text style={styles.dateLabel}>Wednesday Dec 26, 2019</Text>
          </LinearGradient>

          {imageIndex > 0 && (
            <TouchableOpacity
              style={[styles.carouselArrow, styles.carouselArrowLeft]}
              onPress={() => goImage(-1)}
            >
              <Text style={styles.carouselArrowText}>‹</Text>
            </TouchableOpacity>
          )}
          {imageIndex < IMAGES.length - 1 && (
            <TouchableOpacity
              style={[styles.carouselArrow, styles.carouselArrowRight]}
              onPress={() => goImage(1)}
            >
              <Text style={styles.carouselArrowText}>›</Text>
            </TouchableOpacity>
          )}

          {/* Dots — sit above the pill */}
          <View style={styles.dotsWrap} pointerEvents="none">
            {IMAGES.map((_, i) => (
              <View key={i} style={[styles.dot, i === imageIndex && styles.dotActive]} />
            ))}
          </View>

          {/*
            Eye pill — bottom: -(EYE_PILL_H/2) so exactly 50% hangs below
            the image edge. overflow:visible on imageSection makes it visible.
          */}
          <View style={styles.eyePillContainer}>
            <View style={styles.eyePill}>
              <TouchableOpacity
                style={[
                  styles.eyePillOption,
                  activeEye === 'Right OD' && styles.eyePillOptionActive,
                ]}
                onPress={() => setActiveEye('Right OD')}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.eyePillOptionText,
                    activeEye === 'Right OD' && styles.eyePillOptionTextActive,
                  ]}
                >
                  Right OD
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.eyePillOption,
                  activeEye === 'Left OS' && styles.eyePillOptionActive,
                ]}
                onPress={() => setActiveEye('Left OS')}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.eyePillOptionText,
                    activeEye === 'Left OS' && styles.eyePillOptionTextActive,
                  ]}
                >
                  Left OS
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ── White content card — butts against image, tab bar below pill ── */}
        <View style={styles.contentCard}>
          {/* Spacer clears the pill that hangs over the card top */}
          <View style={{ height: EYE_PILL_H / 2 + 12 }} />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabBarInner}
          >
            {CONTENT_TABS.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={styles.tabBarItem}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
              >
                <Text style={[styles.tabBarText, activeTab === tab && styles.tabBarTextActive]}>
                  {tab}
                </Text>
                {activeTab === tab && <View style={styles.tabBarUnderline} />}
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View style={styles.tabDivider} />
          <View style={styles.tabBody}>{renderTabContent()}</View>

          <Text style={styles.afterCareTitle}>After Care Instructions</Text>
          <View style={styles.careList}>
            {CARE_RESOURCES.map((item) => (
              <CareResourceCard key={item.id} item={item} styles={styles} theme={theme} />
            ))}
          </View>
        </View>
      </Animated.ScrollView>

      {/*
        ── Floating AppHeader ──
        Rendered after ScrollView so it paints on top.
        • isScrolled=false (image visible) → variant='default': solid white bg,
          navy text — perfectly readable at all times.
        • isScrolled=true  (image scrolled away, white card fills screen)
          → variant='overlay' + scrolled=true: frosted glass blur kicks in,
          matching the notification-style translucency.
        pointerEvents='box-none' passes scroll touches through when needed.
      */}
      <View
        style={[
          styles.frostedOverlay,
          {
            height: overlayH,
          },
        ]}
      >
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              opacity: blurOpacity,
            },
          ]}
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

// ─── Styles ───────────────────────────────────────────────────────────────────
function createStyles(theme: Theme) {
  const NAVY = '#1B2B4B';

  return StyleSheet.create({
    screen: { flex: 1, backgroundColor: '#fff' },

    // Full-height scroll; paddingTop reserves space for the floating header
    scroll: { flex: 1 },
    scrollContent: { paddingTop: HEADER_H },

    // ── Image section ─────────────────────────────────────────────────────
    imageSection: {
      width: SCREEN_W,
      height: IMAGE_H,
      backgroundColor: '#000',
      overflow: 'visible', // lets the pill's bottom half show below
    },
    topGradient: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      paddingTop: 12,
      alignItems: 'center',
    },
    dateLabel: { fontSize: 13, color: '#fff', fontWeight: '500', letterSpacing: 0.2 },

    carouselArrow: {
      position: 'absolute',
      top: IMAGE_H / 2 - 22,
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(0,0,0,0.45)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    carouselArrowLeft: { left: 12 },
    carouselArrowRight: { right: 12 },
    carouselArrowText: { fontSize: 30, color: '#fff', fontWeight: '600', lineHeight: 36 },

    dotsWrap: {
      position: 'absolute',
      bottom: EYE_PILL_H + 10, // above the pill
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 5,
    },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.35)' },
    dotActive: { width: 20, height: 6, borderRadius: 3, backgroundColor: '#fff' },

    // ── Eye pill — 50% inside, 50% outside image section ─────────────────
    eyePillContainer: {
      position: 'absolute',
      bottom: -(EYE_PILL_H / 2),
      left: 20,
      right: 20,
      zIndex: 20,
      alignItems: 'center',
    },
    eyePill: {
      flexDirection: 'row',
      width: '100%',
      height: EYE_PILL_H,
      backgroundColor: '#fff',
      borderRadius: EYE_PILL_H / 2,
      padding: 4,
      shadowColor: '#000',
      shadowOpacity: 0.14,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 4 },
      elevation: 10,
    },
    eyePillOption: {
      flex: 1,
      borderRadius: EYE_PILL_H / 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    eyePillOptionActive: { backgroundColor: NAVY },
    eyePillOptionText: { fontSize: 15, fontWeight: '600', color: '#9CA3AF' },
    eyePillOptionTextActive: { color: '#fff', fontWeight: '700' },

    // ── White content card ────────────────────────────────────────────────
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

    tabBarInner: { flexDirection: 'row' },
    tabBarItem: {
      paddingVertical: 10,
      paddingHorizontal: 2,
      marginRight: 22,
      position: 'relative',
    },
    tabBarText: { fontSize: 15, color: theme.colors.textMuted, fontWeight: '500' },
    tabBarTextActive: { color: theme.colors.text, fontWeight: '700' },
    tabBarUnderline: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 2.5,
      borderRadius: 2,
      backgroundColor: theme.colors.text,
    },
    tabDivider: { height: 1, backgroundColor: theme.colors.border, opacity: 0.3, marginBottom: 4 },
    tabBody: { paddingTop: 14, paddingBottom: 24 },

    sectionLabel: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 6,
      marginTop: 10,
    },
    bodyText: { fontSize: 15, color: theme.colors.textMuted, lineHeight: 22 },
    bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
    bulletDot: {
      fontSize: 20,
      color: theme.colors.text,
      lineHeight: 24,
      marginRight: 10,
      marginTop: -2,
    },
    bulletText: { fontSize: 15, color: theme.colors.text, flex: 1, lineHeight: 22 },

    followUpBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F2F2F7',
      borderRadius: 12,
      padding: 14,
      gap: 8,
      marginVertical: 10,
    },
    followUpIcon: { fontSize: 16, color: theme.colors.text },
    followUpText: { fontSize: 14, fontWeight: '600', color: theme.colors.text },

    urgentBox: {
      marginTop: 14,
      backgroundColor: theme.colors.accentLight,
      borderRadius: 12,
      padding: 14,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.border,
    },
    urgentText: { fontSize: 14, color: theme.colors.text, lineHeight: 20 },

    afterCareTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginBottom: 14 },
    careList: { gap: 12 },
    careCard: {
      width: '100%',
      backgroundColor: '#F8F8F8',
      borderRadius: 16,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
    },
    careThumbnail: {
      width: 110,
      height: 90,
      flexShrink: 0,
      backgroundColor: theme.colors.accentLight,
    },
    playBadge: {
      position: 'absolute',
      bottom: 6,
      left: 6,
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderRadius: 4,
      paddingHorizontal: 6,
      paddingVertical: 2,
    },
    playBadgeText: { fontSize: 11, color: '#fff', fontWeight: '700' },
    careCardBody: { flex: 1, paddingHorizontal: 12, paddingVertical: 10 },
    careTitle: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 4,
      lineHeight: 18,
    },
    careDesc: { fontSize: 12, color: theme.colors.textMuted, lineHeight: 16, marginBottom: 4 },
    careDate: { fontSize: 11, color: theme.colors.textMuted },

    // Floats above everything, passes touches through transparent areas
    floatingHeader: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 },
    appBarActions: { flexDirection: 'row', gap: 8 },
    appBarIcon: { width: 36, height: 36 },
    frostedOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999,

      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 20,
      shadowOffset: {
        width: 0,
        height: 8,
      },

      elevation: 8,
    },
  });
}
