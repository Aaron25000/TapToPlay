import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginView from './views/LoginView';
import SongSelectionView from './views/SongSelectionView';
import PlayView from './views/PlayView';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route path="/app" element={
            <ProtectedRoute>
              <SongSelectionView />
            </ProtectedRoute>
          } />
          <Route path="/play/:songId/:instrumentId" element={<PlayView />} />
          <Route path="*" element={<Navigate to="/app" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;