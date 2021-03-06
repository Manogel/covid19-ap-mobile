import React from 'react';

import { Container, Title, SubTitle } from './styles';

export default function Header({ title, subtitle }) {
  return (
    <Container>
      <Title>{title}</Title>
      {subtitle && <SubTitle>{subtitle}</SubTitle>}
    </Container>
  );
}
