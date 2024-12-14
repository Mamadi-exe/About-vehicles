
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home.jsx'
import FactsPage from './Pages/FactsPage/FactsPage.jsx';
import { ThemeProvider } from './components/Theme/Theme.jsx';
import './App.css';

function App() {

  return (
    <div className="App">
     <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:type/:id" element={<FactsPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
    </div>
  );
}

export default App;

