import React from 'react';
import styles from './Manager.module.css';

const RevenueSection = ( props ) => {
    const row = props.revenue.months.map((month, index) => {
        const amount = (month === null) ? ('0') : (month.split('.')[0])
        return(
            <div className={styles.month} key={index}>{`$${amount}.00`}</div>
        )
    })
    return(
        <div className={styles.revenue_section} key={props.index}>
            {row}
        </div>
    )
}

export default RevenueSection;