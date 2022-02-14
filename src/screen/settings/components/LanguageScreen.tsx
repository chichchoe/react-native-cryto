import React from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {Container, Name} from '../../../components';
import {useTranslation} from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LANGUAGES = [
  {code: 'en', label: 'English'},
  {code: 'vn', label: 'Vietnamese'},
];
export default function LanguageScreen() {
  const {i18n} = useTranslation();
  const selectedLanguageCode = i18n.language;

  const setLanguage = (code: string | undefined) => {
    return i18n.changeLanguage(code);
  };
  console.log(i18n.languages);
  const renderItem = ({item}) => {
    const selectedLanguage = item.code === selectedLanguageCode;
    return (
      <Pressable
        key={item.code}
        style={styles.buttonContainer}
        disabled={selectedLanguage}
        onPress={() => setLanguage(item.code)}>
        <Name style={[selectedLanguage ? styles.selectedText : styles.text]}>
          {item.label}
        </Name>
        {selectedLanguage ? (
          <Ionicons name={'checkmark'} size={24} color={'tomato'} />
        ) : null}
      </Pressable>
    );
  };
  return (
    <Container>
      <FlatList
        data={LANGUAGES}
        renderItem={renderItem}
        keyExtractor={(item, index) => 'item' + index.toString()}
        ItemSeparatorComponent={() => {
          return <View style={styles.ItemSeparatorComponent} />;
        }}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#444',
    fontSize: 28,
    fontWeight: '600',
  },
  buttonContainer: {
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    paddingVertical: 4,
    flex: 1,
  },
  selectedText: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: 'tomato',
    paddingVertical: 4,
  },
  ItemSeparatorComponent: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'blue',
  },
});
