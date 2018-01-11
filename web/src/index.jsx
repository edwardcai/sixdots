import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import routes from 'routes';
import reader from 'reducers/index';

import { Router } from 'react-router';

const store = createStore(
  reader,
  applyMiddleware(thunk)
);

const render = () => ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes}/>
  </Provider>,
  document.getElementById('react-root'),
);

render()

store.subscribe(render)

