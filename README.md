# Marvel

This app displays a list of Marvel superheroes in a simple React app that fetch data from the [Marvel Comics API](https://developer.marvel.com/).

Instead of querying the Marvel Comics API, the [React](https://reactjs.org/) app query data from a local API developed with [Laravel](https://laravel.com/). Thus, even if the Marvel Comics API is down (or if you have exceeded the rate limit), the user can still use the app. A cron should be configured on the web server to call the Laravel Scheduler that will execute the custom command to fetch and store data each day.

Please note that in order to use the Marvel API you need to create an account on the portal dedicated to developers in order to get API key. 

Also, keep in mind that this is just a test application. Not all the Marvel API endpoints are available here (only the lists of characters and comics).

## Requirements

A Docker installation up and running on your host. That's all!

## Getting started

### Create environment files

Open up a terminal and navigate to the root directory of this project.

```
cp .env.example .env
```

Change the `MARVEL_API_PUBLIC_KEY` and `MARVEL_API_PRIVATE_KEY` constants with your public and private Marvel API keys.

Then, create an environment file for the Laravel app:

```
cp src/api/.env.example src/api/.env
```

For your local Docker environment, you don't need to change the default Laravel Dotenv file.

And finally, for the React app:

```
cp src/frontend/.env.example src/frontend/.env
```

### Docker

This project provides a Docker setup for building your local development environment.

Open up a terminal and navigate to the root directory of this project.

The first thing you need to do is run the Docker Compose `build` command to build the custom image of the app container:

```
docker-compose build
```

Then, to start the Docker containers in the background and leaves them running, run the following command:

```
docker-compose up -d
```

_NB : by default, the MySQL data is persisted in your host `/dataDocker/marvel` directory. You can change the `docker-composer.yml` file if you want to change the directory or disable the persistence._

### API

To open a bash in the PHP container, run this command:

```
docker exec -it marvel_php bash
```

Then, you'll need to executed few Laravel artisan commands to set up the app:

```
php artisan key:generate
php artisan config:cache
php artisan migrate:install
php artisan migrate:fresh
```

If you want to seed the database with Fake data (in order to test the app):

```
php artisan db:seed
```

However, if you want to fetch real data from the remote Marvel API, run the following custom command. **Please note this process may take several minutes (around 1500 characters and 47000 comics!).**

```
php artisan marvel:fetch
```

You should now have access to http://localhost:8080/.

### Frontend app

You don't need to have npm installed on your host. We have created a specific container with the `npm` command available.

First, install the dependencies:

```
docker-compose run --rm npm install
```

Then run the command to build the app for production to the `build` folder:

```
docker-compose run --rm npm build
```

You should now have access to http://localhost:8090/.

## About the API

### Available API endpoints

Base URL: http://localhost:8080.

* Fetch characters: `/api/v1/character`
* Fetch a specific character: `/api/v1/character/<id>`
* Fetch comics: `/api/v1/comic`
* Fetch a specific comic: `/api/v1/comic/<id>`

Please note: `/api/v1/character` and `/api/v1/comic` endpoints are configured with a 1 hour cache. If you want to manually clear the cache, run the `cache:clear` artisan command. 

### Custom commands

We have created a custom Laravel command to fetch characters and comics from the Marvel API.

```
// Fetch only the characters
php artisan marvel:fetch character

// Fetch only the comics
php artisan marvel:fetch comic

// Fetch all
php artisan marvel:fetch
```

### Scheduler

The Laravel Scheduler is configured to call the `marvel:fetch` each day. On your local environment it is not necessary to configure a Cron to start the scheduler. However, when you will deploy your app, you can add the following Cron entry to your server.

```
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

This Cron will call the Laravel command scheduler every minute.

### Testing

You may use the test Artisan command to run the application Feature tests.

```
php artisan test
```


## About the frontend app

This app was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

Using the npm Docker container you can run:

#### `docker-compose run --rm npm run start`

Runs the app in the development mode.<br />

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `docker-compose run --rm npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

## License

This project is an open-source software licensed under the [MIT license](https://opensource.org/licenses/MIT).

You can see [LICENSE.md](./LICENSE.md) for more details.
