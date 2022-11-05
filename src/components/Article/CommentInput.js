import { TextField, Box, Card, CardContent, CardActions, Button } from '@mui/material'
import React, {useState} from 'react'
import { styled } from '@mui/system'

const MyBox = styled(Card)(({theme}) => ({
  marginRight: theme.spacing(25),
  marginLeft: theme.spacing(25),
  marginTop: theme.spacing(5),
  "&.MuiCard-root": {
    border: "1px solid #bdbdbd" , 
  },
  [theme.breakpoints.down("md")]: {
    marginRight: theme.spacing(10),
    marginLeft:  theme.spacing(10),
  },
}))

const CommentInput = () => {

  const [comment, setComment] = useState({
    body: ""
  })

  const handleChange = (e) => {
    setComment({body: e.target.value})
    // console.log(comment)
  }
const handleClick = (e) => {
  console.log(comment)
}

  return (
    <MyBox>
      <CardContent>
        <TextField placeholder="نظر بگذارید..."
          fullWidth
          onChange={handleChange}
          maxRows="4"
          multiline={true}
         sx={{
          "& fieldset": { border: 'none' },
          // "&.MuiTextField-root":{ 
          //   '&: hover fieldset': {
          //     borderColor: "#bdbdbd",
          //   },
          // },
          // "& .MuiOutlinedInput-root.Mui-focused": {
          //   "& > fieldset": {
          //     borderColor: "#bdbdbd"
          //   }
          // }
         }}
        />
      </CardContent>
      <CardActions sx={{backgroundColor: "#EAEAEA"}}>
        <Button variant="outlined" onClick={handleClick}>
          ثبت نظر
        </Button>
      </CardActions>
    </MyBox>
  )
}

export default CommentInput