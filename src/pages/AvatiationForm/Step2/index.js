import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';

import Button from '~/components/Button';
import Header from '~/components/Header';
import dataCountries from '~/data/countries';
import CheckSymptoms from '~/scripts/checkSymptoms';
import UserActions from '~/store/ducks/user';
import { colors } from '~/styles';

import {
  Container,
  SegmentTitle,
  Option,
  OptionName,
  ContentSpace,
} from '../styles';

export default function Step2({ navigation: { dispatch } }) {
  const dispatchRedux = useDispatch();
  const symptomsSelected = useSelector(state => state.symptom.data).filter(
    ({ checked }) => checked
  );

  const suspicious_contact = useSelector(
    state => state.user.data.suspicious_contact
  );
  const confirmed_contact = useSelector(
    state => state.user.data.confirmed_contact
  );
  const been_outside = useSelector(state => state.user.data.been_outside);
  const [countries, setCountries] = useState(dataCountries);

  function handleSelectSymptom(id) {
    setCountries(
      countries.map(s => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  }

  function handleFinalStep() {
    const result = CheckSymptoms({
      symptoms: symptomsSelected,
      traveled: been_outside,
      countries,
      suspiciousContact: suspicious_contact,
      confirmedContact: confirmed_contact,
    });
    console.tron.warn(symptomsSelected);
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
      <SegmentTitle>
        Teve contato próximo com caso suspeito de COVID-19 (Coronavírus) nos
        últimos 14 dias?
      </SegmentTitle>

      <ContentSpace>
        <Option
          onPress={() =>
            dispatchRedux(UserActions.changeSuspiciousContact(true))
          }
          selected={suspicious_contact === true}
        >
          <OptionName selected={suspicious_contact === true}>Sim</OptionName>
        </Option>
        <Option
          selected={suspicious_contact === false}
          onPress={() =>
            dispatchRedux(UserActions.changeSuspiciousContact(false))
          }
        >
          <OptionName selected={suspicious_contact === false}>Não</OptionName>
        </Option>
      </ContentSpace>

      <SegmentTitle>
        Teve contato próximo com caso confirmado de COVID-19 (Coronavírus) nos
        últimos 14 dias?
      </SegmentTitle>

      <ContentSpace>
        <Option
          onPress={() =>
            dispatchRedux(UserActions.changeConfirmedContact(true))
          }
          selected={confirmed_contact === true}
        >
          <OptionName selected={confirmed_contact === true}>Sim</OptionName>
        </Option>
        <Option
          selected={confirmed_contact === false}
          onPress={() =>
            dispatchRedux(UserActions.changeConfirmedContact(false))
          }
        >
          <OptionName selected={confirmed_contact === false}>Não</OptionName>
        </Option>
      </ContentSpace>

      <SegmentTitle>Esteve em outro país nos últimos 14 dias?</SegmentTitle>

      <ContentSpace>
        <Option
          onPress={() => dispatchRedux(UserActions.changeBeenOutside(true))}
          selected={been_outside === true}
        >
          <OptionName selected={been_outside === true}>Sim</OptionName>
        </Option>
        <Option
          selected={been_outside === false}
          onPress={() => dispatchRedux(UserActions.changeBeenOutside(false))}
        >
          <OptionName selected={been_outside === false}>Não</OptionName>
        </Option>
      </ContentSpace>

      {been_outside && (
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

      <Button
        onSubmit={handleFinalStep}
        disabled={
          confirmed_contact === null ||
          suspicious_contact === null ||
          been_outside === null
        }
      >
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
