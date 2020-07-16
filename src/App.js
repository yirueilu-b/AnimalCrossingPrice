import React from 'react';
import './Component/Table'
import Navbar from "./Component/Navbar"
import CssBaseline from '@material-ui/core/CssBaseline';
import {useState} from 'react';
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
// import Demo from './Component/demo'

function App() {
    const [theme, setTheme] = useState({
        palette: {
            type: "light"
        }
    });
    const toggleDarkTheme = () => {
        console.log("pressed");
        let newPaletteType = theme.palette.type === "light" ? "dark" : "light";
        setTheme({
            palette: {
                type: newPaletteType
            }
        });
    };
    const muiTheme = createMuiTheme(theme);

    return (
        <MuiThemeProvider theme={muiTheme}>
            <CssBaseline/>
            <Navbar theme={theme.palette.type} onToggleDark={toggleDarkTheme}/>
            {/*<Demo onToggleDark={toggleDarkTheme}/>*/}
        </MuiThemeProvider>
    );
}

export default App;

