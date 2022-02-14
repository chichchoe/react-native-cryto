import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, Pressable} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {Text, TextH1} from '../../../components';
import {CoinMarket} from '../../../models';
import {translation} from '../../../translations';
import MyNavigator from '../../../utils/Mynavigation';
import {RootState} from '../../redux';
import TradeView from './TradeView';

export default function TopCoin() {
  const listTenMarkets = useSelector(
    (state: RootState) => state.HomeReducer.arrListTenMarkets,
  );
  const {t} = useTranslation();
  function renderItem({item}: {item: CoinMarket}) {
    return (
      <TradeView
        item={item}
        onClick={() => {
          MyNavigator.navigate('DetailCoin', {id: item.id});
        }}
      />
    );
  }
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 12,
        }}>
        <TextH1>Top Coin</TextH1>
        <Pressable
          onPress={() => {
            MyNavigator.navigate('ListMarket');
          }}>
          <Text>{t(translation.more)}</Text>
        </Pressable>
      </View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{padding: 8}}
        data={listTenMarkets}
        extraData={listTenMarkets}
        keyExtractor={(_item, index) => 'home' + index.toString()}
        ItemSeparatorComponent={() => {
          return <View style={{width: 8}} />;
        }}
        renderItem={renderItem}
      />
    </View>
  );
}
