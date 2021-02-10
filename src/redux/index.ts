import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import thunk from 'redux-thunk';

import {actions, reducer, selectors} from './ducks';

type State = ReturnType<typeof reducer>;

export const rootReducer = (state: State, action: any) => {
  let nextState = state as State | undefined;

  if (action.type === actions.auth.signOut.fulfilled.type) {
    // How to reset store https://twitter.com/dan_abramov/status/703035591831773184
    // @ts-ignore
    nextState = undefined;
  }

  return reducer(nextState, action);
};

export const store = configureStore({
  // @ts-ignore
  reducer: rootReducer,
  devTools: true,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();