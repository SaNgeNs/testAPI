const getFilterFromUrl = (path) => {
  const parsedUrl = path.split('/');
  const data = {
    terms: [],
    brands: [],
    styles: [],
  };

  parsedUrl.forEach(item => {
    if (item.search('s-') !== -1) {
      data.terms.push(item.split('s-')[1]);
    } else if (item.search('b-') !== -1) {
      data.brands.push(item.split('b-')[1]);
    } else if (item.search('st-') !== -1) {
      data.styles.push(item.split('st-')[1]);
    }
  });

  return data;
};

export default getFilterFromUrl;
