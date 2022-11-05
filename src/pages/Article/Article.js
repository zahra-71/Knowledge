import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { Typography } from '@mui/material'

// componenets
import agent from '../../store/agent'
import { articleLoaded, selectArticle, selectComments } from '../../store/reducers/articleReducer'
import ArticleContent from '../../components/Article/Article'
import CommentsContainer from '../../components/Article/CommentsContainer'
import { SelectCurrentUser } from '../../store/reducers/commonReducer'

function Article() {

  const dispatch = useDispatch()
  const location = useLocation()
  const slug = location.pathname.replace('/article/', '')
  // console.log(slug)

  const article = useSelector(selectArticle)
  const comments = useSelector(selectComments)
  const currentUser = useSelector(SelectCurrentUser)
  // console.log(article)
  // console.log(comments)


  useEffect(() => {
    dispatch(articleLoaded(Promise.all([agent.Articles.get(slug),agent.Comments.forArticle(slug)])))

  },[slug, dispatch])
  return (
    <div>
      <ArticleContent article={article}/>
      {comments && 
        <CommentsContainer comments={comments} currentUser={currentUser} />
      }
    </div>
  )
}

export default Article