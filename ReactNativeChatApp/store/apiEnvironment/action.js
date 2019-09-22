import * as types from './actionTypes'

export function setApiEnvironments(apiEnvironments){
    return (dispatch) => {

        dispatch(themeChanged(apiEnvironments))
    }
}

const themeChanged = (apiEnvironments) => ({
    type: types.SET_API_ENV,
    apiEnvironments: apiEnvironments
})