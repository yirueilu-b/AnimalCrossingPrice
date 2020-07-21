import React from 'react';
// import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import IconButton from '@material-ui/core/IconButton';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import {makeStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import wave from "./wave.svg";

const Title = "動森魚類蟲類快速查價";

const backToTopStyle = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

function ScrollTop(props) {
    const {children, window} = props;
    const classes = backToTopStyle();
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });
    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({behavior: 'smooth', block: 'center'});
        }
    };
    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    );
}

const appBarStyle = makeStyles((theme) => ({
    root:{
    },
    iconButton1: {
        marginLeft: 'auto'
    },
    iconButton2: {
        marginLeft: theme.spacing(0)
    },
}));

function BackToTop(props) {
    const classes = appBarStyle();
    return (
        <React.Fragment>
            <CssBaseline/>
            <AppBar className={classes.root} color="default">
                <Toolbar>
                    <Typography variant="h6">{Title}</Typography>
                    <Tooltip title="切換佈景主題">
                        <IconButton className={classes.iconButton1} edge="end" color="default" aria-label="切換佈景主題" onClick={props.onToggleDark}>
                            {props.theme.palette.type === "light" ? <Brightness7Icon/> : <Brightness4Icon/>}
                        </IconButton>
                    </Tooltip>
                    {/*<Tooltip title="切換佈景主題">*/}
                        {/*<IconButton className={classes.iconButton2} edge="end" color="default" aria-label="切換佈景主題" onClick={props.onToggleDark}>*/}
                            {/*{props.theme === "light" ? <Brightness7Icon/> : <Brightness4Icon/>}*/}
                        {/*</IconButton>*/}
                    {/*</Tooltip>*/}
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <ScrollTop {...props}>
                <Fab size="small">
                    <KeyboardArrowUpIcon/>
                </Fab>
            </ScrollTop>
        </React.Fragment>
    );
}

export default BackToTop