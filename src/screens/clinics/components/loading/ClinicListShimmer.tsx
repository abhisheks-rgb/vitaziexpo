import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import { useTheme } from '../../../../theme';

const ShimmerBar = ({
  width,
  height,
  style,
}: {
  width: number | string;
  height: number;
  style?: any;
}) => {
  const theme = useTheme();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 900, useNativeDriver: true }),
      ]),
    ).start();
  }, []);

  const opacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 0.7] });

  return (
    <Animated.View
      style={[
        { width, height, borderRadius: 6, backgroundColor: theme.colors.textMuted, opacity },
        style,
      ]}
    />
  );
};

// Single list row skeleton
const ListRowSkeleton = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        backgroundColor: theme.colors.surface, // adjust to your theme token
        gap: 12,
      }}
    >
      <ShimmerBar width={52} height={52} style={{ borderRadius: 10 }} />
      <View style={{ flex: 1, gap: 8 }}>
        <ShimmerBar width="60%" height={14} />
        <ShimmerBar width="40%" height={11} />
      </View>
      <ShimmerBar width={24} height={24} style={{ borderRadius: 12 }} />
    </View>
  );
};

// Single grid card skeleton
const GridCardSkeleton = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        width: '48%',
        padding: 14,
        borderRadius: 12,
        backgroundColor: theme.colors.surface,
        gap: 10,
      }}
    >
      <ShimmerBar width={44} height={44} style={{ borderRadius: 10 }} />
      <ShimmerBar width="70%" height={13} />
      <ShimmerBar width="50%" height={11} />
    </View>
  );
};

export const ClinicListShimmer = ({ isGrid }: { isGrid: boolean }) => {
  if (isGrid) {
    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <GridCardSkeleton key={i} />
        ))}
      </View>
    );
  }
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <ListRowSkeleton key={i} />
      ))}
    </>
  );
};
