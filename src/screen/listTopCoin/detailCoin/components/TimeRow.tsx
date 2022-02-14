import React from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import {Text} from '../../../../components';
import Utilities from '../../../../utils/Utilities';
const dataTimeRange = require('../../../../data/btc.json');
interface timeRow {
  callBackTime: (time: number) => void;
}
interface dateTime {
  time: 'Hours' | 'Daily' | 'Year';
  timestamp: string;
  name: string;
}

export default function TimeRow(props: timeRow) {
  const [time, setTime] = React.useState<string>('1H');
  function convertTime(params: dateTime) {
    let timeCurrent: number = 0;
    if (params.time === 'Hours') {
      setTime(params.name);
      timeCurrent = 3600 * Number(params.timestamp);
      props.callBackTime(timeCurrent);
      return;
    }
    if (params.time === 'Daily') {
      setTime(params.name);
      timeCurrent = 86400 * Number(params.timestamp);
      props.callBackTime(timeCurrent);
      return;
    }
    if (params.time === 'Year') {
      setTime(params.name);
      timeCurrent = 31556926 * Number(params.timestamp);
      props.callBackTime(timeCurrent);
      return;
    }
  }
  return (
    <View style={styles.container}>
      {dataTimeRange.map((value: dateTime, index: number) => {
        return (
          <Pressable
            key={index}
            onPress={() => {
              convertTime(value);
            }}
            style={[
              styles.btnTime,
              {backgroundColor: time === value.name ? 'red' : 'transparent'},
            ]}>
            <Text>{value.name}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 56,
    width: Utilities.getWidthScreen(),
    flexDirection: 'row',
  },
  btnTime: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
