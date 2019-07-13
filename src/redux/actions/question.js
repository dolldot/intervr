import axios from 'axios';

import * as types from '../types';
import { url } from '../../config/config';

export const QUESTION = () => {
  return {
    type: types.QUESTION,
    payload: axios({
      method: 'GET',
      url: `${url.server}questions`
    })
  };
};
