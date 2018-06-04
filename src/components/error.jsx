import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeError } from '../stores/actions';


const ErrorMessage = props => (
  <div className='error-message'>
    <h1 className='error-message-text'>{props.errorMessage}</h1>
    <div className='error-message-close'><button onClick={props.closeError}>X</button></div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  closeError: bindActionCreators(closeError, dispatch),
});

const mapStateToProps = state => ({
  errorMessage: state.ui.errorMessage,
});

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  closeError: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(ErrorMessage);
