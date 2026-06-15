import { BlurView } from 'expo-blur';
import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  FlatListProps,
  ImageBackground,
  ImageSourcePropType,
  ListRenderItem,
  RefreshControl,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { useTheme } from '../../theme';
import SmartListEmpty from './components/SmartListEmpty';
import SmartListLoader from './components/SmartListLoader';
import { createSmartListStyles, createSubHeaderElevationStyle } from './smartList.styles';

// Animated.FlatList loses its generic <T> type parameter, so re-type it here
// as a generic component to keep `data: T[]` / `renderItem` type-safe.
const AnimatedFlatList = Animated.FlatList as unknown as new <T>(
  props: FlatListProps<T> & { children?: React.ReactNode },
) => FlatList<T>;

// ─── Types ────────────────────────────────────────────────────────────────────

export enum SmartListViewMode {
  List = 'list',
  Grid = 'grid',
}

export enum SmartListTogglePlacement {
  Internal = 'internal',
  External = 'external',
  None = 'none',
}

export interface SmartListProps<T> {
  data: T[];
  renderItem: (item: T, index: number, viewMode: SmartListViewMode) => React.ReactElement;
  keyExtractor: (item: T, index: number) => string;
  numColumns?: number;
  onRefresh?: () => Promise<void>;
  onLoadMore?: (() => Promise<void>) | null;
  hasMore?: boolean;

  // ── Controlled view mode ─────────────────────────────────────────────────
  /**
   * When provided, SmartList operates in controlled mode.
   * The parent owns the state and drives the active view.
   * Use alongside onViewModeChange.
   */
  viewMode?: SmartListViewMode;
  /**
   * Fired when the internal toggle is pressed (uncontrolled mode)
   * or can be used to sync state in controlled mode.
   */
  onViewModeChange?: (mode: SmartListViewMode) => void;
  /** Initial view mode used only in uncontrolled mode (default: 'list') */
  defaultViewMode?: SmartListViewMode;

  // ── Toggle placement ─────────────────────────────────────────────────────
  /**
   * 'internal'  → toggle renders inside SmartList's sub-header row (default)
   * 'external'  → SmartList hides its own toggle; use the SmartListToggle
   *               component or build your own using viewMode + onViewModeChange.
   *               subHeaderLeft/subHeaderRight/subHeaderActions still render.
   * 'none'      → no toggle rendered at all (you manage everything externally).
   *               subHeaderLeft/subHeaderRight/subHeaderActions still render.
   */

  togglePlacement?: SmartListTogglePlacement;

  // ── Sub-header slots ─────────────────────────────────────────────────────
  /** Left slot in the sub-header row (e.g. section title) */
  subHeaderLeft?: React.ReactElement;
  /**
   * Right slot beside the toggle in the sub-header row.
   * Pass your Images switch or any control here.
   */
  subHeaderRight?: React.ReactElement;
  /**
   * Extra components rendered in the sub-header row when togglePlacement='internal'.
   * Injected between subHeaderRight and the toggle.
   * Pass an array of elements for multiple controls.
   */
  subHeaderActions?: React.ReactElement[];
  /** Pins the sub-header to the top while the list scrolls (default: false) */
  stickySubHeader?: boolean;
  /**
   * Style overrides for the sub-header container — e.g. custom background
   * color, borderRadius, etc. Merged after the default styles.
   * For padding, prefer subHeaderPadding* props below (they target the
   * inner content row, not the outer wrapper).
   */
  subHeaderStyle?: StyleProp<ViewStyle>;
  /**
   * Horizontal padding for the sub-header content row.
   * Defaults to `listPadding` (so it aligns with list content edges).
   * Overridden by subHeaderPaddingLeft / subHeaderPaddingRight if set.
   */
  subHeaderPaddingHorizontal?: number;
  /** Vertical padding for the sub-header content row (default: theme.spacing.sm) */
  subHeaderPaddingVertical?: number;
  /** Left padding for the sub-header content row. Overrides subHeaderPaddingHorizontal. */
  subHeaderPaddingLeft?: number;
  /** Right padding for the sub-header content row. Overrides subHeaderPaddingHorizontal. */
  subHeaderPaddingRight?: number;
  /** Top padding for the sub-header content row. Overrides subHeaderPaddingVertical. */
  subHeaderPaddingTop?: number;
  /** Bottom padding for the sub-header content row. Overrides subHeaderPaddingVertical. */
  subHeaderPaddingBottom?: number;
  /** Optional background image for the sub-header row (e.g. a brand banner). */
  subHeaderBackground?: ImageSourcePropType;
  /** Resize mode for subHeaderBackground (default: 'cover') */
  subHeaderBackgroundResizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  /**
   * Adds a drop shadow / elevation under the sub-header so it visually
   * separates from the list content (useful with stickySubHeader).
   * Pass `true` for a sensible default, or a number for custom elevation.
   */
  subHeaderElevation?: boolean | number;
  /**
   * When stickySubHeader is true, a frosted blur fades in behind the
   * sub-header as the list scrolls (matching ReportDetailsScreen's floating
   * header), so it blends with whatever is behind it (BackgroundBlobs,
   * images, etc.) instead of looking transparent or showing a hard color
   * swap. Pass `false` to disable the blur effect entirely.
   */
  subHeaderBlur?: boolean;
  /** Blur intensity 0-100 (default: 60) */
  subHeaderBlurIntensity?: number;
  /** Blur tint (default: 'light') */
  subHeaderBlurTint?: 'light' | 'dark' | 'default';
  /**
   * Scroll distance (px) over which the blur fades from 0 to full opacity
   * (default: 80).
   */
  subHeaderBlurFadeDistance?: number;

  // ── Empty / loading ──────────────────────────────────────────────────────
  EmptyComponent?: React.ReactElement;
  emptyMessage?: string;
  isLoading?: boolean;
  LoadingComponent?: React.ReactElement;
  loadingMessage?: string;

  // ── Layout ───────────────────────────────────────────────────────────────
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  gridGap?: number;
  listPadding?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SmartList<T>({
  data,
  renderItem,
  keyExtractor,
  numColumns = 2,
  onRefresh,
  onLoadMore,
  hasMore = false,
  // controlled
  viewMode: controlledViewMode,
  onViewModeChange,
  defaultViewMode = SmartListViewMode.List,
  // toggle
  togglePlacement = SmartListTogglePlacement.Internal,
  // sub-header
  subHeaderLeft,
  subHeaderRight,
  subHeaderActions,
  stickySubHeader = false,
  subHeaderStyle,
  subHeaderPaddingHorizontal,
  subHeaderPaddingVertical,
  subHeaderPaddingLeft,
  subHeaderPaddingRight,
  subHeaderPaddingTop,
  subHeaderPaddingBottom,
  subHeaderBackground,
  subHeaderBackgroundResizeMode = 'cover',
  subHeaderElevation = false,
  subHeaderBlur = true,
  subHeaderBlurIntensity = 60,
  subHeaderBlurTint = 'light',
  subHeaderBlurFadeDistance = 80,
  // empty/loading
  EmptyComponent,
  emptyMessage,
  isLoading = false,
  LoadingComponent,
  loadingMessage,
  // layout
  containerStyle,
  contentContainerStyle,
  gridGap = 12,
  listPadding = 16,
}: SmartListProps<T>) {
  const theme = useTheme();
  const styles = createSmartListStyles(theme);

  // Uncontrolled internal state — ignored when controlledViewMode is provided
  const [internalViewMode, setInternalViewMode] = useState<SmartListViewMode>(defaultViewMode);

  // Resolved view mode: controlled wins over internal
  const viewMode = controlledViewMode ?? internalViewMode;
  const isGrid = viewMode === SmartListViewMode.Grid;

  const handleViewModeChange = useCallback(
    (mode: SmartListViewMode) => {
      if (!controlledViewMode) {
        // Uncontrolled: update internal state
        setInternalViewMode(mode);
      }
      // Always fire the callback so the parent can sync
      onViewModeChange?.(mode);
    },
    [controlledViewMode, onViewModeChange],
  );

  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const activeColor = theme.colors.textPrimary;
  const inactiveColor = theme.colors.textSecondary;

  // ── Sticky sub-header blur fade ───────────────────────────────────────────
  const scrollY = useRef(new Animated.Value(0)).current;
  const blurOpacity = scrollY.interpolate({
    inputRange: [0, Math.max(subHeaderBlurFadeDistance, 1)],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
    useNativeDriver: true,
  });

  // ── Pull to refresh ───────────────────────────────────────────────────────
  const handleRefresh = useCallback(async () => {
    if (!onRefresh) return;
    setRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  // ── Load more ─────────────────────────────────────────────────────────────
  const handleEndReached = useCallback(async () => {
    if (!onLoadMore || !hasMore || loadingMore || refreshing) return;
    setLoadingMore(true);
    try {
      await onLoadMore();
    } finally {
      setLoadingMore(false);
    }
  }, [onLoadMore, hasMore, loadingMore, refreshing]);

  // ── FlatList render item ──────────────────────────────────────────────────
  const flatListRenderItem: ListRenderItem<T> = useCallback(
    ({ item, index }) => {
      const element = renderItem(item, index, viewMode);
      if (!isGrid) return element;
      return (
        <View
          style={[styles.gridItemWrapper, { marginLeft: index % numColumns !== 0 ? gridGap : 0 }]}
        >
          {element}
        </View>
      );
    },
    [renderItem, viewMode, isGrid, numColumns, gridGap, styles],
  );

  // ── Load-more footer ──────────────────────────────────────────────────────
  const ListFooter = useCallback(() => (loadingMore ? <SmartListLoader /> : null), [loadingMore]);

  // ── Toggle element (internal use) ─────────────────────────────────────────
  const InternalToggle = (
    <SmartListToggle
      viewMode={viewMode}
      onViewModeChange={handleViewModeChange}
      activeColor={activeColor}
      inactiveColor={inactiveColor}
      styles={styles}
    />
  );

  // ── Sub-header row ────────────────────────────────────────────────────────
  // Render the sub-header whenever there's content to show — the internal
  // toggle and the left/right/action slots are independent. This ensures
  // subHeaderLeft / subHeaderRight / subHeaderActions still render when
  // togglePlacement is 'external' or 'none' (e.g. an external Images switch
  // or section title), instead of being silently dropped.
  const hasSubHeaderContent = Boolean(
    subHeaderLeft || subHeaderRight || (subHeaderActions && subHeaderActions.length > 0),
  );
  const showInternalToggle = togglePlacement === SmartListTogglePlacement.Internal;
  const showSubHeader = showInternalToggle || hasSubHeaderContent;

  const elevationStyle =
    subHeaderElevation === false
      ? null
      : createSubHeaderElevationStyle(subHeaderElevation === true ? undefined : subHeaderElevation);

  // Sub-header padding is independent from list padding by default it
  // mirrors listPadding/theme.spacing.sm for visual alignment, but every
  // side can be overridden individually.
  const subHeaderPaddingStyle: ViewStyle = {
    paddingLeft: subHeaderPaddingLeft ?? subHeaderPaddingHorizontal ?? listPadding,
    paddingRight: subHeaderPaddingRight ?? subHeaderPaddingHorizontal ?? listPadding,
    paddingTop: subHeaderPaddingTop ?? subHeaderPaddingVertical ?? theme.spacing.sm,
    paddingBottom: subHeaderPaddingBottom ?? subHeaderPaddingVertical ?? theme.spacing.sm,
  };

  const subHeaderContent = (
    <View style={[styles.subHeaderRow, subHeaderPaddingStyle]}>
      {subHeaderLeft ?? <View />}
      <View style={styles.subHeaderRight}>
        {subHeaderActions?.map((action, i) => (
          <React.Fragment key={i}>{action}</React.Fragment>
        ))}
        {subHeaderRight}
        {showInternalToggle && InternalToggle}
      </View>
    </View>
  );

  const useStickyHeader = stickySubHeader && showSubHeader;

  // Blur fades in behind the sub-header as the list scrolls (only when
  // sticky), blending with whatever is underneath (BackgroundBlobs, images,
  // content) instead of a hard background-color swap.
  const showBlur = useStickyHeader && subHeaderBlur;

  // When used as a sticky ListHeaderComponent, the sub-header inherits the
  // FlatList content container's horizontal padding (listPadding), which
  // creates side gaps. Counteract it with negative margins so the sub-header
  // spans the full width edge-to-edge; the inner subHeaderContent keeps its
  // own padding via subHeaderPadding* props.
  const edgeToEdgeStyle: ViewStyle | null = useStickyHeader
    ? { marginHorizontal: -listPadding }
    : null;

  const SubHeader = showSubHeader ? (
    <View style={[styles.subHeader, edgeToEdgeStyle, elevationStyle, subHeaderStyle]}>
      {showBlur && (
        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, { opacity: blurOpacity }]}
        >
          <BlurView
            intensity={subHeaderBlurIntensity}
            tint={subHeaderBlurTint}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      )}
      {subHeaderBackground ? (
        <ImageBackground
          source={subHeaderBackground}
          resizeMode={subHeaderBackgroundResizeMode}
          style={styles.subHeaderBackground}
        >
          {subHeaderContent}
        </ImageBackground>
      ) : (
        subHeaderContent
      )}
    </View>
  ) : null;

  // ── Resolved empty / loader ───────────────────────────────────────────────
  const resolvedEmpty = EmptyComponent ?? <SmartListEmpty message={emptyMessage} />;
  const resolvedLoader = LoadingComponent ?? <SmartListLoader message={loadingMessage} />;

  // ── Full-screen loader ────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <View style={[styles.container, containerStyle]}>
        {!useStickyHeader && SubHeader}
        {resolvedLoader}
      </View>
    );
  }

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <View style={[styles.container, containerStyle]}>
      {!useStickyHeader && SubHeader}
      <AnimatedFlatList<T>
        key={isGrid ? `${SmartListViewMode.Grid}-${numColumns}` : SmartListViewMode.List}
        data={data}
        renderItem={flatListRenderItem}
        keyExtractor={keyExtractor}
        numColumns={isGrid ? numColumns : 1}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {
            paddingHorizontal: listPadding,
            paddingBottom: 24,
            paddingTop: theme.spacing.sm,
          },
          data.length === 0 && styles.emptyContent,
          contentContainerStyle,
        ]}
        columnWrapperStyle={
          isGrid && numColumns > 1 ? { gap: gridGap, marginBottom: gridGap } : undefined
        }
        ListHeaderComponent={useStickyHeader ? SubHeader : undefined}
        stickyHeaderIndices={useStickyHeader ? [0] : undefined}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={theme.colors.primary}
              colors={[theme.colors.primary]}
            />
          ) : undefined
        }
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        onScroll={useStickyHeader ? (handleScroll as (...args: unknown[]) => void) : undefined}
        scrollEventThrottle={useStickyHeader ? 16 : undefined}
        ListFooterComponent={ListFooter}
        ListEmptyComponent={resolvedEmpty}
        ItemSeparatorComponent={!isGrid ? () => <View style={styles.separator} /> : undefined}
      />
    </View>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SmartListToggle — exported so the parent can place it anywhere
// (AppHeader rightComponent, toolbar, bottom tab, wherever)
// ─────────────────────────────────────────────────────────────────────────────

export interface SmartListToggleProps {
  viewMode: SmartListViewMode;
  onViewModeChange: (mode: SmartListViewMode) => void;
  activeColor?: string;
  inactiveColor?: string;
  /** Optional pre-built styles; if omitted the component calls useTheme itself */
  styles?: ReturnType<typeof createSmartListStyles>;
}

export function SmartListToggle({
  viewMode,
  onViewModeChange,
  activeColor,
  inactiveColor,
  styles: externalStyles,
}: SmartListToggleProps) {
  const theme = useTheme();
  const styles = externalStyles ?? createSmartListStyles(theme);
  const isGrid = viewMode === SmartListViewMode.Grid;
  const active = activeColor ?? theme.colors.textPrimary;
  const inactive = inactiveColor ?? theme.colors.textSecondary;

  return (
    <View style={styles.toggleWrap}>
      <TouchableOpacity
        style={[styles.toggleBtn, !isGrid && styles.toggleBtnActive]}
        onPress={() => onViewModeChange(SmartListViewMode.List)}
        activeOpacity={0.7}
        accessibilityLabel="List view"
      >
        <ListIcon color={!isGrid ? active : inactive} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.toggleBtn, isGrid && styles.toggleBtnActive]}
        onPress={() => onViewModeChange(SmartListViewMode.Grid)}
        activeOpacity={0.7}
        accessibilityLabel="Grid view"
      >
        <GridIcon color={isGrid ? active : inactive} />
      </TouchableOpacity>
    </View>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function ListIcon({ color }: { color: string }) {
  return (
    <View style={{ gap: 3, paddingHorizontal: 2 }}>
      {[0, 1, 2].map((i) => (
        <View key={i} style={{ height: 2, width: 18, borderRadius: 1, backgroundColor: color }} />
      ))}
    </View>
  );
}

function GridIcon({ color }: { color: string }) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: 18, gap: 3 }}>
      {[0, 1, 2, 3].map((i) => (
        <View key={i} style={{ width: 7, height: 7, borderRadius: 1.5, backgroundColor: color }} />
      ))}
    </View>
  );
}
