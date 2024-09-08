import { createContext, useState } from "react";
import { GameState } from "../../api/types";

interface Props {
  children: React.ReactNode;
}

interface GameContextType {
  gameId: string;
  gameScore: number;
  gameState: GameState;
  isWin: boolean;
  setGameId: (gameId: string) => void;
  handleEndGame: (points: number, isWin: boolean) => void;
  handleStartGame: () => void;
}

export const GameContext = createContext<GameContextType>({
  gameId: "",
  gameScore: 0,
  gameState: GameState.NotStarted,
  isWin: false,
  setGameId: () => {},
  handleStartGame: () => {},
  handleEndGame: () => {},
});

export const GameProvider = ({ children }: Props) => {
  const [gameState, setGameState] = useState<GameState>(GameState.NotStarted);
  const [gameScore, setgameScore] = useState<number>(0);
  const [gameId, setGameId] = useState<string>("");
  const [isWin, setIsWin] = useState<boolean>(false);

  const handleStartGame = () => {
    setGameState(GameState.InProgress);
  };

  const handleEndGame = (points: number, isWin: boolean) => {
    setGameState(GameState.Finished);
    setgameScore(points);
    setIsWin(isWin);
  };

  return (
    <GameContext.Provider
      value={{
        gameId,
        gameScore,
        gameState,
        isWin,
        setGameId,
        handleStartGame,
        handleEndGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
