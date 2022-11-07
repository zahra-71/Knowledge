import React, {useEffect, useState} from 'react'
import { Box, Tab, Divider, Card } from "@mui/material"
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { useDispatch, useSelector } from 'react-redux'

// components
import ArticlesList from "./ArticlesList"
import agent from '../../store/agent'
import { articlesListLoaded, selectFeedArticles } from '../../store/reducers/articlesListReducer'
import { articlesByTagLoaded, selectArticlesByTag, selectTag } from '../../store/reducers/articlesByTagReducer'

function MainVeiw({user, articles, changePage }) {

  const dispatch = useDispatch()
  const feedArticles = useSelector(selectFeedArticles)
  const articlesByTag = useSelector(selectArticlesByTag)
  const tag = useSelector(selectTag)
  const [value, setValue] = useState("1")

  // change tab
  const handleChangeTab = (event, newValue) => {
    setValue(newValue)
  }

  // get feed articles
  const handleFeedArticles = (e) => {
    dispatch(articlesListLoaded(agent.Articles.feed()))
  }

  // change page of articles with tag
  const changePageTag = async(value) => {
    dispatch(articlesByTagLoaded(await agent.Articles.byTag(tag,value)))
  }

  // update tab when receive articles by tag
  useEffect(() => {
    setValue(tag? "2" : "1")
  },[tag])
  
  return (
    <Box sx={{ width: '100%', typography: 'body1'}}>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
            <Tab label="زمینه سراسری" value="1" />
            { user && <Tab label="زمینه شما" value="0" onClick={handleFeedArticles}/> }
            {articlesByTag && <Tab label={tag} value="2"/>}
          </TabList>
          <Divider />
        </Box>
        <TabPanel value="1">
          <Card >
            { articles &&
              <>
                <ArticlesList articles={articles} changePage={changePage}/> 
              </>
            } 
          </Card>
        </TabPanel>
        <TabPanel value="0">
          { feedArticles &&
              <ArticlesList articles={feedArticles} />
          }
        </TabPanel>
        <TabPanel value="2">
          { articlesByTag && 
            <ArticlesList articles={articlesByTag} changePage={changePageTag}/>
          }
        </TabPanel>
      </TabContext>
    </Box>
  )
}

export default MainVeiw