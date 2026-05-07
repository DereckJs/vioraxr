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
        families: ['Roboto:300,400,500,700', 'Material Icons'],
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
            main: '#1976d2',
        },
        secondary: {
            main: '#00bcd4',
        },
        background: {
            default: '#0a1929',
            paper: '#132f4c',
        },
        type: 'dark',
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
 