import axios from 'axios';

import * as types from '../types';
import { url } from '../../config/config';

export const user = (value) => {
  return {
    type: types.USER,
    payload: axios({
      method: 'POST',
      url: `${url.server}user`,
      data: {
        name: value.name,
        email: value.email,
        phone_number: value.phone_number
      }
    })
  };
};
