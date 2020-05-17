import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './Footer.js';
import {render,fireEvent,act} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


it('renders without crashing',()=>{
  const div = document.createElement('div');
  ReactDOM.render(<Footer />, div);
});

it('sadrzi tekst List of Stores',()=>{
  const {getByText}=render(<Footer/>);
  getByText('List of Stores');
});
