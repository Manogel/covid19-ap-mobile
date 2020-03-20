import HTMLView from 'react-native-htmlview';

import styled from 'styled-components/native';

import coronavirus from '~/assets/icons/coronavirus.png';
import sus from '~/assets/icons/sus.png';
import { colors, PlatformType } from '~/styles';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 10,
  },
})`
  background: ${colors.secundary};
`;

export const ImageCoronavirus = styled.Image.attrs(props => ({
  resizeMode: 'contain',
  source: props.result ? coronavirus : sus,
}))`
  width: 100%;
  height: 90px;
  align-self: center;
`;

export const TextHtml = styled(HTMLView).attrs({
  stylesheet: {
    p: {
      color: '#222',
      textAlign: 'justify',
      fontFamily: 'Nunito',
    },
    strong: {
      color: '#222',
      fontSize: 15,
      textAlign: 'justify',
      fontFamily: PlatformType === 'ios' ? 'Nunito' : 'Nunito Bold',
      fontWeight: PlatformType === 'ios' ? 'bold' : 'normal',
    },
  },
})``;
