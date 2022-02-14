import React from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, View} from 'react-native';

import {useSelector} from 'react-redux';
import {VictoryPie} from 'victory-native';
import {COLOR} from '../../../common/Color';
import {Text, TextH1} from '../../../components';
import {translation} from '../../../translations';
import Utilities from '../../../utils/Utilities';
import {RootState} from '../../redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default function HeaderHome() {
  const propsHome = useSelector((state: RootState) => state.HomeReducer);
  const {t} = useTranslation();
  const changePercentage =
    propsHome.objGlobal?.market_cap_change_percentage_24h_usd || 0;
  const colorText = changePercentage > 0 ? COLOR.BLUE : COLOR.RED;
  const customPercentage =
    changePercentage > 0
      ? changePercentage.toFixed(2)
      : changePercentage.toFixed(2).slice(1);
  const nameIcon = changePercentage > 0 ? 'caret-up' : 'caret-down';
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#A1DAFF',
        margin: 8,
        borderRadius: 12,
      }}>
      <View style={{flex: 1, paddingHorizontal: 8, paddingTop: 16}}>
        <TextH1>{t(translation.global_stats)}</TextH1>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text>{t(translation.market_cap)}: </Text>
          <Text>
            {Utilities.convertCount(
              propsHome.objGlobal?.total_market_cap.usd || 0,
              ' $',
            )}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 16,
              alignItems: 'center',
            }}>
            <FontAwesome5 name={nameIcon} size={24} color={colorText} />
            <Text
              style={{
                color: colorText,
              }}>
              {' ' + customPercentage + ' '}%
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text>{t(translation.volume_24h)}: </Text>
          <Text>
            {Utilities.convertCount(
              propsHome.objGlobal?.total_volume.usd || 0,
              ' $',
            )}
          </Text>
        </View>
      </View>
      {propsHome.isFistLoading ? (
        <View
          style={{
            width: Utilities.getWidthScreen(),
            height: Utilities.getWidthScreen(),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator />
        </View>
      ) : (
        <VictoryPie
          animate={{
            duration: 1000,
          }}
          width={Utilities.getWidthScreen()}
          height={Utilities.getWidthScreen()}
          style={{
            labels: {
              fill: COLOR.PRIMARY,
              fontSize: 20,
              fontWeight: 'bold',
            },
          }}
          labelRadius={Utilities.getWidthScreen() / 6}
          colorScale={['tomato', 'orange', 'navy', 'gray']}
          innerRadius={Utilities.getWidthScreen() / 7}
          data={propsHome.dataChartPie || []}
        />
      )}
    </View>
  );
}
