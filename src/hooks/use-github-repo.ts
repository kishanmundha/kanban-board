import { useContext, useEffect, useMemo } from 'react';
import { ACTION } from '../context/github/action';
import { GithubContext } from '../context/github/context';
import { GithubRepo } from '../context/github/types';

export function useGithubRepo(url: string) {
  const { state, dispatch } = useContext(GithubContext);

  const urlInfo = useMemo(() => {
    const regex = /^https:\/\/github.com\/([\w-]+)\/([\w-]+)/;
    const match = url.match(regex);
    if (!match) {
      return {
        valid: false,
        account: null,
        repoName: null,
        url: null,
      };
    }

    return {
      valid: true,
      account: match[1],
      repoName: match[2],
      url: `https://github.com/${match[1]}/${match[2]}`,
    };
  }, [url]);

  useEffect(() => {
    if (!urlInfo.url) return;

    fetch(
      urlInfo.url.replace(
        'https://github.com',
        'https://api.github.com/repos'
      ) + '/issues'
    )
      .then(res => res.json())
      .then(result => {
        dispatch({
          type: ACTION.UPDATE_REPO_DATA,
          payload: {
            [urlInfo.url]: {
              repository_url: urlInfo.url,
              issues: result,
            },
          } as { [key: string]: GithubRepo },
        });
      })
      .catch(console.error);
  }, [urlInfo.url, dispatch]);

  if (!urlInfo.url || !state.repos[urlInfo.url]) {
    return {
      issues: [],
      loading: false,
    };
  }

  return {
    account: urlInfo.account,
    repoName: urlInfo.repoName,
    repoUrl: urlInfo.url,
    issues: state.repos[urlInfo.url].issues,
    loading: false,
  };
}
