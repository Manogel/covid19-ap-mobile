import { Alert } from 'react-native';

import { call, put, select } from 'redux-saga/effects';

import api from '~/services/api';

import SymptomActions from '../ducks/symptom';

export function* getSymptoms() {
  try {
    const response = yield call(api.get, '/symptoms');
    const data = response.data.map(s => ({ ...s, checked: false }));
    yield put(SymptomActions.getSymptomsSuccess(data));
  } catch (err) {
    yield put(SymptomActions.getSymptomsFailure(err));
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
