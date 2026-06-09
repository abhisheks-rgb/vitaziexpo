
  import { TouchableOpacity, View } from 'react-native';

  import { useTheme } from '../theme';
import { createStyles } from './styles';

  const RADIUS_PILL = 100;

  interface Props {
    onPress: () => void;
    isLoading?: boolean;
  }

  export function PlayButton({onPress, isLoading = false }: Props) {
    const theme = useTheme();
    const { commomComponentStyles } = createStyles(theme);

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isLoading}
        style={commomComponentStyles.playCircle}
      >
        <View >
          <View style={commomComponentStyles.playTriangle} />
        </View>
      </TouchableOpacity>
    );
  }





