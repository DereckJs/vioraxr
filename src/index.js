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
    typography: {
        fontFamily: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        h1: { fontWeight: 800, letterSpacing: '-0.04em' },
        h2: { fontWeight: 800, letterSpacing: '-0.035em' },
        h3: { fontWeight: 700, letterSpacing: '-0.03em' },
        h4: { fontWeight: 700, letterSpacing: '-0.025em' },
        h5: { fontWeight: 700, letterSpacing: '-0.02em' },
        h6: { fontWeight: 700, letterSpacing: '-0.015em' },
        button: {
            fontWeight: 700,
            letterSpacing: '0.01em',
            textTransform: 'none',
        },
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    backgroundColor: '#050b17',
                },
            },
        },
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: '#071527',
            },
        },
        MuiButton: {
            root: {
                borderRadius: 12,
                transition: 'transform 180ms ease, background-color 180ms ease, border-color 180ms ease, box-shadow 180ms ease',
                '&:active': {
                    transform: 'translateY(1px) scale(0.99)',
                },
            },
            containedPrimary: {
                color: '#f8fbff',
                background: 'linear-gradient(135deg, #1477e8 0%, #00b6e6 100%)',
                boxShadow: '0 18px 36px rgba(0, 151, 216, 0.24)',
                '&:hover': {
                    background: 'linear-gradient(135deg, #1a83f5 0%, #15c7ef 100%)',
                    boxShadow: '0 22px 42px rgba(0, 151, 216, 0.3)',
                },
            },
            outlined: {
                borderColor: 'rgba(145, 231, 255, 0.32)',
            },
        },
        MuiPaper: {
            root: {
                backgroundImage: 'none',
            },
            rounded: {
                borderRadius: 18,
            },
        },
        MuiTableCell: {
            root: {
                borderBottom: '1px solid rgba(145, 231, 255, 0.12)',
            },
        },
        MuiDrawer: {
            paper: {
                backgroundColor: '#071527',
                backgroundImage: 'linear-gradient(180deg, rgba(0, 212, 255, 0.05), rgba(139, 92, 246, 0.04))',
                borderColor: 'rgba(145, 231, 255, 0.14)',
            },
        },
        MuiDialog: {
            paper: {
                backgroundColor: '#0a1628',
                border: '1px solid rgba(145, 231, 255, 0.16)',
                boxShadow: '0 28px 90px rgba(0, 0, 0, 0.55)',
            },
        },
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
            main: '#1477e8',
        },
        secondary: {
            main: '#00d4ff',
        },
        background: {
            default: '#050b17',
            paper: '#0a1628',
        },
        text: {
            primary: '#f8fbff',
            secondary: '#9bb7c9',
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
