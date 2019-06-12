import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import { change, save } from '../../store/actions/userActions';
import UserForm from './UserForm';
import styles from './Login.module.css';

class UserSection extends Component{

    handleSubmit = (values) => {
        this.props.save(values[this.props.user.infoType])
        if(this.props.user.type === 'user'){
            this.props.history.push('/Customer')
        }else{
            this.props.history.push('/Manager')
        }
    }

    handleChange = (e) => {
        e.preventDefault();
        this.props.change(e.currentTarget.innerHTML);
    }

    getBar = (userType, type) => {
        if(userType === 'user' && type === 'User'){
            return(
                <div className={styles.active_header} onClick={this.handleChange}> 
                    {type} 
                </div>
            )
        }else if(userType === 'manager' && type === 'Manager'){
            return(
                <div className={styles.active_header} onClick={this.handleChange}> 
                    {type} 
                </div>
            )
        }else{
            return(
                <div className={styles.inactive_header} onClick={this.handleChange}> 
                    {type} 
                </div>
            )
        }
    }

    render(){
        const { user } = this.props;
        return(
            <div className={styles.sub_container}>
                <div className={styles.header_container}>
                    {this.getBar(user.type, 'User')}
                    {this.getBar(user.type, 'Manager')}
                </div>
                <div className={styles.body_container}>
                    <UserForm onSubmit={this.handleSubmit} infoType={user.infoType}/>
                    <button className={styles.submit_button} onClick={this.props.submitForm}> 
                        Submit 
                    </button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
}

const mapStateToDispatch = (dispatch) => {
    return{
        submitForm: () => { dispatch(submit('userForm')) },
        change: (currentUser) => { dispatch(change(currentUser)) },
        save: (userInfo) => { dispatch(save(userInfo)) }
    }
}

export default connect(mapStateToProps, mapStateToDispatch)(UserSection);