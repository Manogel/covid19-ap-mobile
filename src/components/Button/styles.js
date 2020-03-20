import styled, { css } from 'styled-components/native';

import { colors, NunitoSemiBold } from '~/styles';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: 44px;
  background-color: ${colors.primary};
  border-radius: 5px;
  align-items: center;
  justify-content: center;
  margin: 8px;

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
    `}
`;

export const ButtonText = styled(NunitoSemiBold)`
  color: #fff;
  text-transform: uppercase;
`;
