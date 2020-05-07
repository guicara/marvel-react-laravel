import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

function Header() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" color={'primary'}>
                <Container fixed>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Marvel Comics
                        </Typography>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default Header;
