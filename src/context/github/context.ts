import React from 'react';
import { initialState } from './constant';
import { Action, GithubContextState } from './types';

export const GithubContext = React.createContext<{
  state: GithubContextState;
  dispatch: React.Dispatch<Action<unknown>>;
}>({
  state: initialState,
  dispatch: () => null,
});
