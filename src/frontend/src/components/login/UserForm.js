import React, { Component } from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import styles from './Login.module.css';


class UserForm extends Component{
    render(){
        const { handleSubmit, onSubmit, infoType} = this.props;
        return(
            <Form className={styles.user_form} onSubmit={handleSubmit(onSubmit)}>
                <label style={{fontSize: '1.2vw'}}> {infoType} </label>
                <Field name={infoType} component='input' type='text'/>
            </Form>
        )
    }
}

UserForm = reduxForm({
    form: 'userForm'
})(UserForm)

export default UserForm;