import React, {useState, useEffect} from 'react'
import {  Box, Button, InputBase } from '@mui/material'
import { styled } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

// componenets
import agent from '../../store/agent'
import { addNewArticleLoaded, addNewArticleUnLoaded, selectRedirect, selectUpdateArticle, updateArticle,
updatedArticle } from '../../store/reducers/articleReducer'
import { getSlug, removeSlugLocal } from '../../storage/Storage'

// styled
const MyBox = styled(Box)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  marginTop: 10,

}))

const MyForm = styled('div')(({ theme }) => ({
  width: "60%",
  height: "95%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  //  position: "absolute",
}))

const MyTextField = styled(InputBase)(({ theme }) => ({
  padding: theme.spacing(1.5),
  margin: theme.spacing(1.5),
  borderRadius: theme.spacing(1.5),
  border:  "1px solid #bdbdbd",
  "&.Mui-focused":{
    border:  "1.5px solid #1976d2",
    // borderColor: theme.palette.primary,
  },
}))

const MyButton = styled(Button)(({ theme }) => ({
  width: 100,
  [theme.breakpoints.down("md")]: {
    width: 50
  }
}))

function NewPost() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const updateArticleValue = useSelector(selectUpdateArticle)
  console.log("updateArticleValue",updateArticleValue)
  const [inputArticles, setInputArticles] = useState(inputArticles =>({
    ...inputArticles,
      title:  updateArticleValue && updateArticleValue.title ,
      description: updateArticleValue && updateArticleValue.description,
      body: updateArticleValue && updateArticleValue.body ,
      tagList: updateArticleValue && updateArticleValue.tagList
  }))
  // console.log( "inputArticles1",inputArticles)

  useEffect(() => {
    setInputArticles(inputArticles =>({
      ...inputArticles,
      body: updateArticleValue && updateArticleValue.body,
      description: updateArticleValue && updateArticleValue.description,
      tagList: updateArticleValue && updateArticleValue.tagList,
      title:  updateArticleValue && updateArticleValue.title ,    
  })
  )},[updateArticleValue])

  const redirect = useSelector(selectRedirect)
  const slug = getSlug('slug')

  // for change article input
  const handleChange = (e) => {
    setInputArticles(inputArticles => ({
      ...inputArticles,
      [e.target.name]: e.target.value
    }))
  }

  // for add new article and update article
  const handleAddArticles = async() => {
    if(slug){
      dispatch(updatedArticle(await agent.Articles.update(slug, inputArticles)))
      removeSlugLocal('slug')
    }else {
      dispatch(addNewArticleLoaded(await agent.Articles.create(inputArticles)))
    }
    setInputArticles("")
  }

  // get article for update article
  useEffect(() => {
    async function getArticleForUpdate() {
      if(!updateArticleValue && slug){
        dispatch(updateArticle(await agent.Articles.get(slug)))
      }
    }
    getArticleForUpdate()
  }, [updateArticleValue, slug])

  // for navigate to article page when new article add
  useEffect(() => {
    if(redirect){
      navigate(redirect)
    }
    return () => {
      dispatch(addNewArticleUnLoaded())
      removeSlugLocal('slug')
    }
  },[redirect])
  
  return (
    <>
      <MyBox 
        componenet="form"
      >
        <MyForm>
          <MyTextField 
            fullWidth 
            placeholder="عنوان مقاله"
            name="title"
            onChange={handleChange}
            // defaultValue={updateArticleValue && updateArticleValue.article.title }
            value={updateArticleValue? inputArticles.title: ""}
          />
          <MyTextField 
            fullWidth
            placeholder="مقاله درباره‌ی چیست؟"
            name="description"
            onChange={handleChange}
            // defaultValue={updateArticleValue && updateArticleValue.article.description }
            value={inputArticles.description}
          />
          <MyTextField 
            fullWidth
            placeholder=" مقاله خود را بنویسید (در markdown)"
            multiline={true}
            inputProps={{
              style: {
                height: 200,
              }
            }}
            name="body"
            onChange={handleChange}
            // defaultValue={updateArticleValue && updateArticleValue.article.body }
            value={inputArticles.body}
          />
          <MyTextField 
            fullWidth
            placeholder="تگ‌ها را وارد کنید"
            name="tagList"
            onChange={handleChange}
            // defaultValue={updateArticleValue && 
            //   updateArticleValue.article.tagList.map((tag, index) => {
            //     return(<span key={index}>{tag}</span>)
            //   })
            // }
            value={inputArticles.tagList}
          />
        </MyForm>
      </MyBox>
      <Box
        display="flex"
        justifyContent="flex-start"
        sx={{
          mr:"20%"
        }}
      >
      <MyButton 
        variant="contained"
        onClick={handleAddArticles}
      >
        ارسال
      </MyButton>
    </Box>
  </>
  )
}

export default NewPost