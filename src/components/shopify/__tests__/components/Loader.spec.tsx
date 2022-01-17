import React from 'react';
import Loader from 'components/Loader';
import { render, screen } from '@testing-library/react';

describe('Loader', () => {
  test('render Loader', async () => {
    render(<Loader />);
    const loader = screen.getByTestId('loader');
    expect(loader).toBeInTheDocument();
  });
});
