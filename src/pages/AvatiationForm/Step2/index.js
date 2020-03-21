import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import Button from '~/components/Button';
import Header from '~/components/Header';
import dataCountries from '~/data/countries';
import CheckSymptoms from '~/scripts/checkSymptoms';

import {
  Container,
  SegmentTitle,
  Option,
  OptionName,
  ContentSpace,
} from '../styles';

export default function Step2({ navigation: { dispatch, getParam } }) {
  const dataSymptoms = getParam('data');

  const [countries, setCountries] = useState(dataCountries);
  const [traveled, setTraveled] = useState(null);

  function handleSelectSymptom(id) {
    setCountries(
      countries.map(s => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  }

  function handleFinalStep() {
    const result = CheckSymptoms({ ...dataSymptoms, traveled, countries });
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: 'AvaliationResult',
          params: { result },
        }),
      ],
    });
    dispatch(resetAction);
  }

  return (
    <Container showsVerticalScrollIndicator={false}>
      <SegmentTitle>Esteve em outro país nos últimos 14 dias?</SegmentTitle>

      <ContentSpace>
        <Option onPress={() => setTraveled(true)} selected={traveled === true}>
          <OptionName selected={traveled === true}>Sim</OptionName>
        </Option>
        <Option
          selected={traveled === false}
          onPress={() => setTraveled(false)}
        >
          <OptionName selected={traveled === false}>Não</OptionName>
        </Option>
      </ContentSpace>

      {traveled && (
        <>
          <SegmentTitle>Onde?</SegmentTitle>
          <FlatList
            data={countries}
            renderItem={({ item: { name, id, checked } }) => (
              <Option
                selected={checked}
                onPress={() => handleSelectSymptom(id)}
              >
                <OptionName selected={checked}>{name}</OptionName>
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
        </>
      )}
      <Button onSubmit={handleFinalStep} disabled={traveled === null}>
        finalizar
      </Button>
    </Container>
  );
}

Step2.navigationOptions = {
  headerTitle: () => (
    <Header title="Histórico de deslocamento para outros países." />
  ),
  headerTitleContainerStyle: {
    width: '80%',
  },
};
