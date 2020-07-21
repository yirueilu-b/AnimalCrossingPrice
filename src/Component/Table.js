import React from 'react';
import {withStyles, makeStyles, useTheme} from '@material-ui/core/styles';
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
import TableSortLabel from '@material-ui/core/TableSortLabel';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const rowPerPage = 8;

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {id: 'name', numeric: false, disablePadding: true, label: '中文名稱'},
    {id: 'price', numeric: true, disablePadding: true, label: '價格'},
    {id: 'location', numeric: false, disablePadding: true, label: '出沒地點'},
    {id: 'time', numeric: false, disablePadding: true, label: '出沒時間'},
];

function EnhancedTableHead(props) {
    const {order, orderBy, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align='left'
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            style={{'paddingLeft': 12}}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


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
        paddingLeft: 12,
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
        backgroundImage: `url(${Image})`,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    title: {
        paddingLeft: theme.spacing(6),
        textAlign: 'center',
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

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(0),
    },
    icon: {
        padding: theme.spacing(1),
    }
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const {count, page, rowsPerPage, onChangePage} = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                className={classes.icon}
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton
                className={classes.icon}
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                className={classes.icon}
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                className={classes.icon}
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </div>
    );
}

export default function CustomizedTables(props) {
    const classes = useStyles();
    // console.log('props.data', props.data, props.filterName);
    const [page, setPage] = React.useState(0);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('name');
    const emptyRows = rowPerPage - Math.min(rowPerPage, props.data.length - page * rowPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    useEffect(() => {
        // console.log(props.data.length);
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
                <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                    rowCount={props.data.length}
                />
                <TableBody>
                    {

                        stableSort(props.data, getComparator(order, orderBy))
                            .slice(page * rowPerPage, page * rowPerPage + rowPerPage)
                            .map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell align="left">{row.name}</StyledTableCell>
                                        <StyledTableCell align="left">{row.price}</StyledTableCell>
                                        <StyledTableCell align="left">{row.location}</StyledTableCell>
                                        <StyledTableCell align="left">{row.time}</StyledTableCell>
                                    </StyledTableRow>
                                )
                            )
                    }
                    {emptyRows > 0 && (
                    <TableRow style={{height: 53 * emptyRows}}>
                    <TableCell colSpan={6}/>
                    </TableRow>
                    )}
                </TableBody>

            </Table>
            <TablePagination
                labelDisplayedRows={({from, to, count}) => `${from}~${to}筆 / ${count}筆`}
                labelRowsPerPage={''}
                rowsPerPageOptions={[rowPerPage]}
                component="div"
                // colSpan={3}
                count={props.data.length}
                rowsPerPage={rowPerPage}
                page={page}
                // SelectProps={{
                //     inputProps: {'aria-label': 'rows per page'},
                //     native: true,
                // }}
                onChangePage={handleChangePage}
                ActionsComponent={TablePaginationActions}
            />
        </TableContainer>

    );
}