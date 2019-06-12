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
            const Reservation = [action.Reservation]
            return{
                ...state,
                didCancel: true,
                didReserve: false,
                didChange: false,
                error: false,
                newReservation: Reservation,
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
            const newReservation = [action.newReservation]
            return{
                ...state,
                didCancel: false,
                didReserve: true,
                didChange: false,
                error: false,
                newReservation: newReservation,
                reload: !state.reload,
                isSearching: false
            }
        case 'CHANGE_RESERVATION':
            const oldReservation = [action.oldReservation]
            const changedReservation = [action.newReservation]
            return{
                ...state,
                didCancel: false,
                didReserve: false,
                didChange: true,
                error: false,
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