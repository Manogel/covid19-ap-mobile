import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-community/async-storage';
import Parse from 'parse/react-native';

import Header from '~/components/Header';

import { Container, CardContent, ImageTopic, Title, Resum } from './styles';

export default function Informations({ navigation: { navigate } }) {
  const [topics, setTopics] = useState(null);

  useEffect(() => {
    Parse.setAsyncStorage(AsyncStorage);
    Parse.initialize(
      '123242d9f6164a2d1b6eb0266010f1b1',
      'W1ccHDYbSQSeSWJxrdzWGjrSbXxeYMyW5BDGIbVo',
      '8798c7b4a2b5ff83a167b072dee17421'
    );
    Parse.serverURL = 'http://mobileapps.saude.gov.br/coronavirus';
    // Parse.Object.extend('dicas');
    new Promise(async resolve => {
      const Classe = Parse.Object.extend('dicas');
      const query = new Parse.Query(Classe);
      query.limit(2000);
      query.descending('updatedAt');
      const dicas = await query.find();
      resolve(JSON.parse(JSON.stringify(dicas)));
    }).then(response => {
      setTopics(response);
    });
  }, []);

  return (
    <Container>
      <FlatList
        data={topics}
        renderItem={({ item: topic }) => (
          <CardContent
            onPress={() => {
              navigate('Detail', {
                topic: {
                  imagem: topic.imagem.url,
                  titulo: topic.titulo,
                  texto: topic.texto,
                },
              });
            }}
          >
            <ImageTopic
              source={{ uri: topic?.imagem?.url, cache: 'force-cache' }}
            />
            <Title>{topic.titulo}</Title>
            <Resum numberOfLines={3}>{topic.resumo}</Resum>
          </CardContent>
        )}
        keyExtractor={item => item.objectId}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}

Informations.navigationOptions = {
  headerTitle: () => (
    <Header title="Informe-se" subtitle="Leia as dicas abaixo e previna-se." />
  ),
};
