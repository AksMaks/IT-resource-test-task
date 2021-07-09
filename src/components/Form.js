import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector} from 'redux-form';
import RegistryForm from './RegistryForm'
import BidForm from './BidForm'

const Form = (props) => {
    const { handleSubmit, pristine, reset, submitting, invalid, registry } = props
    return (
      <div>
        {registry? <RegistryForm {...props} />: <BidForm {...props} />}
      </div>
    )
  }
  
const selector = formValueSelector('BidForm')
  
let mapStateToProps = (state) => {
    let now = new Date()
    
    return {
      form: "BidForm",
      registry: selector(state, "createProfile"),
      initialValues: {
        createProfile: false,
        fullName: "123",
        distance: 5,
        dateBirth: (now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2)) 
      }
    };
  }; 
  
let mapDispatchToProps = (dispatch) => {
      return {
      onSubmit: (FormData) => {
        console.log(FormData)
      }
      }
};
  
export default connect(mapStateToProps, mapDispatchToProps)(reduxForm()(Form));