import * as types from '../types';

const initialState = {
  data: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.URI:
      return {
        ...state,
        data: action.payload
      };
    default:
      return {
        ...state
      };
  }
};
