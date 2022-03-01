export const moviesReducer = (state = [], action) => {
    const { type } = action
    switch (type) {
        case '@movies/all':
            return action.payload
        case '@movies/filterByName':
            return state.filter(el=> el.name.includes(action.name))
        case '@movies/filterByStudio':
            return state.filter(el=> el.studioId == action.studioId)
        default:
            return state
    }
}