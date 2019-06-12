import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../table/Table';
import styles from './Status.module.css';


class StatusContent extends Component{

    getContent = (oldReservation, newReservation, historyKeys, didChange, didCancel, error) => {
        if(error){
            return(
                <div className={styles.content}>
                    <div style={{color: 'red'}}>Insufficient Funds</div>
                    <i style={{color: 'red'}} className='material-icons'>block</i>
                </div>
            )
       } else if(didChange){
            return(
               <div className={styles.changed_content}>
                    <Table keys={historyKeys} values={oldReservation} />
                    <i style={{marginLeft: '20px', marginRight: '20px', color: '#185cf9'}} className='material-icons'>arrow_forward</i>
                    <Table keys={historyKeys} values={newReservation} />
                </div>
 
            )
        }else if(didCancel){
            return(
               <div className={styles.content}>
                    <Table keys={historyKeys} values={newReservation} />
                    <i style={{marginLeft: '50px', color: 'red'}} className='material-icons'>airplanemode_inactive</i>
                </div>
            )
        }else{
            return(
               <div className={styles.content}>
                    <Table keys={historyKeys} values={newReservation} />
                    <i style={{marginLeft: '50px', color: '#185cf9'}} className='material-icons'>flight</i>
                </div>
            )
        }
    }

    render(){
        const { oldReservation, newReservation, historyKeys, didChange, didCancel, error } = this.props;
       return(
            <div className={styles.status_content}>
               { this.getContent(oldReservation, newReservation, historyKeys, didChange, didCancel, error) }
            </div>
       )
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        oldReservation: state.customer.oldReservation,
        newReservation: state.customer.newReservation,
        historyKeys: state.customer.historyKeys,
        didChange: state.customer.didChange,
        didCancel: state.customer.didCancel,
        error: state.customer.error
    }
}


export default connect(mapStateToProps, null)(StatusContent);