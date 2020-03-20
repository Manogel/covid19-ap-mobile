import React from 'react';

import { Container, ButtonText } from './styles';

export default function Button({ children, onSubmit, ...rest }) {
  return (
    <Container onPress={onSubmit} {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
}
