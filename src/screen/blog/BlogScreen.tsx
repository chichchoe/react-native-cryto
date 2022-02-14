import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  View,
} from 'react-native';
import {Container, TextH4, Text, ItemBlog} from '../../components';
import {BlogStyles} from './styles/Blog.Styles';
import {useDispatch, useSelector} from 'react-redux';
import {getBlog} from './redux/BlogAction';
import {RootState} from '../redux';
import {BlogModel} from '../../models/Blog.Model';
import MyNavigator from '../../utils/Mynavigation';

export default function BlogScreen() {
  const dispatch = useDispatch();
  const props = useSelector((state: RootState) => state.BlogReducer);
  const renderItem = ({item}: {item: BlogModel}) => {
    return (
      <Pressable
        onPress={() => {
          MyNavigator.navigate('BLogDetails', {
            title: item.title,
            url: item.url,
          });
        }}>
        <ItemBlog>
          <View style={BlogStyles.viewTitles}>
            <TextH4 numberOfLines={2}>{item.title}</TextH4>
            <Text style={{marginTop: 8}} numberOfLines={3}>
              {item.body}
            </Text>
          </View>
          <View style={BlogStyles.viewImages}>
            <Image
              style={BlogStyles.images}
              source={{
                uri: item.imageurl,
              }}
              resizeMode="cover"
            />
          </View>
        </ItemBlog>
      </Pressable>
    );
  };
  function emptyListComponent() {
    if (props.isFistLoading) {
      return <ActivityIndicator size="large" />;
    }
    if (props.isError) {
      return <View />;
    }
    return <View />;
  }
  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);
  return (
    <Container>
      <FlatList
        contentContainerStyle={BlogStyles.contentContainerStyle}
        data={props.arrBlog}
        extraData={props.arrBlog}
        renderItem={renderItem}
        keyExtractor={(_item, index) => 'blog' + index.toString()}
        ListEmptyComponent={emptyListComponent}
        ItemSeparatorComponent={() => {
          return <View style={BlogStyles.ItemSeparatorComponent} />;
        }}
      />
    </Container>
  );
}
