import React, { Component } from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import styles from './Cancel.module.css';


class CancelForm extends Component{
    render(){
        const { handleSubmit, onSubmit} = this.props;
        return(
            <Form  onSubmit={handleSubmit(onSubmit)}>
                <label style={{fontSize: '1vw'}}> Seat ID </label>
                <Field className={styles.cancel_input} name='seatId' 
                       component='input' type='text'/>
            </Form>
        )
    }
}

CancelForm = reduxForm({
    form: 'cancelForm'
})(CancelForm)

export default CancelForm;