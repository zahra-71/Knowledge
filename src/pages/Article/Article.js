import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { Typography } from '@mui/material'

// componenets
import agent from '../../store/agent'
import { articleLoaded, articleUnloaded, selectArticle, selectComments, selectNewComment } from '../../store/reducers/articleReducer'
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

  useEffect(() => {
    dispatch(articleLoaded(Promise.all([agent.Articles.get(slug), agent.Comments.forArticle(slug)])))
    return () => {
      dispatch(articleUnloaded())
    }
  },[slug, dispatch])

  return (
    <div>
      <ArticleContent article={article} currentUser={currentUser}/>
      {comments && 
        <CommentsContainer comments={comments} currentUser={currentUser} slug={slug} />
      }
    </div>
  )
}

export default Article