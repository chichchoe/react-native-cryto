import React, {forwardRef, useImperativeHandle} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import Utilities from '../../../../utils/Utilities';

export const ViewRow = forwardRef((props: any, ref) => {
  const [state, setState] = React.useState(0);

  useImperativeHandle(ref, () => ({
    onShowModal(value: number) {
      if (state !== value) {
        setState(value);
      }
    },
  }));

  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      {['Biểu đồ giá', 'Sàn giao dịch', 'Thông tin'].map((value, index) => {
        return (
          <Pressable
            style={styles.container}
            key={index}
            onPress={() => {
              if (props.refScroll && props.refScroll.current) {
                props.refScroll.current.scrollTo({
                  x: index * Utilities.getWidthScreen(),
                  animated: true,
                });
              }
              setState(index);
            }}>
            <Text
              style={{
                color: state === index ? 'blue' : 'white',
                textTransform: 'uppercase',
              }}>
              {value}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
});
