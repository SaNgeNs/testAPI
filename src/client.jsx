import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { loadableReady } from '@loadable/component';
import { I18nextProvider } from "react-i18next";
import App from 'Components/App';
import i18next from 'Utils/i18next';
import CreatedStore from 'Store';

const state = window.__PRELOADED_STATE__;
const store = CreatedStore(state);

delete window.__PRELOADED_STATE__;

loadableReady(() => ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next(window.location.href)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
));
