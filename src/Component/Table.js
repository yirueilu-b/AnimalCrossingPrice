import React from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Image from './bg.png';
import Paper from "@material-ui/core/Paper/Paper";
import TableContainer from '@material-ui/core/TableContainer';

const useStyles = makeStyles((theme) => ({
    table: {
        // minWidth: 300,
        // maxWidth: '100%',
    },
    tablePaper: {
        marginTop: theme.spacing(2),
        marginBottom: '15vh'
    }
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        backgroundImage: `url(${Image})`,
        padding: theme.spacing(2),
        fontSize: 14,
    },
    body: {
        fontSize: 14,
        padding: theme.spacing(2),
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export default function CustomizedTables(props) {
    const classes = useStyles();
    // console.log('props.data', props.data, props.filterName);
    return (
        <TableContainer className={classes.tablePaper} component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <colgroup>
                    <col style={{width: '25%'}}/>
                    <col style={{width: '25%'}}/>
                    <col style={{width: '25%'}}/>
                    <col style={{width: '25%'}}/>
                </colgroup>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">中文名稱</StyledTableCell>
                        <StyledTableCell align="center">價格</StyledTableCell>
                        <StyledTableCell align="center">出沒地點</StyledTableCell>
                        <StyledTableCell align="center">出沒時間</StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {
                        props.data.map((row) => (row.name.indexOf(props.filterName) !== -1 ?
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.price}</StyledTableCell>
                                    <StyledTableCell align="center">{row.location}</StyledTableCell>
                                    <StyledTableCell align="center">{row.time}</StyledTableCell>
                                </StyledTableRow>
                                :
                                <StyledTableRow key={row.name}>
                                    <></>
                                </StyledTableRow>
                            )
                        )
                    }
                </TableBody>

            </Table>
        </TableContainer>
    );
}