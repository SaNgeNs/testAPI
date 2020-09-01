export const normalizr  = data => {
  if (Array.isArray(data)) {
    const newData = {
      result: [],
      entities: {},
    };

    data.forEach(item => {
      const id = item.id;

      newData.result.push(id);
      newData.entities[id] = item;
    });

    return newData;
  } else if (typeof data === "object") {
    const id = data.id;

    return {
      result: [id],
      entities: {
        [id]: data,
      },
    };
  }

  return data;
};

export default normalizr;
