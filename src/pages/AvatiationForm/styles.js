import styled, { css } from 'styled-components/native';

import { NunitoSemiBold, Nunito, colors, metrics } from '~/styles';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    padding: 10,
  },
})`
  background: ${colors.background};
  flex: 1;
`;

export const SegmentTitle = styled(NunitoSemiBold)`
  color: #555;
  text-align: center;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const Option = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  width: 100%;
  max-width: ${(metrics.screenWhidth - 60) / 2}px;
  background: #ebebeb;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: 10px;

  ${({ selected }) =>
    selected &&
    css`
      background: ${colors.success};
      color: #fff;
    `}
`;

export const OptionName = styled(Nunito)`
  color: #666;
  text-align: center;
  ${({ selected }) =>
    selected &&
    css`
      color: #fff;
    `}
`;

export const ContentSpace = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 8px 10px 8px;
`;
