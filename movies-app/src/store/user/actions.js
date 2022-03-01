export const loggedUserAction = ( user ) => {
    return {
        type: '@user/loggedUser',
        payload: user
    }
}