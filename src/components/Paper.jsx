import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            padding: theme.spacing(2),
            margin: theme.spacing(1, 2),
            width: theme.spacing(24),
            height: theme.spacing(16),
            cursor: 'pointer'
        }
    },

}));

export default function SimplePaper({children, selected }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper variant={selected ? null : 'outlined'} elevation={selected ? 5 : 0}>{children}</Paper>
        </div>
    );
}