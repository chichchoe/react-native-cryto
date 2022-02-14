import React from 'react';
import {Pressable, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import {KEY_STORAGE} from '../../../common/KeyStorages';
import {Container} from '../../../components';
import MyStorage from '../../../utils/MyStorage';

import {switchCardHome} from '../../redux/action';

export default function WatchListStyleScreen() {
  const dispatch = useDispatch();
  return (
    <Container>
      <Pressable
        onPress={() => {
          MyStorage.create(KEY_STORAGE.CARD_SHOP, 'CardView');
          dispatch(switchCardHome('CardView'));
        }}>
        <Text>Card View</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          MyStorage.create(KEY_STORAGE.CARD_SHOP, 'TradeView');
          dispatch(switchCardHome('TradeView'));
        }}>
        <Text>Trade View</Text>
      </Pressable>
    </Container>
  );
}
