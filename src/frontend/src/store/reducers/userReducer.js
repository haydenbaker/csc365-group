const initState = {
    type: 'user',
    infoType: 'Account ID',
    info: '',
}

const userReducer = (state=initState, action=null) => {
    switch(action.type){
        case 'CHANGE_USER':
            var newUserType = (state.type === 'user') ? ('manager') : ('user')
            var newInfoType = (state.type === 'user') ? ('Airline') : ('Account ID')
            if(action.currentUser === 'User' && state.type === 'user'){
                newUserType = 'user'
                newInfoType = 'Account ID'
            }else if(action.currentUser === 'Manager' && state.type === 'manager'){
                newUserType = 'manager'
                newInfoType = 'Airline'
            }
            return{
                ...state,
                type: newUserType,
                infoType: newInfoType
            }
        case 'SAVE_INFO':
            return{
                ...state,
                info: action.userInfo
            }
        default:
            return state;
    }
}

export default userReducer;