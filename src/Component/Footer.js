import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import wave from './wave.svg';

function Copyright() {
    return (
        <Typography variant="body2">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                YirueiLu
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 'auto',
        bottom: 0,
    },

    footer: {
        padding: theme.spacing(0,2,3, 2),
        // backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
        backgroundImage: `url(${wave})`,
        backgroundPosition: 'center bottom',
        color:theme.palette.text.hint,
    },
}));

export default function StickyFooter() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Typography variant="body1">動物森友會快速查詢價格表 ( 七月 )</Typography>
                    <Copyright/>
                </Container>
            </footer>
        </div>
    );
}