import React from 'react';
import classes from './Input.css';

const input = props => {
  let inputElement = null;
  let inputClass;
  if (props.invalid && props.shouldValidate && props.touched) {
    inputClass = classes.Invalid;
  }

  switch (props.elementType) {
    case 'input':
      inputElement = <input {...props}
        {...props.elementConfig} 
        value={props.value} 
        onChange={props.changed}
        className={inputClass} />;
      break;
    case 'textarea':
      inputElement = <input {...props}
        {...props.elementConfig} 
        value={props.value} 
        onChange={props.changed}
        className={inputClass} />;
      break;
    case 'select':
      inputElement = (
        <select {...props} {...props.elementConfig} value={props.value} onChange={props.changed}>
         
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}

        </select>
      );
      break;
    default:
      inputElement = <input {...props}
        {...props.elementConfig} 
        value={props.value} 
        onChange={props.changed}
        className={inputClass} />;
      break;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{ props.label }</label>
      {inputElement}
    </div>
  );
};

export default input;