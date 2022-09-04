import { TextField, Grid, Button, Typography, Fade } from '@mui/material'
import { styled } from '@mui/system'
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

// components
import { login, loginUnloaded } from '../../store/reducers/authReducer'
import agent from '../../store/agent'
import { SelectErrors } from '../../store/reducers/authReducer'

// styles
const MyGrid = styled(Grid)(({theme}) => ({
  direction: "rtl",
  width: "95%",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  position: "absolute",
  marginTop: "100px",
  top: 0,
  left: 0,
}))

const MyForm = styled('div')(({theme}) => ({
  width: "40%",
  height: "95%",
  marginTop: "250px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  [theme.breakpoints.down("md")]: {
    width: "50%",
  },
}))

// function
function Login() {

  const error = useSelector(SelectErrors)
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setInputs(inputs => ({
      ...inputs,
      [e.target.name]: e.target.value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(agent.Auth.login(inputs.email, inputs.password)))
  }

  useEffect(() => {
    return() => {
      dispatch(loginUnloaded())
    }
  },[dispatch])

  return (
    <MyGrid container>
      <MyForm>
      <Typography variant="h5">
        ورود
      </Typography>
      <TextField 
        name="email"
        placeholder="ایمیل"
        type="email"
        fullWidth
        sx={{p: 1}}
        onChange={handleChange}
      />
      <TextField 
        autoComplete="chrome-off"
        name="password"
        placeholder="رمز عبور"
        type="password"
        fullWidth
        sx={{p: 1}}
        onChange={handleChange}
      />
    <Button
      variant="contained"
      size="large"
      onClick={handleSubmit}
      disabled={!inputs.email || !inputs.password}
    >
      ورود
    </Button>
      <Fade in={!!error}>
        <Typography color="secodary">
        {error? (
          <>
        {error}
          </>
        ):(
          <></>
        )}
        </Typography>
      </Fade>
    </MyForm>
      
    </MyGrid>
  )
}

export default Login