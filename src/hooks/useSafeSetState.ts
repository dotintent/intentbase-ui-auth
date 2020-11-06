import { useState, useRef, useEffect, useCallback } from 'react';

export function useSafeSetState<T>(initialState: T): [T, React.Dispatch<React.SetStateAction<T>>] {
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
