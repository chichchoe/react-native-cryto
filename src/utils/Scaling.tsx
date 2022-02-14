import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

// Sample design screen size: iPhone 11 Pro/X Plus
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * STUB
 * - Calculate scale to width
 * - Width to be calculated compared to the width of the design
 */
const widthScale = (size: number) => (width / guidelineBaseWidth) * size;

/**
 * STUB
 * - Calculate scale to height
 *  - The height to be calculated compared to the height of the design
 */
const heightScale = (size: number) => (height / guidelineBaseHeight) * size;

/**
 * STUB
 * -Calculate scale by factor
 */
const moderateScale = (size: number, factor: number = 0.5) =>
  size + (widthScale(size) - size) * factor;

export {heightScale, moderateScale, widthScale};
