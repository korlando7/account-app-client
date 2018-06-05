import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './login';
import AlertMessage from './alertMessage';
import Sidebar from './sidebar';
import Loader from './loader';
import { logoutUser, setToLogin } from '../stores/actions';

const Layout = props => (
  <Router>
    <div id='main'>
      {props.isLoading ? <Loader /> : null}
      <nav id='main-nav'>
        <ul>
          <li>
            <Link to="/" href='/'>Home</Link>
          </li>
          {props.authenticated
            ? [
              <li key='account'><Link to="/account" href='/'>Account</Link></li>,
              <li key='logout'><Link to="/" href='/' onClick={props.logoutUser}>Logout</Link></li>,
            ]
            : <li><Link to="/login" href='/login' onClick={props.setToLogin}>Login</Link></li>
          }
        </ul>
      </nav>
      <Sidebar />
      {props.alert ? <AlertMessage type={props.alertType} /> : null }
      {props.authenticated
        ? <div className='content'>WELCOME!</div>
        : <Route exact path='/login' component={Login} />
      }
    </div>
  </Router>
);

const mapDispatchToProps = dispatch => ({
  logoutUser: bindActionCreators(logoutUser, dispatch),
  setToLogin: bindActionCreators(setToLogin, dispatch),
});

const mapStateToProps = state => ({
  alert: state.ui.alert,
  alertType: state.ui.alertType,
  authenticated: state.user.authenticated,
  isLoading: state.ui.isLoading,
});

Layout.propTypes = {
  alert: PropTypes.bool.isRequired,
  alertType: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  setToLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(Layout);
