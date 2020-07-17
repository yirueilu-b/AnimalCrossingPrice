import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Image from './bg.png';

const useStyles = makeStyles((theme) => ({
    root: {
        height: 96,
        backgroundImage: `url(${Image})`
        // backgroundColor: 'black'
    },
    paper: {
        height: 48,
        padding: theme.spacing(2),
        textAlign: 'center',
    },
    formControl: {
        margin: theme.spacing(1),
        width: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
}));

// ScrollTop.propTypes = {
//     children: PropTypes.element.isRequired,
//     /**
//      * Injected by the documentation to work in an iframe.
//      * You won't need it on your project.
//      */
//     window: PropTypes.func,
// };

function Option(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <CssBaseline/>
            <Grid className={classes.root} container spacing={3}
                  justify='center'
                  alignItems="center"
                  direction="row"
            >
                <Grid item xs={10} md={10} container spacing={1}
                      justify='flex-end'
                      alignItems="flex-end"
                      direction="row"
                >
                    <Grid container item xs={1} md={1}
                          alignItems="flex-end"
                          justify='flex-end'>
                        <SearchIcon/>
                    </Grid>
                    <Grid item xs={10} md={11}>
                        <TextField fullWidth id="input-with-icon-grid" label="輸入名稱以查詢"/>
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Option