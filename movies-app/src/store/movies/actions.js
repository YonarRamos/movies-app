export const AllMoviesAction = ( movies ) => {
    return {
        type: '@movies/all',
        payload: movies
    }
}

export const MoviesByNameAction = ( name ) => {
    return {
        type: '@movies/filterByName',
        name
    }
}

export const MoviesByStudioAction = ( studioId ) => {
    return {
        type: '@movies/filterByStudio',
        studioId
    }
}