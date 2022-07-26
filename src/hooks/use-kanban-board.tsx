import { useCallback, useEffect, useMemo, useState } from 'react';
import { GithubIssue } from '../context/github/types';

const columnLists = ['todo', 'inProgress', 'done'];

interface KanbanCache {
  todo: number[];
  inProgress: number[];
  done: number[];
}

function initKanbanBoardData(
  columns: { [key: string]: GithubIssue[] },
  kanbanCache: KanbanCache
) {
  for (let id of kanbanCache.done) {
    const issueIndex = columns.todo.findIndex(issue => issue.id === id);
    if (issueIndex > -1) {
      const [removed] = columns.todo.splice(issueIndex, 1);
      columns.done.push(removed);
    }
  }
  for (let id of kanbanCache.inProgress) {
    const issueIndex = columns.todo.findIndex(issue => issue.id === id);
    if (issueIndex > -1) {
      const [removed] = columns.todo.splice(issueIndex, 1);
      columns.inProgress.push(removed);
    }
  }

  sortIssues(columns.todo, kanbanCache.todo);
}

function sortIssues(issues: GithubIssue[], sortedIds: number[]) {
  return issues.sort((a, b) => {
    const aIndex = sortedIds.indexOf(a.id);
    const bIndex = sortedIds.indexOf(b.id);
    return aIndex - bIndex;
  });
}

export function useKanbanBoard(issues: GithubIssue[], url?: string) {
  const cacheKey = useMemo(() => `github-issue:${url}`, [url]);
  const kanbanCache = useMemo(() => {
    const cacheString = localStorage.getItem(cacheKey);
    if (cacheString) {
      return JSON.parse(cacheString);
    }
    return {
      todo: [],
      inProgress: [],
      done: [],
    };
  }, [cacheKey]);

  const columns = useMemo(() => {
    const result: { [key: string]: GithubIssue[] } = columnLists.reduce(
      (acc, listKey) => ({ ...acc, [listKey]: [] }),
      {}
    );

    result.todo = [...issues];
    result.inProgress = [];
    result.done = [];

    initKanbanBoardData(result, kanbanCache);
    return result;
  }, [issues, kanbanCache]);

  const [elements, setElementsInternal] = useState(columns);

  useEffect(() => {
    setElementsInternal(columns);
  }, [columns]);

  const setElements = useCallback(
    (elements: { [key: string]: GithubIssue[] }) => {
      setElementsInternal(elements);
      const updatedCache = Object.keys(elements).reduce((p, c) => {
        p[c] = elements[c].map(x => x.id);
        return p;
      }, {} as { [key: string]: number[] });
      localStorage.setItem(cacheKey, JSON.stringify(updatedCache));
    },
    [cacheKey]
  );

  return {
    elements,
    setElements,
  };
}
