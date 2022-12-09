import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import LottieView from 'lottie-react-native';
const LoadingAnimation = require('../data/loading.json');
const fruits = [
  'Apple',
  'Orange',
  'Watermelon',
  'Avocado',
  'Blueberry',
  'Coconut',
  'Durian',
  'Mango',
];
const refreshingHeight = 100;
const styles = StyleSheet.create({
  flatlist: {},
  row: {
    height: 100,
    justifyContent: 'center',
    padding: 20,
    borderBottomWidth: 3,
    borderBottomColor: 'black',
    backgroundColor: 'white',
  },
  rowTitle: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  // 3. Create a new style
  lottieView: {
    height: refreshingHeight,
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
  },
});
export default function TestScreen() {
  const [offsetY, setOffsetY] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [extraPaddingTop, setExtraPaddingTop] = useState(0);

  const lottieViewRef = useRef(null);

  function onScroll(event) {
    const {nativeEvent} = event;
    const {contentOffset} = nativeEvent;
    const {y} = contentOffset;
    setOffsetY(y);
  }

  useEffect(() => {
    if (isRefreshing) {
      setExtraPaddingTop(refreshingHeight);
      // 3. Trigger play when is refreshing
      // lottieViewRef.current.play();
    } else {
      setExtraPaddingTop(0);
    }
  }, [isRefreshing]);

  function onRelease() {
    if (offsetY <= -refreshingHeight && !isRefreshing) {
      setIsRefreshing(true);
      // 3. Removed setExtraPaddingTop(refreshingHeight);
      setTimeout(() => {
        setIsRefreshing(false);
        // 4. Removed setExtraPaddingTop(0);
      }, 3000);
    }
  }

  function renderItem({item}) {
    return (
      <View key={item} style={styles.row}>
        <Text style={styles.rowTitle}>{item}</Text>
      </View>
    );
  }

  let progress = 0;
  if (offsetY <= 0) {
    progress = -offsetY / refreshingHeight;
  }

  return (
    // 4. Create a View to include both LottieView and FlatList
    <View>
      {/* 5. Add LottieView */}
      <LottieView
        ref={lottieViewRef}
        style={styles.lottieView}
        progress={progress}
        source={LoadingAnimation}
      />
      <FlatList
        data={fruits}
        renderItem={renderItem}
        style={[
          styles.flatlist,
          {
            paddingTop: 20,
          },
        ]}
        onResponderRelease={onRelease}
        onScroll={onScroll}
        ListHeaderComponent={
          <View
            style={{
              paddingTop: extraPaddingTop,
            }}
          />
        }
      />
      <Text>hello</Text>
    </View>
  );
}
