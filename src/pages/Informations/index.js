import React from 'react';

import Header from '~/components/Header';

import { Container } from './styles';

export default function Informations() {
  return <Container />;
}

Informations.navigationOptions = {
  headerTitle: () => (
    <Header title="Informe-se" subtitle="Leia as dicas abaixo e previna-se." />
  ),
};
