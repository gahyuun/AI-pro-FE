import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/sign-in" replace />} />
        <Route path="/chat" element={<Main />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route path="/sign-in" element={<SignIn/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
