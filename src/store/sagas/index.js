import { all, takeLatest } from 'redux-saga/effects';

import { SymptomTypes } from '../ducks/symptom';
import { UserTypes } from '../ducks/user';
import { getSymptoms, checkSymptom } from './symptom';
import { handleRegisterNewUser } from './user';

export default function* rootSaga() {
  yield all([
    takeLatest(SymptomTypes.GET_SYMPTOMS_REQUEST, getSymptoms),
    takeLatest(SymptomTypes.CHECK_SYMPTOM, checkSymptom),
    takeLatest(UserTypes.ON_REGISTER_USER, handleRegisterNewUser),
  ]);
}
