import React from 'react';
import './Component/Table'
import Navbar from "./Component/Navbar"
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container'
import {useState} from 'react';
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Option from './Component/Option'
import DataTable from './Component/Table'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: '100vw',
        marginTop: theme.spacing(2),
        textAlign: 'center',
    },
    paper: {
        height: '100%',
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    table: {}
}));

function App() {
    const [theme, setTheme] = useState({
        palette: {
            type: "light"
        }
    });
    const toggleDarkTheme = () => {
        let newPaletteType = theme.palette.type === "light" ? "dark" : "light";
        setTheme({
            palette: {
                type: newPaletteType
            }
        });
    };
    const muiTheme = createMuiTheme(theme);
    const classes = useStyles();

    return (
        <MuiThemeProvider theme={muiTheme}>
            <CssBaseline/>

            <Navbar theme={theme.palette.type} onToggleDark={toggleDarkTheme}/>

            <Container className={classes.root}>
                <Option/>
                <Grid container spacing={2}>
                    <Grid item xs={12} className={classes.table}>
                        <DataTable/>
                    </Grid>
                </Grid>
            </Container>
        </MuiThemeProvider>
    );
}

export default App;

