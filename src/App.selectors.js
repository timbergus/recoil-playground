import { selector } from 'recoil';
import { fullNameAtom } from './components/immutable-form/immutable-form';

export const fullNameSelector = selector({
  key: 'fullNameSelector',
  get: ({ get }) => get(fullNameAtom),
});
