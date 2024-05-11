
import './App.css';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
 
import Logo from './logo.png';





function AppRouter() {
  
    return (
        <Router>
            <Routes>
                
              
                <Route path="/login" element={<LoginForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
              
            </Routes>
        </Router>
    );
}


export default AppRouter;

function App() {
  return (
    <div className="App">
      <header className="App-header">
       /*<img src={Logo} className="App-logo" alt="logo" /> */
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <LoginForm />
      </header>
    </div>
  );

}
App() ;