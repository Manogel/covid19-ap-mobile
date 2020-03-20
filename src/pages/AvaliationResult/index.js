import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';

import Button from '~/components/Button';
import Header from '~/components/Header';

import { Container, TextHtml, ImageCoronavirus } from './styles';

export default function AvaliationResult({
  navigation: { getParam, dispatch },
}) {
  const { result, render } = getParam('result');

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

  return (
    <>
      <Container showsVerticalScrollIndicator={false}>
        <ImageCoronavirus result={result} />
        <TextHtml value={render} />
      </Container>
      <Button onPress={handleBack}>fechar</Button>
    </>
  );
}

AvaliationResult.navigationOptions = {
  headerTitle: () => (
    <Header
      title="Resultado da auto-avaliação de saúde."
      subtitle="Este teste não substitui uma avaliação médica"
    />
  ),
  headerTitleContainerStyle: {
    width: '95%',
  },
};
