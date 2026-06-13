// hooks/useInteractionReady.ts
import { useEffect, useState } from 'react';

/**
 * Returns `true` only after the JS thread is idle (navigation animation done).
 * Uses requestIdleCallback where available, with a setTimeout fallback.
 *
 *   const isReady = useInteractionReady();
 *   {isReady && <HeavyComponent />}
 *
 * @param fallbackMs  Safety-net timeout in ms (default 400).
 */
export function useInteractionReady(fallbackMs = 400): boolean {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const done = () => {
      if (!cancelled) {setIsReady(true);}
    };

    if (typeof requestIdleCallback !== 'undefined') {
      const id = requestIdleCallback(done, { timeout: fallbackMs });
      return () => {
        cancelled = true;
        cancelIdleCallback(id);
      };
    }

    // Fallback for environments without requestIdleCallback (older RN/Hermes)
    const timer = setTimeout(done, fallbackMs);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [fallbackMs]);

  return isReady;
}
