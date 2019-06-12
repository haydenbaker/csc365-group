const initState = {
    yearlyRevenue: [ ],
    // element => airline, year, months[], total

    loading: true
}

const managerReducer = (state=initState, action=null) => {
    switch(action.type){
        case 'INIT':
            return{
                ...state,
                yearlyRevenue: action.yearlyRevenue,
                loading: false,
            }
        case 'CLEAN':
            return{
                yearlyRevenue:[],
                loading: true
            }
        case 'DESTROY':
            return initState;
        default:
            return state;
    }
}

export default managerReducer;