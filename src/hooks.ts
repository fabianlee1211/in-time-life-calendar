import { useEffect, useRef } from 'react';
import { useCookie, useLocalStorage } from 'react-use';

export const DEFAULT_CONFIG = {
  birthDate: '',
  expectedLifespan: 80
};

export function useConfig<T = typeof DEFAULT_CONFIG>() {
  const [value, setValue, remove] = useCookie('in-time-app-configs');

  function setConfig(config: typeof DEFAULT_CONFIG) {
    setValue(JSON.stringify(config), {
      sameSite: 'strict',
      expires: 365,
      secure: process.env.NODE_ENV === 'production'
    });
  }

  return [value ? JSON.parse(value) : DEFAULT_CONFIG, setConfig, remove] as [
    T,
    typeof setConfig,
    typeof remove
  ];
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
