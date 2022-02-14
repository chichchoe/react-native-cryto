import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLOR} from '../../../../common/Color';
import {Text} from '../../../../components';
import {MarketData} from '../../../../models/CoinDetail';
import Utilities from '../../../../utils/Utilities';
interface IProps {
  marketData?: MarketData;
}

export function InfoPrice(props: IProps) {
  if (props.marketData) {
    const {
      market_cap_rank,
      market_cap,
      fully_diluted_valuation,
      total_volume,
      high_24h,
      low_24h,
      circulating_supply,
      total_supply,
      ath,
      ath_change_percentage,
      ath_date,
      atl,
      atl_change_percentage,
      atl_date,
    } = props.marketData;
    return (
      <View style={{flex: 1, marginHorizontal: 16}}>
        <View style={styles.viewRow}>
          <Text style={styles.textName}>xep hang von hoa</Text>
          <Text style={styles.textValue}>{market_cap_rank}</Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.textName}>xep hang von hoa</Text>
          <Text style={styles.textValue}>
            {Utilities.convertCount(market_cap.usd || 0, ' $')}
          </Text>
        </View>
        {fully_diluted_valuation.usd ? (
          <View style={styles.viewRow}>
            <Text style={styles.textName}>Fully diluted valuation</Text>
            <Text style={styles.textValue}>
              {Utilities.convertCount(fully_diluted_valuation.usd || 0, ' $')}
            </Text>
          </View>
        ) : null}
        <View style={styles.viewRow}>
          <Text style={styles.textName}>khoi luong giao dich</Text>
          <Text style={styles.textValue}>
            {Utilities.convertCount(total_volume.usd || 0, ' $')}
          </Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.textName}>cao nhat trong 24H</Text>
          <Text style={styles.textValue}>
            {Utilities.formatCurrency(high_24h.usd || 0, '$ ')}
          </Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.textName}>thap nhat trong 24H</Text>
          <Text style={styles.textValue}>
            {Utilities.formatCurrency(low_24h.usd || 0, '$ ')}
          </Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.textName}>nguon kha dung</Text>
          <Text style={styles.textValue}>
            {Utilities.formatCurrency(circulating_supply || 0, '')}
          </Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.textName}>Tong cung</Text>
          <Text style={styles.textValue}>
            {Utilities.formatCurrency(total_supply || 0, '')}
          </Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.textName}>Cao nhat moi thoi dai</Text>
          <Text style={styles.textValue}>
            {Utilities.formatCurrency(ath.usd || 0, '$ ')}
          </Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.textName}>tu luc cao nhat moi thoi dai</Text>
          <Text
            style={[
              styles.textValue,
              {
                color: ath_change_percentage.usd >= 0 ? COLOR.BLUE : COLOR.RED,
              },
            ]}>
            {Utilities.formatCurrency(ath_change_percentage.usd || 0, '')} %
          </Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.textName}>thoi gian cao nhat</Text>
          <Text style={styles.textValue}>
            {Utilities.convertDateTime(ath_date.usd || new Date())}
          </Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.textName}>Thap nhat moi thoi dai</Text>
          <Text style={styles.textValue}>
            {Utilities.formatCurrency(atl.usd || 0, '$ ')}
          </Text>
        </View>
        <View style={styles.viewRow}>
          <Text style={styles.textName}>tu luc Thap nhat moi thoi dai</Text>
          <Text
            style={[
              styles.textValue,
              {
                color: atl_change_percentage.usd >= 0 ? COLOR.BLUE : COLOR.RED,
              },
            ]}>
            {Utilities.formatCurrency(atl_change_percentage.usd || 0, '')} %
          </Text>
        </View>
        <View style={[styles.viewRow, {marginBottom: 16}]}>
          <Text style={styles.textName}>thoi gian Thap nhat</Text>
          <Text style={styles.textValue}>
            {Utilities.convertDateTime(atl_date.usd || new Date())}
          </Text>
        </View>
      </View>
    );
  }
  return <View />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  textName: {
    textTransform: 'uppercase',
    flex: 1,
  },
  textValue: {
    flex: 1,
    textAlign: 'right',
  },
});
