import axios from 'axios';

import * as types from '../types';
import { url } from '../../config/config';

export const ANSWER = (userId, questionId, answer, attachment) => {
  return {
    type: types.USER,
    payload: axios({
      method: 'POST',
      url: `${url.server}answer/${questionId}`,
      data: {
        userId: userId,
        answer: answer,
        attachment: attachment
      }
    })
  };
};
