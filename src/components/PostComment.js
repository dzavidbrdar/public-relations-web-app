import React, { Component } from 'react';
import '../PostComment.css';
import { Alert } from 'antd';
import 'antd/dist/antd.css';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
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

class PostComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: undefined,
          lastname: undefined,
          email: undefined,
          question: undefined,
          showingAlert: false,
          recaptcha: false,
          errors: {
            name: '',
            lastname: '',
            email: '',
            question: ''
          }
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onloadCallback = this.onloadCallback.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.expiredCallback = this.expiredCallback.bind(this);
      }

      onloadCallback() {
        console.log("Captcha loaded.");
        this.setState({
          recaptcha: false
        });
      }

      verifyCallback(){
        console.log('stisnuto');
        this.setState({
          recaptcha: true
        });
      }

      expiredCallback(){
        console.log("isteklo");
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
                value.length < 8
                  ? 'Comment must be 8 characters long!'
                  : '';
              break;
            default:
              break;
          }
    
        this.setState({errors, [name]: value});
      }
      
      handleSubmit(event) {
        event.preventDefault();

        this.setState({
          showingAlert: true
        });
        
        setTimeout(() => {
          this.setState({
            showingAlert: false
          });
        }, 2000);

        setTimeout(() => {
          ReactDOM.render(
            '', document.getElementById('alertmsg')
          );
        }, 2500);

        if(validateForm(this.state.errors) && this.state.recaptcha) {
            var today = new Date();
            var dd = today.getDate(); 
            var mm = today.getMonth() + 1; 
            var yyyy = today.getFullYear(); 
            
            if (dd < 10) { 
                dd = '0' + dd; 
            } 
            if (mm < 10) { 
                mm = '0' + mm; 
            } 
            var today = dd + '.' + mm + '.' + yyyy; 
            
            var dateObj = new Date();
            var hours = dateObj.getHours();
            var minutes = dateObj.getMinutes();

            var timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0');
            
            const object = {};
            object.firstName = this.state.name;
            object.lastName = this.state.lastname;
            object.email = this.state.email;
            object.text = this.state.question;
            /*object.date = today;
            object.time = timeString;*/
            console.log(object);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(object)
            };
            let urlForNewCommentPost = 'https://main-server-si.herokuapp.com/api/products/' 
            + this.props.location.state.id + '/comment';
            console.log(urlForNewCommentPost);
            fetch(urlForNewCommentPost, requestOptions)
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
                ReactDOM.render(
                  <Alert message="Comment successfully posted." type="success" showIcon />, document.getElementById('alertmsg')
                );
          }else{
            ReactDOM.render(
              <Alert message="Invalid form!" type="error" showIcon />, document.getElementById('alertmsg')
              );
          }
      }
    
      render() {
        const {errors} = this.state;
        let naslovMessage = "Write a comment on " + this.props.location.state.productName + ":";
        return (
          <form onSubmit={this.handleSubmit}>
            <div id='alertmsg' className={this.state.showingAlert ? 'alert-shown' : 'alert-hidden'}></div>
              <label class="labela"> {naslovMessage} </label>
            <input
                class="unos"
                name="name"
                placeholder="Name"
                type="text"
                value={this.state.name}
                onChange={this.handleInputChange} 
                required/>
                {errors.name.length > 0 && 
                <span className='error poruka'>{errors.name}</span>}
            <input
                class="unos"
                name="lastname"
                placeholder="Last Name"
                type="text"
                value={this.state.lastname}
                onChange={this.handleInputChange} 
                required/>
                {errors.lastname.length > 0 && 
                <span className='error poruka'>{errors.lastname}</span>}
            <input
                class="unos"
                name="email"
                type="text"
                placeholder="E-mail"
                value={this.state.email}
                onChange={this.handleInputChange} 
                required/>
                {errors.email.length > 0 && 
                <span className='error poruka'>{errors.email}</span>}
            <textarea
                class="tekst"
                name="question"
                type="text"
                placeholder="Comment"
                value={this.state.question}
                onChange={this.handleInputChange} 
                required/>
                {errors.question.length > 0 && 
                <span className='error poruka'>{errors.question}</span>}
            <div className='recaptcha'>
            <Recaptcha 
                ref={e => recaptchaInstance = e}
                sitekey="6LevSeYUAAAAAPJ8E2g1TCP4zwAgHWyryba2H7bH"
                render="explicit"
                onloadCallback={this.onloadCallback}
                verifyCallback={this.verifyCallback}
                expiredCallback={this.expiredCallback}
            />
            </div>
            <Button type="primary" htmlType="submit">Submit</Button>
          </form>
        );
      }
}
 
export default PostComment;