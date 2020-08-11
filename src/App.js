import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './views/Login';
import InternalServerError from './views/InternalServerError';
import './styles.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Login} />
          <Route
            path="/internal-server-error"
            exact
            component={InternalServerError}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
