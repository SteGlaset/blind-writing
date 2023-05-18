import cl from './SpeedBar.module.css';
import { ReactElement } from 'react';
import { RootState } from '~/redux/store';
import { useSelector } from 'react-redux';
import { i18nSpeedPerSecond, i18nSpeedTitle } from '~/i18n/translations';

interface IProps {
  speed: number;
}

const SpeedBar = ({ speed }: IProps): ReactElement => {
  const locale = useSelector((state: RootState) => state.locale.lang);
  return (
    <div className={cl.speedWrapper}>
      <i title={i18nSpeedTitle[locale]} className={cl.speedIcon}></i>
      <p title={i18nSpeedTitle[locale]} className={cl.speed}>
        {`${speed} ${i18nSpeedPerSecond[locale]}`}
      </p>
    </div>
  );
};

export default SpeedBar;
