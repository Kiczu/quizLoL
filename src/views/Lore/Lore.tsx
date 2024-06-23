import { Box, Typography } from "@mui/material";
import ChampionList from "./ChampionList/ChampionList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useLoreData } from "./useLoreData";

const Lore = () => {
  const { champions, search, handleSearchChange } = useLoreData();

  return (
    <Box  sx={{ m: {xs: 4, sm: 5, md: 5, lg: 10 } }}>
      <Typography variant="h4" component="h1">LORE</Typography>
        <SearchBar
          initSearch={search}
          handleSearchChange={handleSearchChange}
          delay={500}
        />
        <ChampionList champions={champions} />
    </Box>
  );
};

export default Lore;