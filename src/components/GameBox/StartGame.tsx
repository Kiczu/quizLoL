import { Box } from "@mui/material";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext/GameContext";
import { startGameContainer, overlayGameBox } from "./gameBoxStyles";
import { WavingButton } from "../../muiComponentsStyles";

const StartGame = () => {
  const gameContext = useContext(GameContext);

  const handleStartGame = () => {
    gameContext?.handleStartGame();
  };

  return (
    <Box sx={startGameContainer}>
      <Box sx={overlayGameBox}>
        <WavingButton onClick={handleStartGame}>Play</WavingButton>
      </Box>
    </Box>
  );
};

export default StartGame;
