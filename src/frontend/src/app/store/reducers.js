import { combineReducers } from 'redux';
import charactersReducer from '../../features/Characters/store/reducers';
//import comicsReducer from '../../features/Comics/store/reducers'

export default combineReducers({
    characters: charactersReducer,
    //comics: comicsReducer,
});
