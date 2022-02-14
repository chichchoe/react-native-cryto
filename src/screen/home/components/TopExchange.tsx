import React from 'react';
// import {useTranslation} from 'react-i18next';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {TextH1} from '../../../components';
import {ExchangesModel} from '../../../models';
// import {translation} from '../../../translations';
import {RootState} from '../../redux';
import ItemViewExchanges from './ItemViewExchanges';

export default function TopExchange() {
  const listTenExchanges = useSelector(
    (state: RootState) => state.HomeReducer.arrListTenExchanges,
  );
  // const {t} = useTranslation();
  function renderItemExchange({item}: {item: ExchangesModel}) {
    return (
      <ItemViewExchanges
        item={item}
        onClick={() => {
          // navigation.navigate('DetailHome');
        }}
      />
    );
  }
  return (
    <View style={{flex: 1}}>
      <TextH1 style={{margin: 12}}>Top Exchange</TextH1>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{padding: 8}}
        data={listTenExchanges}
        extraData={listTenExchanges}
        keyExtractor={(_item, index) => 'home' + index.toString()}
        ItemSeparatorComponent={() => {
          return <View style={{width: 8}} />;
        }}
        renderItem={renderItemExchange}
      />
    </View>
  );
}
