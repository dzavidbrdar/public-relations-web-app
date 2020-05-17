import React from 'react';
import ReactDOM from 'react-dom';
import QuestionAsk from './QuestionAsk.js';
import {render,fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


it('renders without crashing',()=>{
  const div = document.createElement('div');
  ReactDOM.render(<QuestionAsk />, div);
});

it('prikazuje poruku kad je pitanje krace od 8 karaktera',()=>{
  const {getByPlaceholderText,getByTestId,getByText}=render(<QuestionAsk/>);
  const inputPitanje=getByPlaceholderText('Question');
  fireEvent.change(inputPitanje,{target:{value:'a?'}});
  getByText('aa');
});
/*dodati eventualno za mock sa fake userom*/
