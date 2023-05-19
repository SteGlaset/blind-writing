import getRussianText from '~/api/getRussianText';
import {
  ChangeEvent,
  createRef,
  FormEvent,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState
} from 'react';
import cl from './Trainer.module.css';
import Container from '~/components/ui/Container/Container';
import MistakesBar from '~/components/MistakesBar/MistakesBar';
import SpeedBar from '~/components/SpeedBar/SpeedBar';
import { getMistakesPercentage } from '~/utils/utilities';
import TrainerTextBox from '~/components/TrainerTextBox/TrainerTextBox';
import Radio from '~/components/ui/Radio/Radio';
import useDidUpdateEffect from '~/hooks/useDidUpdateEffect';
import getEnglishText from '~/api/getEnglishText';

const Trainer = () => {
  const [text, setText] = useState('');
  const [value, setValue] = useState('');
  const [position, setPosition] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [textLang, setTextLang] = useState('ru');
  const spanRef: RefObject<HTMLSpanElement> = createRef();
  const isMistaken: MutableRefObject<boolean> = useRef(false);
  const lastMistakes: MutableRefObject<string | null> = useRef(null);
  const speed: MutableRefObject<number> = useRef(0);
  const startTime: MutableRefObject<number | null> = useRef(null);
  const textGetters: { [key: string]: () => void } = {
    en: () => {
      getEnglishText()
        .then((data) => setText(...data))
        .catch((error) => console.error(error));
    },
    ru: () => {
      getRussianText()
        .then((data) => setText(data.text))
        .catch((error) => console.error(error))
    },
  };
  const clearParameters = (): void => {
    setValue('');
    setPosition(0);
    setMistakes(0);
  };
  useEffect(() => {
    clearParameters();
    textGetters[textLang]();
  }, [textLang]);
  useDidUpdateEffect(() => {
    if (position && position === text.length) {
      lastMistakes.current = getMistakesPercentage(text, mistakes);
      speed.current = Math.ceil((text.length / ((Date.now() - (startTime.current as number)) / 1000)) * 60);
      clearParameters();
      textGetters[textLang]();
    }
  }, [position, text]);
  const handleInput = (event: FormEvent<HTMLTextAreaElement>): void => {
    if (!value.length) {
      startTime.current = Date.now();
    }
    const inputValue: string = (event.target as HTMLInputElement).value;
    const isValueLonger: boolean = inputValue.length + 1 > position;
    if (isValueLonger) {
      setValue(inputValue);
      if (inputValue[position] === text[position]) {
        setPosition((state) => state + 1);
        spanRef.current!.className = cl.pendingChar;
        isMistaken.current = false;
      } else if (!isMistaken.current) {
        setMistakes((state) => state + 1);
        isMistaken.current = true;
        spanRef.current!.className = cl.erroredChar;
      }
    }
  };
  const handleCheckbox = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.currentTarget.checked) {
      setTextLang(event.target.lang);
    }
  };
  return (
    <Container className={cl.trainerWrapper}>
      <div className={cl.bar}>
        <div>
          <SpeedBar speed={speed.current} />
          <MistakesBar
            percentage={getMistakesPercentage(text, mistakes)}
            lastPercentage={lastMistakes.current}
          />
        </div>
        <div>
          {Object.keys(textGetters).map((lang, i) => (
            <Radio
              key={lang + i}
              id={`${lang}Radio`}
              lang={lang}
              onChange={(event) => handleCheckbox(event)}
              name='textLang'
              checked={lang === textLang}
            >{lang}</Radio>
          ))}
        </div>
      </div>
      <textarea
        className={cl.textarea}
        maxLength={position + 1}
        onInput={(event) => handleInput(event)}
        value={value}
        autoCorrect='false'
        autoFocus={true}
      />
      <TrainerTextBox ref={spanRef} text={text} position={position} />
    </Container>
  );
};

export default Trainer;
