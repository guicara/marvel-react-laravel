import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Header from './Header';
import Footer from './Footer';
import AppRouter from '../../../app/router/AppRouter';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import styles from './Layout.module.scss';
import '../assets/scss/main.scss';

function Layout() {
    return (
        <Fragment>
            <CssBaseline />
            <Helmet titleTemplate={'%s | Marvel'} defaultTitle="Marvel" />
            <Header />
            <main className={styles.main} role="main">
                <Container fixed>
                    <AppRouter />
                </Container>
            </main>
            <Footer />
        </Fragment>
    );
}

export default Layout;
