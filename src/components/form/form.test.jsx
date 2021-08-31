import { RecoilRoot } from 'recoil';
import { fireEvent, render, screen } from '@testing-library/react';

import Form, { nameAtom } from './form';
import { RecoilObserver } from './RecoilObserver';

describe('The form state should', () => {
  test('change when the user enters a name.', () => {
    const onChange = jest.fn();

    render(
      <RecoilRoot>
        <RecoilObserver element={nameAtom} onChange={onChange} />
        <Form />
      </RecoilRoot>
    );

    const component = screen.getByTestId('name_input');

    fireEvent.change(component, { target: { value: 'Recoil' } });

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith(''); // Initial state on render.
    expect(onChange).toHaveBeenCalledWith('Recoil'); // New value on change.
  });
});
