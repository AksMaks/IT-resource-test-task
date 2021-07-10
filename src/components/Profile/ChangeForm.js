import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';

import renderField from '../common/renderField'

//Валидация данных формы
const required = value => value ? undefined : 'Обязательный'
const scope = (min, max) => value =>
  value && (value < min || value > max)? `Должен быть от ${min} до ${max}` : undefined
const scope1003000 = scope(100, 3000)
  const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Неверный адрес электронной почты' : undefined
const phone = value => value.slice(3).replace(/[^\d]/g, '').length < 10?  "Номер введен не полностью": undefined
const check14Years = value => ((new Date() - new Date(value))/(14*365*24*3600*1000)) <= 1? "Участие толко с 14 лет": undefined

//нормализация даты рождения (максимум +5 дней от текущей даты)
const normalizeDate = (value) => {
  if (!value) {
    return value
  }
  let date = new Date()
  date.setDate(date.getDate() + 5)
  if(date < new Date(value)){
    return (date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2))
  }else{
    return value
  }
}
//нормализация номера телефона (приведение к шаблону "+7 999-999-999")
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

//Форма для подачи заявки
const ChangeForm = (props) => {
  const { handleSubmit, reset, invalid } = props
  let Submit = (date) => {
    handleSubmit(date)
    reset()
  }
  return (
    <form onSubmit={Submit}>
        <Field 
          name="name" 
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
          validate={[ required, check14Years]}
          normalize={normalizeDate}
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
      <div className={"form-item"}>
        <div className={"form-label"}>Дистанция</div>
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
          name="payment" 
          type="number"
          component={renderField} 
          label="Сумма взноса"
          validate={[ required, scope1003000]}
        />
      
      <div className="mb-2 mt-2">
        <button className="btn btn-primary" type="submit" disabled={invalid}>{props.textbutton}</button>
      </div>
    </form>
  )
}

let mapStateToProps = (state) => {
  return {
    form: "ChangeForm",
    textbutton: "Сохранить",
    initialValues: state.people.currentUser
  };
}; 
//Написать диспач для добавления участника
let mapDispatchToProps = (dispatch) => {
return {
  onSubmit: (FormData) => {
    dispatch({type: "changeUser", data: FormData})
  }
}
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm()(ChangeForm));
