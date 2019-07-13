import axios from 'axios';

import * as types from '../types';
import { url } from '../../config/config';

export const USER = (name, email, phone) => {
  return {
    type: types.USER,
    payload: axios({
      method: 'POST',
      url: `${url.server}user`,
      data: {
        name: name,
        email: email,
        phone_number: phone
      }
    })
  };
};
