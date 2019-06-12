import React from 'react';
import styles from './Header.module.css';

const Header = ( props ) => {
    return(
        <div className={styles.header_container}>
            <div className={styles.header_text}> Welcome </div>
            <div className={styles.ic}>
                <i className='small material-icons'>account_circle</i>
            </div>
        </div>
    )
}

export default Header;