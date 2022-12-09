import React from 'react';
import {Linking, Pressable, Share, StyleSheet} from 'react-native';
// import {ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WebView from 'react-native-webview';
import {ContainerBottom} from '../../../components';
import ProcessBarLoading from '../../../components/ProcessBarLoading';
import {BLogDetails} from '../../../interface';

interface IProps {
  route: {
    params: BLogDetails;
  };
  navigation: any;
}

export default function DetailScreen({route, navigation}: IProps) {
  const [value] = React.useState(route.params.title);
  const [isReload, setReload] = React.useState(false);
  const webViewRef = React.useRef<any>(null);
  let progressBar: any;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: value.length <= 0 ? 'No title' : value,
      headerRight: () => (
        <Pressable
          style={{paddingHorizontal: 8, paddingVertical: 4}}
          onPress={isReload ? onStopLoading : onReload}>
          <AntDesign
            name={isReload ? 'close' : 'reload1'}
            size={22}
            color="gray"
          />
        </Pressable>
      ),
    });
  }, [navigation, value, isReload]);
  const onReload = () => {
    if (webViewRef) {
      setReload(true);
      webViewRef.current.reload();
    }
  };
  const onStopLoading = () => {
    setReload(false);
    webViewRef.current.stopLoading();
  };
  const onGoback = () => {
    if (webViewRef) {
      webViewRef.current.goBack();
    }
  };
  const onGoForward = () => {
    if (webViewRef) {
      webViewRef.current.goForward();
    }
  };
  const onLinkWeb = () => {
    Linking.openURL(route.params.url || 'https://google.com');
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: route.params.url || 'https://google.com',
      });
      if (result.action === Share.sharedAction) {
        activityType(result.activityType);
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {}
  };
  const activityType = (result: string | undefined) => {
    if (result) {
      // shared with activity type of result.activityType
    } else {
      // shared
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ProcessBarLoading
        ref={node => {
          progressBar = node;
        }}
      />
      <WebView
        ref={webViewRef}
        onLoadProgress={event => {
          try {
            progressBar.changedProgress(event.nativeEvent.progress);
          } catch (error) {}
        }}
        onLoadEnd={syntheticEvent => {
          const {nativeEvent} = syntheticEvent;
          if (!nativeEvent.loading) {
            setReload(nativeEvent.loading);
          }
        }}
        originWhitelist={['*']}
        startInLoadingState={false}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        source={{uri: route.params.url || 'https://www.google.com/'}}
      />
      <ContainerBottom edges={['bottom']} style={styles.safeButtom}>
        <Pressable style={styles.btnBottom} onPress={onGoback}>
          <AntDesign name="left" size={25} color="gray" />
        </Pressable>
        <Pressable style={styles.btnBottom} onPress={onGoForward}>
          <AntDesign name="right" size={25} color="gray" />
        </Pressable>
        <Pressable style={styles.btnBottom} onPress={onShare}>
          <MaterialCommunityIcons name="share-variant" size={25} color="gray" />
        </Pressable>
        <Pressable style={styles.btnBottom} onPress={onLinkWeb}>
          <MaterialCommunityIcons name="web" size={25} color="gray" />
        </Pressable>
      </ContainerBottom>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeButtom: {
    height: 56,
    alignItems: 'center',

    flexDirection: 'row',
  },
  btnBottom: {
    flex: 1,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
