import React from 'react';
import {Field } from 'redux-form';
import renderField from './common/renderField'

const required = value => value ? undefined : 'Обязательный'

const RegistryForm = (props) => {
    const { handleSubmit, pristine, reset, submitting, invalid, registry } = props
    let Submit = (date) => {
      handleSubmit(date)
      reset()
    }
    return (
      <form onSubmit={Submit}>
        <div>
          <Field 
            name="email"
            type="text"
            disabled={true}
            component={renderField} 
            label="Логин"
          />
          <Field 
            name="password"
            type="password"
            component={renderField} 
            label="Пароль"
            validate={[ required ]}
          />
        </div>
        <div>
          <button type="submit" disabled={invalid}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
        </div>
      </form>
    )
  }

  export default RegistryForm