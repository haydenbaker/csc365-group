import React from 'react';
import PlaneImage from '../../plane.png';
import styles from './Login.module.css';

const Plane = ( props ) => {
    return(
        <div className={styles.img_container}>
            <img src={PlaneImage} alt='Plane' width='100%' />
        </div>
    )
}

export default Plane;