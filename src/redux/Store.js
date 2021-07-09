import {combineReducers, createStore} from 'redux'
import { reducer as formReducer } from 'redux-form'

import MainReducer from './MainReducer'
import ParticipantsReducer from './ParticipantsReducer'
import ProfileReducer from './ProfileReducer'

let redusers = combineReducers({
    form: formReducer,
    main: MainReducer,
    participants: ParticipantsReducer,
    profile: ProfileReducer
});

let store = createStore(redusers);

export default store;