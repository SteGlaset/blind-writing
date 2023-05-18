import getRussianText from '~/api/getRussianText';
import { createRef, FormEvent, RefObject, useEffect, useState } from 'react';
import cl from './Trainer.module.css';
import Container from '~/components/ui/Container/Container';

const Trainer = () => {
  const [text, setText] = useState('');
  const [value, setValue] = useState('');
  const [position, setPosition] = useState(0);
  const spanRef: RefObject<HTMLSpanElement> = createRef();

  const getText = () => {
    getRussianText()
      .then((data) => setText(data.text))
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    setValue('');
    setPosition(0);
    getText();
  }, []);
  useEffect(() => {
    if (position && position === text.length) {
      setValue('');
      setPosition(0);
      getText();
    }
  }, [position, text.length]);

  const handleInput = (event: FormEvent<HTMLTextAreaElement>) => {
    const value: string = (event.target as HTMLInputElement).value;
    const isValueLonger: boolean = value.length + 1 > position;
    if (isValueLonger) {
      setValue(value);
      if (value[position] === text[position]) {
        setPosition(position + 1);
        spanRef.current!.className = cl.pendingChar;
      } else {
        spanRef.current!.className = cl.erroredChar;
      }
    }
  };

  return (
    <Container className={cl.trainerWrapper}>
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
        <span ref={spanRef} className={cl.pendingChar}>{text[position]}</span>
        {text.slice(position + 1)}
      </p>
    </Container>
  );
};

export default Trainer;
