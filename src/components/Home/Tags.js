import { Link, Typography, Box, Grid } from '@mui/material'
import { styled } from '@mui/system'
import { useDispatch } from 'react-redux'

// componenets
import agent from '../../store/agent'
import { articlesByTagLoaded, articlesTag } from '../../store/reducers/articlesByTagReducer'

const MyBox = styled(Box) (({ theme }) => ({
  padding: theme.spacing(1),
  width: 380,
  height: 100,
  borderRadius: 5,
  backgroundColor: "lightgray",
  [theme.breakpoints.up("md")]: {
    
  }
}))

const MyGridItem = styled(Grid) (({ theme }) => ({
  padding: theme.spacing(0.6),
  [theme.breakpoints.up('md')]: {
    // direction: "column"
  }
}))

const Tags = ({tags}) => {

  const dispatch = useDispatch()

// console.log(tags)

  return(
    <MyBox>
      <Typography>تگ‌های عمومی</Typography>
      <Grid container rowSpacing={1} >
        { tags ? (
          tags.tags.map((tag, index) => {
            const handleTag = () => {
              console.log(tag)
              dispatch(articlesByTagLoaded(agent.Articles.byTag(tag)))
              dispatch(articlesTag(tag))
            }
            return (
              <MyGridItem item key={index}>
                <Link
                  onClick={handleTag}
                  sx={{ fontSize: "0.7rem",
                    backgroundColor: "gray",
                    borderRadius: 5,
                    padding: 0.5,
                    color: "white",
                    '&:hover' : {
                      opacity: [0.9, 0.8, 0.7]
                    },
                  }}
                >
                  {tag}
                </Link>
              </MyGridItem>
            )
          })
        ) : (
          <div style={{ color: "gray", fontSize: "0.8rem", marginTop: "8px"}}>
           در حال بارگیری تگ...
          </div>
        )}
      </Grid>
    </MyBox>
  )
}

export default Tags;