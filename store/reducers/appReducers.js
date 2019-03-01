import * as types from '../../actionTypes/appActionTypes'

const initalState = {
    users: [],
    currentUser: null
}

const app = (state = initalState, action) => {
    switch (action.type) {
        case types.ADD_USER:
            return { ...state, users: state.users.concat(action.user) }
        case types.ADD_SCHEDULE:
            return {
                ...state, users: state.users.map(user => user.index === action.user.index ? { ...user, schedules: user.schedules.concat(action.schedule) } : user)
            }
        case types.EDIT:
            return {
                ...state,
                users: state.users.map((user, i) => i === action.user.index ?
                    {
                        ...user,
                        fullname: action.user.fullname,
                        password: action.user.password,
                        username: action.user.username,
                        email: action.user.email,
                        license: action.user.license,
                    } : user)
            }
        case types.RESET:
            return { ...state, users: [], currentUser: null }
        case types.LOGIN:
            return { ...state, currentUser: action.user }
        case types.LOGOUT:
            return { ...state, currentUser: null }
        case 'REHYDRATE':
            return { ...state, ...action.payload.dataReducer }
        default:
            return state
    }
}

export default app