export const userReducer = (state = {}, action) => {
    const { type } = action
    switch (type) {
        case '@user/loggedUser':
            return action.payload 
        default:
            return state
    }
}