import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import Welcome from './components/Welcome'
import Feature from './components/Feature'
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import SignOut from './components/auth/SignOut';
import reducers from './reducers';

const appStore = createStore(
  reducers,
  {
    auth: {
      authenticated: localStorage.getItem('token')
    }
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={appStore}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/signout" component={SignOut}/>
        <Route path="/feature" component={Feature}/>
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);