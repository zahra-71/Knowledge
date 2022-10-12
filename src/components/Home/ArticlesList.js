// components
import { Typography } from "@mui/material";
import ArticlePreview from "./ArticlePreview"

const ArticlesList = ({articles}) => {

  // console.log(articles.articles)

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
          <ArticlePreview article={article} key={index}/>
        )
      })
    }
    </>
  );
}

export default ArticlesList