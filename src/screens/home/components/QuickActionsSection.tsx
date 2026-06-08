import { TouchableOpacity, View } from 'react-native';

import AppImage from '../../../components/AppImage';
import AppText from '../../../components/AppText';
import Card from '../../../components/Card';
import { useTheme } from '../../../theme';

import { QUICK_ACTIONS } from '../data/home.data';
import { quickActionsStyles } from '../styles/HomeQuickActions.styles';

interface Props {
  onVisitsPress: () => void;
  onAppointmentsPress: () => void;
}

export default function QuickActionsSection({ onVisitsPress, onAppointmentsPress }: Props) {
  const theme = useTheme();

  return (
    <View style={quickActionsStyles.quickActions}>
      {QUICK_ACTIONS.map((action) => (
        <TouchableOpacity
          key={action.key}
          style={quickActionsStyles.quickAction}
          onPress={() => {
            if (action.key === 'visits') {
              onVisitsPress();
            } else if (action.key === 'appts') {
              onAppointmentsPress();
            }
          }}
        >
          <Card elevated style={quickActionsStyles.quickActionCard} noPadding>
            <View style={quickActionsStyles.quickActionInner}>
              <AppImage source={action.icon} containerStyle={quickActionsStyles.quickActionIcon} />
            </View>
          </Card>

          <AppText
            variant="caption"
            color={theme.colors.text}
            style={quickActionsStyles.quickActionLabel}
          >
            {action.label}
          </AppText>
        </TouchableOpacity>
      ))}
    </View>
  );
}
