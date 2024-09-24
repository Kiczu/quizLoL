import { ChampionDetails, Character } from './../../api/types';
import { useEffect, useState } from "react";
import { ApiResponse } from "../../api/types";
import { api } from '../../api/api';

function getAll() {
    return api
        .get<ApiResponse>('https://ddragon.leagueoflegends.com/cdn/14.10.1/data/en_US/champion.json')
        .then((data) => Object.values(data.data));
}

export default function useHangmanData() {
    const [data, setData] = useState<null | Character[]>(null);
    const [letters, setLetters] = useState<{isCorrect: boolean, value: string}[]>([]);

    useEffect(() => {
        getAll().then(setData);
    }, []);

    useEffect(() => {
        if (data) {
            const randomCharacter = data[Math.floor(Math.random() * data.length)];
            setLetters(
                randomCharacter.name
                    .split('').map((letter) => ({isCorrect: false, value: letter}))
            );
        }
    }, [data]);

    const changeLetter = (letter: string) => {
        setLetters((prevLetters) => prevLetters.map((item) => {
            if (item.value === letter) {
                return {...item, isCorrect: true};
            }
            return item;}))}
    
    return {letters, changeLetter};
}