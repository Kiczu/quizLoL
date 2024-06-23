import { useEffect, useState } from "react";
import { characterService } from "../../api/characterService";
import { Character } from "../../api/types";

export const useLoreData = () => {
  const [champions, setChampions] = useState<Character[]>([]);
  const [search, setSearch] = useState("");

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

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const filterChampions = (champions: Character[]) => {
    return champions.filter((champion) =>
      champion.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  const visibleChampions = filterChampions(champions);

  return {
    champions: visibleChampions,
    search,
    handleSearchChange,
  };
};