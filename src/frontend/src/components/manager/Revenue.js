import React, { Component } from 'react';
import { connect } from 'react-redux';
import { init, clean } from '../../store/actions/managerActions';
import RevenueSection from './RevenueSection';
import RevenueHeader from './RevenueHeader';
import Total from './Total';
import Loader from 'react-loader-spinner';
import styles from './Manager.module.css';

class Revenue extends Component {

    componentDidMount(){
        this.props.init(this.props.airlineName);
    }

    componentWillUnmount(){
        this.props.clean();
    }

    createList = (yearlyRevenue) => {
        const list = yearlyRevenue.map((revenue, index) => {
            return(
                <li className={styles.revenue_element} key={index}>
                    <RevenueHeader airline={revenue.airline} year={revenue.year} />
                    <RevenueSection revenue={revenue} index={index}/>
                    <Total total={revenue.total} />
                </li>
            )
        })
        return list;
    }

    loadContent = (loading, yearlyRevenue, empty) => {
        console.log(yearlyRevenue)
        if(loading){
            return(
                <div className={styles.loader}>
                    <Loader color = '#185cf9' />
                </div>
            )
        }else{
            return(
                yearlyRevenue.length ? (this.createList(yearlyRevenue)) : (empty)
            )
        }
    }

    render(){
        const { yearlyRevenue, loading, airlineName } = this.props;
        const empty = <div> There Is No Data For This Airline </div>
        return(
            <div className={styles.main_revenue}>
                <div className={styles.list_title}>
                    <div> Yearly Revenue </div>
                    <div> {airlineName} </div>
                </div>
                <ul className={styles.list_revenue}>
                    {this.loadContent(loading, yearlyRevenue, empty)}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return{
        yearlyRevenue: state.manager.yearlyRevenue,
        loading: state.manager.loading,
        airlineName: state.user.info
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        init: (airlineName) => { dispatch(init(airlineName)) },
        clean: () => { dispatch(clean()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Revenue);