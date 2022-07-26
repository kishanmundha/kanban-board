import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import KanbanBoard from '../../components/kanban-board';
import { useGithubRepo } from '../../hooks/use-github-repo';
const GithubIssuePage: React.FC = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const url = useMemo(() => query.get('url') as string, [query]);
  const [inputUrl, setInputUrl] = useState(url || '');

  const { issues, repoUrl, account, repoName } = useGithubRepo(url);

  const handleLoadIssues = () => {
    navigate('/?url=' + inputUrl, { replace: true });
  };

  return (
    <div
      className="d-flex flex-column"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <div className="d-flex flex-row" style={{ padding: 10 }}>
        <input
          className="form-control"
          value={inputUrl}
          onChange={e => setInputUrl(e.target.value)}
        />
        <button
          className="btn btn-primary"
          style={{ minWidth: 200, marginLeft: 10 }}
          onClick={handleLoadIssues}
        >
          Load Issues
        </button>
      </div>
      <div style={{ padding: 10 }}>
        <h4>
          {account} / {repoName}
        </h4>
      </div>
      <KanbanBoard issues={issues} url={repoUrl} />
    </div>
  );
};

export default GithubIssuePage;
