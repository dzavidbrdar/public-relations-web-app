import React, { Component } from 'react';
import '../QuestionAsk.css';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class QuestionAsk extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: undefined,
          lastname: undefined,
          email: undefined,
          question: undefined,
          errors: {
            name: '',
            lastname: '',
            email: '',
            question: ''
          }
        };
    
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                  ? 'Question must be 8 characters long!'
                  : '';
              break;
            default:
              break;
          }
    
        this.setState({errors, [name]: value});
      }
      handleSubmit(event) {
        event.preventDefault();
        if(validateForm(this.state.errors)) {
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
            object.text = this.state.question;
            object.nameSurname = this.state.name + " " + this.state.lastname;
            object.email = this.state.email;
            object.date = today;
            object.time = timeString;
            console.log(object);
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(object)
            };
            fetch('https://main-server-si.herokuapp.com/api/questions', requestOptions)
                .then(response => response.json())
                .then(data => console.log(data));
                this.setState({
                    name: '',
                    lastname: '',
                    email: '',
                    question: ''
                });
                alert("Your question has been successfully submitted.");
          }else{
            alert("Invalid form!");
          }
      }
    
      render() {
        const {errors} = this.state;
        return (
          <form onSubmit={this.handleSubmit}>
              <label>
                  Whats's Your Queston?
              </label>
            <input
                name="name"
                placeholder="Name"
                type="text"
                value={this.state.name}
                onChange={this.handleInputChange} 
                required/>
                {errors.name.length > 0 && 
                <span className='error'>{errors.name}</span>}
            <input
                name="lastname"
                placeholder="Last Name"
                type="text"
                value={this.state.lastname}
                onChange={this.handleInputChange} 
                required/>
                {errors.lastname.length > 0 && 
                <span className='error'>{errors.lastname}</span>}
            <input
                name="email"
                type="text"
                placeholder="E-mail"
                value={this.state.email}
                onChange={this.handleInputChange} 
                required/>
                {errors.email.length > 0 && 
                <span className='error'>{errors.email}</span>}
            <textarea
                name="question"
                type="text"
                placeholder="Question"
                value={this.state.question}
                onChange={this.handleInputChange} 
                required/>
                {errors.question.length > 0 && 
                <span className='error'>{errors.question}</span>}
            <input class="button" type="submit" value="Submit" />
          </form>
        );
      }
}
 
export default QuestionAsk;