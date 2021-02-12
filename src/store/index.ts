import {configureStore} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import thunk from 'redux-thunk';

import {actions, reducer, selectors} from './ducks/index';

export {actions, selectors};

export const store = configureStore({
  reducer: reducer,
  devTools: true,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();