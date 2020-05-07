import axios from '../../../app/api/axios';
import {
    FETCH_CHARACTERS_REQUEST,
    FETCH_CHARACTERS_SUCCESS,
    FETCH_CHARACTERS_FAILURE,
    FETCH_CHARACTERS_DETAILS_REQUEST,
    FETCH_CHARACTERS_DETAILS_SUCCESS,
    FETCH_CHARACTERS_DETAILS_FAILURE,
    SET_CHARACTERS_PAGE,
} from './types';

// List

export const getCharacters = () => (dispatch) => {
    dispatch(setCharactersRequest());

    axios
        .get('character')
        .then((res) =>
            dispatch({
                type: FETCH_CHARACTERS_SUCCESS,
                payload: res.data,
            })
        )
        .catch((err) =>
            dispatch({
                type: FETCH_CHARACTERS_FAILURE,
                payload: err.errors,
            })
        );
};

export const setCharactersRequest = () => {
    return {
        type: FETCH_CHARACTERS_REQUEST,
    };
};

export const setCharactersPage = (page) => {
    return {
        type: SET_CHARACTERS_PAGE,
        payload: page,
    };
};

// Details

export const getCharactersDetails = (id) => (dispatch) => {
    dispatch(setCharactersDetailsRequest());

    axios
        .get('character/' + id)
        .then((res) =>
            dispatch({
                type: FETCH_CHARACTERS_DETAILS_SUCCESS,
                payload: res.data,
            })
        )
        .catch((err) =>
            dispatch({
                type: FETCH_CHARACTERS_DETAILS_FAILURE,
                payload: err.errors,
            })
        );
};

export const setCharactersDetailsRequest = () => {
    return {
        type: FETCH_CHARACTERS_DETAILS_REQUEST,
    };
};
