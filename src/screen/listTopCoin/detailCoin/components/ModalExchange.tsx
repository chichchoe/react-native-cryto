import React, {forwardRef, useImperativeHandle} from 'react';
import {View, Text, Modal, Pressable, StyleSheet, Linking} from 'react-native';
import {Ticker} from '../../../../models/CoinDetail';
import Feather from 'react-native-vector-icons/Feather';
import {COLOR} from '../../../../common/Color';
import Utilities from '../../../../utils/Utilities';
export const ModalExchange = forwardRef((props: any, ref) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [data, setData] = React.useState<Partial<Ticker>>({});
  useImperativeHandle(ref, () => ({
    onShowModal(itemTicker: Ticker) {
      setData(itemTicker);
      setModalVisible(true);
    },
  }));
  return (
    <Modal
      style={{backgroundColor: 'red'}}
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        console.log('111');
        setModalVisible(!modalVisible);
      }}>
      <Pressable
        style={styles.centeredView}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{data?.market?.name}</Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={async () => {
              setModalVisible(!modalVisible);
              await Linking.openURL(data.trade_url || 'https://google.com');
            }}>
            <Feather
              color="white"
              name="external-link"
              size={22}
              style={{paddingRight: 16}}
            />
            <Text style={styles.textStyle}>
              {data.base + ' / ' + data.target}
            </Text>
          </Pressable>

          <Text style={styles.modalText}>Trust score</Text>
          <View
            style={[
              styles.viewTrust,
              {
                backgroundColor: data.trust_score || COLOR.RED,
              },
            ]}
          />
        </View>
      </Pressable>
    </Modal>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 20,
    width: Utilities.getWidthScreen() - 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 32,
    flexDirection: 'row',
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  viewTrust: {
    width: 15,
    height: 15,
    borderRadius: 10,
  },
});
