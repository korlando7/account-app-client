import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeSuccess } from '../stores/actions';


const SuccessMessage = props => (
  <div className='success-message'>
    <h1 className='success-message-text'>{props.successMessage}</h1>
    <div className='success-message-close'><button onClick={props.closeSuccess}>X</button></div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  closeSuccess: bindActionCreators(closeSuccess, dispatch),
});

const mapStateToProps = state => ({
  successMessage: state.ui.successMessage,
});

SuccessMessage.propTypes = {
  successMessage: PropTypes.string.isRequired,
  closeSuccess: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(SuccessMessage);
