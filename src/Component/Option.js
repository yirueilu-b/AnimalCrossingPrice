import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        height: 96,
    },
    textField: {
    },
//style for font size
    resize: {
        fontSize: 18
    },
}));


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
                <Grid item xs={10} md={8} container spacing={1}
                      justify='center'
                      alignItems="flex-end"
                      direction="row"
                >
                    <Grid container item xs={1} md={1}
                          alignItems="flex-end"
                          justify='flex-end'>
                        <SearchIcon/>
                    </Grid>
                    <Grid item xs={9} md={7}>
                        <TextField
                            onChange={props.handleFilterNameChange}
                            InputProps={{
                                classes: {
                                    input: classes.resize,
                                },
                            }}
                            className={classes.textField}
                            fullWidth id="input-with-icon-grid"
                            label="輸入名稱以查詢"
                            autoFocus={true}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default Option