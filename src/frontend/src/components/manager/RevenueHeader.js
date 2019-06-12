import React from 'react';
import styles from './Manager.module.css';

const RevenueHeader = ( props ) => {
    const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 
              'Jul', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']
    const month_header = months.map((month, index) => {
        return <div className={styles.month} key={index}>{month}</div>
    })

    return(
        <div className={styles.revenue_header}>
            <div className={styles.year_header}>{ props.year }</div>
            <div className={styles.month_header}> {month_header }</div>
        </div>
    )
}

export default RevenueHeader;