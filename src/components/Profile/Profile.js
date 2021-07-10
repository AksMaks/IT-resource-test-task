import React from 'react';
import {connect} from 'react-redux';

import ChengeForm from './ChangeForm';
import AuthForm from './AuthForm';

const profile = (props) => {
  const { registry } = props
  return (
    <div>
      {props.authError && <div style={{color: "red"}}>{props.authError}</div>}
      {props.user? <ChengeForm/>: <AuthForm/>}
    </div>
  )
}
let mapStateToProps = (state) => {
    return {
      user: state.people.currentUser,
      authError: state.people.error
    };
  }; 
let mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(profile);