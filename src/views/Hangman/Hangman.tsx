import { Box, Button, Grid, Typography } from "@mui/material";
import useHangmanData from "./useHangmanData";
import HangmanSvg from "./HangmanSvg";

const Hangman = () => {
  const { letters, wrongGuesses, userGuess } = useHangmanData();

  return (
    <Box>
      <Typography component={"h1"} variant="h2" marginTop={10}>
        Hangman
      </Typography>
      <Grid container spacing={2} marginTop={2} marginLeft={10}>
        <Grid item>
          <Grid container direction="column" spacing={2}>
            <Typography component={"span"}>
              Liczba nieudanych prób: {wrongGuesses}
            </Typography>
            <Box>
              {letters.map(({ value, isCorrect }, key) => (
                <span key={key}>{isCorrect ? `${value}` : " __ "}</span>
              ))}
            </Box>
            <Box>
              {Array.from({ length: 26 }, (_, i) => (
                <Grid item key={i}>
                  <Button
                    variant="contained"
                    onClick={() => userGuess(String.fromCharCode(65 + i))}
                  >
                    {String.fromCharCode(65 + i)}
                  </Button>
                </Grid>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Grid item>
          <HangmanSvg wrongGuesses={wrongGuesses} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hangman;
