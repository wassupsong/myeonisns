import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import { firebaseAuth, firebaseApp } from 'fbase';
console.log(firebaseApp)
console.log(firebaseAuth)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);