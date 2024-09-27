import { ImageList, ImageListItem } from "@mui/material";
import minion from "../../../assets/images/minion.webp";
import ImpactGif from "../../../assets/animations/impact.gif";
import { ImpactAnimation, MinionImg } from "../hangmanStyles";

type Props = {
  maxAttempts: number;
  wrongGuesses: number;
};

const Lives = ({ maxAttempts, wrongGuesses }: Props) => {
  return (
    <ImageList cols={3} gap={16}>
      {Array.from({ length: maxAttempts }, (_, i) => (
        <ImageListItem
          key={minion}
          sx={{
            position: "relative",
          }}
        >
          <MinionImg
            className="MuiImageListItem-img"
            isActive={wrongGuesses > i}
            src={minion}
            alt=""
            key={i}
          />
          {wrongGuesses > i && (
            <ImpactAnimation
              className="MuiImageListItem-img"
              src={ImpactGif}
              alt=""
            />
          )}
        </ImageListItem>
      ))}
    </ImageList>
  );
};
export default Lives;
