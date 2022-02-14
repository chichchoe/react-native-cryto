import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {URL_COINGECKO} from '../../../../common/Common';
import {Text} from '../../../../components';
import Utilities from '../../../../utils/Utilities';
import TimeRow from './TimeRow';

interface listMarketChart {
  prices: Array<number[]>;
  market_caps: Array<number[]>;
  total_volumes: Array<number[]>;
}
export default function ChartCoinDetail(props: {idCoin: string}) {
  const [state, setState] = React.useState<number[]>([]);
  const [isFistLoading, setFistLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const currentTo = Math.floor(new Date().getTime() / 1000.0);
        const currentFrom = currentTo - 3600;
        const listMarket = await fetch(
          URL_COINGECKO +
            `coins/${props.idCoin}/market_chart/range?vs_currency=usd&from=${currentFrom}&to=${currentTo}`,
        );
        const jsonListMarket: listMarketChart = await listMarket.json();

        if (jsonListMarket && jsonListMarket.prices.length > 0) {
          const lineData = jsonListMarket.prices.map(line => {
            return line[1];
          });
          setState(lineData);
          setFistLoading(false);
        }
      } catch (error) {
        setState([]);
        setFistLoading(false);
      }
    };
    fetchData();
  }, [props.idCoin]);

  const callTime = React.useCallback(
    (time: number) => {
      const callbackApi = async () => {
        try {
          const currentTo = Math.floor(new Date().getTime() / 1000.0);
          const currentFrom = currentTo - time;
          const listMarket = await fetch(
            URL_COINGECKO +
              `coins/${props.idCoin}/market_chart/range?vs_currency=usd&from=${currentFrom}&to=${currentTo}`,
          );
          const jsonListMarket: listMarketChart = await listMarket.json();

          if (jsonListMarket && jsonListMarket.prices.length > 0) {
            const lineData = jsonListMarket.prices.map(line => {
              return line[1];
            });
            setState(lineData);
            setFistLoading(false);
          }
        } catch (error) {
          setState([]);
          setFistLoading(false);
        }
      };
      callbackApi();
    },
    [props.idCoin],
  );
  return (
    <View style={styles.container}>
      <View style={styles.containerChart}>
        {isFistLoading ? (
          <ActivityIndicator />
        ) : state.length <= 0 ? (
          <Text>Error</Text>
        ) : (
          <LineChart
            bezier
            data={{
              labels: [],
              datasets: [
                {
                  data: state,
                },
              ],
            }}
            width={Utilities.getWidthScreen()}
            height={Utilities.getWidthScreen() - 100}
            style={styles.lineChart}
            chartConfig={{
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0.1,
              color: () => 'rgba(235, 162, 106)',
            }}
            withVerticalLabels={true}
            withHorizontalLines={true}
            withDots={false}
            withInnerLines={false}
            withOuterLines={false}
            withVerticalLines={true}
          />
        )}
      </View>
      <TimeRow
        callBackTime={(time: number) => {
          setFistLoading(true);
          callTime(time);
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerChart: {
    width: Utilities.getWidthScreen(),
    height: Utilities.getWidthScreen() - 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'black',
  },
  lineChart: {
    paddingRight: 0,
    backgroundColor: 'transparent',
  },
});
