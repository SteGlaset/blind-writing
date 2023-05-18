import cl from './MistakesBar.module.css'
import { ReactElement } from 'react';

interface IProps {
  percentage: string;
  lastPercentage: string | null;
}
const MistakesBar = ({ percentage, lastPercentage }: IProps): ReactElement => {
  return (
    <div className={cl.mistakesWrapper}>
      <i className={cl.mistakesIcon}></i>
      <p className={cl.mistakesPercentage}>{percentage}% </p>
      {lastPercentage && <p className={cl.lastMistakesPercentage}>&nbsp;/ {lastPercentage}%</p>}
    </div>
  );
};

export default MistakesBar;
