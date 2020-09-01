import * as types from 'Types';
import fetch from 'node-fetch';
import Config from 'Config';

export const getFilterList = () => async (dispatch) => {
  dispatch({
    type: types.TERMS_REQUEST,
  });

  dispatch({
    type: types.BRANDS_REQUEST,
  });

  dispatch({
    type: types.STYLES_REQUEST,
  });

  await fetch(`${Config.api}search/terms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'ua'
    },
  })
    .then(response => response.json()).then(data => {
      dispatch({
        type: types.TERMS_SUCCESS,
        payload: data.data
      });
    }).catch(error => {
      dispatch({
        type: types.TERMS_FAILED,
        payload: error
      });
    });

  await fetch(`${Config.api}search/brands_terms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'ua'
    },
  })
    .then(response => response.json()).then(data => {
      dispatch({
        type: types.BRANDS_SUCCESS,
        payload: data.data
      });
    }).catch(error => {
      dispatch({
        type: types.BRANDS_FAILED,
        payload: error
      });
    });

  await fetch(`${Config.api}search/styles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'ua'
    },
  })
    .then(response => response.json()).then(data => {
      dispatch({
        type: types.STYLES_SUCCESS,
        payload: data.data
      });
    }).catch(error => {
      dispatch({
        type: types.STYLES_FAILED,
        payload: error
      });
    });
};

export default getFilterList;
