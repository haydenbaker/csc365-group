import React, { Component } from 'react';
import { connect } from 'react-redux';
import { initHistory } from '../../../store/actions/customerAction';
import Table from '../table/Table';
import styles from './History.module.css';


class History extends Component{

    componentDidMount(){
        console.log("mounting history")
        this.props.initHistory(this.props.accountId);
    }

   render(){
        const { flightHistory, historyKeys } = this.props;
        const table = flightHistory.length ? (
                <Table keys={historyKeys} values={flightHistory}/>
            ) : (
                <div>You Have No Reservation</div>
            )
        console.log(flightHistory)
        return(
            <div className={styles.history_component}>
                <div className={styles.history_header}>History</div>
                <div className={styles.history_table}>
                    {table}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        flightHistory: state.customer.flightHistory,
        historyKeys: state.customer.historyKeys,
        accountId: state.user.info
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        initHistory: (accountId) => { dispatch(initHistory(accountId)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(History);