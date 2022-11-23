import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation }from 'react-router'
import { Box, Typography, Tab } from '@mui/material'
import { TabContext, TabList, TabPanel } from '@mui/lab'


// Component
import ArticlesList from '../../components/Home/ArticlesList'
import agent from '../../store/agent'
import { authorProfileLoaded, authorProfileUnLoaded, selectAuthorProfile, selectAuthorProfileArticles, 
  authorProfileFollow, authorProfileChangePage, authorProfileFavoriteLoaded, selectAuthorProfileFavoriteArticles } from '../../store/reducers/authorProfileReducer'
import { SelectCurrentUser } from '../../store/reducers/commonReducer'
import { EditProfileSettings, FollowUserButton } from '../../components/AuthorProfile/ProfileComponenets'

function AuthorProfile() {

  const location = useLocation()
  const dispatch = useDispatch()
  const username = decodeURI(location.pathname.replace('/@',''))
  const profile = useSelector(selectAuthorProfile)
  const articles = useSelector(selectAuthorProfileArticles)
  const favoriteArticles = useSelector(selectAuthorProfileFavoriteArticles)
  const currentUser = useSelector(SelectCurrentUser)
  const [follow, setFollow] = useState(profile && profile.profile.following)
  const user = profile &&
  profile.profile.username === currentUser
  const [value, setValue] = useState("0")
  // console.log(follow)

  // for update initial value of follow
  useEffect(() => {
    setFollow(profile && profile.profile.following)
  }, [profile])

  // get profile and articles by author
  useEffect(() => {
    dispatch(authorProfileLoaded(Promise.all([
      agent.Profile.get(username),
      agent.Articles.byAuthor(username)])
    ))
    return () => {
      dispatch(authorProfileUnLoaded())
    }
  }, [dispatch, username])

  // for follow and unfollow button
  const handleFollow = async(follow) => {
    console.log(follow)
    if (follow) {
      dispatch(authorProfileFollow(await agent.Profile.unfollow(username)))
    } else {
      dispatch(authorProfileFollow(await agent.Profile.follow(username)))
    }
    setFollow(!follow)
    console.log(follow)
  }

  // for page change of articles in by author api
  const handlePageChange = async(value) => {
    dispatch(authorProfileChangePage(await agent.Articles.byAuthor(username, value)))
  }

  // for change tab
  const changeTab = (event, newValue) => {
    setValue(newValue)
  }

  // for favorite articles of author
  const handleFavoriteArticles = (value) => {
    dispatch(authorProfileFavoriteLoaded(agent.Articles.favoriteBy(username, value)))
  }

  // for change page of favorite articles
  const handleFavoritePageChange = async(value) => {
    dispatch(authorProfileFavoriteLoaded(await agent.Articles.favoriteBy(username, value)))
  }

  return (
    <div>
      <Box 
        textAlign= "center"
        evaluation={5}
        sx={{
          bgcolor: "lightgray",
          padding: 7,
          mr: 10,
          ml: 10,
          mt: 5,
          mb: 5
        }}
      >
        {profile?
          (<>
            <img src={profile.profile.image} alt={profile.profile.username} 
              style={{borderRadius: 10, height: 50, width: 50}}
            /> 
            <Typography >
              {profile.profile.username}
            </Typography>
            <Typography >
              {profile.profile.bio}
            </Typography>
            <>
              {/* {currentUser === profile.profile.username? ( */}
                <EditProfileSettings user={user}/>
              {/* ) : ( */}
                <FollowUserButton follow={follow} user={user}
                  handleFollow={handleFollow}
                />
              {/* )} */}
            </>
          </>) : (
            <Typography>در حال بارگیری ...</Typography>
          )
        }
      </Box>
      <Box sx={{m: 10}}>
        <TabContext value={value}>
          <Box>
            <TabList onChange={changeTab} aria-label="lab API tabs example">
              <Tab label="مقالات من" value="0"/>
              <Tab label="مقالات مورد علاقه" value="1" onClick={handleFavoriteArticles}/>
            </TabList>
          </Box>
          <TabPanel value="0">
            {articles &&
              <ArticlesList articles={articles} changePage={handlePageChange}/>
            }
          </TabPanel>
          <TabPanel value="1">
            {favoriteArticles &&
              <ArticlesList articles={favoriteArticles} changePage={handleFavoritePageChange}/>
            }
          </TabPanel>
        </TabContext>
        
      </Box>
    </div>
  )
}

export default AuthorProfile