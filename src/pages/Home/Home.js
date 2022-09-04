import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'

// componenets
import agent from '../../store/agent'
import { homeLoaded, selectTags } from '../../store/reducers/homeReducer'
import { homeUnLoaded, SelectCurrentUser } from '../../store/reducers/commonReducer'
import  Tags from '../../components/Tags'
import Banner from "./Banner"
import { getToken } from '../../storage/Storage'

function Home() {

  const dispatch = useDispatch()
  const tags = useSelector(selectTags)
  const selectUser = useSelector(SelectCurrentUser)

  useEffect(() => {
    dispatch(homeLoaded(agent.Tags.getAll()))
    return () => {
      dispatch(homeUnLoaded())
    }
  }, [dispatch])

  return (
    <Box sx={{mt: "15px"}}>
      <Banner user={selectUser} />
      <Tags tags={tags} />
    </Box>
  )
}

export default Home