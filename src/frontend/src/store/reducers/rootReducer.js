import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import userReducer from './userReducer';
import managerReducer from './managerReducer';
import customerReducer from './customerReducer';

const rootReducer = combineReducers({
    form: formReducer,
    user: userReducer,
    manager: managerReducer,
    customer: customerReducer
});

export default rootReducer;