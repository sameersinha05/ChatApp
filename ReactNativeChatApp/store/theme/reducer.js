import * as types from './actionTypes'

let initialState = { theme: 'light' }

export const themeReducer = (state = initialState, action) => {
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