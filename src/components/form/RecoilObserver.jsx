import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export const RecoilObserver = ({ element, onChange }) => {
  const value = useRecoilValue(element);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};
