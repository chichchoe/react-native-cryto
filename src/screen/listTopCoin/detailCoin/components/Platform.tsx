import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {Text, TextH4} from '../../../../components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-toast-message';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface IProps {
  platformData: any;
}
interface IPlatformConvert {
  key: string;
  value: string;
}

export function Platforms(props: IProps) {
  const platformConvert: IPlatformConvert[] = [];
  const transform = useSharedValue(0);
  const height = useSharedValue(0);
  let heightStart: number = 0;
  if (props.platformData) {
    for (const key in props.platformData) {
      if (key.length > 0) {
        const element = props.platformData[key];
        platformConvert.push({key: key, value: element});
      }
    }
  }

  function copyValuePlatform(value: string) {
    Clipboard.setString(value);
    Toast.show({
      type: 'info',
      text1: 'Đã sao chép thành công vào khay nhớ tạm',
    });
  }

  const transformStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${transform.value}deg`}],
    };
  });
  const heightStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value, {
        duration: 100,
        easing: Easing.bezier(0.1, 0.6, 1, 0.6),
      }),
    };
  });

  function pressTransform() {
    if (transform.value === 0) {
      transform.value = 90;
      height.value = heightStart * platformConvert.length;
      return;
    }
    transform.value = 0;
    height.value = 0;
  }

  if (platformConvert.length > 0) {
    return (
      <View>
        <Pressable
          onPress={pressTransform}
          style={[style.btn, {justifyContent: 'space-between'}]}>
          <TextH4>Dia chi hop dong</TextH4>
          <Animated.View style={[transformStyle]}>
            <AntDesign name="rightcircle" size={26} color="gray" />
          </Animated.View>
        </Pressable>
        <Animated.View style={[heightStyle]}>
          {platformConvert.map(value => {
            return (
              <Pressable
                onLayout={event => {
                  if (heightStart === 0) {
                    heightStart = event.nativeEvent.layout.height + 24;
                  }
                  return;
                }}
                key={value.key}
                style={style.btn}
                onPress={() => {
                  copyValuePlatform(value.value);
                }}>
                <Text style={{flex: 1, textTransform: 'capitalize'}}>
                  {value.key.replaceAll('-', ' ')}
                </Text>
                <Text style={{flex: 1.5}} numberOfLines={1}>
                  {value.value}
                </Text>
                <AntDesign name="copy1" size={24} color="gray" />
              </Pressable>
            );
          })}
        </Animated.View>
      </View>
    );
  }
  return <View />;
}
const style = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    marginHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
});
