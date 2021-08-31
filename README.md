# Testing Recoil Selectors outside of React

It can be useful to manipulate and evaluate Recoil selectors outside of a React context for testing. This can be done by working with a Recoil [`Snapshot`](/docs/api-reference/core/Snapshot). You can build a fresh snapshot using `snapshot_UNSTABLE()` and then use that `Snapshot` to evaluate selectors for testing.

### Example: Jest unit testing selectors

```jsx
const numberState = atom({ key: 'Number', default: 0 });

const multipliedState = selector({
  key: 'MultipliedNumber',
  get: ({ get }) => get(numberState) * 100,
});

test('Test multipliedState', () => {
  const initialSnapshot = snapshot_UNSTABLE();
  expect(initialSnapshot.getLoadable(multipliedState).valueOrThrow()).toBe(0);

  const testSnapshot = snapshot_UNSTABLE(({ set }) => set(numberState, 1));
  expect(testSnapshot.getLoadable(multipliedState).valueOrThrow()).toBe(100);
});
```

## Testing Recoil Selectors inside of a Component

It can be useful to know the state inside a component when testing it. You can use the state to evaluate the user's actions, comparing it with an expected state. As described [`here`](/docs/guides/dev-tools#observing-all-state-changes), you can use this component designed for the developer tools, also for testing your code.

```jsx
export const RecoilObserver = ({ element, onChange } => {
  const value = useRecoilValue(element)
  useEffect(() => onChange(value), [onChange, value])
  return null
}
```

- Element: can be an atom or a selector.
- onChange: this function will be called everytime your state changes. You can use here, for example, a Jest mocked function and check different values outcomes like the nuber of times the function is called, or the different states you obtain from an user event.

### Example: Form state modified by user

#### Component

```jsx
import { atom, useRecoilState } from 'recoil';

export const nameAtom = atom({
  key: 'name',
  default: '',
});

function Form() {
  const [name, setName] = useRecoilState(nameAtom);
  return (
    <form>
      <input
        data-testid="name_input"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
    </form>
  );
}

export default Form;
```

#### Test

```jsx
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
```
