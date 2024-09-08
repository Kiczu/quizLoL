import { Character } from './../../api/types';
import { useContext, useEffect, useState } from "react";
import { characterService } from '../../api/characterService';
import { GameContext } from '../../context/GameContext/GameContext';

const maxAttempts = 6;
const winBonus = 10;

const useHangmanData = () => {
    const [data, setData] = useState<null | Character[]>(null);
    const [letters, setLetters] = useState<{ isCorrect: boolean, value: string }[]>([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [inputLetter, setInputLetter] = useState("");
    const [points, setPoints] = useState(0);

    const hangmanContext = useContext(GameContext);

    useEffect(() => {
        characterService.getAll().then(setData);
    }, []);

    useEffect(() => {
        if (data) {
            const randomCharacter = data[Math.floor(Math.random() * data.length)];
            setLetters(
                randomCharacter.name
                    .split('').map((letter) => ({ isCorrect: false, value: letter.toUpperCase() }))
            );
        }
    }, [data]);

    useEffect(() => {
        const isGameOver = wrongGuesses === maxAttempts;
        const isWin = letters.length > 0 && letters.every(({ isCorrect }) => isCorrect);

        if (isGameOver) {
            hangmanContext?.handleEndGame(points);
        } else if (isWin) {
            hangmanContext?.handleEndGame(points + winBonus);
        }
    }, [wrongGuesses, letters, hangmanContext])

    const changeLetter = (letter: string) => {
        setLetters((prevLetters) => prevLetters.map((item) => {
            if (item.value === letter) {
                return { ...item, isCorrect: true };
            }
            return item;
        }))
    }

    const handleLetterChange = (letter: string) => {
        setInputLetter(letter);
    }

    const userGuess = (letter: string) => {
        const isCorrect = letters.some(({ value }) => value === letter);
        if (isCorrect) {
            changeLetter(letter);
            setPoints((prevPoints) => prevPoints + 1);
        } else {
            userWrongGuess();
        }
        setInputLetter("");
    };
    const resetWrongGuesses = () => {
        setWrongGuesses(0);
        setLetters(letters.map(({ value }) => ({ isCorrect: false, value })));
    };

    const userWrongGuess = () => {
        setWrongGuesses((prevWrongGuesses) => prevWrongGuesses + 1);
    };

    return { inputLetter, letters, wrongGuesses, changeLetter, handleLetterChange, userGuess, resetWrongGuesses };
}

export default useHangmanData;