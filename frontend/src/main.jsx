import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { BrowserRouter } from "react-router-dom"
import { RecoilRoot } from "recoil"

const styles = {
  global: (props) => ({
    body: {
      color: mode("gray.900", "whiteAlpha.900")(props),
      bg: mode("gray.100", "#101010")
    }
  })
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

const colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e"
  }
}

const theme = extendTheme({ styles, config, colors })

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>,
)
