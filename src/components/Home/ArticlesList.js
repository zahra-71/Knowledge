
// components
import { Typography } from "@mui/material";
import ArticlePreview from "./ArticlePreview"
import ListPagination from "./ListPagination";
import { selectArticlesCount } from "../../store/reducers/homeReducer";

const ArticlesList = ({articles, changePage}) => {

// console.log(articles)
  if (!articles.articles) {
    return(
      <Typography>
        در حال بارگیری ...
      </Typography>
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