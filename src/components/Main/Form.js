import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, formValueSelector} from 'redux-form';
import { v4 as uuidv4 } from 'uuid';

import RegistryForm from './RegistryForm'
import BidForm from './BidForm'

//Блок, в которой отрысовывается нужная форма
const Form = (props) => {
    const { registry } = props
    return (
      <div>
        {registry? 
          <RegistryForm 
            {...props}
            textbutton={"Регистрация"}/>: 
          <BidForm 
            {...props}
            textbutton={"Отправить заявку"}/>
        }
      </div>
    )
  }
  
const selector = formValueSelector('BidForm')
//Дописать исходные значения 
let mapStateToProps = (state) => {
    let now = new Date()
    
    return {
      form: "BidForm",
      registry: selector(state, "profile"),
      initialValues: {
        name: "",
        dateBirth: (now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2)),
        email: "",
        phone: "+7 ",
        distance: 3,
        payment: 100,
        profile: false,
        }
    };
  }; 
//Написать диспач для добавления участника
let mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (FormData) => {
      console.log(FormData)
      let now = new Date()
      dispatch({type: "addUser", data: {
        ...FormData,
        id: uuidv4(),
        date: (now.getFullYear() + '-' + ('0' + (now.getMonth() + 1)).slice(-2) + '-' + ('0' + now.getDate()).slice(-2))
      }})
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm()(Form));