import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  actionType: ['dataPassed'],
});

export const UserTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  symptoms: [
    {
      name: 'Congestão nasal (Nariz entupido)',
      id: 2,
      checked: false,
    },
    {
      name: 'Corrimento nasal (Nariz escorrendo)',
      id: 10,
      checked: false,
    },
    {
      name: 'Febre acima de 37.5 graus',
      id: 7,
      checked: false,
    },
    {
      name: 'Dificuldade para respirar',
      id: 3,
      checked: false,
    },
    {
      name: 'Cansaço',
      id: 1,
      checked: false,
    },
    {
      name: 'Dor de cabeça',
      id: 4,
      checked: false,
    },
    {
      name: 'Dor de garganta',
      id: 5,
      checked: false,
    },
    {
      name: 'Dores pelo corpo',
      id: 6,
      checked: false,
    },

    {
      name: 'Mal-estar geral',
      id: 8,
      checked: false,
    },
    {
      name: 'Tosse',
      id: 9,
      checked: false,
    },
  ],
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ACTION_TYPE]: state => state.merge({ data: [] }),
});
