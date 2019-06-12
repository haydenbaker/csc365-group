import React, { Component } from 'react';
import { connect } from 'react-redux';
import { destroy } from '../../store/actions/managerActions';
import NavBar from '../navbar/NavBar';
import Header from '../header/Header';
import ManagerBody from './ManagerBody';

class Manager extends Component{
    render(){
        return(
            <div className='app-body'>
                <NavBar close={this.props.destroy}/>
                <div className='main'>
                    <Header />
                    <ManagerBody />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        destroy: () => { dispatch(destroy()) }
    }
}

export default connect(null, mapDispatchToProps)(Manager);