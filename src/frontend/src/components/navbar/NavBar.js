import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import styles from "./NavBar.module.css"

const NavBar = ( props ) => {
    return(
        <div className={styles.nav}>
            <div className={styles.logo}>
               AIR
            </div>
            <div className={styles.nav_section}>
                <div className={styles.active_section}>
                    <i className=' medium material-icons'>dashboard</i>
                </div>
            </div>
            <NavLink className={styles.section} to="/" onClick={props.close}>
                    <i className={`${styles.ic} medium material-icons`}>keyboard_backspace</i>
            </NavLink>
        </div>
    )
}

export default withRouter(NavBar);