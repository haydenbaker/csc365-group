import React from 'react';
import Table from '../table/Table';
import ChangePopup from './ChangePopup';
import styles from './Search.module.css';


const Seat = ( props ) => {
    return(
        <div className={styles.seat_item}>
            <div className={styles.seat}>
                <Table keys={props.keys} values={props.values} />
            </div>
            <div className={styles.seat_buttons}>
                <button id={props.seat_id} className={styles.reserve_button} onClick={props.handleReservation}>
                        Reserve
                </button>
                <ChangePopup
                    trigger={<button className={styles.change_button}>Change</button>}
                    onSave={props.handleChangeReservation}    
                    seat_id={props.seat_id}
                />
            </div>
        </div>
    )
}


export default Seat;