import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { cancelReservation } from '../../../store/actions/customerAction';
import CancelForm from './CancelForm';
import styles from './Cancel.module.css';

class Cancel extends Component{

    handleSubmit = (values) => {
        console.log(values);
        this.props.cancelReservation(values);
    }

    render(){
        return(
            <div className={styles.cancel_component}>
                <div className={styles.cancel_header}> Cancel </div>
                <CancelForm onSubmit={this.handleSubmit} />
                <button className={styles.cancel_button} onClick={this.props.submitForm}>  
                    Cancel 
                </button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        submitForm: () => { dispatch(submit('cancelForm')) },
        cancelReservation: (values) => { dispatch(cancelReservation(values)) }
    }
}

export default connect(null, mapDispatchToProps)(Cancel);