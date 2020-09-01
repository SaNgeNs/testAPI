import * as types from 'Types';
import fetch from 'node-fetch';
import getFilterFromUrl from 'Utils/getFilterFromUrl';
import Config from 'Config';

export const searchLink = (path = '') => async (dispatch, getState) => {
  const state = getState();

  if (state.links.items[path] || !path.trim()) {
    return;
  }

  dispatch({
    type: types.LINK_REQUEST,
  });

  const {
    terms,
    brands,
    styles,
  } = getFilterFromUrl(path);

  await fetch(`${Config.api}search/parse_link?service_slug=${terms.join(',')}&brand_slug=${brands.join(',')}&style_slug=${styles.join(',')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'ua'
    },
  })
    .then(response => response.json()).then(data => {
      if (data.brand.id || data.service.id || data.style.id) {
        dispatch({
          type: types.LINK_SUCCESS,
          payload: {
            path,
            data,
          }
        });
      }
    }).catch(error => {
      dispatch({
        type: types.LINK_FAILED,
        payload: error
      });
    });
};

export default searchLink;

