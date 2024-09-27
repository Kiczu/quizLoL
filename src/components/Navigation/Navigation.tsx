import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import MobileNav from "./MobileNav/MobileNav";
import DesktopNav from "./DesktopNav/DesktopNav";
import { useAuth } from "../../context/LoginContext/LoginContext";
import { paths } from "../../paths";

const pages = [
  {
    name: "Quiz",
    href: paths.HOME,
  },
  {
    name: "Home",
    href: paths.HOME,
  },
  {
    name: "Ranking",
    href: paths.HOME,
  },
  {
    name: "Lore",
    href: paths.LORE,
  },
];

const settings = [
  {
    name: "Profile",
    href: paths.PROFILE,
  },
  {
    name: "Dashboard",
    href: paths.DASHBOARD,
  },
];

const settingsNotLoggedIn = [
  {
    name: "Login",
    href: paths.LOGIN,
  },
  {
    name: "Register",
    href: paths.REGISTER,
  },
];

const Navigation = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const { userData, handleSignOut } = useAuth();

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorElUser(e.currentTarget);

  const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorElNav(e.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleCloseUserMenu = () => setAnchorElUser(null);

  const visibleSetting = userData ? settings : settingsNotLoggedIn;

  return (
    <AppBar className="app-bar" sx={{ backgroundColor: "#0A1428" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MobileNav
            pages={pages}
            handleCloseNavMenu={handleCloseNavMenu}
            handleCloseUserMenu={handleCloseUserMenu}
            handleOpenNavMenu={handleOpenNavMenu}
            anchorElNav={anchorElNav}
          />
          <DesktopNav pages={pages} handleCloseNavMenu={handleCloseNavMenu} />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {visibleSetting.map((setting) => (
                <Link to={setting.href} key={setting.name}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                </Link>
              ))}

              {userData && (
                <MenuItem onClick={handleSignOut}>
                  <Typography textAlign="center">Wyloguj się</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navigation;
