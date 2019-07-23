import { combineReducers } from 'redux';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import RootNavigation from '../../navigations/RootNavigation';

import question from './question';
import questions from './questions';
import user from './user';
import answer from './answer';
import uri from './uri';

const router = createNavigationReducer(RootNavigation);

const appReducer = combineReducers({
  router,
  question,
  questions,
  user,
  answer,
  uri
});

export default appReducer;
