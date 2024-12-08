let user = {}

export const setCurrentUser = (newUser) => {
    user = newUser
} 
export const getCurrentUser = () => {
    return user
}