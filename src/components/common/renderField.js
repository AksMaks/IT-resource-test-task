
import 'bootstrap/dist/css/bootstrap.min.css';
//Элемент формы
const renderField = ({ input, label, type, disabled, meta: { touched, error, warning } }) => (
    <div className={"form-item"}>
      <div className={"form-label"}>
        <div >{label}</div>
        {touched && ((error && <div style={{color: "red"}}>{error}</div>) || (warning && <div>{warning}</div>))}
      </div>
      <div>
        <input className={"form-control"} {...input} placeholder={label} type={type} disabled={disabled} />
      </div>
    </div>
  )

  export default renderField