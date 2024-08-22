import { Character } from './../../api/types';
import { useEffect, useState } from "react";
import { ApiResponse } from "../../api/types";
import { api } from '../../api/api';

const maxAttempts = 6;

const getAll = () => {
    return api
        .get<ApiResponse>('https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/champion.json')
        .then((data) => Object.values(data.data));
}

const useHangmanData = () => {
    const [data, setData] = useState<null | Character[]>(null);
    const [letters, setLetters] = useState<{ isCorrect: boolean, value: string }[]>([]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [inputLetter, setInputLetter] = useState("");

    useEffect(() => {
        getAll().then(setData);
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
        } else {
            userWrongGuess();
        }
        setInputLetter("");
    };
    const resetWrongGuesses = () => {
        setWrongGuesses(0);
    };

    const userWrongGuess = () => {
        setWrongGuesses((prevWrongGuesses) => prevWrongGuesses + 1);
        if (wrongGuesses >= maxAttempts) {

        }
    };

    return { inputLetter, letters, wrongGuesses, changeLetter, handleLetterChange, userGuess, resetWrongGuesses };
}

export default useHangmanData;