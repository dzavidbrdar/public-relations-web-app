import React from 'react';
import ReactDOM from 'react-dom';
import Questions2 from './Questions.js';
import {render,fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


it('renders without crashing',()=>{
  const div = document.createElement('div');
  ReactDOM.render(<Questions2 />, div);
});

it('sadrzi tekst General questions',()=>{
  const {getByText}=render(<Questions2/>);
  getByText('General questions');
});
