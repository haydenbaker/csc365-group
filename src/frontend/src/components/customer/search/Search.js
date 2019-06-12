import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchForm from './SearchForm';
import SeatList from './SeatList';
import { getSeats, startSearch } from '../../../store/actions/customerAction';
import styles from './Search.module.css';

class Search extends Component {

    handleSubmit = (values) => {
        console.log(values)
        this.props.getSeats(values);
    }

    handleSearch = (e) => {
        e.preventDefault();
        console.log('searching')
        this.props.startSearch();
    }

    render(){
        const { isSearching } = this.props;
        const searchButton = 
            isSearching ? (
                < button className={styles.search_button} onClick={this.handleSearch}> 
                    Search 
                </button>
                ) : (
                    null
                )
        const content =
            isSearching ? (<SeatList />) : (<SearchForm onSubmit={this.handleSubmit}/>)
        return(
            <div className={styles.search_main}>
                <div className={styles.search_header}>
                    Search Flights
                    { searchButton }
                </div>
                <div className={styles.body_container}>
                    {content}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        isSearching: state.customer.isSearching
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        getSeats: (values) => { dispatch(getSeats(values)) },
        startSearch: () => { dispatch(startSearch()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);