import 'file?name=favicon.ico!./App.favicon.ico';

import './App.less';

import 'babel/polyfill';

import App from './App';
import state from './state';

import {
  root as baobabRoot
} from 'baobab-react/decorators';
import React from 'react';
import ReactDOM from 'react-dom';

@baobabRoot(state)
class AppWrapper extends React.Component {
  render() {
    return (
      <App />
    );
  }
}

let containerElem = document.getElementById('react_app_container');
if (!containerElem) {
  containerElem = document.createElement('div');
  containerElem.id = 'react_app_container';
  document.body.appendChild(containerElem);
}
ReactDOM.render(<AppWrapper />, containerElem);
