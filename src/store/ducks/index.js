import { combineReducers } from 'redux';

import { reducer as symptom } from './symptom';
import { reducer as user } from './user';

const reducers = combineReducers({
  symptom,
  user,
});

export default reducers;
