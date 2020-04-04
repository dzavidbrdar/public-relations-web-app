import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header.js';
import Dashboard from './components/Dashboard.js';
import Contact from './components/Contact.js';
import Products from './components/Products';
import Questions from './components/Questions.js';
import Questions2 from './components/Questions2.js';
import QuestionAsk from './components/QuestionAsk.js';
import Login from './components/Login.js';
import UnansweredQuestions from './components/UnansweredQuestions.js';

import Footer from './components/Footer.js';
//vanjske biblioteke
import './css4.1/_source/bootstrapcustom.css';
import './components/Footer.css';

function App() {
  return (
    <Router>
    <div className="App">

        <Header />
        <div className="sadrzaj">
        <Route exact path="/" component={Dashboard} />
        <Route path="/products" component={Products} />
        <Route path="/questions" component={Questions} />
        <Route path="/questions2" component={Questions2} />
        <Route path="/contact" component={Contact} />
        <Route path="/questionask" component={QuestionAsk} />
        <Route path="/login" component={Login} />
        <Route path="/unansweredQuestions" component={UnansweredQuestions}/>
        </div>
        <Footer />

    </div>
  </Router>
  );
}

export default App;
