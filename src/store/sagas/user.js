import { Alert } from 'react-native';

import moment from 'moment';
import { call, put, select } from 'redux-saga/effects';

import api, { setToken } from '~/services/api';
import NavigationService from '~/services/navigation';

import SymptomActions from '../ducks/symptom';
import UserActions from '../ducks/user';

export function* handleRegisterNewUser({ payload }) {
  try {
    const {
      name,
      social_name,
      cpf,
      birthday,
      contact,
      email,
      address,
      password,
    } = payload;
    const {
      suspicious_contact,
      confirmed_contact,
      been_outside,
      sex,
    } = yield select(state => state.user.data);
    const dataSymptoms = yield select(state => state.symptom.data);

    const { data: dataCitizen } = yield call(api.post, '/citizens', {
      name,
      social_name,
      cpf,
      birthday: moment(birthday).format('YYYY-MM-DD'),
      contact,
      email,
      password,
      address,
      sex,
      suspicious_contact,
      confirmed_contact,
      been_outside,
    });

    const symptoms = dataSymptoms.reduce((final, symptom) => {
      if (symptom.checked) {
        return [...final, symptom.id];
      }
      return final;
    }, []);

    yield call(api.post, `/citizens/${dataCitizen.id}/collect_symptoms`, {
      symptoms,
      observation: 'Teste',
    });

    const {
      data: { token },
    } = yield call(api.post, `sessions/citizens`, {
      cpf,
      password,
    });

    yield put(UserActions.onLoginSuccess(dataCitizen, token));
    setToken(token);
    NavigationService.navigateReset('Map');
  } catch (err) {
    console.tron.error(err);
    if (err.response) {
      Alert.alert('Ocorreu um erro', err.response.data.error);
    }
    yield put(UserActions.onUserFailure(err));
  }
}

export function* checkSymptom({ payload }) {
  try {
    const symptoms = yield select(state => state.symptom.data);
    const { id, checked } = payload;
    const data = symptoms.map(s => (s.id === id ? { ...s, checked } : s));
    yield put(SymptomActions.getSymptomsSuccess(data));
  } catch (err) {
    yield put(SymptomActions.getSymptomsFailure(err));
  }
}
