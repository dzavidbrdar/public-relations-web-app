import React, { Component} from 'react';
import '../Form.css';
import { Alert } from 'antd';
import {message} from 'antd';
import StarRatingComponent from 'react-star-rating-component';
var Recaptcha = require('react-recaptcha');
let recaptchaInstance;

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Forma extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: undefined,
          lastname: undefined,
          email: undefined,
          question: undefined,
          rating: 0,
          recaptcha: false,
          postDisabled:true,

          errors: {
            name: '',
            lastname: '',
            email: '',
            question: '',
            rating: ''
          }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.expiredCallback = this.expiredCallback.bind(this);
      }

      onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
        this.state.postDisabled = false;


      }
      verifyCallback(){
        this.setState({
          recaptcha: true
        });
      }
      expiredCallback(){
        this.setState({
          recaptcha: false
        });
      }
     
      handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let errors = this.state.errors;

        switch (name) {
            case 'name':
            if(/^[a-zA-Z ]+$/.test(value)){
                errors.name = ''
            }
            else{
                errors.name = "Name is not valid!"
            }
              break;
            case 'lastname':
            if(/^[a-zA-Z ]+$/.test(value)){
                errors.lastname = ''
            }
            else{
                errors.lastname = "Last name is not valid!"
            }
              break;
            case 'email':
              errors.email =
                validEmailRegex.test(value)
                  ? ''
                  : 'Email is not valid!';
              break;

            case 'question':
              errors.question =
                value.length < 2
                  ? 'Comment must be at least 2 characters long!'
                  : '';
              break;
/*
              case 'rating':
                errors.rating=
                value=='0' 
                ? 'glasaj'
                : '';
                break;
*/
            default:
              break;
          }

        this.setState({errors, [name]: value});
      }
      handleSubmit(event) {
        event.preventDefault();
        if(validateForm(this.state.errors) && this.state.recaptcha) {
            const object = {};
            object.firstName=this.state.name;
            object.lastName=this.state.lastname;
            object.email = this.state.email;
            object.text = this.state.question;
            object.starReview=this.state.rating;
            console.log(object);
            
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(object)
            };
            fetch( 'https://main-server-si.herokuapp.com/api/reviews/offices/' + this.props.valueFromParent.id, requestOptions)
                .then(response => response.json())
                .then(data => console.log(data));
                this.setState({
                    name: '',
                    lastname: '',
                    email: '',
                    question: ''
                });
                recaptchaInstance.reset();
                this.setState({
	                recaptcha: false
                });
                message.success('Your review has been successfully submitted!');
                var mod= document.getElementById('btnCancel');
                mod.click();
          }else{
            alert("Invalid form!");
          }
      }

      render() {

        const {errors} = this.state;
        const { rating } = this.state;
        return (
          <form onSubmit={this.handleSubmit}>
           <div class="irma block">
            <label class="irma">First name:</label>
            <input
                class="irma"
                name="name"
                placeholder="First name"
                type="text"
                value={this.state.name}
                onChange={this.handleInputChange}
                required/>
                {errors.name.length > 0 &&
                <span className='irma error'>{errors.name}</span>}
            </div>
            <div class="irma block">
            <label class="irma">Last name:</label>
            <input
                class="irma"
                name="lastname"
                placeholder="Last Name"
                type="text"
                value={this.state.lastname}
                onChange={this.handleInputChange}
                required/>
                {errors.lastname.length > 0 &&
                <span className='irma error'>{errors.lastname}</span>}
            </div>
            <div class="irma block">
            <label class="irma">Email:</label>
            <input
                class="irma"
                name="email"
                type="text"
                placeholder="E-mail"
                value={this.state.email}
                onChange={this.handleInputChange}
                required/>
                {errors.email.length > 0 &&
                <span className='irma error'>{errors.email}</span>}
                </div>
                <br/>
                <div class="irma rating-label">
                 <StarRatingComponent
                      name="rate1"
                      starCount={5}
                      //caption="Rate your stay!"
                      value={this.state.rating}                    
                      onStarClick={this.onStarClick.bind(this)}  
                      onStarHoverOut={this.handleRating}                   
                  />
                  <br/>
                  <div className='nadijaDuzina'>
                  { (this.state.postDisabled==true) ? <Alert message="Don't forget to rate!" type="warning" /> : ""}
                  </div>

                   
                </div>
            <div class="irma block">
            <textarea
                class="irma"
                name="question"
                type="text"
                placeholder="Share your own experience"
                value={this.state.question}
                onChange={this.handleInputChange}
                /*onClick={this.handleClick}*/
                required/>
                {errors.question.length > 0 &&
                <span className='irma error'>{errors.question}</span>}
            </div>
            <div class="recaptchaIrma">
            <Recaptcha 
	          ref={e => recaptchaInstance = e}
	          sitekey="6LevSeYUAAAAAPJ8E2g1TCP4zwAgHWyryba2H7bH"
	          render="explicit"
	          verifyCallback={this.verifyCallback}
	          expiredCallback={this.expiredCallback}
	          />
          </div>
            <div class="irma block"  style={{float:'left', width: '80px'}}>
              <input type="submit" value="Post" style={{ width: '80px', lineHeight: '1'}} disabled={this.state.postDisabled}/>
            </div>
          </form>

        );
      }
}

export default Forma;
