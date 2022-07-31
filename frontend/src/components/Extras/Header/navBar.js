import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useSelector, useDispatch } from "react-redux";
import { LogoutBrand, LogoutUser } from "../../../state/action-creators";
import { AiTwotoneFire } from 'react-icons/ai'
const ResponsiveAppBar = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Login.items);
  const brand = useSelector((state) => state.brandLogin.items);
  const [isAuthenticated, setAuthenticated] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [energy, setEnergy] = React.useState("0");
  useEffect(() => {
    if (user.length !== 0 || (brand.brand_obj && brand.brand_obj.length !== 0)) {
      setAuthenticated(true);
      const call = async (val) => {
        setEnergy(await fetchEnergy(val));
      }
      if (user.length !== 0 && user.customer)
        call(user.customer[3]);
      else if (brand.brand_obj && brand.brand_obj.length !== 0)
        call(brand.brand_obj[4]);
    }
  }, [user, brand]);
  const fetchEnergy = async (account_address) => {
    const res = await fetch('http://18.237.181.199:5000/getEnergy', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        'account_address': account_address,
      })
    })
    const data = await res.json();
    if (res.status !== 500) {
      return data.energy;
    }
    else
      console.log("Error")
  }
  const get = async () => {
    const data = await fetchEnergy(user.customer[3]);
    setEnergy(data)
    props.demote();
  }
  if (props.get === true && user.length !== 0 && user.customer) {
    get();
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="x2" sx={{ backgroundColor: "#fef6f0" }}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Poppins, sans-serif",
              fontSize: "32px",
              fontWeight: "800",
              color: "#000000",
            }}
          >
            SW
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link href="/Home" underline="none" color="black">
              <Button
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Home
              </Button>
            </Link>

            {isAuthenticated && user.length !== 0 ? <Link href="/Cart" underline="none" color="black">
              <Button
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Cart
              </Button>
            </Link> : null}
            {!isAuthenticated ? <Link href="/Vendor/Login" underline="none" color="black">
              <Button
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Brand Login
              </Button>
            </Link> : null}
          </Box>
          {isAuthenticated ?
            <>
              {energy !== '0' && energy < 0.5 ? <p style={{ color: 'red' }}>Energy is low. All functions might not be available.Refresh after few seconds to get energy.</p> : null}
              &nbsp;&nbsp;<p style={{ color: 'black' }}>{energy}</p>
              <AiTwotoneFire style={{ color: 'rgba(226,88,34,1)', height: '40px', width: '40px' }} />
            </> : null}
          {brand.brand_obj === undefined ? (
            <>
              {!isAuthenticated ? (
                <div>
                  <Button
                    href="/Login"
                    variant="contained"
                    sx={{
                      my: 1,
                      mx: 1.5,
                      ":hover": { backgroundColor: "#7c2e41" },
                      backgroundColor: "#7c2e41",
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    href="/Signup"
                    variant="outlined"
                    sx={{
                      my: 1,
                      mx: 1.5,
                      borderColor: "#7c2e41",
                      color: "#7c2e41",
                      ":hover": { borderColor: "#7c2e41" },
                    }}
                  >
                    SignUp
                  </Button>
                </div>
              ) : (
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/2.jpg"
                      />
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
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link href="/Dashboard" underline="none" color="black">
                        <Typography textAlign="center">Profile</Typography>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Link
                        href="/Home"
                        onClick={() => {
                          localStorage.removeItem("user");
                          dispatch(LogoutUser());
                        }}
                        underline="none"
                        color="black"
                      >
                        <Typography textAlign="center">Logout</Typography>
                      </Link>
                    </MenuItem>
                  </Menu>
                </Box>
              )}
            </>
          ) : (<>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/2.jpg"
                  />
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
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link href="/Vendor/Dashboard" underline="none" color="black">
                    <Typography textAlign="center">Profile</Typography>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link
                    href="/Home"
                    onClick={() => {
                      localStorage.removeItem("brand");
                      dispatch(LogoutBrand());
                    }}
                    underline="none"
                    color="black"
                  >
                    <Typography textAlign="center">Logout</Typography>
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          </>)}
          ;
        </Toolbar>
      </Container>
    </AppBar >
  );
};
export default ResponsiveAppBar;
