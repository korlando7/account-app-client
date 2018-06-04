import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Login from './login';
import ErrorMessage from './error';
import { logoutUser, setToLogin } from '../stores/actions';

const Layout = props => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/" href='/'>Home</Link>
          </li>
          <li>
            {props.authenticated
              ? <Link to="/" href='/' onClick={props.logoutUser}>Logout</Link>
              : <Link to="/login" href='/login' onClick={props.setToLogin}>Login</Link>
            }
          </li>
        </ul>
      </nav>
      {props.error ? <ErrorMessage /> : null }
      {props.authenticated
        ? <div>WELCOME!</div>
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
  error: state.ui.error,
  authenticated: state.user.authenticated,
});

Layout.propTypes = {
  error: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
  setToLogin: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(Layout);
