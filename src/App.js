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
        height: '100%',
        marginTop: theme.spacing(2),
        textAlign: 'center',
    },
    paper: {
        height: '100%',
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    table: {
        width:'100vw',
        borderRadius:'10em'
    }
}));

function App() {
    const [theme, setTheme] = useState({
        palette: {
            type: "light"
        }
    });

    const [filterName, setFilterName] = useState({filterName: ''});

    const toggleDarkTheme = () => {
        let newPaletteType = theme.palette.type === "light" ? "dark" : "light";
        setTheme({
            palette: {
                type: newPaletteType
            }
        });
    };

    const handleFilterNameChange = (e) => {
        console.log(e.target.value);
        setFilterName({filterName: e.target.value});
    };

    const muiTheme = createMuiTheme(theme);
    const classes = useStyles();

    return (
        <MuiThemeProvider theme={muiTheme}>
            <CssBaseline/>

            <Navbar theme={theme.palette.type} onToggleDark={toggleDarkTheme}/>

            <Container className={classes.root}>
                <Option handleFilterNameChange={handleFilterNameChange}/>
                <Grid container spacing={2}
                      justify='center'
                      alignItems="center"
                      direction="row"
                >
                    <Grid item xs={12} md={7} className={classes.table}>
                        <DataTable filterName={filterName}/>
                    </Grid>
                </Grid>
            </Container>
        </MuiThemeProvider>
    );
}

export default App;

