import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Pressable,
  // ActivityIndicator,
} from 'react-native';
import {COLOR} from '../../../../common/Color';
import {Text} from '../../../../components';
// import {RootStackParamList} from '../../../../interface';
import {Ticker} from '../../../../models/CoinDetail';
import Utilities from '../../../../utils/Utilities';
import {ModalExchange} from './ModalExchange';

interface IProps {
  dataExchange: Ticker[];
}
export default function ExchangeDetail(props: IProps) {
  const [state, setstate] = React.useState<Ticker[]>([]);
  const refModalExchange = React.useRef<any>(undefined);
  // const [isLoadMore, setLoadMore] = React.useState(false);
  React.useEffect(() => {
    setstate(props.dataExchange.slice(0, 30));
  }, [props.dataExchange]);

  const renderItem = ({item}: {item: Ticker}) => {
    return (
      <Pressable
        onPress={() => {
          refModalExchange.current.onShowModal(item);
        }}
        style={styles.btnItem}>
        <Text style={{flex: 2, textAlign: 'center'}}>{item.market.name}</Text>
        <View style={styles.itemFlat}>
          <Text numberOfLines={1}>{item.base}</Text>
          <Text numberOfLines={1}>{item.target}</Text>
        </View>
        <Text style={{flex: 2, textAlign: 'right'}}>
          {Utilities.formatCurrency(item.converted_last.usd, '$ ')}
        </Text>
        <Text style={{flex: 4, textAlign: 'right'}}>
          $ {Utilities.convertCount(item.converted_volume.usd, '')}
        </Text>
        <View style={styles.itemTrust}>
          <View
            style={[
              styles.viewTrust,
              {
                backgroundColor: item.trust_score || COLOR.RED,
              },
            ]}
          />
        </View>
      </Pressable>
    );
  };

  // const onEndReached = () => {
  //   if (!isLoadMore) {
  //     setLoadMore(true);
  //     const timeLoadMore = setTimeout(() => {
  //       if (state.length <= props.dataExchange.length) {
  //         const dataNew = props.dataExchange.slice(
  //           state.length,
  //           state.length + 20,
  //         );
  //         setstate([...state, ...dataNew]);
  //       }
  //       setLoadMore(false);
  //       clearTimeout(timeLoadMore);
  //     }, 1000);
  //   }
  // };
  return (
    <View style={styles.container}>
      <View style={styles.herder}>
        <Text style={{flex: 2, textAlign: 'center'}}>Exch</Text>
        <Text style={{flex: 1, textAlign: 'center'}} numberOfLines={1}>
          Flat
        </Text>
        <Text style={{flex: 2, textAlign: 'center'}}>Price</Text>
        <Text style={{flex: 4, textAlign: 'center'}}>24H volume</Text>
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
          }}>
          Trust
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={state || []}
        extraData={state || []}
        keyExtractor={(_item: any, index: number) =>
          'exchange' + index.toString()
        }
        ItemSeparatorComponent={() => {
          return <View style={styles.itemSeparator} />;
        }}
        // onEndReached={onEndReached}
        // onEndReachedThreshold={0.1}
        // ListFooterComponent={() => {
        //   if (isLoadMore) {
        //     return <ActivityIndicator />;
        //   }
        //   return null;
        // }}
        renderItem={renderItem}
      />
      <ModalExchange ref={refModalExchange} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1},
  herder: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'gray',
    paddingVertical: 16,
  },
  itemSeparator: {
    backgroundColor: 'gray',
    height: StyleSheet.hairlineWidth,
  },
  btnItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  itemFlat: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  itemTrust: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewTrust: {
    width: 15,
    height: 15,
    borderRadius: 10,
  },
});
