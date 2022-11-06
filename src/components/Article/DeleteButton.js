import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

// componenets
import agent from '../../store/agent'
import { deleteComment } from "../../store/reducers/articleReducer";
import { useState } from "react";


const DeleteButton = ({show, commentId, slug, index}) => {
  // console.log(index)
  const dispatch = useDispatch()
  // const [loading, setLoading] = useState(false)

  const handleDelete = async(e) => {
    // setLoading(true)
    await agent.Comments.delete(slug, commentId)
    dispatch(deleteComment(index))
  }
  return(
    <>
      {show &&
        <Button onClick={handleDelete}>
          <DeleteForeverIcon />
        </Button>
      }
    </>
  )
}

export default DeleteButton;