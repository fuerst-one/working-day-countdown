import { useLayoutEffect } from "react";
import { gsap } from "gsap";

export const useGsap = (
  scope: string | object | Element | undefined | null,
  callback: (_gsap: typeof gsap, ...args: Parameters<gsap.ContextFunc>) => void,
  dependencies?: unknown[],
) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(
      (...args) => callback(gsap, ...args),
      scope ?? undefined,
    );
    return () => ctx.revert();
  }, [scope, callback, dependencies]);
};
