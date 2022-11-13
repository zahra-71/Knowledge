import React, {useState, useEffect} from 'react'
import {  Box, Button, InputBase } from '@mui/material'
import { styled } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

// componenets
import agent from '../../store/agent'
import { addNewArticleLoaded, addNewArticleUnLoaded, selectRedirect } from '../../store/reducers/articleReducer'

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
  const [inputArticles, setInputArticles] = useState({
    title: "",
    description: "",
    body: "",
    tagList: ""
  })
  
  const redirect = useSelector(selectRedirect)

  // for change article input
  const handleChange = (e) => {
    setInputArticles(addArticles => ({
      ...addArticles,
      [e.target.name]: e.target.value
    }))
  }

  // for add new article
  const handleAddArticles = async() => {
    dispatch(addNewArticleLoaded(await agent.Articles.create(inputArticles)))
    setInputArticles({
      title: "",
      description: "",
      body: "",
      tagList: ""
    })
  }

  // for navigate to article page when new article add
  useEffect(() => {
    if(redirect){
      navigate(redirect)
    }
    return() => {
      dispatch(addNewArticleUnLoaded())
    }
  },[redirect, navigate, dispatch])
  
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
          />
          <MyTextField 
            fullWidth
            placeholder="مقاله درباره‌ی چیست؟"
            name="description"
            onChange={handleChange}
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
          />
          <MyTextField 
            fullWidth
            placeholder="تگ‌ها را وارد کنید"
            name="tagList"
            onChange={handleChange}
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