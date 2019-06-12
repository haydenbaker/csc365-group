export const change = (currentUser) => {
    return{
        type: 'CHANGE_USER',
        currentUser: currentUser
    }
}

export const save = (userInfo) => {
    return{
        type: 'SAVE_INFO',
        userInfo: userInfo
    }
}