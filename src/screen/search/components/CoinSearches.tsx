import React from 'react';
import {View, StyleSheet, Pressable, Image} from 'react-native';
import {Text, TextH3} from '../../../components';
import {CoinSearch} from '../../../models/Search.Model';
import MyNavigator from '../../../utils/Mynavigation';

interface IProps {
  listCoin: CoinSearch[];
}

export default function CoinSearches(props: IProps) {
  if (props.listCoin.length <= 0) {
    return <View />;
  }
  return (
    <View style={{flex: 1, backgroundColor: 'transparent'}}>
      <View style={styles.viewHotTrending}>
        <TextH3>Coins</TextH3>
      </View>
      {props.listCoin.map((value, index) => {
        if (index >= 10) {
          return;
        }
        return (
          <Pressable
            key={index.toString()}
            style={styles.viewMap}
            onPress={() => {
              MyNavigator.navigate('DetailCoin', {id: value.id});
            }}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{width: 30, height: 30, backgroundColor: 'white'}}
                source={{
                  uri: value.thumb,
                }}
                resizeMode="cover"
              />
              <Text style={{marginLeft: 16}}>
                {value.name + ` (${value.symbol})`}{' '}
              </Text>
            </View>
            <Text style={{marginRight: 16}}>#{value.market_cap_rank}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  viewMap: {
    padding: 8,
    height: 50,
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
    alignItems: 'center',
  },
  viewHotTrending: {
    height: 50,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
