import styled, { css } from 'styled-components/native';

import { colors } from '~/styles';

export const Container = styled.TextInput.attrs({
  placeholderTextColor: '#777',
})`
  padding: 0 15px;
  height: 44px;
  background: #ebebeb;
  color: #333;
  border-radius: 4px;

  ${({ editable }) =>
    !editable &&
    css`
      opacity: 0.5;
    `}
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
