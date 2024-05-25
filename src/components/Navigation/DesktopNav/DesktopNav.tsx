import {
  Box,
  Button,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { paths } from "../../../paths";

interface DesktopNavProps {
  pages: {
    name: string;
    href: string;
  }[];
  handleCloseNavMenu: () => void;
}
const DesktopNav = ({ pages, handleCloseNavMenu }: DesktopNavProps) => {
  const defaultTheme = createTheme();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href={paths.HOME}
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        LOGO
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {pages.map((page) => (
          <Button
            key={page.name}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            <Link to={page.href}>{page.name}</Link>
          </Button>
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default DesktopNav;
