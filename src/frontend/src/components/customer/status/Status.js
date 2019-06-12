import React, { Component } from 'react';
import { connect } from 'react-redux';
import StatusHeader from './StatusHeader';
import StatusContent from './StatusContent';
import styles from './Status.module.css';


class Status extends Component{
    getType = (didCancel, didReserve, didChange, error) => {
        if(didCancel){
            return('Reservation Canceled')
        }else if(didReserve){
            return('Reservation Booked')
        }else if(didChange){
            return('Reservation Changed')
        }else if(error){
            return('Error')
        }else{
            return('Status Information')
        }
    }

    render(){
        const { didCancel, didReserve, didChange, error } = this.props;
        const type = this.getType(didCancel, didReserve, didChange, error)
        const showContent = 
            type === 'Status Information' ? (null) : (<StatusContent />)
        return(
            <div className={`${styles.status_container} card`}>
                <StatusHeader text={type}/>
                { showContent }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        didCancel: state.customer.didCancel,
        didReserve: state.customer.didReserve,
        didChange: state.customer.didChange,
        error: state.customer.error
    }
}

export default connect(mapStateToProps, null)(Status);