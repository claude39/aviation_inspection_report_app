import * as types from '../actionTypes/appActionTypes'

export const addUser = user => {
    return dispatch => {
        dispatch({ type: types.ADD_USER, user: user })
    }
}

export const addSchedule = (schedule, user) => {
    return dispatch => {
        dispatch({ type: types.ADD_SCHEDULE, schedule: schedule, user: user })
    }
}

export const resetApp = () => {
    return dispatch => {
        dispatch({ type: types.RESET })
    }
}

export const login = user => {
    return dispatch => {
        dispatch({ type: types.LOGIN, user: user })
    }
}

export const logout = () => {
    return dispatch => {
        dispatch({ type: types.LOGOUT })
    }
}

export const editUser = (user) => {
    return dispatch => {
        dispatch({ type: types.EDIT, user: user })
    }
}

export const deletSchedule = (user, id) => {
    return dispatch => {
        dispatch({ type: types.DELETE_SCHEDULE, id: id, user: user })
    }
}

export const updateCurrentUser = user => {
    return dispatch => {
        dispatch({type: types.UPDATE_CURRENT_USER, currentUser: user})
    }
}