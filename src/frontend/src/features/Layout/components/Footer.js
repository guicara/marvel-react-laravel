import React from 'react';
import styles from './Footer.module.scss';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

function Footer() {
    return (
        <footer className={styles.root}>
            <Container fixed>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography>
                            <Link href="https://github.com/guicara/marvel-react-laravel">GitHub repository</Link>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justify={'flex-end'}>
                            <span>© 2020 Guillaume MOREL-BAILLY</span>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
}

export default Footer;
