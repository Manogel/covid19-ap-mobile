import styled from 'styled-components/native';

import markubs from '~/assets/icons/markubs.png';

export const Container = styled.View``;

export const MarkerImage = styled.Image.attrs({
  source: markubs,
  resizeMode: 'contain',
})`
  height: 40px;
  width: 40px;
`;
