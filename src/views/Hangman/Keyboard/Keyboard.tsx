import { Button, Grid } from "@mui/material";

const Keyboard = ({ userGuess }: any) => {
  return (
    <Grid container spacing={1} justifyContent="center">
      {Array.from({ length: 26 }, (_, i) => (
        <Grid item key={i}>
          <Button
            variant="outlined"
            onClick={() => userGuess(String.fromCharCode(65 + i))}
            sx={{
              color: "#F0E6D2",
              borderColor: "#C8AA6E",
              minWidth: "40px",
              minHeight: "40px",
              fontSize: "1rem",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#C8AA6E",
                borderColor: "#C8AA6E",
                color: "#32281E",
              },
            }}
          >
            {String.fromCharCode(65 + i)}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default Keyboard;
