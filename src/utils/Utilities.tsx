import {Dimensions, PixelRatio, Platform} from 'react-native';

const {width, height} = Dimensions.get('screen');
export default class Utilities {
  static isAndroid = () => {
    return Platform.OS === 'android';
  };
  static getWidthScreen(isPixel?: any) {
    if (width < height) {
      if (isPixel) {
        return PixelRatio.getPixelSizeForLayoutSize(width);
      }
      return width;
    }
    if (isPixel) {
      return PixelRatio.getPixelSizeForLayoutSize(height);
    }
    return height;
  }
  static formatCurrency = (n: number | 0, currency: string) => {
    return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  };
  static convertCount(num: number | 0, currency: string) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + currency;
  }
  /**
   *
   * @param data VD:'2013-07-06T00:00:00.000Z'
   * @return "06/07/2013"
   * change dateTime to date
   */
  static convertDateTime(data: Date) {
    if (data) {
      var m = new Date(data);
      var dateString =
        ('0' + m.getUTCDate()).slice(-2) +
        '/' +
        ('0' + (m.getUTCMonth() + 1)).slice(-2) +
        '/' +
        m.getUTCFullYear();
      return dateString;
    }

    return (
      new Date().getDay() +
      '/' +
      new Date().getMonth() +
      '/' +
      new Date().getFullYear()
    );
  }
}
