import axios from 'axios';

export const init = (airlineName) => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/revenue/${airlineName}`)
        .then((response) => {
            dispatch({type: 'INIT', yearlyRevenue: response.data})
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


