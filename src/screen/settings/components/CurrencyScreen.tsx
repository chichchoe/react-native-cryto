import React from 'react';
import {Pressable, Text} from 'react-native';
import {Container} from '../../../components';

export default function CurrencyScreen() {
  return (
    <Container>
      <Pressable onPress={() => {}}>
        <Text>Card View</Text>
      </Pressable>
      <Pressable onPress={() => {}}>
        <Text>Trade View</Text>
      </Pressable>
    </Container>
  );
}
