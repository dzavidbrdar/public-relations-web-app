import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login.js';
import {render,fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


it('renders without crashing',()=>{
  const div = document.createElement('div');
  ReactDOM.render(<Login />, div);
});

it('po potrebi prikazuje odgovarajucu poruku greske kod unosa korisnickih podataka',()=>{
  const {getByPlaceholderText,getByTestId,getByText}=render(<Login/>);
  const inputUsername=getByPlaceholderText('Username');
  const inputPassword=getByPlaceholderText('Password');
  const btnSubmit=getByText('Submit');
  const obavijest1=getByTestId('loginO1');
  const obavijest2=getByTestId('loginO2');

  fireEvent.change(inputUsername,{target:{value:'emir '}});
  expect(obavijest1).toHaveTextContent('Username can contain only letters or numbers');
  fireEvent.change(inputUsername,{target:{value:'emir'}});
  expect(obavijest1).toHaveTextContent('');

  fireEvent.change(inputPassword,{target:{value:'pass '}});
  expect(obavijest1).toHaveTextContent('Password can contain only letters, numbers or these characters: !,@,#,$,&,*');
  fireEvent.change(inputPassword,{target:{value:'pass'}});
  expect(obavijest1).toHaveTextContent('');

  fireEvent.change(inputUsername,{target:{value:''}});
  fireEvent.submit(btnSubmit);
  expect(obavijest1).toHaveTextContent('Username cannot be empty');
  fireEvent.change(inputUsername,{target:{value:'emir'}});

  fireEvent.change(inputPassword,{target:{value:''}});
  fireEvent.submit(btnSubmit);
  expect(obavijest1).toHaveTextContent('Password cannot be empty');

});
/*dodati eventualno za mock sa fake userom*/
