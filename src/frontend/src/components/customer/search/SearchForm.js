import React, { Component } from 'react';
import { Form, Field, reduxForm } from 'redux-form';
import styles from './Search.module.css';

class SearchForm extends Component{

    render(){
        const { handleSubmit } = this.props
        const upper = value => value && value.toUpperCase()
        return(
            <Form onSubmit={handleSubmit} className={styles.search_form}>
                <div className={styles.form_body}>
                    <div className={styles.form_1}>
                        <Field
                            className={styles.form_input}
                            name='flightDate'
                            placeholder='yyyy-mm-dd'
                            component='input'
                            type='text'
                        >
                        </Field>
                        <label className={styles.form_label}>Date</label>
                        <Field
                            className={styles.form_input}
                            name='seatClass'
                            placeholder='first/business/economy'
                            component='input'
                            type='text'
                            normalize={upper}
                        >
                        </Field>
                        <label className={styles.form_label}>Class</label>
                        <Field
                            className={styles.form_input}
                            name='seatLocation'
                            placeholder='window/middle/aisle'
                            component='input'
                            type='text'
                            normalize={upper}
                        >
                        </Field>
                        <label className={styles.form_label}>Location</label>
                    </div>
                    <div className={styles.form_1}>
                        <Field
                            className={styles.form_input}
                            name='sourceAirport'
                            placeholder='LAX'
                            component='input'
                            type='text'
                            normalize={upper}
                        >
                        </Field>
                        <label className={styles.form_label}>Source Abbr.</label>
                        <Field
                            className={styles.form_input}
                            name='destinationAirport'
                            placeholder='LAX'
                            component='input'
                            type='text'
                            normalize={upper}
                        >
                        </Field>
                        <label className={styles.form_label}>Destination Abbr.</label>
                    </div>
                </div>
                <button className={styles.submit_button}>Submit</button>
           </Form>
        )
    }
}

SearchForm = reduxForm({
    form: 'searchForm'
})(SearchForm)

export default SearchForm