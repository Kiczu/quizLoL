import { useState } from "react";
import "./hangMan.scss";
import useHangmanData from "./useHangmanData";

export default function Hangman() {
    const {letters, changeLetter} = useHangmanData();

    const [inputValue, setInputValue] = useState('')

    const handleLetterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isCorrect = letters.some(({value}) => value === inputValue);

        if (isCorrect) {
            changeLetter(inputValue);
        }
    };

    console.log(
        letters
    );
    
    
  return (
    <div>
      <h1>Hangman</h1>

      {letters.map(({value, isCorrect}, key) => (
        <span key={key}>{ isCorrect && value }</span>
    ))}
      
      <form onSubmit={handleSubmit} >
        
    <input  name={`letter`} type="text" onChange={handleLetterChange} value={inputValue} maxLength={1} />
      </form>
      
      <svg
        width="100"
        height="124.99999999999999"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        xmlSpace="preserve"
      >
        <g>
          <title>Layer 1</title>
          <g id="svg_1">
            <line
              className="line1"
              fill="none"
              stroke-width="4"
              x1="10.32787"
              y1="103.07377"
              x2="41.80499"
              y2="103.07377"
              id="svg_5"
              stroke="#000000"
              visibility="hidden"
            />
            <line
              className="line2"
              fill="none"
              stroke-width="4"
              x1="25.08197"
              y1="15.20492"
              x2="25.08197"
              y2="101.13284"
              id="svg_6"
              stroke="#000000"
              visibility="hidden"
            />
            <line
              className="line3"
              fill="none"
              stroke-width="4"
              x1="25.08197"
              y1="15.20492"
              x2="25.08197"
              y2="101.13284"
              id="svg_8"
              stroke="#000000"
              visibility="hidden"
            />
            <line
              className="line4"
              fill="none"
              stroke-width="4"
              x1="22.95082"
              y1="16.18852"
              x2="74.60788"
              y2="16.18852"
              id="svg_9"
              stroke="#000000"
              visibility="hidden"
            />
            <line
              className="line5"
              fill="none"
              stroke-width="4"
              x1="72.29508"
              y1="17.9918"
              x2="72.29508"
              y2="36.02459"
              id="svg_11"
              stroke="#000000"
              visibility="hidden"
            />
            <line
              className="line6"
              fill="none"
              stroke-width="4"
              x1="72.29508"
              y1="56.51639"
              x2="72.29508"
              y2="86.8448"
              id="svg_12"
              stroke="#000000"
              visibility="hidden"
            />
            <line
              className="line7"
              fill="none"
              stroke-width="4"
              x1="73.27869"
              y1="65.34946"
              x2="90.81967"
              y2="71.76229"
              id="svg_13"
              stroke="#000000"
              visibility="hidden"
            />
            <line
              className="line8"
              fill="none"
              stroke-width="4"
              x1="71.14754"
              y1="65.92095"
              x2="54.59016"
              y2="72.58197"
              id="svg_14"
              stroke="#000000"
              visibility="hidden"
            />
            <line
              className="line9"
              fill="none"
              stroke-width="4"
              x1="71.96721"
              y1="84.02336"
              x2="84.42623"
              y2="99.30328"
              id="svg_15"
              stroke="#000000"
              visibility="hidden"
            />
            <line
              className="line10"
              fill="none"
              stroke-width="4"
              x1="71.96721"
              y1="85.91298"
              x2="61.31148"
              y2="98.15574"
              id="svg_16"
              stroke="#000000"
              visibility="hidden"
            />
            <line
              className="line11"
              fill="none"
              stroke-width="4"
              x1="25.2459"
              y1="35.94262"
              x2="46.88525"
              y2="15.92623"
              id="svg_17"
              stroke="#000000"
              visibility="hidden"
            />
            <ellipse
              className="elipse"
              fill="none"
              stroke-width="4"
              cx="72.54098"
              cy="46.92623"
              id="svg_18"
              rx="10.2459"
              ry="10.2459"
              stroke="#000000"
              visibility="hidden"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
