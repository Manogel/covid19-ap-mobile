import HTMLView from 'react-native-htmlview';

import styled from 'styled-components/native';

import { NunitoSemiBold, colors, Nunito } from '~/styles';

export const Container = styled.View`
  background: ${colors.secundary};
`;

export const CardContent = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  padding: 15px;
  background: #fff;
  margin: 10px 15px 0 15px;
  border-radius: 5px;

  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const ImageTopic = styled.Image.attrs({
  resizeMode: 'contain',
})`
  width: 100%;
  height: 80px;
  align-self: center;
`;

export const Title = styled(NunitoSemiBold)`
  color: #111;
  text-align: center;
  margin-bottom: 10px;
`;

export const Resum = styled(Nunito)`
  color: #333;
  text-align: justify;
  line-height: 19px;
  height: 57px;
`;
