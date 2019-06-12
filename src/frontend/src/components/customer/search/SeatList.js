import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reserveSeat, changeReservation, clean } from '../../../store/actions/customerAction';
import Seat from './Seat';
import Loader from 'react-loader-spinner';
import styles from './Search.module.css';

class SeatList extends Component {

    componentWillUnmount(){
        console.log(this.props.loading)
        this.props.clean()
    }

    createSeats = (flights, seatKeys) => {
        const list = 
            flights.length ? (
                flights.map((flight, index) => {
                    return(
                        <Seat 
                            key={index} 
                            seat_id={flight.seatId}
                            keys={seatKeys} 
                            values={[flight]} 
                            handleReservation={this.handleReservation}
                            handleChangeReservation={this.handleChangeReservation}
                        />
                    )
                })
            ) : (
                <div align='center'>No Flights Available</div>
            )
        return list;
    }

    handleReservation = (e) => {
        e.preventDefault();
        this.props.reserveSeat(e.target.id, this.props.accountId);
    }

    handleChangeReservation = (e, seat_id, close) => {
        e.preventDefault()
        this.props.changeReservation(e.target[0].value, seat_id);
        close();
    }

    render(){
        const { flights, seatKeys, loading } = this.props;
        const content = loading ? (
                <div className={styles.loader}>
                    <Loader type="Plane" color = '#185cf9' />
                </div>
            ) : (
                this.createSeats(flights, seatKeys)
            )
        return(
            <div className={styles.search_list}>
                {content}
           </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        flights: state.customer.flights,
        seatKeys: state.customer.seatKeys,
        loading: state.customer.loading,
        accountId: state.user.info
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        reserveSeat: (seatId, accountId) => { dispatch(reserveSeat(seatId, accountId)) },
        changeReservation: (old_seatId, new_seatId) => { dispatch(changeReservation(old_seatId, new_seatId)) },
        clean: () => { dispatch(clean()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeatList);