import { useContext, useEffect, useState } from "react";
import { ChampionDetails } from "../../api/types";
import { characterService } from '../../services/characterService';
import { GameContext } from '../../context/GameContext/GameContext';
import { useAuth } from "../../context/LoginContext/LoginContext";

const maxAttempts = 6;
const winBonus = 10;

const useHangmanData = () => {
    const { userData } = useAuth();
    const [data, setData] = useState<null | ChampionDetails[]>(null);
    const [letters, setLetters] = useState<{ isCorrect: boolean, value: string }[]>([]);
    const [wrongGuesses, setWrongGuesses] = useState<number>(0);
    const [inputLetter, setInputLetter] = useState<string>("");
    const [points, setPoints] = useState<number>(0);

    const hangmanContext = useContext(GameContext);
    const isGameOver = wrongGuesses === maxAttempts;
    const isAllAnswerCorrect = letters.length > 0 && letters.every(({ isCorrect }) => isCorrect);

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
        if (isGameOver) {
            hangmanContext?.handleEndGame(userData?.id || "", points, false);
        } else if (isAllAnswerCorrect) {
            hangmanContext?.handleEndGame(userData?.id || "", points + winBonus, true);
        }
    }, [isGameOver, isAllAnswerCorrect]);

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

    return { inputLetter, letters, wrongGuesses, maxAttempts, changeLetter, handleLetterChange, userGuess, resetWrongGuesses };
}

export default useHangmanData;
