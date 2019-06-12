import axios from 'axios';

export const initHistory = (accountId) => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/reservation/${accountId}`)
        .then((response) => {
            dispatch({type: 'INIT_HISTORY', flightHistory: response.data})
        })
    }
}

export const cancelReservation = (values) => {
    return (dispatch) => {
        axios.put(`http://localhost:8080/reservation/cancel/${values.seatId}`)
        .then((response) => {
            dispatch({type: 'CANCEL_RESERVATION', Reservation: response.data})
        })
    }
}

export const getSeats = (values) => {
    const date = ('flightDate' in values) ? (`date=${values.flightDate}`) : ('')
    const scl = ('seatClass' in values) ? (`&class=${values.seatClass}`) : ('')
    const loc = ('seatLocation' in values) ? (`&location=${values.seatLocation}`) : ('')
    const src = ('sourceAirport' in values) ? (`&source=${values.sourceAirport}`) : ('')
    const dest = ('destinationAirport' in values) ? (`&destination=${values.destinationAirport}`) : ('')

    return (dispatch) => {
        axios.get(`http://localhost:8080/seat?${date}${scl}${loc}${src}${dest}`)
        .then((response) => {
            dispatch({type: 'GET_SEATS', flights: response.data})
        })
    }
}

export const createNew = (user) => {
    
    return (dispatch) => {
        axios.post('http://localhost:8080/user', {
            id: 'NULL',
            name: user.name,
            major: user.major,
            minor: user.minor,
            catalogYear: user.catalogYear,
            planningQuarter: user.planningQuarter,
            unitsThisQuarter: user.unitsThisQuarter,
            email: user.email,
            password: user.password,
            previousClasses: 'NULL'
        })
        .then(response => {
            // need to verify if post was successful (response.status should equal 200)
            dispatch({ type: 'STUDENT_INIT', user: response.data })
        })
    }
}


export const startSearch = () => {
    return{
        type: 'START_SEARCH'
    }
}

export const reserveSeat = (seatId, accountId) => {
    return (dispatch) => {
        axios.put(`http://localhost:8080/seat/reserve/${seatId}/${accountId}`)
        .then((response) => {
            dispatch({type: 'RESERVE', newReservation: response.data})
        })
    }
}

export const changeReservation = (old_seatId, new_seatId) => {
    return (dispatch) => {
        axios.put(`http://localhost:8080/reservation/change/${old_seatId}/${new_seatId}`)
        .then((response) => {
            dispatch({type: 'CHANGE_RESERVATION', 
                      oldReservation: response.data[0],
                      newReservation: response.data[1]
            })
        })
    }
}

export const clean = () => {
    return{
        type: 'CLEAN'
    }
}

export const destroy = () => {
    return{
        type: 'DESTROY'
    }
}