import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import { StackActions, NavigationActions } from 'react-navigation';

import Button from '~/components/Button';
import Header from '~/components/Header';
import { colors } from '~/styles';

import { Container, TextHtml, ImageCoronavirus } from './styles';

export default function AvaliationResult({
  navigation: { getParam, dispatch, setParams, navigate },
}) {
  const { result, render } = getParam('result');

  useEffect(() => {
    function handleBack() {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({
            routeName: 'Map',
          }),
        ],
      });
      dispatch(resetAction);
    }

    setParams({
      handleBack,
    });
  }, []);

  return (
    <>
      <Container showsVerticalScrollIndicator={false}>
        <ImageCoronavirus result={result} />
        <TextHtml value={render} />
      </Container>

      {result && (
        <Button
          success
          onPress={() => {
            navigate('UserForm');
          }}
        >
          Preencher formulário pra acompanhamento
        </Button>
      )}
    </>
  );
}

AvaliationResult.navigationOptions = ({ navigation: { state } }) => {
  const { params } = state;
  return {
    headerTitle: () => (
      <Header
        title="Resultado da auto-avaliação de saúde."
        // subtitle="Este teste não substitui uma avaliação médica"
      />
    ),
    headerTitleContainerStyle: {
      width: '80%',
    },
    headerLeft: () => (
      <TouchableOpacity
        style={{ marginLeft: 3 }}
        onPress={() => params.handleBack()}
        hitSlop={{ left: 5, right: 10, top: 5, bottom: 5 }}
      >
        <Icon name="left" color="#fff" size={25} />
      </TouchableOpacity>
    ),
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
};
