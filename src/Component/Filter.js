// Dialog
import React from "react";
import {makeStyles} from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grow from '@material-ui/core/Grow';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';

const allOption = [
    {placeholder: '類別', helperText: '選擇物產類別', type: ['魚', '蟲']},
    {placeholder: '出現地點', helperText: '選擇出現地點', type: ['海上', '池塘', '河邊']},
];

const dialogStyles = makeStyles((theme) => ({
    dialogPaper: {
        height: '40vh',
        maxHeight: 700,
        width: '90vw',
        maxWidth: 500,
    },
    option: {
        marginTop: theme.spacing(2),
        width: '80%',
    },
    confirmButton: {
        color: theme.palette.success.light,
        borderColor: theme.palette.success.light
    },
    cancelButton: {
        color: theme.palette.error.main,
        borderColor: theme.palette.error.main
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow in={ref} {...props} />
});

function OptionComponent(props) {
    return (
        <FormControl className={props.classes.option}>
            <InputLabel shrink htmlFor="age-native-label-placeholder">
                {props.placeholder}
            </InputLabel>
            <NativeSelect
                value={props.state.age}
                onChange={props.handleChange}
                name="age"
                inputProps={{'aria-label': 'age'}}
            >
                {
                    props.options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        )
                    )
                }
            </NativeSelect>
        </FormControl>
    );
}

export default function AlertDialogSlide() {
    const classes = dialogStyles();
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState({type: ''});
    // const [price, setPrice] = React.useState({price: ''});
    // const [location, setLocation] = React.useState({location: ''});
    // const [time, setTime] = React.useState({time: ''});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setType({type: event.target.value});
    };

    return (
        <div>
            <Tooltip title="過濾器">
                <IconButton aria-label="過濾器" onClick={handleClickOpen}>
                    <FilterListIcon/>
                </IconButton>
            </Tooltip>
            <Dialog
                maxWidth={'lg'}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="設定篩選條件"
                aria-describedby="選取條件以篩選物產"
            >
                <DialogTitle id="alert-dialog-slide-title">{"設定篩選條件"}</DialogTitle>
                <DialogContent className={classes.dialogPaper}>
                    {/*<DialogContentText id="alert-dialog-slide-description">*/}
                    {/*</DialogContentText>*/}
                    {
                        allOption.map((options) => (
                                <OptionComponent
                                    key={options.placeholder}
                                    placeholder={options.placeholder}
                                    classes={classes}
                                    state={type}
                                    handleChange={handleChange}
                                    options={options.type}
                                />
                            )
                        )
                    }
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" className={classes.confirmButton} onClick={handleClose}>
                        確定
                    </Button>
                    <Button variant="outlined" className={classes.cancelButton} onClick={handleClose}>
                        取消
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}