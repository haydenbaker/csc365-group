import React from 'react';
import styles from './Status.module.css';

const StatusHeader = ( props ) => {
    return(
        <div className={styles.status_header}>
            {props.text}
        </div>
    )
}

export default StatusHeader;