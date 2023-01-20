import { useEffect, useRef } from 'react';
import { useLocalStorage } from 'react-use';

export const DEFAULT_CONFIG = {
  birthDate: '',
  expectedLifespan: 80
};

export function useConfig() {
  return useLocalStorage<typeof DEFAULT_CONFIG>(
    'in-time-app-configs',
    DEFAULT_CONFIG
  );
}

// Custom useInterval hook with optional stop condition
export function useInterval(
  callback: Function,
  delay?: number | null,
  shouldStop?: boolean
) {
  const savedCallback = useRef<Function>(() => {});
  const savedInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (delay !== null) {
      savedInterval.current = setInterval(
        () => savedCallback.current(),
        delay || 0
      );

      return () =>
        savedInterval.current
          ? clearInterval(savedInterval.current)
          : undefined;
    }

    return undefined;
  }, [delay]);

  useEffect(() => {
    if (shouldStop) {
      savedInterval.current && clearInterval(savedInterval.current);
    }
    return undefined;
  }, [shouldStop]);
}
