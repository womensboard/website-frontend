import { useCallback, useState } from 'react';

type ReturnType = [boolean, () => void];

export const useToggle = (defaultState = false): ReturnType => {
  const [booleanState, setBoolean] = useState(defaultState);

  const toggleState = useCallback(() => {
    setBoolean((show) => !show);
  }, []);

  return [booleanState, toggleState];
};
