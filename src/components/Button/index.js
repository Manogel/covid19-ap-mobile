import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container, ButtonText } from './styles';

export default function Button({ children, onSubmit, loading, ...rest }) {
  return (
    <Container onPress={onSubmit} {...rest}>
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <ButtonText>{children}</ButtonText>
      )}
    </Container>
  );
}

Button.defaultProps = {
  loading: false,
};
