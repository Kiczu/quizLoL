import { characterService } from "../../api/characterService";
import { useEffect, useState } from "react";
import { Character } from "../../api/types";
import { Grid, Card } from "@mui/material";

const Lore = () => {
  const [champions, setChampions] = useState<Character[]>([]);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const data = await characterService.getAll();
        setChampions(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchChampions();
  }, []);

  return (
    <div style={{ padding: "100px 20px" }}>
      <h1>LORE</h1>
      <div>
        <Grid container spacing={2}>
          {champions.map((champion) => (
            <Grid item xs={12} md={3} key={champion.id}>
              <Card className="card">
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`}
                  alt={champion.name}
                  loading="lazy"
                />
                <h2>{champion.name}</h2>
                <p>{champion.blurb}</p>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Lore;
