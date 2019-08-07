import React, { Fragment } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import TemperatureCalendar from './components/TemperatureCalendar';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path='/' component={TemperatureCalendar} />
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;
