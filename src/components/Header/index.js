import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { clearSession } from "../../utils/cookies";
import NHUISLogo from "../../../src/assets/images/NHUIS-Logo.gif";
import { CookieNames, getCookieItem } from "../../utils/cookies";
import { Menu, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import JwtTokenHandler from "../jwtTokenHandler/JwtTokenHandler";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function Header() {
  console.log('Header')
  // let userDetails = null;
  // if (getCookieItem(CookieNames.USER)) {
  //   userDetails = JSON.parse(getCookieItem(CookieNames.USER));
  // }
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    clearSession();
    window.close();
  };

  return (
    <>
      <Box
        boxSizing="border-box"
        height={{ xs: "45px" }}
        sx={{
          backgroundColor: "#183084",
          position: "fixed",
          zIndex: "999",
          top: 0,
        }}
        width="100%"
        alignItems="center"
      >
        <Stack direction="row" justifyContent={"space-between"} alignItems={'center'} height={'inherit'}>
          <Stack
            direction="row"
            marginLeft={2}
            spacing={3}
            alignItems="center"
            height="100%"
          >
            {/* <img src={NHUISLogo} height="45px" alt="logo"/> */}
            <Stack>
              <Typography color="white" fontSize={24}>
              RESEA
              </Typography>
            </Stack>
          </Stack>
          {/* {userDetails && ( */}
            <IconButton
              color="inherit"
              onClick={handleOpenMenu}
              style={{ padding: "0" }}
            >
              <Avatar
                // {...stringAvatar(userDetails?.userName)}
                style={{
                  width: "28px",
                  height: "28px",
                  fontSize: "0.8rem",
                  margin: "0 10px",
                }}
              />
            </IconButton>
          {/* )} */}
        </Stack>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <JwtTokenHandler onLogout={handleLogout} />
    </>
  );
}
