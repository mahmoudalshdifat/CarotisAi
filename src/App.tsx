// ──────────────────────────────────────────────────────────────────────────────
// CarotisAi – App Router
// ──────────────────────────────────────────────────────────────────────────────

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './hooks/useApp';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import AnalyzePage   from './pages/AnalyzePage';
import HistoryPage   from './pages/HistoryPage';
import SettingsPage  from './pages/SettingsPage';
import AboutPage     from './pages/AboutPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/"         element={<DashboardPage />} />
            <Route path="/analyze"  element={<AnalyzePage   />} />
            <Route path="/history"  element={<HistoryPage   />} />
            <Route path="/settings" element={<SettingsPage  />} />
            <Route path="/about"    element={<AboutPage     />} />
            <Route path="*"         element={<DashboardPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  );
}
