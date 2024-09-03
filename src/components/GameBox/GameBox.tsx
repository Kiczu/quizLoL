import { Box } from "@mui/material";
import StartGame from "./StartGame";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext/GameContext";
import { GameState } from "../../api/types";

type Props = {
  title: string;
  children?: React.ReactNode;
};

const GameBox = ({ children, title }: Props) => {
  const gameContext = useContext(GameContext);

  return (
    <Box>
      <Box>
        {gameContext?.gameState === GameState.NotStarted && <StartGame />}

        {gameContext?.gameState === GameState.InProgress && (
          <Box width={"100%"}>{children}</Box>
        )}

        {gameContext?.gameState === GameState.Finished && (
          <div>
            {/* Tutaj kod do wyświetlania ekranu końcowego */}
            <p>{`Koniec gry! Twój wynik to: ${0}`} </p>
          </div>
        )}
      </Box>
    </Box>
  );
};

export default GameBox;
