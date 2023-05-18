import { HTMLAttributes, ReactElement } from 'react';
import cl from './Container.module.css';
const Container = ({ children, ...props }: HTMLAttributes<HTMLDivElement>): ReactElement => {
  return <div className={`${cl.container} ${props.className}`}>{children}</div>;
};

export default Container;
