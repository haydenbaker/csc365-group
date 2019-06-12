import React from 'react';
import Popup from 'reactjs-popup';
import styles from './ChangePopup.module.css';

const ChangePopup = ({trigger, onSave, seat_id, onChange}) => {
    return(
        <Popup trigger={trigger} 
                modal contentStyle={{maxWidth:'500px', width:'90%'}} closeOnDocumentClick={false}>
            {close => (
                <div>
                    <h5 align='left'>Seat ID</h5>
                    <form onSubmit={(e) => {onSave(e, seat_id, close)}}>
                        <input type='text' placeholder='Seat ID' autoFocus={true} onChange={onChange}/>
                        <button align='right' className={styles.button_popup}>ok</button>
                        <button align='right' className={styles.button_popup} onClick={close}>cancel</button>
                    </form>
                </div>
            )}
        </Popup>
    )
}

export default ChangePopup;