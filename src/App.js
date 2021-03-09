import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import routes from './config/routes';
import AuthProvider from './providers/AuthProvider';

import './App.scss';

function App() {

  // Switch hará que no continue renderizando el resto de componentes despues del primero
  return (
    <AuthProvider>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

// Renderiza la route padre y les pasas la config a los hijas
function RouteWithSubRoutes(route) {

  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component routes={route.routes} {...props} />}
    />
  );
}

export default App;
