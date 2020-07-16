import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

const useStyles = makeStyles((theme) => ({
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

            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={1}>
                            <SearchIcon/>
                        </Grid>
                        <Grid item xs={10}>
                            <TextField fullWidth id="input-with-icon-grid" label="輸入名稱以查詢"/>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </React.Fragment>
    );
}

export default Option