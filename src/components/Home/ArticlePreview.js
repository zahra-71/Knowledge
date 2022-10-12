import { Typography, Link, Paper, CardHeader, CardContent, Divider,
  CardActions, Button } from "@mui/material"
import { Favorite } from '@mui/icons-material'
import { styled } from "@mui/system"

// component
import agent from "../../store/agent"

const MyButton = styled( Button ) (({ theme }) => ({

  marginRight: "auto",
  '&: hover': {
    backgroundColor: theme.palette.primary.main,
    color: "white"
  }
}))

const MyPaper = styled( Paper) (({ theme }) => ({
  margin: 5,
  [theme.breakpoints.down("md")]: {
    width: "auto"
  }
}))
  
const ArticlePreview = ({article}) => {

// console.log("articlePreviwe", article)

  const favorite = article.favorited? true: false

  const handleClick = () => {
    if(article.favorited){
      console.log("unlike")
      agent.Articles.unfavorite(article.slug)
    } else {
      console.log("like")
      agent.Articles.favorite(article.slug)
    }
  }

  return (
    <MyPaper >
      <CardHeader 
        title={
          <Link underline="hover"
          // href={`/@${article.author.username}`}
          >
            <img src={article.author.image} alt={article.author.username} style={{marginLeft: "4px", borderRadius: 10}}/>
            {article.author.username}
          </Link>
        }
        subheader={
      <Typography 
        sx={{color: "text.disabled",
          fontSize: "0.8rem"
        }}
      >
        {new Date(article.createdAt).toDateString()}
      </Typography>}
      sx={{ color: "#1976d2" }}
    />
    <CardContent>
      <Typography variant="h6" sx={{fontWeight: 'bold', direction:"ltr"}}>{article.slug.substring(0,200)}</Typography>
      <Typography variant="body2" color="text.disabled">
        {article.description}
      </Typography>
    </CardContent>
    <CardActions  disableSpacing>
      <MyButton aria-label="add to favorites"
        variant="outlined"
        onClick={handleClick}
        sx={{
          bgcolor: favorite? "#1976d2" : "white",
          color: favorite? "white" : "#1976d2"
        }}
      >
        {article.favoritesCount}
        <Favorite />
      </MyButton>
    </CardActions>
    <Divider />
  </MyPaper>

  )
}

export default ArticlePreview