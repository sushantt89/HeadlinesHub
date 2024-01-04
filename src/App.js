import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News key={'general'} pageSize={15} category={'general'} />} />
            <Route exact path="/Business" element={<News key={'business'} pageSize={15} category={'business'} />} />
            <Route exact path="/Entertainment" element={<News key={'entertainment'} pageSize={15} category={'entertainment'} />} />
            <Route exact path="/Health" element={<News key={'health'} pageSize={15} category={'health'} />} />
            <Route exact path="/Science" element={<News key={'science'} pageSize={15} category={'science'} />} />
            <Route exact path="/Sports" element={<News key={'sports'} pageSize={15} category={'sports'} />} />
            <Route exact path="/Technology" element={<News key={'technology'} pageSize={15} category={'technology'} />} />
          </Routes>
        </div>
      </Router>

    )
  }
}


