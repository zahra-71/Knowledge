import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation }from 'react-router'
import { Box, Typography, Button, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Component
import ArticlesList from '../../components/Home/ArticlesList'
import agent from '../../store/agent'
import { profileLoaded, profileUnLoaded, selectProfile, selectProfileArticles, profileFollow, profileChangePage } from '../../store/reducers/profileReducer'

function Profile() {

  const location = useLocation()
  const dispatch = useDispatch()
  const username = decodeURI(location.pathname.replace('/@',''))
  const profile = useSelector(selectProfile)
  const articles = useSelector(selectProfileArticles)
  const [follow, setFollow] = useState(profile && profile.profile.following)

  // get profile and articles by author
  useEffect(() => {
    dispatch(profileLoaded(Promise.all([
      agent.Profile.get(username),
      agent.Articles.byAuthor(username)])
    ))
    return () => {
      dispatch(profileUnLoaded())
    }
  }, [dispatch, username])

  // for follow and unfollow button
  const handleFollow = async() => {
    if (follow) {
      dispatch(profileFollow(await agent.Profile.unfollow(username)))
    } else {
      dispatch(profileFollow(await agent.Profile.follow(username)))
    }
    setFollow(!follow)
  }

  // for page change of articles in by author api
  const handlePageChange = async(value) => {
    dispatch(profileChangePage(await agent.Articles.byAuthor(username, value)))
  }

  return (
    <div>
      <Box 
        textAlign= "center"
        evaluation={5}
        sx={{
          bgcolor: "lightgray",
          padding: 7,
          margin: 5
        }}
      >
        {profile?
          (<>
            <img src={profile.profile.image} alt={profile.profile.username} 
              style={{borderRadius: 10, height: 80, width: 80}}
            /> 
            <Typography >
              {profile.profile.username}
            </Typography>
            <Typography >
              {profile.profile.bio}
            </Typography>
            <Button variant="contained"
              sx={{float: "right", 
              "&:hover": {
                color: "white"
              },
              bgcolor: follow? "#1976d2" : "white",
              color: follow? "white" :  "#1976d2"
            }}
              endIcon={follow? <RemoveIcon sx={{mr: 2}}/> : <AddIcon sx={{mr: 2}}/>}
              onClick={handleFollow}
            >
              {follow? (
                "دنبال نکردن"
              ) : (
                "دنبال کردن"
              )}
            </Button>
          </>) : (
            <Typography>در حال بارگیری ...</Typography>
          )
        }
      </Box>
      <Paper sx={{m: 10}}>
        {articles &&
          <ArticlesList articles={articles} changePage={handlePageChange}/>
        }
      </Paper>
    </div>
  )
}

export default Profile