import { ACTION } from './action';
import { Action, GithubContextState, GithubRepo } from './types';

export function reducer(
  state: GithubContextState,
  action: Action
): GithubContextState {
  switch (action.type) {
    case ACTION.UPDATE_STATE:
      return {
        ...state,
        ...(action.payload as GithubContextState),
      };
    case ACTION.UPDATE_REPO_DATA:
      return {
        ...state,
        repos: {
          ...state.repos,
          ...(action.payload as { [key: string]: GithubRepo }),
        },
      };
    default:
      return state;
  }
}
