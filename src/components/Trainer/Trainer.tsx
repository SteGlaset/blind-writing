import getRussianText from '~/api/getRussianText';
import { createRef, FormEvent, RefObject, useEffect, useState } from 'react';
import cl from './Trainer.module.css';
import Container from '~/components/ui/Container/Container';
import MistakesBar from '~/components/MistakesBar/MistakesBar';
import SpeedBar from '~/components/SpeedBar/SpeedBar';

const Trainer = () => {
  const [text, setText] = useState('');
  const [value, setValue] = useState('');
  const [position, setPosition] = useState(0);
  const [mistakeFlag, setMistakeFlag] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [lastMistakes, setLastMistakes] = useState<string | null>(null);
  const [speed, setSpeed] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const spanRef: RefObject<HTMLSpanElement> = createRef();

  const getText = (): void => {
    getRussianText()
      .then((data) => setText(data.text))
      .catch((error) => console.error(error));
  };
  const clearParameters = (): void => {
    setValue('');
    setPosition(0);
    setMistakes(0);
  };
  const getMistakesPercentage = (): string => {
    return ((mistakes / text.length) * 100).toFixed(2);
  };
  useEffect(() => {
    clearParameters();
    getText();
  }, []);
  useEffect(() => {
    setMistakeFlag(false);
    if (position && position === text.length) {
      setLastMistakes(getMistakesPercentage());
      setSpeed(Math.ceil((text.length / ((Date.now() - (startTime as number)) / 1000)) * 60));
      clearParameters();
      getText();
    }
  }, [position, text.length]);
  useEffect(() => {
    if (mistakeFlag) {
      setMistakes((state) => state + 1);
    }
  }, [mistakeFlag]);

  const handleInput = (event: FormEvent<HTMLTextAreaElement>): void => {
    const inputValue: string = (event.target as HTMLInputElement).value;
    if (!value.length) {
      setStartTime(Date.now());
      console.log('start');
    }
    const isValueLonger: boolean = inputValue.length + 1 > position;
    if (isValueLonger) {
      console.table([text.length, startTime, Date.now(), Date.now() - (startTime as number)]);
      setValue(inputValue);
      if (inputValue[position] === text[position]) {
        setPosition(position + 1);
        spanRef.current!.className = cl.pendingChar;
      } else {
        setMistakeFlag(true);
        spanRef.current!.className = cl.erroredChar;
      }
    }
  };

  return (
    <Container className={cl.trainerWrapper}>
      <SpeedBar speed={speed} />
      <MistakesBar percentage={getMistakesPercentage()} lastPercentage={lastMistakes} />
      <textarea
        className={cl.textarea}
        maxLength={position + 1}
        minLength={position}
        onInput={(event) => handleInput(event)}
        value={value}
        autoCorrect='false'
        autoFocus={true}
      />
      <p className={cl.pendingText}>
        {text.split('', position)}
        <span ref={spanRef} className={cl.pendingChar}>
          {text[position]}
        </span>
        {text.slice(position + 1)}
      </p>
    </Container>
  );
};

export default Trainer;
