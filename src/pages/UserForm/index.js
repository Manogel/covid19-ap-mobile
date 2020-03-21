import React, { useRef, useState } from 'react';
import { Alert } from 'react-native';
import { MaskService } from 'react-native-masked-text';

import { Form } from '@unform/mobile';
import * as Yup from 'yup';

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

  async function handleSubmit(values) {
    try {
      const schema = Yup.object().shape({
        nome: Yup.string()
          .max(100, 'Máximo 50 caracteres')
          .required('Nome é obrigatório'),
        cpf: Yup.string()
          .cpf('Informe um CPF válido')
          .required('CPF é obrigatório'),
        dt_nascimento: Yup.string()
          .datebr('Informe uma data válida')
          .required('Data de nascimento é obrigatória'),
        contato: Yup.string().required('Seu número para contato é obrigatório'),
        email: Yup.string()
          .email('Informe um email válido')
          .max(100, 'Máximo 50 caracteres')
          .required('Email é obrigatório'),
      });
      await schema.validate(values, {
        abortEarly: false,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errorMessages = {};
        error.inner.forEach(e => {
          errorMessages[e.path] = e.message;
        });
        formRef.current.setErrors(errorMessages);
      } else if (error.response) {
        const { data } = error.response;
        Alert.alert(
          'Erro',
          data.message ? data.message : 'Servidor fora do ar!'
        );
      } else {
        Alert.alert('Erro', error);
        // "Verifique sua conexão com a internet!"
      }
    }
  }

  function handleFocusInput(name) {
    const passwordInput = formRef.current.getFieldRef(name);
    passwordInput.focus();
  }

  return (
    <Container>
      <Title>
        Os dados serão enviados a um profissional da saúde que posteriormente
        irá entrar em contato com você.
      </Title>

      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputContent>
          <Input
            name="nome"
            label="Nome"
            placeholder="Seu nome"
            autoCapitalize="words"
            onSubmitEditing={() => handleFocusInput('nome_social')}
            returnKeyType="next"
            maxLength={100}
          />
        </InputContent>
        <InputContent>
          <Input
            name="nome_social"
            label="Nome social"
            placeholder="Como deseja ser chamado?"
            autoCapitalize="words"
            onSubmitEditing={() => handleFocusInput('cpf')}
            returnKeyType="next"
            maxLength={20}
          />
        </InputContent>
        <InputContent>
          <Input
            label="CPF"
            name="cpf"
            placeholder="Seu cpf"
            keyboardType="numeric"
            autoCapitalize="none"
            onChangeText={text => {
              const formatted = MaskService.toMask('cpf', text);
              formRef.current.setFieldValue('cpf', formatted);
            }}
            returnKeyType="next"
            onSubmitEditing={() => handleFocusInput('dt_nascimento')}
          />
        </InputContent>
        <InputContent>
          <Input
            label="Data de nascimento"
            name="dt_nascimento"
            keyboardType="numeric"
            placeholder="Sua data de nascimento"
            autoCapitalize="none"
            onChangeText={text => {
              const formatted = MaskService.toMask('datetime', text, {
                format: 'DD/MM/YYYY',
              });
              formRef.current.setFieldValue('dt_nascimento', formatted);
            }}
            onSubmitEditing={() => handleFocusInput('contato')}
            returnKeyType="next"
            maxLength={10}
          />
        </InputContent>
        <InputContent>
          <Input
            name="contato"
            label="Contato"
            keyboardType="numeric"
            placeholder="(XX) XXXXX-XXXX"
            autoCapitalize="none"
            onSubmitEditing={() => handleFocusInput('email')}
            onChangeText={text => {
              const formatted = MaskService.toMask('cel-phone', text, {
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              });
              formRef.current.setFieldValue('contato', formatted);
            }}
            returnKeyType="next"
          />
        </InputContent>

        <InputContent>
          <Input
            label="Email"
            name="email"
            autoCapitalize="none"
            placeholder="Seu email"
            autoCorrect={false}
            onSubmitEditing={() => handleFocusInput('senha')}
            returnKeyType="next"
            keyboardType="email-address"
          />
        </InputContent>

        <InputContent>
          <Input
            label="Senha"
            name="senha"
            autoCapitalize="none"
            placeholder="Senha para para acessar seu cadastro"
            autoCorrect={false}
            onSubmitEditing={() => {}}
            returnKeyType="next"
            secureTextEntry
          />
        </InputContent>

        <InputContent>
          <Label>Sexo</Label>
          <PickerOptions
            isSelectSingle
            colorTheme={colors.primary}
            popupTitle="Selecione seu sexo"
            cancelButtonText="Cancelar"
            selectButtonText="Selecionar"
            title="Selecione"
            data={[
              { id: 1, name: 'MASCULINO' },
              { id: 2, name: 'FEMININO' },
            ]}
            onSelect={value => setSuspiciousContact(value[0])}
            onRemoveItem={value => setSuspiciousContact(value[0])}
            buttonTextStyle={{ textTransform: 'capitalize' }}
            showSearchBox={false}
            iconColorItemSected={colors.success}
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

        <Button onSubmit={() => formRef.current.submitForm()}>Salvar</Button>
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
