import { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import { GameState } from "../../api/types";
import { GameContext } from "../../context/GameContext/GameContext";
import StartGame from "./StartGame";
import EndGame from "./EndGame";

type Props = {
  title: string;
  children?: React.ReactNode;
};

const GameBox = ({ children, title }: Props) => {
  const { gameState, setGameId } = useContext(GameContext);

  useEffect(() => {
    setGameId(title);
  }, [title, setGameId]);

  return (
    <Box>
      <Box>
        {gameState === GameState.NotStarted && <StartGame />}

        {gameState === GameState.InProgress && (
          <Box width={"100%"}>{children}</Box>
        )}
        {gameState === GameState.Finished && <EndGame />}
      </Box>
    </Box>
  );
};

export default GameBox;
