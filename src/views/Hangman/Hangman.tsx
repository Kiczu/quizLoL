import { Box, Grid, Typography } from "@mui/material";
import { boxContainer, titleGame } from "./hangmanStyles";
import useHangmanData from "./useHangmanData";
import Keyboard from "./Keyboard/Keyboard";
import minion from "../../assets/images/minion.webp";
import GameBox from "../../components/GameBox/GameBox";

const Hangman = () => {
  const { letters, wrongGuesses, maxAttempts, userGuess } = useHangmanData();

  return (
    <GameBox title="Hangman">
      <Box marginTop={5} padding={3} sx={boxContainer}>
        <Typography component="h1" variant="h3" sx={titleGame}>
          Hangman
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Typography component="span" variant="h6" color="#fff">
                Liczba nieudanych prób: {wrongGuesses}
              </Typography>
              <Box marginY={2} fontSize="1.5rem">
                {letters.map(({ value, isCorrect }, key) => (
                  <Typography
                    component="span"
                    key={key}
                    color="#fff"
                    minWidth={20}
                    sx={{ margin: "0 5px" }}
                  >
                    {isCorrect ? value : "__"}
                  </Typography>
                ))}
              </Box>
              <Box maxWidth={500}>
                <Keyboard userGuess={userGuess} />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            {Array.from({ length: maxAttempts }, (_, i) => (
              <Box component="img" src={minion} alt="" key={i}></Box>
            ))}
          </Grid>
        </Grid>
      </Box>
    </GameBox>
  );
};

export default Hangman;
