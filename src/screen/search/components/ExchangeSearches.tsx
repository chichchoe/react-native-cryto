import React from 'react';
import {View, StyleSheet, Pressable, Image} from 'react-native';
import {Text, TextH3} from '../../../components';
import {ExchangeSearch} from '../../../models/Search.Model';

interface IProps {
  listExchange: ExchangeSearch[];
}

export default function ExchangeSearches(props: IProps) {
  if (props.listExchange.length <= 0) {
    return <View />;
  }
  return (
    <View style={{flex: 1, backgroundColor: 'transparent'}}>
      <View style={styles.viewHotTrending}>
        <TextH3>San Giao dich</TextH3>
      </View>
      {props.listExchange.map((value, index) => {
        if (index >= 10) {
          return;
        }
        return (
          <Pressable
            key={index.toString()}
            style={styles.viewMap}
            onPress={() => {
              // navigation.navigate('DetailCoin', {id: value.item.id});
            }}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{width: 30, height: 30, backgroundColor: 'white'}}
                source={{
                  uri: value.thumb,
                }}
                resizeMode="cover"
              />
              <Text style={{marginLeft: 16}}>{value.name}</Text>
            </View>
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
