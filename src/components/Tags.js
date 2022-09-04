import { Link } from '@mui/material'

const Tags = ({tags}) => {
    return(
        <div style={{margin: 20}}>
        {tags? (
            tags.map((tag, index) => {
               return (
                   <Link key={index}  underline="none"
                    href="#"
                    sx={{m: 1}}
                   >
                   {tag}
                   </Link>
               )
            })
        ) : (
           <div>
               در حال بارگیری تگ
           </div>
        )}
        </div>
    )
}
export default Tags;