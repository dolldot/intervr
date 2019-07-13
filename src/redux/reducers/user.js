import * as types from '../types';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.USER:
      return {
        ...state,
        isLoading: true
      };

    case types.USER_REJECTED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: 'Error cok',
      };

    case types.USER_FULFILLED:
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
      };

    default:
      return {
        ...state
      };
  }
};
