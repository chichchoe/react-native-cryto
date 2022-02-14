import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props: {theme: {PRIMARY_BACKGROUND_COLOR: string}}) =>
    props.theme.PRIMARY_BACKGROUND_COLOR};
`;
const ContainerBottom = styled.SafeAreaView`
border-top-width: 1px;
border-top-style : solid;
border-top-color : #727573
  background-color: ${(props: {theme: {PRIMARY_BACKGROUND_COLOR: string}}) =>
    props.theme.PRIMARY_BACKGROUND_COLOR};
`;
const Title = styled.Text`
  padding: 20px;
  font-size: 24px;
  font-weight: 500;
  color: ${(props: {theme: {PRIMARY_TEXT_COLOR: string}}) =>
    props.theme.PRIMARY_TEXT_COLOR};
`;

const Text = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${(props: {theme: {PRIMARY_TEXT_COLOR: string}}) =>
    props.theme.PRIMARY_TEXT_COLOR};
`;
const TextH1 = styled.Text`
  font-size: 26px;
  font-weight: 800;
  color: ${(props: {theme: {PRIMARY_TEXT_COLOR: string}}) =>
    props.theme.PRIMARY_TEXT_COLOR};
`;
const TextH2 = styled.Text`
  font-size: 24px;
  font-weight: 700;
  color: ${(props: {theme: {PRIMARY_TEXT_COLOR: string}}) =>
    props.theme.PRIMARY_TEXT_COLOR};
`;
const TextH3 = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: ${(props: {theme: {PRIMARY_TEXT_COLOR: string}}) =>
    props.theme.PRIMARY_TEXT_COLOR};
`;
const TextH4 = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${(props: {theme: {PRIMARY_TEXT_COLOR: string}}) =>
    props.theme.PRIMARY_TEXT_COLOR};
`;

const Button = styled.TouchableOpacity`
  margin-top: 20px;
  background-color: ${(props: {theme: {SECONDARY_BUTTON_COLOR: string}}) =>
    props.theme.SECONDARY_BUTTON_COLOR};
  border-radius: 5px;
  padding: 10px;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  color: ${(props: {theme: {SECONDARY_TEXT_COLOR: string}}) =>
    props.theme.SECONDARY_TEXT_COLOR};
`;
const ViewBlog = styled.View`
  flex: 1;
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 15px;
  background-color: ${(props: {theme: {SECONDARY_BUTTON_COLOR: String}}) =>
    props.theme.SECONDARY_BUTTON_COLOR};
`;
const Name = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${(props: {theme: {PRIMARY_TEXT_COLOR: String}}) =>
    props.theme.PRIMARY_TEXT_COLOR};
`;
const ItemSetting = styled.View`
  flex-direction: row;
  padding-left: 12px;
  padding-top: 12px;
  padding-right: 12px;
  padding-bottom: 12px;
  margin-left: 6px;
  margin-right: 6px;
  margin-top: 8px;
  border-radius: 8px;
  background-color: ${(props: {theme: {VIEW_ITEM_SETTING: String}}) =>
    props.theme.VIEW_ITEM_SETTING};
`;
const ItemBlog = styled.View`
  background-color: ${(props: {theme: {VIEW_ITEM_SETTING: String}}) =>
    props.theme.VIEW_ITEM_SETTING};
  flex-direction: row;
  margin-left: 6px;
  margin-right: 6px;
  border-radius: 8px;
`;

export {
  Container,
  Text,
  TextH1,
  TextH2,
  TextH3,
  TextH4,
  Title,
  Button,
  ButtonText,
  ViewBlog,
  Name,
  ItemSetting,
  ItemBlog,
  ContainerBottom,
};
