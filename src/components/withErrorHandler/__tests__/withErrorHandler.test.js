import React from 'react';
import customRender from 'Mock/customRender';
import { getNodeText } from '@testing-library/react';

import withErrorHandler from '../index';

describe('withErrorHandler: ', () => {
  it(`should return null`, () => {
    const Throws = () => {
      throw new Error('Oh no!')
    };

    const ErrorHandler = withErrorHandler(Throws);
    jest.spyOn(global.console, 'error').mockImplementation(() => jest.fn());

    const { container, unmount } = customRender(
      <ErrorHandler />
    );

    expect(getNodeText(container)).toBe('');
    expect(container).toMatchSnapshot();
    unmount();
  });
});
