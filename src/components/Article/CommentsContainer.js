import React from 'react'
import { Link, Typography } from '@mui/material'
import { useNavigate } from 'react-router'

// Component
import Comments from './Comments'
import CommentInput from './CommentInput'

const CommentsContainer = ({comments , currentUser, slug}) => {

  // console.log(comments)
  const navigate =useNavigate()
  // console.log(currentUser)

  if ( currentUser ) {
    return (
      <div>
        <CommentInput slug={slug} />
        {comments ? (
          comments.comments.map((comment, index) => {
            return (
              <Comments comment={comment} key={index} currentUser={currentUser} slug={slug} index={index}/>
            )
          })
        ):(
          <Typography>
          در حال بارگیری ...
          </Typography>
        )  
        }
      </div>
    )
  } else {
    return (
      <div>
        <Typography sx={{mr: 12}}>
          <Link onClick={() => navigate('/login')} sx={{cursor: "pointer"}}>ورود</Link>
          &nbsp;یا&nbsp;<Link onClick={() => navigate('/register')} sx={{cursor: "pointer"}}>ثبت نام</Link>
          &nbsp;برای گذاشتن نظر روی این مقاله
        </Typography>
        {comments ? (
          comments.comments.map((comment, index) => {
            return (
              <Comments comment={comment} key={index}/>
            )
          })
        ):(
          <Typography>
          در حال بارگیری ...
          </Typography>
        )  
        }
      </div>
    )
  }
}

export default CommentsContainer