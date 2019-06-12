import React, { Component } from 'react';
import { connect } from 'react-redux';
import History from './history/History';
import Cancel from './cancel/Cancel';
import Search from './search/Search';
import styles from './Customer.module.css';

class CustomerBody extends Component {
    render(){
        const { reload } = this.props;
        return(
            <div className={styles.body_container}>
                <div className={`${styles.seats_container} card`}>
                    <Search /> 
                </div>
                <div className={styles.other_container}>
                    <div className={`${styles.history_box} card`}>
                        <History key={reload}/>
                    </div>
                    <div className={`${styles.cancel_box} card`}>
                        <Cancel/>
                    </div>
                </div>
            </div>
 
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        reload: state.customer.reload
    }
}

export default connect(mapStateToProps, null)(CustomerBody);