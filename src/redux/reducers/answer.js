import * as types from '../types';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  errorMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ANSWER:
      return {
        ...state,
        isLoading: true
      };

    case types.ANSWER_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: 'Error cok'
      };

    case types.ANSWER_FULFILLED:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false
      };

    default:
      return {
        ...state
      };
  }
};
