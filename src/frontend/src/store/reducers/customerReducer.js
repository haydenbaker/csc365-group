const initState = {
    flights:[],

    flightHistory:[],


    oldReservation: [],

    newReservation: [],

    seatKeys: [ 'FlightNo', 'Src.', 'Dest.', 'Date', 'SeatID', 'Class', 'Loc.', 'Cost'],

    historyKeys: [ 'FlightNo', 'Src.', 'Dest.', 'Date', 'SeatID', 'Class', 'Loc.'],
    
    didCancel: false,
    didReserve: false,
    didChange: false,
    error: false,
    isSearching: false,
    reload: false,
    loading: true
}

const customerReducer = (state=initState, action=null) => {
    switch(action.type){
        case 'INIT_HISTORY':
            return{
                ...state,
                flightHistory: action.flightHistory
            }
        case 'CANCEL_RESERVATION':
            var reservation = [action.Reservation]
            var canceled = true
            var cancelError = false
            if(action.Reservation === ''){
                reservation = []
                canceled = false
                cancelError = true
            }
            return{
                ...state,
                didCancel: canceled,
                didReserve: false,
                didChange: false,
                error: cancelError,
                newReservation: reservation,
                reload: !state.reload
            }
        case 'GET_SEATS':
            return{
                ...state,
                flights: action.flights,
                isSearching: true,
                loading: false
            }
        case 'START_SEARCH':
            return{
                ...state,
                flights: [],
                isSearching: false
            }
        case 'RESERVE':
            var newReservation = [action.newReservation]
            var reserved = true
            var reserveError = false
            console.log(action.newReservation)
            if(action.newReservation === ''){
                console.log("YES")
                newReservation = []
                reserved = false
                reserveError = true 
            }
            return{
                ...state,
                didCancel: false,
                didReserve: reserved,
                didChange: false,
                error: reserveError,
                newReservation: newReservation,
                reload: !state.reload,
                isSearching: false
            }
        case 'CHANGE_RESERVATION':
            var oldReservation = [action.oldReservation]
            var changedReservation = [action.newReservation]
            var changed = true
            var changeError = false
            if(action.oldReservation === undefined){
                oldReservation = []
                changedReservation = []
                changed = false
                changeError = true
            }
            return{
                ...state,
                didCancel: false,
                didReserve: false,
                didChange: changed,
                error: changeError,
                oldReservation: oldReservation,
                newReservation: changedReservation,
                reload: !state.reload,
                isSearching: false
            }
        case 'CLEAN':
            return{
                ...state,
                loading: true,
            }
        case 'DESTROY':
            return initState;
        default:
            return state;
    }
}

export default customerReducer;