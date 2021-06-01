import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '50ch',
        }
    },
    button: {
        width: '20ch',
        display: 'block',
        'margin-top': '20px'
    }
}));

export default function AddressForm({updateAddress, setActiveLink}) {
    const [address, setAddress] = useState({name: '', address: '', notes: ''})
    const classes = useStyles();

    const handleSubmit = e => {
        e.preventDefault();
        updateAddress(address);
        setActiveLink(2)
        // go to review screen
    }

    return (
        <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
            <TextField id="name" label="Name" variant="filled" required value={address.name} onChange={e => setAddress(v => ({...v, name: e.target.value}))} />
            <TextField id="address" label="Address" variant="filled" required value={address.address} onChange={e => setAddress(v => ({...v, address: e.target.value}))} />
            <TextField id="notes" label="Instructions for driver" variant="filled" value={address.notes} onChange={e => setAddress(v => ({...v, notes: e.target.value}))}/>
            <div className='flex'>
            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={!address.name || !address.address}>
                Review Order
            </Button>
            </div>
        </form>
    );
}