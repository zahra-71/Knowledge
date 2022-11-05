import { Card, CardHeader, Typography,
  Link, CardContent, CardActions } from "@mui/material";
import { useNavigate } from "react-router";


const ArticleContent = ({article}) => {

  const navigate = useNavigate()

  // console.log(article)
  return(
    <>
      {article && 
        <Card sx={{ m: 2}}>
          <CardHeader
            sx={{ bgcolor: "#3C4048", color: "white", display: "flex"}} 
            title={
              <Typography variant="h5" sx={{direction: "ltr", fontWeight: "bold", p: 2}}>
                {article.article.title}
              </Typography>
            }
            subheader={
              <>
              <Link
                underline="hover"
                sx={{cursor: "pointer", display: "column"}}
                color="white"
                onClick={() => navigate(`/@${article.article.author.username}`)}
              >
                <img src={article.article.author.image} alt={article.article.author.username} 
                  style={{marginLeft: 4,  borderRadius: 10}}
                />
                {article.article.author.username} 
              </Link>
              <Typography sx={{fontSize: "0.8rem", color: "text.disabled"}}>
                {new Date(article.article.createdAt).toDateString()}
              </Typography>
              </>
            }
          />
          <CardContent sx={{direction: "ltr", p: 5, textAlign:"justify"}}>
            <Typography>
              {article.article.body}
            </Typography>
          </CardContent>
          <CardActions>
            {article.article.tagList &&
              article.article.tagList.map((tag, index) => {
                return(
                  <Link
                  underline="none"
                    key={index}
                    sx={{
                      fontSize: "0.7rem",
                      border: 1,
                      barderColor: "text.disabled",
                      borderRadius: 5,
                      padding: 0.5,
                      margin: 0.2,
                      color: "gray",
                    }}
                  >
                    {tag}
                  </Link>
                )
              })
            }
          </CardActions>
        </Card>
      }
    </>
  )
}
export default ArticleContent;