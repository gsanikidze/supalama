import { useStore as useRxStore } from 'react-redux';
import { useCallback } from 'react';
import { AppState } from './store';

export function useStore() {
  const store = useRxStore();

  const getState = useCallback(<T> (selector: (st: AppState) => T): T => {
    const state = store.getState() as AppState;

    return selector(state);
  }, [store]);

  return {
    getState,
  };
}
