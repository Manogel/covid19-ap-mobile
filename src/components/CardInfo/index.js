import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  Container,
  ContentSpace,
  Title,
  Subtitle,
  Street,
  ButtonClose,
} from './styles';

export default function CardInfo({ ubs, onClose }) {
  return (
    <Container>
      <ContentSpace>
        <Title>{ubs.descricaoTipo}</Title>
        <ButtonClose onPress={onClose}>
          <Icon name="close" size={18} color="#777" />
        </ButtonClose>
      </ContentSpace>

      <Subtitle>{ubs.nomeFantasia}</Subtitle>
      <Street>
        {ubs.logradouro}, {ubs.bairro}, {ubs.municipio} - {ubs.cep}
      </Street>
    </Container>
  );
}
