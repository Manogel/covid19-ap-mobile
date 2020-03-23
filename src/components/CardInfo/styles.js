import styled from 'styled-components/native';

import { Nunito, NunitoSemiBold } from '~/styles';

export const Container = styled.View`
  position: absolute;
  background: #fff;
  width: 90%;
  align-self: center;
  bottom: 0;
  margin: 30px 20px;
  padding: 15px;
  border-radius: 5px;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  z-index: 1;
  elevation: 5;
`;

export const ContentSpace = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled(NunitoSemiBold)`
  color: #666;
  text-transform: uppercase;
  font-size: 10px;
  line-height: 20px;
`;

export const Subtitle = styled(NunitoSemiBold)`
  color: #000;
  text-transform: uppercase;
  line-height: 24px;
  font-size: 14px;
`;

export const Street = styled(Nunito)`
  color: #111;
  text-transform: uppercase;
  font-size: 12px;
  line-height: 18px;
`;

export const ContactsTitle = styled(NunitoSemiBold)`
  color: #444;
  text-transform: uppercase;
  font-size: 12px;
  margin: 5px 0;
  text-align: center;
`;

export const Contacts = styled(Nunito)`
  color: #333;
  text-transform: uppercase;
  font-size: 12px;
  text-align: center;
`;

export const ButtonClose = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
  hitSlop: { right: 5, left: 5, bottom: 5, top: 5 },
})``;
