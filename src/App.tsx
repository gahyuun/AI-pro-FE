import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
