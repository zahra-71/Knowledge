import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"

// componenets
import agent from '../../store/agent'
import { deleteComment } from "../../store/reducers/articleReducer";

const DeleteButton = ({show, commentId, slug, index}) => {
 
  const dispatch = useDispatch()

  // for delete button
  const handleDelete = async(e) => {
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