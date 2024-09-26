import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";

const shadowWave = keyframes`
0% {
      background-position: 0;
  }
  50% {
      background-position: 400%;
  }
  100% {
      background-position: 0;
  }
`;

export const WavingButton = styled(Button)({
    position: "relative",
    color: "#F0E6D2",
    fontSize: "1.2rem",
    letterSpacing: "4px",
    textTransform: "uppercase",
    fontWeight: "bold",
    background: "#0A1428",
    border: "2px solid #0AC8B9",
    margin: "0 auto",
    padding: "15px 50px",
    transition: "box-shadow 2s",
    "&:before": {
        content: '""',
        position: "absolute",
        background: "#0A1428",
        width: "100%",
        height: "100%",
        zIndex: "-1",
        borderRadius: "4px",
    },
    "&:after": {
        content: '""',
        position: "absolute",
        left: "-2px",
        top: "-2px",
        background:
            "linear-gradient(45deg, #0AC8B9, #005A82, #0AC8B9,#005A82, #0AC8B9, #005A82, #0AC8B9, #005A82,#0AC8B9, #005A82)",
        backgroundSize: "400%",
        width: "calc(100% + 4px)",
        height: "calc(100% + 4px)",
        zIndex: "-2",
        filter: "blur(10px)",
        animation: `${shadowWave} 40s linear infinite`,
    },
    "&:hover": {
        transform: "scale(1)",
    },
});