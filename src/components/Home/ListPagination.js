import React from 'react'
import { Pagination, Stack } from '@mui/material'

const ListPagination = ({count, changePage}) => {
 
  const ranges = []
  for (let i = 1; i <= Math.ceil(count / 10); ++i) {
    ranges.push(i)
  }

  const handleClick = async(event, value) => {
    console.log("page", value)
    await changePage(value)
    window.scrollTo({top: 0, right: 0, behavior: "smooth"})
  }

  return (
    <Stack sx={{direction: "ltr", p: 2, alignItems: "center"}} >
      <Pagination count={ranges.length} color="primary" variant="outlined" 
        onChange={handleClick}
      />
    </Stack>
  )
}

export default ListPagination