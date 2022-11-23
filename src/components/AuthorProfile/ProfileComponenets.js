import { Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from "react-router";

export const EditProfileSettings = ({user}) => {

  const navigation = useNavigate()

  if ( user) {
    return (
      <Button
      variant="contained"
      sx={{float: "right", 
        "&:hover": {
          color: "white"
        },
        bgcolor: "white",
        color: "#1976d2"
      }}
      onClick={() =>  navigation('/settings')}
    >
      ویرایش تنظیمات پروفایل
    </Button>
    )
  } 
  return null
}

export const FollowUserButton = ({follow, user, handleFollow}) => {

  if ( !user ) {
    return (
      <Button variant="contained"
        sx={{float: "right", 
          "&:hover": {
            color: "white"
          },
          bgcolor: follow? "#1976d2" : "white",
          color: follow? "white" :  "#1976d2"
        }}
        onClick={() => handleFollow(follow)}
      >
        {follow? (
          <>
            دنبال نکردن
            <RemoveIcon sx={{mr: 2}}/>
          </>
        ) : (
          <>
            دنبال کردن
            <AddIcon sx={{mr: 2}} />
          </>
        )}
      </Button>
    )
  }
  return null
}