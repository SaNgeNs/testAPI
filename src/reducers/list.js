import * as types from 'Types';

export const initialState = {
  terms: {
    items: [],
    isFetching: false,
    isRequestFailed: false,
    isInitialized: false,
  },
  brands: {
    items: [],
    isFetching: false,
    isRequestFailed: false,
    isInitialized: false,
  },
  styles: {
    items: [],
    isFetching: false,
    isRequestFailed: false,
    isInitialized: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TERMS_REQUEST: {
      return {
        ...state,
        terms: {
          ...state.terms,
          isFetching: false,
          isRequestFailed: false,
          isInitialized: false,
        },
      };
    }

    case types.TERMS_SUCCESS: {
      return {
        ...state,
        terms: {
          ...state.terms,
          items: action.payload,
          isFetching: false,
          isRequestFailed: false,
          isInitialized: true,
        },
      };
    }

    case types.TERMS_FAILED: {
      return {
        ...state,
        terms: {
          ...state.terms,
          isFetching: false,
          isRequestFailed: true,
          isInitialized: true,
        },
      };
    }

    case types.BRANDS_REQUEST: {
      return {
        ...state,
        brands: {
          ...state.terms,
          isFetching: false,
          isRequestFailed: false,
          isInitialized: false,
        },
      };
    }

    case types.BRANDS_SUCCESS: {
      return {
        ...state,
        brands: {
          ...state.terms,
          items: action.payload,
          isFetching: false,
          isRequestFailed: false,
          isInitialized: true,
        },
      };
    }

    case types.BRANDS_FAILED: {
      return {
        ...state,
        brands: {
          ...state.terms,
          isFetching: false,
          isRequestFailed: true,
          isInitialized: true,
        },
      };
    }

    case types.STYLES_REQUEST: {
      return {
        ...state,
        styles: {
          ...state.terms,
          isFetching: false,
          isRequestFailed: false,
          isInitialized: false,
        },
      };
    }

    case types.STYLES_SUCCESS: {
      return {
        ...state,
        styles: {
          ...state.terms,
          items: action.payload,
          isFetching: false,
          isRequestFailed: false,
          isInitialized: true,
        },
      };
    }

    case types.STYLES_FAILED: {
      return {
        ...state,
        styles: {
          ...state.terms,
          isFetching: false,
          isRequestFailed: true,
          isInitialized: true,
        },
      };
    }

    default:
      return state;
  }
};
