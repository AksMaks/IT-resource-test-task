import React from 'react';
import {Field } from 'redux-form';
import renderField from '../common/renderField'

//Валидация данные формы
const required = value => value ? undefined : 'Обязательный'
const length = (min, max) => value =>
  value && (value.length < min || value.length > max) ? `Должен быть от ${min} до ${max} символов` : undefined
const length310 = length(3, 10)

//форма для регистрации
const RegistryForm = (props) => {
    const { handleSubmit, pristine, reset, submitting, invalid, logitDisabled } = props
    let Submit = (date) => {
      handleSubmit(date)
      reset()
    }
    return (
      <form onSubmit={Submit}>
          <Field 
            name="email"
            type="text"
            disabled={false}
            component={renderField}
            label="Логин"
          />
          <Field 
            name="password"
            type="password"
            component={renderField} 
            label="Пароль"
            validate={[ required, length310 ]}
          />
        <div className="mb-2 mt-2">
          <button className="btn btn-secondary mr-2" type="button" disabled={pristine || submitting} onClick={reset}>Очистить</button>
          <button className="btn btn-primary ml-2" type="submit" disabled={invalid}>{props.textbutton}</button>
      </div>
      </form>
    )
  }

  export default RegistryForm