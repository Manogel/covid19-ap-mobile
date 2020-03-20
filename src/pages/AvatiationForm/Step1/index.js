import React, { useState } from 'react';
import { FlatList } from 'react-native';

import Button from '~/components/Button';
import Header from '~/components/Header';
import dataSymptoms from '~/data/symptoms';

import {
  Container,
  SegmentTitle,
  Option,
  OptionName,
  ContentSpace,
} from '../styles';

export default function Step1({ navigation: { navigate } }) {
  const [symptoms, setSymptoms] = useState(dataSymptoms);

  const [suspiciousContact, setSuspiciousContact] = useState(null);
  const [confirmedContact, setConfirmedContact] = useState(null);

  function handleSelectSymptom(id) {
    setSymptoms(
      symptoms.map(s => (s.id === id ? { ...s, selected: !s.selected } : s))
    );
  }

  function handleNextStep() {
    const symptomsSelected = symptoms.filter(({ selected }) => selected);
    const data = {
      symptoms: symptomsSelected,
      suspiciousContact,
      confirmedContact,
    };

    navigate('AvaliationStep2', { data });
  }
  return (
    <Container showsVerticalScrollIndicator={false}>
      <SegmentTitle>Selecione seus sintomas</SegmentTitle>

      <FlatList
        data={symptoms}
        renderItem={({ item: { name, id, selected } }) => (
          <Option selected={selected} onPress={() => handleSelectSymptom(id)}>
            <OptionName selected={selected}>{name}</OptionName>
          </Option>
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{
          marginHorizontal: 8,
          justifyContent: 'space-between',
        }}
      />

      <SegmentTitle>
        Teve contato próximo com caso suspeito de COVID-19 (Coronavírus) nos
        últimos 14 dias?
      </SegmentTitle>

      <ContentSpace>
        <Option
          onPress={() => setSuspiciousContact(true)}
          selected={suspiciousContact === true}
        >
          <OptionName selected={suspiciousContact === true}>Sim</OptionName>
        </Option>
        <Option
          selected={suspiciousContact === false}
          onPress={() => setSuspiciousContact(false)}
        >
          <OptionName selected={suspiciousContact === false}>Não</OptionName>
        </Option>
      </ContentSpace>

      <SegmentTitle>
        Teve contato próximo com caso confirmado de COVID-19 (Coronavírus) nos
        últimos 14 dias?
      </SegmentTitle>

      <ContentSpace>
        <Option
          onPress={() => setConfirmedContact(true)}
          selected={confirmedContact === true}
        >
          <OptionName selected={confirmedContact === true}>Sim</OptionName>
        </Option>
        <Option
          selected={confirmedContact === false}
          onPress={() => setConfirmedContact(false)}
        >
          <OptionName selected={confirmedContact === false}>Não</OptionName>
        </Option>
      </ContentSpace>
      <Button
        onSubmit={handleNextStep}
        disabled={confirmedContact === null || suspiciousContact === null}
      >
        Confirmar
      </Button>
    </Container>
  );
}

Step1.navigationOptions = {
  headerTitle: () => <Header title="Faça uma auto-avaliação da sua saúde" />,
  headerTitleContainerStyle: {
    width: '80%',
  },
  headerLeftContainerStyle: null,
  headerTitleAlign: 'left',
};
