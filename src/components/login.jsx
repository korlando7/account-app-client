import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authenticateUser, toggleLogin } from '../stores/actions';
import Register from './register';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleLoginRegister = this.toggleLoginRegister.bind(this);

    this.state = {
      user: {
        username: '',
        password: '',
      },
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.authenticateUser(this.state.user);
    this.setState({
      user: {
        username: '',
        password: '',
      },
    });
  }

  handleChange(e) {
    e.preventDefault();
    const { user } = this.state;
    const { name, value } = e.target;
    e.preventDefault();
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  toggleLoginRegister(e) {
    e.preventDefault();
    this.props.toggleLogin();
  }

  render() {
    return (
      <div className='form'>
        {this.props.isLogin ?
          <form className='forms'>
            <input
              className='forms-input'
              placeholder='Username'
              name='username'
              value={this.state.user.username}
              type='text'
              onChange={this.handleChange}
            />
            <input
              className='forms-input'
              placeholder='Password'
              name='password'
              value={this.state.user.password}
              type='password'
              onChange={this.handleChange}
            />
            <p>Not a member? <span className='forms-toggle' onClick={this.toggleLoginRegister}>register</span> here</p>
            <button className='forms-submit' onClick={this.handleSubmit}>Login</button>
          </form>
          : <Register />
        }
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  authenticateUser: bindActionCreators(authenticateUser, dispatch),
  toggleLogin: bindActionCreators(toggleLogin, dispatch),
});

const mapStateToProps = state => ({
  isLogin: state.ui.isLogin,
  authenticated: state.user.authenticated,
});

Login.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  toggleLogin: PropTypes.func.isRequired,
  isLogin: PropTypes.bool.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
