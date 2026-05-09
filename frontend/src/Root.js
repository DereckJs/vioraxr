import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login';
import DoctorDashboard from './components/DoctorDashboard';
import PatientDashboard from './components/PatientDashboard';
import App from './App';

const PrivateRoute = ({ component: Component, roleRequired, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const currentRole = localStorage.getItem('user_role');
      if (!currentRole) {
        return <Redirect to="/" />;
      }
      if (roleRequired && currentRole !== roleRequired) {
        // Redirige al usuario al dashboard correcto si intenta acceder a uno que no le corresponde
        return <Redirect to={currentRole === 'doctor' ? '/doctor' : '/patient'} />;
      }
      return <Component {...props} />;
    }}
  />
);

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <PrivateRoute path="/doctor" component={DoctorDashboard} roleRequired="doctor" />
        <PrivateRoute path="/patient" component={PatientDashboard} roleRequired="patient" />
        <PrivateRoute path="/viewer" component={App} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default Root;
