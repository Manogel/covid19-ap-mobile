import React, { useRef, useState, useMemo } from 'react';
import { Alert } from 'react-native';
import { MaskService } from 'react-native-masked-text';
import { useSelector, useDispatch } from 'react-redux';

import { Form } from '@unform/mobile';
import moment from 'moment';
import Immutable from 'seamless-immutable';
import * as Yup from 'yup';

import Button from '~/components/Button';
import Header from '~/components/Header';
import Input from '~/components/Input';
import PickerOptions from '~/components/PickerOptions';
import dataS from '~/data/symptoms';
import SymptomActions from '~/store/ducks/symptom';
import UserActions from '~/store/ducks/user';
import { colors } from '~/styles';

import { Container, Title, InputContent, Label } from './styles';

export default function UserForm({ navigation }) {
  const dispatchRedux = useDispatch();
  const loading = useSelector(state => state.user.loading);
  const suspicious_contact = useSelector(
    state => state.user.data.suspicious_contact
  );
  const confirmed_contact = useSelector(
    state => state.user.data.confirmed_contact
  );
  const been_outside = useSelector(state => state.user.data.been_outside);
  const sex = useSelector(state => state.user.data.sex);

  const symptoms = useSelector(state => state.symptom.data);

  const formRef = useRef(null);

  const numberSymptomsSeledted = useMemo(
    () =>
      symptoms.reduce((number, symptom) => {
        if (symptom.checked) {
          return number + 1;
        }
        return number;
      }, 0),
    [symptoms]
  );

  async function handleSubmit(values) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .max(100, 'Máximo 50 caracteres')
          .required('Nome é obrigatório'),
        cpf: Yup.string()
          .cpf('Informe um CPF válido')
          .required('CPF é obrigatório'),
        birthday: Yup.string()
          .datebr('Informe uma data válida')
          .required('Data de nascimento é obrigatória'),
        contact: Yup.string().required('Seu número para contato é obrigatório'),
        address: Yup.string().required('Seu endereço é necessário'),
        email: Yup.string()
          .email('Informe um email válido')
          .max(100, 'Máximo 50 caracteres')
          .required('Email é obrigatório'),
        password: Yup.string()
          .min(4, 'No mínimo 4 caracteres')
          .required('Senha é obrigatória'),
      });

      await schema.validate(values, {
        abortEarly: false,
      });
      formRef.current.setErrors({});
      if (!sex) {
        Alert.alert('Você esqueceu de algo', 'Selecione seu sexo');
        return;
      }
      if (numberSymptomsSeledted <= 0) {
        Alert.alert('Você esqueceu de algo', 'Selecione seus sintomas!');
        return;
      }

      dispatchRedux(
        UserActions.onRegisterUser({
          ...values,
          birthday: moment(values.birthday, 'DD/MM/YYYY').format('YYYY-MM-DD'),
        })
      );
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
        Alert.alert('Erro', 'Verifique sua conexão com a internet!');
        // "Verifique sua conexão com a internet!"
      }
    }
  }

  function handleSelectSymptom(values) {
    const newListItems = symptoms.map(s =>
      values.includes(s.id) ? { ...s, checked: true } : { ...s, checked: false }
    );
    dispatchRedux(SymptomActions.setNewSymptomsList(newListItems));
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
            name="name"
            label="Nome"
            placeholder="Seu nome"
            autoCapitalize="words"
            onSubmitEditing={() => handleFocusInput('social_name')}
            returnKeyType="next"
            maxLength={100}
          />
        </InputContent>
        <InputContent>
          <Input
            name="social_name"
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
            onSubmitEditing={() => handleFocusInput('birthday')}
          />
        </InputContent>
        <InputContent>
          <Input
            label="Data de nascimento"
            name="birthday"
            keyboardType="numeric"
            placeholder="Sua data de nascimento"
            autoCapitalize="none"
            onChangeText={text => {
              const formatted = MaskService.toMask('datetime', text, {
                format: 'DD/MM/YYYY',
              });
              formRef.current.setFieldValue('birthday', formatted);
            }}
            onSubmitEditing={() => handleFocusInput('contact')}
            returnKeyType="next"
            maxLength={10}
          />
        </InputContent>
        <InputContent>
          <Input
            name="contact"
            label="Contato"
            keyboardType="numeric"
            placeholder="(XX) XXXXX-XXXX"
            autoCapitalize="none"
            onSubmitEditing={() => handleFocusInput('address')}
            onChangeText={text => {
              const formatted = MaskService.toMask('cel-phone', text, {
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              });
              formRef.current.setFieldValue('contact', formatted);
            }}
            returnKeyType="next"
          />
        </InputContent>

        <InputContent>
          <Input
            name="address"
            label="Endereço"
            placeholder="Avenida bla bla bla..."
            onSubmitEditing={() => handleFocusInput('email')}
            returnKeyType="next"
          />
        </InputContent>

        <InputContent>
          <Input
            label="Email"
            name="email"
            placeholder="Seu email"
            onSubmitEditing={() => handleFocusInput('password')}
            returnKeyType="next"
            caretHidden
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            autoCompleteType="email"
          />
        </InputContent>

        <InputContent>
          <Input
            label="Senha"
            name="password"
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
              { id: 1, name: 'MASCULINO', checked: sex === 'M' },
              { id: 2, name: 'FEMININO', checked: sex === 'F' },
            ]}
            onSelect={value =>
              dispatchRedux(
                UserActions.changeSex(
                  value[0] !== null ? (value[0] === 1 ? 'M' : 'F') : null
                )
              )
            }
            onRemoveItem={value => dispatchRedux(UserActions.changeSex(null))}
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
            onSelect={value => handleSelectSymptom(value)}
            onRemoveItem={value => handleSelectSymptom(value)}
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
              { id: 1, name: 'SIM', checked: suspicious_contact },
              { id: 2, name: 'NÃO', checked: !suspicious_contact },
            ]}
            onSelect={value =>
              dispatchRedux(UserActions.changeSuspiciousContact(value[0] === 1))
            }
            onRemoveItem={value =>
              dispatchRedux(UserActions.changeSuspiciousContact(null))
            }
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
              { id: 1, name: 'SIM', checked: confirmed_contact },
              { id: 2, name: 'NÃO', checked: !confirmed_contact },
            ]}
            onSelect={value =>
              dispatchRedux(UserActions.changeConfirmedContact(value[0] === 1))
            }
            onRemoveItem={value =>
              dispatchRedux(UserActions.changeConfirmedContact(null))
            }
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
              { id: 1, name: 'SIM', checked: been_outside },
              { id: 2, name: 'NÃO', checked: !been_outside },
            ]}
            onSelect={value =>
              dispatchRedux(UserActions.changeBeenOutside(value[0] === 1))
            }
            onRemoveItem={value =>
              dispatchRedux(UserActions.changeBeenOutside(null))
            }
            buttonTextStyle={{ textTransform: 'capitalize' }}
            showSearchBox={false}
            iconColorItemSected={colors.success}
          />
        </InputContent>

        <Button loading={loading} onSubmit={() => formRef.current.submitForm()}>
          Salvar
        </Button>
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
