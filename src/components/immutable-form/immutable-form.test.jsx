import { RecoilRoot } from 'recoil';
import { fireEvent, render, screen } from '@testing-library/react';

import ImmutableForm, { fullNameAtom } from './immutable-form';
import { RecoilObserver } from '../utils/RecoilObserver';

describe('The form state should', () => {
  test('change when the user enters a name and a surname.', () => {
    const onChange = jest.fn();

    render(
      <RecoilRoot>
        <RecoilObserver element={fullNameAtom} onChange={onChange} />
        <ImmutableForm />
      </RecoilRoot>
    );

    const name = screen.getByTestId('name_input');
    const surname = screen.getByTestId('surname_input');

    fireEvent.change(name, { target: { value: 'Recoil' } });
    fireEvent.change(surname, { target: { value: 'Immer' } });

    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenCalledWith({ name: '', surname: '' }); // Initial state on render.
    expect(onChange).toHaveBeenCalledWith({ name: 'Recoil', surname: '' }); // Name on change.
    expect(onChange).toHaveBeenCalledWith({ name: 'Recoil', surname: 'Immer' }); // Surname on change.
  });
});
