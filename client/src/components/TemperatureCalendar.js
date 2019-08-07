import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Calendar } from 'react-calendar';
import { connect } from 'react-redux';
import { getTemperatureOnGivenDate } from '../actions/temperatureFetch';
import { withRouter } from 'react-router-dom';
const TemperatureCalendar = ({ getTemperatureOnGivenDate, weatherData, selectedDate }) => {

    useEffect(() => {
        getTemperatureOnGivenDate(selectedDate);
    }, [getTemperatureOnGivenDate, selectedDate]);


    const {
        low,
        high,
        precip,
        skytextday,
        day
    } = weatherData.weatherData

    const onSelectingDate = e => {
        getTemperatureOnGivenDate(e);
    }

    return (
        <Fragment>
            <header className="d-flex justify-content-center container-fluid py-4 px-auto">
                <h1 className="">Temperature Calendar</h1>
            </header>
            <section className="d-flex justify-content-center container-fluid py-4 px-auto">
                <div className='col d-flex justify-content-center'>
                    <Calendar value={selectedDate} onChange={(e) => onSelectingDate(e)}></Calendar>
                </div>
                <div className='col'>
                    <table className='table table-bordered table-sm'>
                        <tbody>
                            <tr><td>Day</td><td>{day}</td></tr>
                            <tr><td>Min Temp</td><td>{low} °F</td></tr>
                            <tr><td>Max Temp</td><td>{high} °F</td></tr>
                            {precip ? <tr><td>Precipitation</td><td>{precip}</td></tr> : ''}
                            {skytextday ? <tr><td>Mostly</td><td>{skytextday}</td></tr> : ''}
                        </tbody>
                    </table>
                </div>
            </section>

        </Fragment >
    )
}

TemperatureCalendar.propsTypes = {
    getTemperatureOnGivenDate: PropTypes.func.isRequired,
    weatherData: PropTypes.object.isRequired,
    selectedDate: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    weatherData: state.weatherData,
    selectedDate: state.selectedDate
})
export default connect(mapStateToProps, { getTemperatureOnGivenDate })(withRouter(TemperatureCalendar));