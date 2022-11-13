import { Card, CardHeader, Typography,
  Link, CardContent, CardActions, Button,
  Grid } from "@mui/material";
import { useNavigate } from "react-router";
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";


// components
import agent from "../../store/agent"
import { deleteArticle } from "../../store/reducers/articleReducer"

// styles
const MyButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
	"&.MuiButton-contained" : {
    color: "#3C4048",
    backgroundColor: 'white',
  }
}))

const ArticleContent = ({article, currentUser}) => {
 
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // handle click for delete article
  const handleDeleteArticle = async() => {
    // console.log(article.article.slug)
    await agent.Articles.del(article.article.slug)
    dispatch(deleteArticle(await article.article.slug))
    navigate("/")
  }

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
              <Grid container >
                <Grid item sx={{flexGrow: 1}}>
                  <Link
                    underline="hover"
                    sx={{cursor: "pointer", display: "column"}}
                    color="white"
                    onClick={() => navigate(`/@${article.article.author.username}`)}
                  >
                    <img src={article.article.author.image} alt={article.article.author.username} 
                      style={{marginLeft: 4,  borderRadius: 10, width: 30}}
                    />
                    {article.article.author.username} 
                  </Link>
                  <Typography sx={{fontSize: "0.8rem", color: "text.disabled"}}>
                    {new Date(article.article.createdAt).toDateString()}
                  </Typography>
                </Grid>
                {currentUser && 
                  currentUser === article.article.author.username? (
                    <Grid item>
                      <MyButton variant="contained" size="small">
                        ویرایش مقاله
                        <ModeEditOutlineTwoToneIcon fontSize="small"/>
                      </MyButton>
                      <MyButton variant="contained" size="small"
                        onClick={handleDeleteArticle}
                      >
                        حذف مقاله
                        <DeleteOutlinedIcon fontSize="small"/>
                      </MyButton>
                    </Grid>
                  ) : (
                    <Grid></Grid>
                  )
                  
                }
                
              </Grid>
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