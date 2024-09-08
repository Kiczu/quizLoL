import { Box, Button, Typography } from "@mui/material";

interface Props {
  score: number;
  isWin: boolean;
}

const EndGame = ({ score, isWin }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {!isWin ? (
        <Typography component={"h1"}>Game Over</Typography>
      ) : (
        <>
          <Typography component={"h1"}>You win!</Typography>
          <Typography component={"p"}>
            We give you extra points for winning!
          </Typography>
        </>
      )}
      <Typography component={"p"}>Your score is: {score}</Typography>
      <Typography component={"p"}>
        You can check your total score
        <Button>here</Button>
      </Typography>
    </Box>
  );
};

export default EndGame;
