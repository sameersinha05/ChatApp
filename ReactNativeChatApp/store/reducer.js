import { combineReducers } from 'redux'
import { themeReducer } from './theme/reducer'
import { apiEnvironmentReducer } from './apiEnvironment/reducer'


const rootReducer = combineReducers({
    themeReducer,
    apiEnvironmentReducer
})

export default rootReducer;