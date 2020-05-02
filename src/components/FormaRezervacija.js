import React, { Component} from 'react';
import '../Form.css';
import { Alert } from 'antd';
import {message} from 'antd';
import { DatePicker } from 'antd';
import { TimePicker } from 'antd';
//import StarRatingComponent from 'react-star-rating-component';
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

class FormaRezervacija extends Component {
    state = {
        time: null,
        date: null, 
        datum: null,
        vrijeme: null
      };
    constructor(props) {
        super(props);
        this.state = {
          name: undefined,
          lastname: undefined,
          email: undefined,
          recaptcha: false,

          errors: {
            name: '',
            lastname: '',
            email: ''
          }
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.expiredCallback = this.expiredCallback.bind(this);
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

      onChangeDate = date => {
        var datum = new Date(date._d.getFullYear(), date._d.getMonth(), date._d.getDate());
        console.log(datum);
        this.setState({ date: date});
        this.setState({ datum: datum});
      };
      onChangeTime = time => {
        var vrijeme = new Date();
        vrijeme.setHours(time._d.getHours());
        vrijeme.setMinutes(time._d.getMinutes());
        vrijeme.setSeconds(time._d.getSeconds());
        console.log(vrijeme);
        this.setState({ time: time });
        this.setState({ vrijeme: vrijeme });
      };
     
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
            default:
              break;
          }

        this.setState({errors, [name]: value});
      }
      handleSubmit(event) {
        event.preventDefault();
        if(validateForm(this.state.errors) && this.state.recaptcha && this.state.time && this.state.date) {
            const object = {};

            object.tableId = this.props.tableIdParent;
            object.name = this.state.name;
            object.surname = this.state.lastname;
            object.email = this.state.email;

            //vrijeme još
            var millisecs = new Date(this.state.datum.getFullYear(), this.state.datum.getMonth(), this.state.datum.getDate(), this.state.vrijeme.getHours(), this.state.vrijeme.getMinutes(), this.state.vrijeme.getSeconds());
            var datetime = millisecs.getTime();
            object.reservationDateTime = datetime;

            console.log(object);
            
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(object)
            };
            fetch( 'https://main-server-si.herokuapp.com/api/business/1/offices/' + this.props.officeIdParent + '/reservations', requestOptions)
                .then(response => response.json())
                .then(data => console.log(data));
                
                recaptchaInstance.reset();
                this.setState({
	                recaptcha: false
                });

                var mod= document.getElementById('btnCancel');
                mod.click();

                //unos verifikacijskog koda


          }else{
            alert("Invalid form!");
          }
      }

      render() {

        const {errors} = this.state;
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
                <div class="irma block">
                <label class="irma">Date:</label>
                <DatePicker value={this.state.date} onChange={this.onChangeDate} />
                </div>
                <div class="irma block">
                <label class="irma">Time:</label>
                <TimePicker value={this.state.time} onChange={this.onChangeTime} />
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
              <input type="submit" value="Make Reservation" style={{ width: '150px', lineHeight: '1'}}/>
            </div>
          </form>

        );
      }
}

export default FormaRezervacija;
