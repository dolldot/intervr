import axios from 'axios';

import * as types from '../types';
import { url } from '../../config/config';

export const answer = (value) => {
  return {
    type: types.ANSWER,
    payload: axios({
      method: 'POST',
      url: `${url.server}answer`,
      data: {
        questionId: value.questionId,
        userId: value.userId,
        answer: value.answer,
        attachment: value.attachment
      }
    })
  };
};
