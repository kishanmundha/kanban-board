export interface GithubIssue {
  id: number;
  number: number;
  title: string;
  url: string;
  repository_url: string;
  created_at: string;
  user: GithubUser;
}

export interface GithubUser {
  login: string;
  id: number;
}

export interface GithubRepo {
  repository_url: string;
  issues: GithubIssue[];
}

export interface GithubContextState {
  repos: {
    [key: string]: GithubRepo;
  };
}

export interface Action<T = unknown> {
  type: string;
  payload?: T;
}
