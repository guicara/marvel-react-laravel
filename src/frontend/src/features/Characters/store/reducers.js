import {
    FETCH_CHARACTERS_REQUEST,
    FETCH_CHARACTERS_SUCCESS,
    FETCH_CHARACTERS_FAILURE,
    FETCH_CHARACTERS_DETAILS_REQUEST,
    FETCH_CHARACTERS_DETAILS_SUCCESS,
    FETCH_CHARACTERS_DETAILS_FAILURE,
    SET_CHARACTERS_PAGE,
} from './types';

const initialState = {
    characters: [],
    charactersPaginated: [],
    charactersLoading: false,
    charactersPerPage: 16,
    charactersDetails: {},
    charactersDetailsLoading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        // Characters
        case FETCH_CHARACTERS_REQUEST:
            return {
                ...state,
                charactersLoading: true,
            };
        case FETCH_CHARACTERS_SUCCESS:
            const items = action.payload.items;

            return {
                ...state,
                characters: items,
                charactersPaginated: items.slice(0, state.charactersPerPage),
                charactersLoading: false,
            };
        case FETCH_CHARACTERS_FAILURE:
            return {
                ...state,
                charactersLoading: false,
            };
        case SET_CHARACTERS_PAGE:
            const page = action.payload;
            const offset = page > 1 ? (page - 1) * state.charactersPerPage : 0;

            return {
                ...state,
                charactersPaginated: state.characters.slice(offset, offset + state.charactersPerPage),
            };

        // Characters details
        case FETCH_CHARACTERS_DETAILS_REQUEST:
            return {
                ...state,
                charactersDetailsLoading: true,
            };
        case FETCH_CHARACTERS_DETAILS_SUCCESS:
            return {
                ...state,
                charactersDetails: action.payload.item,
                charactersDetailsLoading: false,
            };
        case FETCH_CHARACTERS_DETAILS_FAILURE:
            return {
                ...state,
                charactersDetailsLoading: false,
            };

        default:
            return state;
    }
}
