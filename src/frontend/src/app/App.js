import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/configureStore';
import Layout from '../features/Layout/components/Layout';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../features/Layout/theme';

const store = configureStore();

function disableLoadingScreen() {
    const loadingIndicator = document.getElementById('app-loading-indicator');
    const body = document.getElementsByTagName('body')[0];

    if (loadingIndicator) {
        loadingIndicator.classList.add('available');
        loadingIndicator.outerHTML = '';

        body.style.overflow = 'visible';
    }
}

function App() {
    useEffect(() => {
        const timer = setTimeout(() => {
            disableLoadingScreen();
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <Layout />
                </BrowserRouter>
            </Provider>
        </ThemeProvider>
    );
}

export default App;
