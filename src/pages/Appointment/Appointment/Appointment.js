import React from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import MakeAppointment from '../MakeAppointment/MakeAppointment';

const Appointment = () => {
    return (
        <div>
            <AppointmentBanner></AppointmentBanner>
            <MakeAppointment></MakeAppointment>
        </div>
    );
};

export default Appointment;