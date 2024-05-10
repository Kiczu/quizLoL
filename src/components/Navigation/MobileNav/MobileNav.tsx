import {
  Box,
  createTheme,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

const defaultTheme = createTheme();

interface MobileNavProps {
  pages: {
    name: string;
    href: string;
  }[];
  handleCloseNavMenu: () => void;
  setAnchorElNav: (element: null | HTMLElement) => void;
  handleCloseUserMenu: () => void;
  anchorElNav: null | HTMLElement;
}

const MobileNav = ({
  pages,
  handleCloseNavMenu,
  anchorElNav,
  setAnchorElNav,
  handleCloseUserMenu,
}: MobileNavProps) => {
  const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(e.currentTarget);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <GiHamburgerMenu />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page) => (
            <Link to={page.href} key={page.name}>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">{page.name}</Typography>
              </MenuItem>
            </Link>
          ))}
        </Menu>
      </Box>
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="#app-bar-with-responsive-menu"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        LOGO
      </Typography>
    </ThemeProvider>
  );
};

export default MobileNav;
