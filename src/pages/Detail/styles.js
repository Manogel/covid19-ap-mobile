import HTMLView from 'react-native-htmlview';
import HTML from 'react-native-render-html';

import styled from 'styled-components/native';

import { NunitoSemiBold, colors, Nunito } from '~/styles';

export const Container = styled.ScrollView`
  background: ${colors.secundary};
`;

export const CardContent = styled.View`
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
  height: 90px;
  align-self: center;
`;

export const TextHtml = styled(HTMLView).attrs({
  stylesheet: {
    p: {
      color: '#222',
      textAlign: 'justify',
      fontFamily: 'nunito',
    },
  },
})``;
