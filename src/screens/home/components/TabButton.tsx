import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import AppText from '../../../components/AppText';
import { useTheme } from '../../../theme';
import { bottomTabBarStyles } from '../styles/BottomTabBar.styles';

interface Props {
  label: string;
  icon: string;
  active: boolean;
  onPress: () => void;
}

export default function TabButton({ label, icon, active, onPress }: Props) {
  const theme = useTheme();
  const iconColor = active ? theme.colors.textPrimary : theme.colors.textSecondary;

  return (
    <TouchableOpacity style={bottomTabBarStyles.tab} onPress={onPress} activeOpacity={0.7}>
      <Feather name={icon as any} size={22} color={iconColor} />
      <AppText variant="caption" color={iconColor}>
        {label}
      </AppText>
    </TouchableOpacity>
  );
}
