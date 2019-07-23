import * as types from '../types';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.QUESTIONS:
      return {
        ...state,
        isLoading: true
      };

    case types.QUESTIONS_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: 'Error bro'
      };

    case types.QUESTIONS_FULFILLED:
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false
      };

    default:
      return {
        ...state
      };
  }
};
