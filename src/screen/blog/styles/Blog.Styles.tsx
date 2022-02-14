import {StyleSheet} from 'react-native';
import {widthScale} from '../../../utils/Scaling';

export const BlogStyles = StyleSheet.create({
  contentContainerStyle: {
    paddingVertical: 6,
  },
  ItemSeparatorComponent: {
    flex: 1,
    height: 6,
  },
  viewImages: {
    height: widthScale(120),
    width: widthScale(100),
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  images: {
    width: '100%',
    height: '100%',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    // borderTopLeftRadius: 20,
  },
  pressable: {
    borderRadius: 16,
    marginHorizontal: 6,
    backgroundColor: 'gray',
    flexDirection: 'row',
    flex: 1,
  },
  viewTitles: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
});
