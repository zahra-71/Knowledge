import { InputBase, Typography, Button, Box, Fade } from '@mui/material'
import { styled } from '@mui/system'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// componenets
import { userLoaded, selectUser, userUpdatedLoaded, selectuserUpdatedText,
  userUpdatedUnloaded, 
  selectUserError} from '../../store/reducers/settingsReducer'
import agent from '../../store/agent'

// styles
const MyBox = styled(Box)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  marginTop: theme.spacing(2),
}))

const MyForm = styled('div')(({ theme }) => ({
  width: "60%",
  height: "95%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
}))

const MyTextField = styled(InputBase)(({ theme }) => ({
  padding: theme.spacing(1.5),
  margin: theme.spacing(1.5),
  borderRadius: theme.spacing(1.5),
  border:  "1px solid #bdbdbd",
  "&.Mui-focused":{
    border:  "1.5px solid #1976d2",
    // borderColor: theme.palette.primary,
  },
}))

const MyButton = styled(Button)(({ theme }) => ({
  width: 100,
  [theme.breakpoints.down("md")]: {
    width: 50
  }
}))

function Settings() {

  const dispatch = useDispatch()
  const [inputSettings, setInputSettings] = useState(inputSettings => ({
    ...inputSettings,
    image: '',
    username: '',
    bio: '',
    email: '',
    password: ''
  }))
  const user = useSelector(selectUser)
  const text = useSelector(selectuserUpdatedText)
  const error = useSelector(selectUserError)

  // for get detail of profile
  useEffect(() => {
    dispatch(userLoaded(agent.Auth.current()))
    return () => {
      dispatch(userUpdatedUnloaded())
    }
      
  },[])

  // for set initial value in const
  useEffect(() => {
    setInputSettings(inputSettings => ({
      ...inputSettings,
      image: user ? user.image : "",
      username: user ? user.username : "",
      bio: user ? user.bio : "",
      email: user ? user.email : "",
    }))
  },[user])

  const handleChange = (e) => {
    setInputSettings(inputSettings => ({
      ...inputSettings,
      [e.target.name]: e.target.value
    }))
  }

  const handleSendSettings = async() => {
    console.log(inputSettings)
    if(inputSettings.password === ""){
      delete inputSettings.password
      console.log(inputSettings)
    }
    dispatch(userUpdatedLoaded(await agent.Auth.update(inputSettings)))
  }

  return (
    <>
      <MyBox component="form">
        <MyForm>
          <Typography sx={{mt: 1}}>تنظیمات شما</Typography>
          <MyTextField 
            fullWidth
            placeholder="آدرس عکس پروفایل"
            name="image"
            value={inputSettings.image}
            onChange={handleChange}
          />
          <MyTextField 
            fullWidth
            placeholder="نام کاربری"
            name="username"
            value={inputSettings.username}
            onChange={handleChange}
          />
          <MyTextField 
            fullWidth
            placeholder="بیوگرافی مختصر درباره‌ی شما"
            name="bio"
            multiline={true}
            inputProps={{
              style: {
                height: 200,
              }
            }}
            value={inputSettings.bio}
            onChange={handleChange}
          />
          <MyTextField 
            fullWidth
            placeholder="ایمیل"
            name="email"
            value={inputSettings.email}
            onChange={handleChange}
          />
          <MyTextField 
            fullWidth
            placeholder="رمز عبور"
            name="password"
            onChange={handleChange}
          />
        </MyForm>
      </MyBox>
      <Box
        display="flex"
        justifyContent="flex-start"
        sx={{
          mr:"20%",
        }}
      >
        <MyButton
          variant="contained"
          onClick={handleSendSettings}
        >
          ارسال
        </MyButton>
      </Box>
      <Box>
        <Fade in={!!text}>
           <Typography sx={{mr:"20%"}} >
             {text? (
               <>
                {text}
               </>
             ) : (
               <></>
             )}

           </Typography>
        </Fade>
        <Fade in={!!error}>
           <Typography sx={{mr:"20%"}} >
             {error? (
               <>
                {error}
               </>
             ) : (
               <></>
             )}

           </Typography>
        </Fade>
      </Box>
    </>
  )
}

export default Settings