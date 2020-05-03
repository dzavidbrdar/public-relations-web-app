import React, { Component } from 'react';
import { message } from 'antd';
import '../Form.css';

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

class FormaBrisanjeRezervacija extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: undefined,
            email: undefined,
            recaptcha: false,
            errors: {
                code: '',
                email: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
        this.expiredCallback = this.expiredCallback.bind(this);
    }
    verifyCallback() {
        this.setState({
            recaptcha: true
        });
    }
    expiredCallback() {
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
            case 'email':
                errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
                break;
            default:
                break;
        }

        this.setState({ errors, [name]: value });
    }


    handleSubmit(event) {
        event.preventDefault();
        if (validateForm(this.state.errors) && this.state.recaptcha) {
            let object = {};
            object.verificationCode = this.state.code;
            object.email = this.state.email;
            console.log(object)
            recaptchaInstance.reset();
            this.setState({
                recaptcha: false
            });

            var ajax = new XMLHttpRequest();
            ajax.onreadystatechange = () => {
                var mod = document.getElementById('btnCancel');
                console.log(ajax);
                let res = JSON.parse(ajax.responseText);
                if (ajax.readyState === 4 && ajax.status === 200) {
                    message.success(res.message + '!');
                    mod.click();
                }
                else if (ajax.readyState === 4 && ajax.status === 404) {
                    message.error(res.message + '!');
                    mod.click();
                }
                else if (ajax.readyState === 4){ message.error("ERROR"); mod.click(); }
            }
            ajax.open("DELETE", 'https://main-server-si.herokuapp.com/api/reservations', true);
            ajax.setRequestHeader("Content-Type", "application/json");
            ajax.send(JSON.stringify(object));
        } else {
            message.error("Invalid form!");
        }
    }
    render() {
        const { errors } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div class="irma block">
                    <label class="irma">Email:</label>
                    <input
                        class="irma"
                        name="email"
                        type="text"
                        placeholder="E-mail"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                        required />
                    {errors.email.length > 0 &&
                        <span className='irma error'>{errors.email}</span>}
                </div>
                <div class="irma block">
                    <label class="irma">Validation code:</label>
                    <input
                        class="irma"
                        name="code"
                        placeholder="Validation code"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleInputChange}
                        required />
                    {errors.code.length > 0 &&
                        <span className='irma error'>{errors.code}</span>}
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
                <div class="irma block" style={{ float: 'left', width: '80px' }}>
                    <input type="submit" value="Delete Reservation" style={{ width: '150px', lineHeight: '1' }} />
                </div>
            </form>);
    }
}

export default FormaBrisanjeRezervacija;