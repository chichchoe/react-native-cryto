import {
  StackActions,
  CommonActions,
  TabActions,
  DrawerActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {BottomTabParamList, RootStackParamList} from '../interface';

type RootParamsList = RootStackParamList & BottomTabParamList;
export default class MyNavigator {
  static rootNavigator = createNavigationContainerRef<RootParamsList>();

  static getCurrentScreen() {
    if (
      MyNavigator.rootNavigator &&
      MyNavigator.rootNavigator.isReady() &&
      MyNavigator.rootNavigator.getState().routes.length
    ) {
      return MyNavigator.rootNavigator.getCurrentRoute()?.name || '';
    }
    return '';
  }

  static getPreviousScreen() {
    if (
      MyNavigator.rootNavigator &&
      MyNavigator.rootNavigator.isReady() &&
      MyNavigator.rootNavigator.getState().routes.length
    ) {
      let size = MyNavigator.rootNavigator.getState().routes.length;

      return MyNavigator.rootNavigator.getState().routes[
        size >= 2 ? size - 2 : size - 1
      ].name;
    }
    return '';
  }

  /** mở drawer layout */
  static openDrawer = () => {
    if (this.rootNavigator.getCurrentRoute()?.name === 'MyRemoteConfigModal') {
      return;
    }
    if (MyNavigator.rootNavigator.isReady()) {
      MyNavigator.rootNavigator.dispatch(DrawerActions.openDrawer());
    }
  };

  /** đóng drawer layout */
  static closeDrawer = () => {
    if (MyNavigator.rootNavigator.isReady()) {
      MyNavigator.rootNavigator.dispatch(DrawerActions.closeDrawer());
    }
  };

  /** đóng/mở drawer layout */
  static toggleDrawer = () => {
    if (this.rootNavigator.getCurrentRoute()?.name === 'MyRemoteConfigModal') {
      return;
    }
    if (MyNavigator.rootNavigator.isReady()) {
      MyNavigator.rootNavigator.dispatch(DrawerActions.toggleDrawer());
    }
  };

  /**
   * chuyển tab
   *
   */
  static jump<ScreenName extends keyof RootStackParamList>(
    ...args: undefined extends RootStackParamList[ScreenName]
      ?
          | [screen: ScreenName]
          | [screen: ScreenName, params: RootStackParamList[ScreenName]]
      : [screen: ScreenName, params: RootStackParamList[ScreenName]]
  ) {
    if (
      MyNavigator.rootNavigator.getCurrentRoute()?.name ===
      'MyRemoteConfigModal'
    ) {
      return;
    }
    if (MyNavigator.rootNavigator.isReady() && args[0]) {
      const action = TabActions.jumpTo(args[0], args[1]);
      MyNavigator.rootNavigator.dispatch(action);
    }
  }

  /**
   * thay thế màn hình
   *
   */
  static replace<ScreenName extends keyof RootStackParamList>(
    ...args: undefined extends RootStackParamList[ScreenName]
      ?
          | [screen: ScreenName]
          | [screen: ScreenName, params: RootStackParamList[ScreenName]]
      : [screen: ScreenName, params: RootStackParamList[ScreenName]]
  ) {
    try {
      if (
        MyNavigator.rootNavigator.getCurrentRoute()?.name ===
        'MyRemoteConfigModal'
      ) {
        return;
      }
      if (MyNavigator.rootNavigator.isReady() && args[0]) {
        const action = StackActions.replace(args[0], args[1]);
        MyNavigator.rootNavigator.dispatch(action);
      }
    } catch (error) {
      // Utilities.logCrashlytics('MyNavigator - replace: ', error);
    }
  }

  /**
   * reset, push only one on StackScreen, switch screen inside drawerContent
   *
   */

  static navigate<ScreenName extends keyof RootStackParamList>(
    ...args: undefined extends RootStackParamList[ScreenName]
      ?
          | [screen: ScreenName]
          | [screen: ScreenName, params: RootStackParamList[ScreenName]]
      : [screen: ScreenName, params: RootStackParamList[ScreenName]]
  ) {
    try {
      if (
        MyNavigator.rootNavigator.getCurrentRoute()?.name ===
        'MyRemoteConfigModal'
      ) {
        return;
      }
      if (MyNavigator.rootNavigator.isReady() && args[0]) {
        const action = CommonActions.navigate(args[0], args[1]);
        MyNavigator.rootNavigator.dispatch(action);
      }
    } catch (error) {
      // Utilities.logCrashlytics('MyNavigator - navigate: ', error);
    }
  }

  /**
   * push 1 màn hình trong StackScreen
   *
   */
  static push<ScreenName extends keyof RootStackParamList>(
    ...args: undefined extends RootStackParamList[ScreenName]
      ?
          | [screen: ScreenName]
          | [screen: ScreenName, params: RootStackParamList[ScreenName]]
      : [screen: ScreenName, params: RootStackParamList[ScreenName]]
  ) {
    try {
      if (
        MyNavigator.rootNavigator.getCurrentRoute()?.name ===
        'MyRemoteConfigModal'
      ) {
        return;
      }
      if (MyNavigator.rootNavigator.isReady() && args[0]) {
        const action = StackActions.push(args[0], args[1]);
        MyNavigator.rootNavigator.dispatch(action);
      }
    } catch (error) {
      // Utilities.logCrashlytics('MyNavigator - push: ', error);
    }
  }
  /**
   * show 1 modal trong StackScreen
   *
   */

  static pushModal<ScreenName extends keyof RootStackParamList>(
    ...args: undefined extends RootStackParamList[ScreenName]
      ?
          | [screen: ScreenName]
          | [screen: ScreenName, params: RootStackParamList[ScreenName]]
      : [screen: ScreenName, params: RootStackParamList[ScreenName]]
  ) {
    try {
      if (
        MyNavigator.rootNavigator.getCurrentRoute()?.name ===
        'MyRemoteConfigModal'
      ) {
        return;
      }
      if (MyNavigator.rootNavigator.isReady() && args[0]) {
        const action = StackActions.push(args[0], args[1]);
        MyNavigator.rootNavigator.dispatch(action);
      }
    } catch (error) {
      // Utilities.logCrashlytics('MyNavigator - showModal: ', error);
    }
  }

  static replaceModal<ScreenName extends keyof RootStackParamList>(
    ...args: undefined extends RootStackParamList[ScreenName]
      ?
          | [screen: ScreenName]
          | [screen: ScreenName, params: RootStackParamList[ScreenName]]
      : [screen: ScreenName, params: RootStackParamList[ScreenName]]
  ) {
    try {
      if (
        MyNavigator.rootNavigator.getCurrentRoute()?.name ===
        'MyRemoteConfigModal'
      ) {
        return;
      }
      if (MyNavigator.rootNavigator.isReady() && args[0]) {
        const action = StackActions.replace(args[0], args[1]);
        MyNavigator.rootNavigator.dispatch(action);
      }
    } catch (error) {
      // Utilities.logCrashlytics('MyNavigator - showModal: ', error);
    }
  }

  /**
   * Refresh 1 màn hình
   *
   */
  static refresh<ScreenName extends keyof RootStackParamList>(
    params?: RootParamsList[ScreenName],
  ) {
    if (MyNavigator.rootNavigator.isReady()) {
      const state = MyNavigator.rootNavigator.getRootState();
      if (state) {
        const arrRoute = state.routes;
        if (arrRoute && arrRoute.length > 0) {
          const action = CommonActions.setParams(params || {});
          MyNavigator.rootNavigator.dispatch(action);
        }
      }
    }
  }
  static goBack = () => {
    try {
      if (
        MyNavigator.rootNavigator.isReady() &&
        MyNavigator.rootNavigator.canGoBack()
      ) {
        const action = CommonActions.goBack();
        MyNavigator.rootNavigator.dispatch(action);
      }
    } catch (error) {
      // Utilities.logCrashlytics('MyNavigator - goBack: ', error);
    }
  };

  static popToTop = () => {
    try {
      if (MyNavigator.rootNavigator.isReady()) {
        const action = StackActions.popToTop();
        MyNavigator.rootNavigator.dispatch(action);
      }
    } catch (error) {
      // Utilities.logCrashlytics('MyNavigator - popToTop: ', error);
    }
  };

  static popTo = (name: any) => {
    try {
      if (
        MyNavigator.rootNavigator.isReady() &&
        MyNavigator.rootNavigator.canGoBack()
      ) {
        const state = MyNavigator.rootNavigator.getRootState();
        if (state) {
          const arrRoute = state.routes;
          if (arrRoute && arrRoute.length > 0) {
            const indexScreen = arrRoute.findIndex((x: any) => x.name === name);
            if (indexScreen > -1) {
              let count = 0;
              count = arrRoute.length - 1 - indexScreen;
              if (count) {
                const action = StackActions.pop(count);
                MyNavigator.rootNavigator.dispatch(action);
              } else {
                // Utilities.log('Khong xac dinh duoc');
              }
            } else {
              // Utilities.log(
              //   `Khong tim thay man hinh de "${name}" popTo trong Stack Navigation`,
              // );
            }
          } else {
            // Utilities.log(`Khong tim thay "${name}" trong Stack Navigation`);
          }
        } else {
          // Utilities.log(`Khong tim thay "${name}"`);
        }
      }
    } catch (error) {
      // Utilities.logCrashlytics('MyNavigator - popToTop: ', error);
    }
  };

  static reset<ScreenName extends keyof RootStackParamList>(
    screen: ScreenName,
  ) {
    if (MyNavigator.rootNavigator.isReady()) {
      MyNavigator.rootNavigator.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: screen}],
        }),
      );
    }
  }
}
