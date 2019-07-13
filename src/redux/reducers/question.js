import * as types from '../types';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.QUESTION:
      return {
        ...state,
        isLoading: true,
      };

    case types.QUESTION_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: 'Error bro',
      };

    case types.QUESTION_FULFILLED:
      return {
        ...state,
        data: action.payload.data.data,
        isLoading: false,
      };

    default:
      return {
        ...state
      };
  }
};
