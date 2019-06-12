import React from 'react';
import styles from './Table.module.css';

const TableHeader = ( props ) => {
    const categories = props.keys.map((category, index) => {
        return(
            <th key={index}>
                <div className={styles.table_entry}>{ category }</div>
            </th>
        )
    })

    return(
        <tr>
            { categories }
        </tr>
    )
}

export default TableHeader;