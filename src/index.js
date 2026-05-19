import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Root from './Root'
import * as serviceWorker from './serviceWorker'
import WebFontLoader from 'webfontloader'
import {Provider} from 'react-redux'
import store from './store'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

WebFontLoader.load({
    google: {
        families: ['Poppins:300,400,500,600,700,800', 'Material Icons'],
    },
})

//store.subscribe(() => console.log('store updated:', store.getState()));

const theme = createMuiTheme({
    overrides: {
        MuiFormControlLabel: {
            label: {
                fontSize: '0.85em'
            },
        },
        MuiFormLabel: {
            root: { 
                '&$focused': {
                    color:'#CCCCCC',
                },   
            }
         
        }
    },
    palette: {
        primary: {
            main: '#1f8fff',
        },
        secondary: {
            main: '#00d4ff',
        },
        background: {
            default: '#050b17',
            paper: '#071426',
        },
        text: {
            primary: '#f8fbff',
            secondary: '#9eb8ca',
        },
        type: 'dark',
    },
    typography: {
        fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
        button: {
            textTransform: 'none',
            fontWeight: 700,
        },
    },
  })

  
ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme = { theme }>
            <Root />
        </MuiThemeProvider>
    </Provider>, 
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
