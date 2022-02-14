import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Container} from '../../components';
import {getAllHome, refresh} from './redux/HomeAction';
import {ScrollView} from 'react-native-gesture-handler';
import TopCoin from './components/TopCoin';
import TopExchange from './components/TopExchange';
import HeaderHome from './components/HeaderHome';
import {RefreshControl} from 'react-native';
import {RootState} from '../redux';

export default function HomeScreen() {
  const dispatch = useDispatch();

  const refreshing = useSelector(
    (state: RootState) => state.HomeReducer.isRefresh,
  );
  const onRefresh = React.useCallback(() => {
    dispatch(refresh());
  }, [dispatch]);
  React.useEffect(() => {
    dispatch(getAllHome());
  }, [dispatch]);
  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing || false}
            onRefresh={onRefresh}
          />
        }>
        <HeaderHome />
        <TopCoin />
        <TopExchange />
      </ScrollView>
    </Container>
  );
}
