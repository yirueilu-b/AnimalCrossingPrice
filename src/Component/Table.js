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
import TablePagination from '@material-ui/core/TablePagination';
import {useEffect} from 'react'
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';

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
const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    title: {
        paddingLeft:theme.spacing(6),
        textAlign:'center',
        flex: '1 1 100%',
    },
}));
const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    return (
        <Toolbar className={classes.root}>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                價目表
            </Typography>
            <Tooltip title="過濾器">
                <IconButton aria-label="過濾器">
                    <FilterListIcon/>
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
};

export default function CustomizedTables(props) {
    const classes = useStyles();
    // console.log('props.data', props.data, props.filterName);
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    useEffect(() => {
        console.log(props.data.length);
        setPage(0);
    }, [props.data.length]);

    return (
        <TableContainer className={classes.tablePaper} component={Paper}>
            <EnhancedTableToolbar/>
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

                        props.data.slice(page * 10, page * 10 + 10)
                            .map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell align="center">{row.name}</StyledTableCell>
                                        <StyledTableCell align="center">{row.price}</StyledTableCell>
                                        <StyledTableCell align="center">{row.location}</StyledTableCell>
                                        <StyledTableCell align="center">{row.time}</StyledTableCell>
                                    </StyledTableRow>
                                )
                            )
                    }
                </TableBody>

            </Table>
            <TablePagination
                labelDisplayedRows={({from, to, count}) => `${from}~${to}/${count}`}
                labelRowsPerPage={''}
                rowsPerPageOptions={[10]}
                component="div"
                count={props.data.length}
                rowsPerPage={10}
                page={page}
                onChangePage={handleChangePage}
            />
        </TableContainer>

    );
}