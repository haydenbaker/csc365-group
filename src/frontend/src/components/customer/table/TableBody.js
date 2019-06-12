import React, { Component } from 'react';
import styles from './Table.module.css';

class TableBody extends Component {

    fillOneRow = (value) => {
        let row = 
            Object.keys(value).map((key, index) => {
                return(
                    <td className={styles.table_entry} key={index}> {value[key]} </td>
                )
            })
        return row;
    }

    fillAllRows = (values) => {
        let rows = 
            values.map((value, index) => {
                return(
                    <tr key={index}>
                        {this.fillOneRow(value)}
                    </tr>
                )
            })
        return rows;
    }

    render(){
        const { values } = this.props;
        return(
            <tbody className={styles.table_body}>
                { this.fillAllRows(values) }
            </tbody>
        )
    }
}

export default TableBody;