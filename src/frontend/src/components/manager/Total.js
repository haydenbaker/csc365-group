import React from 'react';
import styles from './Manager.module.css';

const Total = ( props ) => {
    const amount = (props.total === null) ? ('0') : (props.total.split('.')[0])
    return (
        <div className={styles.total_section}>
            <div className={styles.total_header}>Total: </div>
            <div> {`$${amount}.00`} </div>
        </div>
    )
}

export default Total;