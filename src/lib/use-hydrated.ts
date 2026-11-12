import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** False during server render, true in the browser. Use it for values read from localStorage (the cart). */
export const useHydrated = () => useSyncExternalStore(noop, () => true, () => false);