import { useEffect, useLayoutEffect, useRef } from 'react';

import useMemoizedFn from './useMemoizedFn';

/* istanbul ignore next */
/** keep typescript happy */
const noop = () => { };

export function useInterval(
  callback,
  delay,
  immediate,
) {
  const savedCallback = useRef(noop);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Execute callback if immediate is set.
  useEffect(() => {
    if (!immediate) return;
    if (delay === null || delay === false) return;
    savedCallback.current();
  }, [immediate]);

  // Set up the interval.
  useEffect(() => {
    if (delay === null || delay === false) return undefined;
    const tick = () => savedCallback.current();
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval;