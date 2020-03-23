import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  actionType: ['dataPassed'],
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
  loading: false,
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
});
