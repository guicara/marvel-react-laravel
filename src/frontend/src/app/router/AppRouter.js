import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import routes from './routes';

function AppRouter() {
    return (
        <Switch>
            {routes.map((route, index) => {
                return <Route key={index} path={route.path} exact={route.exact} component={route.main} />;
            })}
        </Switch>
    );
}

export default withRouter(AppRouter);
