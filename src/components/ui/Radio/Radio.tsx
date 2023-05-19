import { InputHTMLAttributes, ReactElement } from 'react';
import cl from './Radio.module.css';

const Radio = ({ ...props }: InputHTMLAttributes<HTMLInputElement>): ReactElement => {
  return (
    <>
      <input
        id={props.id}
        lang={props.lang}
        onChange={props.onChange}
        type='radio'
        name={props.name}
        checked={props.checked}
        className={cl.radio}
      />
      <label htmlFor={props.id} className={cl.label}>{props.children}</label>
    </>
  );
};

export default Radio;
