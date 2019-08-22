import * as types from './actionTypes'

export function updateTheme(theme){
    return (dispatch) => {

        dispatch(themeChanged(theme))
    }
}

const themeChanged = (theme) => ({
    type: types.UPDATE_THEME,
    theme: theme
})