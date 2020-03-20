import styled from 'styled-components/native';

import { Nunito, NunitoSemiBold } from '~/styles';

export const Container = styled.View`
  position: absolute;
  background: #fff;
  width: 90%;
  align-self: center;
  bottom: 0;
  margin: 20px;
  padding: 15px;
  border-radius: 5px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;

  elevation: 5;
`;

export const ContentSpace = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin-top: 10px;
`;

export const Title = styled(NunitoSemiBold)`
  color: #111;
  text-transform: uppercase;
  font-size: 10px;
  line-height: 20px;
  text-align: center;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
  hitSlop: { right: 5, left: 5, bottom: 5, top: 5 },
})`
  flex-direction: row;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;

  elevation: 5;
`;

export const IconHealth = styled.Image`
  width: 30px;
  height: 30px;
`;

export const TextHealth = styled(NunitoSemiBold)`
  color: #222;
  text-transform: capitalize;
  margin-left: 5px;
  font-size: 18px;
`;
