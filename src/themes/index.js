import { createTheme } from "@mui/material/styles"

const fonts = {
  typography: {
    fontFamily: 'Shabnam',
  },
  componenets: {
    MuiScopedCssBaseLine: {
      styleOverrides: {
        root: {
          fontFamily: 'Shabnam'
        }
      }
    }
  }
}

const themes = {
  default: createTheme({
    ...fonts
  })
}

export default themes