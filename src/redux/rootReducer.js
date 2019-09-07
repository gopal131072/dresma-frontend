import { combineReducers } from 'redux';
import { USERREDUCER } from '../components/Users/UserReducer';

const appReducer = combineReducers({
  USERREDUCER
});

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer;