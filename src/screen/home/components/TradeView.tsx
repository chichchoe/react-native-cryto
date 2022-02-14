import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Text} from '../../../components';
import {CoinMarket} from '../../../models/CoinMarket.Model';
import {widthScale} from '../../../utils/Scaling';
import {LineChart} from 'react-native-chart-kit';
import Utilities from '../../../utils/Utilities';
import {COLOR} from '../../../common/Color';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface IProps {
  item: CoinMarket;
  onClick: () => void;
}

export default function TradeView(props: IProps) {
  const {item} = props;
  let arrChart = item.sparkline_in_7d?.price || [];
  let customPercentage: string = '';
  let colorText: string = '';
  let nameIcon = 'caret-down';
  if (item.price_change_percentage_24h) {
    colorText = item.price_change_percentage_24h > 0 ? COLOR.BLUE : COLOR.RED;
    customPercentage =
      item.price_change_percentage_24h > 0
        ? item.price_change_percentage_24h.toFixed(2)
        : item.price_change_percentage_24h.toFixed(2).slice(1);
    nameIcon = item.price_change_percentage_24h > 0 ? 'caret-up' : 'caret-down';
  }

  return (
    <Pressable
      onPress={props.onClick}
      style={{backgroundColor: '#8DD8FC', borderRadius: 16}}>
      <View
        style={{
          flexDirection: 'row',
          width: widthScale(160),
          alignItems: 'center',
        }}>
        <Image
          style={style.imagesCoin}
          source={{
            uri: item.image,
          }}
          resizeMode="cover"
        />
        <View
          style={{
            flex: 1,
            marginTop: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LineChart
            bezier
            data={{
              labels: [],
              datasets: [
                {
                  data: arrChart,
                },
              ],
            }}
            width={widthScale(90)}
            height={widthScale(50)}
            style={{paddingRight: 0, backgroundColor: 'transparent'}}
            chartConfig={{
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0,
              color: () => colorText,
            }}
            withVerticalLabels={false}
            withHorizontalLines={false}
            withDots={false}
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLines={false}
          />
        </View>
      </View>
      <Text style={{fontSize: 20, margin: 6}}>{item.name}</Text>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
        <Text style={{fontSize: 16, marginLeft: 6}}>
          {Utilities.formatCurrency(item.current_price || 0, '$ ')}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 16,
            alignItems: 'center',
          }}>
          <FontAwesome5 name={nameIcon} size={18} color={colorText} />
          <Text
            style={{
              color: colorText,
            }}>
            {' ' + customPercentage + ' '}%
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
const style = StyleSheet.create({
  imagesCoin: {
    width: widthScale(50),
    height: widthScale(50),

    margin: 8,
  },
});
