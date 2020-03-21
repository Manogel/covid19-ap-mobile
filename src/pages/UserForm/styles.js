import styled from 'styled-components/native';

import { colors, NunitoBold } from '~/styles';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 10,
  },
  showsVerticalScrollIndicator: false,
})`
  background-color: ${colors.background};
  flex: 1;
`;

export const InputContent = styled.View`
  margin: 10px;
`;

export const Logo = styled.Image`
  width: 250px;
  height: 100px;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Title = styled(NunitoBold)`
  font-size: 14px;
  color: #333;
  margin: 10px;
  text-align: center;
`;
export const Label = styled.Text`
  font-size: 12px;
  color: #444;
  margin-bottom: 7px;
`;

export const Error = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: ${colors.danger};
`;
