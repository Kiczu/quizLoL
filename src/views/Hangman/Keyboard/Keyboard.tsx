import { Button, Grid } from "@mui/material";

const Keyboard = ({userGuess}: any) => {
    return (
        <Grid container spacing={1} justifyContent="center">
        {Array.from({ length: 26 }, (_, i) => (
          <Grid item key={i}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => userGuess(String.fromCharCode(65 + i))}
              sx={{
                minWidth: "40px",
                minHeight: "40px",
                fontSize: "1rem",
                textTransform: "none",
              }}
            >
              {String.fromCharCode(65 + i)}
            </Button>
          </Grid>
        ))}
      </Grid>
    )
}

export default Keyboard;