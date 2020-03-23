import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  actionType: ['dataPassed'],
  onRegisterUser: ['payload'],
  onLoginSuccess: ['data', 'token'],
  onUserFailure: ['error'],
  changeSuspiciousContact: ['value'],
  changeConfirmedContact: ['value'],
  changeBeenOutside: ['value'],
  changeSex: ['value'],
});

export const UserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  data: {
    suspicious_contact: null,
    confirmed_contact: null,
    been_outside: null,
    sex: null,
  },
  token: null,
  loading: false,
  error: null,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACTION_TYPE]: state => state.merge({ loading: true }),
  [Types.CHANGE_BEEN_OUTSIDE]: (state, { value }) =>
    state.merge({ data: { ...state.data, been_outside: value } }),
  [Types.CHANGE_CONFIRMED_CONTACT]: (state, { value }) =>
    state.merge({ data: { ...state.data, confirmed_contact: value } }),
  [Types.CHANGE_SUSPICIOUS_CONTACT]: (state, { value }) =>
    state.merge({ data: { ...state.data, suspicious_contact: value } }),
  [Types.CHANGE_SEX]: (state, { value }) =>
    state.merge({ data: { ...state.data, sex: value } }),
  [Types.ON_REGISTER_USER]: state =>
    state.merge({ loading: true, error: null }),

  [Types.ON_LOGIN_SUCCESS]: (state, { data, token }) =>
    state.merge({ loading: false, error: null, data, token }),
  [Types.ON_USER_FAILURE]: (state, { error }) =>
    state.merge({ loading: false, error }),
});
