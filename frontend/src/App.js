import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SubmitPage from './pages/SubmitPage';
import AssignmentList from './pages/AssignmentList';
import AssignmentDetail from './pages/AssignmentDetail';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="container">
            <div className="nav-content">
              <Link to="/" className="nav-logo">
                作业提交系统
              </Link>
              <div className="nav-links">
                <Link to="/" className="nav-link">提交作业</Link>
                <Link to="/assignments" className="nav-link">作业列表</Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <div className="container">
            <Routes>
              <Route path="/" element={<SubmitPage />} />
              <Route path="/assignments" element={<AssignmentList />} />
              <Route path="/assignments/:id" element={<AssignmentDetail />} />
            </Routes>
          </div>
        </main>

        <footer className="footer">
          <div className="container">
            <p>&copy; 2024 作业提交系统 - 学生作业管理平台</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

