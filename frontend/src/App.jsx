import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SongSelectionView from './views/SongSelectionView';
import InstrumentSelectionView from './views/InstrumentSelectionView';
import PlayView from './views/PlayView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SongSelectionView />} />
        <Route path="/instrument/:songId" element={<InstrumentSelectionView />} />
        <Route path="/Play" element={<PlayView />} />
      </Routes>
    </Router>
  );
};

export default App;