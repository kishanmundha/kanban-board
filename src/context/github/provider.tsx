import { useReducer } from 'react';
import { initialState } from './constant';
import { GithubContext } from './context';
import { reducer } from './reducer';

export const GithubIssueProvider: React.FC = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GithubContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GithubContext.Provider>
  );
};
