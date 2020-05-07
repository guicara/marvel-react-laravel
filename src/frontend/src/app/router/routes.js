import { CharactersListContainer, CharactersDetailsContainer } from '../../features/Characters';

/**
 * Defines the routes of the application.
 */
const routes = [
    {
        path: '/',
        exact: true,
        main: CharactersListContainer,
    },
    {
        path: '/characters/:id',
        exact: true,
        main: CharactersDetailsContainer,
    },
];

export default routes;
