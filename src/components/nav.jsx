import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Fade,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";
import themeContext from "../themes";
const Nav = () => {
  const theme = useContext(themeContext);
  const style = {
    textDecoration: "none",
    color: theme.color,
    textShadow: ` 0 0 3px ${theme.shadow}, 0 0 3px ${theme.shadow}`,
  };

  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#041c2a" }}>
      <Toolbar>
        <ul
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          <li>
            <NavLink
              exact
              to="/"
              style={style}
              activeStyle={{
                color: theme.borderColor,
                textShadow: ` 0 0 3px ${theme.borderColor}, 0 0 3px ${theme.borderColor}`,
              }}
            >
              <IconButton sx={{ color: "inherit" }} size="large">
                <HomeIcon
                  sx={{
                    color: "inherit",
                    filter: `drop-shadow(0 0 3px ${theme.shadow})`,
                    fontSize: 26,
                    boxSizing: "content-box",
                    p: "4px",
                  }}
                />
              </IconButton>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transform-to-signLanguage"
              activeStyle={{
                color: theme.borderColor,
                textShadow: ` 0 0 3px ${theme.borderColor}, 0 0 3px ${theme.borderColor}`,
              }}
              style={style}
            >
              <Button
                style={{
                  color: "inherit",
                  textShadow: ` 0 0 3px ${theme.shadow}, 0 0 3px ${theme.shadow}`,
                }}
              >
                <Typography variant="button">
                  التحويل إلى لغة الإشارة
                </Typography>
              </Button>
            </NavLink>
          </li>

          <li>
            <Button
              sx={{
                color: theme.color,
                textShadow: ` 0 0 3px ${theme.shadow}, 0 0 3px ${theme.shadow}`,
              }}
              color="inherit"
              aria-controls="fade-menu"
              aria-haspopup="true"
              aria-expanded={open1 ? "true" : undefined}
              onClick={handleClick1}
            >
              التحويل من
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl1}
              open={open1}
              onClose={handleClose1}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose1}>
                <NavLink
                  to="/file-to-text"
                  activeStyle={{
                    color: theme.borderColor,
                    textShadow: ` 0 0 3px ${theme.borderColor}, 0 0 3px ${theme.borderColor}`,
                  }}
                  style={style}
                >
                  <Typography variant="button"> ملف إلى نص</Typography>
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose1}>
                <NavLink
                  to="/image-to-text"
                  activeStyle={{
                    color: theme.borderColor,
                    textShadow: ` 0 0 3px ${theme.borderColor}, 0 0 3px ${theme.borderColor}`,
                  }}
                  style={style}
                >
                  <Typography variant="button">صورة إلى نص </Typography>
                </NavLink>
              </MenuItem>
            </Menu>
          </li>
        </ul>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, direction: "ltr" }}
        >
          
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
