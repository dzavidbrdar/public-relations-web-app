import React from 'react';
import ReactDOM from 'react-dom';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined, HourglassOutlined } from '@ant-design/icons';
class Footer2 extends React.Component {
  constructor(props){
    super(props);
    this.state={
      glp:{}
    }
  }
  async componentDidMount() {
      const response =await fetch('https://main-server-si.herokuapp.com/api/business/allOffices');
      const json = await response.json();
      const response2 =await fetch('https://main-server-si.herokuapp.com/api/business/1/mainOffice');
      const json2 = await response2.json();
      const glp_id=json2.mainOfficeId;
      const glavna = json.find((el)=>{if(el.id===glp_id) return el;});
      console.log(glavna);
      this.setState({
        glp:  glavna
      });
  }


  render(){
    let element=this.state.glp;
    return(
  <footer className="bootstrapiso site-footer_ek1">
    <div className="container">
      <div className="row">
        <div className="col-sm-12 col-md-6">
          <h6>About</h6>
          <p className="text-justify">Public Relations <i>#WeStandByYourSide</i> is web application created by team of students at Faculty of Electrical Engineering, Sarajevo. Application is developed as a part of project for Software Engineering course.</p>
        </div>

        <div className="col-xs-6 col-md-3">
          <h6>Main Store Info</h6>
          <ul className="footer-links_ek1">
            <li>{this.state.glp.businessName+' '+this.state.glp.id}</li>
            <li><EnvironmentOutlined /> {element.country + "-"+ element.city + ", " +element.address}</li>
            <li><PhoneOutlined /> {element.phoneNumber}</li>
            <li><MailOutlined /> {element.email}</li>
            <li><HourglassOutlined /> {element.workDayStart + "h -" + element.workDayEnd + "h"}</li>
          </ul>
        </div>

        <div className="col-xs-6 col-md-3">
          <h6>Quick Links</h6>
          <ul className="footer-links_ek1">
            <li><a href="/contact">List of Stores</a></li>
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

export default Footer2;
