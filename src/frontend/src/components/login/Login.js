import React, { Component } from 'react';
import Plane from './Plane';
import UserSection from './UserSection';
import styles from './Login.module.css';

class Login extends Component {
    render(){
        return(
            <div className={styles.page}>
                <div className={`${styles.main_container} card`}>
                    <Plane />
                    <UserSection history={this.props.history}/>
                </div>
            </div>
        )
    }
}

export default Login;