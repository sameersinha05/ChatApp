import * as types from './actionTypes'

let initialState = { 
    baseUrl: '', 
    context: ''
};

export const apiEnvironmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_API_ENV:
            return {
                        ...state,
                        baseUrl: action.apiEnvironments.baseUrl,
                        context: action.apiEnvironments.context
                    }
        default:
            return state
    }
}
