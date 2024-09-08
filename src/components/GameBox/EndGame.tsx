import { Box, Button, Typography } from "@mui/material";

interface Props {
  score: number;
}

const EndGame = ({ score }: Props) => {
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
      <Typography component={"h1"}>Game Over</Typography>
      <Typography component={"p"}>Your score is: {score}</Typography>
      <Typography component={"p"}>
        You can check your total score
        <Button>here</Button>
      </Typography>
    </Box>
  );
};

export default EndGame;
