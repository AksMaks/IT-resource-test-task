import React from 'react';
import {Field} from 'redux-form';
import renderField from './common/renderField'

const required = value => value ? undefined : 'Обязательный'
const number = value => value && isNaN(Number(value)) ? 'Должен быть числом' : undefined
const minValue = min => value =>
  value && value < min ? `Должен быть больше или равен ${min}` : undefined
const maxValue = max => value =>
  value && value > max ? `Должен быть меньше или равен ${max}` : undefined
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined
const phone = value => value.slice(3).replace(/[^\d]/g, '').length < 10?  "Number entered incomplete": undefined

const normalizePhone = (value) => {
    if (!value) {
      return value
    }
  
    const onlyNums = value.slice(3).replace(/[^\d]/g, '')
    if (onlyNums.length <= 3) {
      return `+7 ${onlyNums}`
    }
    if (onlyNums.length <= 7) {
      return `+7 ${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
    }
    return `+7 ${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`
}

const BidForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, invalid, registry } = props
  let Submit = (date) => {
    handleSubmit(date)
    reset()
  }
  return (
    <form onSubmit={Submit}>
      <Field 
        name="fullName" 
        type="text"
        component={renderField} 
        label="ФИО"
        validate={[ required ]}
      />
      <Field 
        name="dateBirth"
        type="date"
        component={renderField}
        label="Дата рождения"
        validate={[ required ]}
      />
      <Field 
        name="email" 
        type="email"
        component={renderField} 
        label="Email"
        validate={[ required, email ]}
      />
      <Field 
        name="phone" 
        type="phone"
        component={renderField} 
        label="Телефон"
        validate={[ required, phone ]}
        normalize={normalizePhone}
      />
      <div>
        <label>Дистанция</label>
        <div>
          <Field 
            name="distance" 
            component="select"
            validate={[ required ]}
          >
            <option value={3}>3км</option>
            <option value={5}>5км</option>
            <option value={10}>10км</option>
          </Field>
        </div>
      </div>
      <Field 
        name="contribution" 
        type="number"
        component={renderField} 
        label="Сумма взноса"
        validate={[ required, number, minValue(100), maxValue(3000)]}
      />
      <Field 
        name="createProfile" 
        type="checkbox"
        component={renderField} 
        label="Создание профиля"
        disabled={invalid || pristine || submitting}
      />
      <div>
        <button type="submit" disabled={invalid}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

export default BidForm
