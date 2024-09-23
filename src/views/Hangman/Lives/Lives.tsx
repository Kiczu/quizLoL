import { ImageList, ImageListItem } from "@mui/material";

import minion from "../../../assets/images/minion.webp";
import ImpactGif from "../../../assets/animations/impact.gif";

const Lives = ({
  maxAttempts,
  wrongGuesses,
}: {
  maxAttempts: number;
  wrongGuesses: number;
}) => {
  return (
    <ImageList cols={3} gap={16}>
      {Array.from({ length: maxAttempts }, (_, i) => (
        <ImageListItem
          key={minion}
          sx={{
            position: "relative",
          }}
        >
          <img
            src={minion}
            alt=""
            key={i}
            style={{
              opacity: wrongGuesses > i ? 0.5 : 1,
              filter: wrongGuesses > i ? "grayscale(100%)" : "grayscale(0%)",
              zIndex: 1,
            }}
          />
          {wrongGuesses > i && (
            <img
              src={ImpactGif}
              alt=""
              style={{
                position: "absolute",
                bottom: 0,
                animation: "impact 1s ease-in-out forwards",
                zIndex: 0,
              }}
            />
          )}
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default Lives;
