import styled, { css } from 'styled-components/native';

import { colors, NunitoSemiBold } from '~/styles';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background-color: ${colors.primary};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin: 8px;
  padding: 10px;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
    `}

  ${({ success }) =>
    success &&
    css`
      background-color: ${colors.success};
    `}

    ${({ danger }) =>
      danger &&
      css`
        background-color: ${colors.danger};
      `}
`;

export const ButtonText = styled(NunitoSemiBold)`
  color: #fff;
  text-transform: uppercase;
  text-align: center;
`;
