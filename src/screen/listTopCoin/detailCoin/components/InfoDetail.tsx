import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, Pressable} from 'react-native';
import {COLOR} from '../../../../common/Color';
import {Text} from '../../../../components';
import {Links} from '../../../../models/CoinDetail';
import {translation} from '../../../../translations';
import MyNavigator from '../../../../utils/Mynavigation';

interface IProps {
  dataLinks?: Links;
  date?: Date;
}
export default function InfoDetail(props: IProps) {
  const {t} = useTranslation();
  if (props.dataLinks) {
    return (
      <View style={{flex: 1, marginHorizontal: 16}}>
        <View style={[styles.viewRow, {marginBottom: 16}]}>
          <Text style={styles.textName}>{t(translation.home_page)}</Text>
          {props.dataLinks.homepage.map((value, index) => {
            if (value.length > 0) {
              return (
                <Pressable
                  key={'homepage' + index.toString()}
                  onPress={() => {
                    MyNavigator.navigate('BLogDetails', {
                      title: value,
                      url: value,
                    });
                  }}>
                  <Text style={styles.textValue}>{value}</Text>
                </Pressable>
              );
            }
            return null;
          })}
        </View>
        <View style={[styles.viewRow, {marginBottom: 16}]}>
          <Text style={styles.textName}>
            {t(translation.blockchain_supply)}
          </Text>
          <View style={{flex: 2}}>
            {props.dataLinks.blockchain_site.map((value, index) => {
              if (value.length > 0) {
                return (
                  <Pressable
                    key={'blockchainsite' + index.toString()}
                    onPress={() => {
                      MyNavigator.navigate('BLogDetails', {
                        title: value,
                        url: value,
                      });
                    }}>
                    <Text style={styles.textValue}>{value}</Text>
                  </Pressable>
                );
              }
              return null;
            })}
          </View>
        </View>
        <View style={[styles.viewRow, {marginBottom: 16}]}>
          <Text style={styles.textName}>{t(translation.discussion_forum)}</Text>
          <View style={{flex: 2}}>
            {props.dataLinks.official_forum_url.map((value, index) => {
              if (value.length > 0) {
                return (
                  <Pressable
                    key={'official' + index.toString()}
                    onPress={() => {
                      MyNavigator.navigate('BLogDetails', {
                        title: value,
                        url: value,
                      });
                    }}>
                    <Text style={styles.textValue}>{value}</Text>
                  </Pressable>
                );
              }
              return null;
            })}
          </View>
        </View>
        <View style={[styles.viewRow, {marginBottom: 16}]}>
          <Text style={styles.textName}> {t(translation.group_chat)}</Text>
          <View style={{flex: 2}}>
            {props.dataLinks.chat_url.map((value, index) => {
              if (value.length > 0) {
                return (
                  <Pressable
                    key={'official' + index.toString()}
                    onPress={() => {
                      MyNavigator.navigate('BLogDetails', {
                        title: value,
                        url: value,
                      });
                    }}>
                    <Text style={styles.textValue}>{value}</Text>
                  </Pressable>
                );
              }
              return null;
            })}
          </View>
        </View>
        <View style={[styles.viewRow, {marginBottom: 16}]}>
          <Text style={styles.textName}>{t(translation.genesis_date)}</Text>
          <Text style={{textAlign: 'right', marginVertical: 8}}>
            {props.date}
          </Text>
        </View>
      </View>
    );
  }
  return <View />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  viewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  textName: {
    marginVertical: 8,
    textTransform: 'capitalize',
    flex: 1,
  },
  textValue: {
    textAlign: 'right',
    marginVertical: 8,
    color: COLOR.BLUE,
  },
});
