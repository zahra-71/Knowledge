import React, {useState} from 'react'
import { Box, Tab, Divider, Card } from "@mui/material"
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux'

// components
import ArticlesList from "./ArticlesList"
import ListPagination from './ListPagination'
import agent from '../../store/agent'
import { articlesListLoaded, selectFeedArticles } from '../../store/reducers/articlesListReducer'

function MainVeiw({user, articles, changePage }) {

  const [value, setValue] = useState("1")
  const dispatch = useDispatch()
  // console.log(articles)
  const feedArticles = useSelector(selectFeedArticles)
  // console.log(feedArticles)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const clickHandler = (e) => {
    dispatch(articlesListLoaded(agent.Articles.feed()))
  }
  
  return (
    <Box sx={{ width: '100%', typography: 'body1'}}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="زمینه سراسری" value="1" />
            { user && <Tab label="زمینه شما" value="0" onClick={clickHandler}/> }
          </TabList>
          <Divider />
        </Box>
        <TabPanel value="1">
          <Card >
            { articles &&
              <>
                <ArticlesList articles={articles} changePage={changePage}/> 
                {/* <ListPagination count={articles.articlesCount} changePage={changePage}/> */}
              </>
            } 
          </Card>
        </TabPanel>
        <TabPanel value="0">
          { feedArticles &&
              <ArticlesList articles={feedArticles} />
          }
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default MainVeiw