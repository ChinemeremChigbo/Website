import React from 'react';
import Portal from 'components/Portal';
import { render, screen } from '@testing-library/react';

const props = {
  id: 'prev',
  children: '<div>bukunmi</div>'
};

describe('Portal', () => {
  test('render Portal', async () => {
    render(<Portal {...props} />);
    screen.debug();
  });
});
