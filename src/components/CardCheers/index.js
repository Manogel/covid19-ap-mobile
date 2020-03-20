import React from 'react';
import { withNavigation } from 'react-navigation';

import bem from '~/assets/icons/bem.png';
import mal from '~/assets/icons/mal.png';

import {
  Container,
  Title,
  ContentSpace,
  Button,
  IconHealth,
  TextHealth,
} from './styles';

function CardCheers({ navigation: { navigate } }) {
  return (
    <Container>
      <Title>Como está sua saúde nesse momento?</Title>
      <ContentSpace>
        <Button>
          <IconHealth source={bem} />
          <TextHealth>Bem</TextHealth>
        </Button>
        <Button>
          <IconHealth source={mal} />
          <TextHealth>mal</TextHealth>
        </Button>
      </ContentSpace>
    </Container>
  );
}

export default withNavigation(CardCheers);
