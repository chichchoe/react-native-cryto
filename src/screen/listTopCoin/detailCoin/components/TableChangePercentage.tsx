import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLOR} from '../../../../common/Color';
import {Text} from '../../../../components';
import {MarketData} from '../../../../models/CoinDetail';

interface IProps {
  marketData?: MarketData;
}

export function TableChangePercentage(props: IProps) {
  if (props.marketData) {
    const {
      price_change_percentage_24h,
      price_change_percentage_7d,
      price_change_percentage_14d,
      price_change_percentage_30d,
      price_change_percentage_60d,
      price_change_percentage_1y,
    } = props.marketData;
    return (
      <View style={style.container}>
        <View style={style.itemTable}>
          <View style={style.viewHeaderTable}>
            <Text>24h</Text>
          </View>
          <Text
            style={{
              textAlign: 'center',
              color: price_change_percentage_24h >= 0 ? COLOR.BLUE : COLOR.RED,
            }}>
            {price_change_percentage_24h.toFixed(2)}%
          </Text>
        </View>
        <View style={style.itemTable}>
          <View style={style.viewHeaderTable}>
            <Text>7d</Text>
          </View>
          <Text
            style={{
              textAlign: 'center',
              color: price_change_percentage_7d >= 0 ? COLOR.BLUE : COLOR.RED,
            }}>
            {price_change_percentage_7d.toFixed(2)}%
          </Text>
        </View>
        <View style={style.itemTable}>
          <View style={style.viewHeaderTable}>
            <Text>14D</Text>
          </View>
          <Text
            style={{
              textAlign: 'center',
              color: price_change_percentage_14d >= 0 ? COLOR.BLUE : COLOR.RED,
            }}>
            {price_change_percentage_14d.toFixed(2)}%
          </Text>
        </View>
        <View style={style.itemTable}>
          <View style={style.viewHeaderTable}>
            <Text>30D</Text>
          </View>
          <Text
            style={{
              textAlign: 'center',
              color: price_change_percentage_30d >= 0 ? COLOR.BLUE : COLOR.RED,
            }}>
            {price_change_percentage_30d.toFixed(2)}%
          </Text>
        </View>
        <View style={style.itemTable}>
          <View style={style.viewHeaderTable}>
            <Text>60D</Text>
          </View>
          <Text
            style={{
              textAlign: 'center',
              color: price_change_percentage_60d >= 0 ? COLOR.BLUE : COLOR.RED,
            }}>
            {price_change_percentage_60d.toFixed(2)}%
          </Text>
        </View>
        <View style={style.itemTable}>
          <View style={style.viewHeaderTable}>
            <Text>1Y</Text>
          </View>
          <Text
            style={{
              textAlign: 'center',
              color: price_change_percentage_1y >= 0 ? COLOR.BLUE : COLOR.RED,
            }}>
            {price_change_percentage_1y.toFixed(2)}%
          </Text>
        </View>
      </View>
    );
  }
  return <View />;
}
const style = StyleSheet.create({
  container: {flexDirection: 'row', padding: 4},
  itemTable: {
    flex: 1,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
  },
  viewHeaderTable: {
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
  },
});
