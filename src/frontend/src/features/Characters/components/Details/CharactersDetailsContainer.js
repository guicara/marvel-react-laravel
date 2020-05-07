import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCharactersDetails } from '../../store/actions';
import { Helmet } from 'react-helmet';
import CharactersDetails from './CharactersDetails';
import isEmpty from '../../../../app/utils/isEmpty';
import CircularProgress from '@material-ui/core/CircularProgress';

function CharactersDetailsContainer(props) {
    const { item, loading } = props;

    // Fetch the API
    const id = props.match.params.id;
    useEffect(() => props.getCharactersDetails(id), []);

    if (loading || isEmpty(item)) {
        return <CircularProgress />;
    }

    return (
        <Fragment>
            <Helmet>
                <title>{item.name}</title>
            </Helmet>
            <CharactersDetails name={item.name} description={item.description} comics={item.comics} />
        </Fragment>
    );
}

CharactersDetailsContainer.propTypes = {
    getCharactersDetails: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    item: state.characters.charactersDetails,
    loading: state.characters.charactersDetailsLoading,
});

export default connect(mapStateToProps, { getCharactersDetails })(CharactersDetailsContainer);
