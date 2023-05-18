import cl from './MistakesBar.module.css';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { i18nLastMistakeTitle, i18nMistakeTitle } from '~/i18n/translations';

interface IProps {
  percentage: string;
  lastPercentage: string | null;
}
const MistakesBar = ({ percentage, lastPercentage }: IProps): ReactElement => {
  const locale = useSelector((state: RootState) => state.locale.lang);

  return (
    <div className={cl.mistakesWrapper}>
      <i title={i18nMistakeTitle[locale]} className={cl.mistakesIcon}></i>
      <p title={i18nMistakeTitle[locale]} className={cl.mistakesPercentage}>{percentage}% </p>
      {lastPercentage && (
        <p title={i18nLastMistakeTitle[locale]} className={cl.lastMistakesPercentage}>
          &nbsp;/ {lastPercentage}%
        </p>
      )}
    </div>
  );
};

export default MistakesBar;
