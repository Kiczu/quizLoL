import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Character } from "../../../api/types";

const ChampionList = ({ champions }: { champions: Character[] }) => {
  const championImage: React.CSSProperties = {
    width: "100%",
  };

  return (
    <Grid container spacing={{ xs: 6, sm: 3 }}>
      {champions.map((champion) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={champion.id}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              boxShadow: 5,
            }}
          >
            <img
              style={championImage}
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
              alt={champion.name}
              loading="lazy"
            />
            <CardContent style={{ flexGrow: 1 }}>
              <Typography variant="h5" component="div" paddingBottom={1}>
                {champion.name}
              </Typography>
              <Typography variant="body2">{champion.blurb}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ChampionList;
