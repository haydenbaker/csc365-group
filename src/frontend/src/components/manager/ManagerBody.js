import React, { Component } from 'react';
import Revenue from './Revenue';
import styles from './Manager.module.css';

class ManagerBody extends Component{
    render(){
        return(
            <div className={styles.body_container}>
                <div className={`${styles.revenue_container} card`}>
                    <Revenue />
                </div>
           </div>
        )
    }
}

export default ManagerBody;