import React from 'react';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet/lib/Helmet';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import cookiesMiddleware from 'universal-cookie-express';
import compression from 'compression';
import { ChunkExtractor, ChunkExtractorManager } from '@loadable/server';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { I18nextProvider } from "react-i18next";
import App from 'Components/App';
import i18next from 'Utils/i18next';
import localeRegexp from 'Utils/localeRegexp';
import Config from 'Config';
import CreatedStore from 'Store';
import Template from 'Src/template/index.pug';
import getFilterList from 'Actions/getFilterList';
import searchLink from 'Actions/searchLink';

const serverPort = process.env.PORT || Config.PORT;
const path = require('path');
const statsFile = path.join(process.cwd(), 'build/spa/loadable-stats.json');

const minify = require('express-minify');
const uglifyEs = require('uglify-es');

const app = express();

if (Config.env === 'production') {
  app.get('*.js', (req, res, next) => {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
  });
}

app.use(compression());
app.use(minify({
  cache: false,
  uglifyJsModule: uglifyEs,
  errorHandler: null,
  jsMatch: /js/,
}));
app.use(express.static('build/spa'));
app.use(cookiesMiddleware());

app.get(`/:locale(${localeRegexp})?*`, async (req, res) => {
  const extractor = new ChunkExtractor({
    statsFile,
  });

  const context = {};
  const sheets = new ServerStyleSheets();
  const store = CreatedStore({});

  await store.dispatch(getFilterList());
  await store.dispatch(searchLink(req.path.slice(1)));

  const AppContent = (
    sheets.collect(
      <ChunkExtractorManager extractor={extractor}>
        <Provider store={store}>
          <I18nextProvider i18n={i18next(req.url)}>
            <StaticRouter location={req.url} context={context}>
              <App />
            </StaticRouter>
          </I18nextProvider>
        </Provider>
      </ChunkExtractorManager>,
    )
  );

  const HTML = (content) => {
    const scriptTags = extractor.getScriptTags();
    const helmet = Helmet.renderStatic();
    const html = Template({
      helmetTitle: helmet.title ? helmet.title.toString() : '',
      helmetMeta: helmet.meta ? helmet.meta.toString() : '',
      helmetLinks: helmet.link ? helmet.link.toString() : '',
      application: content,
      locale: 'en',
      state: store.getState(),
      styles: `<style id="jss-server-side">${sheets.toString()}</style>`,
      scripts: scriptTags,
    });

    return(html);
  };

  res.status(200);
  res.send(HTML(renderToString(AppContent)));
});

app.listen(serverPort, () => {
  console.log(`🚀  Client server on port ${serverPort}`);
});
