import { AppBar, Button, Toolbar, Typography, Box, IconButton,
    Menu } from '@mui/material'
import { styled } from '@mui/system'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

// components
import { logOut } from '../../store/reducers/commonReducer'
import { SelectCurrentUser } from '../../store/reducers/commonReducer'

// styles
const MyBox = styled(Box)(({ theme }) => ({
    marginLeft: theme.spacing(5),
}))

const MyMenu = styled(Menu)(({ theme }) => ({
    '& .MuiMenu-paper': {
             width: "150px",
             maxWidth: "100%",
             padding: "10px"
             
         }
}))

const LoggedOutView = () => {

    const navigation = useNavigate();

        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" 
                elevation={0}
                sx={{
                    bgcolor:"inherit",
                    color: "black"
                }}
                >
                    <Toolbar>
                        <Typography sx={{ flexGrow: 1, mr: 3 }}>
                            دانش
                        </Typography>
                        <MyBox>
                            <Button color="inherit" onClick={() => navigation("/")}> خانه </Button>
                            <Button color="inherit" onClick={() => navigation("/login")}> ورود </Button>
                            <Button color="inherit" onClick={() => navigation("/register")}> ثبت نام </Button>
                        </MyBox>
                    </Toolbar>
                </AppBar>
            </Box>
        );
}

const LoggedInView = () => {

    const [settingsMenu, setSettingsMenu] = useState(null)
    const selectUser = useSelector(SelectCurrentUser)
    const navigation = useNavigate();
    const dispatch = useDispatch()

    const handleLogOut = () => {
        console.log("خروج")
        dispatch(logOut())
    }

        return (
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                  <Toolbar>
                    {/* <Button color="inherit" onClick={() => navigation("/register")}> {user.toLocaleLowerCase()} </Button> */}
                    <Typography sx={{ flexGrow: 1, mr: 3 }}>
                    {selectUser}
                    </Typography>
                    <MyBox>
                        <Button color="inherit" onClick={() => navigation("/")}> خانه </Button>
                        <Button color="inherit" onClick={() => navigation("/#")}> پست جدید </Button>
                        <Button color="inherit" onClick={() => navigation("/#")}> تنظیمات  </Button>
                        <IconButton 
                            color="inherit"
                            aria-haspopup="true"
                            aria-controls="settings-menu"
                            onClick={e => setSettingsMenu(e.currentTarget)}
                        
                        >
                            <SettingsOutlinedIcon />
                        </IconButton>
                    </MyBox>
                    <MyMenu
                        id="settings-menu"
                        open={Boolean(settingsMenu)}
                        onClose={() => setSettingsMenu(null)}
                        anchorEl={settingsMenu}
                    >
                        <div>
                            <Typography
                                onClick={handleLogOut}
                                sx={{
                                   '&:hover': {
                                       color: "blue"
                                   }
                                }}
                                variant="button"
                            >
                                {/* <LogoutOutlinedIcon /> */}
                                خروج
                            </Typography>
                        </div>

                    </MyMenu>
                  </Toolbar>
              </AppBar>
          </Box>
        );
}

function Header() {

    const selectUser = useSelector(SelectCurrentUser)
    // const user = getUser()
    // console.log("header")

  return (
      <>
      {selectUser ? (
        <LoggedInView />
      ) : (
        <LoggedOutView />
      )}
     </> 
    
  )
}

export default Header