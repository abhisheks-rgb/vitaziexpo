import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

import AppText from '../../../components/AppText';
import { Colors } from '../../../theme/colors';
import { bottomTabBarStyles } from '../styles/BottomTabBar.styles';

interface Props {
  label: string;
  icon: string;
  active: boolean;
  onPress: () => void;
}

export default function TabButton({ label, icon, active, onPress }: Props) {
  return (
    <TouchableOpacity style={bottomTabBarStyles.tab} onPress={onPress} activeOpacity={0.7}>
      <Feather name={icon as any} size={22} color={active ? Colors.navyDark : Colors.muted} />

      <AppText
        variant="caption"
        color={active ? Colors.navyDark : Colors.muted}
        style={bottomTabBarStyles.tabLabel}
      >
        {label}
      </AppText>
    </TouchableOpacity>
  );
}
