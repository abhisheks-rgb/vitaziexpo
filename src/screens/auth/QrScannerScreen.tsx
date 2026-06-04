import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppHeader from '../../components/AppHeader';
import AppImage from '../../components/AppImage';
import AppText from '../../components/AppText';
import { AppImages } from '../../constants';
import { useTranslation } from '../../hooks/useTranslation';
import type { QRScannerScreenProps } from '../../navigation/types';
import { useTheme } from '../../theme';
import { Colors } from '../../theme/colors';
import { Radius } from '../../theme/radius';
import { Spacing } from '../../theme/spacing';

import { createStyles } from './styles/QRScanner.styles';

const VIEWFINDER_SIZE = 240;
const CORNER_SIZE = 28;
const CORNER_THICKNESS = 3;

export default function QRScannerScreen({ navigation, route }: QRScannerScreenProps) {
  const theme = useTheme();
  const styles = createStyles(theme);
  const { t } = useTranslation();
  const { source } = route.params;

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const scanLineY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!permission?.granted) requestPermission();
  }, []);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineY, {
          toValue: VIEWFINDER_SIZE - 2,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(scanLineY, { toValue: 0, duration: 2200, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [scanLineY]);

  const handleScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    if (source === 'register') {
      // Pass scanned orgId back to ConnectClinic
      navigation.replace('ConnectClinic', { orgId: data });
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.screen}>
      {permission?.granted ? (
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          onBarcodeScanned={handleScanned}
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.noCamera]}>
          <AppText variant="body" color={Colors.white}>
            Camera permission required
          </AppText>
        </View>
      )}

      <View style={styles.overlay} pointerEvents="none" />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <AppHeader
          showBackButton
          showLogo
          logoPosition="center"
          onBackPress={() => navigation.goBack()}
        />

        <View style={styles.viewfinderWrap}>
          <View style={styles.viewfinder}>
            <View style={[styles.corner, styles.corner_tl]} />
            <View style={[styles.corner, styles.corner_tr]} />
            <View style={[styles.corner, styles.corner_bl]} />
            <View style={[styles.corner, styles.corner_br]} />
            <Animated.View
              style={[styles.scanLine, { transform: [{ translateY: scanLineY }] }]}
              pointerEvents="none"
            />
          </View>
          <AppText variant="caption" color={Colors.white} style={styles.hint}>
            {t('qrScanner.hint')}
          </AppText>
        </View>

        <View style={styles.bottomBar}>
          <AppImage
            source={AppImages.scanner}
            containerStyle={styles.rescanBtn}
            contentFit="contain"
            showLoader={false}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
