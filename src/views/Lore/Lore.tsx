import { characterService } from "../../api/characterService";
import { useEffect, useState } from "react";
import { Character } from "../../api/types";

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
        {champions.map((champion) => (
          <div key={champion.id}>
            <img
              src={champion.image.full}
              alt={champion.name}
            />
            <h2>{champion.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lore;
