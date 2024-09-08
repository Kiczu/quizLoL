import { createContext, useState } from "react";
import { GameState } from "../../api/types";

interface Props {
  children: React.ReactNode;
}

interface GameContextType {
  gameId: string;
  gameScore: number;
  gameState: GameState;
  setGameId: (gameId: string) => void;
  handleStartGame: () => void;
  handleEndGame: () => void;
}

export const GameContext = createContext<GameContextType>({
  gameId: "",
  gameScore: 0,
  gameState: GameState.NotStarted,
  setGameId: () => {},
  handleStartGame: () => {},
  handleEndGame: () => {},
});

export const GameProvider = ({ children }: Props) => {
  const [gameState, setGameState] = useState<GameState>(GameState.NotStarted);
  const [gameScore, setgameScore] = useState<number>(0);
  const [gameId, setGameId] = useState<string>("");

  const handleStartGame = () => {
    setGameState(GameState.InProgress);
  };

  const handleEndGame = () => {
    setGameState(GameState.Finished);
    setgameScore(0);
  };

  return (
    <GameContext.Provider
      value={{
        gameId,
        gameScore,
        gameState,
        setGameId,
        handleStartGame,
        handleEndGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
