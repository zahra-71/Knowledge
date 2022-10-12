import React from 'react'
import { Box, Typography } from "@mui/material"

function Banner({user}) {

  if (user) {
    return null;
  }

  return (
    <Box
      textAlign= "center"
      sx={{ 
        backgroundColor: "lightblue",
        p: "20px",
      }}
    >
      <Typography variant="h4" mb="10px" >
        دانش
      </Typography >
      <Typography >مکانی برای به اشتراک گذاشتن دانش</Typography>
    </Box>
  )
}

export default Banner