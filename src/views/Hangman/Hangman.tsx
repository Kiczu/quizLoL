import { Box, Grid, Typography } from "@mui/material";
import useHangmanData from "./useHangmanData";
import HangmanSvg from "./HangmanSvg";
import Keyboard from "./Keyboard/Keyboard";
import GameBox from "../../components/GameBox/GameBox";

const Hangman = () => {
  const { letters, wrongGuesses, userGuess } = useHangmanData();

  return (
    <GameBox title="Hangman">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginTop={5}
        padding={3}
      >
        <Typography component="h1" variant="h2" margin={4}>
          Hangman
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Typography component="span" variant="h6">
                Liczba nieudanych prób: {wrongGuesses}
              </Typography>
              <Box marginY={2} fontSize="1.5rem">
                {letters.map(({ value, isCorrect }, key) => (
                  <span key={key} style={{ margin: "0 5px" }}>
                    {isCorrect ? value : "__"}
                  </span>
                ))}
              </Box>
              <Box maxWidth={500}>
                <Keyboard userGuess={userGuess} />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <HangmanSvg wrongGuesses={wrongGuesses} />
          </Grid>
        </Grid>
      </Box>
    </GameBox>
  );
};

export default Hangman;
