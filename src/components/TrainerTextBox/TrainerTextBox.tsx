import cl from '~/components/Trainer/Trainer.module.css';
import { forwardRef, LegacyRef, ReactElement } from 'react';

interface IProps {
  text: string;
  position: number;
}
const TrainerTextBox = (
  { text, position }: IProps,
  ref: LegacyRef<HTMLSpanElement>,
): ReactElement => {
  return (
    <p className={cl.pendingText}>
      {text.split('', position)}
      <span ref={ref} className={cl.pendingChar}>
        {text[position]}
      </span>
      {text.slice(position + 1)}
    </p>
  );
};

const forwardedRef = forwardRef(TrainerTextBox);
export default forwardedRef;
