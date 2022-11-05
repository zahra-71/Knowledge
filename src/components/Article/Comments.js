import { Card, CardContent, Typography,
  CardActions, Link, Divider } from '@mui/material'
import { useNavigate } from 'react-router'
import { styled } from '@mui/system'

const MyCard = styled(Card)(({theme}) => ({
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

const Comments = ({comment}) => {

  const navigate = useNavigate()
  // console.log(comment)

  return(
    <MyCard>
      <CardContent sx={{direction: "ltr"}}>
        <Typography>
          {comment.body}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions sx={{backgroundColor: "#EAEAEA"}}>
        <Link
          underline="hover"
          sx={{cursor: "pointer"}}
          onClick={() => navigate(`/@${comment.author.username}`)}
        >
          <img src={comment.author.image} alt={comment.author.username} style={{marginLeft: 4,  borderRadius: 10}}/>
          
          {comment.author.username}
        </Link>
        <Typography 
        sx={{
          color:"text.disabled",
          fontSize: "0.8rem",
          mt: 2.2,
          mr: 3
        }}
        >
            {new Date(comment.createdAt).toDateString()}
        </Typography>

      </CardActions>


    </MyCard>
  )
}
export default Comments;