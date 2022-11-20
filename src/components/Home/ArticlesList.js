import CircularProgress from '@mui/material/CircularProgress';
import { Typography, Box } from "@mui/material";

// components
import ArticlePreview from "./ArticlePreview"
import ListPagination from "./ListPagination";

const ArticlesList = ({articles, changePage}) => {

  if (!articles.articles) {
    return(
      <Box sx={{display: 'flex'}}>
        <CircularProgress size='4vh'/>
      </Box>
    )
  }

  if (articles.articles.length === 0) {
    return(
      <Typography> هیچ مقاله‌ای هنوز وجود ندارد ...</Typography>
    )
  }

  return(
    <>
      {
        articles.articles &&
          articles.articles.map((article, index) => {
          return (
            <ArticlePreview article={article} key={index} />
          )
        })
      }
      <ListPagination count={articles.articlesCount} changePage={changePage}/>
    </>
  );
}

export default ArticlesList