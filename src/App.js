import React from 'react';
import './Component/Table'
import Navbar from "./Component/Navbar"
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container'
import {MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Option from './Component/Option'
import DataTable from './Component/Table'
import fishData from './data/fish.csv';
import insectData from './data/insect.csv';
import Papa from 'papaparse';
import {withStyles} from '@material-ui/core/styles';
import StickyFooter from "./Component/Footer";

let myTheme = createMuiTheme({
    palette: {
        type: 'light'
    }
});

const useStyles = myTheme => ({
    root: {
        flexGrow: 1,
        maxWidth: '100vw',
        minHeight: 'calc(100vh - 68px)',
        textAlign: 'center',
    },
});


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: myTheme,
            filterName: '',
            rows: [],
            currentRows: []
        };
        this.handleFilterNameChange = this.handleFilterNameChange.bind(this);
        this.getData = this.getData.bind(this);
        this.toggleDarkTheme = this.toggleDarkTheme.bind(this)

    }

    componentDidMount() {
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

        let allData = rowsFish.concat(rowsInsect);
        Object.keys(allData).forEach(function (el) {
            allData[el].price = parseInt(allData[el].price.replace(',', ''))
        });
        this.setState({rows: allData});
        this.setState({currentRows: allData});
    }


    toggleDarkTheme() {
        let newPaletteType = this.state.theme.palette.type === "light" ? "dark" : "light";
        myTheme = createMuiTheme({
            palette: {
                type: newPaletteType
            }
        });
        this.setState({theme: myTheme});

    };

    handleRowsFilter(e) {
        let tmpRows = this.state.rows.filter(row => row.name.indexOf(e.target.value) !== -1);
        if (tmpRows.length === 0) {
            this.setState({currentRows: this.state.rows});
        } else {
            this.setState({currentRows: tmpRows});
        }
    };

    handleFilterNameChange = (e) => {
        // console.log(e.target.value);
        this.setState({filterName: e.target.value});
        this.handleRowsFilter(e);
        // let tmpRows = this.state.rows.map((row) => (row.name.indexOf(this.state.filterName) !== -1)? row:null);
    };

    render() {
        const {classes} = this.props;
        let myComponent;
        if (this.state.rows.length !== 0) {
            // console.log(this.state.rows);
            myComponent =
                <Grid container spacing={2}
                      justify='center'
                      alignItems="center"
                      direction="row"
                >
                    <Grid item xs={12} md={7} className={classes.table}>
                        <DataTable filterName={this.state.filterName} data={this.state.currentRows}/>
                    </Grid>
                </Grid>
        } else {
            myComponent = null
        }

        return (
            <MuiThemeProvider theme={myTheme}>

                <CssBaseline/>

                <Container className={classes.root}>
                    <Navbar theme={this.state.theme} onToggleDark={this.toggleDarkTheme}/>

                    <Option handleFilterNameChange={this.handleFilterNameChange}/>
                    {myComponent}
                </Container>
                <StickyFooter/>
            </MuiThemeProvider>
        );

    }

}

export default withStyles(useStyles)(App);

