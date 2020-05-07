import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { getCharacters, setCharactersPage } from '../../store/actions';
import CharactersListItem from './CharactersListItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './CharactersListContainer.module.scss';

function scrollToTop(scrollDuration) {
    let scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval(function () {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15);
}

function CharactersListContainer(props) {
    const { items, itemsPaginated, loading, itemsPerPage, setCharactersPage, getCharacters } = props;
    const [page, setPage] = useState(1);
    const totalPage = Math.round(items.length / itemsPerPage);

    // Fetch the API
    useEffect(() => getCharacters(), []);

    function handlePagination(page) {
        setPage(page);
        setCharactersPage(page);
        scrollToTop(400);
    }

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Fragment>
            <Helmet>
                <title>Superheroes</title>
            </Helmet>
            <Grid container spacing={3}>
                {itemsPaginated.map((item) => (
                    <CharactersListItem key={item.id} name={item.name} description={item.description} thumbnail={item.thumbnail} id={item.id} />
                ))}
            </Grid>
            <Grid container direction="row" justify="space-between" alignItems="flex-start" className={styles.pagination}>
                <Button variant="contained" disabled={page === 1} onClick={() => handlePagination(page - 1)}>
                    Previous
                </Button>
                <Button variant="contained" disabled={page >= totalPage} onClick={() => handlePagination(page + 1)}>
                    Next
                </Button>
            </Grid>
        </Fragment>
    );
}

CharactersListContainer.propTypes = {
    getCharacters: PropTypes.func.isRequired,
    setCharactersPage: PropTypes.func.isRequired,
    items: PropTypes.array,
    loading: PropTypes.bool,
    itemsPerPage: PropTypes.number,
};

const mapStateToProps = (state) => ({
    items: state.characters.characters,
    itemsPaginated: state.characters.charactersPaginated,
    loading: state.characters.charactersLoading,
    itemsPerPage: state.characters.charactersPerPage,
});

export default connect(mapStateToProps, { getCharacters, setCharactersPage })(CharactersListContainer);
