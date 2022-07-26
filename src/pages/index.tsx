import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GithubIssueProvider } from '../context/github';
import GithubIssuePage from './issues';
import NotFoundPage from './not-found';

const AppRoutes: React.FC = () => {
  return (
    <GithubIssueProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GithubIssuePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </GithubIssueProvider>
  );
};

export default AppRoutes;
