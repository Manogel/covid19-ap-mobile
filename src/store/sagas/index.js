import { all, takeLatest } from 'redux-saga/effects';

import { SymptomTypes } from '../ducks/symptom';
import { getSymptoms, checkSymptom } from './symptom';

export default function* rootSaga() {
  yield all([
    takeLatest(SymptomTypes.GET_SYMPTOMS_REQUEST, getSymptoms),
    takeLatest(SymptomTypes.CHECK_SYMPTOM, checkSymptom),
  ]);
}
