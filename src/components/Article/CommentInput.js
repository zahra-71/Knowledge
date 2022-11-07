import { TextField, Card, CardContent, CardActions, Button } from '@mui/material'
import React, {useState} from 'react'
import { styled } from '@mui/system'
import { useDispatch } from 'react-redux'

// componenet
import agent from '../../store/agent'
import { addNewComment } from '../../store/reducers/articleReducer'

// styles
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

const CommentInput = ({slug}) => {

  const dispatch = useDispatch()
  const [comment, setComment] = useState({
    body: ""
  })

  // for onchange input
  const onChange = (e) => {
    setComment({body: e.target.value})
  }

  // for add comment button
  const handleAddComment = async(e) => {
    dispatch(addNewComment(await agent.Comments.create(slug, comment.body)))
    setComment({
      body: ""
    })
  }

  return (
    <MyBox>
      <CardContent>
        <TextField placeholder="نظر بگذارید..."
          fullWidth
          onChange={onChange}
          maxRows="4"
          multiline={true}
          value={comment.body}
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
        <Button variant="outlined" onClick={handleAddComment}>
          ثبت نظر
        </Button>
      </CardActions>
    </MyBox>
  )
}

export default CommentInput