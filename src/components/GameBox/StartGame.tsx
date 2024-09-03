import { Box, Button } from "@mui/material";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext/GameContext";

const StartGame = () => {
  const gameContext = useContext(GameContext);

  const handleStartGame = () => {
    gameContext?.handleStartGame();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Button variant="contained" onClick={handleStartGame}>
        Rozpocznij grę
      </Button>
    </Box>
  );
};

export default StartGame;
