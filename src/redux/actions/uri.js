import * as types from '../types';

export const uri = value => {
  return {
    type: types.URI,
    payload: value
  };
};
