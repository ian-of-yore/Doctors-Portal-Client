import React, { useState } from 'react';
import AppointmentBanner from '../AppointmentBanner/AppointmentBanner';
import MakeAppointment from '../MakeAppointment/MakeAppointment';

const Appointment = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());



    return (
        <div>
            <AppointmentBanner
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            ></AppointmentBanner>
            <MakeAppointment
                selectedDate={selectedDate}
            ></MakeAppointment>
        </div>
    );
};

export default Appointment;