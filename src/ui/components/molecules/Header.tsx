import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { NotAuthenticatedUser, UnregisteredUser, User } from "domain/user";
import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { getMaybeCurrentUser } from "usecase/auth";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "../atoms/Link";
import { AccountCircle } from "@mui/icons-material";
import { useRouter } from "next/router";

const Header: NextPage = () => {
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onClickTask = () => {
    handleMenuClose()
    router.push('/tasks')
  }
  const onClickProfile = () => {
    handleMenuClose()
    router.push('/profile')
  }
  const onClickProfileEdit = () => {
    handleMenuClose()
    router.push('/profile/edit')
  }
  const onClickLogout = () => {
    // TODO: logout
    console.log("logout")
    handleMenuClose()
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={onClickProfile}>Profile</MenuItem>
      <MenuItem onClick={onClickProfileEdit}>Profile Edit</MenuItem>
      <MenuItem onClick={onClickLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <Box >
        <AppBar position="static">
          <Toolbar>
            <MenuIcon sx={{ marginRight: 4 }}></MenuIcon>
            <Typography component="div" variant="h6">Simple Task App</Typography>
            <Box sx={{ flexGrow: 1 }} />

            <Box>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <AccountCircle></AccountCircle>
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </Box>
    </>
  );
};

export default Header;
