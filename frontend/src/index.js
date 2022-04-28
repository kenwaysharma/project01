import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {configureStore} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import countReducer from './redux/reducer'
import postReducer from './redux/postReducer';

const store = configureStore({
  reducer: {counter: countReducer,
  posts: postReducer
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <Provider store={store}>
      <App />
    </Provider>
   
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
