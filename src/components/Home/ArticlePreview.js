import React, { useEffect, useState } from "react"
import { Typography, Link, Paper, CardHeader, CardContent, Divider,
  CardActions, Button } from "@mui/material"
import { Favorite } from '@mui/icons-material'
import { styled } from "@mui/system"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"

// component
import agent from "../../store/agent"
import { favoriteArticle } from "../../store/reducers/articlesListReducer"

// styles
const MyButton = styled( Button ) (({ theme }) => ({
  marginRight: "auto",
  '&: hover': {
    backgroundColor: theme.palette.primary.main,
    color: "white"
  }
}))

const MyPaper = styled( Paper) (({ theme }) => ({
  marginBottom: 10,
  [theme.breakpoints.down("md")]: {
    width: "auto"
  }
}))
  
const ArticlePreview = ({article}) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [favorited, setFavorited] = useState(article.favorited)
  let [count, setCount] = useState(article.favoritesCount)
  

  // update of count and state of favorite button
  useEffect(() => {
    setCount(article.favoritesCount)
    setFavorited(article.favorited)
  }, [article.favoritesCount, article.favorited])

  // change count of favorite button
  const handleCountFavorite = async(e) => {
    e.preventDefault()

    if (favorited){
      // console.log("unlike")
      dispatch(favoriteArticle(await agent.Articles.unfavorite(article.slug)))
      setCount(count - 1)
      setFavorited(!favorited) 
    } else {
      // console.log("like")
      dispatch(favoriteArticle(await agent.Articles.favorite(article.slug)))
      setCount(count + 1)
      setFavorited(!favorited)
    }
  }

  return (
    <MyPaper>
      <CardHeader 
        title={
          <Link underline="hover"
          sx={{cursor: "pointer"}}
          onClick={() => navigate(`/@${article.author.username}`)}
          >
            <img src={article.author.image} alt={article.author.username} 
            style={{marginLeft: "4px", borderRadius: 10, width:25}}
            />
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
      <Link 
        underline="none"
        color="text"
        sx={{cursor:"pointer"}}
        onClick={() => navigate(`/article/${article.slug}`)}
      >
        <Typography variant="h6" sx={{fontWeight: 'bold', direction:"ltr"}}>{article.title}</Typography>
        <Typography variant="body2" color="text.disabled" sx={{direction: "ltr"}}>
          {article.description}
        </Typography>
        <Typography variant="subtitle2" color="text.disabled" size="small">مطالعه بیشتر...</Typography>
      </Link>
    </CardContent>
    <CardActions  disableSpacing>
      { article.tagList &&
        article.tagList.map((tag, index) => {
          return(
            <Link
              key={index}
              onClick={() => navigate(`/article/${article.slug}`)}
              sx={{ fontSize: "0.7rem",
                backgroundColor: "gray",
                borderRadius: 5,
                padding: 0.5,
                margin: 0.2,
                color: "white",
                '&:hover' : {
                  opacity: [0.9, 0.8, 0.7]
                },
              }}
            >
              {tag}
            </Link>
          ) 
      })}
      <MyButton aria-label="add to favorites"
        variant="outlined"
        onClick={handleCountFavorite}
        sx={{
          bgcolor: favorited? "#1976d2" : "white",
          color: favorited? "white" : "#1976d2"
        }}
      >
        {count}
        <Favorite />
      </MyButton>
    </CardActions>
    <Divider />
  </MyPaper>
  )
}

export default ArticlePreview