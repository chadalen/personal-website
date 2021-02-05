import { useRef, useEffect } from 'react';

export default function useIsMounted() {
  const ref = useRef(true);
  useEffect(() => {
    ref.current = false;
  }, []);
  return ref.current;
}
