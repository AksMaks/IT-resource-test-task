import {combineReducers, createStore} from 'redux'
import { reducer as formReducer } from 'redux-form'

import PeopleReducer from './PeopleReducer'

let redusers = combineReducers({
    form: formReducer,
    people: PeopleReducer
});

let store = createStore(redusers);

export default store;