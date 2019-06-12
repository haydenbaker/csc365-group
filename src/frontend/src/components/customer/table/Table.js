import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import styles from './Table.module.css';

const Table = ( props ) => {
    return(
        <table className={styles.table_component}>
            <thead className={styles.table_header}>
                <TableHeader keys={props.keys}/>
            </thead>
            <TableBody values={props.values}/>
        </table>
    )
}

export default Table;