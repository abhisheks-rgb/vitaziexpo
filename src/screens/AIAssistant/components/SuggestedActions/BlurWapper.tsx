import { BlurView } from 'expo-blur';
import type { ViewProps } from 'react-native';
import { Platform, View } from 'react-native';

interface Props extends ViewProps {}

export default function BlurWapper({ children, style }: Props) {
  return Platform.OS === 'ios' ? (
    <BlurView intensity={80} tint="systemUltraThinMaterialLight" style={style}>
      {children}
    </BlurView>
  ) : (
    <View style={style}>{children}</View>
  );
}
