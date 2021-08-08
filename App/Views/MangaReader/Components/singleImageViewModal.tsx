import { ReactElement, useCallback } from 'react';
import { StyleSheet, Image, View, BackHandler } from 'react-native';
import { Modal, Portal, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

interface Props {
  visible: boolean;
  onDismiss: () => void;
  imageUri: string;
}

export const SingleImageViewModal = ({
  visible,
  onDismiss,
  imageUri,
}: Props): ReactElement => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (visible) {
          onDismiss();
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [visible]),
  );

  return (
    <Portal>
      <Modal visible={visible}>
        <View>
          <Text
            style={{
              ...styles.modalHeader,
              top: -insets.top,
              height: insets.top,
              color: colors.primary,
              backgroundColor: colors.accent,
            }}>
            Double tap image to close
          </Text>
          <View
            style={{
              overflow: 'hidden',
              width: '100%',
              height: '100%',
            }}>
            <ReactNativeZoomableView
              maxZoom={2}
              minZoom={1}
              zoomStep={0}
              initialZoom={1.25}
              bindToBorders={true}
              doubleTapZoomToCenter={false}
              onDoubleTapAfter={onDismiss}
              style={{
                paddingHorizontal: 24,
              }}>
              <Image
                accessibilityIgnoresInvertColors
                resizeMode="contain"
                style={styles.mangaPage}
                source={{
                  uri: `${imageUri}`,
                }}
              />
            </ReactNativeZoomableView>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
const styles = StyleSheet.create({
  modalHeader: {
    position: 'absolute',
    width: '100%',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  mangaPage: {
    width: '100%',
    aspectRatio: 0.7,
  },
});
