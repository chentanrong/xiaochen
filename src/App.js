import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider, } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './pages/ms/redux/reducers';
import LayoutMs from './pages/ms/layouts';
let store = window.sss = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <Switch>
            <Redirect exact from="/" to="/ms" />
            <Route path='/ms' component={LayoutMs} />
          </Switch>
        </Provider>
      </BrowserRouter>
    );
  }
}
export default App;
