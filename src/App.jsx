import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
{/*import Sidebar from './components/Sidebar';*/}
import Login from './components/Login';
import './styles/login.css';


function App() {
  return (
    <Router>
      <div className="App">
       {/*<Sidebar />*/}
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* Otras rutas pueden ir aquí */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
