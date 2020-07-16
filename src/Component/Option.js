import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles} from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
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
    const [state, setState] = React.useState({
        age: '',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <React.Fragment>
            <CssBaseline/>

            <Grid container spacing={3}>

                <Grid item xs={12} md={6}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={1}>
                            <SearchIcon/>
                        </Grid>
                        <Grid item xs={11}>
                            <TextField fullWidth id="input-with-icon-grid" label="Name of the item"/>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item xs={12}>
                            <FormControl className={classes.formControl}>
                                <NativeSelect
                                    className={classes.selectEmpty}
                                    value={state.age}
                                    name="age"
                                    onChange={handleChange}
                                    inputProps={{'aria-label': 'age'}}
                                >
                                    <option value="" disabled>
                                        Placeholder
                                    </option>
                                    <option value={10}>Ten</option>
                                    <option value={20}>Twenty</option>
                                    <option value={30}>Thirty</option>
                                </NativeSelect>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>

                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={3}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Option