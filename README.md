# Recoil Playground

This is a simple playground to experiment with [Recoil](https://recoiljs.org/).

## Experiments

1. Create a test util to observe the Recoil state inside a React component (`Form`).
1. Use Immer to modify the returned state directly (`ImmutableForm`).

### #1 RecoilObserver

This component uses a React Functional Component to use hooks to read the state of an atom/selector, and execute a function passed through properties. This functions returns the state's value, and can be readed outside the `RecoilRoot` set for the experiment.

### #2 Immer

Right now, when you use `setState` from `useRecoilState`, you receive a `state` that needs to be returned as a new element.

```javascript
export const fullNameAtom = atom({
  key: 'fullNameAtom',
  default: {
    name: '',
    surname: '',
  },
});

[...]

const [fullName, setFullName] = useRecoilState(fullNameAtom);

const handleChangeName = (event) => {
    setFullName((state) =>({
      ...state,
      name: event.target.value
    }));
  };
```

Using Immer, you can modify complex data structures easier.

```javascript
const handleChangeName = (event) => {
  setFullName((state) =>
    produce(state, (draft) => {
      draft.name = event.target.value;
    })
  );
};
```

It would be awesome that this `state` returned by `setState` was already a draft and you could modify its value directly without object destructuring. It would be more readable and safe.

This would be the same behavior that [`@reduxjs/toolkit`](https://redux-toolkit.js.org/) has.
