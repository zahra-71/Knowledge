import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid } from '@mui/material'

// componenets
import agent from '../../store/agent'
import { changePageArticle, homeLoaded, selectArticles, selectTags } from '../../store/reducers/homeReducer'
import { homeUnLoaded, SelectCurrentUser } from '../../store/reducers/commonReducer'
import  Tags from '../../components/Home/Tags'
import Banner from "../../components/Home/Banner"
import MainVeiw from '../../components/Home/MainVeiw'
import { styled } from '@mui/system'


const MyGrid = styled(Grid) (({ theme }) => ({
  flexGrow: 1,
  margin: 5,
  [theme.breakpoints.down('md')]: {
    flexDirection: "column"
  }

}))

function Home() {

  const dispatch = useDispatch()
  const tags = useSelector(selectTags)
  const articles = useSelector(selectArticles)
  const selectUser = useSelector(SelectCurrentUser)

  // get articles and tags in global field
  useEffect(() => {
    dispatch(homeLoaded(Promise.all([agent.Tags.getAll(), agent.Articles.all()])))
    return () => {
      dispatch(homeUnLoaded())
    }
  }, [dispatch])

  // change page of articles in global field
  const pagerChange = async (value) => {
    dispatch(changePageArticle(await agent.Articles.all(value)))
  }

  return (
    <Box sx={{mt: "15px", mr: 2, ml: 2}}>
      <Banner user={selectUser} />
      <MyGrid container spacing={2} >
        <Grid item flexGrow={1} md={8}>
          <MainVeiw user={selectUser} articles={articles} changePage={pagerChange}/>
        </Grid>
        <Grid item md={4}>
          <Tags tags={tags}/>
        </Grid>
      </MyGrid>
      
    </Box>
  )
}

export default Home