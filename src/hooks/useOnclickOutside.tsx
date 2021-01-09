import { RefObject, useEffect } from 'react';

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  refs: Array<RefObject<T>>,
  handler: (event: Event) => void,
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const isInside = refs.some(ref => {
        const el = ref?.current;

        // Do nothing if clicking ref's element or descendent elements
        if (!el || el.contains((event?.target as Node) || null)) {
          return true;
        }
      });

      if (!isInside) {
        handler(event);
      }
    };
    document.addEventListener(`mousedown`, listener);

    return () => {
      document.removeEventListener(`mousedown`, listener);
    };
    // Reload only if ref or handler changes
  }, [refs, handler]);
};
