import { createContext, useState } from "react";
import { GameState } from "../../api/types";
import { scoreService } from "../../services/score";

interface Props {
  children: React.ReactNode;
}

interface GameContextType {
  gameId: string | null;
  gameScore: number;
  gameState: GameState;
  isWin: boolean;
  setGameId: (gameId: string) => void;
  handleEndGame: (userId: string, points: number, isWin: boolean) => void;
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
  const [gameId, setGameId] = useState<string | null>(null);
  const [isWin, setIsWin] = useState<boolean>(false);

  const handleStartGame = () => {
    setGameState(GameState.InProgress);
  };

  const handleEndGame = (userId: string, points: number, isWin: boolean) => {
    if (!gameId || !userId) {
      throw new Error("Game id od User is not defined");
    }
    scoreService.add(userId, gameId, points);
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
