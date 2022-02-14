import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  // RefreshControl,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {COLOR} from '../../../common/Color';
import {URL_COINGECKO} from '../../../common/Common';
import {Text} from '../../../components';
import {DetailCoin} from '../../../interface';
import {CoinDetail} from '../../../models/CoinDetail';
import Utilities from '../../../utils/Utilities';
import {InfoPrice} from './components/InfoPrice';
import {Platforms} from './components/Platform';
import {TableChangePercentage} from './components/TableChangePercentage';
import ExchangeDetail from './components/ExchangeDetail';
import InfoDetail from './components/InfoDetail';
import ChartCoinDetail from './components/ChartCoinDetail';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {ViewRow} from './components/ViewRow';

interface IProps {
  route: {
    params: DetailCoin;
  };
  navigation: any;
}
const getwidth = Dimensions.get('screen').width;
export default function DetailCoinScreen({route, navigation}: IProps) {
  const offset = useSharedValue(0);
  const widthItem = useSharedValue(0);

  const refRowView = React.useRef<any>(undefined);
  const scrollRef = React.useRef<any>(undefined);

  const [state, setstate] = React.useState<CoinDetail>();
  const [isRefresh, setRefresh] = React.useState(false);
  const [isFistLoading, setFistLoading] = React.useState(true);

  React.useEffect(() => {
    const getApiCoin = async () => {
      try {
        const listMarket = await fetch(
          URL_COINGECKO + 'coins/' + route.params?.id,
        );
        const jsonListMarket: CoinDetail = await listMarket.json();
        if (jsonListMarket) {
          setstate(jsonListMarket);
          setRefresh(false);
          setFistLoading(false);
        }
      } catch (error) {
        setRefresh(false);
        setFistLoading(false);
      }
    };
    getApiCoin();
    return () => {};
  }, [route.params?.id, isRefresh]);

  React.useLayoutEffect(() => {
    let nameConverter: string = '';
    let priceConverter: string = '';
    let priceChangePercentage: number | undefined;
    if (state && state.name && state.market_data) {
      nameConverter = state.name + ' ' + `(${state.symbol.toUpperCase()})`;
      priceConverter = Utilities.formatCurrency(
        state.market_data.current_price.usd,
        '$ ',
      );
      priceChangePercentage = state.market_data.price_change_percentage_24h;
    }
    navigation.setOptions({
      headerTitle: props => (
        <LogoTitle
          {...props}
          isFistLoading={isFistLoading}
          images={state?.image ? state?.image.small : ''}
          name={nameConverter}
          price={priceConverter}
          percentage={priceChangePercentage}
        />
      ),
    });
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: 4,
      width: widthItem.value,
      backgroundColor: 'blue',
      transform: [{translateX: offset.value * widthItem.value}],
    };
  });

  function PriceChart() {
    return (
      <ScrollView style={{flex: 1}}>
        <ChartCoinDetail idCoin={route.params?.id || ''} />
        <TableChangePercentage marketData={state?.market_data} />
        <Platforms platformData={state?.platforms} />
        <InfoPrice marketData={state?.market_data} />
      </ScrollView>
    );
  }
  if (isFistLoading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={{flex: 1}}>
      <View
        style={{height: 56, backgroundColor: 'gray'}}
        onLayout={(event: LayoutChangeEvent) => {
          if (widthItem.value <= 0) {
            widthItem.value = event.nativeEvent.layout.width / 3;
          }
        }}>
        <ViewRow refScroll={scrollRef} ref={refRowView} />

        <Animated.View style={animatedStyles} />
      </View>
      <ScrollView
        ref={scrollRef}
        removeClippedSubviews={true}
        onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
          offset.value =
            event.nativeEvent.contentOffset.x /
            event.nativeEvent.layoutMeasurement.width;
        }}
        onMomentumScrollEnd={(
          event: NativeSyntheticEvent<NativeScrollEvent>,
        ) => {
          const numberView: number =
            event.nativeEvent.contentOffset.x /
            event.nativeEvent.layoutMeasurement.width;

          refRowView.current.onShowModal(numberView);
        }}
        style={{flex: 1}}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator
        bounces={false}
        horizontal
        pagingEnabled={true}>
        <View style={{flex: 1, width: getwidth}}>
          <PriceChart />
        </View>
        <View style={{flex: 1, width: getwidth}}>
          <ExchangeDetail dataExchange={state?.tickers || []} />
        </View>
        <View style={{flex: 1, width: getwidth}}>
          <InfoDetail dataLinks={state?.links} date={state?.genesis_date} />
        </View>
      </ScrollView>
    </View>
  );
}

function LogoTitle(props: any) {
  if (props.isFistLoading) {
    return null;
  }
  return (
    <View style={{flexDirection: 'row'}}>
      <Image
        source={{
          uri: props?.images ? props?.images : '',
        }}
        resizeMode="cover"
        style={{width: 40, height: 40, backgroundColor: 'white'}}
      />
      <View style={{marginLeft: 6}}>
        <Text>{props.name}</Text>
        <Text>
          {props.price}
          <Text style={{color: props.percentage >= 0 ? COLOR.BLUE : COLOR.RED}}>
            {'   '}
            {props.percentage ? props.percentage.toFixed(2) + ' %' : null}
          </Text>
        </Text>
      </View>
    </View>
  );
}
