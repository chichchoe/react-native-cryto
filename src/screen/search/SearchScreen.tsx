import React from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {URL_COINGECKO} from '../../common/Common';
import {Container, Text, TextH3} from '../../components';
import {Coin, HotTrendingModel} from '../../models/HotTrending';
import {
  CoinSearch,
  ExchangeSearch,
  SearchModel,
} from '../../models/Search.Model';
import MyNavigator from '../../utils/Mynavigation';
import CoinSearches from './components/CoinSearches';
import ExchangeSearches from './components/ExchangeSearches';

export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [hotTrending, setHotTrending] = React.useState<Coin[]>([]);
  const [listCoin, setListCoin] = React.useState<CoinSearch[]>([]);
  const [listExchange, setListExchange] = React.useState<ExchangeSearch[]>([]);
  const [isLoadingSearch, setLoadingSearch] = React.useState<boolean>(false);

  const hotTrendingApi = async () => {
    try {
      const listHotTrending = await fetch(URL_COINGECKO + 'search/trending');
      const jsonHotTrending: HotTrendingModel = await listHotTrending.json();
      if (jsonHotTrending.coins) {
        setHotTrending(jsonHotTrending.coins);
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    hotTrendingApi();
  }, []);

  React.useEffect(() => {
    setLoadingSearch(true);
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.length === 0) {
        setListCoin([]);
        setListExchange([]);
        setLoadingSearch(false);
        return;
      }
      // Send Axios request here
      const search = async () => {
        try {
          const listHotTrending = await fetch(
            URL_COINGECKO + 'search?query=' + searchTerm,
          );
          const jsonHotTrending: SearchModel = await listHotTrending.json();
          if (jsonHotTrending.coins) {
            setListCoin(jsonHotTrending.coins);
            setListExchange(jsonHotTrending.exchanges);
            setLoadingSearch(false);
          }
        } catch (error) {
          setListCoin([]);
          setListExchange([]);
          setLoadingSearch(false);
        }
      };
      search();
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);
  return (
    <Container>
      <TextInput
        style={styles.input}
        onChangeText={text => {
          setSearchTerm(text);
        }}
        value={searchTerm}
      />
      <ScrollView>
        {isLoadingSearch ? <ActivityIndicator /> : null}
        <CoinSearches listCoin={listCoin} />
        <ExchangeSearches listExchange={listExchange} />
        <View style={styles.viewHotTrending}>
          <TextH3>Hot treading</TextH3>
        </View>
        {hotTrending.map((value, index) => (
          <Pressable
            key={index.toString()}
            style={styles.viewMap}
            onPress={() => {
              MyNavigator.navigate('DetailCoin', {id: value.item.id});
            }}>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{width: 30, height: 30, backgroundColor: 'white'}}
                source={{
                  uri: value.item.small,
                }}
                resizeMode="cover"
              />

              <Text style={{marginLeft: 16}}>
                {value.item.name + ` (${value.item.symbol})`}{' '}
              </Text>
            </View>
            <Text style={{marginRight: 16}}>#{value.item.market_cap_rank}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </Container>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'gray',
  },
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
