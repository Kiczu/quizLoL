import { useEffect, useRef, useState } from "react";

type UseDebaounce = {
  initState: any,
  callback: any,
  delay: number
}

const useDebounce = ({ initState, callback, delay } : UseDebaounce) => {
  const [state, setState] = useState(initState);

  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }

    timeoutId.current = setTimeout(() => {
      callback(state);
    }, delay);
  }, [delay, state]);

  return [state, setState];
};

export default useDebounce;