import * as types from 'Types';

export const initialState = {
  items: {},
  isFetching: false,
  isRequestFailed: false,
  isInitialized: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LINK_REQUEST: {
      return {
        ...state,
        isFetching: true,
        isRequestFailed: false,
        isInitialized: false,
      };
    }

    case types.LINK_SUCCESS: {
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.path]: action.payload.data,
        },
        isFetching: false,
        isRequestFailed: false,
        isInitialized: true,
      };
    }

    case types.LINK_FAILED: {
      return {
        ...state,
        isFetching: false,
        isRequestFailed: true,
        isInitialized: true,
      };
    }

    default:
      return state;
  }
};
