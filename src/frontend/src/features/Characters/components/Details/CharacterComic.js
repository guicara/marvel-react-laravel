import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import styles from './CharacterComic.module.scss';

function CharacterComic(props) {
    const { item } = props;

    return (
        <Grid item xs={12} md={6}>
            <Paper className={styles.paper}>
                <Typography variant="h6" component="h6" gutterBottom>
                    {item.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    {item.description}
                </Typography>
                <br />
                <Typography variant="body2" gutterBottom>
                    {item.pageCount} pages | {item.price} USD
                </Typography>
            </Paper>
        </Grid>
    );
}

CharacterComic.propTypes = {
    item: PropTypes.object.isRequired,
};

export default CharacterComic;
