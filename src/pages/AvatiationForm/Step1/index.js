import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Button from '~/components/Button';
import Header from '~/components/Header';
import SymptomActions from '~/store/ducks/symptom';
import { colors } from '~/styles';

import {
  Container,
  SegmentTitle,
  Option,
  OptionName,
  ContentSpace,
} from '../styles';

export default function Step1({ navigation: { navigate } }) {
  const dispatch = useDispatch();
  const symptoms = useSelector(state => state.symptom.data);

  function handleSelectSymptom(id, checked) {
    dispatch(SymptomActions.checkSymptom({ id, checked: !checked }));
  }

  return (
    <Container showsVerticalScrollIndicator={false}>
      <SegmentTitle>Selecione seus sintomas</SegmentTitle>

      <FlatList
        data={symptoms}
        renderItem={({ item: { name, id, checked } }) => (
          <Option
            selected={checked}
            onPress={() => handleSelectSymptom(id, checked)}
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

      <Button onSubmit={() => navigate('AvaliationStep2')}>Continuar</Button>
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
  headerStyle: {
    height: 70,
    backgroundColor: colors.primary,
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};
