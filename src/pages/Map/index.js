import React from 'react';

import Header from '~/components/Header';

import { Container } from './styles';

export default function Map() {
  return <Container />;
}

Map.navigationOptions = {
  headerTitle: () => (
    <Header
      title="Mapa"
      subtitle="Veja as Unidades Básicas de Saúde por perto."
    />
  ),
};
