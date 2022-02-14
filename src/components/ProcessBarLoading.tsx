import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
interface IProps {}
interface IState {
  progress: number;
}
export default class ProcessBarLoading extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      progress: 0,
    };
  }

  changedProgress(process) {
    this.setState({
      progress: process,
    });
  }

  render() {
    let width = '0%';
    width = `${Math.round(this.state.progress * 100)}%`;
    const opacity = width === '100%' ? 0 : 1;
    return (
      <View style={[styles.container, {opacity}]}>
        <View style={[styles.process, {width}]} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {height: 1},
  process: {
    height: 1,
    backgroundColor: 'red',
  },
});
