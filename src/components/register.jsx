import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debounce from 'lodash.debounce';
import FaCheck from 'react-icons/lib/fa/check';
import FaTimes from 'react-icons/lib/fa/times-circle';
import { createUser, setAlertMessage, toggleLogin, searchUser, searchEmail } from '../stores/actions';
import { validateEmail, validateUsername, validatePassword } from '../helper/validation';

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAvailability = this.handleAvailability.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.searchUser = debounce(this.props.searchUser, 250);
    this.searchEmail = debounce(this.props.searchEmail, 250);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
      },
    };
  }

  handleRegister(e) {
    const { user } = this.state;
    e.preventDefault();
    if (this.validateForm()) {
      this.props.createUser(this.state.user);
      this.setState({
        user: {
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          password: '',
        },
      });
      this.props.toggleLogin();
    } else {
      this.setState({
        user: {
          ...user,
          password: '',
        },
      });
      this.props.setAlertMessage('error', 'Please fill out form correctly');
    }
  }

  handleChange(e) {
    e.preventDefault();
    const { name, value } = e.target;
    const { user } = this.state;

    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleAvailability(e) {
    const { name, value } = e.target;
    this.handleChange(e);
    if (e.target.value) {
      if (name === 'email' && validateEmail(value)) this.searchEmail(value);
      else if (name === 'username' && validateUsername(value)) this.searchUser(value);
    }
  }

  validateForm() {
    const {
      firstName, lastName, email, username, password,
    } = this.state.user;

    if (!(firstName && lastName && email && username && password)) return false;
    if (!(firstName.length > 2 && lastName.length > 2 && username.length > 2 && password.length > 6)) return false;

    const userValid = validateUsername(username);
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);

    if (!(userValid && emailValid)) return false;
    if (!passwordValid.valid) {
      return false;
    }
    return true;
  }

  render() {
    const { user } = this.state;
    return (
      <form className='forms'>
        <input
          className='forms-input'
          placeholder='First Name'
          value={user.firstName}
          onChange={this.handleChange}
          name='firstName'
          type='text'
        />
        <input
          className='forms-input'
          placeholder='Last Name'
          value={user.lastName}
          onChange={this.handleChange}
          name='lastName'
          type='text'
        />
        <input
          className='forms-input'
          placeholder='Email'
          value={user.email}
          onChange={this.handleAvailability}
          name='email'
          type='email'
        />
        {(this.props.emailValid && user.email.length > 3)
          ? <FaCheck className='forms-icon forms-check' /> : null
        }
        {(!this.props.emailValid && user.email.length > 1)
          ? <FaTimes className='forms-icon forms-error' /> : null
        }
        <input
          className='forms-input'
          placeholder='Username'
          value={user.username}
          onChange={this.handleAvailability}
          name='username'
          type='text'
        />
        {(this.props.userValid && user.username.length > 2)
          ? <FaCheck className='forms-icon forms-check' /> : null
        }
        {(!this.props.userValid && user.username)
          ? <FaTimes className='forms-icon forms-error' /> : null
        }
        <input
          className='forms-input'
          placeholder='Password'
          value={user.password}
          onChange={this.handleChange}
          name='password'
          type='password'
        />
        <p>Already a member? <span className='forms-toggle' onClick={this.props.toggleLogin}>log in</span> here</p>
        <button className='forms-submit'onClick={this.handleRegister}>Register</button>
      </form>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  createUser: bindActionCreators(createUser, dispatch),
  setAlertMessage: bindActionCreators(setAlertMessage, dispatch),
  toggleLogin: bindActionCreators(toggleLogin, dispatch),
  searchUser: bindActionCreators(searchUser, dispatch),
  searchEmail: bindActionCreators(searchEmail, dispatch),
});

const mapStateToProps = state => ({
  isLogin: state.ui.isLogin,
  userValid: state.user.userValid,
  emailValid: state.user.emailValid,
});

Register.propTypes = {
  createUser: PropTypes.func.isRequired,
  setAlertMessage: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  searchUser: PropTypes.func.isRequired,
  searchEmail: PropTypes.func.isRequired,
  userValid: PropTypes.bool.isRequired,
  emailValid: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
