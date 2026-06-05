import React, { useRef, useState } from 'react';
import {
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
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../../components/AppHeader';
import AppImage from '../../components/AppImage';
import { AppImages } from '../../constants';
import { useTranslation } from '../../hooks/useTranslation';
import type { Theme } from '../../theme';
import { useTheme } from '../../theme';

const { width: SCREEN_W } = Dimensions.get('window');
const IMAGE_H = 300;
const CARD_OVERLAP = 140;

// ─── Mock data ────────────────────────────────────────────────────────────────
const IMAGES = [
  { id: '1', source: AppImages.retinalImage },
  { id: '2', source: AppImages.retinalImage },
  { id: '3', source: AppImages.retinalImage },
];

const EYE_TABS = ['Right OD', 'Left OS'] as const;
type EyeTab = (typeof EYE_TABS)[number];

const CONTENT_TABS = ['Findings', 'Differential', 'Assessment', 'Plan', 'Instructions'] as const;
type ContentTab = (typeof CONTENT_TABS)[number];

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
      body: 'The recorded triad of microaneurysms, retinal hemorrhages, and hard exudates is a classic retinal lesion pattern for diabetic retinopathy; the reference specifically identifies MAs, HMs, and EXs as pathological markers used in diabetic retinopathy-focused retinal imaging.',
    },
    {
      title: 'Retinal vein occlusion (OD)',
      body: 'Retinal hemorrhages and hard exudates can occur in retinal vascular occlusive disease, and the reviewed reference notes retinal vein occlusion as a vascular condition linked with retinal/systemic vascular pathology.',
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
      'OD findings are most consistent with nonproliferative diabetic retinopathy, as the combination of microaneurysms, retinal hemorrhages, and hard exudates matches recognized diabetic retinopathy lesion markers. Retinal vein occlusion remains a secondary consideration.',
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
      'Call sooner if you notice any change in your vision or if you are told there is new swelling or blood vessel changes in the right eye, since that may need retina specialist evaluation.',
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
    tag: 'Retinal-screening.pdf',
    title: '5 Things You Should Know about Diabetic Eye Disease.',
    desc: 'Learn what happens during a retinal scan, wh...',
    date: '12 Jan 2026',
  },
  {
    id: '3',
    type: 'doc',
    tag: 'Retinal-tutorial-ai.doc',
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

// ─── Tab content components ───────────────────────────────────────────────────

function FindingsTab({ eye, styles }: { eye: EyeTab; styles: ReturnType<typeof createStyles> }) {
  const data = FINDINGS_DATA[eye];
  return (
    <>
      {data.bullets.map((b) => (
        <View key={b} style={styles.bulletRow}>
          <View style={styles.bullet} />
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
          <View style={styles.bullet} />
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
            {/* Real retinal image as video thumbnail background */}
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
          /* Visit placeholder SVG for doc/pdf cards */
          <AppImage
            source={AppImages.visitPlaceholder}
            containerStyle={[
              StyleSheet.absoluteFill,
              { backgroundColor: theme.colors.accentLight, padding: 16 },
            ]}
            contentFit="contain"
            showLoader={false}
          />
        )}
      </View>
      <Text style={styles.careTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.careDesc} numberOfLines={2}>
        {item.desc}
      </Text>
      <Text style={styles.careDate}>{item.date}</Text>
    </View>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function ReportDetailsScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();

  const [imageIndex, setImageIndex] = useState(0);
  const [activeEye, setActiveEye] = useState<EyeTab>('Right OD');
  const [activeTab, setActiveTab] = useState<ContentTab>('Findings');
  const imageListRef = useRef<FlatList>(null);

  const onImageScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_W);
    setImageIndex(idx);
  };

  const goImage = (dir: -1 | 1) => {
    const next = Math.max(0, Math.min(IMAGES.length - 1, imageIndex + dir));
    imageListRef.current?.scrollToIndex({ index: next, animated: true });
    setImageIndex(next);
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
    <View style={styles.headerActions}>
      {/* Share icon via AppImage SVG */}
      <TouchableOpacity>
        <AppImage
          source={AppImages.share}
          containerStyle={styles.headerIconBtn}
          contentFit="contain"
          showLoader={false}
        />
      </TouchableOpacity>
      {/* Print icon via AppImage SVG */}
      <TouchableOpacity>
        <AppImage
          source={AppImages.print}
          containerStyle={styles.headerIconBtn}
          contentFit="contain"
          showLoader={false}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <AppHeader
        title={t('reportDetails')}
        titlePosition="left"
        showBackButton
        onBackPress={() => navigation.goBack()}
        rightComponent={rightActions}
      />

      {/* Date centered below header */}
      <Text style={styles.dateLabel}>Wednesday Dec 26, 2019</Text>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ── Image carousel ── */}
        <View style={styles.imageWrap}>
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

          {/* Left arrow — only when not on first image */}
          {imageIndex > 0 && (
            <TouchableOpacity
              style={[styles.carouselArrow, styles.carouselArrowLeft]}
              onPress={() => goImage(-1)}
            >
              <Text style={styles.carouselArrowText}>‹</Text>
            </TouchableOpacity>
          )}

          {/* Right arrow — only when not on last image */}
          {imageIndex < IMAGES.length - 1 && (
            <TouchableOpacity
              style={[styles.carouselArrow, styles.carouselArrowRight]}
              onPress={() => goImage(1)}
            >
              <Text style={styles.carouselArrowText}>›</Text>
            </TouchableOpacity>
          )}

          {/* Dot indicators — bottom right, update with imageIndex */}
          <View style={styles.dotsWrap}>
            {IMAGES.map((_, i) => (
              <View key={i} style={[styles.dot, i === imageIndex && styles.dotActive]} />
            ))}
          </View>
        </View>

        {/* ── Floating card overlapping image bottom ── */}
        <View style={styles.floatingCard}>
          {/* OD label + dot/pill image-index indicators */}
          <View style={styles.eyeLabelRow}>
            <Text style={styles.eyeLabel}>OD (Right) Macula</Text>
            <View style={styles.limeDots}>
              {IMAGES.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.limeDot,
                    i === imageIndex ? styles.limeDotActive : styles.limeDotInactive,
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Eye selector: Right OD / Left OS */}
          <View style={styles.eyeTabs}>
            {EYE_TABS.map((eye) => (
              <TouchableOpacity
                key={eye}
                style={[styles.eyeTab, activeEye === eye && styles.eyeTabActive]}
                onPress={() => setActiveEye(eye)}
                activeOpacity={0.8}
              >
                <Text style={[styles.eyeTabText, activeEye === eye && styles.eyeTabTextActive]}>
                  {eye}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Content tabs — scrollable horizontal */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.contentTabsScroll}
          >
            <View style={styles.contentTabs}>
              {CONTENT_TABS.map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={styles.contentTab}
                  onPress={() => setActiveTab(tab)}
                  activeOpacity={0.75}
                >
                  <Text
                    style={[
                      styles.contentTabText,
                      activeTab === tab && styles.contentTabTextActive,
                    ]}
                  >
                    {tab}
                  </Text>
                  {activeTab === tab && <View style={styles.contentTabUnderline} />}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Tab body */}
          <View style={styles.tabContent}>{renderTabContent()}</View>

          {/* After Care Instructions */}
          <Text style={styles.afterCareTitle}>After Care Instructions</Text>
          <View style={styles.careGrid}>
            {CARE_RESOURCES.map((item) => (
              <CareResourceCard key={item.id} item={item} styles={styles} theme={theme} />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
function createStyles(theme: Theme) {
  const CARE_CARD_W = (SCREEN_W - theme.spacing.md * 2 - 10) / 2;

  return StyleSheet.create({
    screen: { flex: 1, backgroundColor: theme.colors.background },

    // Header actions
    headerActions: { flexDirection: 'row', gap: 8 },
    headerIconBtn: {
      width: 36,
      height: 36,
    },

    // Date
    dateLabel: {
      textAlign: 'center',
      fontSize: 12,
      color: theme.colors.textMuted,
      paddingVertical: 6,
    },

    scroll: { flex: 1 },

    // ── Carousel ──────────────────────────────────────────────────────────────
    imageWrap: { width: SCREEN_W, height: IMAGE_H },

    carouselArrow: {
      position: 'absolute',
      top: '50%',
      marginTop: -20,
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(255,255,255,0.18)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    carouselArrowLeft: { left: 12 },
    carouselArrowRight: { right: 12 },
    carouselArrowText: { fontSize: 26, color: '#fff', fontWeight: '700', lineHeight: 32 },

    // Dots — bottom-right of image, track imageIndex
    dotsWrap: {
      position: 'absolute',
      bottom: CARD_OVERLAP + 10, // sit just above card top edge
      right: 16,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    dot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: 'rgba(255,255,255,0.35)',
    },
    dotActive: {
      width: 18,
      height: 6,
      borderRadius: 3,
      backgroundColor: '#fff',
    },

    // ── Floating card ─────────────────────────────────────────────────────────
    floatingCard: {
      marginTop: -CARD_OVERLAP,
      marginHorizontal: theme.spacing.md,
      backgroundColor: theme.colors.surface,
      borderRadius: 20,
      padding: 16,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: -4 },
      elevation: 8,
      marginBottom: 32,
    },

    // Eye label row — label left, image-index pill indicators right
    eyeLabelRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    eyeLabel: { fontSize: 15, fontWeight: '700', color: theme.colors.text },
    limeDots: { flexDirection: 'row', gap: 4, alignItems: 'center' },
    limeDot: {
      height: 8,
      borderRadius: 4,
    },
    limeDotActive: {
      width: 20,
      backgroundColor: theme.colors.limeAccent,
    },
    limeDotInactive: {
      width: 8,
      backgroundColor: theme.colors.border,
    },

    // Eye selector pill toggle
    eyeTabs: {
      flexDirection: 'row',
      backgroundColor: theme.colors.background,
      borderRadius: 10,
      padding: 3,
      marginBottom: 14,
    },
    eyeTab: { flex: 1, paddingVertical: 9, borderRadius: 8, alignItems: 'center' },
    eyeTabActive: { backgroundColor: theme.colors.text },
    eyeTabText: { fontSize: 13, fontWeight: '600', color: theme.colors.textMuted },
    eyeTabTextActive: { color: theme.colors.background },

    // Horizontal content tab bar
    contentTabsScroll: { marginBottom: 0 },
    contentTabs: { flexDirection: 'row' },
    contentTab: {
      paddingHorizontal: 2,
      paddingVertical: 8,
      marginRight: 20,
      position: 'relative',
    },
    contentTabText: { fontSize: 13, color: theme.colors.textMuted, fontWeight: '500' },
    contentTabTextActive: { color: theme.colors.text, fontWeight: '700' },
    contentTabUnderline: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 2,
      borderRadius: 1,
      backgroundColor: theme.colors.text,
    },

    // Tab body
    tabContent: { paddingTop: 12, paddingBottom: 20 },
    sectionLabel: {
      fontSize: 13,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 6,
      marginTop: 8,
    },
    bodyText: { fontSize: 13, color: theme.colors.textMuted, lineHeight: 20 },
    bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 },
    bullet: {
      width: 5,
      height: 5,
      borderRadius: 2.5,
      backgroundColor: theme.colors.text,
      marginTop: 7,
      marginRight: 8,
      flexShrink: 0,
    },
    bulletText: { fontSize: 13, color: theme.colors.text, flex: 1, lineHeight: 20 },

    followUpBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: 12,
      padding: 14,
      gap: 8,
      marginVertical: 10,
    },
    followUpIcon: { fontSize: 16, color: theme.colors.text },
    followUpText: { fontSize: 13, fontWeight: '600', color: theme.colors.text },

    urgentBox: {
      marginTop: 14,
      backgroundColor: theme.colors.accentLight,
      borderRadius: 12,
      padding: 14,
      borderLeftWidth: 3,
      borderLeftColor: theme.colors.border,
    },
    urgentText: { fontSize: 13, color: theme.colors.text, lineHeight: 20 },

    // After Care
    afterCareTitle: {
      fontSize: 15,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 12,
    },
    careGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    careCard: {
      width: CARE_CARD_W,
      backgroundColor: theme.colors.background,
      borderRadius: 12,
      overflow: 'hidden',
    },
    careThumbnail: {
      width: '100%',
      height: CARE_CARD_W * 0.65,
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 8,
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
    playBadgeText: { fontSize: 10, color: '#fff', fontWeight: '700' },
    careTitle: {
      fontSize: 12,
      fontWeight: '700',
      color: theme.colors.text,
      marginBottom: 3,
      lineHeight: 16,
    },
    careDesc: { fontSize: 11, color: theme.colors.textMuted, lineHeight: 15, marginBottom: 3 },
    careDate: { fontSize: 10, color: theme.colors.textMuted },
  });
}
