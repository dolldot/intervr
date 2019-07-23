import axios from 'axios';

import * as types from '../types';
import { url } from '../../config/config';

export const question = id => {
  return {
    type: types.QUESTION,
    payload: axios({
      method: 'GET',
      url: `${url.server}questions?number=${id}`
    })
  };
};

export const questions = () => {
  return {
    type: types.QUESTIONS,
    payload: axios({
      method: 'GET',
      url: `${url.server}questions`
    })
  };
};
