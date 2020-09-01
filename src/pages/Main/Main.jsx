import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import Helmet from 'react-helmet/lib/Helmet';

import List from 'Components/List';

export const Main = ({
  location = {},
  match,
}) => {
  const terms = useSelector(state => state.list.terms.items);
  const brands = useSelector(state => state.list.brands.items);
  const styles = useSelector(state => state.list.styles.items);
  const dataLink = useSelector(state => state.links.items[location.pathname.slice(1)]);
  const { params } = match;

  return (
    <div
      style={{
        margin: '20px',
      }}
    >
      <Helmet>
        <title>Main</title>
        <meta property="og:title" content="Main"/>
        <meta name="twitter:title" content="Main"/>
        <meta name="og:image:alt" content="Main"/>
        <link rel="canonical" href="https://test.com" />
        <meta property="og:url" content="https://test.com" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:site_name" content="Test" />
        <meta property="og:type" content="page" />
        <meta name="description" content="Main" />
        <meta property="og:description" content="Main" />
      </Helmet>

      <List
        name="terms"
        defaultValue={params.s}
        items={terms}
        startUrl="s-"
      />

      <List
        name="brands"
        defaultValue={params.b}
        items={brands}
        startUrl="b-"
      />

      <List
        name="styles"
        defaultValue={params.st}
        items={styles}
        startUrl="st-"
      />

      {dataLink ? (
        <div
          style={{
            fontSize: '16px',
            margin: '20px',
          }}
        >
          {JSON.stringify(dataLink)}
        </div>
      ) : (
        <div
          style={{
            fontSize: '20px',
            margin: '20px',
          }}
        >
          Data Not Found
        </div>
      )}
    </div>
  );
};

export default memo(Main);
