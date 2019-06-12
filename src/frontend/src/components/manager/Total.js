import React from 'react';
import styles from './Manager.module.css';

const Total = ( props ) => {
    return (
        <div className={styles.total_section}>
            <div className={styles.total_header}>Total: </div>
            <div> {`$${props.total}.00`} </div>
        </div>
    )
}

export default Total;