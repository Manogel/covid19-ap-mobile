import React from 'react';

import Header from '~/components/Header';

import { Container, CardContent, ImageTopic, TextHtml } from './styles';

export default function Detail({ navigation }) {
  const { imagem, texto } = navigation.getParam('topic');
  console.log(texto);
  return (
    <Container showsVerticalScrollIndicator={false}>
      <CardContent>
        <ImageTopic source={{ uri: imagem, cache: 'force-cache' }} />
        <TextHtml value={`<p>${texto} </p>`} debug />
      </CardContent>
    </Container>
  );
}

Detail.navigationOptions = ({ navigation }) => {
  const { titulo } = navigation.getParam('topic');

  return {
    headerTitle: () => <Header title={titulo} subtitle="Fique atento." />,
  };
};
