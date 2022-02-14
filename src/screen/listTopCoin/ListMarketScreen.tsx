import React from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {COLOR} from '../../common/Color';
import {URL_COINGECKO} from '../../common/Common';
import {Container, ItemBlog, Text} from '../../components';
import {CoinMarket} from '../../models';
import MyNavigator from '../../utils/Mynavigation';
import {widthScale} from '../../utils/Scaling';
import Utilities from '../../utils/Utilities';

const per_page: number = 20;

export default function ListMarketScreen() {
  const [state, setState] = React.useState<CoinMarket[]>([]);
  const [isFistLoading, setFistLoading] = React.useState(true);
  const [isRefresh, setIsRefresh] = React.useState(false);
  const [isLoadMore, setLoadMore] = React.useState(false);
  const [page, setPage] = React.useState<number>(2);

  async function getListMarket() {
    try {
      const listMarket = await fetch(
        URL_COINGECKO +
          `coins/markets/?vs_currency=usd&price_change_percentage=24h&per_page=${per_page}&page=1`,
      );
      const jsonListMarket = await listMarket.json();
      if (jsonListMarket.length > 0) {
        setFistLoading(false);
        setState(jsonListMarket);
        setIsRefresh(false);
      } else {
        setFistLoading(false);
        setIsRefresh(false);
      }
    } catch (error) {
      setFistLoading(false);
      setIsRefresh(false);
    }
  }

  React.useEffect(() => {
    getListMarket();
  }, []);

  function renderItem({item}: {item: CoinMarket}) {
    let customPercentage: string = '';
    let colorText: string = '';
    let nameIcon = 'caret-down';
    if (item.price_change_percentage_24h_in_currency) {
      colorText =
        item.price_change_percentage_24h_in_currency > 0
          ? COLOR.BLUE
          : COLOR.RED;
      customPercentage =
        item.price_change_percentage_24h_in_currency > 0
          ? item.price_change_percentage_24h_in_currency.toFixed(2)
          : item.price_change_percentage_24h_in_currency.toFixed(2).slice(1);
      nameIcon =
        item.price_change_percentage_24h_in_currency > 0
          ? 'caret-up'
          : 'caret-down';
    }

    return (
      <Pressable
        onPress={() => {
          MyNavigator.navigate('DetailCoin', {id: item.id});
        }}>
        <ItemBlog>
          <Text style={style.viewTop}>{item.market_cap_rank}</Text>
          <View style={style.viewFlex}>
            <Image
              style={style.imagesCoin}
              source={{
                uri: item.image,
              }}
              resizeMode="cover"
            />
            <Text style={style.textSymbol}>{item.symbol}</Text>
          </View>
          <View style={style.viewFlex}>
            <Text>
              {Utilities.formatCurrency(item.current_price || 0, ' $')}
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
          <View style={[style.viewFlex, {flex: 2}]}>
            <Text>{Utilities.convertCount(item.market_cap || 0, ' $')}</Text>
          </View>
        </ItemBlog>
      </Pressable>
    );
  }

  function emptyListComponent() {
    if (isFistLoading) {
      return <ActivityIndicator size="large" />;
    }

    return <View />;
  }

  async function onPressLearnMore() {
    setLoadMore(true);
    setPage(page => {
      return page + 1;
    });
    try {
      const listMarket = await fetch(
        URL_COINGECKO +
          `coins/markets/?vs_currency=usd&price_change_percentage=24h&per_page=${per_page}&page=${page}`,
      );
      const jsonListMarket = await listMarket.json();
      if (jsonListMarket.length > 0) {
        setState([...state, ...jsonListMarket]);
        setLoadMore(false);
      }
    } catch (error) {}
  }
  function listFooterComponent() {
    if (isLoadMore) {
      return (
        <View style={{flex: 1, marginVertical: 16, alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{flex: 1, marginVertical: 16}}>
        <Button onPress={onPressLearnMore} title="Load More" color="#841584" />
      </View>
    );
  }
  return (
    <Container>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isRefresh}
            onRefresh={() => {
              setIsRefresh(true);
              getListMarket();
            }}
          />
        }
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.contentContainerStyle}
        data={state}
        extraData={state}
        // onEndReached={onEndReached}
        // onEndReachedThreshold={0.1}
        keyExtractor={(_item, index) => 'home' + index.toString()}
        ListEmptyComponent={emptyListComponent}
        ItemSeparatorComponent={() => {
          return <View style={style.ItemSeparatorComponent} />;
        }}
        ListFooterComponent={listFooterComponent}
        renderItem={renderItem}
      />
    </Container>
  );
}
const style = StyleSheet.create({
  header: {
    flexDirection: 'row',

    marginHorizontal: 8,
  },
  contentContainerStyle: {padding: 8},
  ItemSeparatorComponent: {height: 8},
  imagesCoin: {
    width: widthScale(30),
    height: widthScale(30),
    marginVertical: 8,
  },
  viewTop: {
    alignSelf: 'center',
    fontSize: 20,
    textTransform: 'uppercase',
    marginHorizontal: 6,
  },
  viewFlex: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textSymbol: {
    fontSize: 18,
    textTransform: 'uppercase',
    marginHorizontal: 8,
  },
});
