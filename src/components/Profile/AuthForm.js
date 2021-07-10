import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, formValueSelector} from 'redux-form';
import renderField from '../common/renderField'

//Валидация данных формы
const required = value => value ? undefined : 'Обязательный'
const length = (min, max) => value =>
  value && (value.length < min || value.length > max) ? `Должен быть от ${min} до ${max} символов` : undefined
const length310 = length(3, 10)

//форма для авторизации
const AuthForm = (props) => {
    const { handleSubmit, reset, invalid } = props
    let Submit = (date) => {
      handleSubmit(date)
      reset()
    }
    return (
      <form onSubmit={Submit}>
          <Field 
            name="password"
            type="password"
            component={renderField} 
            label="Пароль"
            validate={[ required ]}
          />
      <div className="mb-2 mt-2">
        <button className="btn btn-primary" type="submit" disabled={invalid}>{props.textbutton}</button>
      </div>
      </form>
    )
  }

let mapStateToProps = (state) => {
    return {
      form: "AuthForm",
      textbutton: "Авторизоваться"
    };
  }; 
//Написать диспач для добавления участника
let mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (FormData) => {
      dispatch({type: "authUser", data: FormData})
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm()(AuthForm));