import { useState, useRef, useEffect, useCallback, Dispatch, SetStateAction } from 'react';

export function useSafeSetState<T>(initialState: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(initialState);

  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const safeSetState = useCallback(
    (args) => {
      if (isMounted.current) {
        return setState(args);
      }
      return null;
    },
    [isMounted, setState],
  );

  return [state, safeSetState];
}
