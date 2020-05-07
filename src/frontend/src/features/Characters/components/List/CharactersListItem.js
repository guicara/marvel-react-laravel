import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { truncateText } from '../../../../app/utils/text';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './CharactersListItem.module.scss';

const useStyles = makeStyles({
    media: {
        height: 140,
    },
});

function CharactersListItem(props) {
    const classes = useStyles();

    return (
        <Grid item xs={6} md={4} lg={3}>
            <Card className={styles.card}>
                <CardActionArea>
                    <RouterLink to={'/characters/' + props.id}>
                        <CardMedia className={classes.media} image={props.thumbnail} title="Contemplative Reptile" />
                        <CardContent className={styles.cardContent}>
                            <Typography gutterBottom variant="h6" component="h2" color="secondary">
                                {props.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {truncateText(props.description, 60, '...')}
                            </Typography>
                        </CardContent>
                    </RouterLink>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" component={RouterLink} to={'/characters/' + props.id}>
                        Learn More
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}

CharactersListItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    thumbnail: PropTypes.string,
};

export default CharactersListItem;
