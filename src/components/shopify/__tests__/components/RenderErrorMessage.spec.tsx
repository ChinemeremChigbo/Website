import React from 'react';
import RenderErrorMessage from 'components/RenderErrorMessage';
import { render, screen } from '@testing-library/react';

const props = {
  prevDay: jest.fn(),
  rescueUser: jest.fn(),
  errorMessage: 'no picture of the day',
  date: '22-02-02'
};

describe('RenderErrorMessage', () => {
  test('render error', async () => {
    render(<RenderErrorMessage {...props} />);
    const errorMesg = screen.getByText('no picture of the day');
    expect(errorMesg).toBeInTheDocument();
  });
});
