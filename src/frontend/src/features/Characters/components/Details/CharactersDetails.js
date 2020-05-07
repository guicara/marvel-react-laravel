import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import CharacterComic from './CharacterComic';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

function CharactersDetails(props) {
    const { name, description, comics } = props;

    return (
        <article>
            <Typography variant="h2" component="h1" gutterBottom>
                {name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                {description}
            </Typography>
            {Array.isArray(comics) && comics.length > 0 && (
                <Fragment>
                    <br />
                    <Typography variant="h4" component="h4" gutterBottom>
                        Comics
                    </Typography>
                    <Grid container spacing={3}>
                        {comics.map((comic) => (
                            <CharacterComic key={comic.id} item={comic} />
                        ))}
                    </Grid>
                </Fragment>
            )}
            <br />
            <Button variant="contained" color="primary" component={RouterLink} to="/">
                Back to list
            </Button>
        </article>
    );
}

CharactersDetails.propTypes = {
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    comics: PropTypes.array,
};

export default CharactersDetails;
