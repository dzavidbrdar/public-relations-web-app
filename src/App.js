import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header.js';
import Dashboard from './components/Dashboard.js';
import Contact from './components/Contact.js';
import Products from './components/Products';
import Questions from './components/Questions.js';
import QuestionAsk from './components/QuestionAsk.js';
import PostComment from './components/PostComment.js';
import Login from './components/Login.js';
import UnansweredQuestions from './components/UnansweredQuestions.js';
import CommentsPublic from './components/CommentsPublic';
import CommentReview from'./components/CommentReview.js';

import Footer from './components/Footer.js';
import './css4.1/bootstrapcustom.min.css';
import './components/Footer.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.headerHandler = this.headerHandler.bind(this);
    this.headerElement=React.createRef();
  }
  headerHandler=(logged)=>{
    if(this.headerElement.current!=null) this.headerElement.current.changeLogged(logged);//provjeriti ako se prekine login ili logout refreshom
  }
  render(){
    return (
      <Router>
      <div className="App">
          <Header ref={this.headerElement} />
          <div className="sadrzaj_ek1">
            <Route exact path="/" render={(props) => <Dashboard {...props} headerHandler={this.headerHandler}/>} />
            <Route path="/products" component={Products} />
            <Route path="/questions" component={Questions} />
            <Route path="/contact" component={Contact} />
            <Route path="/questionask" component={QuestionAsk} />
            <Route path="/postcomment" component={PostComment} />
            <Route path="/login" component={Login} />
            <Route path="/unansweredQuestions" render={(props) => <UnansweredQuestions {...props} headerHandler={this.headerHandler}/>}/>
            <Route path="/commentsPublic" component={CommentsPublic}/>
            <Route path="/commentReview" component={CommentReview}/>
          </div>
          <Footer />
      </div>
    </Router>
    );
  }
}

export default App;
