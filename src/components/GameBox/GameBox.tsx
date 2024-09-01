import { Box, Button } from "@mui/material";
import { useState } from "react";

type Props = {
  title: string;
  children?: React.ReactNode;
};

enum GameState {
  NotStarted = "NotStarted",
  InProgress = "InProgress",
  Finished = "Finished",
}

const GameBox = ({children, title}: Props) => {
  const [gameState, setGameState] = useState<GameState>(GameState.NotStarted);
  const [gameScore, setgameScore] = useState(0);

  const startGame = () => {
    setGameState(GameState.InProgress);
  };

  const endGame = () => {
    setGameState(GameState.Finished);
  };

  return (
    <Box>
      <Box border={1} minHeight={200} padding={2} marginTop={10}>
        {gameState === GameState.NotStarted && (
          <Box width={"100%"}>
            <Button onClick={startGame} variant="contained">
              Rozpocznij grę
            </Button>
          </Box>
        )}

        {gameState === GameState.InProgress && (
          <Box width={"100%"}>{children}</Box>
        )}

        {gameState === GameState.Finished && (
          <div>
            {/* Tutaj kod do wyświetlania ekranu końcowego */}
            <p>{`Koniec gry! Twój wynik to: ${gameScore}`} </p>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default GameBox;