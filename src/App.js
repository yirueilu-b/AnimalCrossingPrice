import React from 'react';
import './Component/Table'
import Navbar from "./Component/Navbar"
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container'
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Option from './Component/Option'
import DataTable from './Component/Table'
import {makeStyles} from '@material-ui/core/styles';
import fishData from './data/fish.csv';
import insectData from './data/insect.csv';
import Papa from 'papaparse';
import {withStyles} from '@material-ui/styles';


const useStyles = makeStyles(theme => ({
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
        width: '100vw',
        borderRadius: '10em'
    }
}));

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: 'dark',
            filterName: '',
            rows: []
        };
        this.handleFilterNameChange = this.handleFilterNameChange.bind(this);
        this.getData = this.getData.bind(this);
        this.toggleDarkTheme = this.toggleDarkTheme.bind(this)

    }

    componentWillMount() {
        this.getData();
    }

    async getData() {
        let responseInsect = await fetch(insectData);
        let readerInsect = responseInsect.body.getReader();
        let resultInsect = await readerInsect.read(); // raw array
        let decoder = new TextDecoder('utf-8');
        let csvInsect = decoder.decode(resultInsect.value);// the csv text
        let resultsInsect = Papa.parse(csvInsect, {header: true}); // object with { data, errors, meta }
        resultsInsect.data.pop();
        let rowsInsect = resultsInsect.data;// array of objects

        let responseFish = await fetch(fishData);
        let readerFish = responseFish.body.getReader();
        let resultFish = await readerFish.read(); // raw array
        let csvFish = decoder.decode(resultFish.value);// the csv text
        let resultsFish = Papa.parse(csvFish, {header: true}); // object with { data, errors, meta }
        resultsFish.data.pop();
        const rowsFish = resultsFish.data;// array of objects
        // console.log(rows);
        this.setState({rows: rowsFish.concat(rowsInsect)});
    }


    toggleDarkTheme() {
        let newPaletteType = this.state.theme === "light" ? "dark" : "light";
        this.setState({theme: newPaletteType});
    };

    handleFilterNameChange = (e) => {
        // console.log(e.target.value);
        this.setState({filterName: e.target.value});
    };

    render() {
        const {classes} = this.props;

        let myComponent;
        if (this.state.rows.length !== 0) {
            // console.log(this.state.rows);
            myComponent = <Grid container spacing={2}
                                justify='center'
                                alignItems="center"
                                direction="row"
            >
                <Grid item xs={12} md={7} className={classes.table}>
                    <DataTable filterName={this.state.filterName} data={this.state.rows}/>
                </Grid>
            </Grid>
        } else {
            myComponent = null
        }
        // myComponent = null

        let theme = createMuiTheme({
          palette: {
            type: this.state.theme
          }
        });
        return (
            <MuiThemeProvider theme={theme}>

                <CssBaseline/>

                <Navbar theme={this.state.theme} onToggleDark={this.toggleDarkTheme}/>

                <Container className={classes.root}>
                    <Option handleFilterNameChange={this.handleFilterNameChange}/>
                    {myComponent}
                </Container>

            </MuiThemeProvider>
        );

    }

}

export default withStyles(useStyles)(App);

