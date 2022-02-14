import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {Text} from '../../../components';
import {widthScale} from '../../../utils/Scaling';
import {ExchangesModel} from '../../../models/Exchanges.Model';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {translation} from '../../../translations';
import Utilities from '../../../utils/Utilities';
interface IProps {
  item: ExchangesModel;
  onClick: () => void;
}

export default function ItemViewExchanges(props: IProps) {
  const {item} = props;
  const {t} = useTranslation();
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
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 24, marginRight: 8}}>{item.trust_score}</Text>
          <Ionicons name={'md-star'} size={26} color={'yellow'} />
        </View>
      </View>
      <Text style={{fontSize: 20, margin: 8}}>{item.name}</Text>
      <Text style={{fontSize: 16, marginHorizontal: 8, marginBottom: 10}}>
        {t(translation.volume)}:{' '}
        {Utilities.convertCount(Math.round(item.trade_volume_24h_btc) || 0, '')}
      </Text>
    </Pressable>
  );
}
const style = StyleSheet.create({
  imagesCoin: {
    width: widthScale(50),
    height: widthScale(50),
    borderRadius: widthScale(15),
    margin: 8,
  },
});
