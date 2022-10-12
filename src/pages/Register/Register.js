import React, {useState} from 'react'
import { Grid, TextField, Typography, Button, Fade } from '@mui/material'
import { styled } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import agent from '../../store/agent'
import { register, SelectErrors } from '../../store/reducers/authReducer'

// styles
const MyGrid = styled(Grid)(({ theme }) => ({
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

function Register() {

  const error = useSelector(SelectErrors)
  const dispatch = useDispatch()

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  // for onchange input
  const handleChange = (e) => {
    setInputs(inputs => ({
      ...inputs,
      [e.target.name]: e.target.value
    }))
  }

  // for onclick button
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(register(agent.Auth.register(inputs.username, inputs.email, inputs.password)))
  }

  return (
    <MyGrid container>
      <MyForm>
        <Typography>
          ثبت نام
        </Typography>
        <TextField 
          autoComplete="chrome-off"
          name="username"
          placeholder="نام کاربری"
          type="text"
          fullWidth
          sx={{p: 1}}
          onChange={handleChange}
        />
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
          disabled={!inputs.username || !inputs.email || !inputs.password}
          onClick={handleSubmit}
        >
          ثبت نام
        </Button>
        <Fade in={!!error}>
          <Typography color="secodary">
            {error? (
              <>
              {error.email? <>ایمیل موجود است</> : null}
              {error.username? <>نام کاربری موجود است</> : null}
              </>
            ) : (
              <></>
            )}
          </Typography>
        </Fade>
      </MyForm>
    </MyGrid>
  )
}

export default Register