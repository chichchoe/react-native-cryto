import {StyleSheet} from 'react-native';
import {widthScale} from '../../../utils/Scaling';
import Utilities from '../../../utils/Utilities';

export const HomeStyles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 16,
  },
  ItemSeparatorComponent: {
    flex: 1,
    height: 8,
  },
  viewImages: {
    height: widthScale(180),
    flex: 1,
  },
  images: {
    width: '100%',
    height: '100%',
  },
  imagesItem: {
    width: widthScale(Utilities.getWidthScreen() / 2),
    height: widthScale(Utilities.getWidthScreen() / 2),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
