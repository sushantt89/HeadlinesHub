import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const [progress, setProgress] = useState(0);

  return (
    <Router>
      <div>
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Navbar />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} key={'general'} pageSize={15} category={'general'} />} />
          <Route exact path="/Business" element={<News setProgress={setProgress} key={'business'} pageSize={15} category={'business'} />} />
          <Route exact path="/Entertainment" element={<News setProgress={setProgress} key={'entertainment'} pageSize={15} category={'entertainment'} />} />
          <Route exact path="/Health" element={<News setProgress={setProgress} key={'health'} pageSize={15} category={'health'} />} />
          <Route exact path="/Science" element={<News setProgress={setProgress} key={'science'} pageSize={15} category={'science'} />} />
          <Route exact path="/Sports" element={<News setProgress={setProgress} key={'sports'} pageSize={15} category={'sports'} />} />
          <Route exact path="/Technology" element={<News setProgress={setProgress} key={'technology'} pageSize={15} category={'technology'} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
