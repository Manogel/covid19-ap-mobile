import React, { useMemo, memo } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  Container,
  ContentSpace,
  Title,
  Subtitle,
  Street,
  ButtonClose,
  ContactsTitle,
  Contacts,
} from './styles';

function CardInfo({ ubs, onClose }) {
  const numberContacts = useMemo(() => ubs.telefones.length, [ubs]);

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
      {numberContacts > 0 && (
        <ContactsTitle>Telefones para contato</ContactsTitle>
      )}
      {ubs?.telefones.map(({ ddd, numero }) => (
        <Contacts key={numero}>
          {ddd} {numero}
        </Contacts>
      ))}
    </Container>
  );
}

export default memo(CardInfo);
