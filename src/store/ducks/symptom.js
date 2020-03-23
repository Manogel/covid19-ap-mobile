import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getSymptomsRequest: [],
  getSymptomsSuccess: ['data'],
  getSymptomsFailure: ['error'],
  checkSymptom: ['payload'],
  setNewSymptomsList: ['data'],
});

export const SymptomTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: {},
  loading: false,
  error: null,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_SYMPTOMS_REQUEST]: state =>
    state.merge({ loading: true, error: null }),
  [Types.GET_SYMPTOMS_SUCCESS]: (state, { data }) =>
    state.merge({ data, loading: false, error: null }),
  [Types.GET_SYMPTOMS_FAILURE]: (state, { error }) =>
    state.merge({ loading: false, error }),
  [Types.CHECK_SYMPTOM]: state => state.merge({}),
  [Types.SET_NEW_SYMPTOMS_LIST]: (state, { data }) => state.merge({ data }),
});
