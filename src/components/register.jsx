import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createUser, setError, toggleLogin, searchUser } from '../stores/actions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.toggleLoginRegister = this.toggleLoginRegister.bind(this);

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
      this.props.setError('Please fill out form correctly');
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

  handleUsername(e) {
    this.handleChange(e);
    if (e.target.value) {
      this.props.searchUser(e.target.value);
    }
  }

  validateForm() {
    const {
      firstName, lastName, email, username, password,
    } = this.state.user;

    if (!(firstName && lastName && email && username && password)) return false;
    return true;
  }

  toggleLoginRegister(e) {
    e.preventDefault();
    this.props.toggleLogin();
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
          onChange={this.handleChange}
          name='email'
          type='email'
        />
        <input
          className='forms-input'
          placeholder='Username'
          value={user.username}
          onChange={this.handleUsername}
          name='username'
          type='text'
        />
        <input
          className='forms-input'
          placeholder='Password'
          value={user.password}
          onChange={this.handleChange}
          name='password'
          type='password'
        />
        <p>Already a member? <span className='forms-toggle' onClick={this.toggleLoginRegister}>log in</span> here</p>
        <button className='forms-submit'onClick={this.handleRegister}>Register</button>
      </form>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  createUser: bindActionCreators(createUser, dispatch),
  setError: bindActionCreators(setError, dispatch),
  toggleLogin: bindActionCreators(toggleLogin, dispatch),
  searchUser: bindActionCreators(searchUser, dispatch),
});

const mapStateToProps = state => ({
  isLogin: state.ui.isLogin,
});

Register.propTypes = {
  createUser: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  searchUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
