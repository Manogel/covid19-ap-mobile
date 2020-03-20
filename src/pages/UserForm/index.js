import React, { useRef, useState } from 'react';
import { View } from 'react-native';

import { Form } from '@unform/mobile';

import Button from '~/components/Button';
import Header from '~/components/Header';
import Input from '~/components/Input';
import PickerOptions from '~/components/PickerOptions';
import dataSymptoms from '~/data/symptoms';
import { colors } from '~/styles';

import { Container, Title, InputContent, Label } from './styles';

export default function UserForm() {
  const [suspiciousContact, setSuspiciousContact] = useState(null);
  const [confirmedContact, setConfirmedContact] = useState(null);
  const [traveled, setTraveled] = useState(null);
  const [symptoms, setSymptoms] = useState(dataSymptoms);

  const formRef = useRef(null);
  return (
    <Container>
      <Title>
        Os dados serão enviados a um profissional da saúde que posteriormente
        irá entrar em contato com você.
      </Title>

      <Form ref={formRef} onSubmit={() => {}}>
        <InputContent>
          <Input
            name="nome"
            label="Nome"
            placeholder="Seu nome"
            autoCapitalize="none"
            onSubmitEditing={() => {}}
            returnKeyType="next"
          />
        </InputContent>
        <InputContent>
          <Input
            name="nome_social"
            label="Nome social"
            placeholder="Como deseja ser chamado?"
            autoCapitalize="none"
            onSubmitEditing={() => {}}
            returnKeyType="next"
          />
        </InputContent>
        <InputContent>
          <Input
            name="contato"
            label="Contato"
            placeholder="Seu telefone para contato"
            autoCapitalize="none"
            onSubmitEditing={() => {}}
            returnKeyType="next"
          />
        </InputContent>
        <InputContent>
          <Input
            label="CPF"
            name="cpf"
            placeholder="Seu cpf"
            autoCapitalize="none"
            onSubmitEditing={() => {}}
            returnKeyType="next"
          />
        </InputContent>
        <InputContent>
          <Input
            label="Data de nascimento"
            name="dt_nascimento"
            placeholder="Sua data de nascimento"
            autoCapitalize="none"
            onSubmitEditing={() => {}}
            returnKeyType="next"
          />
        </InputContent>
        <InputContent>
          <Input
            label="Email"
            name="email"
            placeholder="Seu email"
            autoCapitalize="none"
            onSubmitEditing={() => {}}
            returnKeyType="next"
          />
        </InputContent>

        <InputContent>
          <Label>Selecione seus sintomas</Label>
          <PickerOptions
            colorTheme={colors.primary}
            popupTitle="Selecione seus sintomas"
            cancelButtonText="Cancelar"
            selectButtonText="Selecionar"
            title="Selecione"
            data={symptoms}
            onSelect={value => {}}
            onRemoveItem={value => {}}
            buttonTextStyle={{ textTransform: 'capitalize' }}
            showSearchBox={false}
            iconColorItemSected={colors.success}
          />
        </InputContent>

        <InputContent>
          <Label>
            Teve contato próximo com caso suspeito de COVID-19 (Coronavírus) nos
            últimos 14 dias?
          </Label>
          <PickerOptions
            isSelectSingle
            colorTheme={colors.primary}
            popupTitle="Teve contato próximo com caso suspeito de COVID-19 (Coronavírus) nos
          últimos 14 dias?"
            cancelButtonText="Cancelar"
            selectButtonText="Selecionar"
            title="Selecione"
            data={[
              { id: 1, name: 'SIM', checked: suspiciousContact === 1 },
              { id: 2, name: 'NÃO', checked: suspiciousContact === 2 },
            ]}
            onSelect={value => setSuspiciousContact(value[0])}
            onRemoveItem={value => setSuspiciousContact(value[0])}
            buttonTextStyle={{ textTransform: 'capitalize' }}
            showSearchBox={false}
            iconColorItemSected={colors.success}
          />
        </InputContent>

        <InputContent>
          <Label>
            Teve contato próximo com caso confirmado de COVID-19 (Coronavírus)
            nos últimos 14 dias?
          </Label>
          <PickerOptions
            isSelectSingle
            colorTheme={colors.primary}
            popupTitle="Teve contato próximo com caso confirmado de COVID-19 (Coronavírus) nos
            últimos 14 dias?"
            cancelButtonText="Cancelar"
            selectButtonText="Selecionar"
            title="Selecione"
            data={[
              { id: 1, name: 'SIM', checked: confirmedContact === 1 },
              { id: 2, name: 'NÃO', checked: confirmedContact === 2 },
            ]}
            onSelect={value => setConfirmedContact(value[0])}
            onRemoveItem={value => setConfirmedContact(value[0])}
            buttonTextStyle={{ textTransform: 'capitalize' }}
            showSearchBox={false}
            iconColorItemSected={colors.success}
          />
        </InputContent>

        <InputContent>
          <Label>Esteve em outro país nos últimos 14 dias?</Label>
          <PickerOptions
            isSelectSingle
            colorTheme={colors.primary}
            popupTitle="Esteve em outro país nos últimos 14 dias?"
            cancelButtonText="Cancelar"
            selectButtonText="Selecionar"
            title="Selecione"
            data={[
              { id: 1, name: 'SIM', checked: traveled === 1 },
              { id: 2, name: 'NÃO', checked: traveled === 2 },
            ]}
            onSelect={value => setTraveled(value[0])}
            onRemoveItem={value => setTraveled(value[0])}
            buttonTextStyle={{ textTransform: 'capitalize' }}
            showSearchBox={false}
            iconColorItemSected={colors.success}
          />
        </InputContent>

        <Button>Salvar</Button>
      </Form>
    </Container>
  );
}

UserForm.navigationOptions = {
  headerTitle: () => (
    <Header title="Preencha o formulário de acompanhamento." />
  ),
  headerTitleContainerStyle: {
    width: '80%',
  },
};
