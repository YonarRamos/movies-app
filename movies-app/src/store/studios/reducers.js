export const studiosReducer = (state = [], action) => {
    const { type } = action
    switch (type) {
        case '@studios/all':
            return action.payload 
        default:
            return state
    }
}