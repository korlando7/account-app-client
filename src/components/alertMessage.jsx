import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeAlertMessage } from '../stores/actions';

const AlertMessage = props => (
  <div className={`${props.type} message`}>
    <h1 className={`${props.type} message-text`}>{props.alertMessage}</h1>
    <div className='message-close'><button className={props.type} onClick={props.closeAlertMessage}>X</button></div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  closeAlertMessage: bindActionCreators(closeAlertMessage, dispatch),
});

const mapStateToProps = state => ({
  alertMessage: state.ui.alertMessage,
});

AlertMessage.propTypes = {
  type: PropTypes.string.isRequired,
  alertMessage: PropTypes.string.isRequired,
  closeAlertMessage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AlertMessage);
