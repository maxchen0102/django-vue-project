// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExerciseList from './components/ExerciseList';
import Test from './components/Test.jsx';
import NavBar from './components/NavBar';
import Test2 from "./components/Test2.jsx";
import Home from "./components/Home.jsx";
import './App.css';

// 範例頁面元件
const About = () => <div className="container mt-4"><h1>關於我們</h1></div>;
const Contact = () => <div className="container mt-4"><h1>聯絡我們</h1></div>;


function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/test" element={<Test />} />
            <Route path="/test2" element={<Test2 />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;