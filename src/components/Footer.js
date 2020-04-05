import React from 'react';
import ReactDOM from 'react-dom';
class Footer extends React.Component {
  render(){
    return(
  <footer className="bootstrapiso site-footer_ek1">
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <h6>About</h6>
          <p className="text-justify">Public Relations <i>#WeStandByYourSide</i> is web application created by team of students at Faculty of Electrical Engineering, Sarajevo. Application is developed as a part of project for Software Engineering course.</p>
        </div>

        <div className="col-xs-6 col-md-3">
          <h6>Stores</h6>
          <ul className="footer-links_ek1">
            <li><a href="/contact">List of Stores</a></li>
          </ul>
        </div>

        <div className="col-xs-6 col-md-3">
          <h6>Quick Links</h6>
          <ul className="footer-links_ek1">
            <li><a href="/">Special Offers</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/questions">Q&A</a></li>
            <li><a href="/commentsPublic">Comments</a></li>
            <li><a href="/questionask">Ask A Question</a></li>
          </ul>
        </div>
      </div>
      <hr/>
    </div>
    <div className="container">
      <div className="row">
        <div className=" col-md-8 col-sm-6 col-xs-12">
          <p className=" copyright-text_ek1">Copyright &copy; 2020 All Rights Reserved by
       <a href="#">TeamCharlie</a>.
          </p>
        </div>

        <div className="col-md-4 col-sm-6 col-xs-12">
          <ul className="social-icons_ek1">
            <li><a className=" facebook_ek1" href="#"><i className=" fa fa-facebook"></i></a></li>
            <li><a className=" twitter_ek1" href="#"><i className=" fa fa-twitter"></i></a></li>
            <li><a className=" dribbble_ek1" href="#"><i className=" fa fa-dribbble"></i></a></li>
            <li><a className=" linkedin_ek1" href="#"><i className=" fa fa-linkedin"></i></a></li>
          </ul>
        </div>
      </div>
    </div>
</footer>
    );
  }
}

export default Footer;
