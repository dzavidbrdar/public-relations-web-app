import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header.js';
import Dashboard from './components/Dashboard.js';
import Contact from './components/Contact.js';
import Products from './components/Products';
import Questions from './components/Questions.js';
import UnansweredQuestions from './components/UnansweredQuestions.js';

function App() {
  return (
    <Router>
    <div className="App">
      <div className="container">
        <Header />
        <Route exact path="/" component={Dashboard} />        
        <Route path="/products" component={Products} />
        <Route path="/questions" component={Questions} />
        <Route path="/contact" component={Contact} />
        <Route path="/unansweredQuestions" component={UnansweredQuestions}/>
      </div>
    </div>
  </Router>
  );
}

export default App;
