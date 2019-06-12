import React, { Component } from 'react';
import { connect } from 'react-redux';
import { destroy } from '../../store/actions/customerAction';
import NavBar from '../navbar/NavBar';
import Header from '../header/Header';
import CustomerBody from './CustomerBody';
import Status from './status/Status';

class Customer extends Component {
    render(){
        return(
            <div className='app-body'>
                <NavBar close={this.props.destroy}/>
                <div className='main'>
                    <Header />
                    <CustomerBody />
                    <Status />
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

export default connect(null, mapDispatchToProps)(Customer);