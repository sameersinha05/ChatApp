import * as types from './actionTypes'
import { combineReducers } from 'redux'

let initialState = { theme: 'light' }

const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_THEME:
            return {
                        ...state,
                        theme: action.theme
                    }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    themeReducer
})

export default rootReducer;