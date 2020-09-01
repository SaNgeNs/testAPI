import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useDispatch } from 'react-redux';
import searchLink from 'Actions/searchLink';

const List = ({
  name = '',
  defaultValue = '',
  items = [],
  history = {},
  startUrl = 's-',
  match = {},
}) => {
  const dispatch = useDispatch();

  const onClick = async (event) => {
    const path = event.target.value;
    const params = { ...match.params };
    params[startUrl.slice(0, startUrl.length - 1)] = path;
    const url = `${params.s ? `/${params.s}` : ''}${params.b ? `/${params.b}` : ''}${params.st ? `/${params.st}` : ''}`;
    await dispatch(searchLink(url.slice(1)));
    history.push(url);
  };

  return (
    <FormControl
      style={{
        margin: '20px'
      }}
    >
      <InputLabel htmlFor="uncontrolled-native">{name}</InputLabel>
      <NativeSelect
        defaultValue={defaultValue}
        inputProps={{
          name,
          id: name,
        }}
        onChange={onClick}
      >
        <option />
        {items.map(item => {

          return (
            <option
              key={item.id}
              value={`${startUrl}${item.slug}`}
              onClick={onClick}
            >
              {item.label}
            </option>

          );
        })}
      </NativeSelect>
    </FormControl>
  );
};

export default List;
